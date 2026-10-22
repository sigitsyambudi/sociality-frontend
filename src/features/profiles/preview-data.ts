import type { PreviewProfile, PreviewProfilePost } from "@/features/profiles/types";

export const previewGallery = [
  { id: "friends-selfie", postId: "preview-kids", imageSrc: "/images/timeline/preview-kids.webp", alt: "Friends smiling together for a close-up selfie" },
  { id: "green-valley", postId: "preview-landscape", imageSrc: "/images/timeline/preview-landscape.webp", alt: "A green valley beneath a bright blue sky" },
  { id: "warm-interior", postId: "preview-interior", imageSrc: "/images/timeline/preview-interior.webp", alt: "A warm minimalist interior with a wooden table" },
  { id: "plated-lunch", imageSrc: "/images/profiles/preview-food.webp", alt: "A colorful plated lunch" },
  { id: "flower-market", imageSrc: "/images/profiles/preview-flowers.webp", alt: "A bright display of colorful flowers" },
  { id: "school-friends", imageSrc: "/images/profiles/preview-friends.webp", alt: "A group of young friends smiling at the camera" },
  { id: "creative-class", imageSrc: "/images/profiles/preview-art-table.webp", alt: "Two children making art together" },
  { id: "play-table", imageSrc: "/images/profiles/preview-play-table.webp", alt: "Children playing together at a table" },
  { id: "blue-coast", imageSrc: "/images/profiles/preview-seascape.webp", alt: "A calm blue coast under a clear sky" },
] satisfies readonly PreviewProfilePost[];

const sharedStats = { posts: 50, followers: 100, following: 43, likes: 567 } as const;

export const previewProfiles = [
  {
    avatarAlt: "Portrait of preview profile John Doe",
    avatarSrc: "/images/timeline/preview-avatar.png",
    bio: "Creating unforgettable moments with my favorite people! 📸✨ Let’s cherish every second together!",
    displayName: "John Doe",
    initials: "JD",
    isFollowing: true,
    posts: previewGallery,
    stats: sharedStats,
    username: "johndoe",
  },
  {
    avatarAlt: "Preview avatar for Maya Chen",
    bio: "Small rituals, thoughtful spaces, and the stories found between them.",
    displayName: "Maya Chen",
    initials: "MC",
    isFollowing: false,
    posts: previewGallery.slice().reverse(),
    stats: { posts: 38, followers: 824, following: 112, likes: 2400 },
    username: "mayachen",
  },
  {
    avatarAlt: "Preview avatar for Noah Williams",
    bio: "Documenting open roads, quiet mornings, and good company.",
    displayName: "Noah Williams",
    initials: "NW",
    isFollowing: true,
    posts: [...previewGallery.slice(3), ...previewGallery.slice(0, 3)],
    stats: { posts: 71, followers: 392, following: 88, likes: 1900 },
    username: "noahw",
  },
  {
    avatarAlt: "Preview avatar for Sofia Ramirez",
    bio: "Color, food, flowers, and people worth remembering.",
    displayName: "Sofia Ramirez",
    initials: "SR",
    isFollowing: false,
    posts: [...previewGallery.slice(4), ...previewGallery.slice(0, 4)],
    stats: { posts: 29, followers: 610, following: 205, likes: 3100 },
    username: "sofiar",
  },
  {
    avatarAlt: "Preview avatar for Ari Pratama",
    bio: "Jakarta-based maker sharing product notes and weekend photographs.",
    displayName: "Ari Pratama",
    initials: "AP",
    isFollowing: false,
    posts: [...previewGallery.slice(6), ...previewGallery.slice(0, 6)],
    stats: { posts: 44, followers: 278, following: 156, likes: 1300 },
    username: "aripratama",
  },
] satisfies readonly PreviewProfile[];

export const myPreviewProfile = previewProfiles[0];

export function findPreviewProfile(username: string) {
  const normalizedUsername = username.toLowerCase();
  return previewProfiles.find((profile) => profile.username.toLowerCase() === normalizedUsername);
}
