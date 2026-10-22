"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import { PreviewAvatar } from "@/features/profiles/components/preview-avatar";
import { previewProfiles } from "@/features/profiles/preview-data";

export function ProfileSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const isFiltering = query !== deferredQuery;
  const results = useMemo(
    () => normalizedQuery
      ? previewProfiles.filter((profile) => `${profile.displayName} ${profile.username}`.toLowerCase().includes(normalizedQuery))
      : [],
    [normalizedQuery],
  );
  const hasResults = normalizedQuery.length > 0 && !isFiltering && results.length > 0;

  function focusResult(index: number) {
    resultRefs.current[index]?.focus();
  }

  return (
    <div className="relative min-h-svh bg-black px-4 pb-12 pt-3 lg:-mt-[68px] lg:min-h-[calc(100svh-12px)] lg:pt-0">
      <h1 className="sr-only">Search preview profiles</h1>
      <div className="relative z-50 mx-auto flex max-w-[491px] items-center gap-3">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#181d27] bg-[#0a0d12] px-3 focus-within:border-[#4c376f] lg:h-12 lg:px-4">
          <span className="sr-only">Search preview users by name or username</span>
          <Search aria-hidden="true" size={20} className="shrink-0 text-[#717680]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            autoFocus
            autoComplete="off"
            placeholder="Search"
            aria-describedby="search-preview-note search-status"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && results.length > 0) {
                event.preventDefault();
                focusResult(0);
              }
            }}
            className="profile-search-input min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#535862]"
          />
          {query ? (
            <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear search" className="rounded-full text-[#717680] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
              <X aria-hidden="true" size={16} />
            </button>
          ) : null}
        </label>
        <Link href="/" aria-label="Close search" className="rounded-md p-1 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] lg:hidden">
          <X aria-hidden="true" size={24} />
        </Link>
      </div>

      <p id="search-preview-note" className="sr-only">Searches isolated portfolio preview data only.</p>
      <div id="search-status" role="status" aria-live="polite" className="sr-only">
        {isFiltering ? "Filtering preview profiles" : normalizedQuery ? `${results.length} results found` : "Enter a search term"}
      </div>

      <section
        aria-label="Search results"
        aria-busy={isFiltering}
        className={`relative z-50 mx-auto mt-2 max-w-[491px] rounded-[20px] border border-transparent bg-black lg:border-[#181d27] lg:bg-[#0a0d12] lg:p-5 ${hasResults ? "" : "min-h-[195px]"}`}
      >
        {!normalizedQuery ? (
          <div className="flex min-h-[155px] flex-col items-center justify-center text-center lg:min-h-[155px]">
            <p className="text-base font-bold text-white">Find people</p>
            <p className="mt-1 text-sm leading-7 text-[#a4a7ae]">Search by name or username</p>
          </div>
        ) : isFiltering ? (
          <div className="space-y-4 py-2" aria-hidden="true">
            {Array.from({ length: 3 }, (_, index) => <div key={index} className="flex animate-pulse items-center gap-3 motion-reduce:animate-none"><span className="size-12 rounded-full bg-[#181d27]" /><span className="h-4 w-32 rounded bg-[#181d27]" /></div>)}
          </div>
        ) : results.length === 0 ? (
          <div className="flex min-h-[155px] flex-col items-center justify-center text-center">
            <p className="text-base font-bold text-white">No results found</p>
            <p className="mt-1 text-sm leading-7 text-[#a4a7ae]">Change your keyword</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {results.map((profile, index) => (
              <li key={profile.username}>
                <Link
                  ref={(node) => { resultRefs.current[index] = node; }}
                  href={`/users/${profile.username}`}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") { event.preventDefault(); focusResult((index + 1) % results.length); }
                    if (event.key === "ArrowUp") { event.preventDefault(); if (index === 0) inputRef.current?.focus(); else focusResult(index - 1); }
                  }}
                  className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7f51f9]"
                >
                  <PreviewAvatar src={profile.avatarSrc} alt={profile.avatarAlt} initials={profile.initials} size={48} />
                  <span className="min-w-0 text-sm leading-7">
                    <span className="block truncate font-bold text-white">{profile.displayName}</span>
                    <span className="block truncate text-[#a4a7ae]">{profile.username}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
