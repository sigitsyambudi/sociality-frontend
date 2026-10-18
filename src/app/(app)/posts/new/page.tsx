import type { Metadata } from "next";
import { PostComposer } from "@/features/posts/components/post-composer";

export const metadata: Metadata = {
  title: "Add Post | Sociality",
  description: "Prepare a post in Sociality preview mode.",
};

export default function NewPostPage() {
  return <PostComposer />;
}
