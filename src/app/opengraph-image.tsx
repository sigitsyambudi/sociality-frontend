import { ImageResponse } from "next/og";
import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_SIZE,
  SocialCard,
} from "@/components/social-card";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard />, size);
}
