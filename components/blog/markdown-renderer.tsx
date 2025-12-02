import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { withBasePath } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="mt-10 mb-4 text-3xl font-heading" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="mt-10 mb-4 text-2xl font-semibold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-4 leading-7 text-muted-foreground" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="my-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />
        ),
        li: ({ node, ...props }) => <li className="leading-7" {...props} />,
        code: ({ node, inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code
                className="rounded-md bg-muted px-1.5 py-0.5 text-sm text-foreground"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-7 text-foreground">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          );
        },
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="my-6 border-l-4 border-primary/50 bg-muted/40 px-4 py-3 text-muted-foreground"
            {...props}
          />
        ),
        table: ({ node, ...props }) => (
          <div className="my-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="border-b border-border bg-muted px-3 py-2 font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border-b border-border px-3 py-2 text-muted-foreground" {...props} />
        ),
        img: ({ node, src, alt, ...props }) => {
          const resolvedSrc = src ? withBasePath(src) : "";
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedSrc}
              alt={alt ?? ""}
              className="my-6 w-full rounded-xl border border-border bg-muted object-cover"
              loading="lazy"
              {...props}
            />
          );
        },
        a: ({ node, ...props }) => (
          <a
            className="text-primary underline underline-offset-4 transition hover:text-primary/80"
            target="_blank"
            rel="noreferrer"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
