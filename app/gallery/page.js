import dynamic from "next/dynamic";

// Metadata SEO
export const metadata = {
  title: "Gallery | Ambengan Village",
  description:
    "Explore stunning photos from Ambengan Village. Discover the culture, nature, and local experiences through our photo gallery.",
  keywords: [
    "gallery",
    "ambengan village",
    "bali",
    "desa wisata",
    "foto desa ambengan",
  ],
  authors: [{ name: "Best Desta Team" }],
  openGraph: {
    title: "Gallery | Ambengan Village",
    description:
      "Explore stunning photos from Ambengan Village and experience the culture, nature, and adventure visually.",
    url: "https://ambengan-village.vercel.app/gallery",
    siteName: "Ambengan Village",
    images: [
      {
        url: "/public/assets/images/banner/gallery.png",
        width: 1200,
        height: 630,
        alt: "Ambengan Gallery Banner",
      },
    ],
    type: "website",
  },
};

// Load client component
const ClientGalleryPage = dynamic(() => import("./ClientPage"), {
  ssr: false,
});

export default function Page() {
  return <ClientGalleryPage />;
}
