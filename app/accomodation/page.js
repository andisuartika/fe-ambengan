"use client";
import Banner from "@/components/Banner";
import { formatRupiah } from "@/utility/formatters";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import HomestayCard from "@/components/HomestayCard";
import { useEffect, useState } from "react";
const page = () => {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // fetch homestay
  const fetchHomestays = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const village = process.env.NEXT_PUBLIC_VILLAGE_CODE;
      const destUrl = `${baseUrl}/homestays?village=${village}`;

      const response = await fetch(destUrl);
      if (!response.ok) throw new Error("Failed to fetch destination");

      const apiData = await response.json();
      const homestaysArray = apiData.data || [];

      const transformedData = homestaysArray.map((item, index) => ({
        id: item.id || index,
        title: item.name,
        manager: item.manager.name,
        slug: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
        location: item.address,
        description: item.description,
        category: item.category,
        price: item.roomTypes?.length
          ? formatRupiah(
              Math.min(
                ...item.roomTypes.map((rt) => {
                  const active = rt.active_prices;
                  if (active?.length) {
                    return Math.min(...active.map((ap) => ap.price));
                  }
                  return parseFloat(rt.price) || Infinity;
                })
              )
            )
          : "Free",

        priceValue: item.roomTypes?.length
          ? Math.min(
              ...item.roomTypes.map((rt) => {
                const active = rt.active_prices;
                if (active?.length) {
                  return Math.min(...active.map((ap) => ap.price));
                }
                return parseFloat(rt.price) || Infinity;
              })
            )
          : 0,
        rating: Math.min(Math.max(parseInt(item.rating || 5), 1), 5),
        image: item.thumbnail,
      }));

      setHomestays(transformedData);

      console.log("Fetched homestays:", homestays);
    } catch (err) {
      setError("Failed to load homestays. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomestays();
  }, []);

  const totalPages = Math.ceil(homestays.length / itemsPerPage);

  const paginatedHomestays = homestays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <ReveloLayout>
      <Banner
        pageTitle={"Ambengan Homestay"}
        pageName={"Homestay List"}
        search={true}
        image={"assets/images/banner/homestay.png"}
      />
      {/* Tour Grid Area start */}
      <section className="tour-grid-page py-100 rel z-2">
        <div className="container">
          {/* Loading / Error */}
          {loading && <p>Loading...</p>}
          {error && (
            <div className="text-red-500 mb-4">
              {error}{" "}
              <button onClick={fetchHomestays} className="underline">
                Retry
              </button>
            </div>
          )}
          {/* Results */}
          {!loading && !error && (
            <>
              {homestays.length === 0 ? (
                <p>No homestays found.</p>
              ) : (
                <>
                  <div className="row">
                    {paginatedHomestays.map((homestay, index) => (
                      <HomestayCard
                        key={homestay.id}
                        {...homestay}
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
    </ReveloLayout>
  );
};
export default page;
