import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  heading: string;
  linkHref: "/login" | "/register";
  linkLabel: string;
  prompt: string;
};

export function AuthCard({
  children,
  heading,
  linkHref,
  linkLabel,
  prompt,
}: AuthCardProps) {
  return (
    <section className="w-full max-w-[380px] rounded-2xl border border-[#202936] bg-[linear-gradient(180deg,rgba(3,4,7,0.98),rgba(4,1,10,0.94))] px-5 py-6 text-white shadow-[0_28px_90px_rgba(41,0,83,0.45)] sm:px-8 sm:py-8">
      <div className="mb-5 flex items-center justify-center gap-2" aria-label="Sociality">
        <span className="auth-logo-mark" aria-hidden="true" />
        <span className="text-[22px] font-bold tracking-[-0.04em]">Sociality</span>
      </div>

      <h1 className="mb-6 text-center text-[22px] font-bold tracking-[-0.02em] sm:text-2xl">
        {heading}
      </h1>

      {children}

      <p className="mt-5 text-center text-sm font-medium text-white">
        {prompt}{" "}
        <Link
          href={linkHref}
          className="text-[#8b55ff] underline-offset-4 transition-colors hover:text-[#a87cff] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b6cff]"
        >
          {linkLabel}
        </Link>
      </p>
    </section>
  );
}
