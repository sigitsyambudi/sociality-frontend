import { z } from "zod";

// These schemas mirror the illustrative examples in
// docs/reference/api-response-examples.md. They are intentionally isolated
// from live API functions until the backend team verifies the examples.

const provisionalLoginUserSchema = z.object({
  avatar_url: z.string(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  username: z.string(),
});

const provisionalAuthorSchema = z.object({
  avatar_url: z.string().optional(),
  id: z.string(),
  username: z.string(),
});

const provisionalMediaSchema = z.object({
  type: z.literal("image"),
  url: z.string(),
});

const provisionalCursorMetaSchema = z.object({
  has_more: z.boolean(),
  limit: z.number(),
  next_cursor: z.string().nullable(),
});

export const provisionalLoginResponseSchema = z.object({
  data: z.object({
    access_token: z.string(),
    expires_in: z.number(),
    refresh_token: z.string(),
    token_type: z.literal("Bearer"),
    user: provisionalLoginUserSchema,
  }),
  success: z.literal(true),
});

export const provisionalFeedPostSchema = z.object({
  author: provisionalAuthorSchema.extend({ avatar_url: z.string() }),
  caption: z.string(),
  comment_count: z.number(),
  created_at: z.string(),
  id: z.string(),
  is_liked: z.boolean(),
  like_count: z.number(),
  media: z.array(provisionalMediaSchema),
});

export const provisionalFeedResponseSchema = z.object({
  data: z.array(provisionalFeedPostSchema),
  meta: provisionalCursorMetaSchema,
  success: z.literal(true),
});

export const provisionalMyProfileSchema = z.object({
  avatar_url: z.string(),
  bio: z.string(),
  created_at: z.string(),
  email: z.string(),
  followers_count: z.number(),
  following_count: z.number(),
  id: z.string(),
  name: z.string(),
  posts_count: z.number(),
  username: z.string(),
});

export const provisionalPublicProfileSchema = provisionalMyProfileSchema
  .omit({ email: true })
  .extend({ is_following: z.boolean() });

export const provisionalProfileResponseSchema = z.object({
  data: z.union([
    provisionalMyProfileSchema,
    provisionalPublicProfileSchema,
  ]),
  success: z.literal(true),
});

export const provisionalPostSchema = z.object({
  author: provisionalAuthorSchema,
  caption: z.string(),
  comment_count: z.number(),
  created_at: z.string(),
  id: z.string(),
  is_liked: z.boolean().optional(),
  like_count: z.number(),
  media: z.array(provisionalMediaSchema),
});

export const provisionalPostResponseSchema = z.object({
  data: provisionalPostSchema,
  success: z.literal(true),
});

export const provisionalCommentSchema = z.object({
  author: provisionalAuthorSchema,
  content: z.string(),
  created_at: z.string(),
  id: z.string(),
  like_count: z.number(),
  post_id: z.string(),
});

export const provisionalCommentsResponseSchema = z.object({
  data: z.array(provisionalCommentSchema),
  meta: provisionalCursorMetaSchema,
  success: z.literal(true),
});

export const provisionalCommentResponseSchema = z.object({
  data: provisionalCommentSchema,
  success: z.literal(true),
});

export const provisionalErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    details: z
      .array(z.object({ field: z.string(), message: z.string() }))
      .optional(),
    message: z.string(),
  }),
  success: z.literal(false),
});

export type ProvisionalLoginResponse = z.infer<
  typeof provisionalLoginResponseSchema
>;
export type ProvisionalFeedPost = z.infer<typeof provisionalFeedPostSchema>;
export type ProvisionalFeedResponse = z.infer<
  typeof provisionalFeedResponseSchema
>;
export type ProvisionalMyProfile = z.infer<typeof provisionalMyProfileSchema>;
export type ProvisionalPublicProfile = z.infer<
  typeof provisionalPublicProfileSchema
>;
export type ProvisionalProfileResponse = z.infer<
  typeof provisionalProfileResponseSchema
>;
export type ProvisionalPost = z.infer<typeof provisionalPostSchema>;
export type ProvisionalPostResponse = z.infer<
  typeof provisionalPostResponseSchema
>;
export type ProvisionalComment = z.infer<typeof provisionalCommentSchema>;
export type ProvisionalCommentsResponse = z.infer<
  typeof provisionalCommentsResponseSchema
>;
export type ProvisionalCommentResponse = z.infer<
  typeof provisionalCommentResponseSchema
>;
export type ProvisionalErrorResponse = z.infer<
  typeof provisionalErrorResponseSchema
>;
