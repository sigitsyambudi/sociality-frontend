"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ProfileActionsProps = {
  mode: "friend" | "me";
};

export function ProfileActions({ mode }: ProfileActionsProps) {
  const [notice, setNotice] = useState<string>();
  const primaryLabel = mode === "me" ? "Edit Profile" : "Follow";

  return (
    <div className="w-full sm:w-auto">
      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          aria-describedby="profile-action-limit"
          title={mode === "me" ? "Editing is unavailable in preview mode" : "Login is required to follow this profile"}
          onClick={() => setNotice(mode === "me" ? "Editing is unavailable in preview mode." : "Follow requires an authenticated session.")}
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-[#181d27] px-5 text-sm font-bold text-white transition hover:border-[#4c376f] hover:bg-[#100d16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] sm:h-12 sm:w-[130px] sm:flex-none sm:text-base"
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          aria-label="Share profile"
          aria-describedby="profile-action-limit"
          onClick={() => setNotice("Profile sharing is disabled in this isolated preview.")}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#181d27] text-white transition hover:border-[#4c376f] hover:bg-[#100d16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] sm:size-12"
        >
          <Send aria-hidden="true" size={20} />
        </button>
      </div>
      <p id="profile-action-limit" className="sr-only">
        This action is unavailable in unauthenticated preview mode.
      </p>
      {notice ? (
        <p role="status" className="mt-3 rounded-lg border border-[#392b55] bg-[#120d1d] px-3 py-2 text-xs leading-5 text-[#cbbcff]">
          {notice} <Link href="/login" className="font-bold text-[#9d7cff] underline-offset-2 hover:underline">Go to Login</Link>
        </p>
      ) : null}
    </div>
  );
}
