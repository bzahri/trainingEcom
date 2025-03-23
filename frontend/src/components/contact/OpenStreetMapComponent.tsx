import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "@mantine/core";
import L from "leaflet";

// Corrige l'affichage du marqueur
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Définition du type pour éviter l'erreur TS7016
const customIcon: L.Icon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const position: [number, number] = [34.256387, -6.581527]; // Casablanca, Maroc

const OpenStreetMapComponent = () => {
  return (
    <Container >
      -------------------------------------------------------------------------------------------------------------------------------------------------         
      <MapContainer center={position} zoom={18} className="leaflet-container" style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={position} icon={customIcon}>
          <Popup>Casablanca, Maroc</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default OpenStreetMapComponent;
