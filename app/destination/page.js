import ReveloLayout from "@/layout/ReveloLayout";
import DestinationClient from "./DestinationClient";

export const metadata = {
  title: "Ambengan Destinations | Explore Hidden Gems in Buleleng",
  description:
    "Browse through amazing destinations in Ambengan Village, from natural waterfalls to cultural heritage spots. Find your perfect travel experience.",
  keywords: [
    "ambengan",
    "destination",
    "waterfalls",
    "forest",
    "desa wisata",
    "buleleng",
    "bali",
  ],
  authors: [{ name: "Best Desta Team" }],
  openGraph: {
    title: "Ambengan Destinations | Explore Hidden Gems",
    description:
      "Discover top destinations in Ambengan Village, including eco-tourism, culture, and nature.",
    url: "https://ambengan-village.vercel.app/destination",
    siteName: "Ambengan Village",
    images: [
      {
        url: "/public/assets/images/banner/destination.png",
        width: 1200,
        height: 630,
        alt: "Ambengan Destination Page",
      },
    ],
    type: "website",
  },
};

export default function DestinationPage() {
  return (
    <ReveloLayout>
      <DestinationClient />
    </ReveloLayout>
  );
}
