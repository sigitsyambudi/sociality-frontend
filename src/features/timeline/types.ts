export type TimelineAuthor = {
  avatarAlt: string;
  avatarSrc: string;
  displayName: string;
  username: string;
};

export type TimelinePost = {
  author: TimelineAuthor;
  caption: string;
  commentCount: number;
  id: string;
  imageAlt: string;
  imageSrc: string;
  isLiked: boolean;
  isSaved: boolean;
  likeCount: number;
  publishedAt: string;
  shareCount: number;
};
