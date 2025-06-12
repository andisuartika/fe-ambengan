import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../public/assets/css/ImageSlider.css";

const Arrow = ({ onClick, direction }) => (
  <div
    onClick={onClick}
    className={`arrow-btn ${direction === "left" ? "left" : "right"}`}
  >
    {direction === "left" ? (
      <FaChevronLeft size={12} />
    ) : (
      <FaChevronRight size={12} />
    )}
  </div>
);

export default function ImageSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i}>
            <div className="slider-image-wrapper">
              <img
                key={i}
                src={src}
                alt={`slide-${i}`}
                className="h-full object-containt slider-image"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
