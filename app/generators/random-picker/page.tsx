'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type Mode = 'pick' | 'divide'

export default function RandomPicker() {
  const [mode, setMode] = useState<Mode>('pick')
  const [items, setItems] = useState('')
  const [count, setCount] = useState('1')
  const [groupCount, setGroupCount] = useState('2')
  const [results, setResults] = useState<string[]>([])
  const [groups, setGroups] = useState<string[][]>([])
  const relatedTools = getSmartRelatedTools('random-picker', 3)

  const pickRandom = () => {
    const itemList = items.split('\n').filter(item => item.trim() !== '')
    if (itemList.length === 0) {
      alert('Please enter at least one item')
      return
    }

    const pickCount = Math.min(parseInt(count) || 1, itemList.length)
    const shuffled = [...itemList].sort(() => Math.random() - 0.5)
    setResults(shuffled.slice(0, pickCount))
    setGroups([])
  }

  const divideGroups = () => {
    const itemList = items.split('\n').filter(item => item.trim() !== '')
    if (itemList.length === 0) {
      alert('Please enter at least one item')
      return
    }

    const numGroups = Math.min(parseInt(groupCount) || 2, itemList.length)
    const shuffled = [...itemList].sort(() => Math.random() - 0.5)
    const newGroups: string[][] = Array.from({ length: numGroups }, () => [])
    
    shuffled.forEach((item, idx) => {
      newGroups[idx % numGroups].push(item)
    })
    
    setGroups(newGroups)
    setResults([])
  }

  const generate = () => {
    if (mode === 'pick') pickRandom()
    else divideGroups()
  }

  const structuredData = generateStructuredData('random-picker')
  const faqSchema = generateFAQSchema([
    { question: 'How does random picker work?', answer: 'Enter items (one per line), choose how many to pick, and get random selection. Perfect for raffles, team selection, and decision making.' },
    { question: 'Can I pick multiple winners?', answer: 'Yes! Set the count to pick multiple items at once. Each item will only be picked once (no duplicates).' },
    { question: 'What can I use this for?', answer: 'Raffle draws, team assignments, menu selection, winner selection, random order, and any decision making.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Generators', url: 'https://fluentools.com/#generators' },
    { name: 'Random Picker', url: 'https://fluentools.com/generators/random-picker' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Random Picker"
        description="Pick random items from your list. Perfect for raffles, team selection, and decision making. Fast, fair, and easy to use."
        icon="🎯"
        gradient="from-blue-50 to-cyan-50"
        breadcrumbs={[{ label: 'Generators', href: '/#generators' }, { label: 'Random Picker' }]}
        features={[
          { icon: '🎯', title: 'Random Selection', description: 'Pick random items from any list' },
          { icon: '👥', title: 'Multiple Picks', description: 'Select multiple items at once' },
          { icon: '🎁', title: 'Fair Results', description: 'Each item has equal chance' },
          { icon: '⚡', title: 'Instant Picks', description: 'Get results in milliseconds' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🎯', question: 'How does random picker work?', answer: 'Enter your list of items (one per line), choose how many winners to pick, and click Pick. The algorithm ensures fair random selection.' },
          { icon: '🎁', question: 'Can I pick multiple winners?', answer: 'Yes! Set the count to any number up to your total items. Each item will only be selected once (no duplicates).' },
          { icon: '👥', question: 'What can I use this for?', answer: 'Raffle draws, team assignments, menu selection, winner selection, random order generation, and decision making.' },
          { icon: '🔄', question: 'Can I pick again?', answer: 'Yes! Click Pick Random again to get a new random selection. Results change each time.' },
          { icon: '📝', question: 'How many items can I add?', answer: 'No limit! Add as many items as you need. Perfect for large raffles or selections.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700 mb-4">Enter items (one per line), choose count, click Pick.</p></div>}>
        
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Mode Selector */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">🎯 Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('pick')}
                className={`py-3 rounded-lg font-bold transition ${mode === 'pick' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                🎯 Pick Random
              </button>
              <button
                onClick={() => setMode('divide')}
                className={`py-3 rounded-lg font-bold transition ${mode === 'divide' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                👥 Divide Teams
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            
            {/* Quick Presets */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-2">⚡ Quick Examples</label>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setItems('Alice\nBob\nCarol\nDave\nEve\nFrank')} className="py-2 px-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition">
                  👥 Names
                </button>
                <button onClick={() => setItems('Pizza\nBurger\nSushi\nPasta\nSalad\nTacos')} className="py-2 px-2 bg-cyan-50 text-cyan-700 rounded-lg text-xs font-bold hover:bg-cyan-100 transition">
                  🍕 Food
                </button>
                <button onClick={() => setItems('Team A\nTeam B')} className="py-2 px-2 bg-sky-50 text-sky-700 rounded-lg text-xs font-bold hover:bg-sky-100 transition">
                  🏆 Teams
                </button>
              </div>
            </div>

            {/* Items Input */}
            <div className="mb-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">📝 Your List (one item per line)</label>
              <textarea 
                value={items} 
                onChange={(e) => setItems(e.target.value)} 
                placeholder="Enter items here...&#10;Example:&#10;Alice&#10;Bob&#10;Carol"
                rows={8}
                className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                Total items: <span className="font-bold">{items.split('\n').filter(i => i.trim()).length}</span>
              </div>
            </div>

            {/* Pick Mode */}
            {mode === 'pick' && (
              <div className="mb-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">🎯 How Many to Pick?</label>
                <input 
                  type="number" 
                  value={count} 
                  onChange={(e) => setCount(e.target.value)} 
                  onWheel={(e) => e.currentTarget.blur()}
                  min="1" 
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
              </div>
            )}

            {/* Divide Mode */}
            {mode === 'divide' && (
              <div className="mb-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">👥 How Many Groups?</label>
                <input 
                  type="number" 
                  value={groupCount} 
                  onChange={(e) => setGroupCount(e.target.value)} 
                  onWheel={(e) => e.currentTarget.blur()}
                  min="2" 
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
              </div>
            )}

            {/* Generate Button */}
            <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg shadow transition-all text-base">
              {mode === 'pick' ? '🎯 Pick Random' : '👥 Divide Teams'}
            </button>

          </div>

          {/* Results - Pick Mode */}
          {results.length > 0 && (
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-4">
              <div className="text-center text-white mb-3">
                <div className="text-sm font-semibold opacity-90">🎉 Winners</div>
                <div className="text-lg font-bold">{results.length} {results.length === 1 ? 'Pick' : 'Picks'}</div>
              </div>
              <div className="space-y-2 mb-3">
                {results.map((item, idx) => (
                  <div key={idx} className="bg-white/20 backdrop-blur rounded-lg p-3 text-white font-bold text-center">
                    {idx + 1}. {item}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={generate} className="py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition text-sm">
                  🔄 Pick Again
                </button>
                <button onClick={() => navigator.clipboard.writeText(results.join('\n'))} className="py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition text-sm">
                  📋 Copy
                </button>
              </div>
            </div>
          )}

          {/* Results - Divide Mode */}
          {groups.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
              <div className="text-center mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">👥 Teams Divided</div>
                <div className="text-lg font-bold text-gray-900">{groups.length} Groups</div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {groups.map((group, gIdx) => (
                  <div key={gIdx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                    <div className="text-sm font-bold text-blue-700 mb-2">Team {gIdx + 1}</div>
                    <div className="space-y-1">
                      {group.map((item, iIdx) => (
                        <div key={iIdx} className="bg-white px-3 py-2 rounded text-sm font-semibold text-gray-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={generate} className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition">
                  🔄 Divide Again
                </button>
                <button 
                  onClick={() => {
                    const text = groups.map((g, i) => `Team ${i+1}:\n${g.join('\n')}`).join('\n\n')
                    navigator.clipboard.writeText(text)
                  }} 
                  className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition"
                >
                  📋 Copy All
                </button>
              </div>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}