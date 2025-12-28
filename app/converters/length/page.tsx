'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type LengthUnit = {
  name: string
  symbol: string
  toMeters: number // Conversion factor to meters
}

const lengthUnits: Record<string, LengthUnit> = {
  millimeter: { name: 'Millimeter', symbol: 'mm', toMeters: 0.001 },
  centimeter: { name: 'Centimeter', symbol: 'cm', toMeters: 0.01 },
  meter: { name: 'Meter', symbol: 'm', toMeters: 1 },
  kilometer: { name: 'Kilometer', symbol: 'km', toMeters: 1000 },
  inch: { name: 'Inch', symbol: 'in', toMeters: 0.0254 },
  foot: { name: 'Foot', symbol: 'ft', toMeters: 0.3048 },
  yard: { name: 'Yard', symbol: 'yd', toMeters: 0.9144 },
  mile: { name: 'Mile', symbol: 'mi', toMeters: 1609.344 },
}

export default function LengthConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('foot')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('length', 3)

  // SEO schemas
  const structuredData = generateStructuredData('length')
  const faqSchema = generateFAQSchema([
    { question: 'How do you convert meters to feet?', answer: 'To convert meters to feet, multiply by 3.28084. For example: 1 meter = 3.28084 feet, 5 meters = 16.404 feet.' },
    { question: 'What is the difference between metric and imperial units?', answer: 'Metric units (meter, centimeter, kilometer) are based on powers of 10. Imperial units (inch, foot, yard, mile) use different conversion factors: 12 inches = 1 foot, 3 feet = 1 yard, 1760 yards = 1 mile.' },
    { question: 'How accurate are the conversions?', answer: 'Our converter uses precise conversion factors from international standards. Results are accurate to 6 decimal places for small numbers and scientific notation for very large values.' },
    { question: 'Which countries use which measurement system?', answer: 'Most countries use the metric system (meters). The United States primarily uses imperial units (feet, inches, miles). The UK uses a mix of both.' },
    { question: 'What are common length conversions?', answer: 'Popular conversions: 1 meter = 3.28 feet = 39.37 inches, 1 kilometer = 0.621 miles, 1 inch = 2.54 centimeters, 1 foot = 30.48 centimeters, 1 mile = 1.609 kilometers.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Converters', url: 'https://fluentools.com/#converters' },
    { name: 'Length Converter', url: 'https://fluentools.com/converters/length' }
  ])

  // Convert between units
  const convert = (value: number, from: string, to: string): number => {
    const fromFactor = lengthUnits[from].toMeters
    const toFactor = lengthUnits[to].toMeters
    return (value * fromFactor) / toFactor
  }

  // Get converted value
  const getConvertedValue = (): number | null => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0) return null
    return convert(value, fromUnit, toUnit)
  }

  // Get all conversions for quick results
  const getAllConversions = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0) return null

    return Object.entries(lengthUnits)
      .filter(([key]) => key !== fromUnit)
      .map(([key, unit]) => ({
        unit: key,
        name: unit.name,
        symbol: unit.symbol,
        value: convert(value, fromUnit, key)
      }))
      .sort((a, b) => {
        // Sort by common usage
        const order = ['meter', 'centimeter', 'kilometer', 'foot', 'inch', 'yard', 'mile', 'millimeter']
        return order.indexOf(a.unit) - order.indexOf(b.unit)
      })
  }

  // Swap units
  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  const convertedValue = getConvertedValue()
  const allConversions = getAllConversions()

  const formatNumber = (num: number) => {
    // Format based on magnitude
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

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Length Converter"
        description="Convert between different units of length including meters, feet, inches, centimeters, kilometers, miles, and more. Fast and accurate conversions."
        icon="📏"
        gradient="from-indigo-50 to-purple-50"
        breadcrumbs={[
          { label: 'Converters', href: '/#converters' },
          { label: 'Length Converter' }
        ]}
        features={[
          {
            icon: '📏',
            title: 'Multiple Units',
            description: 'Convert between 8 common length units instantly'
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
            icon: '📏',
            question: 'How do you convert meters to feet?',
            answer: 'To convert meters to feet, multiply by 3.28084. For example: 1 meter = 3.28084 feet, 5 meters = 16.404 feet. Our calculator does this automatically with high precision.'
          },
          {
            icon: '📐',
            question: 'What is the difference between metric and imperial units?',
            answer: 'Metric units (meter, centimeter, kilometer) are based on powers of 10, making conversions simple. Imperial units (inch, foot, yard, mile) use different conversion factors: 12 inches = 1 foot, 3 feet = 1 yard, 1760 yards = 1 mile.'
          },
          {
            icon: '🔢',
            question: 'How accurate are the conversions?',
            answer: 'Our converter uses precise conversion factors from international standards. Results are accurate to 6 decimal places for small numbers and scientific notation for very large values. Perfect for professional, academic, and everyday use.'
          },
          {
            icon: '🌍',
            question: 'Which countries use which measurement system?',
            answer: 'Most countries use the metric system (meters). The United States primarily uses imperial units (feet, inches, miles). The UK uses a mix of both. Our converter handles all systems seamlessly.'
          },
          {
            icon: '💡',
            question: 'What are common length conversions?',
            answer: 'Popular conversions: 1 meter = 3.28 feet = 39.37 inches, 1 kilometer = 0.621 miles, 1 inch = 2.54 centimeters, 1 foot = 30.48 centimeters, 1 mile = 1.609 kilometers. Use our quick results to see multiple conversions at once!'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Length Converter</h2>
            <p className="text-gray-700 mb-4">
              Our length converter makes it easy to convert between different units of measurement. Enter a value, select your starting unit (From), choose your target unit (To), and see instant results. The converter also shows conversions to all other units for quick reference.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Supported Length Units</h3>
            <p className="text-gray-700 mb-4">
              <strong>Metric System:</strong> Millimeter (mm), Centimeter (cm), Meter (m), Kilometer (km)<br/>
              <strong>Imperial System:</strong> Inch (in), Foot (ft), Yard (yd), Mile (mi)<br/>
              All units can be converted to and from each other with high precision.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Conversion Examples</h3>
            <p className="text-gray-700 mb-4">
              <strong>Meters to Feet:</strong> 1 m = 3.28084 ft (multiply by 3.28084)<br/>
              <strong>Feet to Meters:</strong> 1 ft = 0.3048 m (multiply by 0.3048)<br/>
              <strong>Inches to Centimeters:</strong> 1 in = 2.54 cm (multiply by 2.54)<br/>
              <strong>Kilometers to Miles:</strong> 1 km = 0.621371 mi (multiply by 0.621371)<br/>
              <strong>Miles to Kilometers:</strong> 1 mi = 1.60934 km (multiply by 1.60934)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Tips for Using the Converter</h3>
            <p className="text-gray-700">
              Use the swap button to quickly reverse your conversion direction. Check the "All Results" section to see your value in all available units at once. For very large or very small numbers, the calculator automatically uses scientific notation for clarity.
            </p>
          </div>
        }
      >
        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* LEFT: Converter Inputs */}
          <div className="space-y-6">
            
            {/* From */}
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
                  className="px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white"
                >
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl transition-all font-semibold flex items-center gap-2"
              >
                <span className="text-xl">🔄</span>
                <span>Swap Units</span>
              </button>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📥 To
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={convertedValue !== null ? formatNumber(convertedValue) : '0'}
                  readOnly
                  className="px-4 py-3 text-lg font-bold text-indigo-600 bg-indigo-50 border-2 border-indigo-300 rounded-xl outline-none"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white"
                >
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Example */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> 1 meter = 3.28 feet = 100 centimeters
              </p>
            </div>

            {/* Did You Know? */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                <span>💡</span>
                <span>Did You Know?</span>
              </h3>
              <div className="text-xs text-gray-700 space-y-0.5">
                <p>• The meter was defined as 1/10,000,000 of the distance from equator to North Pole</p>
                <p>• A mile comes from Roman "mille passus" meaning 1,000 paces</p>
                <p>• The foot was based on the length of a human foot</p>
                <p>• Light travels about 30 cm (1 foot) in one nanosecond</p>
              </div>
            </div>

          </div>

          {/* RIGHT: All Conversions */}
          <div className="space-y-4">
            
            {allConversions ? (
              <>
                {/* Result Display Card - Compact */}
                {convertedValue !== null && (
                  <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
                    <div className="text-xs font-semibold opacity-90 mb-1">Conversion Result</div>
                    <div className="text-3xl font-extrabold mb-1">
                      {fromValue} {lengthUnits[fromUnit].symbol} = {formatNumber(convertedValue)} {lengthUnits[toUnit].symbol}
                    </div>
                    <div className="text-xs opacity-90">
                      {lengthUnits[fromUnit].name} to {lengthUnits[toUnit].name}
                    </div>
                  </div>
                )}

                {/* Quick Results - Compact Grid */}
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
                            ? 'bg-indigo-100 border-2 border-indigo-300' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setToUnit(conv.unit)}
                      >
                        <span className="text-xs font-semibold text-gray-700">
                          {conv.symbol}
                        </span>
                        <span className={`font-bold text-xs ${
                          conv.unit === toUnit ? 'text-indigo-700' : 'text-gray-900'
                        }`}>
                          {formatNumber(conv.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Cards - 2 Columns Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Quick Reference */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-3">
                    <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                      <span>💡</span>
                      <span>Quick Reference</span>
                    </h3>
                    <div className="text-xs text-gray-700 space-y-0.5">
                      <p>• 1 m = 3.28 ft = 100 cm</p>
                      <p>• 1 km = 0.621 mi = 1,000 m</p>
                      <p>• 1 ft = 12 in = 30.48 cm</p>
                      <p>• 1 mi = 5,280 ft = 1.609 km</p>
                    </div>
                  </div>

                  {/* Current Units */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3">
                    <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                      <span>ℹ️</span>
                      <span>Current Units</span>
                    </h3>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span className="font-semibold">{lengthUnits[fromUnit].symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span className="font-semibold">{lengthUnits[toUnit].symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Factor:</span>
                        <span className="font-semibold">
                          ×{formatNumber(lengthUnits[fromUnit].toMeters / lengthUnits[toUnit].toMeters)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">📏</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Convert</div>
                  <div className="text-6xl font-extrabold mb-2">0</div>
                  <p className="text-sm opacity-90">Enter a value to see conversions</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🔢</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Available Units</h3>
                    <div className="text-left space-y-2 text-sm text-gray-700">
                      <p><strong>Metric:</strong> mm, cm, m, km</p>
                      <p><strong>Imperial:</strong> in, ft, yd, mi</p>
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