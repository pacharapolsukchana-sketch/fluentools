'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTermValue, setLoanTermValue] = useState('')
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years')
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly')

  // Get smart related tools
  const relatedTools = getSmartRelatedTools('loan', 3)

  // Parse values
  const principal = parseFloat(loanAmount.replace(/,/g, '')) || 0
  const rate = parseFloat(interestRate) || 0
  const termValue = parseFloat(loanTermValue) || 0

  // Convert to months
  const totalMonths = termUnit === 'years' ? termValue * 12 : termValue

  // Calculate based on payment frequency
  let periodsPerYear = 12
  let numberOfPayments = totalMonths

  if (paymentFrequency === 'biweekly') {
    periodsPerYear = 26
    numberOfPayments = (totalMonths / 12) * 26
  } else if (paymentFrequency === 'weekly') {
    periodsPerYear = 52
    numberOfPayments = (totalMonths / 12) * 52
  }

  const periodRate = rate / 100 / periodsPerYear

  // Calculate payment using loan formula
  const payment = periodRate === 0
    ? principal / numberOfPayments
    : (principal * periodRate * Math.pow(1 + periodRate, numberOfPayments)) /
      (Math.pow(1 + periodRate, numberOfPayments) - 1)

  const totalPayment = payment * numberOfPayments
  const totalInterest = totalPayment - principal

  // Monthly equivalent for display
  const monthlyPayment = paymentFrequency === 'monthly' 
    ? payment 
    : paymentFrequency === 'biweekly' 
      ? (payment * 26) / 12 
      : (payment * 52) / 12

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const formatCurrencyWithCents = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const getPaymentFrequencyLabel = () => {
    switch (paymentFrequency) {
      case 'biweekly': return 'Bi-weekly'
      case 'weekly': return 'Weekly'
      default: return 'Monthly'
    }
  }

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly payments for personal loans, auto loans, and student loans. Get instant payment estimates with detailed interest breakdown."
      icon="🏦"
      gradient="from-blue-50 to-indigo-50"
      breadcrumbs={[
        { label: 'Finance', href: '/#finance' },
        { label: 'Loan Calculator' }
      ]}
      features={[
        {
          icon: '💰',
          title: 'Any Loan Type',
          description: 'Calculate payments for personal, auto, student, or any installment loan'
        },
        {
          icon: '📊',
          title: 'Detailed Breakdown',
          description: 'See exactly how much goes to principal vs interest over time'
        },
        {
          icon: '🔄',
          title: 'Flexible Terms',
          description: 'Enter loan term in months or years - your choice'
        },
        {
          icon: '📅',
          title: 'Payment Frequency',
          description: 'Choose monthly, bi-weekly, or weekly payment schedules'
        }
      ]}
      relatedTools={relatedTools}
      faqs={[
        {
          icon: '💡',
          question: 'How is my monthly loan payment calculated?',
          answer: 'Your monthly payment is calculated using the loan formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the principal (loan amount), r is the monthly interest rate (annual rate ÷ 12), and n is the number of payments. This ensures you pay off both principal and interest by the end of the loan term.'
        },
        {
          icon: '📊',
          question: 'What is the difference between principal and interest?',
          answer: 'Principal is the original amount you borrowed. Interest is the cost of borrowing that money, calculated as a percentage of the remaining balance. Early in the loan, most of your payment goes to interest. Over time, more goes toward principal as the balance decreases.'
        },
        {
          icon: '💵',
          question: 'Can I pay off my loan early to save on interest?',
          answer: 'Yes! Paying extra toward principal or paying off early reduces total interest paid. However, check if your lender charges prepayment penalties. Even small extra payments can save thousands in interest over the life of the loan.'
        },
        {
          icon: '🏦',
          question: 'What types of loans can I calculate?',
          answer: 'This calculator works for any fixed-rate installment loan including personal loans, auto loans, student loans, boat loans, RV loans, and other consumer loans. For mortgages with property tax and insurance, use our dedicated Mortgage Calculator instead.'
        },
        {
          icon: '📈',
          question: 'How does the interest rate affect my payment?',
          answer: 'Higher interest rates mean higher monthly payments and more total interest paid. For example, on a $20,000 5-year loan, 5% APR costs $377/month ($2,645 interest) while 10% APR costs $425/month ($5,496 interest) - that\'s $2,851 more in interest!'
        }
      ]}
      seoContent={
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Loan Calculator</h2>
          <p className="text-gray-700 mb-4">
            Our loan calculator helps you estimate monthly payments for any type of installment loan. Enter your loan amount, interest rate (APR), and loan term to see your monthly payment, total interest, and complete payment breakdown.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Understanding Loan Payments</h3>
          <p className="text-gray-700 mb-4">
            <strong>Loan Amount (Principal):</strong> The total amount you're borrowing from the lender.<br/>
            <strong>Interest Rate (APR):</strong> Annual Percentage Rate - the yearly cost of borrowing expressed as a percentage.<br/>
            <strong>Loan Term:</strong> How long you have to repay the loan, typically expressed in months or years.<br/>
            <strong>Monthly Payment:</strong> Fixed amount you pay each month, covering both principal and interest.<br/>
            <strong>Total Interest:</strong> The total cost of borrowing - what you pay beyond the principal amount.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Loan Scenarios</h3>
          <p className="text-gray-700 mb-4">
            <strong>Personal Loan:</strong> $15,000 at 8% APR for 5 years = $304/month, $3,240 total interest<br/>
            <strong>Auto Loan:</strong> $30,000 at 6% APR for 6 years = $497/month, $5,788 total interest<br/>
            <strong>Student Loan:</strong> $40,000 at 5% APR for 10 years = $424/month, $10,910 total interest<br/>
            <strong>Debt Consolidation:</strong> $25,000 at 10% APR for 4 years = $634/month, $5,425 total interest
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Tips to Save Money on Loans</h3>
          <p className="text-gray-700">
            <strong>Shop Around:</strong> Compare rates from multiple lenders - even 0.5% difference saves thousands.<br/>
            <strong>Improve Credit Score:</strong> Higher scores qualify for lower rates. Pay bills on time and reduce debt.<br/>
            <strong>Make Extra Payments:</strong> Pay more than the minimum to reduce principal and save on interest.<br/>
            <strong>Choose Shorter Terms:</strong> Higher monthly payments but much lower total interest paid.<br/>
            <strong>Avoid Fees:</strong> Watch out for origination fees, prepayment penalties, and late payment fees.
          </p>
        </div>
      }
    >
      {/* Calculator Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* LEFT: Inputs */}
        <div className="space-y-6">
          
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💰 Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">$</span>
              <input
                type="text"
                value={loanAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '')
                  if (value) {
                    setLoanAmount(parseInt(value).toLocaleString())
                  } else {
                    setLoanAmount('')
                  }
                }}
                placeholder="20,000"
                className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📈 Interest Rate (APR)
            </label>
            <div className="relative">
              <input
                type="text"
                value={interestRate}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  setInterestRate(value)
                }}
                placeholder="5.5"
                className="w-full pl-4 pr-10 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Annual Percentage Rate</p>
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📅 Loan Term
            </label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={loanTermValue}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '')
                    setLoanTermValue(value)
                  }}
                  placeholder={termUnit === 'years' ? '5' : '60'}
                  className="w-full pl-4 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
              
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value as 'years' | 'months')}
                className="w-full px-4 py-3 text-lg font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
            
            {loanTermValue && (
              <p className="text-xs text-gray-500 mt-1">
                = {termUnit === 'years' ? parseInt(loanTermValue) * 12 : loanTermValue} months
              </p>
            )}
          </div>

          {/* Payment Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🗓️ Payment Frequency
            </label>
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value as 'monthly' | 'biweekly' | 'weekly')}
              className="w-full px-4 py-3 text-lg font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            >
              <option value="monthly">Monthly (12/year)</option>
              <option value="biweekly">Bi-weekly (26/year)</option>
              <option value="weekly">Weekly (52/year)</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Example:</strong> $20,000 loan at 6% for 5 years = $387/month
            </p>
          </div>

          {/* Money-Saving Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Money-Saving Tips</span>
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              <p>• Pay extra toward principal to save on interest</p>
              <p>• Shorter terms = higher payments but less interest</p>
              <p>• Shop around for best rates - even 0.5% matters</p>
              <p>• Bi-weekly payments = 13 monthly payments/year</p>
            </div>
          </div>

        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          
          {loanAmount && interestRate && loanTermValue ? (
            <>
              {/* Payment Amount */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-sm font-semibold opacity-90 mb-2">{getPaymentFrequencyLabel()} Payment</div>
                <div className="text-5xl font-extrabold mb-2">{formatCurrencyWithCents(payment)}</div>
                <div className="text-sm opacity-90">
                  {numberOfPayments.toFixed(0)} payments over {termUnit === 'years' ? loanTermValue : (parseFloat(loanTermValue) / 12).toFixed(1)} years
                </div>
              </div>

              {paymentFrequency !== 'monthly' && (
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-cyan-900">💡 Monthly Equivalent</span>
                    <span className="text-2xl font-bold text-cyan-700">{formatCurrencyWithCents(monthlyPayment)}</span>
                  </div>
                  <p className="text-xs text-cyan-700 mt-1">Average monthly cost</p>
                </div>
              )}

              {/* Breakdown */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>Loan Summary</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="font-bold text-gray-900">{formatCurrency(principal)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Interest</span>
                    <span className="font-bold text-gray-900">{formatCurrency(totalInterest)}</span>
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Total Amount Paid</span>
                      <span className="text-xl font-bold text-blue-600">{formatCurrency(totalPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💳</span>
                  <span>Payment Details</span>
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">{getPaymentFrequencyLabel()} Payment</span>
                    <span className="text-lg font-bold text-blue-600">{formatCurrencyWithCents(payment)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Number of Payments</span>
                    <span className="text-lg font-bold text-gray-700">{numberOfPayments.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Interest Rate</span>
                    <span className="text-lg font-bold text-gray-700">{rate.toFixed(2)}% APR</span>
                  </div>
                </div>
              </div>

              {/* Interest vs Principal */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📈</span>
                  <span>Cost Breakdown</span>
                </h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Principal (Borrowed)</span>
                    <span className="font-bold text-gray-900">{formatCurrency(principal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Interest (Cost)</span>
                    <span className="font-bold text-purple-600">{formatCurrency(totalInterest)}</span>
                  </div>
                  
                  {/* Visual Bar */}
                  <div className="mt-3">
                    <div className="h-8 flex rounded-lg overflow-hidden">
                      <div 
                        className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                        style={{ width: `${(principal / totalPayment) * 100}%` }}
                      >
                        {((principal / totalPayment) * 100).toFixed(0)}%
                      </div>
                      <div 
                        className="bg-purple-500 flex items-center justify-center text-white text-xs font-semibold"
                        style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                      >
                        {((totalInterest / totalPayment) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>Principal</span>
                      <span>Interest</span>
                    </div>
                  </div>
                </div>
              </div>

            </>
          ) : (
            <>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-center text-white shadow-lg">
                <div className="text-5xl mb-3">🏦</div>
                <div className="text-sm font-semibold opacity-90 mb-3">Ready to Calculate</div>
                <div className="text-6xl font-extrabold mb-2">$0.00</div>
                <p className="text-sm opacity-90">Enter loan details to see payment</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Loan Types</h3>
                  <div className="text-left space-y-2 text-sm text-gray-700">
                    <p>• Personal Loans (5-15% APR)</p>
                    <p>• Auto Loans (3-10% APR)</p>
                    <p>• Student Loans (4-8% APR)</p>
                    <p>• Debt Consolidation (8-18% APR)</p>
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