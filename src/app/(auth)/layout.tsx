import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page flex min-h-svh flex-1 items-center justify-center overflow-x-hidden px-6 py-10 sm:px-8 sm:py-14">
      {children}
    </main>
  );
}
