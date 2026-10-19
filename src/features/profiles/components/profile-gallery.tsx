"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PreviewProfilePost } from "@/features/profiles/types";

function GalleryImage({ eager, post }: { eager: boolean; post: PreviewProfilePost }) {
  const [failed, setFailed] = useState(false);
  const image = failed ? (
    <div className="flex size-full flex-col items-center justify-center gap-2 text-[#717680]">
      <ImageOff aria-hidden="true" size={24} />
      <span className="sr-only">Image unavailable: {post.alt}</span>
    </div>
  ) : (
    <Image
      src={post.imageSrc}
      alt={post.alt}
      fill
      loading={eager ? "eager" : "lazy"}
      sizes="(min-width: 1024px) 270px, 33vw"
      className={`object-cover ${post.postId ? "transition duration-300 motion-safe:group-hover:scale-[1.02]" : ""}`}
      onError={() => setFailed(true)}
    />
  );

  return (
    <li className="relative aspect-square min-w-0 overflow-hidden rounded-[3px] bg-[#0a0d12]">
      {post.postId ? (
        <Link
          href={`/posts/${post.postId}`}
          aria-label={`Open preview post: ${post.alt}`}
          className="group relative block size-full rounded-[3px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7f51f9]"
        >
          {image}
        </Link>
      ) : (
        <div className="relative size-full cursor-default" title="Preview image; no post detail available">
          {image}
          <span className="pointer-events-none absolute bottom-1.5 right-1.5 rounded-full bg-black/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#d5d7da]">
            Preview only
          </span>
        </div>
      )}
    </li>
  );
}

export function ProfileGallery({ posts }: { posts: readonly PreviewProfilePost[] }) {
  if (posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-base font-bold text-white">Your story starts here</p>
        <p className="mx-auto mt-1 max-w-sm text-sm leading-7 text-[#a4a7ae]">No preview posts are available for this profile yet.</p>
      </div>
    );
  }

  return (
    <ul aria-label="Preview posts" className="grid grid-cols-3 gap-[2px]">
      {posts.map((post, index) => <GalleryImage key={post.id} eager={index < 3} post={post} />)}
    </ul>
  );
}
