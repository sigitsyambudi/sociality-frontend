import { apiClient } from "@/api";

export type CreatePostInput = {
  caption?: string;
  image: File;
};

export type CommentsPageParams = {
  limit?: number;
  page?: number;
  postId: number;
};

export function createPost({ caption, image }: CreatePostInput): Promise<unknown> {
  const body = new FormData();
  body.append("image", image);

  if (caption?.trim()) {
    body.append("caption", caption.trim());
  }

  return apiClient.post("/api/posts", body, { authenticated: true });
}

export function getPostDetail(postId: number): Promise<unknown> {
  return apiClient.get(`/api/posts/${postId}`);
}

export function getPostComments({
  limit = 10,
  page = 1,
  postId,
}: CommentsPageParams): Promise<unknown> {
  const params = new URLSearchParams({
    limit: String(Math.min(50, Math.max(1, limit))),
    page: String(Math.max(1, page)),
  });

  return apiClient.get(`/api/posts/${postId}/comments?${params}`);
}

export function createPostComment(postId: number, text: string): Promise<unknown> {
  return apiClient.post(
    `/api/posts/${postId}/comments`,
    { text },
    { authenticated: true },
  );
}
