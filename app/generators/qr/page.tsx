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
  const [isGenerating, setIsGenerating] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const relatedTools = getSmartRelatedTools('qr', 3)

  const generateQR = () => {
    if (!text) return
    
    setIsGenerating(true)
    const qrSize = parseInt(size) || 256
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}`
    setQrCode(qrUrl)
  }

  const downloadQR = async () => {
    if (!qrCode || !imgRef.current) return
    
    try {
      const img = imgRef.current
      const qrSize = parseInt(size)
      
      // Create canvas with padding for frame + extra white space
      const framePadding = 40  // padding inside frame
      const whitePadding = 30  // extra white space outside frame
      const totalPadding = framePadding + whitePadding
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = qrSize + (framePadding * 2) + (whitePadding * 2)
      canvas.height = qrSize + (framePadding * 2) + (whitePadding * 2)

      // Draw outer white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw black border with rounded corners (with offset for white padding)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.roundRect(whitePadding + 4, whitePadding + 4, 
                    qrSize + (framePadding * 2) - 8, 
                    qrSize + (framePadding * 2) - 8, 
                    20)  // radius for rounded corners
      ctx.stroke()

      // Draw shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2

      // Draw QR code
      ctx.drawImage(img, totalPadding, totalPadding, qrSize, qrSize)

      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Add small text at bottom (centered in frame)
      ctx.fillStyle = '#6B7280'
      ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Scan Me', canvas.width / 2, canvas.height - totalPadding + 28)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return
        
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `qrcode-framed-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (error) {
      console.error('Download failed:', error)
    }
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
            title: 'Beautiful Frame',
            description: 'Download with professional gradient frame'
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
              Enter any text, URL, or information you want to encode. Select your desired size (128px-512px). Click Generate to create your QR code instantly. Download as PNG with beautiful frame for use in print or digital materials.
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
              disabled={!text || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? '⏳ Generating...' : '📱 Generate QR Code'}
            </button>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>✨ New!</strong> Download includes professional gradient frame with "Scan Me" text
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
                  <div className="text-xs font-semibold opacity-90 mb-3">Your QR Code Preview</div>
                  
                  {/* Preview with Frame - CHANGED TO BLACK */}
                  <div className="bg-white rounded-lg p-2 mb-4">
                    <div className="relative border-[8px] border-black rounded-lg bg-white">
                      <div className="bg-white p-4 rounded shadow-sm flex items-center justify-center flex-col">
                        <img 
                          ref={imgRef}
                          src={qrCode} 
                          alt="QR Code" 
                          className="max-w-full h-auto"
                          crossOrigin="anonymous"
                          onLoad={() => setIsGenerating(false)}
                        />
                        <p className="text-[8px] text-gray-500 mt-2">Scan Me</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadQR}
                    className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
                  >
                    💾 Download with Frame
                  </button>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">📊 QR Details</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>QR Size:</span>
                      <span className="font-bold">{size}×{size}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Final Size:</span>
                      <span className="font-bold">{parseInt(size) + 80}×{parseInt(size) + 80}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Content:</span>
                      <span className="font-bold">{text.length} chars</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-bold">PNG + Frame</span>
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
                  <h3 className="text-xs font-bold text-gray-900 mb-2">✅ Frame Features</h3>
                  <div className="text-xs text-gray-700 space-y-0.5">
                    <p>• Professional gradient border</p>
                    <p>• White padding for easy scanning</p>
                    <p>• Subtle shadow effect</p>
                    <p>• "Scan Me" text included</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-8 text-center text-white shadow-lg">
                  <div className="text-5xl mb-3">📱</div>
                  <div className="text-sm font-semibold opacity-90 mb-3">Ready to Generate</div>
                  <div className="text-6xl font-extrabold mb-2">🖼️</div>
                  <p className="text-sm opacity-90">QR Code with Beautiful Frame</p>
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