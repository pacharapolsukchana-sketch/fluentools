'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type TaxType = 'income' | 'sales'

export default function TaxCalculator() {
  const [taxType, setTaxType] = useState<TaxType>('income')
  
  const [income, setIncome] = useState('50000')
  const [incomeTaxRate, setIncomeTaxRate] = useState('20')
  
  const [price, setPrice] = useState('100')
  const [salesTaxRate, setSalesTaxRate] = useState('7')
  const [includesTax, setIncludesTax] = useState(false)

  const relatedTools = getSmartRelatedTools('tax', 3)

  const calculateIncomeTax = () => {
    const gross = parseFloat(income) || 0
    const rate = parseFloat(incomeTaxRate) || 0
    
    const taxAmount = gross * (rate / 100)
    const netIncome = gross - taxAmount
    const monthlyGross = gross / 12
    const monthlyTax = taxAmount / 12
    const monthlyNet = netIncome / 12
    
    return {
      grossIncome: gross,
      taxAmount,
      netIncome,
      taxRate: rate,
      monthlyGross,
      monthlyTax,
      monthlyNet,
      effectiveRate: rate,
    }
  }

  const calculateSalesTax = () => {
    const amount = parseFloat(price) || 0
    const rate = parseFloat(salesTaxRate) || 0
    
    let basePrice = 0
    let taxAmount = 0
    let totalPrice = 0
    
    if (includesTax) {
      totalPrice = amount
      basePrice = amount / (1 + rate / 100)
      taxAmount = amount - basePrice
    } else {
      basePrice = amount
      taxAmount = amount * (rate / 100)
      totalPrice = amount + taxAmount
    }
    
    return {
      basePrice,
      taxAmount,
      totalPrice,
      taxRate: rate,
      includesTax,
    }
  }

  const incomeTax = taxType === 'income' ? calculateIncomeTax() : null
  const salesTax = taxType === 'sales' ? calculateSalesTax() : null

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

  const structuredData = generateStructuredData('tax')
  const faqSchema = generateFAQSchema([
    { 
      question: 'How do you calculate income tax?', 
      answer: 'Income tax is calculated by multiplying your gross income by the tax rate. For example: $50,000 income × 20% tax rate = $10,000 tax. Net income = $50,000 - $10,000 = $40,000. Actual tax calculations vary by country and may have brackets, deductions, and credits.' 
    },
    { 
      question: 'What is sales tax vs VAT?', 
      answer: 'Sales tax is added at final purchase (US, Canada). VAT (Value Added Tax) is included in displayed prices (Europe, Asia). Both are consumption taxes on goods/services. Our calculator handles both - just set whether price includes tax or not.' 
    },
    { 
      question: 'How to calculate price before tax?', 
      answer: 'Divide the tax-inclusive price by (1 + tax rate). For example: $107 with 7% tax → $107 ÷ 1.07 = $100 base price. The difference ($7) is the tax amount. Use our "Price includes tax" option for this calculation.' 
    },
    { 
      question: 'What is effective tax rate?', 
      answer: 'Effective tax rate is the average rate you actually pay. With progressive tax brackets, you pay different rates on different income portions. Your effective rate is total tax ÷ total income, usually lower than your top bracket rate.' 
    },
    { 
      question: 'Do tax rates vary by location?', 
      answer: 'Yes! Income tax rates vary by country (0-50%+) and sometimes by state/province. Sales tax/VAT also varies: US sales tax is 0-10% by state, EU VAT is typically 17-27%. Enter your local rate for accurate calculations.' 
    }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Business', url: 'https://fluentools.com/#business' },
    { name: 'Tax Calculator', url: 'https://fluentools.com/business/tax' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Tax Calculator"
        description="Calculate income tax, sales tax, and VAT. Estimate tax on income and purchases, determine net amounts, and understand tax implications easily."
        icon="🧾"
        gradient="from-blue-50 to-indigo-50"
        breadcrumbs={[
          { label: 'Business', href: '/#business' },
          { label: 'Tax Calculator' }
        ]}
        features={[
          {
            icon: '💰',
            title: 'Income Tax',
            description: 'Calculate tax on salary and net take-home pay'
          },
          {
            icon: '🛒',
            title: 'Sales Tax / VAT',
            description: 'Calculate tax on purchases and total price'
          },
          {
            icon: '🔄',
            title: 'Reverse Calculate',
            description: 'Calculate base price from tax-inclusive amount'
          },
          {
            icon: '📊',
            title: 'Multiple Views',
            description: 'See monthly and annual breakdowns'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '💰',
            question: 'How do you calculate income tax?',
            answer: 'Income tax is calculated by multiplying your gross income by the tax rate. For example: $50,000 income × 20% tax rate = $10,000 tax. Net income = $50,000 - $10,000 = $40,000. Actual tax calculations vary by country and may have brackets, deductions, and credits.'
          },
          {
            icon: '🛒',
            question: 'What is sales tax vs VAT?',
            answer: 'Sales tax is added at final purchase (US, Canada). VAT (Value Added Tax) is included in displayed prices (Europe, Asia). Both are consumption taxes on goods/services. Our calculator handles both - just set whether price includes tax or not.'
          },
          {
            icon: '🔢',
            question: 'How to calculate price before tax?',
            answer: 'Divide the tax-inclusive price by (1 + tax rate). For example: $107 with 7% tax → $107 ÷ 1.07 = $100 base price. The difference ($7) is the tax amount. Use our "Price includes tax" option for this calculation.'
          },
          {
            icon: '📊',
            question: 'What is effective tax rate?',
            answer: 'Effective tax rate is the average rate you actually pay. With progressive tax brackets, you pay different rates on different income portions. Your effective rate is total tax ÷ total income, usually lower than your top bracket rate.'
          },
          {
            icon: '🌍',
            question: 'Do tax rates vary by location?',
            answer: 'Yes! Income tax rates vary by country (0-50%+) and sometimes by state/province. Sales tax/VAT also varies: US sales tax is 0-10% by state, EU VAT is typically 17-27%. Enter your local rate for accurate calculations.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Tax Calculator</h2>
            <p className="text-gray-700 mb-4">
              Our tax calculator has two modes: Income Tax (for salary and wages) and Sales Tax (for purchases and VAT). Select your mode, enter the amount and tax rate, and see instant calculations including gross, tax, and net amounts.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Income Tax Calculation</h3>
            <p className="text-gray-700 mb-4">
              Enter your gross income and tax rate to calculate tax owed and net income (take-home pay). Results show annual and monthly breakdowns. Remember: actual income tax often uses progressive brackets - this calculator uses a simplified flat rate for estimates.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Sales Tax / VAT Calculation</h3>
            <p className="text-gray-700 mb-4">
              Calculate sales tax or VAT on purchases. If the price excludes tax (like US prices), the calculator adds tax. If the price includes tax (like EU prices), toggle "Price includes tax" to calculate the base price and tax amount separately.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Tax Rates Around the World</h3>
            <p className="text-gray-700">
              Income tax varies widely: 0% in UAE and Monaco, up to 56% in Denmark. Sales tax/VAT ranges from 0% (5 US states) to 27% (Hungary). Always enter your local tax rate for accurate calculations. For complex tax situations, consult a tax professional.
            </p>
          </div>
        }
      >
        <div className="grid lg:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🧾 Tax Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTaxType('income')}
                  className={`px-4 py-3 text-sm font-semibold rounded-xl transition ${
                    taxType === 'income'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  💰 Income Tax
                </button>
                <button
                  onClick={() => setTaxType('sales')}
                  className={`px-4 py-3 text-sm font-semibold rounded-xl transition ${
                    taxType === 'sales'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  🛒 Sales Tax/VAT
                </button>
              </div>
            </div>

            {taxType === 'income' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💰 Annual Gross Income ($)
                  </label>
                  <input
                    type="text"
                    value={income ? parseInt(income).toLocaleString() : ''}
                    onChange={(e) => setIncome(e.target.value.replace(/,/g, ''))}
                    placeholder="50,000"
                    className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🧾 Income Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={incomeTaxRate}
                    onChange={(e) => setIncomeTaxRate(e.target.value)}
                    min="0"
                    max="100"
                    placeholder="20"
                    className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This uses a simplified flat tax rate. Actual income tax often has progressive brackets.
                  </p>
                </div>
              </>
            )}

            {taxType === 'sales' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💵 Price ($)
                  </label>
                  <input
                    type="text"
                    value={price ? parseFloat(price).toLocaleString() : ''}
                    onChange={(e) => setPrice(e.target.value.replace(/,/g, ''))}
                    placeholder="100"
                    className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🧾 Sales Tax / VAT Rate (%)
                  </label>
                  <input
                    type="number"
                    value={salesTaxRate}
                    onChange={(e) => setSalesTaxRate(e.target.value)}
                    min="0"
                    max="100"
                    placeholder="7"
                    className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      checked={includesTax}
                      onChange={(e) => setIncludesTax(e.target.checked)}
                      className="w-5 h-5 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-200"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Price includes tax</div>
                      <div className="text-xs text-gray-600">Check if price already has tax (like VAT)</div>
                    </div>
                  </label>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> US prices usually exclude tax. EU prices usually include VAT.
                  </p>
                </div>
              </>
            )}

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                <span>💡</span>
                <span>Did You Know?</span>
              </h3>
              <div className="text-xs text-gray-700 space-y-0.5">
                <p>• Monaco and UAE have 0% income tax</p>
                <p>• Denmark has the highest income tax rate (~56%)</p>
                <p>• 5 US states have no sales tax (OR, NH, MT, AK, DE)</p>
                <p>• Hungary has the highest VAT in EU (27%)</p>
              </div>
            </div>

            {((taxType === 'income' && incomeTax) || (taxType === 'sales' && salesTax)) && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3">
                <h3 className="text-xs font-bold text-gray-900 mb-2">💡 Summary</h3>
                <div className="text-xs text-gray-700 space-y-0.5">
                  {taxType === 'income' && incomeTax && (
                    <>
                      <p>• Effective Rate: {incomeTax.effectiveRate}%</p>
                      <p>• You keep: {(100 - incomeTax.effectiveRate).toFixed(1)}%</p>
                      <p>• Tax burden: ${formatCurrency(incomeTax.taxAmount)}/year</p>
                    </>
                  )}
                  {taxType === 'sales' && salesTax && (
                    <>
                      <p>• Price {salesTax.includesTax ? 'includes' : 'excludes'} tax</p>
                      <p>• Tax rate: {salesTax.taxRate}%</p>
                      <p>• Tax per item: ${formatCurrency(salesTax.taxAmount)}</p>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>

          <div className="space-y-4">
            
            {taxType === 'income' && incomeTax && (
              <>
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
                  <div className="text-xs font-semibold opacity-90 mb-1">Annual Net Income</div>
                  <div className="text-4xl font-extrabold mb-1">
                    ${formatCurrency(incomeTax.netIncome)}
                  </div>
                  <div className="text-xs opacity-90">
                    After {incomeTax.taxRate}% tax (${formatCurrency(incomeTax.taxAmount)} deducted)
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">📊 Annual Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Gross Income</span>
                      <span className="text-lg font-bold text-gray-900">${formatCurrency(incomeTax.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
                      <span className="text-sm font-semibold text-gray-700">Tax ({incomeTax.taxRate}%)</span>
                      <span className="text-lg font-bold text-red-700">-${formatCurrency(incomeTax.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                      <span className="text-sm font-semibold text-gray-700">Net Income</span>
                      <span className="text-lg font-bold text-green-700">${formatCurrency(incomeTax.netIncome)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">📅 Monthly Breakdown</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Gross/Month</div>
                      <div className="text-lg font-bold text-gray-900">${formatCurrency(incomeTax.monthlyGross)}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Tax/Month</div>
                      <div className="text-lg font-bold text-red-700">${formatCurrency(incomeTax.monthlyTax)}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg col-span-2 border-2 border-green-200">
                      <div className="text-xs text-gray-600">Net/Month (Take-Home)</div>
                      <div className="text-2xl font-bold text-green-700">${formatCurrency(incomeTax.monthlyNet)}</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {taxType === 'sales' && salesTax && (
              <>
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
                  <div className="text-xs font-semibold opacity-90 mb-1">Total Price</div>
                  <div className="text-5xl font-extrabold mb-1">
                    ${formatCurrency(salesTax.totalPrice)}
                  </div>
                  <div className="text-xs opacity-90">
                    Including {salesTax.taxRate}% tax
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">🛒 Price Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Base Price</span>
                      <span className="text-xl font-bold text-gray-900">${formatCurrency(salesTax.basePrice)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
                      <span className="text-sm font-semibold text-gray-700">Tax ({salesTax.taxRate}%)</span>
                      <span className="text-xl font-bold text-orange-700">+${formatCurrency(salesTax.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border-2 border-indigo-300">
                      <span className="text-sm font-semibold text-gray-700">Total Price</span>
                      <span className="text-2xl font-bold text-indigo-700">${formatCurrency(salesTax.totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">📊 Examples</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Buy 10 items:</strong><br/>
                      ${formatCurrency(salesTax.totalPrice * 10)} total<br/>
                      (${formatCurrency(salesTax.taxAmount * 10)} tax)
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Buy 100 items:</strong><br/>
                      ${formatCurrency(salesTax.totalPrice * 100)} total<br/>
                      (${formatCurrency(salesTax.taxAmount * 100)} tax)
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}