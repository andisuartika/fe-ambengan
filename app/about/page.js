import dynamic from "next/dynamic";

export const metadata = {
  title: "About | Ambengan Village",
  description:
    "Discover the heart of Ambengan Village in North Bali — a sustainable and cultural tourism destination filled with natural beauty and authentic experiences.",
  keywords: [
    "about ambengan",
    "desa wisata",
    "buleleng",
    "bali utara",
    "tourism village",
    "eco village",
  ],
  openGraph: {
    title: "About | Ambengan Village",
    description:
      "Learn about Ambengan Village and its commitment to eco-tourism and authentic local experiences in North Bali.",
    url: "https://ambengan-village.vercel.app/about",
    siteName: "Ambengan Village",
    images: [
      {
        url: "/public/assets/images/banner/about.png",
        width: 1200,
        height: 630,
        alt: "Ambengan Village Banner",
      },
    ],
    type: "website",
  },
  authors: [{ name: "Best Desta Team" }],
};

const AboutClientPage = dynamic(() => import("./ClientPage"), {
  ssr: false,
});

export default function Page() {
  return <AboutClientPage />;
}
