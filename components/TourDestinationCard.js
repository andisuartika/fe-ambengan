"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const TourDestinationCard = ({
  id,
  title = "",
  slug = "",
  location = "",
  description = "",
  price = 0,
  rating = 5,
  image = "",
  className = "",
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
            className={`heart absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 
            }`}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? (
              <i className="fa fa-heart" />
            ) : (
              <i className="far fa-heart" />
            )}
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
        <h5 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
          <Link
            href={`/destination/${slug}`}
            className="text-gray-800 hover:text-blue-600"
          >
            {title}
          </Link>
        </h5>
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

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description
            .replace(/<\/?[^>]+(>|$)/g, "")
            .split(" ")
            .slice(0, 40)
            .join(" ") + "..."}
        </p>
      </div>
    </div>
  );
};

export default TourDestinationCard;
