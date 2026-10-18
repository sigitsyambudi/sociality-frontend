import type { TimelinePost } from "@/features/timeline/types";

export const MAX_POST_IMAGE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_POST_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type PreviewComment = {
  author: {
    avatarSrc?: string;
    displayName: string;
    initials: string;
    username: string;
  };
  id: string;
  publishedAt: string;
  text: string;
};

export type PreviewPostDetail = {
  comments: readonly PreviewComment[];
  post: TimelinePost;
};
