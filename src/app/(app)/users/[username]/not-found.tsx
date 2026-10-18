import { SearchX } from "lucide-react";
import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-80px)] max-w-md flex-col items-center justify-center px-6 pb-28 text-center">
      <span className="flex size-14 items-center justify-center rounded-full border border-[#392b55] bg-[#120d1d] text-[#9d7cff]">
        <SearchX aria-hidden="true" size={26} />
      </span>
      <h1 className="mt-5 text-xl font-bold text-white">Profile not found</h1>
      <p className="mt-2 text-sm leading-7 text-[#a4a7ae]">This username is not part of the isolated Sociality preview dataset.</p>
      <Link href="/search" className="mt-6 rounded-full bg-[#6936f2] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7f51f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98cff]">Search preview profiles</Link>
    </div>
  );
}
