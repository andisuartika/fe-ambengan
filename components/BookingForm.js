"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatRupiah } from "@/utility/formatters";

export default function BookingForm({ tickets }) {
  const [date, setDate] = useState("");
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (ticketName, change) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketName]: Math.max((prev[ticketName] || 0) + change, 0),
    }));
  };

  const totalPrice = useMemo(() => {
    return tickets.reduce((total, ticket) => {
      const qty = quantities[ticket.name] || 0;
      return total + ticket.price * qty;
    }, 0);
  }, [quantities, tickets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan atau kirim data booking di sini
    console.log("Booking Data:", { date, quantities, totalPrice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="date mb-25">
        <b>From Date</b>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <hr className="mb-25" />

      <h6>Tickets:</h6>
      <ul>
        {tickets.map((ticket, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{ticket.name}</div>
              <div
                className="price"
                style={{ fontSize: "14px", color: "#888" }}
              >
                {formatRupiah(ticket.price)}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => handleQuantityChange(ticket.name, -1)}
                style={{
                  padding: "4px 10px",
                  fontSize: "16px",
                  background: "#eee",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                –
              </button>
              <span style={{ minWidth: "20px", textAlign: "center" }}>
                {quantities[ticket.name] || 0}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(ticket.name, 1)}
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
        ))}
      </ul>

      <h6>
        Total: <span className="price">{formatRupiah(totalPrice)}</span>
      </h6>

      <button type="submit" className="theme-btn style-two w-100 mt-15 mb-5">
        <span data-hover="Book Now">Book Now</span>
        <i className="fal fa-arrow-right" />
      </button>
    </form>
  );
}
