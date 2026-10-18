"use client";

import { ArrowLeft, Bookmark, Grid2X2, Heart } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { PreviewAvatar } from "@/features/profiles/components/preview-avatar";
import { ProfileActions } from "@/features/profiles/components/profile-actions";
import { ProfileGallery } from "@/features/profiles/components/profile-gallery";
import type { PreviewProfile } from "@/features/profiles/types";

type ProfileViewProps = {
  mode: "friend" | "me";
  profile: PreviewProfile;
};

function CompactHeader({ profile }: { profile: PreviewProfile }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#181d27] bg-black/95 px-4 backdrop-blur-sm lg:hidden">
      <div className="flex min-w-0 items-center gap-2">
        <Link href="/" aria-label="Back to timeline" className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
          <ArrowLeft aria-hidden="true" size={24} />
        </Link>
        <p className="truncate text-base font-bold tracking-[-0.02em] text-white">{profile.displayName}</p>
      </div>
      <PreviewAvatar src={profile.avatarSrc} alt={profile.avatarAlt} initials={profile.initials} size={40} />
    </header>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 flex-1 text-center">
      <p className="text-lg font-bold leading-8 tracking-[-0.03em] text-white lg:text-xl lg:leading-[34px]">{value}</p>
      <p className="text-xs leading-4 text-[#a4a7ae] lg:text-base lg:leading-[30px]">{label}</p>
    </div>
  );
}

export function ProfileView({ mode, profile }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<"gallery" | "secondary">("gallery");
  const galleryTabRef = useRef<HTMLButtonElement>(null);
  const secondaryTabRef = useRef<HTMLButtonElement>(null);
  const secondaryTab = mode === "me" ? "Saved" : "Liked";

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const showGallery = event.key === "ArrowLeft" || event.key === "Home";
    setActiveTab(showGallery ? "gallery" : "secondary");
    (showGallery ? galleryTabRef : secondaryTabRef).current?.focus();
  }

  return (
    <>
      <CompactHeader profile={profile} />
      <div className="mx-auto w-full max-w-[812px] px-4 pb-36 pt-4 lg:px-0 lg:pb-40 lg:pt-10">
        <section aria-labelledby="profile-name" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-5">
            <div className="flex items-center gap-3 lg:gap-5">
              <PreviewAvatar src={profile.avatarSrc} alt={profile.avatarAlt} initials={profile.initials} size={64} />
              <div className="min-w-0 text-sm leading-7 text-white lg:text-base lg:leading-[30px]">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 id="profile-name" className="font-bold tracking-[-0.01em]">{profile.displayName}</h1>
                  <span className="rounded-full border border-[#4c376f] bg-[#120d1d] px-2 py-0.5 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-[#bca5ff]">Preview</span>
                </div>
                <p>@{profile.username}</p>
              </div>
            </div>
            <ProfileActions mode={mode} />
          </div>

          <p className="text-sm leading-7 tracking-[-0.02em] text-white lg:text-base lg:leading-[30px]">{profile.bio}</p>
          <p id="profile-preview-limit" className="text-xs leading-5 text-[#7f51f9]">Sample profile content — not authenticated account data.</p>

          <div className="flex items-stretch gap-0" aria-label="Profile statistics">
            <Stat label="Post" value={profile.stats.posts} />
            <span aria-hidden="true" className="w-px bg-[#181d27]" />
            <Stat label="Followers" value={profile.stats.followers} />
            <span aria-hidden="true" className="w-px bg-[#181d27]" />
            <Stat label="Following" value={profile.stats.following} />
            <span aria-hidden="true" className="w-px bg-[#181d27]" />
            <Stat label="Likes" value={profile.stats.likes} />
          </div>
        </section>

        <section aria-label="Profile posts" className="mt-4">
          <div role="tablist" aria-label="Profile collections" className="grid h-12 grid-cols-2 border-b border-[#181d27]">
            <button
              ref={galleryTabRef}
              id="gallery-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "gallery"}
              aria-controls="gallery-panel"
              tabIndex={activeTab === "gallery" ? 0 : -1}
              onClick={() => setActiveTab("gallery")}
              onKeyDown={handleTabKeyDown}
              className={`flex items-center justify-center gap-2 text-sm focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7f51f9] lg:text-base ${activeTab === "gallery" ? "border-b-2 border-white font-bold text-white" : "text-[#a4a7ae] transition hover:text-white"}`}
            >
              <Grid2X2 aria-hidden="true" size={20} /> Gallery
            </button>
            <button
              ref={secondaryTabRef}
              id="secondary-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "secondary"}
              aria-controls="secondary-panel"
              aria-describedby="profile-preview-limit"
              tabIndex={activeTab === "secondary" ? 0 : -1}
              onClick={() => setActiveTab("secondary")}
              onKeyDown={handleTabKeyDown}
              className={`flex items-center justify-center gap-2 text-sm focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7f51f9] lg:text-base ${activeTab === "secondary" ? "border-b-2 border-white font-bold text-white" : "text-[#a4a7ae] transition hover:text-white"}`}
            >
              {mode === "me" ? <Bookmark aria-hidden="true" size={20} /> : <Heart aria-hidden="true" size={20} />} {secondaryTab}
            </button>
          </div>
          {activeTab === "gallery" ? (
            <div id="gallery-panel" role="tabpanel" aria-labelledby="gallery-tab" className="mt-6">
              <ProfileGallery posts={profile.posts} />
            </div>
          ) : (
            <div id="secondary-panel" role="tabpanel" aria-labelledby="secondary-tab" className="mt-6 rounded-xl border border-[#392b55] bg-[#120d1d] px-5 py-8 text-center text-sm leading-6 text-[#cbbcff]">
              <p>{secondaryTab} content is not available in preview mode.</p>
              <Link href="/login" className="mt-2 inline-block font-bold text-[#9d7cff] underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
                Login for live features
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
