import { useState, useEffect } from 'react'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-mustard-500">
              ÉDANO
            </h1>
            <span className="text-sm text-dark-400 hidden md:inline">
              Podcast
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="#episodes"
              className="text-white hover:text-mustard-500 transition-colors hidden md:block"
            >
              Épisodes
            </a>
            <a
              href="#about"
              className="text-white hover:text-mustard-500 transition-colors hidden md:block"
            >
              À propos
            </a>
            <a
              href="#contact"
              className="text-white hover:text-mustard-500 transition-colors hidden md:block"
            >
              Contact
            </a>
            <button className="px-4 py-2 bg-mustard-500 text-white rounded hover:bg-mustard-600 transition-colors">
              S'abonner
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
