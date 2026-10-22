import { describe, expect, it } from "vitest";
import {
  provisionalCommentResponseSchema,
  provisionalCommentsResponseSchema,
  provisionalFeedResponseSchema,
  provisionalLoginResponseSchema,
  provisionalPostResponseSchema,
  provisionalProfileResponseSchema,
} from "@/api/provisional-response-contracts";

describe("provisional response contracts", () => {
  it("accepts the documented login example shape", () => {
    expect(
      provisionalLoginResponseSchema.safeParse({
        success: true,
        data: {
          access_token: "access-token",
          refresh_token: "refresh-token",
          token_type: "Bearer",
          expires_in: 900,
          user: {
            id: "usr_1",
            username: "budi_santoso",
            name: "Budi Santoso",
            email: "budi@example.com",
            avatar_url: "https://cdn.example.com/avatar.jpg",
          },
        },
      }).success,
    ).toBe(true);
  });

  it("rejects a login response that omits a documented token field", () => {
    expect(
      provisionalLoginResponseSchema.safeParse({
        success: true,
        data: {
          access_token: "access-token",
          token_type: "Bearer",
          expires_in: 900,
          user: {},
        },
      }).success,
    ).toBe(false);
  });

  it("accepts the documented feed and cursor pagination shape", () => {
    expect(
      provisionalFeedResponseSchema.safeParse({
        success: true,
        data: [
          {
            id: "pst_001",
            caption: "Sore di Jakarta",
            media: [{ type: "image", url: "https://cdn.example.com/post.jpg" }],
            author: {
              id: "usr_1",
              username: "sari_dewi",
              avatar_url: "https://cdn.example.com/avatar.jpg",
            },
            like_count: 128,
            comment_count: 14,
            is_liked: false,
            created_at: "2026-10-20T09:15:00Z",
          },
        ],
        meta: { limit: 10, next_cursor: "cursor", has_more: true },
      }).success,
    ).toBe(true);
  });

  it("keeps profile, post, and comment example fields distinct", () => {
    expect(
      provisionalProfileResponseSchema.safeParse({
        success: true,
        data: {
          id: "usr_1",
          username: "budi_santoso",
          name: "Budi Santoso",
          email: "budi@example.com",
          bio: "Fotografer amatir",
          avatar_url: "https://cdn.example.com/avatar.jpg",
          followers_count: 342,
          following_count: 180,
          posts_count: 57,
          created_at: "2025-03-12T08:00:00Z",
        },
      }).success,
    ).toBe(true);

    expect(
      provisionalPostResponseSchema.safeParse({
        success: true,
        data: {
          id: "pst_002",
          caption: "Sore di Jakarta",
          media: [{ type: "image", url: "https://cdn.example.com/post.jpg" }],
          author: { id: "usr_1", username: "budi_santoso" },
          like_count: 0,
          comment_count: 0,
          created_at: "2026-10-20T13:00:00Z",
        },
      }).success,
    ).toBe(true);

    expect(
      provisionalCommentResponseSchema.safeParse({
        success: true,
        data: {
          id: "cmt_102",
          post_id: "pst_001",
          content: "Keren banget fotonya!",
          author: { id: "usr_1", username: "budi_santoso" },
          like_count: 0,
          created_at: "2026-10-20T13:00:00Z",
        },
      }).success,
    ).toBe(true);

    expect(
      provisionalCommentsResponseSchema.safeParse({
        success: true,
        data: [],
        meta: { limit: 20, next_cursor: null, has_more: false },
      }).success,
    ).toBe(true);
  });

  it("does not accept the Swagger comment request field as a response field", () => {
    expect(
      provisionalCommentResponseSchema.safeParse({
        success: true,
        data: {
          id: "cmt_102",
          post_id: "pst_001",
          text: "Swagger request field",
          author: { id: "usr_1", username: "budi_santoso" },
          like_count: 0,
          created_at: "2026-10-20T13:00:00Z",
        },
      }).success,
    ).toBe(false);
  });
});
