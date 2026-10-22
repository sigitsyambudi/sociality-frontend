import type { Metadata } from "next";
import { PostComposer } from "@/features/posts/components/post-composer";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Add Post | Sociality",
  description: "Prepare a post in Sociality preview mode.",
  robots: PREVIEW_ROUTE_ROBOTS,
};

export default function NewPostPage() {
  return <PostComposer />;
}
