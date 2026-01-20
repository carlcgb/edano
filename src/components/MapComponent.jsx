import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom marker icon with mustard color
const createCustomIcon = (color = '#f59e0b') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  })
}

// Quebec cities with their coordinates and YouTube episode links
const quebecCities = [
  {
    id: 1,
    name: 'Montréal',
    position: [45.5017, -73.5673],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Montréal',
  },
  {
    id: 2,
    name: 'Québec',
    position: [46.8139, -71.2080],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Québec',
  },
  {
    id: 3,
    name: 'Laval',
    position: [45.6067, -73.7123],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Laval',
  },
  {
    id: 4,
    name: 'Gatineau',
    position: [45.4765, -75.7013],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Gatineau',
  },
  {
    id: 5,
    name: 'Longueuil',
    position: [45.5369, -73.5103],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Longueuil',
  },
  {
    id: 6,
    name: 'Sherbrooke',
    position: [45.4000, -71.8990],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Sherbrooke',
  },
  {
    id: 7,
    name: 'Saguenay',
    position: [48.4168, -71.0689],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Saguenay',
  },
  {
    id: 8,
    name: 'Trois-Rivières',
    position: [46.3432, -72.5433],
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Trois-Rivières',
  },
]

function MapComponent({ onCityClick }) {
  const mapRef = useRef(null)

  return (
    <div className="map-container">
      <MapContainer
        ref={mapRef}
        center={[46.8139, -71.2080]}
        zoom={7}
        style={{ height: '100vh', width: '100%', zIndex: 1 }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* Dark theme tiles for better aesthetics matching the design */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {quebecCities.map((city) => (
          <Marker
            key={city.id}
            position={city.position}
            icon={createCustomIcon('#f59e0b')}
            eventHandlers={{
              click: () => onCityClick(city),
            }}
          >
            <Popup>
              <div className="text-dark-900 p-2">
                <h3 className="font-bold text-lg mb-1">{city.name}</h3>
                <p className="text-sm text-dark-600">{city.description}</p>
                <button
                  onClick={() => onCityClick(city)}
                  className="mt-2 px-4 py-2 bg-mustard-500 text-white rounded hover:bg-mustard-600 transition-colors"
                >
                  Voir l'épisode
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
