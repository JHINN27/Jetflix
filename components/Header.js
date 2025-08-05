'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X, User, Bell, ChevronDown } from 'lucide-react'
import SearchBar from './SearchBar'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' },
    { name: 'TV Shows', href: '/tv-shows' },
    { name: 'New & Popular', href: '/new-popular' },
    { name: 'My List', href: '/my-list' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-black/95 backdrop-blur-sm' 
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-red-600 text-2xl font-bold">
              JETFLIX
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="hidden md:block p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            <div className="hidden md:flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <User size={16} />
              </div>
              <ChevronDown 
                size={16} 
                className="text-white group-hover:text-gray-300 transition-colors duration-200" 
              />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mt-4 fade-in">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-800 fade-in">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <span className="text-white">Profile</span>
                </div>
                <Bell size={20} className="text-white" />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}