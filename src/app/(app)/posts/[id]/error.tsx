"use client";

import { PostDetailError } from "@/features/posts/components/post-detail-states";

export default function PostRouteError({ reset }: { reset: () => void }) {
  return <PostDetailError onRetry={reset} />;
}
