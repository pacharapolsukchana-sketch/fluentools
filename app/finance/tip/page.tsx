'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercent, setTipPercent] = useState('15')
  const [numPeople, setNumPeople] = useState('1')
  const [customTip, setCustomTip] = useState('')

  const tipOptions = [10, 15, 18, 20, 25]

  const bill = parseFloat(billAmount) || 0
  const tip = customTip ? parseFloat(customTip) : parseFloat(tipPercent)
  const people = parseInt(numPeople) || 1

  const tipAmount = (bill * tip) / 100
  const totalAmount = bill + tipAmount
  const perPersonAmount = totalAmount / people
  const tipPerPerson = tipAmount / people

  const handleTipSelect = (percent: number) => {
    setTipPercent(percent.toString())
    setCustomTip('')
  }

  const handleCustomTip = (value: string) => {
    setCustomTip(value)
    setTipPercent('')
  }

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('tip', 3)

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tips and split bills easily. Perfect for restaurants, bars, and any service where tipping is customary."
      icon="💰"
      gradient="from-emerald-50 to-green-50"
      breadcrumbs={[
        { label: 'Finance', href: '/#finance' },
        { label: 'Tip Calculator' }
      ]}
      features={[
        {
          icon: '⚡',
          title: 'Quick Calculation',
          description: 'Instantly calculate tips with preset percentages or custom amounts'
        },
        {
          icon: '👥',
          title: 'Split Bills',
          description: 'Easily divide the total among multiple people'
        },
        {
          icon: '💵',
          title: 'Flexible Options',
          description: 'Choose from common tip percentages or enter your own'
        },
        {
          icon: '🆓',
          title: 'Always Free',
          description: 'No registration or payment required'
        }
      ]}
      relatedTools={relatedTools}
      faqs={[
        {
          icon: '💡',
          question: 'What is the standard tip percentage?',
          answer: 'In the United States, the standard tip is 15-20% for good service. 15% is acceptable, 18% is standard, and 20% or more is for excellent service.'
        },
        {
          icon: '👥',
          question: 'How do I split a bill with tip?',
          answer: 'Enter the bill amount, select your tip percentage, and enter the number of people. The calculator will automatically divide the total (including tip) among everyone.'
        },
        {
          icon: '🌍',
          question: 'Do tipping customs vary by country?',
          answer: 'Yes! Tipping customs vary significantly. In the US, 15-20% is standard. In Europe, 5-10% or rounding up is common. Some countries like Japan don\'t have a tipping culture at all.'
        },
        {
          icon: '🍽️',
          question: 'Should I tip on tax?',
          answer: 'It\'s up to you! Some people tip on the pre-tax amount, others on the total. Most commonly, people tip on the total bill including tax.'
        }
      ]}
      seoContent={
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Tip Calculator</h2>
          <p className="text-gray-700 mb-4">
            Our tip calculator makes it easy to calculate gratuity and split bills among friends. Simply enter your bill amount, 
            select a tip percentage (or enter a custom amount), and specify how many people are splitting the bill.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Tipping Guidelines</h3>
          <p className="text-gray-700 mb-4">
            <strong>10%:</strong> Below average service<br/>
            <strong>15%:</strong> Acceptable service<br/>
            <strong>18%:</strong> Good service (standard)<br/>
            <strong>20%:</strong> Great service<br/>
            <strong>25%+:</strong> Exceptional service
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">When to Tip</h3>
          <p className="text-gray-700 mb-4">
            Tipping is customary for table service at restaurants, bars, food delivery, taxi rides, hairdressers, 
            hotel staff, and many other service industries. The amount typically ranges from 15-20% of the total bill.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Splitting Bills</h3>
          <p className="text-gray-700">
            When dining with friends or colleagues, use our calculator to split the bill evenly. It automatically 
            divides both the base amount and tip among all people, so everyone pays their fair share.
          </p>
        </div>
      }
    >
      {/* 2-Column Layout: Calculator + Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* LEFT: Calculator Form */}
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💵 Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">$</span>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💡 Tip Percentage
            </label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {tipOptions.map((percent) => (
                <button
                  key={percent}
                  onClick={() => handleTipSelect(percent)}
                  className={`py-3 px-4 rounded-lg font-semibold transition ${
                    tipPercent === percent.toString() && !customTip
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="number"
                value={customTip}
                onChange={(e) => handleCustomTip(e.target.value)}
                placeholder="Custom tip %"
                className="w-full px-4 py-3 font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              👥 Number of People
            </label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              min="1"
              placeholder="1"
              className="w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Example:</strong> $50 bill, 20% tip, 2 people = $30 per person
            </p>
          </div>

        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          
          {billAmount ? (
            <>
              {/* Total with Tip */}
              <div className="bg-gradient-to-br from-emerald-300 to-green-300 rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-sm font-semibold opacity-90 mb-2">
                  Total with Tip
                </div>
                <div className="text-5xl font-extrabold text-gray-800 mb-2">
                  ${totalAmount.toFixed(2)}
                </div>
                <div className="text-sm opacity-90">
                  Bill ${bill.toFixed(2)} + Tip ${tipAmount.toFixed(2)} ({customTip || tipPercent}%)
                </div>
              </div>

              {/* Per Person */}
              {people > 1 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-2xl">👥</span>
                    <h3 className="text-lg font-bold text-gray-900">Split Between {people} People</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-blue-700 mb-1">
                      ${perPersonAmount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      per person (Tip: ${tipPerPerson.toFixed(2)} each)
                    </div>
                  </div>
                </div>
              )}

              {/* Breakdown */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4 space-y-2">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📊</span>
                  <span>Breakdown</span>
                </h3>
                
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Bill Amount</span>
                  <span className="font-bold text-gray-900">${bill.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
                  <span className="text-sm text-emerald-700">Tip ({customTip || tipPercent}%)</span>
                  <span className="font-bold text-emerald-700">+${tipAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded border-2 border-blue-300">
                  <span className="text-sm text-blue-700 font-semibold">Total</span>
                  <span className="text-lg font-extrabold text-blue-700">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Tipping Guide */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>Tipping Guide</span>
                </h3>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• Standard: 15-20%</p>
                  <p>• Good service: 20-25%</p>
                  <p>• Exceptional: 25-30%+</p>
                  <p>• Poor service: 10-15%</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-br from-emerald-300 to-green-300 rounded-xl p-8 text-center shadow-lg">
                <div className="text-5xl mb-3">📝</div>
                <div className="text-sm font-semibold opacity-90 mb-3">Ready to Calculate</div>
                <div className="text-6xl font-extrabold text-gray-800 mb-2">$0.00</div>
                <p className="text-sm opacity-90">Enter bill amount and tip percentage</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Tipping Tips</h3>
                  <div className="text-left space-y-2 text-sm text-gray-700">
                    <p>• Most common tip: 15-20%</p>
                    <p>• Split bills easily with friends</p>
                    <p>• Consider service quality</p>
                    <p>• Factor in local customs</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </CalculatorLayout>
  )
}