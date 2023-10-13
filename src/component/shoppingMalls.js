import React, { useState, useEffect } from "react";
import "./shoppingMall.css";

const ShoppingMalls = ({ map }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [malls, setMalls] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Create an instance of the Places service
    const placesService = new window.google.maps.places.PlacesService(map);

    // Define the search request
    const request = {
      query: `Shopping Mall ${searchTerm}`,
      fields: ["name", "formatted_address", "place_id", "photos"],
    };

    // Perform the text-based search
    placesService.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setMalls(results);
      } else {
        console.error("Error fetching shopping malls:", status);
      }
    });
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for shopping malls..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={handleSearchSubmit} className="search-button">
        Search
      </button>
      <ul className="mall-list">
        {malls.map((mall) => (
          <li key={mall.place_id} className="mall-item">
            <div className="text-container">
              <p>{mall.name}</p>
              <p>{mall.formatted_address}</p>
            </div>
            {mall.photos && mall.photos.length > 0 && (
              <div className="photos-container">
                {mall.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.getUrl({ maxWidth: 100, maxHeight: 100 })}
                    alt={`Photo ${index}`}
                    className="mall-photo"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingMalls;
