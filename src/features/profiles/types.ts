export type PreviewProfileStats = {
  followers: number;
  following: number;
  likes: number;
  posts: number;
};

export type PreviewProfilePost = {
  alt: string;
  id: string;
  imageSrc: string;
};

export type PreviewProfile = {
  avatarAlt: string;
  avatarSrc?: string;
  bio: string;
  displayName: string;
  initials: string;
  isFollowing: boolean;
  posts: readonly PreviewProfilePost[];
  stats: PreviewProfileStats;
  username: string;
};
