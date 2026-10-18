import type { Metadata } from "next";
import { ProfileView } from "@/features/profiles/components/profile-view";
import { myPreviewProfile } from "@/features/profiles/preview-data";

export const metadata: Metadata = {
  title: "My Profile Preview | Sociality",
  description: "Preview the Sociality profile experience.",
};

export default function MyProfilePage() {
  return <ProfileView mode="me" profile={myPreviewProfile} />;
}
