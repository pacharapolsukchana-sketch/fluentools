'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type Tab = 'difference' | 'add-subtract' | 'business-days'

export default function DateCalculator() {
  const [activeTab, setActiveTab] = useState<Tab>('difference')
  
  // Date Difference
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  // Add/Subtract
  const [baseDate, setBaseDate] = useState('')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [years, setYears] = useState('0')
  const [months, setMonths] = useState('0')
  const [days, setDays] = useState('0')
  
  // Business Days
  const [bizStartDate, setBizStartDate] = useState('')
  const [bizEndDate, setBizEndDate] = useState('')

  const relatedTools = getSmartRelatedTools('date-calculator', 3)

  // Quick Actions
  const setToday = (setter: (date: string) => void) => {
    setter(new Date().toISOString().split('T')[0])
  }

  const addDaysToToday = (numDays: number) => {
    const date = new Date()
    date.setDate(date.getDate() + numDays)
    setBaseDate(new Date().toISOString().split('T')[0])
    setOperation('add')
    setYears('0')
    setMonths('0')
    setDays(numDays.toString())
  }

  // Calculate date difference
  const calculateDifference = () => {
    if (!startDate || !endDate) return null
    
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    const years = Math.floor(diffDays / 365)
    const remainingDays = diffDays % 365
    const months = Math.floor(remainingDays / 30)
    const days = remainingDays % 30
    
    return {
      totalDays: diffDays,
      totalWeeks: Math.floor(diffDays / 7),
      totalMonths: Math.floor(diffDays / 30),
      totalYears: Math.floor(diffDays / 365),
      years,
      months,
      days,
      hours: Math.floor(diffTime / (1000 * 60 * 60)),
      minutes: Math.floor(diffTime / (1000 * 60)),
    }
  }

  // Add/Subtract dates
  const calculateNewDate = () => {
    if (!baseDate) return null
    
    const date = new Date(baseDate)
    const y = parseInt(years) || 0
    const m = parseInt(months) || 0
    const d = parseInt(days) || 0
    
    if (operation === 'add') {
      date.setFullYear(date.getFullYear() + y)
      date.setMonth(date.getMonth() + m)
      date.setDate(date.getDate() + d)
    } else {
      date.setFullYear(date.getFullYear() - y)
      date.setMonth(date.getMonth() - m)
      date.setDate(date.getDate() - d)
    }
    
    return date
  }

  // Calculate business days
  const calculateBusinessDays = () => {
    if (!bizStartDate || !bizEndDate) return null
    
    const start = new Date(bizStartDate)
    const end = new Date(bizEndDate)
    
    let count = 0
    const current = new Date(start)
    
    while (current <= end) {
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++
      }
      current.setDate(current.getDate() + 1)
    }
    
    return count
  }

  const dateDiff = calculateDifference()
  const newDate = calculateNewDate()
  const businessDays = calculateBusinessDays()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Copy Results
  const copyResults = () => {
    let text = ''
    
    if (activeTab === 'difference' && dateDiff) {
      text = `Date Difference:\n${dateDiff.totalDays} days\n${dateDiff.years} years, ${dateDiff.months} months, ${dateDiff.days} days`
    } else if (activeTab === 'add-subtract' && newDate) {
      text = `New Date: ${formatDate(newDate)}`
    } else if (activeTab === 'business-days' && businessDays !== null) {
      text = `Business Days: ${businessDays} working days`
    }
    
    if (text) {
      navigator.clipboard.writeText(text)
      alert('✅ Results copied to clipboard!')
    }
  }

  const structuredData = generateStructuredData('date-calculator')
  const faqSchema = generateFAQSchema([
    { question: 'How do you calculate days between two dates?', answer: 'To find days between dates: subtract the start date from the end date and convert to days. Our calculator shows results in multiple formats.' },
    { question: 'What are business days?', answer: 'Business days are weekdays (Monday-Friday), excluding weekends. Useful for project planning and delivery estimates.' },
    { question: 'How do I add or subtract dates?', answer: 'Select a base date, then add or subtract years, months, and days. The calculator handles month lengths and leap years automatically.' },
    { question: 'Why do months have different lengths?', answer: 'Months range from 28-31 days. February has 28 days (29 in leap years), while April, June, September, November have 30 days.' },
    { question: 'What is a leap year?', answer: 'A leap year has 366 days with an extra day in February. Years divisible by 4 are leap years, except century years must be divisible by 400.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Date & Time', url: 'https://fluentools.com/#datetime' },
    { name: 'Date Calculator', url: 'https://fluentools.com/datetime/date-calculator' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Date Calculator"
        description="Calculate days between dates, add or subtract time periods, and count business days. Free date calculator with multiple calculation modes."
        icon="📅"
        gradient="from-blue-50 to-cyan-50"
        breadcrumbs={[
          { label: 'Date & Time', href: '/#datetime' },
          { label: 'Date Calculator' }
        ]}
        features={[
          { icon: '📊', title: 'Date Difference', description: 'Calculate exact time between dates' },
          { icon: '➕', title: 'Add/Subtract', description: 'Find future or past dates' },
          { icon: '💼', title: 'Business Days', description: 'Count working days only' },
          { icon: '⚡', title: 'Quick Actions', description: 'Today buttons & copy results' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '📅', question: 'How do you calculate days between two dates?', answer: 'To find days between dates: subtract the start date from the end date and convert to days. Our calculator also shows the difference in years, months, weeks, hours, and minutes.' },
          { icon: '💼', question: 'What are business days?', answer: 'Business days are weekdays (Monday-Friday), excluding weekends. Our calculator counts only business days, useful for project planning and work schedules.' },
          { icon: '➕', question: 'How do I add or subtract dates?', answer: 'Select a base date, then add or subtract any combination of years, months, and days. The calculator automatically handles month lengths and leap years.' },
          { icon: '🔢', question: 'Why do months have different lengths?', answer: 'Months range from 28-31 days. Our calculator accounts for this: February has 28 days (29 in leap years), while April, June, September, and November have 30 days.' },
          { icon: '📆', question: 'What is a leap year?', answer: 'A leap year has 366 days (extra day in February). Years divisible by 4 are leap years, except century years must be divisible by 400. For example: 2024 is a leap year.' }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Date Calculator</h2>
            <p className="text-gray-700 mb-4">Our date calculator offers three modes: Date Difference, Add/Subtract, and Business Days. Choose your mode and enter dates to see instant results.</p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Date Difference Calculator</h3>
            <p className="text-gray-700 mb-4">Enter start and end dates to see the exact difference in multiple formats: days, weeks, months, years. Perfect for calculating age, project duration, or time until events.</p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Add or Subtract Dates</h3>
            <p className="text-gray-700">Start with any base date, then add or subtract years, months, and days. Great for calculating due dates, expiration dates, or planning future events.</p>
          </div>
        }
      >
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab('difference')}
                className={`px-3 py-3 rounded-lg font-bold text-sm transition-all ${
                  activeTab === 'difference'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xl mb-1">📊</div>
                <div>Difference</div>
              </button>
              <button
                onClick={() => setActiveTab('add-subtract')}
                className={`px-3 py-3 rounded-lg font-bold text-sm transition-all ${
                  activeTab === 'add-subtract'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xl mb-1">➕</div>
                <div>Add/Subtract</div>
              </button>
              <button
                onClick={() => setActiveTab('business-days')}
                className={`px-3 py-3 rounded-lg font-bold text-sm transition-all ${
                  activeTab === 'business-days'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xl mb-1">💼</div>
                <div>Business</div>
              </button>
            </div>
          </div>

          {/* Date Difference */}
          {activeTab === 'difference' && (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📅 Start Date</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />
                    <button
                      onClick={() => setToday(setStartDate)}
                      className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-xl transition"
                    >
                      Today
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📅 End Date</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />
                    <button
                      onClick={() => setToday(setEndDate)}
                      className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-xl transition"
                    >
                      Today
                    </button>
                  </div>
                </div>

                {dateDiff && (
                  <>
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
                      <div className="text-sm font-semibold opacity-90 mb-2">Time Difference</div>
                      <div className="text-5xl font-black mb-2">
                        {dateDiff.totalDays.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold mb-3">Days</div>
                      <div className="text-sm opacity-90">
                        {dateDiff.years} years • {dateDiff.months} months • {dateDiff.days} days
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-600 mb-1">Weeks</div>
                        <div className="text-2xl font-black text-blue-700">{dateDiff.totalWeeks.toLocaleString()}</div>
                      </div>
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-600 mb-1">Months</div>
                        <div className="text-2xl font-black text-green-700">{dateDiff.totalMonths.toLocaleString()}</div>
                      </div>
                      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-600 mb-1">Years</div>
                        <div className="text-2xl font-black text-purple-700">{dateDiff.totalYears.toLocaleString()}</div>
                      </div>
                    </div>

                    <button
                      onClick={copyResults}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg"
                    >
                      📋 Copy Results
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Add/Subtract */}
          {activeTab === 'add-subtract' && (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5">
              <div className="space-y-4">
                {/* Quick Presets */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-gray-700 mb-2">⚡ Quick Add from Today:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => addDaysToToday(7)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +7 Days
                    </button>
                    <button
                      onClick={() => addDaysToToday(30)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +30 Days
                    </button>
                    <button
                      onClick={() => addDaysToToday(365)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +1 Year
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📅 Base Date</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={baseDate}
                      onChange={(e) => setBaseDate(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                    <button
                      onClick={() => setToday(setBaseDate)}
                      className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-xl transition"
                    >
                      Today
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">⚙️ Operation</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setOperation('add')}
                      className={`px-4 py-3 rounded-xl font-bold transition-all ${
                        operation === 'add'
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      ➕ Add
                    </button>
                    <button
                      onClick={() => setOperation('subtract')}
                      className={`px-4 py-3 rounded-xl font-bold transition-all ${
                        operation === 'subtract'
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      ➖ Subtract
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Years</label>
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 text-base font-semibold text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Months</label>
                    <input
                      type="number"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 text-base font-semibold text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Days</label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 text-base font-semibold text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                </div>

                {newDate && (
                  <>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                      <div className="text-sm font-semibold opacity-90 mb-2">New Date</div>
                      <div className="text-3xl font-black mb-2">
                        {newDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-sm opacity-90">
                        {formatDate(newDate)}
                      </div>
                    </div>

                    <button
                      onClick={copyResults}
                      className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition shadow-lg"
                    >
                      📋 Copy Result
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Business Days */}
          {activeTab === 'business-days' && (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📅 Start Date</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={bizStartDate}
                      onChange={(e) => setBizStartDate(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    />
                    <button
                      onClick={() => setToday(setBizStartDate)}
                      className="px-4 py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-xl transition"
                    >
                      Today
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📅 End Date</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={bizEndDate}
                      onChange={(e) => setBizEndDate(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    />
                    <button
                      onClick={() => setToday(setBizEndDate)}
                      className="px-4 py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-xl transition"
                    >
                      Today
                    </button>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-lg">
                  <p className="text-xs text-gray-700">
                    <strong>Note:</strong> Business days = Monday-Friday (excludes weekends, but NOT public holidays)
                  </p>
                </div>

                {businessDays !== null && (
                  <>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
                      <div className="text-sm font-semibold opacity-90 mb-2">Business Days</div>
                      <div className="text-6xl font-black mb-2">{businessDays}</div>
                      <div className="text-lg font-semibold">Working Days</div>
                      <div className="text-sm opacity-90 mt-2">≈ {(businessDays / 5).toFixed(1)} weeks</div>
                    </div>

                    <button
                      onClick={copyResults}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg"
                    >
                      📋 Copy Result
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Did You Know?</span>
            </h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• A year has 365.25 days (accounting for leap years)</li>
              <li>• The Gregorian calendar was introduced in 1582</li>
              <li>• There are exactly 52 weeks and 1 day in a regular year</li>
              <li>• Leap years occur every 4 years (with exceptions)</li>
            </ul>
          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}