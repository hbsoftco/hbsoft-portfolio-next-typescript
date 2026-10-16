import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected professional, open-source, and personal projects by Hossein Bajan.",
  openGraph: {
    title: "Selected Work | Hossein Bajan",
    description:
      "Explore Hossein Bajan's work across software products, open-source tools, and personal projects.",
  },
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/work" } : undefined,
};

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
