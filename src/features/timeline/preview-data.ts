import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { TimelinePost } from "@/features/timeline/types";

dayjs.extend(relativeTime);

export const PREVIEW_REFERENCE_TIME = "2026-10-17T12:01:00+07:00";

export function getPreviewRelativeTime(publishedAt: string) {
  return dayjs(publishedAt).from(dayjs(PREVIEW_REFERENCE_TIME));
}

const author = {
  avatarAlt: "Portrait of preview author John Doe",
  avatarSrc: "/images/timeline/preview-avatar.png",
  displayName: "John Doe",
  username: "Johndoe",
} satisfies TimelinePost["author"];

export const previewPosts = [
  {
    author,
    caption:
      "Creating unforgettable moments with my favorite people! 📸✨ Let's cherish every second together!",
    commentCount: 20,
    id: "preview-kids",
    imageAlt: "A joyful group of children taking a close-up selfie",
    imageSrc: "/images/timeline/preview-kids.webp",
    isLiked: true,
    isSaved: false,
    likeCount: 20,
    publishedAt: "2026-10-17T12:00:00+07:00",
    shareCount: 20,
  },
  {
    author,
    caption:
      "A quiet horizon, open trails, and enough room to breathe. Saving this view for the days that move too fast.",
    commentCount: 12,
    id: "preview-landscape",
    imageAlt: "A wide green valley beneath a bright blue sky",
    imageSrc: "/images/timeline/preview-landscape.webp",
    isLiked: false,
    isSaved: false,
    likeCount: 48,
    publishedAt: "2026-10-17T11:49:00+07:00",
    shareCount: 8,
  },
  {
    author,
    caption:
      "Warm stone, natural wood, and a little morning light—simple spaces can still carry a point of view.",
    commentCount: 16,
    id: "preview-interior",
    imageAlt: "A warm minimalist interior with a sculptural wooden table",
    imageSrc: "/images/timeline/preview-interior.webp",
    isLiked: false,
    isSaved: true,
    likeCount: 72,
    publishedAt: "2026-10-17T10:41:00+07:00",
    shareCount: 14,
  },
  {
    author,
    caption:
      "The lights came up and the whole room moved together. One of those nights you never quite stop hearing.",
    commentCount: 0,
    id: "preview-concert",
    imageAlt: "A performer on stage surrounded by warm lights and a crowd",
    imageSrc: "/images/timeline/preview-concert.webp",
    isLiked: false,
    isSaved: false,
    likeCount: 96,
    publishedAt: "2026-10-16T12:01:00+07:00",
    shareCount: 27,
  },
] satisfies readonly TimelinePost[];
