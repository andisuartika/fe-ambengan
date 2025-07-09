"use client";

import Banner from "@/components/Banner";
import Counter from "@/components/Counter";
import SectionTitle from "@/components/SectionTitle";
import Client from "@/components/slider/Client";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";

export default function AboutClientPage() {
  return (
    <ReveloLayout>
      <Banner pageTitle={"About"} image={"assets/images/banner/about.png"} />
      {/* About Area */}
      <section className="about-area-two py-100 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-3">
              <span className="subtitle mb-35">About Ambegan Village</span>
            </div>
            <div className="col-xl-9">
              <div className="about-page-content">
                <div className="row">
                  <div className="col-lg-8 pe-lg-5 me-lg-5">
                    <div className="section-title mb-25">
                      <h2>
                        Experience Authentic & Inspiring Village Tourism in
                        North Bali
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="experience-years rmb-20">
                      <span className="title bgc-secondary">
                        Years Of Experience
                      </span>
                      <span className="text">We have</span>
                      <span className="years">10+</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <p>
                      We welcome you to Ambengan Village, where nature, culture,
                      and warm hospitality meet...
                    </p>
                    <ul className="list-style-two mt-35">
                      <li>Breathtaking Nature</li>
                      <li>Low Cost & High Value</li>
                      <li>Community-Based Tourism</li>
                      <li>24/7 Warm Welcome</li>
                    </ul>
                    <Link href="/tour" className="theme-btn style-three mt-30">
                      <span data-hover="Explore Tours">Explore Tours</span>
                      <i className="fal fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="about-features-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-4 col-md-6">
              <div className="about-feature-image">
                <img src="/assets/images/about/about-1.png" alt="About" />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="about-feature-image">
                <img src="/assets/images/about/about-2.png" alt="About" />
              </div>
            </div>
            <div className="col-xl-4 col-md-8">
              <div className="about-feature-boxes">
                <div className="feature-item style-three bgc-secondary">
                  <div className="icon-title">
                    <div className="icon">
                      <i className="flaticon-award-symbol" />
                    </div>
                    <h5>
                      <Link href="/destination-details">
                        Officially Recognized Tourism Village
                      </Link>
                    </h5>
                  </div>
                  <p>
                    Ambengan has been officially named one of the 75 tourism
                    villages in Buleleng.
                  </p>
                </div>
                <div className="feature-item style-three bgc-primary">
                  <div className="icon-title">
                    <div className="icon">
                      <i className="flaticon-guidepost" />
                    </div>
                    <h5>
                      <Link href="/destination-details">
                        10+ Natural & Cultural Attractions
                      </Link>
                    </h5>
                  </div>
                  <p>
                    Jembong Waterfall, rice terraces, forest views, and local
                    crafts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="about-us-area pt-70 pb-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="about-us-content rmb-55">
                <div className="section-title mb-25">
                  <h2>Top Reasons to Visit Our Village</h2>
                </div>
                <p>
                  At Ambengan, we offer more than just a destination — we offer
                  a genuine experience...
                </p>
                <div className="row pt-25">
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span className="count-text plus">
                        <Counter end={10} />
                      </span>
                      <span className="counter-title">
                        Natural & Cultural Spots
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span className="count-text k-plus">
                        <Counter end={5} />
                      </span>
                      <span className="counter-title">Happy Visitors</span>
                    </div>
                  </div>
                </div>
                <Link href="/destination" className="theme-btn mt-10 style-two">
                  <span data-hover="Explore Destinations">
                    Explore Destinations
                  </span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="about-us-page">
                <img src="/assets/images/about/about-page.png" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="about-feature-two bgc-black pt-100 pb-45 rel z-1">
        <div className="container">
          <div className="section-title text-center text-white counter-text-wrap mb-50">
            <SectionTitle
              title={"Explore the Beauty of Ambengan Village"}
              subtitle1={
                "Experience Nature, Culture, and Local Wisdom Through Our Video Journey"
              }
            />
          </div>
        </div>
        <div className="video-area pt-25 rel z-1">
          <div className="container">
            <div className="video-wrap">
              <img src="/assets/images/about/video.png" alt="Video" />
              <a
                href="https://www.youtube.com/watch?v=38zycl0Idcw"
                className="mfp-iframe video-play"
              >
                <i className="fas fa-play" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <div className="client-logo-area mb-100 py-100">
        <div className="container">
          <div className="client-logo-wrap pt-60 pb-55">
            <div className="text-center mb-40">
              <h6>Supported by:</h6>
            </div>
            <Client />
          </div>
        </div>
      </div>
    </ReveloLayout>
  );
}
