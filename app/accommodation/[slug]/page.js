import dynamic from "next/dynamic";

export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/homestay?slug=${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Accomodation Not Found | Ambengan Village",
      description: "The requested homestay could not be found.",
    };
  }

  const { data: homestay } = await res.json();

  return {
    title: `${homestay.name} | Ambengan Village`,
    description: homestay.description?.replace(/<\/?[^>]+(>|$)/g, ""),
    openGraph: {
      title: `${homestay.name} | Ambengan Village`,
      description: homestay.description?.replace(/<\/?[^>]+(>|$)/g, ""),
      url: `https://ambengan-village.vercel.app/accommodation/${params.slug}`,
      siteName: "Ambengan Village",
      images: homestay.roomTypes?.[0]?.galleries?.[0]?.url
        ? [
            {
              url: homestay.roomTypes[0].galleries[0].url,
              width: 1200,
              height: 630,
              alt: `${homestay.name} preview image`,
            },
          ]
        : [],
      type: "website",
    },
  };
}

// Dynamic import untuk client UI
const ClientPage = dynamic(() => import("./ClientPage"), {
  ssr: false,
});

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
