import { MetadataRoute } from "next";

const APP_URL = "https://allthecalls.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
