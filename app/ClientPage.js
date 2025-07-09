"use client";

import { useEffect, useState } from "react";
import Counter from "@/components/Counter";
import SearchFilter from "@/components/SearchFilter";
import SectionTitle from "@/components/SectionTitle";
import Testimonial from "@/components/slider/Testimonial";
import ReveloLayout from "@/layout/ReveloLayout";
import { formatRupiah } from "@/utility/formatters";
import Link from "next/link";

export default function ClientPage() {
  const [destinations, setDestinations] = useState(null);
  const [categories, setCategories] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const village = process.env.NEXT_PUBLIC_VILLAGE_CODE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, catRes, accomRes] = await Promise.all([
          fetch(`${baseUrl}/destinations?village=${village}`),
          fetch(`${baseUrl}/categories`),
          fetch(`${baseUrl}/homestays?village=${village}`),
        ]);

        const destData = await destRes.json();
        const catData = await catRes.json();
        const accomData = await accomRes.json();

        setDestinations(destData.data || []);
        setCategories(catData.data || []);
        setAccommodations(accomData.data || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-40">
        <h2>Loading homepage...</h2>
        <p>Please wait while we load the best experiences in Ambengan 🌿</p>
      </div>
    );
  }

  const topDestinations = destinations.slice(0, 4);
  const topAccommodations = accommodations.slice(0, 4);
  return (
    <ReveloLayout header={1} footer={1}>
      {/* Hero Area Start */}
      <section className="hero-area bgc-black pt-200 rpt-120 rel z-2">
        <div className="container-fluid">
          <h1
            className="hero-title"
            data-aos="flip-up"
            data-aos-delay={50}
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            tour &amp; travel
          </h1>
          <div
            className="main-hero-image bgs-cover"
            style={{ backgroundImage: "url(assets/images/hero/hero.jpg)" }}
          />
        </div>
        <SearchFilter destinations={destinations} categories={categories} />
      </section>
      {/* Hero Area End */}
      {/* Destinations Area start */}
      <section className="destinations-area bgc-black pt-100 pb-70 rel z-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-white text-center counter-text-wrap mb-70"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle
                  title={"Discover the Beauty of Ambengan Village"}
                  countValue={34500}
                  subtitle1={"Where Culture Meets Nature in North Bali"}
                  subtitle2={"most popular experience you’ll remember"}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {topDestinations.map((dest, index) => (
              <div key={dest.id} className="col-xxl-3 col-xl-4 col-md-6">
                <div
                  className="destination-item"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="image">
                    <div className="ratting">
                      <i className="fas fa-star" /> {dest.rating}
                    </div>
                    <a href="#" className="heart">
                      <i className="fas fa-heart" />
                    </a>
                    <img
                      src={dest.thumbnail}
                      alt={dest.name}
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="content">
                    <span className="location">
                      <i className="fas fa-map-marker-alt" />{" "}
                      {dest.address
                        .replace(/<\/?[^>]+(>|$)/g, "") // hapus tag HTML
                        .split(" ")
                        .slice(0, 4)
                        .join(" ") + "..." || "Unknown"}
                    </span>
                    <h5>
                      <Link href={`/destination/${dest.slug}`}>
                        {dest.name}
                      </Link>
                    </h5>
                    <span className="desc line-clamp-3">
                      {dest.description
                        .replace(/<\/?[^>]+(>|$)/g, "") // hapus tag HTML
                        .split(" ")
                        .slice(0, 30)
                        .join(" ") + "..."}
                    </span>
                  </div>
                  <div className="destination-footer">
                    <span className="price">
                      <span>
                        {dest?.tickets?.length > 0
                          ? formatRupiah(dest.tickets[0].price)
                          : "0"}
                      </span>
                      /per person
                    </span>
                    <a href={`/destination/${dest.slug}`} className="read-more">
                      Book Now <i className="fal fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Destinations Area end */}
      {/* About Us Area start */}
      <section className="about-us-area py-100 rpb-90 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div
                className="about-us-content rmb-55"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-25">
                  <h2>Discover The Charm of Ambengan Village</h2>
                </div>
                <p>
                  We are dedicated to providing an unforgettable experience for
                  travelers seeking to enjoy the beauty of nature and culture in
                  Ambengan Village. Discover hidden gems and stunning natural
                  attractions
                </p>
                <div className="divider counter-text-wrap mt-45 mb-55">
                  <span>
                    Ambengan: A Natural Paradise Waiting to Be Explored
                  </span>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text "
                        data-speed={3000}
                        data-stop={3}
                      >
                        <Counter end={destinations.length} />
                      </span>
                      <span className="counter-title">Popular Destination</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text K-plus"
                        data-speed={3000}
                        data-stop={9}
                      >
                        <Counter end={999} />
                      </span>
                      <span className="counter-title">Tourists</span>
                    </div>
                  </div>
                </div>
                <Link href="destination" className="theme-btn mt-10 style-two">
                  <span data-hover="Explore Destinations">
                    Explore Destinations
                  </span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-7 col-lg-6"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="about-us-image">
                <div className="shape">
                  <img src="assets/images/about/shape1.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape2.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape3.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape4.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape5.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape6.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape7.png" alt="Shape" />
                </div>
                <img src="assets/images/about/about1.png" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Area end */}

      {/* Hotel Area start */}
      <section className="hotel-area bgc-black py-100 rel z-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-white text-center counter-text-wrap mb-70"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle
                  title={"Stay in Comfort at Our Homestays"}
                  subtitle2="most popular experience you’ll remember"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {topAccommodations.map((accom, index) => (
              <div className="col-xxl-6 col-xl-8 col-lg-10">
                <div
                  className="destination-item style-three"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="image">
                    <div className="ratting">
                      <i className="fas fa-star" /> {accom.rating}
                    </div>
                    <a href="#" className="heart">
                      <i className="fas fa-heart" />
                    </a>
                    <img
                      src={accom.thumbnail}
                      alt={accom.name}
                      style={{
                        width: "420px",
                        objectFit: "cover",
                        height: "320px",
                      }}
                    />
                  </div>
                  <div className="content">
                    <span className="location">
                      <i className="fal fa-map-marker-alt" /> {accom.address}
                    </span>
                    <h5>
                      <Link href={`/accomodation/${accom.slug}`}>
                        {accom.name}
                      </Link>
                    </h5>
                    <ul className="list-style-one">
                      {accom.facilities.slice(0, 4).map((facility, i) => (
                        <li key={i}>
                          <img
                            src={facility.icon}
                            alt={facility.name}
                            width="20"
                            color="white"
                            className="mx-2"
                          />
                          {facility.name}
                        </li>
                      ))}
                    </ul>
                    <div className="destination-footer">
                      <span className="price">
                        <span>
                          {accom?.roomTypes?.length > 0
                            ? formatRupiah(accom.roomTypes[0].price)
                            : "0"}
                        </span>
                        /per night
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hotel-more-btn text-center mt-40">
            <Link href="accomodation" className="theme-btn style-four">
              <span data-hover="Explore More Homestays">
                Explore More Homestays
              </span>
              <i className="fal fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
      {/* Hotel Area end */}
      {/* CTA Area start */}
      <section className="cta-area pt-100 rel z-1">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{
                  backgroundImage: "url(assets/images/cta/cta-homestay.png)",
                }}
              >
                <span className="category">Homestay</span>
                <h2>Local Charm: Discover Our Homestays </h2>
                <Link
                  href="/accommodation"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Explore Homestays">Explore Homestays</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{
                  backgroundImage: "url(assets/images/cta/cta-destination.png)",
                }}
              >
                <span className="category">Destinations</span>
                <h2>Enchanting Waters of Ambengan: Rivers & Waterfalls</h2>
                <Link href="/destination" className="theme-btn style-two">
                  <span data-hover="Explore Destination">
                    Explore Destination
                  </span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-delay={100}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{
                  backgroundImage: "url(assets/images/cta/cta-tour.png)",
                }}
              >
                <span className="category">Tours</span>
                <h2>Discover More with Our Signature Ambengan Toursa</h2>
                <Link
                  href="/tour"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Area end */}
    </ReveloLayout>
  );
}
