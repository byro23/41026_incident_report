import React, { useState, useEffect, useRef } from "react";
import ShoppingMalls from "./shoppingMalls";
const ViewMalls = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null); // Use a state variable to store the map

  useEffect(() => {
    // Initialize the map when the component mounts
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.006 }, // Set initial map center
      zoom: 12, // Set initial zoom level
    });

    setMap(googleMap);
  }, []);
  return (
    <>
      <ShoppingMalls map={map} />
      <div ref={mapRef} className="map-container"></div>
    </>
  );
};
export default ViewMalls;
