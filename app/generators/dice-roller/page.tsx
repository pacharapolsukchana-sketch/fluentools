'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100

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
        
        <div className="max-w-2xl mx-auto space-y-4">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            
            {/* Dice Type - Big Buttons */}
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700 mb-3">🎲 Choose Dice</label>
              <div className="grid grid-cols-4 gap-2">
                {[6, 20, 10, 100].map((type) => (
                  <button
                    key={type}
                    onClick={() => setDiceType(type as DiceType)}
                    className={`py-4 rounded-xl text-lg font-black transition shadow-md ${
                      diceType === type
                        ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white scale-105 shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-102'
                    }`}
                  >
                    D{type}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[4, 8, 12].map((type) => (
                  <button
                    key={type}
                    onClick={() => setDiceType(type as DiceType)}
                    className={`py-3 rounded-lg text-base font-bold transition ${
                      diceType === type
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    D{type}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700 mb-3">🔢 How Many Dice?</label>
              <input 
                type="number" 
                value={diceCount} 
                onChange={(e) => setDiceCount(e.target.value)} 
                onWheel={(e) => e.currentTarget.blur()}
                min="1" 
                max="10"
                className="w-full px-4 py-3 text-lg font-bold text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>

            {/* Roll Button */}
            <button 
              onClick={rollDice} 
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black text-xl rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              🎲 Roll {diceCount}D{diceType}
            </button>

          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-xl p-5">
              
              {/* Dice Results */}
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4">
                <div className="flex flex-wrap justify-center gap-3">
                  {results.map((result, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white text-red-600 w-16 h-16 rounded-xl font-black text-3xl flex items-center justify-center shadow-xl transform hover:scale-110 transition"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-white/30 backdrop-blur rounded-xl p-4 text-center text-white mb-4">
                <div className="text-base font-bold opacity-90 mb-1">Total</div>
                <div className="text-5xl font-black">{total}</div>
                <div className="text-sm opacity-80 mt-1">{diceCount}D{diceType}</div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={rollDice} 
                  className="py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition text-base"
                >
                  🔄 Roll Again
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(`${diceCount}D${diceType}: ${results.join(' + ')} = ${total}`)} 
                  className="py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition text-base"
                >
                  📋 Copy Result
                </button>
              </div>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}