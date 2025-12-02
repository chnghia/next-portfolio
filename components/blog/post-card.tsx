import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import ChipContainer from "@/components/ui/chip-container";
import { BlogPostMeta } from "@/lib/posts";
import { withBasePath } from "@/lib/utils";

interface PostCardProps {
  post: BlogPostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl border border-border bg-muted">
        {post.cover ? (
          <Image
            src={withBasePath(post.cover)}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Icons.post className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="text-xl font-semibold leading-tight text-foreground">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            <ChipContainer textArr={post.tags} />
          </div>
        ) : null}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-primary transition hover:translate-x-1"
          aria-label={`Đọc bài ${post.title}`}
        >
          Đọc tiếp
          <Icons.chevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
