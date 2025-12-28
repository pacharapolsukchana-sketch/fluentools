'use client'

import MainLayout from './components/layout/MainLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { allTools } from './lib/navigation-data'
import AdSpace from './components/common/AdSpace'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('popular')
  const [favorites, setFavorites] = useState<string[]>([])
  const [recent, setRecent] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    const savedRecent = localStorage.getItem('recent')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedRecent) setRecent(JSON.parse(savedRecent))
  }, [])

  const toggleFavorite = (toolId: string) => {
    const newFavorites = favorites.includes(toolId) 
      ? favorites.filter(id => id !== toolId) 
      : [...favorites, toolId]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const addToRecent = (toolId: string) => {
    const newRecent = [toolId, ...recent.filter(id => id !== toolId)].slice(0, 6)
    setRecent(newRecent)
    localStorage.setItem('recent', JSON.stringify(newRecent))
  }

  const searchResults = searchQuery 
    ? allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase()))
      )
    : []

  // Top 12 calculators by search volume
  const popularTools = [
    { ...allTools.find(t => t.id === 'percentage'), color: 'blue' },      // 450K
    { ...allTools.find(t => t.id === 'bmi'), color: 'purple' },           // 368K
    { ...allTools.find(t => t.id === 'currency'), color: 'amber' },       // 246K
    { ...allTools.find(t => t.id === 'age'), color: 'green' },            // 201K
    { ...allTools.find(t => t.id === 'tip'), color: 'indigo' },           // 135K
    { ...allTools.find(t => t.id === 'mortgage'), color: 'emerald' },     // 110K
    { ...allTools.find(t => t.id === 'loan'), color: 'pink' },            // 90K
    { ...allTools.find(t => t.id === 'word-counter'), color: 'cyan' },    // 90K
    { ...allTools.find(t => t.id === 'qr'), color: 'purple' },            // 80K
    { ...allTools.find(t => t.id === 'calorie'), color: 'orange' },       // 74K
    { ...allTools.find(t => t.id === 'tax'), color: 'red' },              // 70K
    { ...allTools.find(t => t.id === 'discount'), color: 'pink' },        // 60K
  ].filter(t => t.id) as typeof allTools

  const getFavoriteTools = () => allTools.filter(tool => favorites.includes(tool.id))
  const getRecentTools = () => recent.map(id => allTools.find(tool => tool.id === id)).filter(Boolean) as typeof allTools

  const colorClasses = {
    emerald: 'from-emerald-50 to-green-50 border-emerald-100 hover:border-emerald-300',
    blue: 'from-blue-50 to-indigo-50 border-blue-100 hover:border-blue-300',
    pink: 'from-pink-50 to-rose-50 border-pink-100 hover:border-pink-300',
    orange: 'from-orange-50 to-amber-50 border-orange-100 hover:border-orange-300',
    green: 'from-green-50 to-teal-50 border-green-100 hover:border-green-300',
    indigo: 'from-indigo-50 to-purple-50 border-indigo-100 hover:border-indigo-300',
    purple: 'from-purple-50 to-violet-50 border-purple-100 hover:border-purple-300',
    cyan: 'from-cyan-50 to-teal-50 border-cyan-100 hover:border-cyan-300',
    amber: 'from-amber-50 to-yellow-50 border-amber-100 hover:border-amber-300',
    red: 'from-red-50 to-pink-50 border-red-100 hover:border-red-300',
  }

  return (
    <MainLayout>
      {/* Hero Section - Compact */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="text-3xl md:text-4xl transform hover:scale-110 transition-transform duration-300">🛠️</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Fluentools</h2>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Free Online Calculators tools
            </h1>
            
            <div className="relative max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search calculators & tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pl-12 rounded-xl text-gray-900 text-base bg-white border-2 border-gray-200 focus:border-blue-500 outline-none transition shadow-lg focus:shadow-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
              </div>
              
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 max-h-80 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        onClick={() => {
                          addToRecent(tool.id)
                          setSearchQuery('')
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition"
                      >
                        <span className="text-2xl">{tool.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900 text-sm">{tool.name}</div>
                          <div className="text-xs text-gray-500">{tool.description}</div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <div className="text-3xl mb-2">🔍</div>
                      <div className="text-sm">No tools found for "{searchQuery}"</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Compact */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
            <div>
              <div className="text-3xl mb-1">⚡</div>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">Fast</h3>
              <p className="text-xs text-gray-600">Instant results</p>
            </div>
            <div>
              <div className="text-3xl mb-1">🎯</div>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">Accurate</h3>
              <p className="text-xs text-gray-600">Verified formulas</p>
            </div>
            <div>
              <div className="text-3xl mb-1">🔒</div>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">Private</h3>
              <p className="text-xs text-gray-600">No data stored</p>
            </div>
            <div>
              <div className="text-3xl mb-1">🆓</div>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">Free</h3>
              <p className="text-xs text-gray-600">Always free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdSpace slot="horizontal" hideOnMobile={true} />
        </div>
      </section>

      {/* Tools Section - Compact */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4" style={{ maxWidth: '80%' }}>
          
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'popular', label: '🔥 Popular' },
              { id: 'favorites', label: '⭐ Favorites' },
              { id: 'recent', label: '🕐 Recent' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'popular' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <div key={tool.id} className="relative group h-full">
                  <Link href={tool.href} onClick={() => addToRecent(tool.id)} className="block h-full">
                    <div className={`bg-gradient-to-br rounded-lg p-4 border-2 hover:shadow-lg transition-all h-full flex flex-col ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
                      <span className="inline-block px-2 py-0.5 bg-white/80 text-gray-700 text-[10px] font-semibold rounded-full mb-2 self-start">
                        {tool.category}
                      </span>
                      <div className="text-3xl mb-3">{tool.icon}</div>
                      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 flex-grow">{tool.description}</p>
                      <div className="text-[10px] text-gray-500 border-t border-gray-200/50 pt-2">Free</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(tool.id)}
                    className="absolute top-2 right-2 text-xl bg-white/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition border border-gray-200/50 hover:scale-110"
                  >
                    {favorites.includes(tool.id) ? '⭐' : '☆'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              {getFavoriteTools().length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">⭐</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h3>
                  <p className="text-sm text-gray-600 mb-4">Click ⭐ on any tool to save it here</p>
                  <button
                    onClick={() => setActiveTab('popular')}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                  >
                    Browse Tools
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFavoriteTools().map((tool) => (
                    <div key={tool.id} className="relative group h-full">
                      <Link href={tool.href} onClick={() => addToRecent(tool.id)} className="block h-full">
                        <div className={`bg-gradient-to-br rounded-lg p-4 border-2 hover:shadow-lg transition-all h-full flex flex-col ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
                          <span className="inline-block px-2 py-0.5 bg-white/80 text-gray-700 text-[10px] font-semibold rounded-full mb-2 self-start">
                            {tool.category}
                          </span>
                          <div className="text-3xl mb-3">{tool.icon}</div>
                          <h3 className="text-base font-bold text-gray-900 mb-1">{tool.name}</h3>
                          <p className="text-xs text-gray-600 flex-grow">{tool.description}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggleFavorite(tool.id)}
                        className="absolute top-2 right-2 text-xl bg-white rounded-full w-8 h-8 flex items-center justify-center border border-yellow-300"
                      >
                        ⭐
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'recent' && (
            <div>
              {getRecentTools().length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">🕐</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Recent Activity</h3>
                  <p className="text-sm text-gray-600 mb-4">Start using tools and they'll appear here</p>
                  <button
                    onClick={() => setActiveTab('popular')}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                  >
                    Explore Tools
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getRecentTools().map((tool) => (
                    <div key={tool.id} className="relative group h-full">
                      <Link href={tool.href} onClick={() => addToRecent(tool.id)} className="block h-full">
                        <div className={`bg-gradient-to-br rounded-lg p-4 border-2 hover:shadow-lg transition-all h-full flex flex-col ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
                          <span className="inline-block px-2 py-0.5 bg-white/80 text-gray-700 text-[10px] font-semibold rounded-full mb-2 self-start">
                            {tool.category}
                          </span>
                          <div className="text-3xl mb-3">{tool.icon}</div>
                          <h3 className="text-base font-bold text-gray-900 mb-1">{tool.name}</h3>
                          <p className="text-xs text-gray-600 flex-grow">{tool.description}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggleFavorite(tool.id)}
                        className="absolute top-2 right-2 text-xl bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        {favorites.includes(tool.id) ? '⭐' : '☆'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Bottom Ad */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdSpace slot="horizontal" hideOnMobile={true} />
        </div>
      </section>

    </MainLayout>
  )
}