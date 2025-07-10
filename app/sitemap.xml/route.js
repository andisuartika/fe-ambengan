// app/sitemap.xml/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ambengan.space";

  const urls = [
    "",
    "about",
    "destination",
    "accommodation",
    "tour",
    "gallery",
    "pricing",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (path) => `
      <url>
        <loc>${baseUrl}/${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${path === "" ? "1.0" : "0.8"}</priority>
      </url>`
      )
      .join("\n")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
