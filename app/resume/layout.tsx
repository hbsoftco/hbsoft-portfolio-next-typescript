import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience and Skills",
  description:
    "Explore Hossein Bajan's frontend engineering experience, technical skills, and professional background.",
  openGraph: {
    title: "Experience and Skills | Hossein Bajan",
    description:
      "Frontend architecture, full-stack delivery, and technical leadership across product teams.",
  },
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/resume" } : undefined,
};

export default function ResumeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
