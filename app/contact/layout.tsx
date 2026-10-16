import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hossein Bajan about frontend engineering and technical collaboration.",
  openGraph: {
    title: "Contact | Hossein Bajan",
    description: "Get in touch about frontend engineering and technical collaboration.",
  },
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/contact" } : undefined,
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
