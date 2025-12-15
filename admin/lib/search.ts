import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type SearchIndexItem = {
  id: string;
  title: string;
  content: string;
  slug: string;
};

export function getSearchIndex(): SearchIndexItem[] {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  let index: SearchIndexItem[] = [];

  files.forEach((filename) => {
    const slug = filename.replace(".mdx", "");
    const filePath = path.join(contentDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);

    // Simple regex to find headings and associate content
    // This looks for # Heading text, and grabs following text until next heading
    const sections = content.split(/(?=^#{2,3}\s)/m);

    sections.forEach((section) => {
      const match = section.match(/^(#{2,3})\s+(.*)$/m);
      if (match) {
        const title = match[2].trim();
        // Create an ID from the title (slugify)
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        
        // Remove the heading from the content for indexing
        const sectionContent = section.replace(/^(#{2,3})\s+(.*)$/m, "").trim();

        index.push({
          id,
          title,
          content: sectionContent,
          slug,
        });
      }
    });
  });

  return index;
}
