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

    // Track occurrences of IDs within this file to handle duplicates
    const idCounts: Record<string, number> = {};

    // Simple regex to find headings and associate content
    const sections = content.split(/(?=^#{2,3}\s)/m);

    sections.forEach((section) => {
      const match = section.match(/^(#{2,3})\s+(.*)$/m);
      if (match) {
        const title = match[2].trim();
        // Create an ID that matches rehype-slug (github-slugger) behavior
        let id = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") 
          .trim()
          .replace(/\s+/g, "-");

        // Handle duplicates
        if (idCounts[id]) {
          idCounts[id]++;
          id = `${id}-${idCounts[id] - 1}`;
        } else {
          idCounts[id] = 1;
        }
        
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
