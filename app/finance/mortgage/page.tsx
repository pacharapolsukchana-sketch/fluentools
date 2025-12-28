'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('500000')
  const [downPaymentPercent, setDownPaymentPercent] = useState('20')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [propertyTax, setPropertyTax] = useState('5000')
  const [homeInsurance, setHomeInsurance] = useState('1500')
  const [hoaFees, setHoaFees] = useState('0')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('mortgage', 3)

  // Parse values
  const price = parseFloat(homePrice.replace(/,/g, '')) || 0
  const downPercent = parseFloat(downPaymentPercent) || 0
  const rate = parseFloat(interestRate) || 0
  const years = parseInt(loanTerm) || 30
  const tax = parseFloat(propertyTax.replace(/,/g, '')) || 0
  const insurance = parseFloat(homeInsurance.replace(/,/g, '')) || 0
  const hoa = parseFloat(hoaFees.replace(/,/g, '')) || 0

  // Calculations
  const downPaymentAmount = price * (downPercent / 100)
  const loanAmount = price - downPaymentAmount
  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12

  const monthlyPI = monthlyRate === 0
    ? loanAmount / numberOfPayments
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const monthlyTax = tax / 12
  const monthlyInsurance = insurance / 12
  const monthlyPMI = downPercent < 20 ? (loanAmount * 0.01) / 12 : 0
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + hoa + monthlyPMI

  const totalInterest = (monthlyPI * numberOfPayments) - loanAmount
  const totalLoanCost = monthlyPI * numberOfPayments

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate home loan payments with taxes and insurance. Get accurate monthly payment estimates including PMI, property tax, and HOA fees."
      icon="🏠"
      gradient="from-emerald-50 to-teal-50"
      breadcrumbs={[
        { label: 'Finance', href: '/#finance' },
        { label: 'Mortgage Calculator' }
      ]}
      features={[
        {
          icon: '💰',
          title: 'Complete Cost Breakdown',
          description: 'See principal, interest, taxes, insurance, PMI, and HOA fees separately'
        },
        {
          icon: '📊',
          title: 'Multiple Loan Terms',
          description: 'Compare 15, 20, and 30-year mortgage options instantly'
        },
        {
          icon: '🏡',
          title: 'Property Tax & Insurance',
          description: 'Include all homeownership costs for accurate monthly payments'
        },
        {
          icon: '🎯',
          title: 'PMI Calculator',
          description: 'Automatically calculates PMI when down payment is less than 20%'
        }
      ]}
      relatedTools={relatedTools}
      faqs={[
        {
          icon: '🏠',
          question: 'How is my monthly mortgage payment calculated?',
          answer: 'Your monthly payment includes Principal & Interest (P&I) calculated using the loan amount, interest rate, and loan term, plus monthly portions of property tax and home insurance. If your down payment is less than 20%, PMI is added. HOA fees are included if applicable.'
        },
        {
          icon: '💡',
          question: 'What is PMI and when is it required?',
          answer: 'PMI (Private Mortgage Insurance) is required when your down payment is less than 20% of the home price. It typically costs 0.5-1% of the loan amount annually and protects the lender. You can remove PMI once you reach 20% equity in your home.'
        },
        {
          icon: '📊',
          question: 'Should I choose a 15-year or 30-year mortgage?',
          answer: '15-year mortgages have higher monthly payments but lower interest rates and significantly less total interest paid. 30-year mortgages offer lower monthly payments and more flexibility but cost more overall. Choose based on your budget and financial goals.'
        },
        {
          icon: '💵',
          question: 'How much down payment do I need?',
          answer: '20% down is ideal to avoid PMI, but many loans allow 3-20% down. FHA loans require 3.5% minimum, conventional loans often accept 5-10%, and VA/USDA loans can be 0% for qualified buyers. A larger down payment reduces your monthly payment and total interest.'
        },
        {
          icon: '🎯',
          question: 'What other costs should I consider?',
          answer: 'Beyond your monthly payment, budget for closing costs (2-5% of purchase price), moving expenses, home maintenance (1-2% of home value annually), utilities, and potential homeowner association (HOA) fees. Property taxes and insurance rates vary significantly by location.'
        }
      ]}
      seoContent={
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Mortgage Calculator</h2>
          <p className="text-gray-700 mb-4">
            Our comprehensive mortgage calculator helps you estimate monthly home loan payments including all costs. Enter your home price, down payment, interest rate, and loan term to see detailed payment breakdowns with taxes, insurance, and PMI.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Understanding Your Mortgage Payment</h3>
          <p className="text-gray-700 mb-4">
            <strong>Principal & Interest (P&I):</strong> The main portion of your payment that goes toward paying down the loan amount and interest charges.<br/>
            <strong>Property Tax:</strong> Annual property taxes divided by 12, typically 0.3-2.5% of home value depending on location.<br/>
            <strong>Home Insurance:</strong> Required by lenders to protect the property, typically $1,000-2,000 annually for most homes.<br/>
            <strong>PMI:</strong> Required when down payment is less than 20%, usually 0.5-1% of loan amount annually.<br/>
            <strong>HOA Fees:</strong> Monthly fees for homeowner associations in condos or planned communities.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Mortgage Calculator Tips</h3>
          <p className="text-gray-700 mb-4">
            <strong>Aim for 20% Down:</strong> Putting down 20% eliminates PMI and can secure better interest rates, saving thousands over the loan term.<br/>
            <strong>Follow the 28/36 Rule:</strong> Your monthly housing costs should be no more than 28% of gross income, and total debt payments under 36%.<br/>
            <strong>Compare Loan Terms:</strong> Use the calculator to compare 15-year vs 30-year mortgages and see how extra payments affect payoff time.<br/>
            <strong>Shop for Rates:</strong> Even 0.25% difference in interest rate can save tens of thousands over 30 years.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Mortgage Scenarios</h3>
          <p className="text-gray-700">
            <strong>First-Time Buyer:</strong> $350K home, 5% down, 6.5% rate, 30 years = ~$2,500/month with PMI<br/>
            <strong>20% Down Payment:</strong> $500K home, 20% down, 6% rate, 30 years = ~$2,900/month (no PMI)<br/>
            <strong>15-Year Fast Payoff:</strong> $400K home, 20% down, 5.5% rate, 15 years = ~$3,200/month, saves $200K+ in interest
          </p>
        </div>
      }
    >
      {/* Calculator Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* LEFT: Inputs */}
        <div className="space-y-6">
          
          {/* Home Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🏡</span>
              <span>Home Details</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">$</span>
                  <input
                    type="text"
                    value={homePrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        setHomePrice(parseInt(value).toLocaleString())
                      } else {
                        setHomePrice('')
                      }
                    }}
                    placeholder="500,000"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📊 Down Payment %
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={downPaymentPercent}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '')
                        setDownPaymentPercent(value)
                      }}
                      placeholder="20"
                      className="w-full pl-4 pr-10 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💵 Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="text"
                      value={formatNumber(downPaymentAmount)}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 border-2 border-gray-200 rounded-xl bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-blue-900">💳 Loan Amount</span>
                  <span className="text-xl font-bold text-blue-600">{formatCurrency(loanAmount)}</span>
                </div>
                <p className="text-xs text-blue-700">Home Price - Down Payment</p>
              </div>
            </div>
          </div>

          {/* Loan Terms */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📈</span>
              <span>Loan Terms</span>
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💹 Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={interestRate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '')
                        setInterestRate(value)
                      }}
                      placeholder="6.5"
                      className="w-full pl-4 pr-10 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Loan Term
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  >
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Costs */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🏘️</span>
              <span>Monthly Costs</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏛️ Property Tax (Annual)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="text"
                    value={propertyTax}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        setPropertyTax(parseInt(value).toLocaleString())
                      } else {
                        setPropertyTax('')
                      }
                    }}
                    placeholder="5,000"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">≈ {formatCurrency(monthlyTax)}/month</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏠 Home Insurance (Annual)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="text"
                    value={homeInsurance}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        setHomeInsurance(parseInt(value).toLocaleString())
                      } else {
                        setHomeInsurance('')
                      }
                    }}
                    placeholder="1,500"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">≈ {formatCurrency(monthlyInsurance)}/month</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏘️ HOA Fees <span className="text-gray-400 text-xs">(Monthly, Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="text"
                    value={hoaFees}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        setHoaFees(parseInt(value).toLocaleString())
                      } else {
                        setHoaFees('0')
                      }
                    }}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
              </div>

              {downPercent < 20 && (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <div className="text-xs text-yellow-900">
                      <strong>PMI Required:</strong> Private Mortgage Insurance is required when down payment is less than 20%. Estimated at {formatCurrency(monthlyPMI)}/month (1% of loan amount annually).
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          
          {/* Total Monthly */}
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">Total Monthly Payment</div>
            <div className="text-5xl font-extrabold mb-2">{formatCurrency(totalMonthly)}</div>
            <div className="text-sm opacity-90">Principal + Interest + Taxes + Insurance + HOA</div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📊</span>
              <span>Payment Breakdown</span>
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-700">Principal & Interest</span>
                <span className="text-lg font-bold text-blue-600">{formatCurrency(monthlyPI)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-700">Property Tax</span>
                <span className="text-lg font-bold text-gray-700">{formatCurrency(monthlyTax)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-700">Home Insurance</span>
                <span className="text-lg font-bold text-gray-700">{formatCurrency(monthlyInsurance)}</span>
              </div>
              {hoa > 0 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">HOA Fees</span>
                  <span className="text-lg font-bold text-gray-700">{formatCurrency(hoa)}</span>
                </div>
              )}
              {monthlyPMI > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">PMI</span>
                  <span className="text-lg font-bold text-yellow-600">{formatCurrency(monthlyPMI)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💰</span>
              <span>Loan Summary</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Loan Amount</span>
                <span className="font-bold text-gray-900">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Interest ({years} years)</span>
                <span className="font-bold text-gray-900">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Loan Cost</span>
                <span className="font-bold text-gray-900">{formatCurrency(totalLoanCost)}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Total Paid Over {years} Years</span>
                  <span className="text-xl font-bold text-emerald-600">{formatCurrency(totalLoanCost + (tax * years) + (insurance * years) + (hoa * 12 * years) + (monthlyPMI * numberOfPayments))}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Includes all costs</p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Smart Tips</span>
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              <p>• Aim for 20% down to avoid PMI</p>
              <p>• Monthly payment should be ≤28% of gross income</p>
              <p>• Compare 15 vs 30 year terms</p>
              <p>• Shop around for best interest rates</p>
            </div>
          </div>

        </div>

      </div>
    </CalculatorLayout>
  )
}