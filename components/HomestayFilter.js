"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const SearchFilter = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [GuestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  /// Ambil tanggal besok (untuk default dan min check-in)
  const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  // Atur default saat pertama kali load
  useEffect(() => {
    const checkin = getTomorrow();
    const checkout = getNextDay(checkin);
    setCheckInDate(checkin);
    setCheckOutDate(checkout);
  }, []);

  // Ambil tanggal setelah 1 hari dari tanggal tertentu
  const getNextDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleCheckInChange = (e) => {
    const selectedCheckin = e.target.value;
    setCheckInDate(selectedCheckin);
    setCheckOutDate(getNextDay(selectedCheckin)); // set checkout ke H+1
  };

  useEffect(() => {
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 1);

    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 2);

    const formatDate = (date) => {
      return date.toISOString().split("T")[0]; // format YYYY-MM-DD
    };

    setCheckInDate(formatDate(checkIn));
    setCheckOutDate(formatDate(checkOut));
  }, []);

  const increment = (setter) => setter((prev) => prev + 1);
  const decrement = (setter) => setter((prev) => (prev > 1 ? prev - 1 : 1));

  const searchParams = {
    pathname: "/accommodation",
    query: {
      checkin: checkInDate,
      checkout: checkOutDate,
      guest: GuestCount,
      room: roomCount,
    },
  };

  return (
    <div className="container container-1400">
      <div
        className="search-filter-inner"
        data-aos="zoom-out-down"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        {/* Check-in Date */}
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-calendar-alt" />
          </div>
          <span className="title">Check-in Date</span>
          <input
            type="date"
            name="checkin"
            className="form-control"
            value={checkInDate}
            min={getTomorrow()}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>

        {/* Check-out Date */}
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-calendar-alt" />
          </div>
          <span className="title">Check-out Date</span>
          <input
            type="date"
            name="checkout"
            className="form-control"
            value={checkOutDate}
            min={
              checkInDate
                ? new Date(
                    new Date(checkInDate).setDate(
                      new Date(checkInDate).getDate() + 1
                    )
                  )
                    .toISOString()
                    .split("T")[0]
                : getTomorrow()
            }
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>

        {/* Adult Counter */}
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-user" />
          </div>
          <span className="title">Guests</span>
          <div
            className="counter"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => decrement(setGuestCount)}
              style={{
                padding: "4px 10px",
                fontSize: "16px",
                background: "#eee",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <span style={{ minWidth: "20px", textAlign: "center" }}>
              {GuestCount}
            </span>
            <button
              onClick={() => increment(setGuestCount)}
              style={{
                padding: "4px 10px",
                fontSize: "16px",
                background: "#eee",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Room Counter */}
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-door-open" />
          </div>
          <span className="title">Rooms</span>
          <div
            className="counter"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => decrement(setRoomCount)}
              style={{
                padding: "4px 10px",
                fontSize: "16px",
                background: "#eee",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <span style={{ minWidth: "20px", textAlign: "center" }}>
              {roomCount}
            </span>
            <button
              onClick={() => increment(setRoomCount)}
              style={{
                padding: "4px 10px",
                fontSize: "16px",
                background: "#eee",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Search Button */}
        <div className="search-button">
          <Link href={searchParams}>
            <button className="theme-btn">
              <span data-hover="Search">Search</span>
              <i className="far fa-search" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
