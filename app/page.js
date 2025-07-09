import dynamic from "next/dynamic";

// Dynamic import untuk komponen client-only
const ClientPage = dynamic(() => import("./ClientPage"), {
  ssr: false,
  loading: () => <p className="text-center py-20">Loading homepage...</p>,
});


// Metadata untuk SEO
export const metadata = {
  title: "Ambengan Village | Explore Nature, Culture, and Hospitality",
  description:
    "Discover the beauty of Ambengan Village through tours, destinations, and comfortable homestays in North Bali.",
  keywords: [
    "Ambengan Village",
    "tourism",
    "homestay",
    "destination",
    "North Bali",
    "eco-tourism",
    "culture",
    "nature",
  ],
  authors: [{ name: "Best Desta Team" }],
  openGraph: {
    title: "Ambengan Village | Authentic Tourism in North Bali",
    description:
      "Explore rural tourism in Ambengan Village – nature, culture, and local hospitality combined.",
    url: "https://ambengan-village.vercel.app",
    siteName: "Ambengan Village",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Ambengan Village Hero Banner",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
