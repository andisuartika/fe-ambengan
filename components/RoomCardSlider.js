"use client";
import Slider from "react-slick";
import Link from "next/link";
import { formatRupiah } from "@/utility/formatters";
import ImageSlider from "./slider/ImageSlider";
import { useSearchParams } from "next/navigation";

export default function RoomCard({ room, queryString }) {
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

  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guest = searchParams.get("guest");
  const quantity = searchParams.get("room");

  // handle booking
  const handleBooking = () => {
    if (!room?.code) {
      console.warn("Room code tidak tersedia.");
      return;
    }

    // 1) Buat array items payload
    const itemsPayload = [
      {
        roomType: room.code, // atau ambil array bookingItems kalau ada beberapa
        quantity: quantity,
      },
    ];

    // 2) Buat URLSearchParams dan set param dasar
    const params = new URLSearchParams({
      type: "homestay",
      checkIn: checkin,
      checkOut: checkout,
      guest: guest.toString(),
      // quantity total (opsional, backend bisa hitung dari itemsPayload)
      quantity: quantity.toString(),
    });

    // 3) Tambahkan items sebagai JSON‐encoded param
    params.set("items", JSON.stringify(itemsPayload));

    // 4) Buka di tab baru
    const url = `${
      process.env.NEXT_PUBLIC_URL
    }/booking/homestay?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
          <button
            onClick={handleBooking}
            className="theme-btn style-two style-three"
          >
            <span data-hover="Book Now">Book Now</span>
            <i className="fal fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
