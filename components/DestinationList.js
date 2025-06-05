"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DestinationCard from "./DestinationCard";
import { formatRupiah } from "@/utility/formatters";

export default function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const vilage = process.env.NEXT_PUBLIC_VILLAGE_CODE;

      const destUrl = `${baseUrl}/destinations?village=${vilage}`;

      const response = await fetch(destUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();

      // Debug: Log struktur API response
      console.log("API Response:", apiData);
      console.log("Type:", typeof apiData);
      console.log("Is Array:", Array.isArray(apiData));

      // Handle berbagai kemungkinan struktur API response
      let destinationsArray = [];

      destinationsArray = apiData.data;

      // Transform API data
      const transformedData = destinationsArray.map((item, index) => ({
        id: item.id || item._id || index,
        title: item.name,
        slug: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
        location: item.address,
        description: item.description,
        category: item.category,
        price:
          item.tickets?.length > 0 ? formatRupiah(item.tickets[0].price) : "0",
        rating: Math.min(
          Math.max(parseInt(item.rating || item.stars || 5), 1),
          5
        ),
        duration:
          item.duration || `${item.days || 3} days ${item.nights || 2} nights`,
        image: item.thumbnail,
      }));

      setDestinations(transformedData);
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="destination-list">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-16 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="destination-list">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">
              Oops! Something went wrong
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchDestinations}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="destination-list">
      <div className="container mx-auto px-4">
        {destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No destinations found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                {...destination}
                aosDelay={index * 100}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
