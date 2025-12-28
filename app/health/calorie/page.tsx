'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type Gender = 'male' | 'female'
type UnitSystem = 'metric' | 'imperial'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme'
type Goal = 'lose' | 'maintain' | 'gain'

export default function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>('male')
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<Goal>('maintain')
  
  // Metric
  const [age, setAge] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [heightCm, setHeightCm] = useState('')
  
  // Imperial
  const [weightLbs, setWeightLbs] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  
  const [results, setResults] = useState<{
    bmr: number
    tdee: number
    goalCalories: number
    macros: { protein: number; carbs: number; fat: number }
  } | null>(null)
  
  const relatedTools = getSmartRelatedTools('calorie', 3)

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extreme: 1.9
  }

  const activityLabels = {
    sedentary: 'Sedentary - Little/no exercise',
    light: 'Lightly Active - 1-3 days/week',
    moderate: 'Moderately Active - 3-5 days/week',
    very: 'Very Active - 6-7 days/week',
    extreme: 'Extremely Active - Athlete'
  }

  // Auto-calculate when inputs change
  useEffect(() => {
    calculate()
  }, [gender, unitSystem, activityLevel, goal, age, weightKg, heightCm, weightLbs, heightFt, heightIn])

  const calculate = () => {
    let weight = 0, height = 0
    const ageNum = parseFloat(age) || 0

    if (unitSystem === 'metric') {
      weight = parseFloat(weightKg) || 0
      height = parseFloat(heightCm) || 0
    } else {
      weight = (parseFloat(weightLbs) || 0) * 0.453592
      height = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54
    }

    if (weight === 0 || height === 0 || ageNum === 0) {
      setResults(null)
      return
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * ageNum)
    bmr = gender === 'male' ? bmr + 5 : bmr - 161

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[activityLevel]

    // Calculate goal calories
    let goalCalories = tdee
    if (goal === 'lose') goalCalories = tdee - 500
    else if (goal === 'gain') goalCalories = tdee + 500

    // Calculate macros
    const macros = {
      protein: Math.round((goalCalories * 0.30) / 4),
      carbs: Math.round((goalCalories * 0.40) / 4),
      fat: Math.round((goalCalories * 0.30) / 9)
    }

    setResults({ bmr, tdee, goalCalories, macros })
  }

  const formatNumber = (num: number) => Math.round(num).toLocaleString()

  const structuredData = generateStructuredData('calorie')
  const faqSchema = generateFAQSchema([
    { question: 'What is TDEE?', answer: 'TDEE (Total Daily Energy Expenditure) is the total calories you burn per day including activity.' },
    { question: 'How many calories to lose weight?', answer: 'Create a 500 calorie daily deficit to lose 1 pound per week.' },
    { question: 'How accurate is this calculator?', answer: 'Uses the Mifflin-St Jeor equation - the most accurate BMR formula. Individual needs vary by 10-15%.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Health', url: 'https://fluentools.com/#health' },
    { name: 'Calorie', url: 'https://fluentools.com/health/calorie' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Calorie Calculator"
        description="Calculate your TDEE, BMR, and daily calorie needs for weight loss, maintenance, or muscle gain."
        icon="🔥"
        gradient="from-orange-50 to-red-50"
        breadcrumbs={[{ label: 'Health', href: '/#health' }, { label: 'Calorie' }]}
        features={[
          { icon: '🔥', title: 'TDEE & BMR', description: 'Calculate total daily energy' },
          { icon: '🎯', title: 'Goal-Based', description: 'Lose, maintain, or gain weight' },
          { icon: '🍽️', title: 'Macros', description: 'Protein, carbs, fat breakdown' },
          { icon: '📊', title: 'Accurate', description: 'Mifflin-St Jeor equation' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🔥', question: 'What is TDEE and BMR?', answer: 'BMR is calories burned at rest. TDEE is BMR multiplied by activity level - your total daily calorie burn.' },
          { icon: '⚖️', question: 'How many calories to lose weight?', answer: 'Create a 500 calorie daily deficit (TDEE - 500) for 1 pound per week loss.' },
          { icon: '💪', question: 'How many calories to gain muscle?', answer: 'Eat 300-500 calories above TDEE with adequate protein (1g per lb bodyweight).' },
          { icon: '📊', question: 'How accurate is this calculator?', answer: 'Uses Mifflin-St Jeor equation - most accurate for BMR. Individual metabolism varies ±10-15%.' },
          { icon: '🍽️', question: 'What about macronutrients?', answer: 'We suggest 30% protein, 40% carbs, 30% fat - a balanced approach for most goals.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700">Enter your details to calculate daily calorie needs.</p></div>}>
        
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Input Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            
            {/* Gender & Units */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">👤 Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-2.5 rounded-lg font-bold text-sm transition ${
                      gender === 'male' ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    👨 Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-2.5 rounded-lg font-bold text-sm transition ${
                      gender === 'female' ? 'bg-pink-500 text-white shadow-lg' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                    }`}
                  >
                    👩 Female
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📏 Units</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`py-2.5 rounded-lg font-bold text-sm transition ${
                      unitSystem === 'metric' ? 'bg-green-500 text-white shadow-lg' : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`py-2.5 rounded-lg font-bold text-sm transition ${
                      unitSystem === 'imperial' ? 'bg-purple-500 text-white shadow-lg' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    Imperial
                  </button>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">🎂 Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="30"
                className="w-full px-4 py-2.5 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Weight & Height - Metric */}
            {unitSystem === 'metric' ? (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">⚖️ Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="70"
                    className="w-full px-4 py-2.5 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📏 Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="175"
                    className="w-full px-4 py-2.5 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            ) : (
              // Weight & Height - Imperial
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">⚖️ Weight (lbs)</label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="154"
                    className="w-full px-4 py-2.5 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">📏 Height (ft)</label>
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="5"
                      className="w-full px-4 py-2.5 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Height (in)</label>
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="9"
                      className="w-full px-4 py-2.5 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Activity Level */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">💪 Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none"
              >
                {Object.entries(activityLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div className="mb-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">🎯 Your Goal</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setGoal('lose')}
                  className={`py-2.5 rounded-lg font-bold text-sm transition ${
                    goal === 'lose' ? 'bg-red-500 text-white shadow-lg' : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  📉 Lose
                </button>
                <button
                  onClick={() => setGoal('maintain')}
                  className={`py-2.5 rounded-lg font-bold text-sm transition ${
                    goal === 'maintain' ? 'bg-green-500 text-white shadow-lg' : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  ⚖️ Maintain
                </button>
                <button
                  onClick={() => setGoal('gain')}
                  className={`py-2.5 rounded-lg font-bold text-sm transition ${
                    goal === 'gain' ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  📈 Gain
                </button>
              </div>
            </div>

            <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              ✨ Results update automatically
            </p>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* Main Goal Card */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="text-center">
                  <div className="text-sm font-medium opacity-90 mb-2">
                    Your Daily Calories
                    {goal === 'lose' && ' (Weight Loss)'}
                    {goal === 'maintain' && ' (Maintenance)'}
                    {goal === 'gain' && ' (Weight Gain)'}
                  </div>
                  <div className="text-6xl font-black mb-2">
                    {formatNumber(results.goalCalories)}
                  </div>
                  <div className="text-lg font-semibold opacity-95">
                    calories per day
                  </div>
                </div>
              </div>

              {/* BMR & TDEE */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">💤</span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">BMR</h3>
                      <p className="text-xs text-gray-600">Basal Metabolic Rate</p>
                    </div>
                  </div>
                  <div className="text-4xl font-black text-blue-700 mb-2">
                    {formatNumber(results.bmr)}
                  </div>
                  <p className="text-xs text-gray-600">Calories burned at rest</p>
                </div>

                <div className="bg-green-50 rounded-xl border-2 border-green-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">TDEE</h3>
                      <p className="text-xs text-gray-600">Total Daily Energy</p>
                    </div>
                  </div>
                  <div className="text-4xl font-black text-green-700 mb-2">
                    {formatNumber(results.tdee)}
                  </div>
                  <p className="text-xs text-gray-600">Including activity</p>
                </div>
              </div>

              {/* All Goals */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 All Calorie Goals</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className={`p-4 rounded-lg border-2 ${goal === 'lose' ? 'bg-red-100 border-red-400' : 'bg-red-50 border-red-200'}`}>
                    <div className="text-2xl mb-1">📉</div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Weight Loss</div>
                    <div className="text-3xl font-black text-red-700">{formatNumber(results.tdee - 500)}</div>
                    <div className="text-xs text-red-600 mt-1">-1 lb/week</div>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${goal === 'maintain' ? 'bg-green-100 border-green-400' : 'bg-green-50 border-green-200'}`}>
                    <div className="text-2xl mb-1">⚖️</div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Maintain Weight</div>
                    <div className="text-3xl font-black text-green-700">{formatNumber(results.tdee)}</div>
                    <div className="text-xs text-green-600 mt-1">TDEE</div>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${goal === 'gain' ? 'bg-blue-100 border-blue-400' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Weight Gain</div>
                    <div className="text-3xl font-black text-blue-700">{formatNumber(results.tdee + 500)}</div>
                    <div className="text-xs text-blue-600 mt-1">+1 lb/week</div>
                  </div>
                </div>
              </div>

              {/* Macros */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🍽️ Macro Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                    <div>
                      <div className="text-sm font-bold text-gray-900">🥩 Protein (30%)</div>
                      <div className="text-xs text-gray-600">4 cal per gram</div>
                    </div>
                    <div className="text-3xl font-black text-red-700">{results.macros.protein}g</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                    <div>
                      <div className="text-sm font-bold text-gray-900">🍞 Carbs (40%)</div>
                      <div className="text-xs text-gray-600">4 cal per gram</div>
                    </div>
                    <div className="text-3xl font-black text-yellow-700">{results.macros.carbs}g</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border-2 border-orange-200 rounded-lg">
                    <div>
                      <div className="text-sm font-bold text-gray-900">🥑 Fat (30%)</div>
                      <div className="text-xs text-gray-600">9 cal per gram</div>
                    </div>
                    <div className="text-3xl font-black text-orange-700">{results.macros.fat}g</div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span> Quick Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Track calories for 2-3 weeks</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Adjust based on results</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Prioritize protein intake</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Stay consistent daily</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Important Notes
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Estimates vary ±10-15%</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Don't go below 1200 cal/day</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Consult doctor for medical advice</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Be patient - results take time</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const text = `TDEE: ${formatNumber(results.tdee)} cal/day\nGoal: ${formatNumber(results.goalCalories)} cal/day\nBMR: ${formatNumber(results.bmr)} cal/day\n\nMacros:\nProtein: ${results.macros.protein}g\nCarbs: ${results.macros.carbs}g\nFat: ${results.macros.fat}g`
                    navigator.clipboard.writeText(text)
                    alert('Copied to clipboard!')
                  }}
                  className="py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg"
                >
                  📋 Copy Results
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition shadow-lg"
                >
                  🖨️ Print Plan
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {!results && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Enter Your Details</h3>
              <p className="text-gray-600">Fill in the form above to calculate your daily calorie needs</p>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}