"use client";
import Slider from "react-slick";
import Link from "next/link";
import { formatRupiah } from "@/utility/formatters";
import ImageSlider from "./slider/ImageSlider";

export default function RoomCard({ room }) {
  const allImages = [
    room.thumbnail,
    ...(room.galleries || []).map((g) => g.url),
  ];

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="destination-item style-three bgc-lighter"
      data-aos="fade-up"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <ImageSlider images={allImages} />

      <div className="content">
        <h5>
          <Link href="tour-details">{room.name}</Link>
        </h5>
        <p>
          {room.description
            .replace(/<\/?[^>]+(>|$)/g, "")
            .split(" ")
            .slice(0, 20)
            .join(" ") + "..."}
        </p>

        <p>Facilities Room :</p>
        <ul className="blog-meta">
          {room.facilities.map((facility, index) => (
            <li key={index}>
              <i className="far fa-check" /> {facility}
            </li>
          ))}
        </ul>
        <ul className="blog-meta">
          <li>
            <i className="far fa-user" /> {room.capacity} guest
          </li>
        </ul>
        <div className="destination-footer">
          <span className="price">
            <span>{formatRupiah(room.price)}</span>/Night
          </span>
          <Link href="tour-details" className="theme-btn style-two style-three">
            <span data-hover="Book Now">Book Now</span>
            <i className="fal fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
