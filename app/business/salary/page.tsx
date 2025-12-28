'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type SalaryType = 'hourly' | 'monthly' | 'annual'

export default function SalaryCalculator() {
  const [salaryType, setSalaryType] = useState<SalaryType>('monthly')
  const [amount, setAmount] = useState('30000')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [weeksPerYear, setWeeksPerYear] = useState('52')
  const [taxRate, setTaxRate] = useState('10')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('salary', 3)

  // Calculate all salary formats
  const calculateSalary = () => {
    const value = parseFloat(amount) || 0
    const hours = parseFloat(hoursPerWeek) || 40
    const weeks = parseFloat(weeksPerYear) || 52
    const tax = parseFloat(taxRate) || 0

    let hourly = 0
    let monthly = 0
    let annual = 0

    if (salaryType === 'hourly') {
      hourly = value
      annual = hourly * hours * weeks
      monthly = annual / 12
    } else if (salaryType === 'monthly') {
      monthly = value
      annual = monthly * 12
      hourly = annual / (hours * weeks)
    } else if (salaryType === 'annual') {
      annual = value
      monthly = annual / 12
      hourly = annual / (hours * weeks)
    }

    const taxAmount = annual * (tax / 100)
    const netAnnual = annual - taxAmount
    const netMonthly = netAnnual / 12
    const netHourly = netAnnual / (hours * weeks)

    return {
      hourly,
      daily: hourly * 8,
      weekly: hourly * hours,
      biweekly: hourly * hours * 2,
      monthly,
      annual,
      taxAmount,
      netHourly,
      netDaily: netHourly * 8,
      netWeekly: netHourly * hours,
      netMonthly,
      netAnnual,
    }
  }

  const salary = calculateSalary()

  const formatCurrency = (num: number) => {
    if (num % 1 === 0) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    } else {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num)
    }
  }

  // SEO Schemas
  const structuredData = generateStructuredData('salary')
  const faqSchema = generateFAQSchema([
    { 
      question: 'How do you convert hourly to annual salary?', 
      answer: 'Multiply hourly rate by hours per week, then multiply by weeks per year. For example: $15/hour × 40 hours/week × 52 weeks/year = $31,200/year. Our calculator handles this automatically with customizable work hours.' 
    },
    { 
      question: 'What is gross vs net salary?', 
      answer: 'Gross salary is total earnings before deductions. Net salary (take-home pay) is what you receive after taxes and other deductions. For example: $50,000 gross salary with 20% tax = $40,000 net salary.' 
    },
    { 
      question: 'How much tax is deducted from salary?', 
      answer: 'Tax rates vary by country and income level. In the US, federal income tax ranges from 10-37%. Our calculator lets you enter your estimated tax rate to see net income. For accurate tax calculation, consult a tax professional.' 
    },
    { 
      question: 'How many hours is full-time work?', 
      answer: 'Full-time work is typically 40 hours per week in most countries. This equals 2,080 hours per year (40 hours × 52 weeks). Part-time is usually less than 30 hours per week.' 
    },
    { 
      question: 'How to compare job offers with different pay periods?', 
      answer: 'Convert all offers to the same time period (usually annual salary) for fair comparison. Consider benefits, taxes, location, and work-life balance. Our calculator shows all formats to help you compare easily.' 
    }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Business', url: 'https://fluentools.com/#business' },
    { name: 'Salary Calculator', url: 'https://fluentools.com/business/salary' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Salary Calculator"
        description="Convert between hourly, monthly, and annual salary. Calculate net income after taxes and compare different salary formats instantly."
        icon="💰"
        gradient="from-green-50 to-emerald-50"
        breadcrumbs={[
          { label: 'Business', href: '/#business' },
          { label: 'Salary Calculator' }
        ]}
        features={[
          {
            icon: '💰',
            title: 'Salary Conversion',
            description: 'Convert between hourly, daily, weekly, monthly, and annual salary'
          },
          {
            icon: '🧾',
            title: 'Tax Calculation',
            description: 'Calculate net income after tax deductions'
          },
          {
            icon: '📊',
            title: 'Multiple Formats',
            description: 'See salary in all time periods at once'
          },
          {
            icon: '💼',
            title: 'Job Comparison',
            description: 'Compare different salary offers easily'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '💰',
            question: 'How do you convert hourly to annual salary?',
            answer: 'Multiply hourly rate by hours per week, then multiply by weeks per year. For example: $15/hour × 40 hours/week × 52 weeks/year = $31,200/year. Our calculator handles this automatically with customizable work hours.'
          },
          {
            icon: '📊',
            question: 'What is gross vs net salary?',
            answer: 'Gross salary is total earnings before deductions. Net salary (take-home pay) is what you receive after taxes and other deductions. For example: $50,000 gross salary with 20% tax = $40,000 net salary.'
          },
          {
            icon: '🧾',
            question: 'How much tax is deducted from salary?',
            answer: 'Tax rates vary by country and income level. In the US, federal income tax ranges from 10-37%. Our calculator lets you enter your estimated tax rate to see net income. For accurate tax calculation, consult a tax professional.'
          },
          {
            icon: '⏰',
            question: 'How many hours is full-time work?',
            answer: 'Full-time work is typically 40 hours per week in most countries. This equals 2,080 hours per year (40 hours × 52 weeks). Part-time is usually less than 30 hours per week.'
          },
          {
            icon: '💼',
            question: 'How to compare job offers with different pay periods?',
            answer: 'Convert all offers to the same time period (usually annual salary) for fair comparison. Consider benefits, taxes, location, and work-life balance. Our calculator shows all formats to help you compare easily.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Salary Calculator</h2>
            <p className="text-gray-700 mb-4">
              Our salary calculator converts between hourly, monthly, and annual salary formats. Enter your salary in any format, adjust work hours, and see instant conversions. The calculator also estimates net income after tax deductions.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Salary Conversion Examples</h3>
            <p className="text-gray-700 mb-4">
              <strong>Hourly to Annual:</strong> $20/hour × 40 hours/week × 52 weeks = $41,600/year<br/>
              <strong>Monthly to Hourly:</strong> $3,000/month × 12 months ÷ 2,080 hours = $17.31/hour<br/>
              <strong>Annual to Monthly:</strong> $50,000/year ÷ 12 months = $4,166.67/month
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Understanding Take-Home Pay</h3>
            <p className="text-gray-700 mb-4">
              Take-home pay (net salary) is your actual earnings after taxes and deductions. Typical deductions include income tax, social security, health insurance, and retirement contributions. Our calculator estimates net income based on your tax rate.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Comparing Job Offers</h3>
            <p className="text-gray-700">
              When comparing salaries: (1) Convert to same time period, (2) Consider benefits and perks, (3) Factor in cost of living, (4) Account for taxes, (5) Evaluate work hours and flexibility. A higher gross salary with long hours may result in lower hourly pay.
            </p>
          </div>
        }
      >
        <div className="grid lg:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💰 I want to calculate from
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['hourly', 'monthly', 'annual'] as SalaryType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSalaryType(type)}
                    className={`px-4 py-3 text-sm font-semibold rounded-xl transition ${
                      salaryType === type
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-400'
                    }`}
                  >
                    {type === 'hourly' && '⏰ Hourly'}
                    {type === 'monthly' && '📅 Monthly'}
                    {type === 'annual' && '📊 Annual'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {salaryType === 'hourly' && '💵 Hourly Rate ($)'}
                {salaryType === 'monthly' && '💵 Monthly Salary ($)'}
                {salaryType === 'annual' && '💵 Annual Salary ($)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={salaryType === 'hourly' ? '15.00' : '30000'}
                className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ⏰ Hours/Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Weeks/Year
                </label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🧾 Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                min="0"
                max="100"
                className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Tax calculation is simplified. Actual taxes vary by location and deductions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                <span>💡</span>
                <span>Did You Know?</span>
              </h3>
              <div className="text-xs text-gray-700 space-y-0.5">
                <p>• Full-time work = 2,080 hours/year (40 hrs × 52 weeks)</p>
                <p>• US federal minimum wage is $7.25/hour since 2009</p>
                <p>• Average US salary is ~$60,000/year (2024)</p>
                <p>• Some countries have 13th or 14th month salary bonuses</p>
              </div>
            </div>

            {salary && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-3">
                  <h3 className="text-xs font-bold text-gray-900 mb-2">📊 Summary</h3>
                  <div className="text-xs text-gray-700 space-y-0.5">
                    <p>• {hoursPerWeek}h/week</p>
                    <p>• {weeksPerYear} weeks/year</p>
                    <p>• {parseFloat(hoursPerWeek) * parseFloat(weeksPerYear)} hours/year</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-3">
                  <h3 className="text-xs font-bold text-gray-900 mb-2">🧾 Tax Info</h3>
                  <div className="text-xs text-gray-700 space-y-0.5">
                    <p>• Rate: {taxRate}%</p>
                    <p>• Deducted: ${formatCurrency(salary.taxAmount)}</p>
                    <p>• Net: ${formatCurrency(salary.netAnnual)}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="space-y-4">
            
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
              <div className="text-xs font-semibold opacity-90 mb-1">Annual Gross Salary</div>
              <div className="text-4xl font-extrabold mb-1">
                ${formatCurrency(salary.annual)}
              </div>
              <div className="text-xs opacity-90">
                ${formatCurrency(salary.monthly)}/month • ${formatCurrency(salary.hourly)}/hour
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">💰 Gross Income (Before Tax)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Hourly</div>
                  <div className="text-lg font-bold text-gray-900">${formatCurrency(salary.hourly)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Daily (8h)</div>
                  <div className="text-lg font-bold text-gray-900">${formatCurrency(salary.daily)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Weekly</div>
                  <div className="text-lg font-bold text-gray-900">${formatCurrency(salary.weekly)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Bi-weekly</div>
                  <div className="text-lg font-bold text-gray-900">${formatCurrency(salary.biweekly)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Monthly</div>
                  <div className="text-lg font-bold text-gray-900">${formatCurrency(salary.monthly)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Annual</div>
                  <div className="text-lg font-bold text-gray-900">${formatCurrency(salary.annual)}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-4 text-white shadow-lg">
              <div className="text-xs font-semibold opacity-90 mb-1">Annual Net Salary (Take-Home)</div>
              <div className="text-4xl font-extrabold mb-1">
                ${formatCurrency(salary.netAnnual)}
              </div>
              <div className="text-xs opacity-90">
                After {taxRate}% tax (${formatCurrency(salary.taxAmount)} deducted)
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">💵 Net Income (After Tax)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
                  <div className="text-xs text-gray-600">Hourly</div>
                  <div className="text-lg font-bold text-green-700">${formatCurrency(salary.netHourly)}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
                  <div className="text-xs text-gray-600">Daily (8h)</div>
                  <div className="text-lg font-bold text-green-700">${formatCurrency(salary.netDaily)}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
                  <div className="text-xs text-gray-600">Weekly</div>
                  <div className="text-lg font-bold text-green-700">${formatCurrency(salary.netWeekly)}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
                  <div className="text-xs text-gray-600">Monthly</div>
                  <div className="text-lg font-bold text-green-700">${formatCurrency(salary.netMonthly)}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}