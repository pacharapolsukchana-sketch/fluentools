'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type Tab = 'difference' | 'add-subtract' | 'timezone'

type TimeZone = {
  name: string
  offset: number
  city: string
  popular?: boolean
}

const timeZones: TimeZone[] = [
  // Popular zones
  { name: 'UTC', offset: 0, city: 'UTC', popular: true },
  { name: 'PST', offset: -8, city: 'Los Angeles', popular: true },
  { name: 'EST', offset: -5, city: 'New York', popular: true },
  { name: 'GMT', offset: 0, city: 'London', popular: true },
  { name: 'ICT', offset: 7, city: 'Bangkok', popular: true },
  { name: 'JST', offset: 9, city: 'Tokyo', popular: true },
  
  // Other zones
  { name: 'HST', offset: -10, city: 'Honolulu' },
  { name: 'AKST', offset: -9, city: 'Anchorage' },
  { name: 'MST', offset: -7, city: 'Denver' },
  { name: 'CST', offset: -6, city: 'Chicago' },
  { name: 'AST', offset: -4, city: 'Halifax' },
  { name: 'ART', offset: -3, city: 'Buenos Aires' },
  { name: 'BRT', offset: -3, city: 'São Paulo' },
  { name: 'CET', offset: 1, city: 'Paris' },
  { name: 'EET', offset: 2, city: 'Cairo' },
  { name: 'MSK', offset: 3, city: 'Moscow' },
  { name: 'GST', offset: 4, city: 'Dubai' },
  { name: 'IST', offset: 5.5, city: 'Mumbai' },
  { name: 'CST-CN', offset: 8, city: 'Beijing' },
  { name: 'HKT', offset: 8, city: 'Hong Kong' },
  { name: 'SGT', offset: 8, city: 'Singapore' },
  { name: 'KST', offset: 9, city: 'Seoul' },
  { name: 'AEST', offset: 10, city: 'Sydney' },
  { name: 'NZST', offset: 12, city: 'Auckland' },
]

