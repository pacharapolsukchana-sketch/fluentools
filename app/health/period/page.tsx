'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function PeriodCalculator() {
  const [lastPeriod, setLastPeriod] = useState('')
  const [cycleDays, setCycleDays] = useState('28')
  const [periodDays, setPeriodDays] = useState('5')
  const [results, setResults] = useState<{
    nextPeriod: Date
    ovulationStart: Date
    ovulationEnd: Date
    fertileStart: Date
    fertileEnd: Date
    safeDays: { start: Date; end: Date }[]
  } | null>(null)
  
  const relatedTools = getSmartRelatedTools('period', 3)

  // Auto-calculate when inputs change
  useEffect(() => {
    if (lastPeriod) {
      calculate()
    }
  }, [lastPeriod, cycleDays, periodDays])

  const calculate = () => {
    if (!lastPeriod) return

    const last = new Date(lastPeriod)
    const cycle = parseInt(cycleDays) || 28
    const period = parseInt(periodDays) || 5
    
    // Next period
    const nextPeriod = new Date(last)
    nextPeriod.setDate(nextPeriod.getDate() + cycle)
    
    // Ovulation (typically 14 days before next period)
    const ovulationDay = new Date(nextPeriod)
    ovulationDay.setDate(ovulationDay.getDate() - 14)
    
    const ovulationStart = new Date(ovulationDay)
    ovulationStart.setDate(ovulationStart.getDate() - 1)
    
    const ovulationEnd = new Date(ovulationDay)
    ovulationEnd.setDate(ovulationEnd.getDate() + 1)
    
    // Fertile window (5 days before ovulation to 1 day after)
    const fertileStart = new Date(ovulationDay)
    fertileStart.setDate(fertileStart.getDate() - 5)
    
    const fertileEnd = new Date(ovulationDay)
    fertileEnd.setDate(fertileEnd.getDate() + 1)
    
    // Safe days (after period ends, before fertile window)
    const periodEnd = new Date(last)
    periodEnd.setDate(periodEnd.getDate() + period)
    
    const safeDays = [
      { 
        start: new Date(periodEnd), 
        end: new Date(fertileStart.getTime() - 24 * 60 * 60 * 1000) 
      }
    ]
    
    setResults({
      nextPeriod,
      ovulationStart,
      ovulationEnd,
      fertileStart,
      fertileEnd,
      safeDays
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getDaysUntil = (date: Date) => {
    const today = new Date()
    const diff = date.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const structuredData = generateStructuredData('period')
  const faqSchema = generateFAQSchema([
    { question: 'How accurate is period calculator?', answer: 'Based on average cycle. Actual dates may vary. Track for 3 months for better accuracy.' },
    { question: 'What is ovulation?', answer: 'When an egg is released from the ovary, typically 14 days before next period.' },
    { question: 'What are fertile days?', answer: 'Days when pregnancy is most likely - 5 days before ovulation to 1 day after.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Health', url: 'https://fluentools.com/#health' },
    { name: 'Period', url: 'https://fluentools.com/health/period' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Period Calculator"
        description="Calculate your next period, ovulation days, and fertile window. Track your menstrual cycle accurately."
        icon="🩸"
        gradient="from-red-50 to-pink-50"
        breadcrumbs={[{ label: 'Health', href: '/#health' }, { label: 'Period' }]}
        features={[
          { icon: '📅', title: 'Next Period', description: 'Predict next menstruation date' },
          { icon: '🥚', title: 'Ovulation', description: 'Know your fertile window' },
          { icon: '🛡️', title: 'Safe Days', description: 'Track low-risk days' },
          { icon: '📊', title: 'Cycle Tracker', description: 'Monitor your cycle' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '📅', question: 'How does period calculator work?', answer: 'Calculates next period based on your last period date and average cycle length (typically 28 days).' },
          { icon: '🥚', question: 'When do I ovulate?', answer: 'Ovulation typically occurs 14 days before your next period. This is when you\'re most fertile.' },
          { icon: '🤰', question: 'What are fertile days?', answer: 'Fertile window is 5 days before ovulation to 1 day after - when pregnancy is most likely to occur.' },
          { icon: '🛡️', question: 'What are safe days?', answer: 'Days with lower chance of pregnancy - right after period ends and after ovulation. Note: No day is 100% safe.' },
          { icon: '⏰', question: 'How long is a normal cycle?', answer: 'Average is 28 days, but normal cycles range from 21-35 days. Track yours for accuracy.' }
        ]}
        seoContent={<div><h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2><p className="text-gray-700">Enter your last period date and cycle length to calculate.</p></div>}>
        
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Input */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
            
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700 mb-3">📅 Last Period Start Date</label>
              <input 
                type="date" 
                value={lastPeriod} 
                onChange={(e) => setLastPeriod(e.target.value)} 
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 text-base font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🔄 Cycle Length (days)</label>
                <input 
                  type="number" 
                  value={cycleDays} 
                  onChange={(e) => setCycleDays(e.target.value)} 
                  onWheel={(e) => e.currentTarget.blur()}
                  min="21" 
                  max="35"
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <p className="text-xs text-gray-500 mt-1">Average: 28 days</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🩸 Period Duration (days)</label>
                <input 
                  type="number" 
                  value={periodDays} 
                  onChange={(e) => setPeriodDays(e.target.value)} 
                  onWheel={(e) => e.currentTarget.blur()}
                  min="3" 
                  max="7"
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <p className="text-xs text-gray-500 mt-1">Average: 5 days</p>
              </div>
            </div>

            <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              ✨ Results update automatically as you type
            </p>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* Next Period - Big Card */}
              <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="text-center">
                  <div className="text-sm font-medium opacity-90 mb-2">Your Next Period</div>
                  <div className="text-4xl font-black mb-2">
                    {formatDate(results.nextPeriod)}
                  </div>
                  <div className="text-lg font-semibold">
                    in {getDaysUntil(results.nextPeriod)} days
                  </div>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Fertile Window */}
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl border-2 border-pink-300 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">🥚</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Fertile Window</h3>
                      <p className="text-xs text-gray-600">Best time to conceive</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-xs font-semibold text-gray-600 mb-1">🎯 Peak Ovulation</div>
                      <div className="text-base font-black text-pink-700">
                        {formatDate(results.ovulationStart)} - {formatDate(results.ovulationEnd)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Highest chance of pregnancy</div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-xs font-semibold text-gray-600 mb-1">💗 Fertile Days</div>
                      <div className="text-base font-black text-pink-700">
                        {formatDate(results.fertileStart)} - {formatDate(results.fertileEnd)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">6 day fertile window</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-pink-50 border-l-4 border-pink-400 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>💡 Tip:</strong> Sperm can survive up to 5 days, so intercourse before ovulation can result in pregnancy.
                    </p>
                  </div>
                </div>

                {/* Safe Days */}
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl border-2 border-green-300 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">🛡️</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Safe Days</h3>
                      <p className="text-xs text-gray-600">Lower pregnancy risk</p>
                    </div>
                  </div>
                  
                  {results.safeDays.map((safe, idx) => (
                    <div key={idx} className="bg-white/70 rounded-lg p-3 mb-3">
                      <div className="text-xs font-semibold text-gray-600 mb-1">🟢 Safe Period</div>
                      <div className="text-base font-black text-green-700">
                        {formatDate(safe.start)} - {formatDate(safe.end)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Lower chance of conception</div>
                    </div>
                  ))}
                  
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>⚠️ Important:</strong> No method is 100% effective. Always use protection if avoiding pregnancy.
                    </p>
                  </div>
                </div>

              </div>

              {/* Info Cards Row */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-xl p-5 text-center border-2 border-red-200">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-3xl font-black text-red-600 mb-1">{cycleDays}</div>
                  <div className="text-sm font-semibold text-gray-600">Cycle Length</div>
                  <div className="text-xs text-gray-500 mt-1">Normal: 21-35 days</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-5 text-center border-2 border-pink-200">
                  <div className="text-3xl mb-2">🩸</div>
                  <div className="text-3xl font-black text-pink-600 mb-1">{periodDays}</div>
                  <div className="text-sm font-semibold text-gray-600">Period Days</div>
                  <div className="text-xs text-gray-500 mt-1">Normal: 3-7 days</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-5 text-center border-2 border-rose-200">
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="text-3xl font-black text-rose-600 mb-1">{getDaysUntil(results.nextPeriod)}</div>
                  <div className="text-sm font-semibold text-gray-600">Days Until Period</div>
                  <div className="text-xs text-gray-500 mt-1">Next cycle starts</div>
                </div>
              </div>

              {/* Tips & Knowledge */}
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Did You Know */}
                <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📌</span> Did You Know?
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Ovulation occurs about 14 days before your next period</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Sperm can survive in your body for up to 5 days</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>An egg survives only 12-24 hours after ovulation</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Tracking for 3+ cycles increases accuracy</span>
                    </li>
                  </ul>
                </div>

                {/* Important Notes */}
                <div className="bg-purple-50 rounded-xl border-2 border-purple-200 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Important Notes
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Stress and illness can affect your cycle</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Irregular cycles need medical consultation</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>This calculator estimates - not a guarantee</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Use contraception even on "safe" days</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Planning Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎯</span> Planning Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="font-bold text-pink-700 mb-2">💕 Trying to Conceive?</div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Focus on fertile window (6 days)</li>
                      <li>• Have intercourse every 2-3 days</li>
                      <li>• Track basal body temperature</li>
                      <li>• Consider ovulation tests</li>
                    </ul>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="font-bold text-green-700 mb-2">🛡️ Avoiding Pregnancy?</div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Use contraception consistently</li>
                      <li>• Don't rely on calendar method alone</li>
                      <li>• Consider birth control options</li>
                      <li>• Consult with healthcare provider</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    const text = `Next Period: ${formatDate(results.nextPeriod)}\nOvulation: ${formatDate(results.ovulationStart)} - ${formatDate(results.ovulationEnd)}\nFertile: ${formatDate(results.fertileStart)} - ${formatDate(results.fertileEnd)}`
                    navigator.clipboard.writeText(text)
                    alert('Copied to clipboard!')
                  }}
                  className="py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition shadow-lg"
                >
                  📋 Copy Results
                </button>
                <button 
                  onClick={() => window.print()}
                  className="py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition shadow-lg"
                >
                  🖨️ Print Calendar
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {!results && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Select Your Last Period Date</h3>
              <p className="text-gray-600">Enter the first day of your last period to calculate your cycle</p>
            </div>
          )}

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}