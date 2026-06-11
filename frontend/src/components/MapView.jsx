// src/components/MapView.jsx
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const center = [31.5, 34.47]; // Gaza approximate center

  // Define example routes
  const routes = [
    {
      name: "Rafah Border",
      status: "open",
      path: [
        [31.3, 34.25],
        [31.2, 34.26],
        [31.1, 34.27],
      ],
    },
    {
      name: "North Gaza Route",
      status: "restricted",
      path: [
        [31.55, 34.5],
        [31.56, 34.52],
        [31.57, 34.55],
      ],
    },
    {
      name: "Khan Yunis Road",
      status: "closed",
      path: [
        [31.35, 34.4],
        [31.34, 34.42],
        [31.33, 34.44],
      ],
    },
  ];

  const getColor = (status) => {
    if (status === "open") return "green";
    if (status === "restricted") return "yellow";
    return "red";
  };

  return (
    <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="h-[400px] w-full rounded-xl z-0">
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routes.map((route, index) => (
        <Polyline
          key={index}
          positions={route.path}
          color={getColor(route.status)}
          weight={5}
        >
          <Popup>{route.name} - {route.status.toUpperCase()}</Popup>
        </Polyline>
      ))}

      {/* Optional: You can place markers here */}
      {routes.map((route, index) => (
        <Marker key={index} position={route.path[0]}>
          <Popup>
            Start of {route.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
