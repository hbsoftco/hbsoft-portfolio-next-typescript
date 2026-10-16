import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const jetBrainMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetBrainMono",
});

const description =
  "Hossein Bajan is a Senior Front-End Engineer focused on Vue.js, Nuxt.js, TypeScript, and offline-first web applications.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Hossein Bajan | Senior Front-End Engineer",
    template: "%s | Hossein Bajan",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Hossein Bajan",
    title: "Hossein Bajan | Senior Front-End Engineer",
    description,
  },
  twitter: {
    card: "summary",
    title: "Hossein Bajan | Senior Front-End Engineer",
    description,
  },
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainMono.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hossein Bajan",
              jobTitle: "Senior Front-End Engineer",
              sameAs: [
                "https://linkedin.com/in/hbsoftco",
                "https://github.com/hbsoftco",
                "https://stackoverflow.com/users/4308163/hossein-bajan",
              ],
            }),
          }}
        />
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
