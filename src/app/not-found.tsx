import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Sociality",
  description: "The requested Sociality portfolio preview page could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-black px-5 py-16 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-[radial-gradient(ellipse_at_bottom,_rgba(105,54,242,0.55),_rgba(40,13,82,0.3)_38%,_transparent_72%)]"
      />
      <section className="w-full max-w-xl rounded-3xl border border-white/12 bg-[#0b0910]/90 px-6 py-10 text-center shadow-2xl shadow-[#6936f2]/10 sm:px-10 sm:py-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#6936f2] text-xl font-black shadow-lg shadow-[#6936f2]/25">
          S
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#a98cff]">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page could not be found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#a4a7ae] sm:text-base">
          The link may be outdated, or this preview page may no longer be available.
          Return to the timeline or explore preview profiles through search.
        </p>
        <nav
          aria-label="Page not found navigation"
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="rounded-full bg-[#6936f2] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a98cff]"
          >
            Go to Timeline
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-[#a98cff]/70 hover:bg-[#17121f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a98cff]"
          >
            Search profiles
          </Link>
        </nav>
      </section>
    </main>
  );
}
