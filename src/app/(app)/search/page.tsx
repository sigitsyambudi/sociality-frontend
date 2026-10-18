import type { Metadata } from "next";
import { ProfileSearch } from "@/features/profiles/components/profile-search";

export const metadata: Metadata = {
  title: "Search | Sociality",
  description: "Search Sociality portfolio preview profiles.",
};

export default function SearchPage() {
  return <ProfileSearch />;
}
