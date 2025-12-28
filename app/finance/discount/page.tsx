'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [salesTax, setSalesTax] = useState('')
  const [inputMode, setInputMode] = useState<'percent' | 'amount'>('percent')

  const relatedTools = getSmartRelatedTools('discount', 3)

  const price = parseFloat(originalPrice) || 0
  const qty = parseInt(quantity) || 1
  const tax = parseFloat(salesTax) || 0

  let discount = 0
  let percent = 0

  if (inputMode === 'percent') {
    percent = parseFloat(discountPercent) || 0
    discount = (price * percent) / 100
  } else {
    discount = parseFloat(discountAmount) || 0
    percent = price > 0 ? (discount / price) * 100 : 0
  }

  const finalPrice = price - discount
  const totalSavings = discount * qty
  const subtotal = finalPrice * qty
  const taxAmount = (subtotal * tax) / 100
  const totalWithTax = subtotal + taxAmount

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const quickDiscounts = [10, 20, 25, 30, 50]

  // SEO Schemas
  const structuredData = generateStructuredData('discount')
  const faqSchema = generateFAQSchema([
    {
      question: 'How do I calculate discount percentage?',
      answer: 'To calculate discount percentage, divide the discount amount by the original price and multiply by 100. For example: $20 discount on a $100 item = ($20 ÷ $100) × 100 = 20% off. Our calculator does this automatically!'
    },
    {
      question: 'How do I calculate final price after discount?',
      answer: 'Subtract the discount amount from the original price. For percentage discounts, multiply the original price by the discount percentage, then subtract from original price. Example: $100 item with 25% off = $100 - ($100 × 0.25) = $75 final price.'
    },
    {
      question: 'What is the difference between percentage and dollar discount?',
      answer: 'Percentage discount is a portion of the original price (e.g., 20% off), while dollar discount is a fixed amount (e.g., $10 off). A $10 discount on a $50 item is 20% off, but on a $100 item it is only 10% off. Use our calculator to switch between both modes!'
    },
    {
      question: 'Can I calculate multiple or stacked discounts?',
      answer: 'For stacked discounts, apply them sequentially, not together. Example: 20% off then 10% off a $100 item = $100 - 20% = $80, then $80 - 10% = $72 (not 30% off). Apply the first discount using our calculator, then use the result as the new original price for the second discount.'
    },
    {
      question: 'How do I include sales tax in my calculation?',
      answer: 'Enter your local sales tax percentage in the optional field. The calculator will add tax to your discounted price. Example: $80 item after discount with 8% tax = $80 + ($80 × 0.08) = $86.40 total. Note: In most places, sales tax is applied AFTER discounts.'
    }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Finance', url: 'https://fluentools.com/#finance' },
    { name: 'Discount Calculator', url: 'https://fluentools.com/finance/discount' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Discount Calculator"
        description="Calculate sale prices, discounts, and savings instantly. Find out how much you save with percentage off or dollar amount discounts."
        icon="💸"
        gradient="from-amber-50 to-orange-50"
        breadcrumbs={[
          { label: 'Finance', href: '/#finance' },
          { label: 'Discount Calculator' }
        ]}
        features={[
          {
            icon: '⚡',
            title: 'Instant Calculation',
            description: 'See results immediately as you type - no button needed'
          },
          {
            icon: '🔄',
            title: 'Flexible Input',
            description: 'Calculate using percentage off or dollar amount discount'
          },
          {
            icon: '🛒',
            title: 'Multiple Items',
            description: 'Calculate total savings for multiple quantities'
          },
          {
            icon: '💰',
            title: 'Sales Tax Included',
            description: 'Optional sales tax calculation for final price'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '💡',
            question: 'How do I calculate discount percentage?',
            answer: 'To calculate discount percentage, divide the discount amount by the original price and multiply by 100. For example: $20 discount on a $100 item = ($20 ÷ $100) × 100 = 20% off. Our calculator does this automatically!'
          },
          {
            icon: '🛒',
            question: 'How do I calculate final price after discount?',
            answer: 'Subtract the discount amount from the original price. For percentage discounts, multiply the original price by the discount percentage, then subtract from original price. Example: $100 item with 25% off = $100 - ($100 × 0.25) = $75 final price.'
          },
          {
            icon: '📊',
            question: 'What is the difference between percentage and dollar discount?',
            answer: 'Percentage discount is a portion of the original price (e.g., 20% off), while dollar discount is a fixed amount (e.g., $10 off). A $10 discount on a $50 item is 20% off, but on a $100 item it is only 10% off. Use our calculator to switch between both modes!'
          },
          {
            icon: '💸',
            question: 'Can I calculate multiple or stacked discounts?',
            answer: 'For stacked discounts, apply them sequentially, not together. Example: 20% off then 10% off a $100 item = $100 - 20% = $80, then $80 - 10% = $72 (not 30% off). Apply the first discount using our calculator, then use the result as the new original price for the second discount.'
          },
          {
            icon: '🧮',
            question: 'How do I include sales tax in my calculation?',
            answer: 'Enter your local sales tax percentage in the optional field. The calculator will add tax to your discounted price. Example: $80 item after discount with 8% tax = $80 + ($80 × 0.08) = $86.40 total. Note: In most places, sales tax is applied AFTER discounts.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Discount Calculator</h2>
            <p className="text-gray-700 mb-4">
              Our discount calculator helps you find sale prices and calculate savings instantly. Simply enter the original price and either the discount percentage (like 25% off) or the discount amount (like $10 off) to see your final price and total savings.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Quick Discount Examples</h3>
            <p className="text-gray-700 mb-4">
              <strong>10% off $50:</strong> You pay $45, save $5<br/>
              <strong>20% off $100:</strong> You pay $80, save $20<br/>
              <strong>25% off $80:</strong> You pay $60, save $20<br/>
              <strong>50% off $200:</strong> You pay $100, save $100<br/>
              <strong>$15 off $60:</strong> You pay $45, save $15 (25% off)
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Shopping Tips</h3>
            <p className="text-gray-700 mb-4">
              <strong>Compare Percentage vs Dollar Discounts:</strong> A $20 discount is better than 20% off on items under $100, but worse on items over $100. Use our calculator to compare!<br/>
              <strong>Stack Discounts Correctly:</strong> If you have multiple discounts, apply them one at a time, not all at once.<br/>
              <strong>Consider Sales Tax:</strong> Remember to add sales tax to your final price for the true total cost.<br/>
              <strong>Calculate Multiple Items:</strong> Buying more? Enter the quantity to see your total savings.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Discount Scenarios</h3>
            <p className="text-gray-700">
              <strong>Black Friday Sales:</strong> Typically 20-50% off, with electronics often 25-40% off<br/>
              <strong>Clearance Items:</strong> Usually 30-70% off to clear inventory<br/>
              <strong>Seasonal Sales:</strong> End-of-season clothing often 40-60% off<br/>
              <strong>Bulk Discounts:</strong> Buy more, save more - calculate per-item savings<br/>
              <strong>Coupon Codes:</strong> Often $10-$50 off or 15-25% off purchases
            </p>
          </div>
        }
      >
        <div className="grid lg:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💰 Original Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">$</span>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  💸 Discount
                </label>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setInputMode('percent')}
                    className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                      inputMode === 'percent'
                        ? 'bg-white text-amber-600 shadow'
                        : 'text-gray-600'
                    }`}
                  >
                    % Off
                  </button>
                  <button
                    onClick={() => setInputMode('amount')}
                    className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                      inputMode === 'amount'
                        ? 'bg-white text-amber-600 shadow'
                        : 'text-gray-600'
                    }`}
                  >
                    $ Off
                  </button>
                </div>
              </div>

              {inputMode === 'percent' ? (
                <>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickDiscounts.map((discount) => (
                      <button
                        key={discount}
                        onClick={() => setDiscountPercent(discount.toString())}
                        className={`py-2 px-3 rounded-lg font-semibold text-sm transition ${
                          discountPercent === discount.toString()
                            ? 'bg-amber-500 text-white shadow-lg'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        {discount}%
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      placeholder="Enter discount %"
                      className="w-full pl-4 pr-10 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">%</span>
                  </div>
                </>
              ) : (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">$</span>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🛒 Quantity <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                placeholder="1"
                className="w-full px-4 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🧾 Sales Tax <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                  placeholder="0"
                  className="w-full pl-4 pr-10 py-3 text-lg font-medium text-gray-600 placeholder:text-gray-400 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter your local sales tax rate</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> $100 item, 25% off, 2 items, 8% tax = $162 total
              </p>
            </div>

          </div>

          <div className="space-y-4">
            
            {originalPrice && (discount > 0 || percent > 0) ? (
              <>
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="text-sm font-semibold opacity-90 mb-2">Final Price (Per Item)</div>
                  <div className="text-5xl font-extrabold mb-2">{formatCurrency(finalPrice)}</div>
                  <div className="text-sm opacity-90">
                    {formatCurrency(price)} - {formatCurrency(discount)} ({percent.toFixed(1)}% off)
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="text-sm font-semibold opacity-90 mb-2">💰 You Save!</div>
                  <div className="text-4xl font-extrabold mb-2">{formatCurrency(totalSavings)}</div>
                  {qty > 1 && (
                    <div className="text-sm opacity-90">
                      {formatCurrency(discount)} × {qty} items
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📊</span>
                    <span>Breakdown</span>
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Original Price</span>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(price)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-semibold text-red-700">Discount ({percent.toFixed(1)}%)</span>
                      <span className="text-lg font-bold text-red-600">-{formatCurrency(discount)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-2 border-amber-300">
                      <span className="text-sm font-semibold text-amber-700">Price After Discount</span>
                      <span className="text-lg font-bold text-amber-600">{formatCurrency(finalPrice)}</span>
                    </div>

                    {qty > 1 && (
                      <>
                        <div className="border-t-2 border-gray-200 my-2"></div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-semibold text-blue-700">Quantity</span>
                          <span className="text-lg font-bold text-blue-600">× {qty}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-semibold text-blue-700">Subtotal</span>
                          <span className="text-lg font-bold text-blue-600">{formatCurrency(subtotal)}</span>
                        </div>
                      </>
                    )}

                    {tax > 0 && (
                      <>
                        <div className="border-t-2 border-gray-200 my-2"></div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="text-sm font-semibold text-purple-700">Sales Tax ({tax}%)</span>
                          <span className="text-lg font-bold text-purple-600">+{formatCurrency(taxAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
                          <span className="text-sm font-semibold text-purple-900">Total with Tax</span>
                          <span className="text-xl font-bold text-purple-700">{formatCurrency(totalWithTax)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span>💡</span>
                    <span>Savings Summary</span>
                  </h3>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>• Original: {formatCurrency(price * qty)}</p>
                    <p>• You Pay: {formatCurrency(tax > 0 ? totalWithTax : subtotal)}</p>
                    <p>• You Save: {formatCurrency(totalSavings)} ({percent.toFixed(1)}% off)</p>
                  </div>
                </div>

              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">🏷️</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Calculate</div>
                  <div className="text-6xl font-extrabold mb-2">$0.00</div>
                  <p className="text-sm opacity-90">Enter price and discount to see savings</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">💡</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Tips</h3>
                    <div className="text-left space-y-2 text-sm text-gray-700">
                      <p>• Switch between % and $ discount modes</p>
                      <p>• Quick buttons for common discounts</p>
                      <p>• Calculate multiple items at once</p>
                      <p>• Include sales tax for final price</p>
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
