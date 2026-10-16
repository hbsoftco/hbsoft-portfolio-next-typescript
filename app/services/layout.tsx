import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Capabilities",
  description:
    "Hossein Bajan's engineering capabilities include Vue and Nuxt architecture, web applications, offline-first PWAs, and technical leadership.",
  openGraph: {
    title: "Engineering Capabilities | Hossein Bajan",
    description:
      "Frontend architecture, web applications, offline-first PWAs, and technical leadership.",
  },
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/services" } : undefined,
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
