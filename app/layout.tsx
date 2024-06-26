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

export const metadata: Metadata = {
  title: "hbsoft | Software Engineer",
  description: "Software Engineer | Nest js | Express js | Angular | Vue js | Nuxt js | React js | Next js | Linux Lover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainMono.variable}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
