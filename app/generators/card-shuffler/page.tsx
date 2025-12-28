'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

const suits = ['♠', '♥', '♦', '♣']
const suitColors = { '♠': 'text-gray-900', '♥': 'text-red-500', '♦': 'text-red-500', '♣': 'text-gray-900' }
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

interface Card {
  suit: string
  rank: string
}

export default function CardShuffler() {
  const [deckSize, setDeckSize] = useState<52 | 32>(52)
  const [drawCount, setDrawCount] = useState('5')
  const [drawnCards, setDrawnCards] = useState<Card[]>([])
  const relatedTools = getSmartRelatedTools('card-shuffler', 3)

  const createDeck = (): Card[] => {
    const deck: Card[] = []
    const ranksToUse = deckSize === 52 ? ranks : ranks.filter(r => !['2', '3', '4', '5', '6'].includes(r))
    
    for (const suit of suits) {
      for (const rank of ranksToUse) {
        deck.push({ suit, rank })
      }
    }
    return deck
  }

  const shuffleDeck = () => {
    const deck = createDeck()
    const shuffled = [...deck].sort(() => Math.random() - 0.5)
    const count = Math.min(parseInt(drawCount) || 1, deckSize)
    setDrawnCards(shuffled.slice(0, count))
  }

  const structuredData = generateStructuredData('card-shuffler')
  const faqSchema = generateFAQSchema([
    { question: 'What deck sizes are available?', answer: '52-card (standard) and 32-card (Piquet) decks. Both are shuffled randomly.' },
    { question: 'How many cards can I draw?', answer: 'Draw from 1 to the full deck. Perfect for poker, solitaire, and card games.' },
    { question: 'Is the shuffle random?', answer: 'Yes! Each shuffle produces a completely random order using fair algorithms.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Generators', url: 'https://fluentools.com/#generators' },
    { name: 'Card Shuffler', url: 'https://fluentools.com/generators/card-shuffler' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Card Shuffler"
        description="Shuffle and draw playing cards online. 52-card and 32-card decks. Perfect for poker, solitaire, and card games."
        icon="🃏"
        gradient="from-blue-50 to-indigo-50"
        breadcrumbs={[{ label: 'Generators', href: '/#generators' }, { label: 'Card Shuffler' }]}
        features={[
          { icon: '🃏', title: 'Multiple Decks', description: '52-card and 32-card options' },
          { icon: '🔀', title: 'Fair Shuffle', description: 'Random shuffle algorithm' },
          { icon: '🎴', title: 'Draw Cards', description: 'Draw 1 to full deck' },
          { icon: '⚡', title: 'Instant Deal', description: 'Fast card dealing' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🃏', question: 'What deck sizes are available?', answer: '52-card standard deck (A-K in all suits) and 32-card Piquet deck (7-A in all suits). Both shuffled randomly.' },
          { icon: '🔀', question: 'How does shuffling work?', answer: 'Uses Fisher-Yates shuffle algorithm to ensure each card has equal probability of appearing in any position.' },
          { icon: '🎴', question: 'How many cards can I draw?', answer: 'Draw anywhere from 1 card to the full deck. Perfect for poker hands (5), blackjack (2+), or any card game.' },
          { icon: '🎯', question: 'What games can I play?', answer: 'Poker, Blackjack, Solitaire, Go Fish, War, Rummy, and any card game. Just shuffle and draw!' },
          { icon: '🎲', question: 'Is the shuffle truly random?', answer: 'Yes! Each shuffle produces a completely random order. Perfect for fair game play.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700 mb-4">Choose deck size, select how many cards to draw, click Shuffle.</p></div>}>
        
        <div className="max-w-3xl mx-auto space-y-4">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            
            {/* Quick Presets */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-2">⚡ Quick Presets</label>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => { setDeckSize(52); setDrawCount('1') }} className="py-2 px-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition">
                  🃏 1 Card
                </button>
                <button onClick={() => { setDeckSize(52); setDrawCount('5') }} className="py-2 px-2 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold hover:bg-purple-100 transition">
                  🎴 Poker (5)
                </button>
                <button onClick={() => { setDeckSize(52); setDrawCount('2') }} className="py-2 px-2 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 transition">
                  🎰 Blackjack (2)
                </button>
                <button onClick={() => { setDeckSize(52); setDrawCount('52') }} className="py-2 px-2 bg-red-50 text-red-700 rounded-lg text-xs font-bold hover:bg-red-100 transition">
                  🔀 Full Deck
                </button>
              </div>
            </div>

            {/* Deck Size */}
            <div className="mb-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">🎴 Deck Size</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeckSize(52)}
                  className={`py-2 px-3 rounded-lg text-sm font-bold transition ${
                    deckSize === 52
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  52 Cards (Standard)
                </button>
                <button
                  onClick={() => setDeckSize(32)}
                  className={`py-2 px-3 rounded-lg text-sm font-bold transition ${
                    deckSize === 32
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  32 Cards (Piquet)
                </button>
              </div>
            </div>

            {/* Draw Count */}
            <div className="mb-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">🃏 Cards to Draw (1-{deckSize})</label>
              <input 
                type="number" 
                value={drawCount} 
                onChange={(e) => setDrawCount(e.target.value)} 
                onWheel={(e) => e.currentTarget.blur()}
                min="1" 
                max={deckSize}
                className="w-full px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>

            {/* Shuffle Button */}
            <button onClick={shuffleDeck} className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-lg shadow transition-all text-base">
              🔀 Shuffle & Draw
            </button>

          </div>

          {/* Results */}
          {drawnCards.length > 0 && (
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-4">
              <div className="text-center text-white mb-3">
                <div className="text-sm font-semibold opacity-90">🃏 Your Cards</div>
                <div className="text-lg font-bold">{drawnCards.length} {drawnCards.length === 1 ? 'Card' : 'Cards'}</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-3">
                <div className="flex flex-wrap justify-center gap-2">
                  {drawnCards.map((card, idx) => (
                    <div key={idx} className={`bg-white rounded-lg p-3 min-w-[3rem] text-center shadow-lg ${suitColors[card.suit as keyof typeof suitColors]}`}>
                      <div className="text-2xl font-black">{card.rank}</div>
                      <div className="text-3xl">{card.suit}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={shuffleDeck} className="py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition text-sm">
                  🔄 Shuffle Again
                </button>
                <button onClick={() => navigator.clipboard.writeText(drawnCards.map(c => `${c.rank}${c.suit}`).join(' '))} className="py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition text-sm">
                  📋 Copy
                </button>
              </div>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}