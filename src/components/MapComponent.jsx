import { useEffect, useRef, useState } from 'react'

// Quebec cities with their coordinates and YouTube episode links
const quebecCities = [
  {
    id: 1,
    name: 'Montréal',
    position: { lat: 45.5017, lng: -73.5673 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Montréal',
  },
  {
    id: 2,
    name: 'Québec',
    position: { lat: 46.8139, lng: -71.2080 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Québec',
  },
  {
    id: 3,
    name: 'Laval',
    position: { lat: 45.6067, lng: -73.7123 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Laval',
  },
  {
    id: 4,
    name: 'Gatineau',
    position: { lat: 45.4765, lng: -75.7013 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Gatineau',
  },
  {
    id: 5,
    name: 'Longueuil',
    position: { lat: 45.5369, lng: -73.5103 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Longueuil',
  },
  {
    id: 6,
    name: 'Sherbrooke',
    position: { lat: 45.4000, lng: -71.8990 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Sherbrooke',
  },
  {
    id: 7,
    name: 'Saguenay',
    position: { lat: 48.4168, lng: -71.0689 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Saguenay',
  },
  {
    id: 8,
    name: 'Trois-Rivières',
    position: { lat: 46.3432, lng: -72.5433 },
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    description: 'Épisode sur Trois-Rivières',
  },
]

function MapComponent({ onCityClick }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const onCityClickRef = useRef(onCityClick)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Keep the callback ref up to date
  useEffect(() => {
    onCityClickRef.current = onCityClick
  }, [onCityClick])

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    console.log('API Key loaded:', apiKey ? 'Yes' : 'No')
    console.log('Environment:', import.meta.env.MODE)
    console.log('API Key value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET')

    if (!apiKey) {
      console.error('VITE_GOOGLE_MAPS_API_KEY is not defined')
      console.error('In production, ensure VITE_GOOGLE_MAPS_API_KEY is set in GitHub Secrets')
      setError('Clé API Google Maps manquante. Vérifiez la configuration des secrets GitHub.')
      setIsLoading(false)
      return
    }

    // Load Google Maps script if not already loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log('Google Maps script loaded')
        setIsLoading(false)
        initializeMap()
      }
      script.onerror = (error) => {
        console.error('Error loading Google Maps script:', error)
        setError('Erreur lors du chargement de Google Maps')
        setIsLoading(false)
      }
      document.head.appendChild(script)
    } else {
      console.log('Google Maps already loaded')
      initializeMap()
    }

    function initializeMap() {
      if (!mapRef.current) {
        console.error('Map ref is not available')
        return
      }
      
      if (mapInstanceRef.current) {
        console.log('Map already initialized')
        return
      }

      console.log('Initializing Google Map...')

      try {
        // Initialize map with minimal dark theme - only show podcast cities
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 46.8139, lng: -71.2080 }, // Center of Quebec
        zoom: 7,
        styles: [
          // Base geometry - dark background
          {
            elementType: 'geometry',
            stylers: [{ color: '#1a1a1a' }],
          },
          // Water - very dark
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0c0c0c' }],
          },
          // Hide all labels by default
          {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          // Hide all roads
          {
            featureType: 'road',
            stylers: [{ visibility: 'off' }],
          },
          // Hide highway numbers and labels
          {
            featureType: 'road.highway',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road.highway.controlled_access',
            stylers: [{ visibility: 'off' }],
          },
          // Hide administrative boundaries and labels
          {
            featureType: 'administrative',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.locality',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [{ visibility: 'off' }],
          },
          // Hide points of interest
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          // Hide transit
          {
            featureType: 'transit',
            stylers: [{ visibility: 'off' }],
          },
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
      })

      // Create custom marker icon (mustard color)
      const customIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#f59e0b',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      }

      // Add markers for each city
      quebecCities.forEach((city) => {
        const marker = new window.google.maps.Marker({
          position: city.position,
          map: mapInstanceRef.current,
          title: city.name,
          icon: customIcon,
        })

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: #1a1a1a; padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 18px;">${city.name}</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;">${city.description}</p>
              <button 
                onclick="window.handleCityClick('${city.id}')" 
                style="
                  background-color: #f59e0b; 
                  color: white; 
                  border: none; 
                  padding: 8px 16px; 
                  border-radius: 4px; 
                  cursor: pointer;
                  font-weight: 500;
                "
                onmouseover="this.style.backgroundColor='#d97706'"
                onmouseout="this.style.backgroundColor='#f59e0b'"
              >
                Voir l'épisode
              </button>
            </div>
          `,
        })

        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker)
          onCityClickRef.current(city)
        })

        markersRef.current.push({ marker, infoWindow })
      })

        // Store handler globally for info window buttons
        window.handleCityClick = (cityId) => {
          const city = quebecCities.find((c) => c.id.toString() === cityId.toString())
          if (city) {
            onCityClickRef.current(city)
          }
        }
        
        console.log('Map initialized successfully')
        setIsLoading(false)
      } catch (err) {
        console.error('Error initializing map:', err)
        setError('Erreur lors de l\'initialisation de la carte')
        setIsLoading(false)
      }
    }

    // Cleanup - only when component unmounts
    return () => {
      markersRef.current.forEach(({ marker, infoWindow }) => {
        marker.setMap(null)
        infoWindow.close()
      })
      markersRef.current = []
      if (window.handleCityClick) {
        delete window.handleCityClick
      }
    }
  }, []) // Empty dependency array - only run once on mount

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  return (
    <div className="map-container" style={{ height: '80vh', width: '100%', position: 'relative', minHeight: '600px' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height: '100%', 
          width: '100%'
        }} 
      />
      {!apiKey && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-900 text-white z-50">
          <div className="text-center">
            <p className="text-xl mb-2">Clé API Google Maps manquante</p>
            <p className="text-sm text-dark-400">
              Veuillez configurer VITE_GOOGLE_MAPS_API_KEY dans votre fichier .env
            </p>
            <p className="text-xs text-dark-500 mt-2">
              API Key: {apiKey ? 'Définie' : 'Non définie'}
            </p>
          </div>
        </div>
      )}
      {isLoading && apiKey && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-900/80 text-white z-40">
          <div className="text-center">
            <p className="text-xl mb-2">Chargement de la carte...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-900 text-red-400 z-50">
          <div className="text-center">
            <p className="text-xl mb-2">{error}</p>
            <p className="text-sm text-dark-400">Vérifiez la console pour plus de détails</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapComponent
