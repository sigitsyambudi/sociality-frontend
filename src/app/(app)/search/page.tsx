import type { Metadata } from "next";
import { ProfileSearch } from "@/features/profiles/components/profile-search";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search | Sociality",
  description: "Search Sociality portfolio preview profiles.",
  robots: PREVIEW_ROUTE_ROBOTS,
};

export default function SearchPage() {
  return <ProfileSearch />;
}
