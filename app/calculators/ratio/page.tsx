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
  
  const [simplifyA, setSimplifyA] = useState('')
  const [simplifyB, setSimplifyB] = useState('')
  
  const [findA, setFindA] = useState('')
  const [findB, setFindB] = useState('')
  const [findC, setFindC] = useState('')
  const [findD, setFindD] = useState('')
  const [findPosition, setFindPosition] = useState<'C' | 'D'>('C')
  
  const [percentA, setPercentA] = useState('')
  const [percentB, setPercentB] = useState('')
  
  const [compare1A, setCompare1A] = useState('')
  const [compare1B, setCompare1B] = useState('')
  const [compare2A, setCompare2A] = useState('')
  const [compare2B, setCompare2B] = useState('')

  const relatedTools = getSmartRelatedTools('ratio', 3)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

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

  const getComparison = (): CompareResult | null => {
    const a1 = parseFloat(compare1A) || 0
    const b1 = parseFloat(compare1B) || 0
    const a2 = parseFloat(compare2A) || 0
    const b2 = parseFloat(compare2B) || 0
    
    if (a1 === 0 || b1 === 0 || a2 === 0 || b2 === 0) return null
    
    const ratio1 = a1 / b1
    const ratio2 = a2 / b2
    const diff = Math.abs(ratio1 - ratio2)
    
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
        example: '8:12 → 2:3', 
        gradient: 'from-sky-100 to-sky-200',
        buttonBg: 'bg-sky-200',
        borderColor: 'border-sky-100',
        lightBg: 'bg-sky-50',
        mediumBg: 'bg-sky-100',
        textColor: 'text-sky-700',
        darkText: 'text-sky-800'
      },
      'find-x': { 
        title: 'Find Missing Value', 
        icon: '🔢', 
        example: '2:3 = X:9 → X=6', 
        gradient: 'from-purple-100 to-purple-200',
        buttonBg: 'bg-purple-200',
        borderColor: 'border-purple-100',
        lightBg: 'bg-purple-50',
        mediumBg: 'bg-purple-100',
        textColor: 'text-purple-700',
        darkText: 'text-purple-800'
      },
      'to-percent': { 
        title: 'Ratio to Percentage', 
        icon: '📈', 
        example: '3:5 → 37.5%:62.5%', 
        gradient: 'from-emerald-100 to-emerald-200',
        buttonBg: 'bg-emerald-200',
        borderColor: 'border-emerald-100',
        lightBg: 'bg-emerald-50',
        mediumBg: 'bg-emerald-100',
        textColor: 'text-emerald-700',
        darkText: 'text-emerald-800'
      },
      'compare': { 
        title: 'Compare Ratios', 
        icon: '⚖️', 
        example: '2:3 vs 4:6 → Equal', 
        gradient: 'from-amber-100 to-amber-200',
        buttonBg: 'bg-amber-200',
        borderColor: 'border-amber-100',
        lightBg: 'bg-amber-50',
        mediumBg: 'bg-amber-100',
        textColor: 'text-amber-700',
        darkText: 'text-amber-800'
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
          { icon: '📊', title: 'Simplify Ratios', description: 'Reduce ratios to their simplest form using GCD' },
          { icon: '🔢', title: 'Find Missing Values', description: 'Solve for unknown values in proportions easily' },
          { icon: '📈', title: 'Convert to Percentage', description: 'Transform ratios into percentage representations' },
          { icon: '⚖️', title: 'Compare Ratios', description: 'Check if two ratios are equal or different' }
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
        {/* PASTEL SOFT THEME - สีนุ่มนวลสบายตา */}
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
          
          {/* Mode Selector - Pastel Colors */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-1 sm:p-2 mb-4 sm:mb-6">
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              <button
                onClick={() => setMode('simplify')}
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all ${
                  mode === 'simplify'
                    ? 'bg-sky-200 text-sky-800 shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1">📊</div>
                <div className="leading-tight">Simp</div>
              </button>
              
              <button
                onClick={() => setMode('find-x')}
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all ${
                  mode === 'find-x'
                    ? 'bg-purple-200 text-purple-800 shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1">🔢</div>
                <div className="leading-tight">Find</div>
              </button>
              
              <button
                onClick={() => setMode('to-percent')}
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all ${
                  mode === 'to-percent'
                    ? 'bg-emerald-200 text-emerald-800 shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1">📈</div>
                <div className="leading-tight">To %</div>
              </button>
              
              <button
                onClick={() => setMode('compare')}
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all ${
                  mode === 'compare'
                    ? 'bg-amber-200 text-amber-800 shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1">⚖️</div>
                <div className="leading-tight">Comp</div>
              </button>
            </div>
          </div>

          {/* Main Calculator Card - Soft Pastel Gradient */}
          <div className={`bg-gradient-to-br ${config.gradient} rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 border border-gray-100`}>
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{config.icon}</div>
              <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 ${config.darkText}`}>{config.title}</h2>
              <p className={`text-xs sm:text-sm ${config.textColor}`}>{config.example}</p>
            </div>

            {/* Inputs */}
            <div className="space-y-3 sm:space-y-4">
              
              {mode === 'simplify' && (
                <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50">
                  <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${config.textColor}`}>Enter Ratio</label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="number"
                      value={simplifyA}
                      onChange={(e) => setSimplifyA(e.target.value)}
                      placeholder="8"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition"
                    />
                    <span className={`text-2xl sm:text-3xl font-bold flex-shrink-0 ${config.textColor}`}>:</span>
                    <input
                      type="number"
                      value={simplifyB}
                      onChange={(e) => setSimplifyB(e.target.value)}
                      placeholder="12"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition"
                    />
                  </div>
                </div>
              )}

              {mode === 'find-x' && (
                <>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50">
                    <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${config.textColor}`}>Known Ratio</label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="number"
                        value={findA}
                        onChange={(e) => setFindA(e.target.value)}
                        placeholder="2"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition"
                      />
                      <span className={`text-2xl sm:text-3xl font-bold flex-shrink-0 ${config.textColor}`}>:</span>
                      <input
                        type="number"
                        value={findB}
                        onChange={(e) => setFindB(e.target.value)}
                        placeholder="3"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition"
                      />
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50">
                    <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${config.textColor}`}>Find Missing Value</label>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <button
                        onClick={() => setFindPosition('C')}
                        className={`py-2 px-2 sm:px-3 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition ${
                          findPosition === 'C'
                            ? 'bg-white text-purple-700 shadow-sm border border-purple-200'
                            : 'bg-white/50 text-purple-600 hover:bg-white/70 border border-white'
                        }`}
                      >
                        <span className="hidden sm:inline">Find First (X : D)</span>
                        <span className="sm:hidden">X : D</span>
                      </button>
                      <button
                        onClick={() => setFindPosition('D')}
                        className={`py-2 px-2 sm:px-3 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition ${
                          findPosition === 'D'
                            ? 'bg-white text-purple-700 shadow-sm border border-purple-200'
                            : 'bg-white/50 text-purple-600 hover:bg-white/70 border border-white'
                        }`}
                      >
                        <span className="hidden sm:inline">Find Second (C : X)</span>
                        <span className="sm:hidden">C : X</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="number"
                        value={findC}
                        onChange={(e) => setFindC(e.target.value)}
                        placeholder={findPosition === 'C' ? 'X' : '6'}
                        disabled={findPosition === 'C'}
                        className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold rounded-lg sm:rounded-xl outline-none min-w-0 border transition ${
                          findPosition === 'C'
                            ? 'bg-purple-50 text-purple-600 border-purple-200 placeholder:text-purple-400'
                            : 'bg-white text-gray-900 border-gray-200 placeholder:text-gray-400 focus:border-purple-300 focus:ring-2 focus:ring-purple-100'
                        }`}
                      />
                      <span className={`text-2xl sm:text-3xl font-bold flex-shrink-0 ${config.textColor}`}>:</span>
                      <input
                        type="number"
                        value={findD}
                        onChange={(e) => setFindD(e.target.value)}
                        placeholder={findPosition === 'D' ? 'X' : '9'}
                        disabled={findPosition === 'D'}
                        className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold rounded-lg sm:rounded-xl outline-none min-w-0 border transition ${
                          findPosition === 'D'
                            ? 'bg-purple-50 text-purple-600 border-purple-200 placeholder:text-purple-400'
                            : 'bg-white text-gray-900 border-gray-200 placeholder:text-gray-400 focus:border-purple-300 focus:ring-2 focus:ring-purple-100'
                        }`}
                      />
                    </div>
                  </div>
                </>
              )}

              {mode === 'to-percent' && (
                <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50">
                  <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${config.textColor}`}>Enter Ratio</label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="number"
                      value={percentA}
                      onChange={(e) => setPercentA(e.target.value)}
                      placeholder="3"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition"
                    />
                    <span className={`text-2xl sm:text-3xl font-bold flex-shrink-0 ${config.textColor}`}>:</span>
                    <input
                      type="number"
                      value={percentB}
                      onChange={(e) => setPercentB(e.target.value)}
                      placeholder="5"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                </div>
              )}

              {mode === 'compare' && (
                <>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50">
                    <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${config.textColor}`}>Ratio 1</label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="number"
                        value={compare1A}
                        onChange={(e) => setCompare1A(e.target.value)}
                        placeholder="2"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition"
                      />
                      <span className={`text-2xl sm:text-3xl font-bold flex-shrink-0 ${config.textColor}`}>:</span>
                      <input
                        type="number"
                        value={compare1B}
                        onChange={(e) => setCompare1B(e.target.value)}
                        placeholder="3"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition"
                      />
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50">
                    <label className={`block text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${config.textColor}`}>Ratio 2</label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="number"
                        value={compare2A}
                        onChange={(e) => setCompare2A(e.target.value)}
                        placeholder="4"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition"
                      />
                      <span className={`text-2xl sm:text-3xl font-bold flex-shrink-0 ${config.textColor}`}>:</span>
                      <input
                        type="number"
                        value={compare2B}
                        onChange={(e) => setCompare2B(e.target.value)}
                        placeholder="6"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 bg-white rounded-lg sm:rounded-xl outline-none min-w-0 border border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results - Soft Pastel Colors */}
          {hasInput() && result ? (
            <div className="space-y-3 sm:space-y-4">
              
              {mode === 'simplify' && result && 'simplified' in result && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border-2 border-sky-100">
                  <div className="text-center mb-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Simplified Ratio</div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-sky-600 mb-2 break-all">
                      {result.simplified}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">from {result.original}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100">
                      <div className="text-[10px] sm:text-xs text-gray-600 mb-1">Original</div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900 break-all">{result.original}</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-sky-50 rounded-lg sm:rounded-xl border border-sky-100">
                      <div className="text-[10px] sm:text-xs text-sky-600 mb-1">GCD</div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-sky-700">{result.gcd}</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-sky-100 rounded-lg sm:rounded-xl border-2 border-sky-200">
                      <div className="text-[10px] sm:text-xs text-sky-700 mb-1">Simple</div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-sky-800 break-all">{result.simplified}</div>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'find-x' && result && 'x' in result && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border-2 border-purple-100">
                  <div className="text-center mb-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Missing Value</div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-purple-600 mb-2 break-all">
                      X = {formatNumber(result.x)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 break-all">{result.equation}</div>
                  </div>

                  <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 border border-purple-100">
                    <div className="text-[10px] sm:text-xs text-purple-600 font-semibold mb-1 sm:mb-2">💡 Formula</div>
                    <div className="text-xs sm:text-sm text-purple-700">Cross multiply: A×D = B×C</div>
                  </div>
                </div>
              )}

              {mode === 'to-percent' && result && 'aPercent' in result && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border-2 border-emerald-100">
                  <div className="text-center mb-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">As Percentages</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-600 mb-2 break-all">
                      {formatNumber(result.aPercent)}% : {formatNumber(result.bPercent)}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">from {result.ratio}</div>
                  </div>

                  <div className="h-10 sm:h-12 flex rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm border border-gray-100">
                    <div 
                      className="bg-emerald-300 flex items-center justify-center text-emerald-800 text-xs sm:text-sm font-bold"
                      style={{ width: `${result.aPercent}%` }}
                    >
                      {formatNumber(result.aPercent)}%
                    </div>
                    <div 
                      className="bg-sky-300 flex items-center justify-center text-sky-800 text-xs sm:text-sm font-bold"
                      style={{ width: `${result.bPercent}%` }}
                    >
                      {formatNumber(result.bPercent)}%
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] sm:text-xs text-gray-600">
                    <span>← Part A</span>
                    <span>Part B →</span>
                  </div>
                </div>
              )}

              {mode === 'compare' && result && 'equal' in result && (
                <div className={`bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border-2 ${
                  result.equal ? 'border-emerald-100' : 'border-amber-100'
                }`}>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Comparison</div>
                    <div className={`text-6xl sm:text-7xl md:text-8xl font-black mb-2 ${
                      result.equal ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {result.equal ? '=' : '≠'}
                    </div>
                    <div className={`text-sm sm:text-base md:text-lg font-bold ${
                      result.equal ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {result.equal ? 'EQUAL' : 'NOT EQUAL'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 bg-sky-50 rounded-lg sm:rounded-xl border border-sky-100">
                      <div className="text-[10px] sm:text-xs text-gray-600 mb-1">Ratio 1</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 break-all">{result.ratio1}</div>
                      <div className="text-[10px] sm:text-xs text-sky-600 break-all">= {result.simplified1}</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl border border-purple-100">
                      <div className="text-[10px] sm:text-xs text-gray-600 mb-1">Ratio 2</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 break-all">{result.ratio2}</div>
                      <div className="text-[10px] sm:text-xs text-purple-600 break-all">= {result.simplified2}</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🧮</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">Ready to Calculate</h3>
              <p className="text-xs sm:text-sm text-gray-600">Enter values above to see the result</p>
            </div>
          )}

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}