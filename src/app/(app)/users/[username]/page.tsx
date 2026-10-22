import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileView } from "@/features/profiles/components/profile-view";
import { findPreviewProfile, previewProfiles } from "@/features/profiles/preview-data";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export function generateStaticParams() {
  return previewProfiles.map((profile) => ({ username: profile.username }));
}

export async function generateMetadata({ params }: PageProps<"/users/[username]">): Promise<Metadata> {
  const { username } = await params;
  const profile = findPreviewProfile(username);

  return profile
    ? {
        title: `${profile.displayName} | Sociality`,
        description: `Preview ${profile.displayName}'s Sociality profile.`,
        robots: PREVIEW_ROUTE_ROBOTS,
      }
    : { title: "Profile not found | Sociality", robots: PREVIEW_ROUTE_ROBOTS };
}

export default async function UserProfilePage({ params }: PageProps<"/users/[username]">) {
  const { username } = await params;
  const profile = findPreviewProfile(username);

  if (!profile) notFound();

  return <ProfileView mode="friend" profile={profile} />;
}
