"use client";
import { useState, useMemo } from "react";
import Select from "react-select";

const SearchFilter = ({ destinations, categories }) => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(1);

  const categoryOptions = categories.map((cat) => ({
    value: cat.name,
    label: cat.name,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: state.isFocused ? "#63AB45" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #63AB45" : "none",
      "&:hover": {
        borderColor: "#63AB45",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#63AB45" : "white",
      color: "black",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
  };

  return (
    <div className="container container-1400">
      <div
        className="search-filter-inner"
        data-aos="zoom-out-down"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-hiking" />
          </div>
          <span className="title">Category</span>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(option) => {
              setSelectedCategory(option);
              setSelectedDestination("");
            }}
            styles={customStyles}
            placeholder="Select Category"
            isClearable
          />
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-map-marker-alt" />
          </div>
          <span className="title">Destinations</span>
          <select
            name="destination"
            id="destination"
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select Destination</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fas fa-calendar-alt" />
          </div>
          <span className="title">Departure Date</span>
          <input
            type="date"
            name="departureDate"
            id="departureDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fas fa-users" />
          </div>
          <span className="title">Guests</span>
          <div>
            <button onClick={() => setGuests(Math.max(1, guests - 1))}>
              −
            </button>
            <span style={{ margin: "0 10px" }}>{guests}</span>
            <button onClick={() => setGuests(guests + 1)}>+</button>
          </div>
        </div>
        <div className="search-button">
          <button className="theme-btn">
            <span data-hover="Search">Search</span>
            <i className="far fa-search" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
