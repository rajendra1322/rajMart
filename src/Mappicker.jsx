import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = useState({
    lat: 15.2993,
    lng: 74.1240,
  });

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      setPosition(latlng);
      setLocation(latlng);
    },
  });

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const latlng = marker.getLatLng();

          setPosition(latlng);
          setLocation(latlng);
        },
      }}
    />
  );
};

const MapPicker = ({ setLocation }) => {
  return (
    <MapContainer
      center={[15.2993, 74.1240]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setLocation={setLocation} />
    </MapContainer>
  );
};

export default MapPicker;