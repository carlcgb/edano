import { useEffect } from 'react'

function EpisodeModal({ episode, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const videoId = extractVideoId(episode.youtubeUrl)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/90 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-dark-800 rounded-lg shadow-2xl max-w-4xl w-full mx-4 overflow-hidden border border-mustard-500/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-mustard-500 transition-colors bg-dark-900/50 rounded-full p-2 hover:bg-dark-900"
          aria-label="Fermer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-mustard-500 mb-4">
            {episode.name}
          </h2>
          <p className="text-dark-300 mb-6 text-lg">{episode.description}</p>

          {videoId ? (
            <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-dark-900">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={episode.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-dark-900 flex items-center justify-center">
              <a
                href={episode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-mustard-500 text-white rounded-lg hover:bg-mustard-600 transition-colors inline-flex items-center space-x-2"
              >
                <span>Regarder sur YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-mustard-500 text-white rounded-lg hover:bg-mustard-600 transition-colors inline-flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Regarder sur YouTube</span>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpisodeModal
