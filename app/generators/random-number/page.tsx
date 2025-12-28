'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type Mode = 'basic' | 'lotto' | 'weighted'

export default function RandomNumberGenerator() {
  const [mode, setMode] = useState<Mode>('basic')
  
  // Basic
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState('1')
  const [unique, setUnique] = useState(false)
  
  // Lotto
  const [lottoCount, setLottoCount] = useState('6')
  
  // Weighted
  const [wMin, setWMin] = useState('1')
  const [wMax, setWMax] = useState('100')
  const [favorite, setFavorite] = useState('7')
  const [weight, setWeight] = useState('50')
  
  const [results, setResults] = useState<number[]>([])
  const relatedTools = getSmartRelatedTools('random-number', 3)

  const generateBasic = () => {
    const minNum = parseInt(min) || 1
    const maxNum = parseInt(max) || 100
    const countNum = parseInt(count) || 1

    if (minNum > maxNum) {
      alert('Min must be less than Max')
      return
    }
    if (unique && countNum > (maxNum - minNum + 1)) {
      alert('Cannot generate more unique numbers')
      return
    }

    const numbers: number[] = []
    const used = new Set<number>()
    for (let i = 0; i < countNum; i++) {
      let num: number
      do {
        num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
      } while (unique && used.has(num))
      if (unique) used.add(num)
      numbers.push(num)
    }
    setResults(numbers)
  }

  const generateLotto = () => {
    const cnt = Math.min(parseInt(lottoCount) || 6, 20)
    const numbers: number[] = []
    for (let i = 0; i < cnt; i++) {
      numbers.push(Math.floor(Math.random() * 10))
    }
    setResults(numbers)
  }

  const generateWeighted = () => {
    const minNum = parseInt(wMin) || 1
    const maxNum = parseInt(wMax) || 100
    const fav = parseInt(favorite) || 7
    const wgt = Math.min(Math.max(parseInt(weight) || 50, 0), 100)

    if (minNum > maxNum || fav < minNum || fav > maxNum) {
      alert('Invalid range')
      return
    }

    const numbers: number[] = []
    for (let i = 0; i < 10; i++) {
      if (Math.random() * 100 < wgt) {
        numbers.push(fav)
      } else {
        let num: number
        do {
          num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
        } while (num === fav)
        numbers.push(num)
      }
    }
    setResults(numbers)
  }

  const generate = () => {
    if (mode === 'basic') generateBasic()
    else if (mode === 'lotto') generateLotto()
    else generateWeighted()
  }

  const structuredData = generateStructuredData('random-number')
  const faqSchema = generateFAQSchema([
    { question: 'How does it work?', answer: 'Uses Math.random() for pseudo-random numbers.' },
    { question: 'What is weighted random?', answer: 'Gives higher probability to specific numbers.' },
    { question: 'What is lottery mode?', answer: 'Generates single digits 0-9.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Generators', url: 'https://fluentools.com/#generators' },
    { name: 'Random Number', url: 'https://fluentools.com/generators/random-number' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Random Number Generator"
        description="Generate random numbers, lottery digits, and weighted random numbers."
        icon="🎲"
        gradient="from-green-50 to-emerald-50"
        breadcrumbs={[{ label: 'Generators', href: '/#generators' }, { label: 'Random Number' }]}
        features={[
          { icon: '🎲', title: 'Multiple Modes', description: 'Basic, Lottery, Weighted' },
          { icon: '🎰', title: 'Lottery Numbers', description: 'Generate 0-9 digits' },
          { icon: '⚖️', title: 'Weighted Random', description: 'Favor specific numbers' },
          { icon: '⚡', title: 'Instant Results', description: 'Fast generation' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🎲', question: 'What modes are available?', answer: 'Basic, Lottery (0-9), and Weighted random.' },
          { icon: '🎰', question: 'How does lottery work?', answer: 'Generates single digits 0-9.' },
          { icon: '⚖️', question: 'What is weighted random?', answer: 'Favors a specific number with percentage.' },
          { icon: '🔢', question: 'Can I use negative numbers?', answer: 'Yes, in Basic mode.' },
          { icon: '✨', question: 'What is unique mode?', answer: 'No duplicate numbers in Basic mode.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700">Choose mode and generate.</p></div>}>
        
        <div className="max-w-2xl mx-auto space-y-4">
          
          {/* Mode Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">🎯 Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setMode('basic')}
                className={`py-3 rounded-lg font-bold transition ${mode === 'basic' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                🔢 Basic
              </button>
              <button
                onClick={() => setMode('lotto')}
                className={`py-3 rounded-lg font-bold transition ${mode === 'lotto' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                🎰 Lotto
              </button>
              <button
                onClick={() => setMode('weighted')}
                className={`py-3 rounded-lg font-bold transition ${mode === 'weighted' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                ⚖️ Weighted
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            
            {mode === 'basic' && (
              <>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Min</label>
                    <input type="number" value={min} onChange={(e) => setMin(e.target.value)} onWheel={(e) => e.currentTarget.blur()} 
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Max</label>
                    <input type="number" value={max} onChange={(e) => setMax(e.target.value)} onWheel={(e) => e.currentTarget.blur()} 
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Count</label>
                    <input type="number" value={count} onChange={(e) => setCount(e.target.value)} onWheel={(e) => e.currentTarget.blur()} min="1" 
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm font-bold text-gray-700">✨ Unique</span>
                </label>
              </>
            )}

            {mode === 'lotto' && (
              <div className="mb-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">🎰 Digits (0-9)</label>
                <input type="number" value={lottoCount} onChange={(e) => setLottoCount(e.target.value)} onWheel={(e) => e.currentTarget.blur()} min="1" max="20"
                  className="w-full px-4 py-3 text-base font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            )}

            {mode === 'weighted' && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Min</label>
                    <input type="number" value={wMin} onChange={(e) => setWMin(e.target.value)} onWheel={(e) => e.currentTarget.blur()} 
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Max</label>
                    <input type="number" value={wMax} onChange={(e) => setWMax(e.target.value)} onWheel={(e) => e.currentTarget.blur()} 
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">⭐ Favorite</label>
                    <input type="number" value={favorite} onChange={(e) => setFavorite(e.target.value)} onWheel={(e) => e.currentTarget.blur()} 
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">⚖️ Weight %</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} onWheel={(e) => e.currentTarget.blur()} min="0" max="100"
                      className="w-full px-3 py-2 text-sm font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>
              </>
            )}

            <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg">
              🎲 Generate
            </button>
          </div>

          {/* Results - Minimal Clean Style */}
          {results.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-3">
                  {mode === 'basic' && 'Random Number'}
                  {mode === 'lotto' && 'Lucky Number'}
                  {mode === 'weighted' && 'Weighted Number'}
                </div>
                
                {/* Big Single Number Display */}
                {results.length === 1 ? (
                  <div className="text-8xl font-black text-gray-900 mb-4">
                    {results[0]}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center gap-3 mb-4">
                    {results.map((num, idx) => (
                      <div key={idx} className="text-4xl font-black text-gray-900">
                        {num}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-sm text-gray-500 mb-6">
                  {mode === 'basic' && `from ${min} to ${max} (${results.length} ${results.length === 1 ? 'number' : 'numbers'})`}
                  {mode === 'lotto' && `from 0 to 9 (${results.length} ${results.length === 1 ? 'digit' : 'digits'})`}
                  {mode === 'weighted' && `${results.length} weighted numbers`}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={generate} 
                    className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition"
                  >
                    🔄 Again
                  </button>
                  <button 
                    onClick={() => navigator.clipboard.writeText(results.join(', '))} 
                    className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}