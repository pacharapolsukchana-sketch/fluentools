'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type UnitSystem = 'metric' | 'imperial'

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [weightKg, setWeightKg] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const relatedTools = getSmartRelatedTools('bmi', 3)

  const categories = [
    { name: 'Underweight', range: '< 18.5', color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700', advice: 'Consider gaining weight through healthy diet and exercise' },
    { name: 'Normal Weight', range: '18.5 - 24.9', color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-700', advice: 'Great! Maintain your healthy lifestyle' },
    { name: 'Overweight', range: '25 - 29.9', color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', advice: 'Consider losing weight through diet and exercise' },
    { name: 'Obese', range: '≥ 30', color: 'from-red-400 to-red-600', bgColor: 'bg-red-50', textColor: 'text-red-700', advice: 'Consult a healthcare professional for guidance' }
  ]

  const getBMI = (): number | null => {
    if (unitSystem === 'metric') {
      const weight = parseFloat(weightKg) || 0
      const height = parseFloat(heightCm) || 0
      if (weight === 0 || height === 0) return null
      return weight / ((height / 100) ** 2)
    } else {
      const weight = parseFloat(weightLbs) || 0
      const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
      if (weight === 0 || totalInches === 0) return null
      return (weight / (totalInches ** 2)) * 703
    }
  }

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return categories[0]
    if (bmi < 25) return categories[1]
    if (bmi < 30) return categories[2]
    return categories[3]
  }

  const getIdealWeightRange = () => {
    let heightM = 0
    if (unitSystem === 'metric') {
      const height = parseFloat(heightCm) || 0
      if (height === 0) return null
      heightM = height / 100
    } else {
      const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
      if (totalInches === 0) return null
      heightM = totalInches * 0.0254
    }
    const minWeight = 18.5 * heightM * heightM
    const maxWeight = 24.9 * heightM * heightM
    return unitSystem === 'imperial' ? { min: minWeight * 2.20462, max: maxWeight * 2.20462, unit: 'lbs' } : { min: minWeight, max: maxWeight, unit: 'kg' }
  }

  const bmi = getBMI()
  const category = bmi ? getCategory(bmi) : null
  const idealWeight = getIdealWeightRange()
  const hasInput = () => unitSystem === 'metric' ? weightKg && heightCm : weightLbs && heightFt
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(num)

  const structuredData = generateStructuredData('bmi')
  const faqSchema = generateFAQSchema([
    { question: 'What is BMI?', answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. Formula: weight (kg) ÷ height (m)².' },
    { question: 'What is a healthy BMI?', answer: 'A healthy BMI is 18.5-24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese.' },
    { question: 'How accurate is BMI?', answer: 'BMI is a general indicator. It does not account for muscle mass, bone density, or body composition.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Health', url: 'https://fluentools.com/#health' },
    { name: 'BMI Calculator', url: 'https://fluentools.com/health/bmi' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) using metric or imperial units. Get your BMI category, ideal weight range, and personalized health insights."
        icon="⚖️"
        gradient="from-green-50 to-emerald-50"
        breadcrumbs={[{ label: 'Health', href: '/#health' }, { label: 'BMI Calculator' }]}
        features={[
          { icon: '⚖️', title: 'Accurate BMI Calculation', description: 'Calculate BMI using WHO standards' },
          { icon: '🎯', title: 'Health Categories', description: 'Get classified into health categories' },
          { icon: '📊', title: 'Visual BMI Scale', description: 'See your BMI position on color scale' },
          { icon: '💪', title: 'Ideal Weight Range', description: 'Find your healthy weight range' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '💡', question: 'What is BMI and how is it calculated?', answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. For metric: BMI = weight(kg) ÷ height(m)². For imperial: BMI = (weight(lbs) ÷ height(in)²) × 703.' },
          { icon: '📊', question: 'What is a healthy BMI range?', answer: 'According to WHO standards: Underweight < 18.5, Normal 18.5-24.9, Overweight 25-29.9, Obese ≥ 30. A BMI between 18.5 and 24.9 is considered healthy for most adults.' },
          { icon: '⚖️', question: 'Is BMI accurate for everyone?', answer: 'BMI has limitations. It doesn\'t distinguish between muscle and fat, so athletes may have high BMI despite low body fat. Consider body composition and other health factors.' },
          { icon: '🎯', question: 'How can I improve my BMI?', answer: 'For high BMI: Create a calorie deficit through balanced diet and regular exercise. For low BMI: Increase calorie intake with nutrient-dense foods and strength training.' },
          { icon: '📈', question: 'What is the difference between BMI and body fat percentage?', answer: 'BMI measures weight relative to height, while body fat percentage measures actual fat tissue. Body fat % is more accurate but harder to measure.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700 mb-4">Choose units, enter weight and height, get instant results.</p></div>}>
        
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Input Card */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 md:p-8">
            
            {/* Unit Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">📏 Unit System</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setUnitSystem('metric')} className={`p-4 rounded-xl font-bold transition-all ${unitSystem === 'metric' ? 'bg-green-500 text-white shadow-lg scale-105' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                  <div className="text-3xl mb-1">📊</div><div>Metric</div><div className="text-xs opacity-75 mt-1">kg, cm</div>
                </button>
                <button onClick={() => setUnitSystem('imperial')} className={`p-4 rounded-xl font-bold transition-all ${unitSystem === 'imperial' ? 'bg-blue-500 text-white shadow-lg scale-105' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                  <div className="text-3xl mb-1">🇺🇸</div><div>Imperial</div><div className="text-xs opacity-75 mt-1">lbs, ft, in</div>
                </button>
              </div>
            </div>

            {/* Inputs */}
            {unitSystem === 'metric' ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">⚖️ Weight</label>
                  <div className="relative">
                    <input type="number" value={weightKg} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => setWeightKg(e.target.value)} placeholder="30" className="w-full px-4 pr-20 py-3 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all shadow-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-gray-400 font-medium">kg</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">📏 Height</label>
                  <div className="relative">
                    <input type="number" value={heightCm} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => setHeightCm(e.target.value)} placeholder="70" className="w-full px-4 pr-20 py-3 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all shadow-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-gray-400 font-medium">cm</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">⚖️ Weight</label>
                  <div className="relative">
                    <input type="number" value={weightLbs} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => setWeightLbs(e.target.value)} placeholder="180" className="w-full px-4 pr-20 py-3 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-gray-400 font-medium">lbs</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">📏 Height</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input type="number" value={heightFt} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => setHeightFt(e.target.value)} placeholder="154" className="w-full px-4 pr-20 py-3 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-gray-400 font-medium">ft</span>
                    </div>
                    <div className="relative flex-1">
                      <input type="number" value={heightIn} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => setHeightIn(e.target.value)} placeholder="5" className="w-full px-4 pr-20 py-3 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-gray-400 font-medium">in</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Result */}
            {hasInput() && bmi && category ? (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <div className="text-center text-white">
                  <div className="text-sm font-semibold opacity-90 mb-2">Your BMI</div>
                  <div className="text-7xl font-black mb-3">{formatNumber(bmi)}</div>
                  <div className="text-2xl font-bold opacity-95 mb-1">{category.name}</div>
                  <div className="text-lg opacity-90">{category.range}</div>
                </div>
              </div>
            ) : (
              <div className="mt-8 p-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg text-center text-white">
                <div className="text-6xl mb-3">⚖️</div>
                <div className="text-xl font-bold mb-2">Ready to Calculate</div>
                <p className="text-sm opacity-90">Enter weight and height above</p>
              </div>
            )}

          </div>

          {/* Details */}
          {hasInput() && bmi && category && idealWeight && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Health Advice */}
                <div className={`${category.bgColor} border-2 ${category.textColor.replace('text-', 'border-')} rounded-2xl p-6`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span>💪</span><span>Health Advice</span></h3>
                  <p className={`text-base ${category.textColor} font-medium`}>{category.advice}</p>
                </div>

                {/* Ideal Weight */}
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><span>🎯</span><span>Ideal Weight Range</span></h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-semibold">Your Height</span>
                      <span className="font-black text-lg text-gray-900">{unitSystem === 'metric' ? `${heightCm} cm` : `${heightFt}'${heightIn}"`}</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-green-700 font-semibold">Min (BMI 18.5)</span>
                      <span className="font-black text-lg text-green-700">{formatNumber(idealWeight.min)} {idealWeight.unit}</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-green-700 font-semibold">Max (BMI 24.9)</span>
                      <span className="font-black text-lg text-green-700">{formatNumber(idealWeight.max)} {idealWeight.unit}</span>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-white font-bold">Healthy Range</span>
                      <span className="font-black text-xl text-white">{formatNumber(idealWeight.min)}-{formatNumber(idealWeight.max)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span>💡</span><span>Quick Tips</span></h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2"><span className="text-green-600 mt-0.5 font-bold">✓</span><span>BMI is a screening tool, not diagnostic</span></div>
                  <div className="flex items-start gap-2"><span className="text-green-600 mt-0.5 font-bold">✓</span><span>Combine with body fat % for accuracy</span></div>
                  <div className="flex items-start gap-2"><span className="text-green-600 mt-0.5 font-bold">✓</span><span>Consult doctor for health assessment</span></div>
                  <div className="flex items-start gap-2"><span className="text-green-600 mt-0.5 font-bold">✓</span><span>Focus on overall health, not just BMI</span></div>
                </div>
              </div>
            </>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}