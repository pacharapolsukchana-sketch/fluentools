'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type CalculationMode = 'percent-of' | 'what-percent' | 'increase' | 'decrease'

export default function PercentageCalculator() {
  const [mode, setMode] = useState<CalculationMode>('percent-of')
  
  // Percent of mode
  const [percentValue, setPercentValue] = useState('')
  const [ofValue, setOfValue] = useState('')
  
  // What percent mode
  const [partValue, setPartValue] = useState('')
  const [totalValue, setTotalValue] = useState('')
  
  // Increase/Decrease mode
  const [originalValue, setOriginalValue] = useState('')
  const [newValue, setNewValue] = useState('')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('percentage', 3)

  // Calculate based on mode
  const getResult = () => {
    if (mode === 'percent-of') {
      const percent = parseFloat(percentValue) || 0
      const value = parseFloat(ofValue) || 0
      return (percent / 100) * value
    } else if (mode === 'what-percent') {
      const part = parseFloat(partValue) || 0
      const total = parseFloat(totalValue) || 0
      return total > 0 ? (part / total) * 100 : 0
    } else {
      const original = parseFloat(originalValue) || 0
      const newVal = parseFloat(newValue) || 0
      if (original === 0) return 0
      
      return ((newVal - original) / original) * 100
    }
  }

  const result = getResult()
  const hasInput = () => {
    if (mode === 'percent-of') return percentValue && ofValue
    if (mode === 'what-percent') return partValue && totalValue
    return originalValue && newValue
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const getModeConfig = () => {
    const configs = {
      'percent-of': {
        title: 'What is X% of Y?',
        icon: '💯',
        shortTitle: 'X% of Y',
        example: '25% of 200 = 50',
        color: 'blue'
      },
      'what-percent': {
        title: 'X is what % of Y?',
        icon: '❓',
        shortTitle: 'What %',
        example: '50 is 25% of 200',
        color: 'purple'
      },
      'increase': {
        title: 'Percentage Increase',
        icon: '📈',
        shortTitle: 'Increase',
        example: '100 → 150 = +50%',
        color: 'green'
      },
      'decrease': {
        title: 'Percentage Decrease',
        icon: '📉',
        shortTitle: 'Decrease',
        example: '200 → 150 = -25%',
        color: 'red'
      }
    }
    return configs[mode]
  }

  const config = getModeConfig()

  const structuredData = generateStructuredData('percentage')
  const faqSchema = generateFAQSchema([
    { question: 'How do I calculate a percentage?', answer: 'Divide the part by the whole and multiply by 100. Formula: (part ÷ whole) × 100 = percentage.' },
    { question: 'How do I calculate percentage increase?', answer: 'Formula: ((new - original) ÷ original) × 100.' },
    { question: 'How do I calculate percentage decrease?', answer: 'Formula: ((original - new) ÷ original) × 100.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Calculators', url: 'https://fluentools.com/#calculators' },
    { name: 'Percentage Calculator', url: 'https://fluentools.com/calculators/percentage' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Percentage Calculator"
        description="Calculate percentages easily. Find what is X% of Y, percentage increase/decrease, and what percent one number is of another. Fast and accurate."
        icon="📊"
        gradient="from-blue-50 to-purple-50"
        breadcrumbs={[
          { label: 'Math', href: '/#math' },
          { label: 'Percentage Calculator' }
        ]}
        features={[
          {
            icon: '💯',
            title: '4 Calculation Modes',
            description: 'Calculate percentages, increases, decreases, and find ratios'
          },
          {
            icon: '⚡',
            title: 'Instant Results',
            description: 'See results immediately as you type - no button needed'
          },
          {
            icon: '🎯',
            title: 'Easy to Use',
            description: 'Simple interface with clear examples for each calculation type'
          },
          {
            icon: '🆓',
            title: 'Always Free',
            description: 'No registration or payment required - use unlimited times'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '💡',
            question: 'How do I calculate percentage?',
            answer: 'To find what percentage X is of Y, divide X by Y and multiply by 100. For example: 50 is what % of 200? Answer: (50 ÷ 200) × 100 = 25%. To find X% of Y, multiply Y by X and divide by 100. For example: What is 25% of 200? Answer: 200 × 25 ÷ 100 = 50.'
          },
          {
            icon: '📊',
            question: 'What is the difference between percentage increase and decrease?',
            answer: 'Percentage increase shows how much a value has grown relative to the original. Formula: ((New - Original) ÷ Original) × 100. Percentage decrease shows how much a value has fallen. The formula is the same, but the result is negative. Example: 100 to 150 is +50% increase. 200 to 150 is -25% decrease.'
          },
          {
            icon: '🧮',
            question: 'How to calculate percentage of a number?',
            answer: 'Multiply the number by the percentage and divide by 100. Or move the decimal point two places left and multiply. For example: 25% of 200 = 200 × 0.25 = 50. Or: 200 × 25 ÷ 100 = 50. Both methods give the same result.'
          },
          {
            icon: '📈',
            question: 'How do I find percentage change?',
            answer: 'Subtract the original value from the new value, divide by the original value, then multiply by 100. Formula: ((New - Original) ÷ Original) × 100. Example: Price increased from $80 to $100. Change = ((100 - 80) ÷ 80) × 100 = 25% increase.'
          },
          {
            icon: '💯',
            question: 'What are common percentage calculations in daily life?',
            answer: 'Sales discounts (20% off), tax calculations (8% sales tax), tip amounts (15-20%), grade scores (90% = A), financial changes (stock up 5%), body metrics (body fat %), recipe adjustments (increase by 50%), and salary raises (3% annual increase).'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Percentage Calculator</h2>
            <p className="text-gray-700 mb-4">
              Our percentage calculator makes it easy to calculate percentages in four different ways. Choose your calculation type, enter your numbers, and see instant results. Perfect for shopping discounts, grade calculations, financial analysis, and everyday math.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Four Calculation Modes</h3>
            <p className="text-gray-700 mb-4">
              <strong>1. What is X% of Y?</strong> - Find a percentage of a number (e.g., 25% of 200 = 50)<br/>
              <strong>2. X is what % of Y?</strong> - Find what percentage one number is of another (e.g., 50 is 25% of 200)<br/>
              <strong>3. Percentage Increase</strong> - Calculate growth percentage (e.g., 100 to 150 = +50%)<br/>
              <strong>4. Percentage Decrease</strong> - Calculate reduction percentage (e.g., 200 to 150 = -25%)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Uses</h3>
            <p className="text-gray-700 mb-4">
              <strong>Shopping:</strong> Calculate sale prices and discounts (30% off $100 = $70 final price)<br/>
              <strong>Grades:</strong> Convert scores to percentages (45/60 = 75%)<br/>
              <strong>Finance:</strong> Calculate investment returns and interest rates<br/>
              <strong>Tips:</strong> Figure out restaurant gratuity (15% of $80 bill = $12 tip)<br/>
              <strong>Taxes:</strong> Add sales tax to purchases (8% tax on $50 = $4 tax, $54 total)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Quick Percentage Tricks</h3>
            <p className="text-gray-700">
              <strong>10% trick:</strong> Move decimal one place left (10% of 250 = 25)<br/>
              <strong>50% trick:</strong> Divide by 2 (50% of 80 = 40)<br/>
              <strong>25% trick:</strong> Divide by 4 (25% of 100 = 25)<br/>
              <strong>1% trick:</strong> Move decimal two places left (1% of 500 = 5)
            </p>
          </div>
        }
      >
        {/* Calculator UI - same as before */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* LEFT: Mode Selector + Inputs */}
          <div className="space-y-6">
            
            {/* Mode Tabs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📊 Choose Calculation Type
              </label>
              
              {/* Desktop: Full tabs */}
              <div className="hidden md:grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('percent-of')}
                  className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                    mode === 'percent-of'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  <div className="text-2xl mb-1">💯</div>
                  <div>What is X% of Y?</div>
                </button>
                
                <button
                  onClick={() => setMode('what-percent')}
                  className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                    mode === 'what-percent'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  <div className="text-2xl mb-1">❓</div>
                  <div>X is what % of Y?</div>
                </button>
                
                <button
                  onClick={() => setMode('increase')}
                  className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                    mode === 'increase'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  <div className="text-2xl mb-1">📈</div>
                  <div>Percentage Increase</div>
                </button>
                
                <button
                  onClick={() => setMode('decrease')}
                  className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                    mode === 'decrease'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  <div className="text-2xl mb-1">📉</div>
                  <div>Percentage Decrease</div>
                </button>
              </div>

              {/* Mobile: Compact tabs */}
              <div className="grid md:hidden grid-cols-4 gap-2">
                <button
                  onClick={() => setMode('percent-of')}
                  className={`p-3 rounded-xl font-semibold text-xs transition-all ${
                    mode === 'percent-of'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <div className="text-xl mb-1">💯</div>
                  <div>X% of Y</div>
                </button>
                
                <button
                  onClick={() => setMode('what-percent')}
                  className={`p-3 rounded-xl font-semibold text-xs transition-all ${
                    mode === 'what-percent'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-purple-50 text-purple-700'
                  }`}
                >
                  <div className="text-xl mb-1">❓</div>
                  <div>What %</div>
                </button>
                
                <button
                  onClick={() => setMode('increase')}
                  className={`p-3 rounded-xl font-semibold text-xs transition-all ${
                    mode === 'increase'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  <div className="text-xl mb-1">📈</div>
                  <div>Inc</div>
                </button>
                
                <button
                  onClick={() => setMode('decrease')}
                  className={`p-3 rounded-xl font-semibold text-xs transition-all ${
                    mode === 'decrease'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  <div className="text-xl mb-1">📉</div>
                  <div>Dec</div>
                </button>
              </div>
            </div>

            {/* Inputs based on mode */}
            <div className="space-y-4">
              
              {mode === 'percent-of' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📊 Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={percentValue}
                        onChange={(e) => setPercentValue(e.target.value)}
                        placeholder="25"
                        className="w-full pl-4 pr-10 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💰 Of Value
                    </label>
                    <input
                      type="number"
                      value={ofValue}
                      onChange={(e) => setOfValue(e.target.value)}
                      placeholder="200"
                      className="w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />
                  </div>
                </>
              )}

              {mode === 'what-percent' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💰 Value
                    </label>
                    <input
                      type="number"
                      value={partValue}
                      onChange={(e) => setPartValue(e.target.value)}
                      placeholder="50"
                      className="w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📊 Of Total
                    </label>
                    <input
                      type="number"
                      value={totalValue}
                      onChange={(e) => setTotalValue(e.target.value)}
                      placeholder="200"
                      className="w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    />
                  </div>
                </>
              )}

              {(mode === 'increase' || mode === 'decrease') && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💰 Original Value
                    </label>
                    <input
                      type="number"
                      value={originalValue}
                      onChange={(e) => setOriginalValue(e.target.value)}
                      placeholder={mode === 'increase' ? '100' : '200'}
                      className={`w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:ring-2 outline-none transition ${
                        mode === 'increase' 
                          ? 'focus:border-green-500 focus:ring-green-200' 
                          : 'focus:border-red-500 focus:ring-red-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {mode === 'increase' ? '📈 New Value (Higher)' : '📉 New Value (Lower)'}
                    </label>
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="150"
                      className={`w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:ring-2 outline-none transition ${
                        mode === 'increase' 
                          ? 'focus:border-green-500 focus:ring-green-200' 
                          : 'focus:border-red-500 focus:ring-red-200'
                      }`}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Example */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> {config.example}
              </p>
            </div>

          </div>

          {/* RIGHT: Results */}
          <div className="space-y-4">
            
            {hasInput() ? (
              <>
                {/* Main Result */}
                <div className={`rounded-xl p-6 text-white shadow-lg ${
                  mode === 'percent-of' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  mode === 'what-percent' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                  mode === 'increase' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  'bg-gradient-to-br from-red-400 to-red-600'
                }`}>
                  <div className="text-sm font-semibold opacity-90 mb-2">
                    {config.title}
                  </div>
                  <div className="text-5xl font-extrabold mb-2">
                    {mode === 'percent-of' && formatNumber(result)}
                    {mode === 'what-percent' && `${formatNumber(result)}%`}
                    {(mode === 'increase' || mode === 'decrease') && `${result >= 0 ? '+' : ''}${formatNumber(result)}%`}
                  </div>
                  <div className="text-sm opacity-90">
                    {mode === 'percent-of' && `${percentValue}% of ${ofValue}`}
                    {mode === 'what-percent' && `${partValue} is ${formatNumber(result)}% of ${totalValue}`}
                    {(mode === 'increase' || mode === 'decrease') && `From ${originalValue} to ${newValue}`}
                  </div>
                </div>

                {/* Breakdown */}
                {mode === 'percent-of' && (
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span>📊</span>
                      <span>Breakdown</span>
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Original Value</span>
                        <span className="font-bold text-gray-900">{ofValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm text-blue-700">Percentage</span>
                        <span className="font-bold text-blue-700">{percentValue}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg border-2 border-blue-300">
                        <span className="text-sm text-blue-900 font-semibold">Result</span>
                        <span className="text-xl font-bold text-blue-900">{formatNumber(result)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'what-percent' && (
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span>📊</span>
                      <span>Breakdown</span>
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Part Value</span>
                        <span className="font-bold text-gray-900">{partValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Total Value</span>
                        <span className="font-bold text-gray-900">{totalValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300">
                        <span className="text-sm text-purple-900 font-semibold">Percentage</span>
                        <span className="text-xl font-bold text-purple-900">{formatNumber(result)}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {(mode === 'increase' || mode === 'decrease') && (
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span>📊</span>
                      <span>Breakdown</span>
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Original</span>
                        <span className="font-bold text-gray-900">{originalValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">New Value</span>
                        <span className="font-bold text-gray-900">{newValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Difference</span>
                        <span className={`font-bold ${
                          (parseFloat(newValue || '0') - parseFloat(originalValue || '0')) >= 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {(parseFloat(newValue || '0') - parseFloat(originalValue || '0')) >= 0 ? '+' : ''}
                          {formatNumber(parseFloat(newValue || '0') - parseFloat(originalValue || '0'))}
                        </span>
                      </div>
                      <div className={`flex justify-between items-center p-3 rounded-lg border-2 ${
                        result >= 0
                          ? 'bg-green-100 border-green-300' 
                          : 'bg-red-100 border-red-300'
                      }`}>
                        <span className={`text-sm font-semibold ${result >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                          Percentage {result >= 0 ? 'Increase' : 'Decrease'}
                        </span>
                        <span className={`text-xl font-bold ${result >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                          {result >= 0 ? '+' : ''}{formatNumber(result)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Formula */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span>💡</span>
                    <span>Formula</span>
                  </h3>
                  <div className="text-xs text-gray-700">
                    {mode === 'percent-of' && <p>Result = (Percentage ÷ 100) × Value</p>}
                    {mode === 'what-percent' && <p>Percentage = (Value ÷ Total) × 100</p>}
                    {(mode === 'increase' || mode === 'decrease') && <p>% Change = ((New - Original) ÷ Original) × 100</p>}
                  </div>
                </div>

              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">{config.icon}</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Calculate</div>
                  <div className="text-6xl font-extrabold mb-2">0%</div>
                  <p className="text-sm opacity-90">Enter values to see result</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">💡</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Tips</h3>
                    <div className="text-left space-y-2 text-sm text-gray-700">
                      <p>• 10% = Divide by 10</p>
                      <p>• 25% = Divide by 4</p>
                      <p>• 50% = Divide by 2</p>
                      <p>• 1% = Move decimal 2 left</p>
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