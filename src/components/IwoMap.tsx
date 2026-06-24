import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const IwoMap = () => {
  const iwoCoordinates: [number, number] = [
    7.6353,
    4.1816,
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-blue-950 mb-4">
        Regional Map
      </h2>

      <MapContainer
        center={iwoCoordinates}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={iwoCoordinates}>
          <Popup>
            Iwo Local Government Area
            <br />
            Osun State, Nigeria
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default IwoMap;