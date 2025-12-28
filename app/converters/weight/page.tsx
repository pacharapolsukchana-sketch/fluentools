'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type WeightUnit = {
  name: string
  symbol: string
  toKilograms: number
}

const weightUnits: Record<string, WeightUnit> = {
  milligram: { name: 'Milligram', symbol: 'mg', toKilograms: 0.000001 },
  gram: { name: 'Gram', symbol: 'g', toKilograms: 0.001 },
  kilogram: { name: 'Kilogram', symbol: 'kg', toKilograms: 1 },
  metricTon: { name: 'Metric Ton', symbol: 't', toKilograms: 1000 },
  ounce: { name: 'Ounce', symbol: 'oz', toKilograms: 0.0283495 },
  pound: { name: 'Pound', symbol: 'lbs', toKilograms: 0.453592 },
  stone: { name: 'Stone', symbol: 'st', toKilograms: 6.35029 },
  usTon: { name: 'US Ton', symbol: 'ton', toKilograms: 907.185 },
}

export default function WeightConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('kilogram')
  const [toUnit, setToUnit] = useState('pound')

  const relatedTools = getSmartRelatedTools('weight', 3)

  const convert = (value: number, from: string, to: string): number => {
    const fromFactor = weightUnits[from].toKilograms
    const toFactor = weightUnits[to].toKilograms
    return (value * fromFactor) / toFactor
  }

  const getConvertedValue = (): number | null => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0) return null
    return convert(value, fromUnit, toUnit)
  }

  const getAllConversions = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0) return null

    return Object.entries(weightUnits)
      .filter(([key]) => key !== fromUnit)
      .map(([key, unit]) => ({
        unit: key,
        name: unit.name,
        symbol: unit.symbol,
        value: convert(value, fromUnit, key)
      }))
      .sort((a, b) => {
        const order = ['kilogram', 'gram', 'pound', 'ounce', 'metricTon', 'stone', 'usTon', 'milligram']
        return order.indexOf(a.unit) - order.indexOf(b.unit)
      })
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  const convertedValue = getConvertedValue()
  const allConversions = getAllConversions()

  const formatNumber = (num: number) => {
    if (Math.abs(num) >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        notation: 'scientific'
      }).format(num)
    } else if (Math.abs(num) >= 1) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
      }).format(num)
    } else {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
      }).format(num)
    }
  }

  // SEO Schemas
  const structuredData = generateStructuredData('weight')
  const faqSchema = generateFAQSchema([
    {
      question: 'How do you convert kilograms to pounds?',
      answer: 'To convert kilograms to pounds, multiply by 2.20462. For example: 1 kg = 2.20462 lbs, 5 kg = 11.023 lbs. Our calculator does this automatically with high precision.'
    },
    {
      question: 'What is the difference between weight and mass?',
      answer: 'Mass is the amount of matter in an object (measured in kg, g), while weight is the force of gravity on that mass (measured in Newtons). In everyday use, we often use "weight" to mean mass. Our converter handles both metric (kg, g) and imperial (lbs, oz) units.'
    },
    {
      question: 'How accurate are weight conversions?',
      answer: 'Our converter uses precise conversion factors from international standards. Results are accurate to 6 decimal places for small numbers and scientific notation for very large values. Perfect for cooking, shipping, fitness, and professional use.'
    },
    {
      question: 'Which countries use which weight system?',
      answer: 'Most countries use the metric system (kilograms, grams). The United States primarily uses imperial units (pounds, ounces). The UK uses a mix, including stones for body weight. Our converter handles all systems seamlessly.'
    },
    {
      question: 'What are common weight conversions?',
      answer: 'Popular conversions: 1 kg = 2.205 lbs = 35.27 oz, 1 lb = 0.454 kg = 16 oz, 1 stone = 14 lbs = 6.35 kg, 1 metric ton = 1000 kg = 2204.6 lbs. Use our quick results to see multiple conversions at once!'
    }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Converters', url: 'https://fluentools.com/#converters' },
    { name: 'Weight Converter', url: 'https://fluentools.com/converters/weight' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Weight Converter"
        description="Convert between different units of weight and mass including kilograms, pounds, ounces, grams, and more. Fast and accurate conversions."
        icon="⚖️"
        gradient="from-purple-50 to-pink-50"
        breadcrumbs={[
          { label: 'Converters', href: '/#converters' },
          { label: 'Weight Converter' }
        ]}
        features={[
          {
            icon: '⚖️',
            title: 'Multiple Units',
            description: 'Convert between 8 common weight and mass units instantly'
          },
          {
            icon: '⚡',
            title: 'Real-time Conversion',
            description: 'See results as you type with automatic calculation'
          },
          {
            icon: '🔄',
            title: 'Quick Swap',
            description: 'Easily swap between From and To units with one click'
          },
          {
            icon: '📊',
            title: 'All Results',
            description: 'See conversions to all units at once for quick reference'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '⚖️',
            question: 'How do you convert kilograms to pounds?',
            answer: 'To convert kilograms to pounds, multiply by 2.20462. For example: 1 kg = 2.20462 lbs, 5 kg = 11.023 lbs. Our calculator does this automatically with high precision.'
          },
          {
            icon: '📐',
            question: 'What is the difference between weight and mass?',
            answer: 'Mass is the amount of matter in an object (measured in kg, g), while weight is the force of gravity on that mass (measured in Newtons). In everyday use, we often use "weight" to mean mass. Our converter handles both metric (kg, g) and imperial (lbs, oz) units.'
          },
          {
            icon: '🔢',
            question: 'How accurate are weight conversions?',
            answer: 'Our converter uses precise conversion factors from international standards. Results are accurate to 6 decimal places for small numbers and scientific notation for very large values. Perfect for cooking, shipping, fitness, and professional use.'
          },
          {
            icon: '🌍',
            question: 'Which countries use which weight system?',
            answer: 'Most countries use the metric system (kilograms, grams). The United States primarily uses imperial units (pounds, ounces). The UK uses a mix, including stones for body weight. Our converter handles all systems seamlessly.'
          },
          {
            icon: '💡',
            question: 'What are common weight conversions?',
            answer: 'Popular conversions: 1 kg = 2.205 lbs = 35.27 oz, 1 lb = 0.454 kg = 16 oz, 1 stone = 14 lbs = 6.35 kg, 1 metric ton = 1000 kg = 2204.6 lbs. Use our quick results to see multiple conversions at once!'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Weight Converter</h2>
            <p className="text-gray-700 mb-4">
              Our weight converter makes it easy to convert between different units of mass and weight. Enter a value, select your starting unit (From), choose your target unit (To), and see instant results. The converter also shows conversions to all other units for quick reference.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Supported Weight Units</h3>
            <p className="text-gray-700 mb-4">
              <strong>Metric System:</strong> Milligram (mg), Gram (g), Kilogram (kg), Metric Ton (t)<br/>
              <strong>Imperial System:</strong> Ounce (oz), Pound (lbs), Stone (st), US Ton (ton)<br/>
              All units can be converted to and from each other with high precision.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Conversion Examples</h3>
            <p className="text-gray-700 mb-4">
              <strong>Kilograms to Pounds:</strong> 1 kg = 2.20462 lbs (multiply by 2.20462)<br/>
              <strong>Pounds to Kilograms:</strong> 1 lb = 0.453592 kg (multiply by 0.453592)<br/>
              <strong>Ounces to Grams:</strong> 1 oz = 28.3495 g (multiply by 28.3495)<br/>
              <strong>Grams to Ounces:</strong> 1 g = 0.035274 oz (multiply by 0.035274)<br/>
              <strong>Stone to Kilograms:</strong> 1 st = 6.35029 kg (multiply by 6.35029)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Tips for Using the Converter</h3>
            <p className="text-gray-700">
              Use the swap button to quickly reverse your conversion direction. Check the "All Results" section to see your value in all available units at once. Perfect for cooking, fitness tracking, shipping calculations, and international trade.
            </p>
          </div>
        }
      >
        <div className="grid lg:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📤 From
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="1"
                  className="px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-white"
                >
                  {Object.entries(weightUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-all font-semibold flex items-center gap-2"
              >
                <span className="text-xl">🔄</span>
                <span>Swap Units</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📥 To
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={convertedValue !== null ? formatNumber(convertedValue) : '0'}
                  readOnly
                  className="px-4 py-3 text-lg font-bold text-purple-600 bg-purple-50 border-2 border-purple-300 rounded-xl outline-none"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-white"
                >
                  {Object.entries(weightUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> 1 kilogram = 2.205 pounds = 35.27 ounces
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                <span>💡</span>
                <span>Did You Know?</span>
              </h3>
              <div className="text-xs text-gray-700 space-y-0.5">
                <p>• The kilogram is the only SI unit still defined by a physical object</p>
                <p>• A pound originally referred to a pound of silver</p>
                <p>• The carat used for gemstones equals 200 milligrams</p>
                <p>• Your weight would be ~6× less on the Moon!</p>
              </div>
            </div>

          </div>

          <div className="space-y-4">
            
            {allConversions ? (
              <>
                {convertedValue !== null && (
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-4 text-white shadow-lg">
                    <div className="text-xs font-semibold opacity-90 mb-1">Conversion Result</div>
                    <div className="text-3xl font-extrabold mb-1">
                      {fromValue} {weightUnits[fromUnit].symbol} = {formatNumber(convertedValue)} {weightUnits[toUnit].symbol}
                    </div>
                    <div className="text-xs opacity-90">
                      {weightUnits[fromUnit].name} to {weightUnits[toUnit].name}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>All Conversions</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {allConversions.map((conv) => (
                      <div 
                        key={conv.unit}
                        className={`flex justify-between items-center p-2 rounded-lg transition-all cursor-pointer ${
                          conv.unit === toUnit 
                            ? 'bg-purple-100 border-2 border-purple-300' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setToUnit(conv.unit)}
                      >
                        <span className="text-xs font-semibold text-gray-700">
                          {conv.symbol}
                        </span>
                        <span className={`font-bold text-xs ${
                          conv.unit === toUnit ? 'text-purple-700' : 'text-gray-900'
                        }`}>
                          {formatNumber(conv.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-3">
                    <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                      <span>💡</span>
                      <span>Quick Reference</span>
                    </h3>
                    <div className="text-xs text-gray-700 space-y-0.5">
                      <p>• 1 kg = 2.205 lbs = 1,000 g</p>
                      <p>• 1 lb = 0.454 kg = 16 oz</p>
                      <p>• 1 st = 14 lbs = 6.35 kg</p>
                      <p>• 1 t = 1,000 kg = 2,204.6 lbs</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3">
                    <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                      <span>ℹ️</span>
                      <span>Current Units</span>
                    </h3>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span className="font-semibold">{weightUnits[fromUnit].symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span className="font-semibold">{weightUnits[toUnit].symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Factor:</span>
                        <span className="font-semibold">
                          ×{formatNumber(weightUnits[fromUnit].toKilograms / weightUnits[toUnit].toKilograms)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">⚖️</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Convert</div>
                  <div className="text-6xl font-extrabold mb-2">0</div>
                  <p className="text-sm opacity-90">Enter a value to see conversions</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🔢</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Available Units</h3>
                    <div className="text-left space-y-2 text-sm text-gray-700">
                      <p><strong>Metric:</strong> mg, g, kg, t</p>
                      <p><strong>Imperial:</strong> oz, lbs, st, ton</p>
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