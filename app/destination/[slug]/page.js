import ReveloLayout from "@/layout/ReveloLayout";
import BookingForm from "@/components/BookingForm";

import Link from "next/link";
export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/destination?slug=${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Destination Not Found | Ambengan Village",
      description: "The requested destination could not be found.",
    };
  }

  const json = await res.json();
  const destination = json.data;

  return {
    title: `${destination.name} | Destination in Ambengan Village`,
    description:
      destination.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
      "Explore unique natural and cultural destinations in Ambengan Village.",
    openGraph: {
      title: `${destination.name} | Ambengan Destination`,
      description:
        destination.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
        "Explore top-rated tourist spots in Ambengan.",
      url: `https://ambengan-village.vercel.app/destination/${destination.slug}`,
      type: "article",
      images: [
        {
          url:
            destination.galleries?.[0]?.image ||
            destination.galleries?.[0]?.url ||
            "/images/default-destination.jpg",
          width: 1200,
          height: 630,
          alt: `Image of ${destination.name}`,
        },
      ],
    },
  };
}

export default async function DestinationDetailPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const vilage = process.env.NEXT_PUBLIC_VILLAGE_CODE;
  const destUrl = `${baseUrl}/destinations?village=${vilage}`;

  try {
    const res = await fetch(`${baseUrl}/destination?slug=${params.slug}`, {
      cache: "no-store",
    });

    const destRes = await fetch(`${destUrl}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <div className="container mx-auto py-10 text-center">
          <h1 className="text-2xl font-bold">Destinasi tidak ditemukan.</h1>
          <p>Slug destinasi tidak valid atau destinasi tidak tersedia.</p>
        </div>
      );
    }

    const json = await res.json();
    const destination = json.data;

    const destJson = await destRes.json();
    const destData = destJson.data;

    return (
      <ReveloLayout>
        {/* Page Banner Start */}
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
                ></h2>
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
                    <li className="breadcrumb-item active">
                      Destination Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* Page Banner End */}
        {/* Destination Gallery start */}
        <div className="destination-gallery">
          <div className="container-fluid">
            {destination.galleries && destination.galleries.length > 0 && (
              <div className="mt-12 mb-10">
                <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
                <div className="row g-4 justify-content-center">
                  {/* First column - 2 images */}
                  <div className="col-lg-4 col-md-6">
                    {destination.galleries[0] && (
                      <div className="gallery-item mb-4">
                        <img
                          src={
                            destination.galleries[0].image ||
                            destination.galleries[0].url ||
                            destination.galleries[0]
                          }
                          alt={`${destination.name} - Gallery 1`}
                          className="w-full h-64 object-cover rounded"
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    {destination.galleries[3] && (
                      <div className="gallery-item">
                        <img
                          src={
                            destination.galleries[3].image ||
                            destination.galleries[3].url ||
                            destination.galleries[3]
                          }
                          alt={`${destination.name} - Gallery 4`}
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

                  {/* Second column - 1 larger image */}
                  <div className="col-lg-4 col-md-6">
                    {destination.galleries[1] && (
                      <div className="gallery-item">
                        <img
                          src={
                            destination.galleries[1].image ||
                            destination.galleries[1].url ||
                            destination.galleries[1]
                          }
                          alt={`${destination.name} - Gallery 2`}
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

                  {/* Third column - 2 images */}
                  <div className="col-lg-4 col-md-6">
                    {destination.galleries[2] && (
                      <div className="gallery-item mb-4">
                        <img
                          src={
                            destination.galleries[2].image ||
                            destination.galleries[2].url ||
                            destination.galleries[2]
                          }
                          alt={`${destination.name} - Gallery 3`}
                          className="w-full rounded"
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    {destination.galleries[4] && (
                      <div className="gallery-item">
                        <img
                          src={
                            destination.galleries[4].image ||
                            destination.galleries[4].url ||
                            destination.galleries[4]
                          }
                          alt={`${destination.name} - Gallery 5`}
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

                  {/* See All Photos button */}
                  {destination.galleries.length > 5 && (
                    <div className="col-lg-12 text-center mt-6">
                      <Link
                        href={`/gallery/${destination.code}`}
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
        {/* Destination Gallery End */}

        {/* Destination Header Area start */}
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
                    <i className="fal fa-map-marker-alt" />{" "}
                    {destination.address}
                  </span>
                  <div className="section-title pb-5">
                    <h2>{destination.name}</h2>
                  </div>
                  <div className="ratting">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const index = i + 1;
                      if (destination.rating >= index) {
                        return <i key={i} className="fas fa-star" />;
                      } else if (destination.rating >= index - 0.5) {
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
        {/* Destination Header Area end */}
        {/* Tour Details Area start */}
        <section className="tour-details-page pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="tour-details-content">
                  <h3>Explore Destination</h3>
                  <div
                    className="tour-description prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: destination.description,
                    }}
                  />

                  <h3>Facilities</h3>
                  <div className="tour-activities mt-30 mb-45">
                    {destination.facilities.map((facility) => (
                      <div className="tour-activity-item">
                        <img
                          src={facility.icon}
                          alt={facility.name}
                          width={32}
                          height={32}
                        />
                        <span className="mx-2">{facility.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <h3>Maps</h3>
                <div className="tour-map mt-30 mb-50">
                  <iframe
                    src={`https://maps.google.com/maps?q=${destination.latitude},${destination.longitude}&z=14&output=embed`}
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <h3>Reviews</h3>
                <div className="comments mt-30 mb-60">
                  {destination.reviews.map((item, index) => (
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
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
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
                    <h5 className="widget-title">Booking Ticket</h5>
                    <BookingForm
                      tickets={destination.tickets}
                      destination={destination.slug}
                    />
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
                        <i className="far fa-user" />{" "}
                        <span>{destination.manager.name}</span>
                      </li>
                      <li>
                        <i className="far fa-envelope" />{" "}
                        <a href={`mailto:${destination.manager.email}`}>
                          {destination.manager.email}
                        </a>
                      </li>
                      <li>
                        <i className="far fa-phone-volume" />{" "}
                        <a href={`callto:${destination.manager.phone}`}>
                          {destination.manager.phone}
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
  } catch (error) {
    console.error("Error fetching destination:", error);
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Terjadi kesalahan</h1>
        <p>Maaf, terjadi kesalahan saat memuat data destinasi.</p>
      </div>
    );
  }
}
