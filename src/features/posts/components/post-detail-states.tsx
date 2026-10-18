"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function PostDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1200px] animate-pulse px-0 pb-24 lg:px-8 lg:pt-7">
      <span className="sr-only">Loading post detail</span>
      <div className="overflow-hidden bg-[#0a0d12] lg:grid lg:min-h-[620px] lg:grid-cols-[3fr_2fr] lg:rounded-xl lg:border lg:border-[#181d27]">
        <div className="aspect-square bg-[#11151c] lg:aspect-auto" />
        <div className="space-y-5 p-5">
          <div className="h-10 w-44 rounded-full bg-[#181d27]" />
          <div className="h-14 rounded-lg bg-[#11151c]" />
          <div className="h-px bg-[#181d27]" />
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex gap-3">
              <div className="size-10 rounded-full bg-[#181d27]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded bg-[#181d27]" />
                <div className="h-8 rounded bg-[#11151c]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PostDetailError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col items-center justify-center px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-[#25131a] text-[#f97066]">
        <AlertCircle aria-hidden="true" size={24} />
      </span>
      <h1 className="mt-4 text-xl font-bold text-white">Post could not be displayed</h1>
      <p className="mt-2 text-sm leading-6 text-[#a4a7ae]">Something interrupted this preview. You can retry safely; no mutation will be sent.</p>
      <div className="mt-5 flex gap-3">
        <button type="button" onClick={onRetry} className="rounded-full bg-[#6936f2] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]">
          Retry
        </button>
        <Link href="/" className="rounded-full border border-[#292d36] px-5 py-2.5 text-sm font-bold text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
          Timeline
        </Link>
      </div>
    </div>
  );
}
