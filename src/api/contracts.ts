import { z } from "zod";

export const documentedImageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const documentedImageMaxBytes = 5 * 1024 * 1024;

export const integerIdParameterSchema = z.number().int();
export const usernameParameterSchema = z.string();

export const page20ParametersSchema = z
  .object({
    limit: z.number().int().max(50).default(20),
    page: z.number().int().default(1),
  })
  .strict();

export const commentsPageParametersSchema = z
  .object({
    limit: z.number().int().max(50).default(10),
    page: z.number().int().default(1),
  })
  .strict();

export const searchUsersParametersSchema = z
  .object({
    limit: z.number().int().max(50).default(20),
    page: z.number().int().min(1).default(1),
    q: z.string().min(1),
  })
  .strict();

export const loginRequestSchema = z
  .object({
    email: z.string(),
    password: z.string().min(6),
  })
  .strict();

export const registerRequestSchema = z
  .object({
    email: z.string(),
    name: z.string(),
    password: z.string().min(6),
    phone: z.string().optional(),
    username: z.string(),
  })
  .strict();

export const createCommentRequestSchema = z
  .object({
    text: z.string(),
  })
  .strict();

export const updateProfileJsonRequestSchema = z
  .object({
    avatarUrl: z.string().optional(),
    bio: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    username: z.string().optional(),
  })
  .strict();

export const postImageMetadataSchema = z
  .object({
    size: z.number().max(documentedImageMaxBytes),
    type: z.enum(documentedImageMimeTypes),
  })
  .strict();

// This validates browser File metadata before constructing FormData. It is not
// a serialization or response schema for the multipart binary itself.
export const createPostFieldsSchema = z
  .object({
    caption: z.string().optional(),
    image: postImageMetadataSchema,
  })
  .strict();

export type CommentsPageParameters = z.input<
  typeof commentsPageParametersSchema
>;
export type CreateCommentRequest = z.infer<typeof createCommentRequestSchema>;
export type CreatePostFields = z.infer<typeof createPostFieldsSchema>;
export type LoginRequestContract = z.infer<typeof loginRequestSchema>;
export type Page20Parameters = z.input<typeof page20ParametersSchema>;
export type RegisterRequestContract = z.infer<typeof registerRequestSchema>;
export type SearchUsersParameters = z.input<
  typeof searchUsersParametersSchema
>;
export type UpdateProfileJsonRequest = z.infer<
  typeof updateProfileJsonRequestSchema
>;
