import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import DocsLayout from "@/components/DocsLayout";
import { notFound } from "next/navigation";

// Define the content directory
const contentDir = path.join(process.cwd(), "content");

export async function generateStaticParams() {
  const files = fs.readdirSync(contentDir);
  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export default async function DocPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);

  return (
    <DocsLayout>
      <div className="prose prose-blue max-w-none prose-headings:scroll-mt-28 prose-a:no-underline hover:prose-a:underline">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight, rehypeSlug] as any,
            },
          }}
        />
      </div>
    </DocsLayout>
  );
}
