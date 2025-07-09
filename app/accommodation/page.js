import dynamic from "next/dynamic";

// Import komponen client-only
const AccommodationPageClient = dynamic(
  () => import("./AccommodationPageClient"),
  { ssr: false }
);

// ✅ Metadata SEO
export const metadata = {
  title: "Ambengan Homestay | Stay in Local Comfort",
  description:
    "Find the perfect homestay in Ambengan Village. Comfortable, affordable, and authentic Balinese experiences await you.",
  keywords: [
    "ambengan",
    "homestay",
    "accommodation",
    "desa wisata",
    "local stay",
    "bali",
  ],
  authors: [{ name: "Best Desta Team" }],
  openGraph: {
    title: "Ambengan Homestay | Local Comfort in Buleleng",
    description:
      "Explore accommodations in Ambengan Village. Book affordable homestays for your Bali trip.",
    url: "https://ambengan-village.vercel.app/accommodation",
    siteName: "Ambengan Village",
    images: [
      {
        url: "/public/assets/images/banner/homestay.png",
        width: 1200,
        height: 630,
        alt: "Ambengan Homestay Page",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <AccommodationPageClient />;
}
