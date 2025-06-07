"use client";
import { useState, useEffect } from "react";
import DestinationCard from "./DestinationCard";
import { formatRupiah } from "@/utility/formatters";

export default function DestinationList({
  searchTerm = "",
  selectedCategory = null,
  onCategoryUpdate,
}) {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const village = process.env.NEXT_PUBLIC_VILLAGE_CODE;
      const destUrl = `${baseUrl}/destinations?village=${village}`;

      const response = await fetch(destUrl);
      if (!response.ok) throw new Error("Failed to fetch destinations");

      const apiData = await response.json();
      const destinationsArray = apiData.data || [];

      const transformedData = destinationsArray.map((item, index) => ({
        id: item.id || index,
        title: item.name,
        slug: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
        location: item.address,
        description: item.description,
        category: item.category,
        price: item.tickets?.[0]?.price
          ? formatRupiah(item.tickets[0].price)
          : "Free",
        priceValue: item.tickets?.[0]?.price || 0,
        rating: Math.min(Math.max(parseInt(item.rating || 5), 1), 5),
        duration: item.duration || `${item.days || 3} days`,
        image: item.thumbnail,
      }));

      setDestinations(transformedData);
      if (onCategoryUpdate) {
        const categories = [
          ...new Set(
            transformedData
              .flatMap((d) =>
                Array.isArray(d.category)
                  ? d.category.map((cat) => cat.name)
                  : []
              )
              .filter(Boolean)
          ),
        ];
        onCategoryUpdate(categories);
      }

      console.log("Fetched destinations:", transformedData);
    } catch (err) {
      setError("Failed to load destinations. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    let filtered = destinations;

    if (searchTerm) {
      filtered = filtered.filter(
        (dest) =>
          dest.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All Destinations") {
      filtered = filtered.filter(
        (dest) =>
          Array.isArray(dest.category) &&
          dest.category.some((cat) => cat?.name === selectedCategory)
      );
    }

    setFilteredDestinations(filtered);
    setCurrentPage(1);
  }, [destinations, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render
  return (
    <div className="destination-list">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Travel Destinations
          </h2>
          <p className="text-gray-600">
            {loading
              ? "Loading destinations..."
              : error
              ? "Error loading destinations"
              : `${filteredDestinations.length} destination${
                  filteredDestinations.length !== 1 ? "s" : ""
                } found`}
          </p>
        </div>

        {/* Loading / Error */}
        {loading && <p>Loading...</p>}
        {error && (
          <div className="text-red-500 mb-4">
            {error}{" "}
            <button onClick={fetchDestinations} className="underline">
              Retry
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {filteredDestinations.length === 0 ? (
              <p>No destinations found.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedDestinations.map((destination, index) => (
                    <DestinationCard
                      key={destination.id}
                      {...destination}
                      aosDelay={index * 100}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <ul
                    className="pagination pt-15 flex-wrap justify-center"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    {/* Previous */}
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="page-link"
                        disabled={currentPage === 1}
                      >
                        <i className="far fa-chevron-left" />
                      </button>
                    </li>

                    {/* Numbered Pages */}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          onClick={() => setCurrentPage(i + 1)}
                          className="page-link"
                        >
                          {i + 1}
                          {currentPage === i + 1 && (
                            <span className="sr-only">(current)</span>
                          )}
                        </button>
                      </li>
                    ))}

                    {/* Optional Ellipsis if many pages */}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}

                    {/* Next */}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        className="page-link"
                        disabled={currentPage === totalPages}
                      >
                        <i className="far fa-chevron-right" />
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
