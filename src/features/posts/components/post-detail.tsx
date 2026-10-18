"use client";

import { Bookmark, Heart, ImageOff, MessageCircle, Send, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getPreviewRelativeTime } from "@/features/timeline/preview-data";
import type { PreviewPostDetail } from "@/features/posts/types";

const COMMENTS_PER_PAGE = 3;

function CommentAvatar({
  avatarSrc,
  initials,
}: {
  avatarSrc?: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#231a35]">
      {avatarSrc && !failed ? (
        <Image
          src={avatarSrc}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex size-full items-center justify-center text-xs font-bold text-[#cbbcff]">
          {initials}
        </span>
      )}
    </div>
  );
}

function CommentComposer() {
  const [comment, setComment] = useState("");
  const [touched, setTouched] = useState(false);
  const error = touched && !comment.trim() ? "Write a comment before posting." : undefined;

  return (
    <div className="border-t border-[#181d27] px-4 py-4 lg:px-5">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
        <span className="text-[#a4a7ae]">Preview only · login required to comment</span>
        <Link href="/login" className="shrink-0 font-bold text-[#8f68ff] hover:text-[#aa8cff] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
          Login
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="preview-comment" className="sr-only">
          Add a preview comment
        </label>
        <input
          id="preview-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "preview-comment-error" : "preview-comment-help"}
          placeholder="Add comment..."
          className="h-10 min-w-0 flex-1 rounded-full border border-[#252a35] bg-[#11151c] px-4 text-sm text-white placeholder:text-[#717680] focus:border-[#7f51f9] focus:outline-none focus:ring-2 focus:ring-[#7f51f9]/25"
        />
        <button
          type="button"
          disabled
          aria-describedby="preview-comment-help"
          className="h-10 cursor-not-allowed rounded-full px-3 text-sm font-bold text-[#8f68ff] opacity-55"
        >
          Post
        </button>
      </div>
      <p id="preview-comment-help" className="sr-only">
        Comment submission is unavailable in preview mode.
      </p>
      {error ? (
        <p id="preview-comment-error" role="alert" className="mt-2 text-xs text-[#f97066]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PostDetail({ detail }: { detail: PreviewPostDetail }) {
  const { comments, post } = detail;
  const [imageFailed, setImageFailed] = useState(false);
  const [notice, setNotice] = useState<string>();
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);
  const visibleComments = comments.slice(0, visibleCount);
  const hasMore = visibleCount < comments.length;

  function explain(action: string) {
    setNotice(`${action} is protected. Login to use it with a live Sociality account.`);
  }

  return (
    <section className="relative mx-auto min-h-svh w-full max-w-[1440px] bg-black px-0 pb-0 lg:min-h-[calc(100svh-80px)] lg:px-[clamp(32px,8.33vw,120px)] lg:pb-28 lg:pt-7">
      <Link
        href="/"
        aria-label="Close post detail and return to timeline"
        className="absolute left-3 top-3 z-20 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white shadow-lg backdrop-blur-md transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] lg:left-auto lg:right-[clamp(32px,8.33vw,120px)] lg:top-0 lg:-translate-y-3"
      >
        <X aria-hidden="true" size={21} />
      </Link>

      <div className="overflow-hidden border-[#181d27] bg-[#0a0d12] lg:grid lg:max-h-[720px] lg:min-h-[620px] lg:grid-cols-[minmax(0,3fr)_minmax(360px,2fr)] lg:rounded-xl lg:border">
        <div className="relative aspect-square min-h-0 bg-[#050608] lg:aspect-auto">
          {imageFailed ? (
            <div className="flex size-full min-h-80 flex-col items-center justify-center gap-3 text-[#717680]">
              <ImageOff aria-hidden="true" size={34} />
              <span className="text-sm">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={post.imageSrc}
              alt={post.imageAlt}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          )}
          <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#cbbcff] backdrop-blur-md">
            Preview post
          </span>
        </div>

        <div className="flex min-h-[520px] flex-col bg-[#0a0d12] lg:min-h-0">
          <header className="border-b border-[#181d27] p-4 lg:p-5">
            <div className="flex items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#231a35]">
                <Image
                  src={post.author.avatarSrc}
                  alt={post.author.avatarAlt}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{post.author.username}</p>
                <time dateTime={post.publishedAt} className="text-xs text-[#a4a7ae]">
                  {getPreviewRelativeTime(post.publishedAt)}
                </time>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#fdfdfd]">{post.caption}</p>
          </header>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between px-4 pb-3 pt-4 lg:px-5">
              <h1 className="text-base font-bold text-white">Comments</h1>
              <span className="rounded-full bg-[#18131f] px-2.5 py-1 text-xs font-semibold text-[#bca5ff]">
                Preview data
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 lg:px-5">
              {visibleComments.length ? (
                <ol aria-label="Preview comments" className="divide-y divide-[#181d27]">
                  {visibleComments.map((comment) => (
                    <li key={comment.id} className="flex gap-3 py-4 first:pt-1">
                      <CommentAvatar avatarSrc={comment.author.avatarSrc} initials={comment.author.initials} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <p className="text-sm font-bold text-white">{comment.author.username}</p>
                          <time dateTime={comment.publishedAt} className="text-xs text-[#717680]">
                            {getPreviewRelativeTime(comment.publishedAt)}
                          </time>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-[#d5d7da]">{comment.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#18131f] text-[#8f68ff]">
                    <MessageCircle aria-hidden="true" size={22} />
                  </span>
                  <p className="mt-3 font-bold text-white">No comments yet</p>
                  <p className="mt-1 text-sm text-[#a4a7ae]">Start the conversation after logging in.</p>
                </div>
              )}
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount((current) => current + COMMENTS_PER_PAGE)}
                  className="mb-4 w-full rounded-full border border-[#292d36] py-2 text-sm font-bold text-[#bca5ff] transition hover:border-[#6936f2] hover:bg-[#120d1d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
                >
                  Load more preview comments
                </button>
              ) : null}
            </div>
          </div>

          <div className="border-t border-[#181d27] px-4 py-3 lg:px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => explain("Liking a post")} className="flex items-center gap-1.5 rounded-md text-sm font-semibold text-white hover:text-[#bca5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
                  <Heart aria-hidden="true" size={21} /> {post.likeCount}
                  <span className="sr-only">likes; login required</span>
                </button>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <MessageCircle aria-hidden="true" size={21} /> {post.commentCount}
                  <span className="sr-only">comments</span>
                </span>
                <button type="button" onClick={() => explain("Sharing a post")} className="flex items-center gap-1.5 rounded-md text-sm font-semibold text-white hover:text-[#bca5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
                  <Send aria-hidden="true" size={21} /> {post.shareCount}
                  <span className="sr-only">shares; login required</span>
                </button>
              </div>
              <button type="button" onClick={() => explain("Saving a post")} aria-label="Save post; login required" className="rounded-md p-1 text-white hover:text-[#bca5ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
                <Bookmark aria-hidden="true" size={21} />
              </button>
            </div>
            {notice ? (
              <p role="status" className="mt-2 text-xs leading-5 text-[#cbbcff]">
                {notice} <Link href="/login" className="font-bold text-[#9d7cff] underline-offset-2 hover:underline">Login</Link>
              </p>
            ) : null}
          </div>

          <CommentComposer />
        </div>
      </div>
    </section>
  );
}
