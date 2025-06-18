import ReveloLayout from "@/layout/ReveloLayout";
import { Accordion } from "react-bootstrap";
import TourForm from "@/components/TourForm";
import TourDestinationCard from "@/components/TourDestinationCard";
import Link from "next/link";

export default async function TourDetailPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tour?slug=${params.slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound(); // 404 fallback
  }

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
  const shuffled = [...allGalleries].sort(() => 0.5 - Math.random());
  const randomGalleries = shuffled.slice(0, 5);
  return (
    <ReveloLayout>
      <section className="page-banner-two rel z-1">
        <div className="container-fluid">
          <hr className="mt-0" />
          <div className="container">
            <div className="banner-inner pt-15 pb-25">
              <h2
                className="page-title mb-10"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                {tour.name}
              </h2>
              <nav aria-label="breadcrumb">
                <ol
                  className="breadcrumb justify-content-center mb-20"
                  data-aos="fade-right"
                  data-aos-delay={200}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
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
      {/* Page Banner End */}
      {/* Tour Gallery start */}
      <div className="destination-gallery">
        <div className="container-fluid">
          {randomGalleries.length > 0 && (
            <div className="mt-12 mb-10">
              <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
              <div className="row g-4 justify-content-center">
                {/* Kolom 1 */}
                <div className="col-lg-4 col-md-6">
                  {randomGalleries[0] && (
                    <div className="gallery-item mb-4">
                      <img
                        src={randomGalleries[0].image}
                        alt={`Gallery 1`}
                        className="w-full rounded"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {randomGalleries[3] && (
                    <div className="gallery-item">
                      <img
                        src={randomGalleries[3].image}
                        alt={`Gallery 4`}
                        className="w-full rounded"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Kolom 2 */}
                <div className="col-lg-4 col-md-6">
                  {randomGalleries[1] && (
                    <div className="gallery-item">
                      <img
                        src={randomGalleries[1].image}
                        alt={`Gallery 2`}
                        className="w-full rounded"
                        style={{
                          width: "100%",
                          height: "620px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Kolom 3 */}
                <div className="col-lg-4 col-md-6">
                  {randomGalleries[2] && (
                    <div className="gallery-item mb-4">
                      <img
                        src={randomGalleries[2].image}
                        alt={`Gallery 3`}
                        className="w-full rounded"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {randomGalleries[4] && (
                    <div className="gallery-item">
                      <img
                        src={randomGalleries[4].image}
                        alt={`Gallery 5`}
                        className="w-full rounded"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Tombol lihat semua */}
                {allGalleries.length > 5 && (
                  <div className="col-lg-12 text-center mt-6">
                    <Link
                      href={`/gallery/${tour.code}`}
                      className="theme-btn style-two bgc-secondary inline-block px-6 py-3 rounded-lg transition-all"
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

      {/* Tour Gallery End */}
      {/* Tour Header Area start */}
      <section className="tour-header-area pt-70 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 col-lg-7">
              <div
                className="tour-header-content mb-15"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="location d-inline-block mb-10">
                  <i className="fal fa-map-marker-alt" /> Ambengan, Buleleng,
                  Bali
                </span>
                <div className="section-title pb-5">
                  <h2>{tour.name}</h2>
                </div>
                <div className="ratting">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const index = i + 1;
                    if (tour.rating >= index) {
                      return <i key={i} className="fas fa-star" />;
                    } else if (tour.rating >= index - 0.5) {
                      return <i key={i} className="fas fa-star-half-alt" />;
                    } else {
                      return <i key={i} className="far fa-star" />;
                    }
                  })}
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-5 text-lg-end"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="tour-header-social mb-10">
                <a href="#">
                  <i className="far fa-share-alt" />
                  Share tours
                </a>
                <a href="#">
                  <i className="fas fa-heart bgc-secondary" />
                  Wish list
                </a>
              </div>
            </div>
          </div>
          <hr className="mt-50 mb-70" />
        </div>
      </section>
      {/* Tour Header Area end */}
      {/* Tour Details Area start */}
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
                {/* <p>{tour.description.replace(/<\/?[^>]+(>|$)/g, "")} </p> */}
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
                  <div
                    className="comment-body"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="author-thumb">
                      <img
                        src={`https://xsgames.co/randomusers/avatar.php?g=male&seed=${index}`}
                        alt="Author"
                      />
                    </div>
                    <div className="content">
                      <h6>{item.name}</h6>
                      <div className="ratting">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const index = i + 1;
                          if (item.rating >= index) {
                            return <i key={i} className="fas fa-star" />;
                          } else if (item.rating >= index - 0.5) {
                            return (
                              <i key={i} className="fas fa-star-half-alt" />
                            );
                          } else {
                            return <i key={i} className="far fa-star" />;
                          }
                        })}
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
            <div className="col-lg-4 col-md-8 col-sm-10 rmt-75">
              <div className="blog-sidebar tour-sidebar">
                <div
                  className="widget widget-booking"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h5 className="widget-title">Tour Booking</h5>
                  <TourForm rates={tour.active_prices} tour={tour.slug} />
                </div>
                <div
                  className="widget widget-contact"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
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
      {/* Tour Details Area end */}
    </ReveloLayout>
  );
}
