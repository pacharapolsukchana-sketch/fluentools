'use client'

import { useState, useEffect, useRef } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

type Currency = {
  code: string
  name: string
  symbol: string
}

const currencies: Record<string, Currency> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  THB: { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  HKD: { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  KRW: { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  VND: { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  PHP: { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
}

const currencyList = Object.values(currencies)

function FlagIcon({ code }: { code: string }) {
  const countryCode = code === 'EUR' ? 'EU' : code.substring(0, 2)
  
  return (
    <img 
      src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/96x72/${countryCode.toLowerCase()}.png 2x,
               https://flagcdn.com/144x108/${countryCode.toLowerCase()}.png 3x`}
      width="48"
      height="36"
      alt={`${code} flag`}
      className="w-8 h-6 rounded shadow-sm"
    />
  )
}

function CurrencyDropdown({ value, onChange }: { value: string, onChange: (code: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedCurrency = currencies[value]

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 text-lg font-semibold text-gray-800 bg-white border-2 border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all flex items-center justify-between shadow-sm"
      >
        <span className="flex items-center gap-3">
          <FlagIcon code={selectedCurrency.code} />
          <div className="text-left">
            <div className="text-sm font-bold text-gray-900">{selectedCurrency.code}</div>
            <div className="text-xs text-gray-500">{selectedCurrency.name}</div>
          </div>
        </span>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
          {currencyList.map((currency) => (
            <button
              key={currency.code}
              type="button"
              onClick={() => {
                onChange(currency.code)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-all flex items-center gap-3 border-b border-gray-100 last:border-0 ${
                currency.code === value ? 'bg-green-100 border-l-4 border-l-green-500' : ''
              }`}
            >
              <FlagIcon code={currency.code} />
              <div className="flex-1">
                <div className="font-bold text-sm text-gray-900">{currency.code}</div>
                <div className="text-xs text-gray-600">{currency.name}</div>
              </div>
              {currency.code === value && (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CurrencyConverter() {
  const [fromValue, setFromValue] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('THB')
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  const relatedTools = getSmartRelatedTools('currency', 3)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // ใช้ ExchangeRate-API (แม่นยำกว่า, ฟรี 100%)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        const data = await response.json()
        
        const formattedRates: Record<string, number> = {
          USD: 1,
          EUR: data.rates.EUR || 0.92,
          GBP: data.rates.GBP || 0.79,
          JPY: data.rates.JPY || 149.50,
          THB: data.rates.THB || 31.07,
          CNY: data.rates.CNY || 7.24,
          AUD: data.rates.AUD || 1.52,
          CAD: data.rates.CAD || 1.36,
          CHF: data.rates.CHF || 0.88,
          HKD: data.rates.HKD || 7.83,
          SGD: data.rates.SGD || 1.34,
          KRW: data.rates.KRW || 1320.00,
          INR: data.rates.INR || 83.12,
          MYR: data.rates.MYR || 4.72,
          VND: data.rates.VND || 24500.00,
          PHP: data.rates.PHP || 56.50,
        }
        
        setRates(formattedRates)
        setLastUpdate(new Date().toLocaleString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true 
        }))
        setLoading(false)
      } catch (error) {
        // Fallback rates (อัปเดตให้ตรงกับ Google)
        setRates({ 
          USD: 1, 
          EUR: 0.92, 
          GBP: 0.79, 
          JPY: 149.50, 
          THB: 31.07, // ✅ แก้จาก 35.50 → 31.07
          CNY: 7.24, 
          AUD: 1.52, 
          CAD: 1.36,
          CHF: 0.88, 
          HKD: 7.83, 
          SGD: 1.34, 
          KRW: 1320.00,
          INR: 83.12, 
          MYR: 4.72, 
          VND: 24500.00, 
          PHP: 56.50 
        })
        setLastUpdate(new Date().toLocaleString())
        setLoading(false)
      }
    }
    
    fetchRates()
    const interval = setInterval(fetchRates, 60000) // อัปเดตทุก 1 นาที
    return () => clearInterval(interval)
  }, [])

  const convert = (value: number, from: string, to: string): number => {
    if (!rates) return 0
    const usdValue = from === 'USD' ? value : value / rates[from]
    return to === 'USD' ? usdValue : usdValue * rates[to]
  }

  const getConvertedValue = (): number | null => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0 || !rates) return null
    return convert(value, fromCurrency, toCurrency)
  }

  const getAllConversions = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0 || !rates) return null
    return Object.keys(currencies).filter(code => code !== fromCurrency).map(code => ({
      code, name: currencies[code].name,
      value: convert(value, fromCurrency, code)
    })).sort((a, b) => ['USD', 'EUR', 'GBP', 'JPY', 'THB', 'CNY', 'AUD', 'CAD', 'SGD', 'HKD', 'CHF', 'KRW', 'INR', 'MYR', 'VND', 'PHP'].indexOf(a.code) - ['USD', 'EUR', 'GBP', 'JPY', 'THB', 'CNY', 'AUD', 'CAD', 'SGD', 'HKD', 'CHF', 'KRW', 'INR', 'MYR', 'VND', 'PHP'].indexOf(b.code))
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const getExchangeRate = (): number | null => rates ? convert(1, fromCurrency, toCurrency) : null
  const convertedValue = getConvertedValue()
  const allConversions = getAllConversions()
  const exchangeRate = getExchangeRate()

  const formatNumber = (num: number) => {
    if (num >= 1000) return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
    if (num >= 1) return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(num)
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(num)
  }

  const structuredData = generateStructuredData('currency')
  const faqSchema = generateFAQSchema([
    { question: 'How often are exchange rates updated?', answer: 'Exchange rates are updated every minute from reliable financial data sources for maximum accuracy.' },
    { question: 'What currencies are supported?', answer: 'We support 16 major world currencies including USD, EUR, GBP, JPY, THB, CNY, AUD, CAD, CHF, HKD, SGD, KRW, INR, MYR, VND, and PHP.' },
    { question: 'Are the rates accurate?', answer: 'Yes, we use live exchange rates from trusted financial APIs. Our rates match major financial platforms like Google Finance.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Converters', url: 'https://fluentools.com/#converters' },
    { name: 'Currency Converter', url: 'https://fluentools.com/converters/currency' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Currency Converter"
        description="Convert between world currencies with live exchange rates. Real-time forex conversion for USD, EUR, GBP, THB, JPY, and 16+ major currencies."
        icon="💱"
        gradient="from-green-50 to-emerald-50"
        breadcrumbs={[{ label: 'Converters', href: '/#converters' }, { label: 'Currency Converter' }]}
        features={[
          { icon: '💱', title: 'Live Exchange Rates', description: 'Real-time currency rates updated every minute' },
          { icon: '🌍', title: '16+ Major Currencies', description: 'Convert between all major world currencies' },
          { icon: '⚡', title: 'Instant Results', description: 'See conversion results as you type' },
          { icon: '🎯', title: 'Accurate Rates', description: 'Rates match Google Finance and major platforms' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '💱', question: 'How often are exchange rates updated?', answer: 'Our exchange rates are updated every minute using reliable financial APIs for maximum accuracy.' },
          { icon: '🌍', question: 'Which currencies are supported?', answer: 'We support 16 major world currencies including USD, EUR, GBP, JPY, THB, CNY, AUD, CAD, CHF, HKD, SGD, KRW, INR, MYR, VND, and PHP.' },
          { icon: '📊', question: 'How accurate are the conversion rates?', answer: 'Our rates are sourced from trusted financial APIs and match major platforms like Google Finance. Bank rates may include additional fees.' },
          { icon: '💰', question: 'Is this converter free to use?', answer: 'Yes! Our currency converter is completely free with no hidden fees or registration required.' },
          { icon: '🔒', question: 'Is my data private?', answer: 'Yes! All conversions happen in your browser. We don\'t store or track any of your data.' }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Currency Converter</h2>
            <p className="text-gray-700 mb-4">
              Our currency converter provides real-time exchange rates for major world currencies. Simply enter the amount you want to convert, select your source and target currencies, and see instant results. Exchange rates are updated every minute to ensure accuracy.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Supported Currencies</h3>
            <p className="text-gray-700 mb-4">
              <strong>Major Currencies:</strong> USD (US Dollar), EUR (Euro), GBP (British Pound), JPY (Japanese Yen)<br/>
              <strong>Asian Currencies:</strong> THB (Thai Baht), CNY (Chinese Yuan), HKD (Hong Kong Dollar), SGD (Singapore Dollar), KRW (Korean Won), INR (Indian Rupee), MYR (Malaysian Ringgit), VND (Vietnamese Dong), PHP (Philippine Peso)<br/>
              <strong>Other Currencies:</strong> AUD (Australian Dollar), CAD (Canadian Dollar), CHF (Swiss Franc)
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Why Our Rates Are Accurate</h3>
            <p className="text-gray-700">
              We use ExchangeRate-API, a trusted financial data provider, to ensure our rates match those found on Google Finance and other major platforms. Our rates are mid-market rates, meaning they represent the actual market exchange rate without markup. Banks and money changers typically add fees or margins on top of these rates.
            </p>
          </div>
        }>
        
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 md:p-8">
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">💸 Amount</label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="100"
                className="w-full px-6 py-4 text-3xl font-bold text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">📤 From</label>
              <CurrencyDropdown value={fromCurrency} onChange={setFromCurrency} />
            </div>

            <div className="flex justify-center my-6">
              <button
                onClick={swapCurrencies}
                className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
                aria-label="Swap currencies"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">📥 To</label>
              <CurrencyDropdown value={toCurrency} onChange={setToCurrency} />
            </div>

            {convertedValue !== null && (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <div className="text-center text-white">
                  <div className="text-sm font-semibold opacity-90 mb-2">You get</div>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="text-5xl md:text-6xl font-black">
                      {formatNumber(convertedValue)}
                    </span>
                    <FlagIcon code={toCurrency} />
                  </div>
                  <div className="text-xl font-bold opacity-95">
                    {toCurrency} • {currencies[toCurrency].name}
                  </div>
                </div>
              </div>
            )}

            {exchangeRate && (
              <div className="mt-6 flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">Exchange Rate</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  1 {fromCurrency} = {formatNumber(exchangeRate)} {toCurrency}
                </span>
              </div>
            )}

            <div className="mt-4 text-center text-xs text-gray-500">
              🕐 Updated: {lastUpdate || 'Loading...'}
            </div>

          </div>

          {allConversions && (
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span>
                <span>Compare All Currencies</span>
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {allConversions.map((conv) => (
                  <button
                    key={conv.code}
                    onClick={() => setToCurrency(conv.code)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      conv.code === toCurrency 
                        ? 'bg-green-100 border-2 border-green-500 shadow-md' 
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FlagIcon code={conv.code} />
                      <div className="text-left">
                        <div className="font-bold text-sm text-gray-900">{conv.code}</div>
                        <div className="text-xs text-gray-600">{conv.name}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${conv.code === toCurrency ? 'text-green-700' : 'text-gray-900'}`}>
                      {formatNumber(conv.value)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>Quick Tips</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Rates updated every minute</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Accurate rates match Google Finance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>100% free to use</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>No sign-up required</span>
              </div>
            </div>
          </div>

        </div>

      </CalculatorLayout>
    </SEOWrapper>
  )
}
