"use client";
import Banner from "@/components/Banner";
import { formatRupiah } from "@/utility/formatters";
import { useEffect, useState } from "react";
import TourCard from "@/components/TourCard";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
const page = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // fetch tours
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

      console.log("Fetched tours:", tours);
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
    <ReveloLayout>
      <Banner
        pageTitle={"Ambengan Tour"}
        pageName={"Tour List"}
        image={"assets/images/banner/tour.png"}
      />
      {/* Accomodation Grid Area start */}
      <section className="tour-grid-page py-100 rel z-2">
        <div className="container">
          {/* Loading / Error */}
          {loading && <p>Loading...</p>}
          {error && (
            <div className="text-red-500 mb-4">
              {error}{" "}
              <button onClick={fetchTours} className="underline">
                Retry
              </button>
            </div>
          )}
          {/* Results */}
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
      </section>
      {/* Tour Grid Area end */}
    </ReveloLayout>
  );
};
export default page;
