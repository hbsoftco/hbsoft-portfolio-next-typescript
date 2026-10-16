import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];

  const origin = siteUrl.replace(/\/$/, "");
  return ["", "/services", "/resume", "/work", "/contact"].map((path) => ({
    url: `${origin}${path}`,
  }));
}
