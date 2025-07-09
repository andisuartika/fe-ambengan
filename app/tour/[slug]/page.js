import ReveloLayout from "@/layout/ReveloLayout";
import { formatRupiah } from "@/utility/formatters";
import { notFound } from "next/navigation";
import Link from "next/link";
import TourForm from "@/components/TourForm";
import TourDestinationCard from "@/components/TourDestinationCard";

// ✅ Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tour?slug=${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Tour Not Found | Ambengan Village",
      description: "The requested tour could not be found.",
    };
  }

  const json = await res.json();
  const tour = json.data;

  return {
    title: `${tour.name} | Ambengan Village Tour`,
    description:
      tour.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
      "Explore exciting tours in Ambengan Village.",
    openGraph: {
      title: `${tour.name} | Ambengan Village Tour`,
      description:
        tour.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
        "Explore exciting tours in Ambengan Village.",
      url: `https://ambengan-village.vercel.app/tour/${tour.slug}`,
      type: "article",
      images: [
        {
          url: tour.thumbnail || "/images/default-tour.jpg",
          width: 1200,
          height: 630,
          alt: `Image of ${tour.name}`,
        },
      ],
    },
  };
}

// ✅ Main Page
export default async function TourDetailPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tour?slug=${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const json = await res.json();
  const tour = json.data;

  const destinationsArray = tour.destinations || [];
  const transformedData = destinationsArray.map((item, index) => ({
    id: item.id || index,
    title: item.name,
    slug: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
    location: item.address,
    description: item.description,
    category: item.category,
    price: item.tickets?.[0]?.price
      ? formatRupiah(item.tickets[0].price)
      : "Free",
    priceValue: item.tickets?.[0]?.price || 0,
    rating: Math.min(Math.max(parseInt(item.rating || 5), 1), 5),
    duration: item.duration || `${item.days || 3} days`,
    image: item.thumbnail,
  }));

  const allGalleries = tour?.destinations?.flatMap(
    (dest) => dest.galleries || []
  );
  const randomGalleries = [...allGalleries]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <ReveloLayout>
      {/* Banner */}
      <section className="page-banner-two rel z-1">
        <div className="container-fluid">
          <hr className="mt-0" />
          <div className="container">
            <div className="banner-inner pt-15 pb-25">
              <h2 className="page-title mb-10">{tour.name}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-20">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Tour Details</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <div className="destination-gallery">
        <div className="container-fluid">
          {randomGalleries.length > 0 && (
            <div className="mt-12 mb-10">
              <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
              <div className="row g-4 justify-content-center">
                {[0, 1, 2, 3, 4].map(
                  (i) =>
                    randomGalleries[i] && (
                      <div
                        className={`col-lg-${i === 1 ? 4 : 4} col-md-6`}
                        key={i}
                      >
                        <div className="gallery-item mb-4">
                          <img
                            src={randomGalleries[i].image}
                            alt={`Gallery ${i + 1}`}
                            className="w-full rounded"
                            style={{
                              width: "100%",
                              height: i === 1 ? "620px" : "300px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    )
                )}
                {allGalleries.length > 5 && (
                  <div className="col-lg-12 text-center mt-6">
                    <Link
                      href={`/gallery/${tour.code}`}
                      className="theme-btn style-two bgc-secondary inline-block px-6 py-3 rounded-lg"
                    >
                      <span data-hover="See All Photos">See All Photos</span>
                      <i className="fal fa-arrow-right ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <section className="tour-header-area pt-70 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 col-lg-7">
              <div className="tour-header-content mb-15">
                <span className="location d-inline-block mb-10">
                  <i className="fal fa-map-marker-alt" /> Ambengan, Buleleng,
                  Bali
                </span>
                <div className="section-title pb-5">
                  <h2>{tour.name}</h2>
                </div>
                <div className="ratting">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={
                        tour.rating >= i + 1
                          ? "fas fa-star"
                          : tour.rating >= i + 0.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 text-lg-end">
              <div className="tour-header-social mb-10">
                <a href="#">
                  <i className="far fa-share-alt" /> Share tours
                </a>
                <a href="#">
                  <i className="fas fa-heart bgc-secondary" /> Wish list
                </a>
              </div>
            </div>
          </div>
          <hr className="mt-50 mb-70" />
        </div>
      </section>

      {/* Detail Content */}
      <section className="tour-details-page pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour-details-content">
                <h3>Explore Tours</h3>
                <div
                  className="tour-description prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
                <div className="row pb-55">
                  <div className="col-md-6">
                    <div className="tour-include-exclude mt-30">
                      <h5>Included</h5>
                      <ul className="list-style-one check mt-25">
                        {tour.included.map((item, index) => (
                          <li key={index}>
                            <i className="far fa-check" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Tour Destinations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transformedData.map((destination, index) => (
                  <TourDestinationCard
                    key={destination.id}
                    {...destination}
                    aosDelay={index * 100}
                  />
                ))}
              </div>

              <h3>Clients Comments</h3>
              <div className="comments mt-30 mb-60">
                {tour.reviews.map((item, index) => (
                  <div className="comment-body" key={index}>
                    <div className="author-thumb">
                      <img
                        src={`https://xsgames.co/randomusers/avatar.php?g=male&seed=${index}`}
                        alt="Author"
                      />
                    </div>
                    <div className="content">
                      <h6>{item.name}</h6>
                      <div className="ratting">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i
                            key={i}
                            className={
                              item.rating >= i + 1
                                ? "fas fa-star"
                                : item.rating >= i + 0.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          />
                        ))}
                      </div>
                      <span className="time">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <p>{item.review.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-md-8 col-sm-10 rmt-75">
              <div className="blog-sidebar tour-sidebar">
                <div className="widget widget-booking">
                  <h5 className="widget-title">Tour Booking</h5>
                  <TourForm rates={tour.active_prices} tour={tour.slug} />
                </div>
                <div className="widget widget-contact">
                  <h5 className="widget-title">Need Help?</h5>
                  <ul className="list-style-one">
                    <li>
                      <i className="far fa-user" /> <a>{tour.manager.name}</a>
                    </li>
                    <li>
                      <i className="far fa-envelope" />{" "}
                      <a href={`mailto:${tour.manager.email}`}>
                        {tour.manager.email}
                      </a>
                    </li>
                    <li>
                      <i className="far fa-phone-volume" />{" "}
                      <a href={`callto:${tour.manager.phone}`}>
                        {tour.manager.phone}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ReveloLayout>
  );
}
