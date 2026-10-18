"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { PreviewProfilePost } from "@/features/profiles/types";

function GalleryImage({ post }: { post: PreviewProfilePost }) {
  const [failed, setFailed] = useState(false);

  return (
    <li className="relative aspect-square min-w-0 overflow-hidden rounded-[3px] bg-[#0a0d12]">
      {failed ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-[#717680]">
          <ImageOff aria-hidden="true" size={24} />
          <span className="sr-only">Image unavailable: {post.alt}</span>
        </div>
      ) : (
        <Image src={post.imageSrc} alt={post.alt} fill sizes="(min-width: 1024px) 270px, 33vw" className="object-cover transition duration-300 motion-safe:hover:scale-[1.02]" onError={() => setFailed(true)} />
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
      {posts.map((post) => <GalleryImage key={post.id} post={post} />)}
    </ul>
  );
}
