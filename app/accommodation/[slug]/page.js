"use client";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import RoomCardSlider from "@/components/RoomCardSlider";
import { useSearchParams } from "next/navigation";

export default async function HomestayDetailPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}/homestay?slug=${params.slug}`;

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  try {
    const res = await fetch(`${baseUrl}/homestay?slug=${params.slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Failed to fetch homestay data:", res.status);
      return (
        <div className="container mx-auto py-10 text-center">
          <h1 className="text-2xl font-bold">Accomodation not found</h1>
          <p>The requested homestay slug could not be found.</p>
        </div>
      );
    }

    const { data: homestay } = await res.json();

    const getRandomGalleryImages = (homestay, count = 5) => {
      if (!homestay?.roomTypes) return [];

      // Step 1: Kumpulkan semua URL gambar dari semua roomTypes
      const allGalleryImages = homestay.roomTypes.flatMap((rt) =>
        (rt.galleries || []).map((g) => g.url)
      );

      // Step 2: Acak array
      const shuffled = allGalleryImages.sort(() => 0.5 - Math.random());

      // Step 3: Ambil 5 gambar (atau kurang jika tidak tersedia)
      return shuffled.slice(0, count);
    };

    const galleryImages = getRandomGalleryImages(homestay, 5);

    if (!homestay) {
      // Bisa juga pakai notFound() dari next/navigation
      return (
        <div className="container mx-auto py-10 text-center">
          <h1 className="text-2xl font-bold">Accomodation not available</h1>
          <p>No matching homestay data found for this slug.</p>
        </div>
      );
    }

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
                  {homestay.name}
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
                    <li className="breadcrumb-item active">
                      Accomodation Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* Page Banner End */}
        {/* Accomodation Gallery start */}
        <div className="tour-gallery">
          <div className="container-fluid">
            <div className="row gap-10 justify-content-center rel">
              <div className="row g-4 justify-content-center">
                {/* First column - 2 images */}
                <div className="col-lg-4 col-md-6">
                  {galleryImages[0] && (
                    <div className="gallery-item mb-4">
                      <img
                        src={galleryImages[0]}
                        alt={`${homestay.name} - Gallery 1`}
                        className="w-full h-64 object-cover rounded"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {galleryImages[3] && (
                    <div className="gallery-item">
                      <img
                        src={galleryImages[3]}
                        alt={`${homestay.name} - Gallery 4`}
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

                {/* Second column - 1 large image */}
                <div className="col-lg-4 col-md-6">
                  {galleryImages[1] && (
                    <div className="gallery-item">
                      <img
                        src={galleryImages[1]}
                        alt={`${homestay.name} - Gallery 2`}
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
                  {galleryImages[2] && (
                    <div className="gallery-item mb-4">
                      <img
                        src={galleryImages[2]}
                        alt={`${homestay.name} - Gallery 3`}
                        className="w-full rounded"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {galleryImages[4] && (
                    <div className="gallery-item">
                      <img
                        src={galleryImages[4]}
                        alt={`${homestay.name} - Gallery 5`}
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

                {/* See All Photos Button */}
                {homestay.roomTypes?.some((rt) => rt.galleries?.length > 5) && (
                  <div className="col-lg-12 text-center mt-6">
                    <Link
                      href={`/gallery/${homestay.code}`}
                      className="theme-btn style-two bgc-secondary inline-block px-6 py-3 rounded-lg transition-all"
                    >
                      <span data-hover="See All Photos">See All Photos</span>
                      <i className="fal fa-arrow-right ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Accomodation Gallery End */}
        {/* Accomodation Header Area start */}
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
                    <i className="fal fa-map-marker-alt" /> {homestay.address}
                  </span>
                  <div className="section-title pb-5">
                    <h2>{homestay.name}</h2>
                  </div>
                  <div className="ratting">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const index = i + 1;
                      if (homestay.rating >= index) {
                        return <i key={i} className="fas fa-star" />;
                      } else if (homestay.rating >= index - 0.5) {
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
        {/* Accomodation Header Area end */}
        {/* Accomodation Details Area start */}
        <section className="tour-details-page pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="tour-details-content">
                  <h3>Explore homestay</h3>
                  <p>{homestay.description.replace(/<\/?[^>]+(>|$)/g, "")} </p>
                </div>
                <h3>Facilities</h3>
                <div className="tour-activities mt-30 mb-45">
                  {homestay.facilities.map((facility) => (
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
                <h3>Maps</h3>
                <div className="tour-map mt-30 mb-50">
                  <iframe
                    src={`https://maps.google.com/maps?q=${homestay.latitude},${homestay.longitude}&z=14&output=embed`}
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-8 col-sm-10 rmt-75">
                <div className="blog-sidebar tour-sidebar">
                  <div
                    className="widget widget-gallery"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h5 className="widget-title">Gallery</h5>

                    <div className="gallery">
                      {galleryImages.map((item) => (
                        <a href={item}>
                          <img src={item} alt="Gallery" />
                        </a>
                      ))}
                    </div>
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
                        <a>{homestay.manager.name}</a>
                      </li>
                      <li>
                        <i className="far fa-envelope" />{" "}
                        <a href={`mailto:${homestay.manager.email}`}>
                          {homestay.manager.email}
                        </a>
                      </li>
                      <li>
                        <i className="far fa-phone-volume" />{" "}
                        <a href={`callto:${homestay.manager.phone}`}>
                          {homestay.manager.phone}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                {/* Room List */}
                <h3>Available Room Types in {homestay.name}</h3>

                {homestay.roomTypes.map((room, index) => (
                  <div key={room.id || index} className="mb-4">
                    <RoomCardSlider room={room} queryString={queryString} />
                  </div>
                ))}

                <h3>Reviews</h3>
                <div className="comments mt-30 mb-60">
                  {homestay.reviews.map((item, index) => (
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
            </div>
          </div>
        </section>
        {/* Tour Details Area end */}
      </ReveloLayout>
    );
  } catch (error) {
    console.error("Error fetching homestay:", error);
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p>Sorry, we couldn’t load the accomodation data.</p>
      </div>
    );
  }
}
