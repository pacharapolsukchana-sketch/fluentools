'use client'

import { useState } from 'react'

export interface FAQItem {
  question: string
  answer: string
  icon?: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
}

export default function FAQSection({ faqs, title = "❓ Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all hover:border-blue-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-3 font-semibold text-gray-900">
                {faq.icon && <span className="text-xl">{faq.icon}</span>}
                <span>{faq.question}</span>
              </span>
              
              <span 
                className={`text-xl text-blue-500 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 duration-200">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}