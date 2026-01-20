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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get API key - try multiple methods to ensure we get it
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 
                   (typeof __VITE_GOOGLE_MAPS_API_KEY__ !== 'undefined' ? __VITE_GOOGLE_MAPS_API_KEY__ : null)

    console.log('API Key loaded:', apiKey ? 'Yes' : 'No')
    console.log('Environment:', import.meta.env.MODE)
    console.log('API Key value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET')
    console.log('Full import.meta.env:', import.meta.env)

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
          // Hide all roads by default
          {
            featureType: 'road',
            stylers: [{ visibility: 'off' }],
          },
          // Show only controlled access highways (autoroutes)
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              { color: '#2d2d2d' },
              { visibility: 'on' },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#9ca5af' },
              { visibility: 'on' },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#1a1a1a' },
              { visibility: 'on' },
            ],
          },
          // Hide other highway types
          {
            featureType: 'road.highway',
            stylers: [{ visibility: 'off' }],
          },
          // Show major city labels only
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#ffffff' },
              { visibility: 'on' },
            ],
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#1a1a1a' },
              { visibility: 'on' },
            ],
          },
          // Hide neighborhood labels (smaller cities)
          {
            featureType: 'administrative.neighborhood',
            stylers: [{ visibility: 'off' }],
          },
          // Hide administrative boundaries
          {
            featureType: 'administrative',
            elementType: 'geometry',
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

      // Shared state for info windows - ensures only one is open at a time
      let sharedHoverTimeout = null
      let sharedCurrentInfoWindow = null
      const allInfoWindows = [] // Track all info windows

      // Function to close ALL info windows (both tracked and in DOM)
      const closeAllInfoWindows = (except = null) => {
        // Close all tracked info windows except the one we're about to open
        allInfoWindows.forEach(iw => {
          if (iw && iw !== except && iw.getMap()) {
            iw.close()
          }
        })
        
        sharedCurrentInfoWindow = null
      }

      // Add markers for each city
      quebecCities.forEach((city) => {
        const marker = new window.google.maps.Marker({
          position: city.position,
          map: mapInstanceRef.current,
          // Removed 'title' to prevent default Google Maps tooltip from showing
          // We use custom InfoWindow instead
          icon: customIcon,
          optimized: false, // Prevents tooltip from appearing
        })

        // Create info window with improved styling
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
              color: #ffffff;
              padding: 16px;
              min-width: 220px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
              border: 1px solid rgba(245, 158, 11, 0.3);
            ">
              <h3 style="
                margin: 0 0 8px 0;
                font-weight: 700;
                font-size: 20px;
                color: #f59e0b;
                font-family: 'Playfair Display', serif;
              ">${city.name}</h3>
              <p style="
                margin: 0 0 16px 0;
                font-size: 14px;
                color: #9ca5af;
                line-height: 1.5;
              ">${city.description}</p>
              <button 
                onclick="window.handleCityClick('${city.id}')" 
                style="
                  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                  color: white; 
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 6px; 
                  cursor: pointer;
                  font-weight: 600;
                  font-size: 14px;
                  width: 100%;
                  transition: all 0.3s ease;
                  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(245, 158, 11, 0.5)';"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(245, 158, 11, 0.3)';"
              >
                Voir l'épisode
              </button>
            </div>
          `,
        })

        // Track this info window
        allInfoWindows.push(infoWindow)

        // Add hover listeners to marker
        marker.addListener('mouseover', () => {
          // Clear any pending close timeout
          if (sharedHoverTimeout) {
            clearTimeout(sharedHoverTimeout)
            sharedHoverTimeout = null
          }
          
          // Close any previously open info window (but not this one)
          if (sharedCurrentInfoWindow && sharedCurrentInfoWindow !== infoWindow) {
            sharedCurrentInfoWindow.close()
          }
          
          // Open this info window immediately
          infoWindow.open(mapInstanceRef.current, marker)
          sharedCurrentInfoWindow = infoWindow
        })

        // Close info window when mouse leaves marker (with delay to allow moving to info window)
        marker.addListener('mouseout', () => {
          sharedHoverTimeout = setTimeout(() => {
            if (sharedCurrentInfoWindow === infoWindow) {
              infoWindow.close()
              sharedCurrentInfoWindow = null
            }
          }, 300)
        })

        // Keep info window open when hovering over it
        infoWindow.addListener('domready', () => {
          // Use a small delay to ensure DOM is ready
          setTimeout(() => {
            // Find the specific info window div for this info window
            const infoWindowDivs = document.querySelectorAll('.gm-style-iw-c')
            const infoWindowDiv = Array.from(infoWindowDivs).find(div => {
              return div.textContent.includes(city.name)
            })
            
            if (infoWindowDiv) {
              // Clear any existing timeouts
              if (sharedHoverTimeout) {
                clearTimeout(sharedHoverTimeout)
                sharedHoverTimeout = null
              }
              
              // Use event delegation to avoid duplicate listeners
              const handleMouseEnter = () => {
                if (sharedHoverTimeout) {
                  clearTimeout(sharedHoverTimeout)
                  sharedHoverTimeout = null
                }
              }
              
              const handleMouseLeave = () => {
                sharedHoverTimeout = setTimeout(() => {
                  if (sharedCurrentInfoWindow === infoWindow) {
                    infoWindow.close()
                    sharedCurrentInfoWindow = null
                  }
                }, 200)
              }
              
              infoWindowDiv.addEventListener('mouseenter', handleMouseEnter, { once: false })
              infoWindowDiv.addEventListener('mouseleave', handleMouseLeave, { once: false })
            }
          }, 100)
        })

        // Add click listener to marker to open modal
        marker.addListener('click', () => {
          onCityClick(city)
        })

        markersRef.current.push({ marker, infoWindow })
      })

        // Store handler globally for info window buttons
        window.handleCityClick = (cityId) => {
          const city = quebecCities.find((c) => c.id.toString() === cityId.toString())
          if (city) {
            onCityClick(city)
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

    // Cleanup - only run on unmount
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
  
  // Update handler when onCityClick changes (separate effect)
  useEffect(() => {
    // Always define/update the handler, don't check if it exists
    window.handleCityClick = (cityId) => {
      const city = quebecCities.find((c) => c.id.toString() === cityId.toString())
      if (city) {
        onCityClick(city)
      }
    }
  }, [onCityClick])

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  return (
    <div className="map-container" style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
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
