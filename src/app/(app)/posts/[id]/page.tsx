import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/features/posts/components/post-detail";
import {
  findPreviewPostDetail,
  previewPostDetails,
} from "@/features/posts/preview-data";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export function generateStaticParams() {
  return previewPostDetails.map(({ post }) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[id]">): Promise<Metadata> {
  const { id } = await params;
  const detail = findPreviewPostDetail(id);

  return detail
    ? {
        title: `${detail.post.author.username}'s post | Sociality`,
        description: detail.post.caption,
        robots: PREVIEW_ROUTE_ROBOTS,
      }
    : { title: "Post not found | Sociality", robots: PREVIEW_ROUTE_ROBOTS };
}

export default async function PostDetailPage({ params }: PageProps<"/posts/[id]">) {
  const { id } = await params;
  const detail = findPreviewPostDetail(id);

  if (!detail) notFound();

  return <PostDetail detail={detail} />;
}
