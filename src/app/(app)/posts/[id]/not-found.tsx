import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8f68ff]">404 · Preview post</p>
      <h1 className="mt-3 text-2xl font-bold text-white">This post is not in the preview</h1>
      <p className="mt-2 text-sm leading-6 text-[#a4a7ae]">The link may be outdated, or the post ID is not part of Sociality&apos;s isolated sample data.</p>
      <Link href="/" className="mt-6 rounded-full bg-[#6936f2] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]">
        Return to Timeline
      </Link>
    </div>
  );
}
