"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/utility/formatters";

export default function TourForm({ rates, tour }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
  const [date, setDate] = useState(today);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + change, 0),
    }));
  };

  const totalPrice = useMemo(() => {
    return rates.reduce((total, rate) => {
      const qty = quantities[rate.id] || 0;
      return total + rate.price * qty;
    }, 0);
  }, [quantities, rates]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedTickets = Object.entries(quantities).filter(
      ([_, qty]) => qty > 0
    );

    if (selectedTickets.length === 0 || !date) {
      alert("Pilih minimal 1 tiket dan isi tanggal.");
      return;
    }

    const query = new URLSearchParams();
    query.set("type", "tour");
    query.set("slug", tour);
    query.set("date", date);

    // Tambahkan semua tiket ke query
    selectedTickets.forEach(([ticket_type, quantity]) => {
      query.append("ticket_type[]", ticket_type);
      query.append("quantity[]", quantity.toString());
    });

    const url = `${
      process.env.NEXT_PUBLIC_URL
    }/booking/tour?${query.toString()}`;

    // 👉 buka di tab baru
    window.open(url, "_blank");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="date mb-25">
        <b>Date</b>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          min={today}
        />
      </div>
      <hr className="mb-25" />

      <h6>Available Ticket(s) for You:</h6>
      <ul>
        {rates.map((rate, index) => (
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
              <div style={{ fontWeight: "bold" }}>{rate.name} /PAX</div>
              <div
                className="price"
                style={{ fontSize: "14px", color: "#888" }}
              >
                {formatRupiah(rate.price)}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => handleQuantityChange(rate.id, -1)}
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
                {quantities[rate.id] || 0}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(rate.id, 1)}
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
