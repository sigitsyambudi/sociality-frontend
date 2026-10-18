"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconRoot = "/icons/sociality";

function Brand() {
  return (
    <Link
      href="/"
      aria-label="Sociality timeline"
      className="flex items-center gap-[11px] rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7f51f9]"
    >
      <Image src={`${iconRoot}/logo-mark.svg`} alt="" width={30} height={30} />
      <span className="text-2xl font-bold tracking-[-0.04em] text-[#fdfdfd]">
        Sociality
      </span>
    </Link>
  );
}

function DesktopHeader({ searchOpen }: { searchOpen: boolean }) {
  return (
    <header className="sticky top-0 z-40 hidden h-20 border-b border-[#181d27] bg-black/95 backdrop-blur-sm lg:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-10 px-[clamp(40px,8.33vw,120px)]">
        <Brand />
        {searchOpen ? (
          <div aria-hidden="true" className="h-12 w-full max-w-[491px]" />
        ) : (
          <Link
            href="/search"
            aria-label="Search preview profiles"
            className="flex h-12 w-full max-w-[491px] items-center gap-2 rounded-full border border-[#181d27] bg-[#0a0d12] px-4 text-sm text-[#535862] transition hover:border-[#35303f] hover:text-[#a4a7ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
          >
            <Image src={`${iconRoot}/search.svg`} alt="" width={20} height={20} />
            <span>Search</span>
          </Link>
        )}
        <nav aria-label="Authentication" className="flex shrink-0 gap-3">
          <Link href="/login" className="flex h-11 w-[130px] items-center justify-center rounded-full border border-[#181d27] text-sm font-bold text-[#fdfdfd] transition hover:border-[#35303f] hover:bg-[#0a0d12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
            Login
          </Link>
          <Link href="/register" className="flex h-11 w-[130px] items-center justify-center rounded-full bg-[#6936f2] text-sm font-bold text-[#fdfdfd] transition hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#181d27] bg-black/95 px-4 backdrop-blur-sm lg:hidden">
      <Brand />
      <div className="flex items-center gap-4">
        <Link href="/search" aria-label="Search preview profiles" className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]">
          <Image src={`${iconRoot}/mobile-search.svg`} alt="" width={20} height={20} />
        </Link>
        <details className="group relative">
          <summary className="flex cursor-pointer list-none rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation menu</span>
            <Image src={`${iconRoot}/menu.svg`} alt="" width={24} height={24} />
          </summary>
          <nav aria-label="Mobile menu" className="absolute right-0 mt-3 w-52 rounded-xl border border-[#24202c] bg-[#0a0d12] p-2 shadow-2xl">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7f51f9]">Preview mode</p>
            <Link href="/login" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#7f51f9]">Login</Link>
            <Link href="/register" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#7f51f9]">Create account</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function BottomNavigation({ pathname }: { pathname: string }) {
  const homeActive = pathname === "/";
  const profileActive = pathname === "/profile" || pathname.startsWith("/users/");
  const itemClass = (active: boolean) =>
    `flex w-[82px] flex-col items-center justify-center gap-1 rounded-lg text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9] lg:w-[94px] lg:text-base ${active ? "font-bold text-[#7f51f9]" : "text-[#fdfdfd]"}`;

  return (
    <nav aria-label="Primary navigation" className="fixed bottom-4 left-1/2 z-50 flex h-16 w-[calc(100%-48px)] max-w-[360px] -translate-x-1/2 items-center justify-center gap-5 rounded-full border border-[#181d27] bg-[#0a0d12]/95 px-4 shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-md sm:bottom-6 lg:h-20 lg:gap-[45px]">
      <Link href="/" aria-current={homeActive ? "page" : undefined} className={itemClass(homeActive)}>
        <Image src={`${iconRoot}/home-filled.svg`} alt="" width={24} height={24} />
        <span>Home</span>
      </Link>
      <Link href="/posts/new" aria-label="Open the preview post composer" title="Create a post" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6936f2] transition hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]">
        <Image src={`${iconRoot}/add.svg`} alt="" width={24} height={24} />
      </Link>
      <Link href="/profile" aria-current={profileActive ? "page" : undefined} className={itemClass(profileActive)}>
        <Image src={`${iconRoot}/profile-filled.svg`} alt="" width={24} height={24} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}

export function AppNavigation() {
  const pathname = usePathname();
  const searchOpen = pathname === "/search";
  const profileOpen = pathname === "/profile" || pathname.startsWith("/users/");
  const postWorkspaceOpen = pathname === "/posts/new" || pathname.startsWith("/posts/");

  return (
    <>
      <DesktopHeader searchOpen={searchOpen} />
      {!searchOpen && !profileOpen && !postWorkspaceOpen ? <MobileHeader /> : null}
      {!searchOpen && !postWorkspaceOpen ? <BottomNavigation pathname={pathname} /> : null}
    </>
  );
}
