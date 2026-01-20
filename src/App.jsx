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
    <div className="relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <Header />
      <MapComponent onCityClick={handleCityClick} />
      {isModalOpen && selectedEpisode && (
        <EpisodeModal episode={selectedEpisode} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
