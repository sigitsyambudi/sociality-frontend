"use client";

import Image from "next/image";
import { useState } from "react";

type PreviewAvatarProps = {
  alt: string;
  className?: string;
  initials: string;
  size: number;
  src?: string;
};

export function PreviewAvatar({ alt, className = "", initials, size, src }: PreviewAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#211731] text-sm font-bold text-[#cbbcff] ${className}`} style={{ width: size, height: size }}>
      {!src || failed ? (
        <span aria-label={alt}>{initials}</span>
      ) : (
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" onError={() => setFailed(true)} />
      )}
    </span>
  );
}
