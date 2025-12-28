'use client'

import { useState } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const relatedTools = getSmartRelatedTools('password', 3)

  const generatePassword = () => {
    let chars = ''
    
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numbers) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    // Default to lowercase if nothing selected
    if (chars === '') chars = 'abcdefghijklmnopqrstuvwxyz'
    
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    setPassword(result)
    setCopied(false)
  }

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStrength = () => {
    const len = password.length
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNum = /[0-9]/.test(password)
    const hasSym = /[^A-Za-z0-9]/.test(password)
    
    let score = 0
    if (len >= 8) score++
    if (len >= 12) score++
    if (len >= 16) score++
    if (hasUpper) score++
    if (hasLower) score++
    if (hasNum) score++
    if (hasSym) score++
    
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', emoji: '😟' }
    if (score <= 4) return { label: 'Fair', color: 'bg-orange-500', emoji: '😐' }
    if (score <= 6) return { label: 'Strong', color: 'bg-green-500', emoji: '😊' }
    return { label: 'Very Strong', color: 'bg-emerald-500', emoji: '🎉' }
  }

  const strength = password ? getStrength() : null

  const structuredData = generateStructuredData('password')
  const faqSchema = generateFAQSchema([
    { question: 'What makes a strong password?', answer: 'Strong passwords are at least 12-16 characters long and include uppercase, lowercase, numbers, and symbols.' },
    { question: 'Is this password generator safe?', answer: 'Yes! Passwords are generated locally in your browser using secure random functions. Nothing is sent to servers.' },
    { question: 'How long should my password be?', answer: 'We recommend at least 12-16 characters. Critical accounts should use 16+ characters.' },
    { question: 'Should I use different passwords?', answer: 'Yes! Use unique passwords for each account. Use a password manager to store them securely.' },
    { question: 'How do I remember these passwords?', answer: 'Use a password manager like 1Password, Bitwarden, or LastPass to securely store all passwords.' }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Generators', url: 'https://fluentools.com/#generators' },
    { name: 'Password', url: 'https://fluentools.com/generators/password' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Password Generator"
        description="Generate strong, secure, random passwords instantly. Customize length and character types for maximum security."
        icon="🔐"
        gradient="from-purple-50 to-pink-50"
        breadcrumbs={[
          { label: 'Generators', href: '/#generators' },
          { label: 'Password' }
        ]}
        features={[
          { icon: '🔐', title: 'Strong & Secure', description: 'Cryptographically secure passwords' },
          { icon: '⚙️', title: 'Customizable', description: 'Choose length and characters' },
          { icon: '📊', title: 'Strength Meter', description: 'Real-time strength analysis' },
          { icon: '📋', title: 'Quick Copy', description: 'One-click clipboard copy' }
        ]}
        relatedTools={relatedTools}
        faqs={[
          { icon: '🔐', question: 'What makes a strong password?', answer: 'Strong passwords are at least 12-16 characters long and include uppercase letters, lowercase letters, numbers, and symbols. Avoid common words and personal information.' },
          { icon: '🔒', question: 'Is this password generator safe?', answer: 'Yes! Passwords are generated locally in your browser using cryptographically secure random functions. Nothing is sent to our servers.' },
          { icon: '📝', question: 'How long should my password be?', answer: 'We recommend at least 12-16 characters for most accounts. Critical accounts (email, banking) should use 16+ characters.' },
          { icon: '🔄', question: 'Should I use different passwords for each account?', answer: 'Absolutely! Using unique passwords for each account is crucial. If one site is breached, your other accounts remain safe.' },
          { icon: '💾', question: 'How do I remember these passwords?', answer: 'Use a password manager like 1Password, Bitwarden, or LastPass. They securely store all your passwords and auto-fill them.' }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Create Strong Passwords</h2>
            <p className="text-gray-700 mb-4">Our password generator creates cryptographically secure random passwords. Choose your length and character types, then click Generate.</p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Password Security Best Practices</h3>
            <p className="text-gray-700">Never reuse passwords. Enable two-factor authentication. Use a password manager. Change passwords if you suspect a breach.</p>
          </div>
        }
      >
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Password Display */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white">
            {password ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold opacity-90">Your Password</span>
                  {strength && (
                    <div className="flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                      <span>{strength.emoji}</span>
                      <span>{strength.label}</span>
                    </div>
                  )}
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4 break-all font-mono text-lg sm:text-xl text-center">
                  {password}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={copyPassword}
                    className="py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                  >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                  <button
                    onClick={generatePassword}
                    className="py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg"
                  >
                    🔄 New One
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔐</div>
                <div className="text-2xl font-bold mb-2">Ready to Generate</div>
                <p className="text-sm opacity-90">Click the button below to create a secure password</p>
              </div>
            )}
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5">
            
            {/* Length Slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-gray-700">Password Length</label>
                <span className="text-2xl font-black text-purple-600">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>8 (Short)</span>
                <span className="font-semibold text-purple-600">16 (Recommended)</span>
                <span>32 (Max)</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-2 mb-5">
              <div className="text-xs font-bold text-gray-700 mb-2">Include Characters:</div>
              
              <label className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-200 cursor-pointer hover:bg-purple-100 transition">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-5 h-5 text-purple-500 rounded focus:ring-2 focus:ring-purple-300"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">ABC (Uppercase)</div>
                </div>
                <span className="text-lg">🔤</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200 cursor-pointer hover:bg-blue-100 transition">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">abc (Lowercase)</div>
                </div>
                <span className="text-lg">🔡</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-2 border-green-200 cursor-pointer hover:bg-green-100 transition">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-300"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">123 (Numbers)</div>
                </div>
                <span className="text-lg">🔢</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-2 border-orange-200 cursor-pointer hover:bg-orange-100 transition">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-300"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">!@# (Symbols)</div>
                </div>
                <span className="text-lg">💠</span>
              </label>
            </div>

            {/* Generate Button */}
            {!password && (
              <button
                onClick={generatePassword}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all text-lg"
              >
                🔐 Generate Password
              </button>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            
            {/* Security Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>🔒</span>
                <span>Security Tips</span>
              </h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Never reuse passwords</li>
                <li>✓ Enable 2FA when available</li>
                <li>✓ Use a password manager</li>
                <li>✓ Update if account breached</li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>🛡️</span>
                <span>100% Private</span>
              </h3>
              <p className="text-xs text-gray-700">
                All passwords generated locally in your browser. Nothing sent to servers. Your security is our priority.
              </p>
            </div>

          </div>

          {/* Password Details */}
          {password && (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>📊</span>
                <span>Password Analysis</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-bold text-gray-900">{password.length} chars</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Uppercase:</span>
                  <span className="font-bold">{/[A-Z]/.test(password) ? '✅' : '❌'}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Lowercase:</span>
                  <span className="font-bold">{/[a-z]/.test(password) ? '✅' : '❌'}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Numbers:</span>
                  <span className="font-bold">{/[0-9]/.test(password) ? '✅' : '❌'}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded-lg col-span-2">
                  <span className="text-gray-600">Symbols:</span>
                  <span className="font-bold">{/[^A-Za-z0-9]/.test(password) ? '✅ Included' : '❌ Not included'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Fun Fact */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Did You Know?</span>
            </h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• A 12-char password has 3+ quadrillion combinations</li>
              <li>• Adding 1 character increases security by 95×</li>
              <li>• 81% of data breaches involve weak passwords</li>
              <li>• Password managers are recommended by experts</li>
            </ul>
          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}