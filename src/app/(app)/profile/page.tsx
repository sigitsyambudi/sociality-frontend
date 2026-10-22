import type { Metadata } from "next";
import { ProfileView } from "@/features/profiles/components/profile-view";
import { myPreviewProfile } from "@/features/profiles/preview-data";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "My Profile Preview | Sociality",
  description: "Preview the Sociality profile experience.",
  robots: PREVIEW_ROUTE_ROBOTS,
};

export default function MyProfilePage() {
  return <ProfileView mode="me" profile={myPreviewProfile} />;
}
