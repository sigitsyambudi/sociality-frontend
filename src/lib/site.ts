import type { Metadata } from "next";

export const SITE_NAME = "Sociality";
export const SITE_URL = "https://sociality-frontend-chi.vercel.app";
export const SITE_TITLE = "Sociality | Frontend Portfolio Preview";
export const SITE_DESCRIPTION =
  "Explore Sociality, a polished and responsive social-media frontend portfolio preview built with Next.js, TypeScript, and accessible UI patterns.";

export const PREVIEW_ROUTE_ROBOTS = {
  index: false,
  follow: false,
} as const;

export const rootMetadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
} satisfies Metadata;
