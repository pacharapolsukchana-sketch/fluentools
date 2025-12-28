'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const relatedTools = getSmartRelatedTools('age', 3)

  useEffect(() => {
    const today = new Date()
    setCurrentDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
  }, [])

  const calculateAge = () => {
    if (!birthDate) return null
    const birth = new Date(birthDate)
    const current = currentDate ? new Date(currentDate) : new Date()
    if (birth > current) return null

    let years = current.getFullYear() - birth.getFullYear()
    let months = current.getMonth() - birth.getMonth()
    let days = current.getDate() - birth.getDate()

    if (days < 0) {
      months--
      days += new Date(current.getFullYear(), current.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const totalMonths = years * 12 + months
    const timeDiff = current.getTime() - birth.getTime()
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60))
    const totalMinutes = Math.floor(timeDiff / (1000 * 60))

    let nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < current) nextBirthday = new Date(current.getFullYear() + 1, birth.getMonth(), birth.getDate())
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayBorn = daysOfWeek[birth.getDay()]
    const dogYears = Math.floor(years * 7)
    const heartbeats = Math.floor(totalMinutes * 70)

    return { years, months, days, totalMonths, totalWeeks, totalDays, totalHours, totalMinutes, nextBirthday, daysUntilBirthday, dayBorn, dogYears, heartbeats }
  }

  const result = calculateAge()
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num)

  const structuredData = generateStructuredData('age')
  const faqSchema = generateFAQSchema([
    { question: 'How do you calculate exact age?', answer: 'Age is calculated by finding the difference between birth date and current date, accounting for leap years and varying month lengths.' },
    { question: 'Why does my age in months differ?', answer: 'Total months include partial months. For example, 25 years 3 months = 303 total months, not 300.' },
    { question: 'How is next birthday calculated?', answer: 'The calculator finds the next occurrence of your birth date and counts days remaining.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Health', url: 'https://fluentools.com/#health' },
    { name: 'Age Calculator', url: 'https://fluentools.com/health/age' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days. Find out how many days until your next birthday and discover fun age statistics."
        icon="🎂"
        gradient="from-pink-50 to-purple-50"
        breadcrumbs={[{ label: 'Health', href: '/#health' }, { label: 'Age Calculator' }]}
        features={[
          { icon: '🎂', title: 'Exact Age', description: 'Get precise age in years, months, days' },
          { icon: '📊', title: 'Multiple Formats', description: 'See your age in months, weeks, days, hours' },
          { icon: '🎉', title: 'Birthday Countdown', description: 'Days until your next birthday' },
          { icon: '🌟', title: 'Fun Facts', description: 'Age in dog years, heartbeats, and more' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🎂', question: 'How do you calculate exact age?', answer: 'Age is calculated by finding the difference between your date of birth and the current date. We calculate years first, then remaining months, then remaining days, accounting for varying month lengths and leap years.' },
          { icon: '📊', question: 'Why does my age in months differ?', answer: 'Your total age in months includes the partial month you\'re currently in. For example, if you\'re 25 years and 3 months old, that\'s 303 total months, not 300.' },
          { icon: '🎉', question: 'How is the next birthday calculated?', answer: 'The calculator finds the next occurrence of your birth month and day. If your birthday has passed this year, it shows next year\'s date.' },
          { icon: '📅', question: 'Do leap years affect age calculation?', answer: 'Yes! Our calculator properly handles leap years (February 29). If you were born on Feb 29, your birthday in non-leap years is celebrated on Feb 28 or Mar 1.' },
          { icon: '🌟', question: 'What is age in dog years?', answer: 'Dog years multiply human years by 7. So if you\'re 20 years old, you\'d be 140 in dog years! This is for entertainment - actual dog aging is more complex.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700 mb-4">Enter your birth date and optionally choose a target date (defaults to today).</p></div>}>
        
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Input Card */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 md:p-8">
            
            {/* Birth Date */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">🎂 Your Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={currentDate}
                className="w-full px-6 py-4 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-sm [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>

            {/* Calculate To Date */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                📅 Calculate Age On <span className="text-gray-400 font-normal text-xs">(Optional - defaults to today)</span>
              </label>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                min={birthDate}
                className="w-full px-6 py-4 text-xl font-semibold text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-sm [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>

            {/* Quick Presets */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">⚡ Quick Examples</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button onClick={() => { const d = new Date(); d.setFullYear(d.getFullYear() - 25); setBirthDate(d.toISOString().split('T')[0]) }} className="py-3 px-4 bg-pink-50 text-pink-700 rounded-xl text-sm font-bold hover:bg-pink-100 hover:scale-105 transition-all shadow-sm">25 years ago</button>
                <button onClick={() => { const d = new Date(); d.setFullYear(d.getFullYear() - 30); setBirthDate(d.toISOString().split('T')[0]) }} className="py-3 px-4 bg-purple-50 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-100 hover:scale-105 transition-all shadow-sm">30 years ago</button>
                <button onClick={() => setBirthDate('2000-01-01')} className="py-3 px-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 hover:scale-105 transition-all shadow-sm">Year 2000</button>
                <button onClick={() => { const t = new Date(); setCurrentDate(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`) }} className="py-3 px-4 bg-green-50 text-green-700 rounded-xl text-sm font-bold hover:bg-green-100 hover:scale-105 transition-all shadow-sm">Today</button>
              </div>
            </div>

            {/* Result Display */}
            {birthDate && result ? (
              <div className="mt-8 p-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg">
                <div className="text-center text-white">
                  <div className="text-sm font-semibold opacity-90 mb-2">Your Exact Age</div>
                  <div className="text-6xl font-black mb-3">
                    🎂 {result.years}
                  </div>
                  <div className="text-2xl font-bold opacity-95 mb-1">
                    {result.years === 1 ? 'Year' : 'Years'} Old
                  </div>
                  <div className="text-lg font-semibold opacity-90">
                    {result.months} {result.months === 1 ? 'Month' : 'Months'}, {result.days} {result.days === 1 ? 'Day' : 'Days'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 p-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-lg text-center text-white">
                <div className="text-6xl mb-3">🎂</div>
                <div className="text-xl font-bold mb-2">Ready to Calculate</div>
                <p className="text-sm opacity-90">Enter your birth date above</p>
              </div>
            )}

          </div>

          {/* Detailed Results */}
          {birthDate && result && (
            <>
              {/* Time Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>You Have Lived</span>
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Months</div>
                    <div className="text-3xl font-black text-purple-700">{formatNumber(result.totalMonths)}</div>
                  </div>
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Weeks</div>
                    <div className="text-3xl font-black text-blue-700">{formatNumber(result.totalWeeks)}</div>
                  </div>
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Days</div>
                    <div className="text-3xl font-black text-green-700">{formatNumber(result.totalDays)}</div>
                  </div>
                  <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Hours</div>
                    <div className="text-3xl font-black text-orange-700">{formatNumber(result.totalHours)}</div>
                  </div>
                  <div className="p-4 bg-pink-50 border-2 border-pink-200 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Minutes</div>
                    <div className="text-3xl font-black text-pink-700">{formatNumber(result.totalMinutes)}</div>
                  </div>
                  <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Born On</div>
                    <div className="text-2xl font-black text-yellow-700">{result.dayBorn}</div>
                  </div>
                </div>
              </div>

              {/* Next Birthday + Fun Facts */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Next Birthday */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🎉</span>
                    <span>Next Birthday</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-xl border-2 border-orange-200">
                      <div className="text-sm text-gray-600 mb-1">Date</div>
                      <div className="text-xl font-bold text-orange-700">
                        {result.nextBirthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-center text-white">
                      <div className="text-sm font-semibold opacity-90 mb-1">Countdown</div>
                      <div className="text-5xl font-black">{result.daysUntilBirthday}</div>
                      <div className="text-lg font-bold mt-1">{result.daysUntilBirthday === 1 ? 'day' : 'days'}</div>
                    </div>
                    {result.daysUntilBirthday === 0 && (
                      <div className="bg-orange-100 border-2 border-orange-400 rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">🎊</div>
                        <div className="text-xl font-bold text-orange-700">Happy Birthday!</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🌟</span>
                    <span>Fun Facts</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🐕</span>
                        <div className="text-sm font-semibold text-gray-700">Dog Years</div>
                      </div>
                      <div className="text-3xl font-black text-yellow-700">{formatNumber(result.dogYears)}</div>
                      <div className="text-xs text-gray-600 mt-1">years old in dog years!</div>
                    </div>
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💓</span>
                        <div className="text-sm font-semibold text-gray-700">Heartbeats</div>
                      </div>
                      <div className="text-2xl font-black text-red-700">{formatNumber(result.heartbeats)}</div>
                      <div className="text-xs text-gray-600 mt-1">approximate heartbeats</div>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}