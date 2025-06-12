"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function filterHomestay({ search, onSearchChange }) {
  const [localSearch, setLocalSearch] = useState(search || "");

  // Sync local search with parent
  useEffect(() => {
    setLocalSearch(search || "");
  }, [search]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    // Real-time search (optional - remove if you want submit-only)
    onSearchChange(value);
  };

  return (
    <div className="shop-shorter rel z-3 mb-20">
      <div
        className="widget widget-search"
        data-aos="fade-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <form className="default-search-form">
          <input
            type="text"
            placeholder="Search destinations..."
            value={localSearch}
            onChange={handleSearchInput}
          />
          <button type="submit" className="searchbutton far fa-search" />
        </form>
      </div>
      <select>
        <option value="default" selected="">
          Filter by Price
        </option>
        <option value="<100000">&lt; Rp100.000</option>
        <option value="<300000">&lt; Rp300.000</option>
        <option value="<500000">&lt; Rp500.000</option>
        <option value="<1000000">&lt; Rp1.000.000</option>
        <option value="<2000000">&lt; Rp2.000.000</option>
        <option value="<5000000">&lt; Rp5.000.000</option>
      </select>
      <select>
        <option value="default" selected="">
          By Reviews
        </option>
        <option value="1-star">1 Star</option>
        <option value="2-star">2 Star</option>
        <option value="3-star">3 Star</option>
        <option value="4-star">4 Star</option>
        <option value="5-star">5 Star</option>
      </select>
      <select>
        <option value="default" selected="">
          Short By
        </option>
        <option value="new">Newness</option>
        <option value="old">Oldest</option>
        <option value="hight-to-low">High To Low</option>
        <option value="low-to-high">Low To High</option>
      </select>
    </div>
  );
}
