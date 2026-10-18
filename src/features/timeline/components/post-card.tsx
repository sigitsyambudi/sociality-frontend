"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getPreviewRelativeTime } from "@/features/timeline/preview-data";
import type { TimelinePost } from "@/features/timeline/types";

const iconRoot = "/icons/sociality";

type PreviewActionProps = {
  count?: number;
  icon: string;
  label: string;
  onSelect: (label: string) => void;
};

function PreviewAction({
  count,
  icon,
  label,
  onSelect,
}: PreviewActionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      aria-disabled="true"
      aria-describedby="preview-mode-note"
      className="flex items-center gap-1.5 rounded-md text-sm font-semibold text-[#fdfdfd] transition hover:text-[#bca5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] lg:text-base"
    >
      <Image src={icon} alt="" width={24} height={24} />
      {typeof count === "number" ? <span>{count}</span> : null}
      <span className="sr-only">{label}; login required</span>
    </button>
  );
}

export function PostCard({ post }: { post: TimelinePost }) {
  const [expanded, setExpanded] = useState(false);
  const [notice, setNotice] = useState<string>();
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const noticeId = `preview-action-${post.id}`;

  function explainProtectedAction(action: string) {
    setNotice(`${action} is disabled in preview mode. Login to use live actions.`);
  }

  return (
    <article className="border-b border-[#181d27] pb-6 last:border-b-0">
      <header className="mb-3 flex items-center gap-2 lg:gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-[#17131d] lg:size-16">
          {avatarFailed ? (
            <span className="flex size-full items-center justify-center text-sm font-bold text-[#bca5ff]">
              JD
            </span>
          ) : (
            <Image
              src={post.author.avatarSrc}
              alt={post.author.avatarAlt}
              fill
              sizes="(min-width: 1024px) 64px, 44px"
              className="object-cover"
              onError={() => setAvatarFailed(true)}
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-[-0.01em] text-[#fdfdfd] lg:text-base">
            {post.author.username}
          </p>
          <time
            dateTime={post.publishedAt}
            className="mt-0.5 block text-xs text-[#a4a7ae] lg:text-sm"
          >
            {getPreviewRelativeTime(post.publishedAt)}
          </time>
        </div>
      </header>

      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#0a0d12]">
        {imageFailed ? (
          <div className="flex size-full flex-col items-center justify-center gap-3 text-[#717680]">
            <ImageOff aria-hidden="true" size={32} />
            <span className="text-sm">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 600px, calc(100vw - 32px)"
            className="object-cover"
            loading={post.id === "preview-kids" || post.id === "preview-landscape" ? "eager" : "lazy"}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <PreviewAction
            icon={`${iconRoot}/${post.isLiked ? "heart-filled" : "heart"}.svg`}
            count={post.likeCount}
            label="Like"
            onSelect={explainProtectedAction}
          />
          <Link
            href={`/posts/${post.id}`}
            aria-label={`View ${post.commentCount} comments on this preview post`}
            className="flex items-center gap-1.5 rounded-md text-sm font-semibold text-[#fdfdfd] transition hover:text-[#bca5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] lg:text-base"
          >
            <Image src={`${iconRoot}/message.svg`} alt="" width={24} height={24} />
            <span>{post.commentCount}</span>
          </Link>
          <PreviewAction
            icon={`${iconRoot}/send.svg`}
            count={post.shareCount}
            label="Share"
            onSelect={explainProtectedAction}
          />
        </div>
        <PreviewAction
          icon={`${iconRoot}/${post.isSaved ? "bookmark-filled" : "bookmark"}.svg`}
          label="Save"
          onSelect={explainProtectedAction}
        />
      </div>

      {notice ? (
        <p
          id={noticeId}
          role="status"
          className="mt-3 rounded-lg border border-[#392b55] bg-[#120d1d] px-3 py-2 text-xs leading-5 text-[#cbbcff]"
        >
          {notice}{" "}
          <Link
            href="/login"
            className="font-bold text-[#8f68ff] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-[#7f51f9]"
          >
            Go to Login
          </Link>
        </p>
      ) : null}

      <div className="mt-3 text-sm leading-7 text-[#fdfdfd] lg:text-base">
        <p className="font-bold">{post.author.username}</p>
        <p className={expanded ? undefined : "line-clamp-2"}>{post.caption}</p>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="font-bold text-[#7f51f9] hover:text-[#9d7cff] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
          aria-expanded={expanded}
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </article>
  );
}
