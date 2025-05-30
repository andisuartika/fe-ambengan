"use client";
import { useState, useMemo } from "react";
import { sliderProps } from "@/utility/sliderprops";
import Link from "next/link";
import Slider from "react-slick";

const Destination = ({ destData }) => {
  return (
    <Slider {...sliderProps.destination} className="destination-active">
      {destData && destData.length > 0 ? (
        destData.map((dest, index) => (
          <div
            key={dest.id || `dest-${index}`}
            className="destination-item style-two"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <div className="image">
              <img
                src={dest.thumbnail}
                alt={dest.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="content">
              <h6>
                <Link href={`/destination/${dest.code || dest.id}`}>
                  {dest.name || `Destination ${index + 1}`}
                </Link>
              </h6>
              <span className="tours">{dest.address}</span>
            </div>
          </div>
        ))
      ) : (
        // Fallback for when destData is empty or undefined
        <div
          className="destination-item style-two"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="image">
            <img
              src="assets/images/destinations/destination-five1.jpg"
              alt="Destination"
            />
          </div>
          <div className="content">
            <h6>
              <Link href="/destinations">Destinations</Link>
            </h6>
            <span className="tours">No tours available</span>
          </div>
        </div>
      )}
    </Slider>
  );
};

export default Destination;
