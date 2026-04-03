import { MetadataRoute } from "next";

const APP_URL = "https://realty-receptionist.vercel.app";

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
