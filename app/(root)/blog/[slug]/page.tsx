import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { PostMeta } from "@/components/blog/post-meta";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { pagesConfig } from "@/config/pages";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { withBasePath } from "@/lib/utils";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
      description: pagesConfig.blog.metadata.description,
    };
  }

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: post.meta.cover
        ? [
            {
              url: withBasePath(post.meta.cover),
              width: 1200,
              height: 630,
              alt: post.meta.title,
            },
          ]
        : undefined,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2">
            <Icons.chevronLeft className="h-4 w-4" />
            Quay lại Blog
          </Button>
        </Link>
      </div>

      <header className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-primary">
          Blog
        </p>
        <h1 className="text-3xl font-heading leading-tight md:text-4xl">
          {post.meta.title}
        </h1>
        <PostMeta meta={post.meta} />
      </header>

      {post.meta.cover ? (
        <div className="relative my-8 h-72 w-full overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={withBasePath(post.meta.cover)}
            alt={post.meta.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
      ) : null}

      <div className="text-base leading-7">
        <MarkdownRenderer content={post.content} />
      </div>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2">
            <Icons.chevronLeft className="h-4 w-4" />
            Quay lại Blog
          </Button>
        </Link>
      </div>
    </article>
  );
}
