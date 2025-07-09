// app/tour/TourClient.js
"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import TourCard from "@/components/TourCard";
import { formatRupiah } from "@/utility/formatters";

export default function TourClient() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const village = process.env.NEXT_PUBLIC_VILLAGE_CODE;
      const destUrl = `${baseUrl}/tours?village=${village}`;

      const response = await fetch(destUrl);
      if (!response.ok) throw new Error("Failed to fetch destination");

      const apiData = await response.json();
      const toursArray = apiData.data || [];

      const transformedData = toursArray.map((item, index) => ({
        id: item.id || index,
        title: item.name,
        manager: item.manager.name,
        slug: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
        description: item.description,
        category: item.category,
        price: formatRupiah(item.price),
        rating: Math.min(Math.max(parseInt(item.rating || 5), 1), 5),
        image: item.thumbnail,
      }));

      setTours(transformedData);
    } catch (err) {
      setError("Failed to load tours. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const paginatedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Banner
        pageTitle={"Ambengan Tour"}
        pageName={"Tour List"}
        image={"assets/images/banner/tour.png"}
      />
      <section className="tour-grid-page py-100 rel z-2">
        <div className="container">
          {loading && <p>Loading...</p>}
          {error && (
            <div className="text-red-500 mb-4">
              {error}{" "}
              <button onClick={fetchTours} className="underline">
                Retry
              </button>
            </div>
          )}
          {!loading && !error && (
            <>
              {tours.length === 0 ? (
                <p>No tours found.</p>
              ) : (
                <>
                  <div className="row">
                    {paginatedTours.map((tour, index) => (
                      <TourCard
                        key={tour.id}
                        {...tour}
                        aosDelay={index * 100}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <ul className="pagination pt-15 flex-wrap justify-center">
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
                        >
                          <i className="far fa-chevron-left" />
                        </button>
                      </li>

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
                          </button>
                        </li>
                      ))}

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
      </section>
    </>
  );
}
