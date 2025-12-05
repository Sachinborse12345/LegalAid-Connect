import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Example persons (replace with API data)
const people = [
  { id: 1, name: "Person 1", lat: 18.5204, lng: 73.8567 },
  { id: 2, name: "Person 2", lat: 18.5312, lng: 73.8445 },
  { id: 3, name: "Person 3", lat: 18.5100, lng: 73.8500 },
];

const center = {
  lat: 18.5204,
  lng: 73.8567,
};

export default function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Render all person markers */}
        {people.map((p) => (
          <Marker key={p.id} position={{ lat: p.lat, lng: p.lng }} title={p.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
