"use client";

import { TimelineError } from "@/features/timeline/components/timeline-states";

export default function TimelineErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-[600px] items-center px-4 pb-28 sm:px-6 lg:px-0">
      <TimelineError onRetry={reset} />
    </div>
  );
}
