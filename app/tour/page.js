// app/tour/page.js

import ReveloLayout from "@/layout/ReveloLayout";
import TourClient from "./TourClient";

export const metadata = {
  title: "Ambengan Tour | Explore Nature & Culture in Bali",
  description:
    "Explore authentic tour packages in Ambengan Village. Experience tubing, waterfalls, and Balinese culture.",
  keywords: ["ambengan", "tour", "desa wisata", "buleleng", "bali adventure"],
  authors: [{ name: "Best Desta Team" }],
  openGraph: {
    title: "Ambengan Tour | Explore Nature & Culture",
    description:
      "Join unique tours in Ambengan Village and enjoy nature and culture.",
    url: "https://ambengan-village.vercel.app/tour",
    siteName: "Ambengan Village",
    images: [
      {
        url: "/public/assets/images/banner/tour.png",
        width: 1200,
        height: 630,
        alt: "Ambengan Tour Open Graph Image",
      },
    ],
    type: "website",
  },
};

export default function TourPage() {
  return (
    <ReveloLayout>
      <TourClient />
    </ReveloLayout>
  );
}
