import { previewPosts } from "@/features/timeline/preview-data";
import type { PreviewComment, PreviewPostDetail } from "@/features/posts/types";

const sharedComments = [
  {
    author: {
      displayName: "Clarissa Putri",
      initials: "CP",
      username: "clarissaputri",
    },
    id: "preview-comment-1",
    publishedAt: "2026-10-17T12:00:30+07:00",
    text: "Such a beautiful moment! Everyone looks so happy.",
  },
  {
    author: {
      displayName: "Alexander James",
      initials: "AJ",
      username: "alexanderjames",
    },
    id: "preview-comment-2",
    publishedAt: "2026-10-17T12:00:15+07:00",
    text: "This photo has the best energy ✨",
  },
  {
    author: {
      displayName: "Maya Chen",
      initials: "MC",
      username: "mayachen",
    },
    id: "preview-comment-3",
    publishedAt: "2026-10-17T11:58:00+07:00",
    text: "A memory worth keeping forever.",
  },
  {
    author: {
      displayName: "Noah Williams",
      initials: "NW",
      username: "noahw",
    },
    id: "preview-comment-4",
    publishedAt: "2026-10-17T11:51:00+07:00",
    text: "The joy in this frame is contagious.",
  },
  {
    author: {
      displayName: "Sofia Ramirez",
      initials: "SR",
      username: "sofiar",
    },
    id: "preview-comment-5",
    publishedAt: "2026-10-17T11:42:00+07:00",
    text: "Love this! Thanks for sharing it with us.",
  },
] satisfies readonly PreviewComment[];

export const previewPostDetails = previewPosts.map((post, index) => ({
  post,
  comments:
    post.id === "preview-concert"
      ? []
      : sharedComments.map((comment) => ({
          ...comment,
          id: `${post.id}-${comment.id}`,
          text:
            index === 0
              ? comment.text
              : index === 1
                ? `${comment.text} That view is incredible.`
                : index === 2
                  ? `${comment.text} The details are so thoughtful.`
                  : `${comment.text} What a night!`,
        })),
})) satisfies readonly PreviewPostDetail[];

export function findPreviewPostDetail(id: string) {
  return previewPostDetails.find((detail) => detail.post.id === id);
}
