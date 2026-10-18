import type { Metadata } from "next";
import Link from "next/link";
import { TimelineFeed } from "@/features/timeline/components/timeline-feed";
import { previewPosts } from "@/features/timeline/preview-data";

export const metadata: Metadata = {
  title: "Timeline | Sociality",
  description: "Preview the Sociality timeline experience.",
};

export default function TimelinePage() {
  return (
    <div className="mx-auto w-full max-w-[600px] px-4 pb-32 pt-5 sm:px-6 lg:px-0 lg:pt-10">
      <h1 className="sr-only">Sociality timeline</h1>
      <aside
        id="preview-mode-note"
        className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-[#262032] bg-[#100d16] px-4 py-3"
        aria-label="Portfolio preview mode"
      >
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#fdfdfd]">Portfolio preview</p>
          <p className="mt-0.5 text-xs leading-5 text-[#a4a7ae]">
            Sample content only. Protected actions are disabled.
          </p>
        </div>
        <Link
          href="/login"
          className="shrink-0 rounded-full bg-[#6936f2] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]"
        >
          Login
        </Link>
      </aside>

      <TimelineFeed posts={previewPosts} />
    </div>
  );
}
