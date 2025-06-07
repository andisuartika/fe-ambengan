// components/Sidebar.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar({
  search,
  onSearchChange,
  onCategorySelect,
  selectedCategory = "All Destinations",
}) {
  const [localSearch, setLocalSearch] = useState(search || "");
  const [categories, setCategories] = useState([]);

  // Sync local search with parent
  useEffect(() => {
    setLocalSearch(search || "");
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    // Real-time search (optional - remove if you want submit-only)
    onSearchChange(value);
  };

  const handleCategoryClick = (categoryName) => {
    onCategorySelect({
      name: categoryName,
    });
    setLocalSearch(""); // Clear search when changing category
  };

  const fetchCategories = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${baseUrl}/categories`);
      const data = await response.json();

      const categoryList = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const allCategories = [
    { name: "All Destinations", count: 0 },
    ...categories.map((cat) => {
      return {
        name: cat.name ?? cat.category, // fallback
        count: cat.count ?? 0,
      };
    }),
  ];

  return (
    <div className="col-lg-3 col-md-6 col-sm-10 rmb-75">
      <div className="shop-sidebar mb-30">
        {/* Search Widget */}
        <div
          className="widget widget-search"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <form onSubmit={handleSearchSubmit} className="default-search-form">
            <input
              type="text"
              placeholder="Search destinations..."
              value={localSearch}
              onChange={handleSearchInput}
            />
            <button type="submit" className="searchbutton far fa-search" />
          </form>
        </div>

        {/* Category Widget */}
        <div
          className="widget widget-category"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <h5 className="widget-title">Category</h5>

          <ul className="list-style-three">
            {allCategories.length > 1 ? (
              allCategories.map((category) => (
                <li
                  key={category.code}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category.name);
                  }}
                  className={selectedCategory === category.name ? "active" : ""}
                  style={{
                    cursor: "pointer", // tambahkan baris ini
                    fontWeight:
                      selectedCategory === category.name ? "bold" : "normal",
                    color:
                      selectedCategory === category.name
                        ? "#63AB45"
                        : "inherit",
                  }}
                >
                  {category.name}
                  {category.count > 0 && (
                    <span className="ms-2 badge bg-secondary">
                      {category.count}
                    </span>
                  )}
                </li>
              ))
            ) : (
              <>
                <ul>
                  <li
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick("all", "All Destinations");
                    }}
                    className={selectedCategory === "all" ? "active" : ""}
                  >
                    All Destinations
                  </li>
                </ul>
                <li>
                  <span className="text-muted" style={{ fontSize: "14px" }}>
                    Loading categories...
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || localSearch) && (
          <div
            className="widget widget-filters"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <h5 className="widget-title">Active Filters</h5>
            <div className="active-filters">
              {selectedCategory !== "All Destinations" && (
                <div className="filter-item mb-2">
                  <span className="badge bg-secondary me-2">
                    Category: {selectedCategory}
                    <button
                      onClick={() =>
                        handleCategoryClick("all", "All Destinations")
                      }
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: "10px" }}
                    ></button>
                  </span>
                </div>
              )}
              {localSearch && (
                <div className="filter-item mb-2">
                  <span className="badge bg-success me-2">
                    Search: "{localSearch}"
                    <button
                      onClick={() => {
                        setLocalSearch("");
                        onSearchChange("");
                      }}
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: "10px" }}
                    ></button>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA Widget */}
      <div
        className="widget widget-cta"
        data-aos="fade-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <div className="content text-white">
          <span className="h6">Explore The Ambengan</span>
          <h3>Best Tourist Place</h3>
          <Link
            href="destination"
            className="theme-btn style-two bgc-secondary"
          >
            <span data-hover="Explore Now">Explore Now</span>
            <i className="fal fa-arrow-right" />
          </Link>
        </div>
        <div className="image">
          <img src="assets/images/widgets/cta-widget.png" alt="CTA" />
        </div>
        <div className="cta-shape">
          <img src="assets/images/widgets/cta-shape2.png" alt="Shape" />
        </div>
      </div>
    </div>
  );
}
