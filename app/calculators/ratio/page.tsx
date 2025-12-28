'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type CalculationMode = 'simplify' | 'find-x' | 'to-percent' | 'compare'

type SimplifyResult = {
  original: string
  simplified: string
  gcd: number
  a: number
  b: number
}

type FindXResult = {
  equation: string
  x: number
  position: 'C' | 'D'
}

type PercentResult = {
  ratio: string
  aPercent: number
  bPercent: number
  total: number
}

type CompareResult = {
  ratio1: string
  ratio2: string
  simplified1: string
  simplified2: string
  equal: boolean
  value1: number
  value2: number
}

export default function RatioCalculator() {
  const [mode, setMode] = useState<CalculationMode>('simplify')
  
  // Simplify mode
  const [simplifyA, setSimplifyA] = useState('')
  const [simplifyB, setSimplifyB] = useState('')
  
  // Find X mode
  const [findA, setFindA] = useState('')
  const [findB, setFindB] = useState('')
  const [findC, setFindC] = useState('')
  const [findD, setFindD] = useState('')
  const [findPosition, setFindPosition] = useState<'C' | 'D'>('C')
  
  // To Percent mode
  const [percentA, setPercentA] = useState('')
  const [percentB, setPercentB] = useState('')
  
  // Compare mode
  const [compare1A, setCompare1A] = useState('')
  const [compare1B, setCompare1B] = useState('')
  const [compare2A, setCompare2A] = useState('')
  const [compare2B, setCompare2B] = useState('')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('ratio', 3)

  // SEO schemas
  const structuredData = generateStructuredData('ratio')
  const faqSchema = generateFAQSchema([
    { question: 'How do I simplify a ratio?', answer: 'To simplify a ratio, divide both numbers by their Greatest Common Divisor (GCD). For example, 8:12 can be simplified by dividing both by 4 to get 2:3.' },
    { question: 'How do I find a missing value in a ratio?', answer: 'Use cross-multiplication: If A:B = C:D, then A×D = B×C. To find the missing value, rearrange the equation. For example, if 2:3 = X:9, then X = (2×9)÷3 = 6.' },
    { question: 'How do I convert a ratio to percentages?', answer: 'Add both parts together to get the total, then divide each part by the total and multiply by 100. For example, 3:5 has total 8, so 3÷8×100 = 37.5% and 5÷8×100 = 62.5%.' },
    { question: 'How can I tell if two ratios are equal?', answer: 'Two ratios are equal if they simplify to the same ratio. Alternatively, divide the first number by the second in each ratio - if you get the same decimal, they are equal.' },
    { question: 'What are common uses for ratio calculations?', answer: 'Ratios are used in cooking (ingredient proportions), map scales (1:50,000), mixing solutions (1:10 dilution), aspect ratios (16:9 screens), gear ratios, and financial analysis.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Math', url: 'https://fluentools.com/#math' },
    { name: 'Ratio Calculator', url: 'https://fluentools.com/calculators/ratio' }
  ])

  // GCD calculator
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  // Simplify ratio
  const getSimplified = (): SimplifyResult | null => {
    const a = parseFloat(simplifyA) || 0
    const b = parseFloat(simplifyB) || 0
    if (a === 0 || b === 0) return null
    const divisor = gcd(Math.abs(a), Math.abs(b))
    return {
      original: `${a}:${b}`,
      simplified: `${a / divisor}:${b / divisor}`,
      gcd: divisor,
      a: a / divisor,
      b: b / divisor
    }
  }

  // Find missing value
  const getFindX = (): FindXResult | null => {
    const a = parseFloat(findA) || 0
    const b = parseFloat(findB) || 0
    
    if (findPosition === 'C') {
      const d = parseFloat(findD) || 0
      if (a === 0 || b === 0 || d === 0) return null
      const c = (a * d) / b
      return {
        equation: `${a}:${b} = X:${d}`,
        x: c,
        position: 'C' as const
      }
    } else {
      const c = parseFloat(findC) || 0
      if (a === 0 || b === 0 || c === 0) return null
      const d = (b * c) / a
      return {
        equation: `${a}:${b} = ${c}:X`,
        x: d,
        position: 'D' as const
      }
    }
  }

  // Convert to percentage
  const getPercents = (): PercentResult | null => {
    const a = parseFloat(percentA) || 0
    const b = parseFloat(percentB) || 0
    if (a === 0 && b === 0) return null
    const total = a + b
    return {
      ratio: `${a}:${b}`,
      aPercent: (a / total) * 100,
      bPercent: (b / total) * 100,
      total: 100
    }
  }

  // Compare ratios
  const getComparison = (): CompareResult | null => {
    const a1 = parseFloat(compare1A) || 0
    const b1 = parseFloat(compare1B) || 0
    const a2 = parseFloat(compare2A) || 0
    const b2 = parseFloat(compare2B) || 0
    
    if (a1 === 0 || b1 === 0 || a2 === 0 || b2 === 0) return null
    
    const ratio1 = a1 / b1
    const ratio2 = a2 / b2
    const diff = Math.abs(ratio1 - ratio2)
    
    // Simplify both ratios
    const gcd1 = gcd(Math.abs(a1), Math.abs(b1))
    const gcd2 = gcd(Math.abs(a2), Math.abs(b2))
    
    return {
      ratio1: `${a1}:${b1}`,
      ratio2: `${a2}:${b2}`,
      simplified1: `${a1 / gcd1}:${b1 / gcd1}`,
      simplified2: `${a2 / gcd2}:${b2 / gcd2}`,
      equal: diff < 0.0001,
      value1: ratio1,
      value2: ratio2
    }
  }

  const hasInput = () => {
    if (mode === 'simplify') return simplifyA && simplifyB
    if (mode === 'find-x') {
      return findA && findB && (findPosition === 'C' ? findD : findC)
    }
    if (mode === 'to-percent') return percentA && percentB
    return compare1A && compare1B && compare2A && compare2B
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const getModeConfig = () => {
    const configs = {
      'simplify': {
        title: 'Simplify Ratio',
        icon: '📊',
        shortTitle: 'Simplify',
        example: '8:12 → 2:3',
        color: 'blue'
      },
      'find-x': {
        title: 'Find Missing Value',
        icon: '🔢',
        shortTitle: 'Find X',
        example: '2:3 = X:9 → X=6',
        color: 'purple'
      },
      'to-percent': {
        title: 'Ratio to Percentage',
        icon: '📈',
        shortTitle: 'To %',
        example: '3:5 → 37.5%:62.5%',
        color: 'green'
      },
      'compare': {
        title: 'Compare Ratios',
        icon: '⚖️',
        shortTitle: 'Compare',
        example: '2:3 vs 4:6 → Equal',
        color: 'orange'
      }
    }
    return configs[mode]
  }

  const config = getModeConfig()
  
  let result: SimplifyResult | FindXResult | PercentResult | CompareResult | null = null
  
  if (mode === 'simplify') {
    result = getSimplified()
  } else if (mode === 'find-x') {
    result = getFindX()
  } else if (mode === 'to-percent') {
    result = getPercents()
  } else {
    result = getComparison()
  }

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Ratio Calculator"
        description="Calculate and simplify ratios, find missing values in proportions, convert ratios to percentages, and compare ratios. Perfect for cooking, recipes, and math."
        icon="📐"
        gradient="from-blue-50 to-indigo-50"
        breadcrumbs={[
          { label: 'Math', href: '/#math' },
          { label: 'Ratio Calculator' }
        ]}
        features={[
          {
            icon: '📊',
            title: 'Simplify Ratios',
            description: 'Reduce ratios to their simplest form using GCD'
          },
          {
            icon: '🔢',
            title: 'Find Missing Values',
            description: 'Solve for unknown values in proportions easily'
          },
          {
            icon: '📈',
            title: 'Convert to Percentage',
            description: 'Transform ratios into percentage representations'
          },
          {
            icon: '⚖️',
            title: 'Compare Ratios',
            description: 'Check if two ratios are equal or different'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '📐',
            question: 'How do I simplify a ratio?',
            answer: 'To simplify a ratio, divide both numbers by their Greatest Common Divisor (GCD). For example, 8:12 can be simplified by dividing both by 4 to get 2:3. Our calculator finds the GCD automatically and shows you the simplified ratio instantly.'
          },
          {
            icon: '🔢',
            question: 'How do I find a missing value in a ratio?',
            answer: 'Use cross-multiplication: If A:B = C:D, then A×D = B×C. To find the missing value, rearrange the equation. For example, if 2:3 = X:9, then X = (2×9)÷3 = 6. Our calculator solves this automatically when you enter the known values.'
          },
          {
            icon: '📊',
            question: 'How do I convert a ratio to percentages?',
            answer: 'Add both parts of the ratio together to get the total, then divide each part by the total and multiply by 100. For example, 3:5 has total 8. So 3÷8×100 = 37.5% and 5÷8×100 = 62.5%. The percentages always add up to 100%.'
          },
          {
            icon: '⚖️',
            question: 'How can I tell if two ratios are equal?',
            answer: 'Two ratios are equal if they simplify to the same ratio. Alternatively, divide the first number by the second in each ratio - if you get the same decimal, they\'re equal. For example, 2:3 = 4:6 because both equal 0.667 (or both simplify to 2:3).'
          },
          {
            icon: '💡',
            question: 'What are common uses for ratio calculations?',
            answer: 'Ratios are used in cooking (ingredient proportions), map scales (1:50,000), mixing solutions (1:10 dilution), aspect ratios (16:9 screens), gear ratios, financial ratios, recipe scaling, concrete mixing, paint mixing, and comparing quantities in data analysis.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Ratio Calculator</h2>
            <p className="text-gray-700 mb-4">
              Our ratio calculator helps you work with ratios in four different ways. Choose your calculation type from the tabs, enter your values, and get instant results. Perfect for cooking, math homework, recipe scaling, and everyday calculations.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Four Calculation Modes</h3>
            <p className="text-gray-700 mb-4">
              <strong>1. Simplify Ratio:</strong> Reduce ratios to their simplest form (e.g., 8:12 → 2:3)<br/>
              <strong>2. Find Missing Value:</strong> Solve proportions with unknown values (e.g., 2:3 = X:9 → X = 6)<br/>
              <strong>3. Ratio to Percentage:</strong> Convert ratios to percentages (e.g., 3:5 → 37.5% : 62.5%)<br/>
              <strong>4. Compare Ratios:</strong> Check if two ratios are equal (e.g., 2:3 vs 4:6 → Equal)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Uses</h3>
            <p className="text-gray-700 mb-4">
              <strong>Cooking:</strong> Scale recipes up or down (2 eggs : 3 cups flour = X eggs : 9 cups flour)<br/>
              <strong>Maps:</strong> Understand map scales (1:50,000 means 1cm = 50,000cm real distance)<br/>
              <strong>Mixing:</strong> Dilute solutions or mix materials (1:10 bleach to water ratio)<br/>
              <strong>Finance:</strong> Analyze financial ratios (debt-to-equity, current ratio)<br/>
              <strong>Construction:</strong> Mix concrete or mortar (1:2:3 cement:sand:gravel)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Understanding Ratios</h3>
            <p className="text-gray-700">
              A ratio compares two or more quantities. Written as A:B, it shows how many times one value contains another. Ratios can be simplified like fractions - divide both sides by the same number. Equal ratios represent the same relationship (2:3 = 4:6 = 6:9).
            </p>
          </div>
        }
      >
        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* LEFT: Mode Selector + Inputs */}
          <div>
            
            {/* Mode Tabs */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📐 Choose Calculation Type
              </label>
              
              {/* Desktop: Full tabs */}
              <div className="hidden md:grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('simplify')}
                  className={`p-2.5 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'simplify'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  <div className="text-lg mb-0.5">📊</div>
                  <div>Simplify Ratio</div>
                </button>
                
                <button
                  onClick={() => setMode('find-x')}
                  className={`p-2.5 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'find-x'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  <div className="text-lg mb-0.5">🔢</div>
                  <div>Find Missing Value</div>
                </button>
                
                <button
                  onClick={() => setMode('to-percent')}
                  className={`p-2.5 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'to-percent'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  <div className="text-lg mb-0.5">📈</div>
                  <div>Ratio to Percentage</div>
                </button>
                
                <button
                  onClick={() => setMode('compare')}
                  className={`p-2.5 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'compare'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  <div className="text-lg mb-0.5">⚖️</div>
                  <div>Compare Ratios</div>
                </button>
              </div>

              {/* Mobile: Compact tabs */}
              <div className="grid md:hidden grid-cols-4 gap-2">
                <button
                  onClick={() => setMode('simplify')}
                  className={`p-2 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'simplify'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <div className="text-base mb-0.5">📊</div>
                  <div className="text-[10px]">Simplify</div>
                </button>
                
                <button
                  onClick={() => setMode('find-x')}
                  className={`p-2 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'find-x'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-purple-50 text-purple-700'
                  }`}
                >
                  <div className="text-base mb-0.5">🔢</div>
                  <div className="text-[10px]">Find X</div>
                </button>
                
                <button
                  onClick={() => setMode('to-percent')}
                  className={`p-2 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'to-percent'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  <div className="text-base mb-0.5">📈</div>
                  <div className="text-[10px]">To %</div>
                </button>
                
                <button
                  onClick={() => setMode('compare')}
                  className={`p-2 rounded-lg font-semibold text-xs transition-all ${
                    mode === 'compare'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  <div className="text-base mb-0.5">⚖️</div>
                  <div className="text-[10px]">Comp</div>
                </button>
              </div>
            </div>

            {/* Inputs based on mode */}
            <div className="space-y-5">
              
              {mode === 'simplify' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter Ratio (A : B)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={simplifyA}
                        onChange={(e) => setSimplifyA(e.target.value)}
                        placeholder="8"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                      <span className="text-2xl font-bold text-gray-400">:</span>
                      <input
                        type="number"
                        value={simplifyB}
                        onChange={(e) => setSimplifyB(e.target.value)}
                        placeholder="12"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                    </div>
                  </div>
                </>
              )}

              {mode === 'find-x' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Known Ratio (A : B)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={findA}
                        onChange={(e) => setFindA(e.target.value)}
                        placeholder="2"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                      />
                      <span className="text-2xl font-bold text-gray-400">:</span>
                      <input
                        type="number"
                        value={findB}
                        onChange={(e) => setFindB(e.target.value)}
                        placeholder="3"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Find Missing Value
                    </label>
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => setFindPosition('C')}
                        className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition ${
                          findPosition === 'C'
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        Find First (X : D)
                      </button>
                      <div className="w-[2.5rem]"></div>
                      <button
                        onClick={() => setFindPosition('D')}
                        className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition ${
                          findPosition === 'D'
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        Find Second (C : X)
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={findC}
                        onChange={(e) => setFindC(e.target.value)}
                        placeholder={findPosition === 'C' ? 'X' : '6'}
                        disabled={findPosition === 'C'}
                        className={`flex-1 px-3 py-2 text-base font-medium border-2 rounded-xl outline-none transition ${
                          findPosition === 'C'
                            ? 'bg-purple-50 text-purple-600 border-purple-300'
                            : 'text-gray-600 placeholder:text-gray-400 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                        }`}
                      />
                      <span className="text-2xl font-bold text-gray-400">:</span>
                      <input
                        type="number"
                        value={findD}
                        onChange={(e) => setFindD(e.target.value)}
                        placeholder={findPosition === 'D' ? 'X' : '9'}
                        disabled={findPosition === 'D'}
                        className={`flex-1 px-3 py-2 text-base font-medium border-2 rounded-xl outline-none transition ${
                          findPosition === 'D'
                            ? 'bg-purple-50 text-purple-600 border-purple-300'
                            : 'text-gray-600 placeholder:text-gray-400 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                        }`}
                      />
                    </div>
                  </div>
                </>
              )}

              {mode === 'to-percent' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter Ratio (A : B)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={percentA}
                        onChange={(e) => setPercentA(e.target.value)}
                        placeholder="3"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                      <span className="text-2xl font-bold text-gray-400">:</span>
                      <input
                        type="number"
                        value={percentB}
                        onChange={(e) => setPercentB(e.target.value)}
                        placeholder="5"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                    </div>
                  </div>
                </>
              )}

              {mode === 'compare' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ratio 1 (A : B)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={compare1A}
                        onChange={(e) => setCompare1A(e.target.value)}
                        placeholder="2"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                      />
                      <span className="text-2xl font-bold text-gray-400">:</span>
                      <input
                        type="number"
                        value={compare1B}
                        onChange={(e) => setCompare1B(e.target.value)}
                        placeholder="3"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ratio 2 (C : D)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={compare2A}
                        onChange={(e) => setCompare2A(e.target.value)}
                        placeholder="4"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                      />
                      <span className="text-2xl font-bold text-gray-400">:</span>
                      <input
                        type="number"
                        value={compare2B}
                        onChange={(e) => setCompare2B(e.target.value)}
                        placeholder="6"
                        className="flex-1 px-3 py-2 text-base font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Example */}
            <div className="mt-5 bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <p className="text-xs text-gray-700">
                <strong>Example:</strong> {config.example}
              </p>
            </div>

          </div>

          {/* RIGHT: Results */}
          <div className="space-y-4">
            
            {hasInput() && result ? (
              <>
                {/* Main Result */}
                {mode === 'simplify' && result && 'simplified' in result && (
                  <>
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-5 text-white shadow-lg">
                      <div className="text-xs font-semibold opacity-90 mb-1">Simplified Ratio</div>
                      <div className="text-4xl font-extrabold mb-1">
                        {result.simplified}
                      </div>
                      <div className="text-xs opacity-90">From {result.original}</div>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📊</span>
                        <span>Details</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                          <span className="text-xs text-gray-600">Original Ratio</span>
                          <span className="font-bold text-gray-900">{result.original}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-blue-50 rounded-lg">
                          <span className="text-xs text-blue-700">GCD</span>
                          <span className="font-bold text-blue-700">{result.gcd}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-blue-100 rounded-lg border-2 border-blue-300">
                          <span className="text-xs text-blue-900 font-semibold">Simplified</span>
                          <span className="text-lg font-bold text-blue-900">{result.simplified}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'find-x' && result && 'x' in result && (
                  <>
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-5 text-white shadow-lg">
                      <div className="text-xs font-semibold opacity-90 mb-1">Missing Value</div>
                      <div className="text-4xl font-extrabold mb-1">
                        X = {formatNumber(result.x)}
                      </div>
                      <div className="text-xs opacity-90">{result.equation}</div>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📊</span>
                        <span>Solution</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                          <span className="text-xs text-gray-600">Known Ratio</span>
                          <span className="font-bold text-gray-900">{findA}:{findB}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                          <span className="text-xs text-gray-600">Equation</span>
                          <span className="font-bold text-gray-900">{result.equation}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-purple-100 rounded-lg border-2 border-purple-300">
                          <span className="text-xs text-purple-900 font-semibold">X =</span>
                          <span className="text-lg font-bold text-purple-900">{formatNumber(result.x)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'to-percent' && result && 'aPercent' in result && (
                  <>
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-5 text-white shadow-lg">
                      <div className="text-xs font-semibold opacity-90 mb-1">As Percentages</div>
                      <div className="text-3xl font-extrabold mb-1">
                        {formatNumber(result.aPercent)}% : {formatNumber(result.bPercent)}%
                      </div>
                      <div className="text-xs opacity-90">From ratio {result.ratio}</div>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📊</span>
                        <span>Breakdown</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                          <span className="text-xs text-gray-600">Original</span>
                          <span className="font-bold text-gray-900">{result.ratio}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-green-50 rounded-lg">
                          <span className="text-xs text-green-700">Part A</span>
                          <span className="font-bold text-green-700">{formatNumber(result.aPercent)}%</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-green-50 rounded-lg">
                          <span className="text-xs text-green-700">Part B</span>
                          <span className="font-bold text-green-700">{formatNumber(result.bPercent)}%</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-green-100 rounded-lg border-2 border-green-300">
                          <span className="text-xs text-green-900 font-semibold">Total</span>
                          <span className="text-lg font-bold text-green-900">{result.total}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Bar */}
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">Visual</h3>
                      <div className="h-10 flex rounded-lg overflow-hidden mb-2">
                        <div 
                          className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
                          style={{ width: `${result.aPercent}%` }}
                        >
                          {formatNumber(result.aPercent)}%
                        </div>
                        <div 
                          className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                          style={{ width: `${result.bPercent}%` }}
                        >
                          {formatNumber(result.bPercent)}%
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Part A</span>
                        <span>Part B</span>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'compare' && result && 'equal' in result && (
                  <>
                    <div className={`bg-gradient-to-br rounded-xl p-5 text-white shadow-lg ${
                      result.equal 
                        ? 'from-green-400 to-green-600' 
                        : 'from-orange-400 to-orange-600'
                    }`}>
                      <div className="text-xs font-semibold opacity-90 mb-1">Comparison</div>
                      <div className="text-5xl font-extrabold mb-1">
                        {result.equal ? '=' : '≠'}
                      </div>
                      <div className="text-xs opacity-90">
                        {result.equal ? 'EQUAL' : 'NOT EQUAL'}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📊</span>
                        <span>Details</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="p-2.5 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-xs text-gray-600">Ratio 1</span>
                            <span className="font-bold text-gray-900">{result.ratio1}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-blue-700">Simplified</span>
                            <span className="text-xs font-semibold text-blue-700">{result.simplified1}</span>
                          </div>
                        </div>

                        <div className="p-2.5 bg-purple-50 rounded-lg">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-xs text-gray-600">Ratio 2</span>
                            <span className="font-bold text-gray-900">{result.ratio2}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-purple-700">Simplified</span>
                            <span className="text-xs font-semibold text-purple-700">{result.simplified2}</span>
                          </div>
                        </div>

                        <div className={`p-2.5 rounded-lg border-2 ${
                          result.equal 
                            ? 'bg-green-100 border-green-300' 
                            : 'bg-orange-100 border-orange-300'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-semibold ${
                              result.equal ? 'text-green-900' : 'text-orange-900'
                            }`}>
                              Result
                            </span>
                            <span className={`font-bold ${
                              result.equal ? 'text-green-900' : 'text-orange-900'
                            }`}>
                              {result.equal ? 'EQUAL' : 'NOT EQUAL'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Formula */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-3">
                  <h3 className="text-xs font-bold text-gray-900 mb-1.5 flex items-center gap-2">
                    <span>💡</span>
                    <span>Formula</span>
                  </h3>
                  <div className="text-[11px] text-gray-700">
                    {mode === 'simplify' && <p>Divide both by GCD to simplify</p>}
                    {mode === 'find-x' && <p>Cross multiply: A×D = B×C, then solve for X</p>}
                    {mode === 'to-percent' && <p>Each part ÷ total × 100 = percentage</p>}
                    {mode === 'compare' && <p>Simplify both ratios and compare</p>}
                  </div>
                </div>

              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-5 text-center text-white shadow-lg">
                  <div className="text-3xl mb-1.5">{config.icon}</div>
                  <div className="text-[10px] font-semibold opacity-90 mb-1.5">Ready to Calculate</div>
                  <div className="text-4xl font-extrabold mb-1.5">A:B</div>
                  <p className="text-[10px] opacity-90">Enter values to see result</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-3.5">
                  <div className="text-center">
                    <div className="text-xl mb-1.5">💡</div>
                    <h3 className="text-xs font-bold text-gray-900 mb-2">Quick Tips</h3>
                    <div className="text-left space-y-0.5 text-[11px] text-gray-700">
                      <p>• Simplify: 8:12 → 2:3 (÷4)</p>
                      <p>• Find X: 2:3 = X:9 → X=6</p>
                      <p>• To %: 3:5 → 37.5%:62.5%</p>
                      <p>• Compare: 2:3 = 4:6 ✓</p>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}