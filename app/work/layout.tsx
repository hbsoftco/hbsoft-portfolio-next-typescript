import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected projects by Hossein Bajan: Bavexa, Diana Panel, and an audio-to-subtitle tool.",
  openGraph: {
    title: "Selected Work | Hossein Bajan",
    description:
      "Explore a podcast PWA, an open-source Vue component library, and a Persian audio-to-subtitle tool.",
  },
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/work" } : undefined,
};

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
