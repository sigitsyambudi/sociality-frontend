import { RefreshCw, UsersRound } from "lucide-react";

export function TimelineSkeleton() {
  return (
    <div aria-label="Loading timeline" aria-busy="true" className="space-y-8">
      {[0, 1].map((item) => (
        <div
          key={item}
          className="animate-pulse border-b border-[#181d27] pb-6 motion-reduce:animate-none"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="size-11 rounded-full bg-[#15121a] lg:size-16" />
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-[#17131d]" />
              <div className="h-3 w-20 rounded bg-[#121016]" />
            </div>
          </div>
          <div className="aspect-square w-full rounded-lg bg-[#121016]" />
          <div className="mt-3 h-5 w-48 rounded bg-[#17131d]" />
          <div className="mt-4 h-4 w-full rounded bg-[#121016]" />
          <div className="mt-2 h-4 w-3/4 rounded bg-[#121016]" />
        </div>
      ))}
      <span className="sr-only">Loading timeline posts</span>
    </div>
  );
}

export function TimelineEmpty() {
  return (
    <section className="rounded-2xl border border-[#24202c] bg-[#09080c] px-6 py-14 text-center">
      <UsersRound aria-hidden="true" className="mx-auto text-[#7f51f9]" size={34} />
      <h2 className="mt-4 text-lg font-bold text-white">No posts yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#a4a7ae]">
        New posts will appear here when the timeline has content.
      </p>
    </section>
  );
}

export function TimelineError({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="w-full rounded-2xl border border-[#402039] bg-[#120a10] px-6 py-14 text-center">
      <h2 className="text-lg font-bold text-white">Timeline unavailable</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#b9a9b5]">
        Something interrupted the timeline. Retry without leaving this page.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mx-auto mt-6 flex h-11 items-center gap-2 rounded-full bg-[#6936f2] px-5 text-sm font-bold text-white transition hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]"
      >
        <RefreshCw aria-hidden="true" size={17} />
        Try again
      </button>
    </section>
  );
}
