import { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import PageContainer from "@/components/common/page-container";
import { pagesConfig } from "@/config/pages";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: pagesConfig.blog.metadata.title,
  description: pagesConfig.blog.metadata.description,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageContainer
      title={pagesConfig.blog.title}
      description={pagesConfig.blog.description}
    >
      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Chưa có bài viết nào. Hãy thêm file markdown vào thư mục
          <code className="mx-1 rounded bg-muted px-2 py-1">content/blog</code>.
        </p>
      )}
    </PageContainer>
  );
}
