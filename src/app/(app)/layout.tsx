import type { ReactNode } from "react";
import { AppShell } from "@/features/timeline/components/app-shell";

export default function TimelineLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
