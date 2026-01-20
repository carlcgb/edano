import { useState, useCallback } from 'react'
import MapComponent from './components/MapComponent'
import Header from './components/Header'
import EpisodeModal from './components/EpisodeModal'

function App() {
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCityClick = useCallback((episode) => {
    setSelectedEpisode(episode)
    setIsModalOpen(true)
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEpisode(null)
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="map-frame border-4 border-dark-800 bg-dark-800 rounded-lg overflow-hidden shadow-2xl">
          <MapComponent onCityClick={handleCityClick} />
        </div>
      </div>
      {isModalOpen && selectedEpisode && (
        <EpisodeModal episode={selectedEpisode} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
