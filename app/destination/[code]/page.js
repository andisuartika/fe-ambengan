import SectionTitle from "@/components/SectionTitle";
import Destination from "@/components/slider/Destination";
import Subscribe from "@/components/Subscribe";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";

export default async function DestinationDetailPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const vilage = process.env.NEXT_PUBLIC_VILLAGE_CODE;
  const destUrl = `${baseUrl}/destinations?village=${vilage}`;

  try {
    const res = await fetch(`${baseUrl}/destination?code=${params.code}`, {
      cache: "no-store",
    });

    const destRes = await fetch(`${destUrl}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <div className="container mx-auto py-10 text-center">
          <h1 className="text-2xl font-bold">Destinasi tidak ditemukan.</h1>
          <p>Kode destinasi tidak valid atau destinasi tidak tersedia.</p>
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
        {/* About Us Area start */}
        <section className="about-us-area pt-90 pb-100 rel z-1">
          <div className="container">
            <div className="row gap-100 align-items-center">
              <div className="col-lg-6">
                <div
                  className="destination-details-content rmb-55"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="section-title mb-25">
                    <span className="h2 mb-15">Welcome to </span>
                    <h2>{destination.name}</h2>
                  </div>
                  <p>
                    {destination.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                  <p>
                    The island's rich cultural heritage is evident in numerous
                    temples, including the iconic Tanah Lot and Uluwatu Temple,
                    as well as the cultural
                  </p>
                  <Link
                    href="destination-details"
                    className="theme-btn mt-25 style-two"
                  >
                    <span data-hover="Explore Destinations">
                      Explore Destinations
                    </span>
                    <i className="fal fa-arrow-right" />
                  </Link>
                </div>
              </div>
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="destination-map">
                  {destination.latitude && destination.longitude && (
                    <div className="mt-8 mb-6">
                      <h2 className="text-2xl font-semibold mb-4">Location</h2>
                      <div
                        className="map-container rounded-xl overflow-hidden"
                        style={{ height: "400px" }}
                      >
                        <iframe
                          src={`https://maps.google.com/maps?q=${destination.latitude},${destination.longitude}&z=15&output=embed`}
                          style={{ border: 0, width: "100%", height: "100%" }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About Us Area end */}
        {/* Destinations Area start */}
        <section className="destinations-area bgc-lighter pt-85 pb-100 rel z-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div
                  className="section-title text-center counter-text-wrap mb-50"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <SectionTitle title={"Explore Our Popular Destinations"} />
                </div>
              </div>
            </div>
            <Destination destData={destData} />
          </div>
        </section>
        {/* Destinations Area end */}

        {/* Newsletter Area end */}
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
