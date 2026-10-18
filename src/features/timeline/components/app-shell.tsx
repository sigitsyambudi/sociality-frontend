import type { ReactNode } from "react";
import { AppNavigation } from "@/features/timeline/components/app-navigation";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh flex-1 bg-black text-[#fdfdfd]">
      <AppNavigation />
      <main>{children}</main>
    </div>
  );
}
