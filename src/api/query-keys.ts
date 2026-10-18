import type {
  CommentsPageParameters,
  Page20Parameters,
  SearchUsersParameters,
} from "@/api/contracts";

const apiRoot = ["sociality-api"] as const;
const meRoot = [...apiRoot, "me"] as const;
const postsRoot = [...apiRoot, "posts"] as const;
const usersRoot = [...apiRoot, "users"] as const;

function page20(parameters: Page20Parameters = {}) {
  return {
    limit: parameters.limit ?? 20,
    page: parameters.page ?? 1,
  } as const;
}

function commentsPage(parameters: CommentsPageParameters = {}) {
  return {
    limit: parameters.limit ?? 10,
    page: parameters.page ?? 1,
  } as const;
}

export const socialityQueryKeys = {
  all: apiRoot,
  feed: (parameters: Page20Parameters = {}) =>
    [...apiRoot, "feed", page20(parameters)] as const,
  me: {
    all: meRoot,
    followers: (parameters: Page20Parameters = {}) =>
      [...meRoot, "followers", page20(parameters)] as const,
    following: (parameters: Page20Parameters = {}) =>
      [...meRoot, "following", page20(parameters)] as const,
    likes: (parameters: Page20Parameters = {}) =>
      [...meRoot, "likes", page20(parameters)] as const,
    posts: (parameters: Page20Parameters = {}) =>
      [...meRoot, "posts", page20(parameters)] as const,
    profile: () => [...meRoot, "profile"] as const,
    saved: (parameters: Page20Parameters = {}) =>
      [...meRoot, "saved", page20(parameters)] as const,
  },
  posts: {
    all: postsRoot,
    comments: (postId: number, parameters: CommentsPageParameters = {}) =>
      [...postsRoot, postId, "comments", commentsPage(parameters)] as const,
    detail: (postId: number) => [...postsRoot, postId] as const,
    explore: (parameters: Page20Parameters = {}) =>
      [...postsRoot, "explore", page20(parameters)] as const,
    likes: (postId: number, parameters: Page20Parameters = {}) =>
      [...postsRoot, postId, "likes", page20(parameters)] as const,
  },
  users: {
    all: usersRoot,
    followers: (username: string, parameters: Page20Parameters = {}) =>
      [...usersRoot, username, "followers", page20(parameters)] as const,
    following: (username: string, parameters: Page20Parameters = {}) =>
      [...usersRoot, username, "following", page20(parameters)] as const,
    likes: (username: string, parameters: Page20Parameters = {}) =>
      [...usersRoot, username, "likes", page20(parameters)] as const,
    posts: (username: string, parameters: Page20Parameters = {}) =>
      [...usersRoot, username, "posts", page20(parameters)] as const,
    profile: (username: string) =>
      [...usersRoot, username, "profile"] as const,
    search: (parameters: SearchUsersParameters) =>
      [
        ...usersRoot,
        "search",
        {
          limit: parameters.limit ?? 20,
          page: parameters.page ?? 1,
          q: parameters.q,
        },
      ] as const,
  },
} as const;
