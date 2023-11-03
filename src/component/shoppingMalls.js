import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./shoppingMall.css";

const ShoppingMalls = ({ map }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [malls, setMalls] = useState([]);
  useEffect(() => {
    if (!map) {
      return;
    }
    const placesService = new window.google.maps.places.PlacesService(map);

    // Define the search request with the initial search term
    const request = {
      query: `Shopping Mall Sydney`,
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
  }, [map]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Create an instance of the Places service
    const placesService = new window.google.maps.places.PlacesService(map);
    let request;
    // Define the search request
    if (event.target.value === "") {
      request = {
        query: `Shopping Mall Sydney`,
        fields: ["name", "formatted_address", "place_id", "photos"],
      };
    } else {
      request = {
        query: `Shopping Mall ${searchTerm}`,
        fields: ["name", "formatted_address", "place_id", "photos"],
      };
    }

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
      {/* <button onClick={handleSearchSubmit} className="search-button">
        Search
      </button> */}
      <ul className="mall-list">
        {malls.map((mall) => (
          <Link
            key={mall.place_id}
            to={`/shoppingMallIncidents.js/${mall.name}`}
          >
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
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingMalls;
