'use client'

import { useState, useEffect, useRef } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function QRGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [size, setSize] = useState('256')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const relatedTools = getSmartRelatedTools('qr', 3)

  const generateQR = () => {
    if (!text) return
    
    const qrSize = parseInt(size) || 256
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}`
    setQrCode(qrUrl)
  }

  const downloadQR = () => {
    if (!qrCode) return
    
    const link = document.createElement('a')
    link.href = qrCode
    link.download = 'qrcode.png'
    link.click()
  }

  // SEO Schemas
  const structuredData = generateStructuredData('qr')
  const faqSchema = generateFAQSchema([
    {
      question: 'What is a QR code?',
      answer: 'QR (Quick Response) code is a 2D barcode that stores information like URLs, text, or contact details. Smartphones can scan QR codes with their camera to quickly access the stored information.'
    },
    {
      question: 'What can I encode in a QR code?',
      answer: 'QR codes can store URLs (websites), plain text, email addresses, phone numbers, SMS messages, WiFi credentials, contact information (vCard), and more. Maximum capacity is about 4,000 characters.'
    },
    {
      question: 'What size should my QR code be?',
      answer: 'For print: 2-3cm minimum for business cards, larger for posters. For digital: 256px is good for screens. Larger QR codes are easier to scan from distance. Always test scanning before printing.'
    },
    {
      question: 'How do I scan a QR code?',
      answer: 'Most smartphones can scan QR codes with the built-in camera app. Open your camera, point it at the QR code, and tap the notification that appears. Some phones may need a QR scanner app.'
    },
    {
      question: 'Are QR codes secure?',
      answer: 'QR codes themselves are just data. However, be cautious when scanning unknown QR codes as they might lead to malicious websites. Our generator creates standard QR codes with no tracking or analytics.'
    }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Generators', url: 'https://fluentools.com/#generators' },
    { name: 'QR Code Generator', url: 'https://fluentools.com/generators/qr' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="QR Code Generator"
        description="Create QR codes for URLs, text, contact info instantly. Free QR code generator with customizable size. Download as PNG."
        icon="📱"
        gradient="from-blue-50 to-indigo-50"
        breadcrumbs={[
          { label: 'Generators', href: '/#generators' },
          { label: 'QR Code Generator' }
        ]}
        features={[
          {
            icon: '📱',
            title: 'Any Content',
            description: 'Create QR codes for URLs, text, emails, phone numbers'
          },
          {
            icon: '🎨',
            title: 'Customizable Size',
            description: 'Generate QR codes from 128px to 512px'
          },
          {
            icon: '💾',
            title: 'Download PNG',
            description: 'Save QR codes as high-quality PNG images'
          },
          {
            icon: '⚡',
            title: 'Instant Preview',
            description: 'See QR code update in real-time'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '📱',
            question: 'What is a QR code?',
            answer: 'QR (Quick Response) code is a 2D barcode that stores information like URLs, text, or contact details. Smartphones can scan QR codes with their camera to quickly access the stored information.'
          },
          {
            icon: '🔗',
            question: 'What can I encode in a QR code?',
            answer: 'QR codes can store URLs (websites), plain text, email addresses, phone numbers, SMS messages, WiFi credentials, contact information (vCard), and more. Maximum capacity is about 4,000 characters.'
          },
          {
            icon: '📐',
            question: 'What size should my QR code be?',
            answer: 'For print: 2-3cm minimum for business cards, larger for posters. For digital: 256px is good for screens. Larger QR codes are easier to scan from distance. Always test scanning before printing.'
          },
          {
            icon: '📱',
            question: 'How do I scan a QR code?',
            answer: 'Most smartphones can scan QR codes with the built-in camera app. Open your camera, point it at the QR code, and tap the notification that appears. Some phones may need a QR scanner app.'
          },
          {
            icon: '🔒',
            question: 'Are QR codes secure?',
            answer: 'QR codes themselves are just data. However, be cautious when scanning unknown QR codes as they might lead to malicious websites. Our generator creates standard QR codes with no tracking or analytics.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Create QR Codes</h2>
            <p className="text-gray-700 mb-4">
              Enter any text, URL, or information you want to encode. Select your desired size (128px-512px). Click Generate to create your QR code instantly. Download as PNG for use in print or digital materials.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">QR Code Use Cases</h3>
            <p className="text-gray-700 mb-4">
              Business cards and marketing materials, restaurant menus, product packaging, event tickets, WiFi sharing, payment links, contact information sharing, website URLs, social media profiles, and app downloads.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">QR Code Best Practices</h3>
            <p className="text-gray-700">
              Use high contrast (black on white), ensure adequate quiet zone (white space around code), test scanning before mass printing, keep URLs short when possible, avoid very small sizes for complex content, and always test with multiple devices.
            </p>
          </div>
        }
      >
        <div className="grid lg:grid-cols-2 gap-6">
          
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Content (URL, Text, Phone, Email...)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                rows={4}
                className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📐 Size: {size}×{size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="64"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>

            <button
              onClick={generateQR}
              disabled={!text}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📱 Generate QR Code
            </button>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Keep URLs short for better scannability. Test before printing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1">
                <span>💡</span>
                <span>Did You Know?</span>
              </h3>
              <div className="text-xs text-gray-700 space-y-0.5">
                <p>• QR codes were invented in 1994 by Denso Wave (Japan)</p>
                <p>• QR can store up to 4,296 alphanumeric characters</p>
                <p>• 30% of QR code can be damaged and still scan</p>
                <p>• China processes 6+ billion QR transactions daily</p>
              </div>
            </div>

          </div>

          <div className="space-y-4">
            
            {qrCode ? (
              <>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="text-xs font-semibold opacity-90 mb-3">Your QR Code</div>
                  <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center">
                    <img src={qrCode} alt="QR Code" className="max-w-full h-auto" />
                  </div>
                  <button
                    onClick={downloadQR}
                    className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
                  >
                    💾 Download PNG
                  </button>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">📊 QR Details</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-bold">{size}×{size}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Content Length:</span>
                      <span className="font-bold">{text.length} chars</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-bold">PNG</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-bold">
                        {text.startsWith('http') ? '🔗 URL' : 
                         text.includes('@') ? '📧 Email' : 
                         /^\d+$/.test(text) ? '📞 Phone' : '📝 Text'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3">
                  <h3 className="text-xs font-bold text-gray-900 mb-2">✅ Usage Tips</h3>
                  <div className="text-xs text-gray-700 space-y-0.5">
                    <p>• Test scanning before printing</p>
                    <p>• Use high contrast backgrounds</p>
                    <p>• Ensure adequate white space</p>
                    <p>• Larger codes = easier scanning</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">📱</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Generate</div>
                  <div className="text-6xl font-extrabold mb-2">⬜</div>
                  <p className="text-sm opacity-90">Enter content and click Generate</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Examples</h3>
                    <div className="text-left space-y-2 text-sm text-gray-700">
                      <p>🔗 <strong>Website:</strong> https://example.com</p>
                      <p>📧 <strong>Email:</strong> hello@example.com</p>
                      <p>📞 <strong>Phone:</strong> +1234567890</p>
                      <p>📝 <strong>Text:</strong> Any message here</p>
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