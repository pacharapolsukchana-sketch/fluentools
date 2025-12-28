'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin'

export default function TemperatureConverter() {
  const [fromValue, setFromValue] = useState('')
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius')
  const [toUnit, setToUnit] = useState<TemperatureUnit>('fahrenheit')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('temperature', 3)

  // SEO schemas
  const structuredData = generateStructuredData('temperature')
  const faqSchema = generateFAQSchema([
    { question: 'How do you convert Celsius to Fahrenheit?', answer: 'To convert Celsius to Fahrenheit: multiply by 9/5 (or 1.8), then add 32. Formula: °F = (°C × 9/5) + 32. Example: 25°C = (25 × 1.8) + 32 = 77°F.' },
    { question: 'What is the difference between temperature scales?', answer: 'Celsius (°C) uses water freezing (0°) and boiling (100°) as reference points. Fahrenheit (°F) uses 32° for freezing and 212° for boiling. Kelvin (K) is absolute temperature starting at absolute zero (-273.15°C).' },
    { question: 'How accurate are temperature conversions?', answer: 'Our converter uses precise mathematical formulas and displays results to 2 decimal places. This accuracy is suitable for weather, cooking, science, and all everyday temperature conversions.' },
    { question: 'Which countries use which temperature scale?', answer: 'Most countries use Celsius (metric system). The United States, Bahamas, Cayman Islands, and Palau primarily use Fahrenheit. Kelvin is used universally in scientific contexts.' },
    { question: 'What are common temperature reference points?', answer: 'Water freezes: 0°C = 32°F = 273.15K. Water boils: 100°C = 212°F = 373.15K. Room temperature: ~20°C = 68°F = 293K. Body temperature: 37°C = 98.6°F = 310K.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Converters', url: 'https://fluentools.com/#converters' },
    { name: 'Temperature Converter', url: 'https://fluentools.com/converters/temperature' }
  ])

  // Convert temperature
  const convert = (value: number, from: TemperatureUnit, to: TemperatureUnit): number => {
    if (from === to) return value

    let celsius: number

    // Convert to Celsius first
    if (from === 'celsius') {
      celsius = value
    } else if (from === 'fahrenheit') {
      celsius = (value - 32) * 5 / 9
    } else { // kelvin
      celsius = value - 273.15
    }

    // Convert from Celsius to target
    if (to === 'celsius') {
      return celsius
    } else if (to === 'fahrenheit') {
      return (celsius * 9 / 5) + 32
    } else { // kelvin
      return celsius + 273.15
    }
  }

  // Get converted value
  const getConvertedValue = (): number | null => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) return null
    return convert(value, fromUnit, toUnit)
  }

  // Get all conversions
  const getAllConversions = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) return null

    const units: TemperatureUnit[] = ['celsius', 'fahrenheit', 'kelvin']
    
    return units
      .filter(unit => unit !== fromUnit)
      .map(unit => ({
        unit,
        value: convert(value, fromUnit, unit)
      }))
  }

  // Swap units
  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  // Get unit info
  const getUnitInfo = (unit: TemperatureUnit) => {
    const info = {
      celsius: { name: 'Celsius', symbol: '°C', color: 'blue' },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F', color: 'orange' },
      kelvin: { name: 'Kelvin', symbol: 'K', color: 'purple' }
    }
    return info[unit]
  }

  // Get formula
  const getFormula = () => {
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      return '°F = (°C × 9/5) + 32'
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      return '°C = (°F - 32) × 5/9'
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      return 'K = °C + 273.15'
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      return '°C = K - 273.15'
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      return 'K = (°F - 32) × 5/9 + 273.15'
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      return '°F = (K - 273.15) × 9/5 + 32'
    }
    return ''
  }

  const convertedValue = getConvertedValue()
  const allConversions = getAllConversions()

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Temperature Converter"
        description="Convert between Celsius, Fahrenheit, and Kelvin. Fast and accurate temperature conversion with formulas and examples."
        icon="🌡️"
        gradient="from-red-50 to-orange-50"
        breadcrumbs={[
          { label: 'Converters', href: '/#converters' },
          { label: 'Temperature Converter' }
        ]}
        features={[
          {
            icon: '🌡️',
            title: '3 Temperature Scales',
            description: 'Convert between Celsius, Fahrenheit, and Kelvin instantly'
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
            title: 'Formula Display',
            description: 'See the conversion formula for each temperature pair'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '🌡️',
            question: 'How do you convert Celsius to Fahrenheit?',
            answer: 'To convert Celsius to Fahrenheit: multiply by 9/5 (or 1.8), then add 32. Formula: °F = (°C × 9/5) + 32. Example: 25°C = (25 × 1.8) + 32 = 77°F.'
          },
          {
            icon: '📐',
            question: 'What is the difference between temperature scales?',
            answer: 'Celsius (°C) uses water freezing (0°) and boiling (100°) as reference points. Fahrenheit (°F) uses 32° for freezing and 212° for boiling. Kelvin (K) is absolute temperature starting at absolute zero (-273.15°C), used in science.'
          },
          {
            icon: '🔢',
            question: 'How accurate are temperature conversions?',
            answer: 'Our converter uses precise mathematical formulas and displays results to 2 decimal places. This accuracy is suitable for weather, cooking, science, and all everyday temperature conversions.'
          },
          {
            icon: '🌍',
            question: 'Which countries use which temperature scale?',
            answer: 'Most countries use Celsius (metric system). The United States, Bahamas, Cayman Islands, and Palau primarily use Fahrenheit. Kelvin is used universally in scientific contexts, especially physics and chemistry.'
          },
          {
            icon: '💡',
            question: 'What are common temperature reference points?',
            answer: 'Water freezes: 0°C = 32°F = 273.15K. Water boils: 100°C = 212°F = 373.15K. Room temperature: ~20°C = 68°F = 293K. Body temperature: 37°C = 98.6°F = 310K. Absolute zero: -273.15°C = -459.67°F = 0K.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Temperature Converter</h2>
            <p className="text-gray-700 mb-4">
              Our temperature converter makes it easy to convert between Celsius, Fahrenheit, and Kelvin. Enter a temperature value, select your starting unit (From), choose your target unit (To), and see instant results with the conversion formula.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Temperature Scales Explained</h3>
            <p className="text-gray-700 mb-4">
              <strong>Celsius (°C):</strong> Metric scale where water freezes at 0° and boils at 100°<br/>
              <strong>Fahrenheit (°F):</strong> Imperial scale where water freezes at 32° and boils at 212°<br/>
              <strong>Kelvin (K):</strong> Absolute scale starting at absolute zero, used in science<br/>
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Conversion Formulas</h3>
            <p className="text-gray-700 mb-4">
              <strong>Celsius to Fahrenheit:</strong> °F = (°C × 9/5) + 32<br/>
              <strong>Fahrenheit to Celsius:</strong> °C = (°F - 32) × 5/9<br/>
              <strong>Celsius to Kelvin:</strong> K = °C + 273.15<br/>
              <strong>Kelvin to Celsius:</strong> °C = K - 273.15<br/>
              <strong>Fahrenheit to Kelvin:</strong> K = (°F - 32) × 5/9 + 273.15<br/>
              <strong>Kelvin to Fahrenheit:</strong> °F = (K - 273.15) × 9/5 + 32
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Temperature Conversions</h3>
            <p className="text-gray-700">
              0°C = 32°F = 273.15K (water freezing), 25°C = 77°F = 298.15K (room temperature), 37°C = 98.6°F = 310.15K (body temperature), 100°C = 212°F = 373.15K (water boiling)
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
                  placeholder="25"
                  className="px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as TemperatureUnit)}
                  className="px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition bg-white"
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                  <option value="kelvin">Kelvin (K)</option>
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-all font-semibold flex items-center gap-2"
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
                  className="px-4 py-3 text-lg font-bold text-red-600 bg-red-50 border-2 border-red-300 rounded-xl outline-none"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value as TemperatureUnit)}
                  className="px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition bg-white"
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                  <option value="kelvin">Kelvin (K)</option>
                </select>
              </div>
            </div>

            {/* Formula */}
            {getFormula() && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Formula:</strong> {getFormula()}
                </p>
              </div>
            )}

            {/* Example */}
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> 25°C = 77°F = 298.15K
              </p>
            </div>

            {/* Did You Know? */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                <span>💡</span>
                <span>Did You Know?</span>
              </h3>
              <div className="text-xs text-gray-700 space-y-0.5">
                <p>• Absolute zero (-273.15°C) is the coldest possible temperature</p>
                <p>• The hottest temperature ever recorded on Earth was 56.7°C (134°F)</p>
                <p>• Fahrenheit chose 0° as the coldest he could make in his lab</p>
                <p>• The sun's core temperature is about 15 million °C!</p>
              </div>
            </div>

          </div>

          {/* RIGHT: All Conversions */}
          <div className="space-y-4">
            
            {allConversions && fromValue ? (
              <>
                {/* Result Display Card - Compact */}
                {convertedValue !== null && (
                  <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
                    <div className="text-xs font-semibold opacity-90 mb-1">Conversion Result</div>
                    <div className="text-3xl font-extrabold mb-1">
                      {fromValue}{getUnitInfo(fromUnit).symbol} = {formatNumber(convertedValue)}{getUnitInfo(toUnit).symbol}
                    </div>
                    <div className="text-xs opacity-90">
                      {getUnitInfo(fromUnit).name} to {getUnitInfo(toUnit).name}
                    </div>
                  </div>
                )}

                {/* Quick Results - All 3 Units */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>All Conversions</span>
                  </h3>
                  
                  <div className="space-y-2">
                    {allConversions.map((conv) => (
                      <div 
                        key={conv.unit}
                        className={`flex justify-between items-center p-3 rounded-lg transition-all cursor-pointer ${
                          conv.unit === toUnit 
                            ? 'bg-red-100 border-2 border-red-300' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setToUnit(conv.unit)}
                      >
                        <span className="text-base font-semibold text-gray-700">
                          {getUnitInfo(conv.unit).name}
                        </span>
                        <span className={`font-bold text-xl ${
                          conv.unit === toUnit ? 'text-red-700' : 'text-gray-900'
                        }`}>
                          {formatNumber(conv.value)}{getUnitInfo(conv.unit).symbol}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Cards - 2 Columns Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Reference Points */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3">
                    <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                      <span>💡</span>
                      <span>Reference Points</span>
                    </h3>
                    <div className="text-xs text-gray-700 space-y-0.5">
                      <p>• Water Freezes: 0°C = 32°F = 273K</p>
                      <p>• Room Temp: 20°C = 68°F = 293K</p>
                      <p>• Body Temp: 37°C = 98.6°F = 310K</p>
                      <p>• Water Boils: 100°C = 212°F = 373K</p>
                    </div>
                  </div>

                  {/* Current Conversion Info */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-3">
                    <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                      <span>ℹ️</span>
                      <span>Current Conversion</span>
                    </h3>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span className="font-semibold">{getUnitInfo(fromUnit).symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span className="font-semibold">{getUnitInfo(toUnit).symbol}</span>
                      </div>
                      {getFormula() && (
                        <div className="pt-1 border-t border-orange-200 mt-1">
                          <span className="font-semibold text-xs">{getFormula()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">🌡️</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Convert</div>
                  <div className="text-6xl font-extrabold mb-2">0°</div>
                  <p className="text-sm opacity-90">Enter a temperature to see conversions</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🔢</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Temperature Scales</h3>
                    <div className="text-left space-y-2 text-sm text-gray-700">
                      <p><strong>Celsius (°C):</strong> Metric standard</p>
                      <p><strong>Fahrenheit (°F):</strong> US standard</p>
                      <p><strong>Kelvin (K):</strong> Scientific standard</p>
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