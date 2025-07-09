"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import DestinationList from "@/components/DestinationList";
import DestinationSidebar from "@/components/DestinationSidebar";

export default function DestinationClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Destinations");
  const [categories, setCategories] = useState([]);

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
  };

  return (
    <>
      <Banner
        pageTitle={"Ambengan Village"}
        pageName={"Destination List"}
        image={"assets/images/banner/destination.png"}
      />
      <section className="tour-list-page py-100 rel z-1">
        <div className="container">
          <div className="row">
            <DestinationSidebar
              search={searchTerm}
              onSearchChange={handleSearch}
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
              categories={categories}
            />
            <div className="col-lg-9">
              <DestinationList
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
