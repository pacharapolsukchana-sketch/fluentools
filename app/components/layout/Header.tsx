'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { categories } from '@/app/lib/navigation-data'

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (activeCategory && buttonRefs.current[activeCategory]) {
      const button = buttonRefs.current[activeCategory]
      const rect = button.getBoundingClientRect()
      setDropdownPosition({ top: rect.bottom + 4, left: rect.left })
    }
  }, [activeCategory])

  const handleCategoryEnter = (categoryId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveCategory(categoryId)
  }

  const handleNavLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 200)
  }

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-[100] shadow-sm">
        <div className="container mx-auto px-4" style={{ maxWidth: '80%' }}>
          
          {/* Top Bar */}
          <div className="flex items-center justify-between h-12">
            <Link 
              href="/" 
              className="text-base md:text-lg font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1.5"
            >
              <span className="text-lg">🛠️</span>
              <span>Fluentools</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-1.5 text-gray-700 hover:text-blue-600 transition rounded-lg hover:bg-blue-50"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Mega Menu */}
          <div className="hidden md:block border-t border-gray-100" onMouseLeave={handleNavLeave}>
            <div className="flex items-center gap-0.5 py-1.5 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="relative flex-shrink-0"
                  onMouseEnter={() => handleCategoryEnter(category.id)}
                >
                  <button
                    ref={(el) => { buttonRefs.current[category.id] = el }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium whitespace-nowrap text-xs"
                  >
                    <span className="text-sm">{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-3 border-t border-gray-100 max-h-[70vh] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="px-3 py-1.5">
                  <div className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setShowMobileMenu(false)}
                      className="block px-3 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
                    >
                      {tool.icon} {tool.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Desktop Dropdown Mega Menu */}
      {activeCategory && (
        <>
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setActiveCategory(null)} 
          />
          
          <div
            className="fixed bg-white rounded-lg shadow-2xl border-2 border-gray-100 py-1.5 z-[110] animate-in fade-in slide-in-from-top-2 duration-150"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: '220px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            {categories.find(c => c.id === activeCategory)?.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <span className="text-base">{tool.icon}</span>
                <span className="font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}