export default function TimeCalculator() {
  const [activeTab, setActiveTab] = useState<Tab>('difference')
  
  // Time Difference
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  
  // Add/Subtract
  const [baseTime, setBaseTime] = useState('')
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('0')
  
  // Time Zone
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedZone, setSelectedZone] = useState<TimeZone>(timeZones[4]) // Bangkok

  const relatedTools = getSmartRelatedTools('time-calculator', 3)

  // Set current time
  const setNow = (setter: (time: string) => void) => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    setter(`${hours}:${minutes}`)
  }

  // Quick add presets
  const quickAdd = (h: number, m: number) => {
    setNow(setBaseTime)
    setOperation('add')
    setHours(h.toString())
    setMinutes(m.toString())
  }

  // Parse time string (HH:MM) to minutes
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Convert minutes to time string (HH:MM)
  const minutesToTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  // Calculate time difference
  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return null
    
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)
    
    let diff = endMinutes - startMinutes
    
    if (diff < 0) {
      diff += 24 * 60
    }
    
    const hours = Math.floor(diff / 60)
    const minutes = diff % 60
    const totalHours = (diff / 60).toFixed(2)
    
    return {
      hours,
      minutes,
      totalMinutes: diff,
      totalHours: parseFloat(totalHours),
      decimal: totalHours,
    }
  }

  // Add/Subtract time
  const calculateNewTime = () => {
    if (!baseTime) return null
    
    const baseMinutes = timeToMinutes(baseTime)
    const addMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0)
    
    let newMinutes = operation === 'add' 
      ? baseMinutes + addMinutes 
      : baseMinutes - addMinutes
    
    while (newMinutes < 0) newMinutes += 24 * 60
    while (newMinutes >= 24 * 60) newMinutes -= 24 * 60
    
    return minutesToTime(newMinutes)
  }

  // Convert time zones
  const convertTimeZones = () => {
    if (!selectedTime) return null
    
    const [hours, minutes] = selectedTime.split(':').map(Number)
    
    return timeZones.map(zone => {
      const offsetDiff = zone.offset - selectedZone.offset
      let newHours = hours + Math.floor(offsetDiff)
      const newMinutes = minutes + ((offsetDiff % 1) * 60)
      
      let finalMinutes = newMinutes
      if (newMinutes >= 60) {
        newHours += 1
        finalMinutes -= 60
      } else if (newMinutes < 0) {
        newHours -= 1
        finalMinutes += 60
      }
      
      let dayOffset = 0
      if (newHours >= 24) {
        dayOffset = 1
        newHours -= 24
      } else if (newHours < 0) {
        dayOffset = -1
        newHours += 24
      }
      
      return {
        zone,
        time: `${newHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`,
        dayOffset,
      }
    })
  }

  const timeDiff = calculateTimeDifference()
  const newTime = calculateNewTime()
  const timeZoneConversions = convertTimeZones()

  // Copy results
  const copyResults = () => {
    let text = ''
    
    if (activeTab === 'difference' && timeDiff) {
      text = `Time Difference: ${timeDiff.hours}h ${timeDiff.minutes}m (${timeDiff.decimal} hours)`
    } else if (activeTab === 'add-subtract' && newTime) {
      text = `New Time: ${newTime}`
    } else if (activeTab === 'timezone' && timeZoneConversions) {
      text = `Time: ${selectedTime} in ${selectedZone.city}\n\n` + 
        timeZoneConversions.map(c => `${c.zone.city}: ${c.time}${c.dayOffset !== 0 ? ` (${c.dayOffset > 0 ? '+1' : '-1'} day)` : ''}`).join('\n')
    }
    
    if (text) {
      navigator.clipboard.writeText(text)
      alert('✅ Copied to clipboard!')
    }
  }

  const structuredData = generateStructuredData('time-calculator')
  const faqSchema = generateFAQSchema([
    { question: 'How do you calculate time difference?', answer: 'Convert both times to minutes, subtract start from end, then convert back to hours and minutes. Handles overnight periods automatically.' },
    { question: 'How do time zones work?', answer: 'Time zones are regions with the same standard time, offset from UTC in hours. Bangkok (UTC+7) is 7 hours ahead of UTC.' },
    { question: 'How to calculate work hours?', answer: 'Use Time Difference: enter clock-in as start and clock-out as end. Shows total hours in decimal format for payroll.' },
    { question: 'Can I add or subtract time?', answer: 'Yes! Use Add/Subtract mode to add or remove hours and minutes from any base time.' },
    { question: 'What is decimal time format?', answer: 'Decimal time converts hours:minutes to decimal. Example: 2h 30m = 2.5 hours. Used for timesheets and billing.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Date & Time', url: 'https://fluentools.com/#datetime' },
    { name: 'Time Calculator', url: 'https://fluentools.com/datetime/time-calculator' }
  ])

  const popularZones = timeZones.filter(z => z.popular)
  const otherZones = timeZones.filter(z => !z.popular)

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Time Calculator"
        description="Calculate time differences, add or subtract hours and minutes, and convert between time zones. Free time calculator for all your time calculations."
        icon="🕐"
        gradient="from-indigo-50 to-purple-50"
        breadcrumbs={[
          { label: 'Date & Time', href: '/#datetime' },
          { label: 'Time Calculator' }
        ]}
        features={[
          { icon: '⏱️', title: 'Time Difference', description: 'Calculate duration between times' },
          { icon: '➕', title: 'Add/Subtract', description: 'Find future or past times' },
          { icon: '🌍', title: 'Time Zones', description: '20+ cities worldwide' },
          { icon: '⚡', title: 'Quick Actions', description: 'Now, presets, copy results' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '⏱️', question: 'How do you calculate time difference?', answer: 'To calculate time difference: convert both times to minutes, subtract start from end, then convert back to hours and minutes. Our calculator handles overnight periods automatically.' },
          { icon: '🌍', question: 'How do time zones work?', answer: 'Time zones are regions with the same standard time, typically offset from UTC (Coordinated Universal Time) in whole hours. Bangkok (UTC+7) is 7 hours ahead of UTC.' },
          { icon: '💼', question: 'How to calculate work hours?', answer: 'Use the Time Difference calculator: enter your clock-in time as start and clock-out time as end. Shows total hours in decimal format useful for payroll.' },
          { icon: '➕', question: 'Can I add or subtract time?', answer: 'Yes! Use the Add/Subtract mode to add or remove hours and minutes from any base time. Perfect for calculating arrival times or scheduling.' },
          { icon: '🔢', question: 'What is decimal time format?', answer: 'Decimal time converts hours and minutes to a decimal number. For example, 2 hours 30 minutes = 2.5 hours. Commonly used for timesheets and billing.' }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Time Calculator</h2>
            <p className="text-gray-700 mb-4">Our time calculator offers three modes: Time Difference, Add/Subtract, and Time Zones. Select your mode and enter times to see instant results.</p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Calculate Time Difference</h3>
            <p className="text-gray-700 mb-4">Enter start and end times to calculate exact duration. Results show in hours:minutes, total hours, and decimal format. Automatically handles overnight periods.</p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Add or Subtract Time</h3>
            <p className="text-gray-700">Start with any base time, then add or subtract hours and minutes to find a new time. Perfect for calculating meeting end times or scheduling appointments.</p>
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
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xl mb-1">⏱️</div>
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
                onClick={() => setActiveTab('timezone')}
                className={`px-3 py-3 rounded-lg font-bold text-sm transition-all ${
                  activeTab === 'timezone'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xl mb-1">🌍</div>
                <div>Time Zone</div>
              </button>
            </div>
          </div>

          {/* Time Difference */}
          {activeTab === 'difference' && (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🕐 Start Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    />
                    <button
                      onClick={() => setNow(setStartTime)}
                      className="px-4 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl transition"
                    >
                      Now
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🕐 End Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    />
                    <button
                      onClick={() => setNow(setEndTime)}
                      className="px-4 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl transition"
                    >
                      Now
                    </button>
                  </div>
                </div>

                {timeDiff && (
                  <>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-6 text-white shadow-lg">
                      <div className="text-sm font-semibold opacity-90 mb-2">Time Difference</div>
                      <div className="text-5xl font-black mb-2">
                        {timeDiff.hours}h {timeDiff.minutes}m
                      </div>
                      <div className="text-lg font-semibold">
                        {timeDiff.decimal} hours (decimal)
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-600 mb-1">Total Minutes</div>
                        <div className="text-2xl font-black text-blue-700">{timeDiff.totalMinutes}</div>
                      </div>
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-600 mb-1">Decimal Hours</div>
                        <div className="text-2xl font-black text-green-700">{timeDiff.decimal}</div>
                      </div>
                    </div>

                    <button
                      onClick={copyResults}
                      className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition shadow-lg"
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
                  <div className="text-xs font-bold text-gray-700 mb-2">⚡ Quick Add from Now:</div>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => quickAdd(1, 0)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +1h
                    </button>
                    <button
                      onClick={() => quickAdd(0, 30)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +30m
                    </button>
                    <button
                      onClick={() => quickAdd(2, 0)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +2h
                    </button>
                    <button
                      onClick={() => quickAdd(8, 0)}
                      className="py-2 bg-white hover:bg-green-50 text-gray-700 font-semibold rounded-lg text-xs transition border-2 border-green-300"
                    >
                      +8h
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🕐 Base Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={baseTime}
                      onChange={(e) => setBaseTime(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                    <button
                      onClick={() => setNow(setBaseTime)}
                      className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-xl transition"
                    >
                      Now
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Hours</label>
                    <input
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 text-base font-semibold text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Minutes</label>
                    <input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      min="0"
                      max="59"
                      className="w-full px-3 py-2 text-base font-semibold text-gray-700 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                    />
                  </div>
                </div>

                {newTime && (
                  <>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                      <div className="text-sm font-semibold opacity-90 mb-2">New Time</div>
                      <div className="text-6xl font-black mb-2">{newTime}</div>
                      <div className="text-sm opacity-90">
                        {operation === 'add' ? 'Added' : 'Subtracted'} {hours}h {minutes}m
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

          {/* Time Zone */}
          {activeTab === 'timezone' && (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🕐 Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="flex-1 px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />
                    <button
                      onClick={() => setNow(setSelectedTime)}
                      className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-xl transition"
                    >
                      Now
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🌍 Your Time Zone</label>
                  <select
                    value={selectedZone.name}
                    onChange={(e) => {
                      const zone = timeZones.find(z => z.name === e.target.value)
                      if (zone) setSelectedZone(zone)
                    }}
                    className="w-full px-4 py-3 text-base font-medium text-gray-700 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white"
                  >
                    <optgroup label="Popular">
                      {popularZones.map(zone => (
                        <option key={zone.name} value={zone.name}>
                          {zone.city} ({zone.name}, UTC{zone.offset >= 0 ? '+' : ''}{zone.offset})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Other Cities">
                      {otherZones.map(zone => (
                        <option key={zone.name} value={zone.name}>
                          {zone.city} ({zone.name}, UTC{zone.offset >= 0 ? '+' : ''}{zone.offset})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {timeZoneConversions && (
                  <>
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-5 text-white shadow-lg">
                      <div className="text-sm font-semibold opacity-90 mb-1">Your Time</div>
                      <div className="text-5xl font-black mb-1">{selectedTime}</div>
                      <div className="text-sm opacity-90">{selectedZone.city}</div>
                    </div>

                    <div className="bg-gray-50 rounded-xl border-2 border-gray-200 max-h-80 overflow-y-auto">
                      <h3 className="text-sm font-bold text-gray-900 sticky top-0 bg-gray-50 z-10 p-4 pb-2 border-b-2 border-gray-200">🌍 World Times</h3>
                      <div className="space-y-2 px-4 pb-4 pt-2">
                        {timeZoneConversions
                          .filter(c => c.zone.popular)
                          .map((conv) => (
                            <div 
                              key={conv.zone.name}
                              className={`flex justify-between items-center p-3 rounded-lg ${
                                conv.zone.name === selectedZone.name
                                  ? 'bg-blue-100 border-2 border-blue-400'
                                  : 'bg-white border-2 border-gray-200'
                              }`}
                            >
                              <div>
                                <div className="text-sm font-bold text-gray-900">{conv.zone.city}</div>
                                <div className="text-xs text-gray-600">{conv.zone.name}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-gray-900">{conv.time}</div>
                                {conv.dayOffset !== 0 && (
                                  <div className="text-xs text-gray-600">
                                    {conv.dayOffset === 1 ? '+1 day' : '-1 day'}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                      
                      <details className="px-4 pb-4">
                        <summary className="text-xs font-bold text-gray-600 cursor-pointer hover:text-gray-900">
                          Show more cities ({otherZones.length})
                        </summary>
                        <div className="space-y-2 mt-2">
                          {timeZoneConversions
                            .filter(c => !c.zone.popular)
                            .map((conv) => (
                              <div 
                                key={conv.zone.name}
                                className="flex justify-between items-center p-2 rounded-lg bg-white border border-gray-200"
                              >
                                <div>
                                  <div className="text-xs font-semibold text-gray-900">{conv.zone.city}</div>
                                  <div className="text-xs text-gray-500">{conv.zone.name}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">{conv.time}</div>
                                  {conv.dayOffset !== 0 && (
                                    <div className="text-xs text-gray-600">
                                      {conv.dayOffset === 1 ? '+1' : '-1'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </details>
                    </div>

                    <button
                      onClick={copyResults}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg"
                    >
                      📋 Copy All Times
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
              <li>• A day has exactly 1,440 minutes (24 × 60)</li>
              <li>• UTC is the world time standard (no daylight saving)</li>
              <li>• China uses single time zone despite 5 geographic zones</li>
              <li>• Some zones have 30-minute offsets (e.g., India UTC+5:30)</li>
            </ul>
          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}