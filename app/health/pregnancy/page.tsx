'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function PregnancyCalculator() {
  const [lmpDate, setLmpDate] = useState('')
  const [results, setResults] = useState<{
    dueDate: Date
    currentWeek: number
    currentDay: number
    trimester: number
    daysPregnant: number
    daysRemaining: number
  } | null>(null)
  
  const relatedTools = getSmartRelatedTools('pregnancy', 3)

  // Auto-calculate when date changes
  useEffect(() => {
    if (lmpDate) {
      calculate()
    }
  }, [lmpDate])

  const calculate = () => {
    if (!lmpDate) return

    const lmp = new Date(lmpDate)
    const today = new Date()
    
    // Calculate due date (LMP + 280 days)
    const dueDate = new Date(lmp)
    dueDate.setDate(dueDate.getDate() + 280)
    
    // Calculate days pregnant
    const diffTime = today.getTime() - lmp.getTime()
    const daysPregnant = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    // Calculate weeks and days
    const currentWeek = Math.floor(daysPregnant / 7)
    const currentDay = daysPregnant % 7
    
    // Calculate trimester
    let trimester = 1
    if (currentWeek >= 27) trimester = 3
    else if (currentWeek >= 13) trimester = 2
    
    // Days remaining
    const daysRemaining = 280 - daysPregnant
    
    setResults({
      dueDate,
      currentWeek,
      currentDay,
      trimester,
      daysPregnant,
      daysRemaining
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getWeekInfo = (week: number) => {
    const weekData: Record<number, { size: string; fruit: string; length: string; symptoms: string[] }> = {
      4: { size: 'Poppy Seed', fruit: '🌱', length: '0.04 inches', symptoms: ['Fatigue', 'Mood swings', 'Bloating'] },
      8: { size: 'Raspberry', fruit: '🫐', length: '0.6 inches', symptoms: ['Morning sickness', 'Breast tenderness', 'Frequent urination'] },
      12: { size: 'Lime', fruit: '🍋', length: '2.1 inches', symptoms: ['Less nausea', 'Increased energy', 'Visible bump'] },
      16: { size: 'Avocado', fruit: '🥑', length: '4.6 inches', symptoms: ['Feeling movements', 'Growing belly', 'Back pain'] },
      20: { size: 'Banana', fruit: '🍌', length: '6.5 inches', symptoms: ['Baby kicks', 'Round ligament pain', 'Shortness of breath'] },
      24: { size: 'Corn', fruit: '🌽', length: '8 inches', symptoms: ['Braxton Hicks', 'Leg cramps', 'Heartburn'] },
      28: { size: 'Eggplant', fruit: '🍆', length: '10 inches', symptoms: ['Frequent urination', 'Swelling', 'Sleep issues'] },
      32: { size: 'Pineapple', fruit: '🍍', length: '11.5 inches', symptoms: ['Shortness of breath', 'Braxton Hicks', 'Fatigue'] },
      36: { size: 'Watermelon', fruit: '🍉', length: '13 inches', symptoms: ['Nesting instinct', 'Pelvic pressure', 'Frequent bathroom trips'] },
      40: { size: 'Full Term Baby', fruit: '👶', length: '20 inches', symptoms: ['Contractions', 'Water breaking', 'Labor signs'] }
    }
    
    // Find closest week
    const weeks = Object.keys(weekData).map(Number).sort((a, b) => a - b)
    let closest = weeks[0]
    for (const w of weeks) {
      if (Math.abs(w - week) < Math.abs(closest - week)) {
        closest = w
      }
    }
    
    return weekData[closest] || weekData[4]
  }

  const getMilestones = () => {
    if (!results) return []
    
    const lmp = new Date(lmpDate)
    return [
      { week: 4, title: 'Positive Test', date: new Date(lmp.getTime() + 28 * 24 * 60 * 60 * 1000), icon: '🧪' },
      { week: 8, title: 'First Ultrasound', date: new Date(lmp.getTime() + 56 * 24 * 60 * 60 * 1000), icon: '📷' },
      { week: 12, title: 'End 1st Trimester', date: new Date(lmp.getTime() + 84 * 24 * 60 * 60 * 1000), icon: '✨' },
      { week: 20, title: 'Anatomy Scan', date: new Date(lmp.getTime() + 140 * 24 * 60 * 60 * 1000), icon: '👀' },
      { week: 28, title: 'Third Trimester', date: new Date(lmp.getTime() + 196 * 24 * 60 * 60 * 1000), icon: '🎯' },
      { week: 37, title: 'Full Term', date: new Date(lmp.getTime() + 259 * 24 * 60 * 60 * 1000), icon: '✅' },
      { week: 40, title: 'Due Date!', date: results.dueDate, icon: '🎉' }
    ]
  }

  const structuredData = generateStructuredData('pregnancy')
  const faqSchema = generateFAQSchema([
    { question: 'How accurate is this calculator?', answer: 'Based on standard 280-day pregnancy. Actual delivery may vary by ±2 weeks.' },
    { question: 'What is LMP?', answer: 'Last Menstrual Period - the first day of your last period before getting pregnant.' },
    { question: 'When are the trimesters?', answer: '1st: Week 1-12, 2nd: Week 13-27, 3rd: Week 28-40.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Health', url: 'https://fluentools.com/#health' },
    { name: 'Pregnancy', url: 'https://fluentools.com/health/pregnancy' }
  ])

  const weekInfo = results ? getWeekInfo(results.currentWeek) : null

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Pregnancy Calculator"
        description="Calculate your due date, current week, and pregnancy timeline from your last period date."
        icon="🤰"
        gradient="from-pink-50 to-rose-50"
        breadcrumbs={[{ label: 'Health', href: '/#health' }, { label: 'Pregnancy' }]}
        features={[
          { icon: '📅', title: 'Due Date', description: 'Calculate estimated delivery date' },
          { icon: '🗓️', title: 'Current Week', description: 'Know your pregnancy week' },
          { icon: '👶', title: 'Trimester', description: 'Track pregnancy stages' },
          { icon: '⏱️', title: 'Timeline', description: 'Important milestones' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '📅', question: 'How is due date calculated?', answer: 'Due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP).' },
          { icon: '🤰', question: 'How accurate is this calculator?', answer: 'This uses the standard Naegele\'s Rule. Actual delivery typically occurs within 2 weeks before or after the due date.' },
          { icon: '📊', question: 'What are the trimesters?', answer: 'First trimester: Week 1-12, Second trimester: Week 13-27, Third trimester: Week 28-40.' },
          { icon: '⏰', question: 'When should I see a doctor?', answer: 'Schedule your first prenatal visit around week 8-10, or as soon as you get a positive test.' },
          { icon: '🍼', question: 'When is full term?', answer: 'Full term pregnancy is 37-42 weeks. Most babies are born between 38-42 weeks.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700">Enter the first day of your last period and calculate your due date.</p></div>}>
        
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Input */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            <div className="mb-2">
              <label className="block text-base font-bold text-gray-700 mb-3">📅 Last Menstrual Period (LMP)</label>
              <input 
                type="date" 
                value={lmpDate} 
                onChange={(e) => setLmpDate(e.target.value)} 
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">Select the first day of your last period</p>
            </div>

            <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              ✨ Results update automatically
            </p>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* Due Date - Big Card */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="text-center">
                  <div className="text-sm font-medium opacity-90 mb-2">Your Due Date</div>
                  <div className="text-3xl md:text-4xl font-black mb-2">
                    {formatDate(results.dueDate)}
                  </div>
                  <div className="text-lg font-semibold">
                    {results.daysRemaining} days to go!
                  </div>
                </div>
              </div>

              {/* Current Status Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-5 text-center border-2 border-pink-200">
                  <div className="text-3xl mb-2">📆</div>
                  <div className="text-3xl font-black text-pink-600 mb-1">
                    {results.currentWeek}<span className="text-xl">+{results.currentDay}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Weeks + Days</div>
                  <div className="text-xs text-gray-500 mt-1">Current pregnancy</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-5 text-center border-2 border-rose-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-3xl font-black text-rose-600 mb-1">{results.trimester}</div>
                  <div className="text-sm font-semibold text-gray-600">Trimester</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {results.trimester === 1 && 'First trimester'}
                    {results.trimester === 2 && 'Second trimester'}
                    {results.trimester === 3 && 'Third trimester'}
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-5 text-center border-2 border-red-200">
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="text-3xl font-black text-red-600 mb-1">{results.daysPregnant}</div>
                  <div className="text-sm font-semibold text-gray-600">Days Pregnant</div>
                  <div className="text-xs text-gray-500 mt-1">Since conception</div>
                </div>
              </div>

              {/* This Week Card */}
              {weekInfo && (
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-3xl">{weekInfo.fruit}</span>
                    <span>Week {results.currentWeek}: {weekInfo.size}</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">👶 Baby Size</div>
                      <div className="text-2xl font-black text-purple-700 mb-1">{weekInfo.size}</div>
                      <div className="text-sm text-gray-600">Length: {weekInfo.length}</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">💭 Common Symptoms</div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {weekInfo.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-white/70 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>💡 What's happening:</strong> Your baby is now the size of a {weekInfo.size.toLowerCase()}. 
                      {results.trimester === 1 && ' Major organs are forming.'}
                      {results.trimester === 2 && ' Your baby is growing and moving.'}
                      {results.trimester === 3 && ' Your baby is preparing for birth.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Milestones Timeline */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🗓️ Important Milestones</h3>
                <div className="space-y-3">
                  {getMilestones().map((milestone, idx) => {
                    const isPast = milestone.date < new Date()
                    const isCurrent = results.currentWeek === milestone.week
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-3 p-4 rounded-lg ${
                          isCurrent ? 'bg-pink-100 border-2 border-pink-400' :
                          isPast ? 'bg-gray-50' : 'bg-pink-50'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                          isCurrent ? 'bg-pink-500 text-white scale-110' :
                          isPast ? 'bg-gray-200' : 'bg-pink-500 text-white'
                        }`}>
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-sm ${
                            isCurrent ? 'text-pink-700' :
                            isPast ? 'text-gray-600' : 'text-gray-900'
                          }`}>
                            Week {milestone.week}: {milestone.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {milestone.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        {isCurrent && <span className="text-xs font-bold text-pink-700 bg-pink-200 px-3 py-1 rounded-full">NOW</span>}
                        {isPast && !isCurrent && <span className="text-xs text-gray-500">✓</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Trimester Breakdown */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className={`rounded-xl p-5 ${results.trimester === 1 ? 'bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-400' : 'bg-gray-50 border-2 border-gray-200'}`}>
                  <h4 className="font-bold text-lg mb-2">1️⃣ First Trimester</h4>
                  <p className="text-sm text-gray-600 mb-2">Weeks 1-12</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Major organs form</li>
                    <li>• Morning sickness</li>
                    <li>• First ultrasound</li>
                  </ul>
                </div>
                <div className={`rounded-xl p-5 ${results.trimester === 2 ? 'bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-400' : 'bg-gray-50 border-2 border-gray-200'}`}>
                  <h4 className="font-bold text-lg mb-2">2️⃣ Second Trimester</h4>
                  <p className="text-sm text-gray-600 mb-2">Weeks 13-27</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Feel baby move</li>
                    <li>• Anatomy scan</li>
                    <li>• Energy returns</li>
                  </ul>
                </div>
                <div className={`rounded-xl p-5 ${results.trimester === 3 ? 'bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-400' : 'bg-gray-50 border-2 border-gray-200'}`}>
                  <h4 className="font-bold text-lg mb-2">3️⃣ Third Trimester</h4>
                  <p className="text-sm text-gray-600 mb-2">Weeks 28-40</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Baby gains weight</li>
                    <li>• Prepare for birth</li>
                    <li>• Braxton Hicks</li>
                  </ul>
                </div>
              </div>

              {/* Tips */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span> Healthy Pregnancy Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Take prenatal vitamins daily</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Stay hydrated (8-10 glasses/day)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Get regular prenatal checkups</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Eat a balanced, nutritious diet</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⚠️</span> When to Call Doctor
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Severe abdominal pain</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Vaginal bleeding</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Decreased fetal movement</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>Signs of preterm labor</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    const text = `Due Date: ${formatDate(results.dueDate)}\nWeek: ${results.currentWeek}+${results.currentDay}\nTrimester: ${results.trimester}\nDays Pregnant: ${results.daysPregnant}`
                    navigator.clipboard.writeText(text)
                    alert('Copied to clipboard!')
                  }}
                  className="py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition shadow-lg"
                >
                  📋 Copy Results
                </button>
                <button 
                  onClick={() => window.print()}
                  className="py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition shadow-lg"
                >
                  🖨️ Print Timeline
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {!results && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🤰</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Enter Your Last Period Date</h3>
              <p className="text-gray-600">Calculate your due date and track your pregnancy journey</p>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}