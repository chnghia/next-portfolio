import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover?: string;
  readingTime: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getReadingTime(text: string): string {
  const WORDS_PER_MINUTE = 200;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function readPostFile(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(BLOG_DIR, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const meta: BlogPostMeta = {
    slug: realSlug,
    title: data.title ?? realSlug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover,
    readingTime: data.readingTime ?? getReadingTime(content),
  };

  return { meta, content };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const posts = slugs
    .map((slug) => readPostFile(slug))
    .filter(Boolean) as { meta: BlogPostMeta; content: string }[];

  return posts
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )
    .map(({ meta }) => meta);
}

export function getPostBySlug(slug: string) {
  if (!fs.existsSync(BLOG_DIR)) return null;
  return readPostFile(slug);
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
