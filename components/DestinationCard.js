"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DestinationCard = ({
  id,
  title = "",
  slug = "",
  location = "",
  description = "",
  price = 0,
  rating = 5,
  image = "",
  className = "",
  category = "",
  showHeart = true,
  aosDelay = 0,
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
    <div
      className={`destination-item style-three bgc-lighter ${className}`}
      data-aos="fade-up"
      data-aos-duration={1500}
      data-aos-delay={aosDelay}
      data-aos-offset={50}
    >
      <div className="image relative">
        {showHeart && (
          <button
            onClick={handleHeartClick}
            className={`heart absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <i className={`fas fa-heart ${isLiked ? "text-white" : ""}`} />
          </button>
        )}

        <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="content p-6">
        <div className="destination-header flex justify-between items-start mb-3">
          <span className="location flex items-center text-gray-600 text-sm">
            <i className="fal fa-map-marker-alt mr-2" />
            {location}
          </span>
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

        <h5 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
          <Link
            href={`/destination/${slug}`}
            className="text-gray-800 hover:text-blue-600"
          >
            {title}
          </Link>
        </h5>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description
            .replace(/<\/?[^>]+(>|$)/g, "")
            .split(" ")
            .slice(0, 20)
            .join(" ") + "..."}
        </p>

        <ul className="blog-meta flex gap-4 mb-4 text-sm text-gray-500">
          <li className="flex items-center">
            <i className="far fa-tags mr-2" />
            {category.map((item, index) => (
              <span key={index} style={{ textTransform: "capitalize" }}>
                {item.name}
                {index < category.length - 1 && ", "}
              </span>
            ))}
          </li>
        </ul>

        <div className="destination-footer flex justify-between items-center">
          <div className="price">
            <span className="text-2xl font-bold text-blue-600">{price}</span>
            <span className="text-gray-600 text-sm">/person</span>
          </div>

          <Link
            href={`/destination/${slug}`}
            className="theme-btn style-two style-three"
          >
            <span data-hover="Get Ticket">Get Ticket</span>
            <i className="fal fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
