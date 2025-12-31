'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100

const diceInfo = {
  4: { emoji: '🔺', name: '4-Sided', color: 'from-blue-500 to-cyan-500', desc: 'Tetrahedron' },
  6: { emoji: '🎲', name: '6-Sided', color: 'from-red-500 to-pink-500', desc: 'Classic Cube' },
  8: { emoji: '🔶', name: '8-Sided', color: 'from-orange-500 to-amber-500', desc: 'Octahedron' },
  10: { emoji: '🔟', name: '10-Sided', color: 'from-green-500 to-emerald-500', desc: 'Decahedron' },
  12: { emoji: '⬢', name: '12-Sided', color: 'from-purple-500 to-indigo-500', desc: 'Dodecahedron' },
  20: { emoji: '🎯', name: '20-Sided', color: 'from-pink-500 to-rose-500', desc: 'Icosahedron' },
  100: { emoji: '💯', name: '100-Sided', color: 'from-yellow-500 to-orange-500', desc: 'Percentile' },
}

export default function DiceRoller() {
  const [diceType, setDiceType] = useState<DiceType>(6)
  const [diceCount, setDiceCount] = useState('1')
  const [results, setResults] = useState<number[]>([])
  const relatedTools = getSmartRelatedTools('dice-roller', 3)

  const rollDice = () => {
    const count = Math.min(parseInt(diceCount) || 1, 10)
    const rolls: number[] = []
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * diceType) + 1)
    }
    setResults(rolls)
  }

  const total = results.reduce((sum, val) => sum + val, 0)
  const currentDice = diceInfo[diceType]

  const structuredData = generateStructuredData('dice-roller')
  const faqSchema = generateFAQSchema([
    { question: 'What dice types are available?', answer: 'D4, D6, D8, D10, D12, D20, and D100. Perfect for board games, RPGs, and tabletop gaming.' },
    { question: 'Can I roll multiple dice?', answer: 'Yes! Roll up to 10 dice at once. The total is automatically calculated.' },
    { question: 'Is this truly random?', answer: 'Uses JavaScript random which is sufficient for gaming. Results are fair and unpredictable.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Generators', url: 'https://fluentools.com/#generators' },
    { name: 'Dice Roller', url: 'https://fluentools.com/generators/dice-roller' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Dice Roller"
        description="Roll virtual dice online. D4, D6, D8, D10, D12, D20, D100. Perfect for board games, RPGs, and tabletop gaming."
        icon="🎲"
        gradient="from-red-50 to-orange-50"
        breadcrumbs={[{ label: 'Generators', href: '/#generators' }, { label: 'Dice Roller' }]}
        features={[
          { icon: '🎲', title: 'All Dice Types', description: 'D4, D6, D8, D10, D12, D20, D100' },
          { icon: '🎮', title: 'Multiple Dice', description: 'Roll up to 10 dice at once' },
          { icon: '🎯', title: 'Auto Total', description: 'Automatic sum calculation' },
          { icon: '⚡', title: 'Instant Rolls', description: 'Fast dice rolling' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🎲', question: 'What dice types are available?', answer: 'D4 (4-sided), D6 (6-sided), D8 (8-sided), D10 (10-sided), D12 (12-sided), D20 (20-sided), and D100 (100-sided). Perfect for all tabletop games.' },
          { icon: '🎮', question: 'Can I roll multiple dice?', answer: 'Yes! Roll up to 10 dice at once. Great for games like Yahtzee, Dungeons & Dragons, and other RPGs.' },
          { icon: '📊', question: 'Is this truly random?', answer: 'Uses JavaScript Math.random() which is sufficient for gaming purposes. Results are fair and unpredictable.' },
          { icon: '🎯', question: 'What is D20 used for?', answer: 'D20 (20-sided dice) is commonly used in D&D and other RPG games for skill checks, attacks, and saving throws.' },
          { icon: '🔢', question: 'How is the total calculated?', answer: 'All dice results are added together automatically. Perfect for damage calculations and ability checks.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700 mb-4">Choose dice type, select count, click Roll.</p></div>}>
        
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
            
            {/* Selected Dice Info */}
            <div className={`bg-gradient-to-br ${currentDice.color} rounded-xl p-6 mb-6 text-white shadow-lg`}>
              <div className="text-center">
                <div className="text-6xl mb-2">{currentDice.emoji}</div>
                <div className="text-2xl font-black mb-1">D{diceType}</div>
                <div className="text-lg font-semibold opacity-90">{currentDice.name}</div>
                <div className="text-sm opacity-75">{currentDice.desc}</div>
              </div>
            </div>

            {/* Dice Selection Grid */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-900 mb-4">🎲 Choose Your Dice</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {([4, 6, 8, 10, 12, 20, 100] as DiceType[]).map((type) => {
                  const dice = diceInfo[type]
                  return (
                    <button
                      key={type}
                      onClick={() => setDiceType(type)}
                      className={`p-4 rounded-xl transition-all transform ${
                        diceType === type
                          ? `bg-gradient-to-br ${dice.color} text-white scale-105 shadow-xl`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-md hover:scale-102'
                      }`}
                    >
                      <div className="text-3xl mb-1">{dice.emoji}</div>
                      <div className="font-black text-lg">D{type}</div>
                      <div className={`text-xs mt-1 ${diceType === type ? 'opacity-90' : 'text-gray-500'}`}>
                        {dice.desc}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Count */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-900 mb-3">🔢 How Many Dice?</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDiceCount(Math.max(1, parseInt(diceCount) - 1).toString())}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black text-2xl rounded-xl transition"
                >
                  −
                </button>
                <input 
                  type="number" 
                  value={diceCount} 
                  onChange={(e) => setDiceCount(e.target.value)} 
                  onWheel={(e) => e.currentTarget.blur()}
                  min="1" 
                  max="10"
                  className="flex-1 px-4 py-3 text-center text-2xl font-black text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <button
                  onClick={() => setDiceCount(Math.min(10, parseInt(diceCount) + 1).toString())}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black text-2xl rounded-xl transition"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Maximum: 10 dice</p>
            </div>

            {/* Roll Button */}
            <button 
              onClick={rollDice} 
              className={`w-full py-5 bg-gradient-to-r ${currentDice.color} hover:opacity-90 text-white font-black text-xl rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95`}
            >
              <span className="text-3xl mr-2">{currentDice.emoji}</span>
              Roll {diceCount}D{diceType}
            </button>

          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className={`bg-gradient-to-br ${currentDice.color} rounded-2xl shadow-2xl p-6`}>
              
              {/* Individual Results */}
              <div className="bg-white/20 backdrop-blur rounded-xl p-5 mb-5">
                <h3 className="text-white font-bold text-center mb-3 text-lg">🎲 Results</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {results.map((result, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white text-gray-900 w-16 h-16 sm:w-20 sm:h-20 rounded-xl font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl transform hover:scale-110 transition"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-white/30 backdrop-blur rounded-xl p-6 text-center text-white mb-5">
                <div className="text-base font-bold opacity-90 mb-2">Total Sum</div>
                <div className="text-6xl font-black mb-2">{total}</div>
                <div className="text-lg font-semibold opacity-90">
                  {diceCount}D{diceType} • {results.join(' + ')}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={rollDice} 
                  className="py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition text-base backdrop-blur"
                >
                  🔄 Roll Again
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${diceCount}D${diceType}: ${results.join(' + ')} = ${total}`)
                    alert('✅ Copied to clipboard!')
                  }} 
                  className="py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition text-base backdrop-blur"
                >
                  📋 Copy Result
                </button>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>📚</span>
              <span>Dice Guide</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex gap-2">
                <span className="text-xl">🎲</span>
                <div>
                  <strong>D6:</strong> Classic dice for most board games
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-xl">🎯</span>
                <div>
                  <strong>D20:</strong> D&D attacks, skill checks, saves
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-xl">🔺</span>
                <div>
                  <strong>D4:</strong> Small damage rolls (dagger, magic)
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-xl">💯</span>
                <div>
                  <strong>D100:</strong> Percentile rolls, loot tables
                </div>
              </div>
            </div>
          </div>

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}