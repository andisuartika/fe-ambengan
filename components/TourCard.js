"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const TourCard = ({
  title = "",
  manager = "",
  slug = "",
  description = "",
  price = 0,
  rating = 5,
  image = "",
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="col-xl-4 col-md-6">
      <div
        className="destination-item tour-grid style-three bgc-lighter"
        data-aos="fade-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <div className="image">
          <span className="badge bgc-pink">{manager}</span>
          <a href="#" onClick={handleHeartClick} className="heart">
            {isLiked ? (
              <i className="fa fa-heart" />
            ) : (
              <i className="far fa-heart" />
            )}
          </a>
          <img src={image} alt="Tour List" />
        </div>
        <div className="content">
          <h5>
            <Link href={`/tour/${slug}`}>{title}</Link>
          </h5>
          <div className="destination-header">
            <div className="ratting">
              {Array.from({ length: 5 }).map((_, i) => {
                const index = i + 1;
                if (rating >= index) {
                  return <i key={i} className="fas fa-star" />;
                } else if (rating >= index - 0.5) {
                  return <i key={i} className="fas fa-star-half-alt" />;
                } else {
                  return <i key={i} className="far fa-star" />;
                }
              })}
            </div>
          </div>

          <p className="line-clamp-description">
            {description.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>

          <div className="destination-footer">
            <span className="price">
              <span>{price}</span>/person
            </span>
            <Link
              href={`/tour/${slug}`}
              className="theme-btn style-two style-three"
            >
              <span data-hover="Book Now">Book Now</span>
              <i className="fal fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
