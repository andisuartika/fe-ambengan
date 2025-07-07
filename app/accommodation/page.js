import dynamic from "next/dynamic";

// Load komponen client-only
const AccommodationPageClient = dynamic(
  () => import("./AccommodationPageClient"),
  { ssr: false }
);

export default function Page() {
  return <AccommodationPageClient />;
}
