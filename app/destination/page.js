"use client";
import Banner from "@/components/Banner";
import DestinationList from "@/components/DestinationList";
import DestinationSidebar from "@/components/DestinationSidebar";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Destinations");
  const [categories, setCategories] = useState([]);

  // Handle search change
  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
  };

  // Handle category update from DestinationList
  const handleCategoryUpdate = (categoryList) => {
    setCategories(categoryList);
  };

  return (
    <ReveloLayout>
      <Banner
        pageTitle={"Ambengan Village"}
        pageName={"Destination List"}
        search
      />
      {/* Destination List Area start */}
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
              {/* End Filter */}
              <DestinationList
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Tour List Area end */}
    </ReveloLayout>
  );
};
export default page;
