"use client";

import { useState } from "react";
import { PostCard } from "@/features/timeline/components/post-card";
import { TimelineEmpty } from "@/features/timeline/components/timeline-states";
import type { TimelinePost } from "@/features/timeline/types";

const PREVIEW_PAGE_SIZE = 2;

export function TimelineFeed({ posts }: { posts: readonly TimelinePost[] }) {
  const [visibleCount, setVisibleCount] = useState(PREVIEW_PAGE_SIZE);

  if (posts.length === 0) {
    return <TimelineEmpty />;
  }

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section aria-label="Timeline preview">
      <div className="space-y-6 lg:space-y-6">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() =>
            setVisibleCount((count) =>
              Math.min(posts.length, count + PREVIEW_PAGE_SIZE),
            )
          }
          className="mx-auto mt-8 flex h-11 items-center justify-center rounded-full border border-[#2a2433] bg-[#0a0d12] px-6 text-sm font-bold text-white transition hover:border-[#4c376f] hover:bg-[#100d16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
        >
          Load more preview posts
        </button>
      ) : (
        <p className="mt-8 text-center text-xs text-[#717680]">
          End of preview content
        </p>
      )}
    </section>
  );
}
