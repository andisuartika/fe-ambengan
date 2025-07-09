"use client";

import Banner from "@/components/Banner";
import SectionTitle from "@/components/SectionTitle";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ClientGalleryPage() {
  const [galleries, setGalleries] = useState([]);

  const fetchGalleries = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/galleries?village=${process.env.NEXT_PUBLIC_VILLAGE_CODE}`,
      { cache: "no-store" }
    );

    if (!res.ok) return;

    const json = await res.json();
    setGalleries(json.data);
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <ReveloLayout>
      <Banner
        pageTitle={"Gallery Ambengan"}
        image={"assets/images/banner/gallery.png"}
      />
      <section className="gallery-two-area py-100 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-center counter-text-wrap mb-50">
                <SectionTitle
                  title={"Explore Our Photo Gallery"}
                  subtitle1="A Visual Journey Through the Heart of Ambengan"
                />
              </div>
            </div>
          </div>
          <div className="row">
            {galleries.map((item, index) => (
              <div className="col-lg-4 col-sm-6" key={index}>
                <div className="gallery-two-item">
                  <div className="image">
                    <img src={item.url} alt={item.title || "Gallery"} />
                    <a href={item.url} className="link gallery">
                      <i className="fal fa-arrow-right" />
                    </a>
                  </div>
                  <div className="content">
                    <span className="category">
                      {item.category || "Gallery"}
                    </span>
                    <h5>
                      <Link href={item.url}>{item.title}</Link>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ReveloLayout>
  );
}
