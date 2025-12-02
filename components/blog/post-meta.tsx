import ChipContainer from "@/components/ui/chip-container";
import { BlogPostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface PostMetaProps {
  meta: BlogPostMeta;
}

export function PostMeta({ meta }: PostMetaProps) {
  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      <div className="flex flex-wrap items-center gap-2">
        <span>{formatDate(meta.date)}</span>
        <span>•</span>
        <span>{meta.readingTime}</span>
      </div>
      {meta.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          <ChipContainer textArr={meta.tags} />
        </div>
      ) : null}
    </div>
  );
}
