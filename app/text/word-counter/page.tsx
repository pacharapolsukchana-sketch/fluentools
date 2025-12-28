'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/app/components/calculators/CalculatorLayout'
import { getSmartRelatedTools } from '@/app/lib/getRelatedTools'
import { generateStructuredData, generateFAQSchema, generateBreadcrumbSchema } from '@/app/lib/seoConfig'
import SEOWrapper from '@/app/components/seo/SEOWrapper'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  })

  const relatedTools = getSmartRelatedTools('word-counter', 3)

  useEffect(() => {
    if (!text) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      })
      return
    }

    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length
    const readingTime = Math.ceil(words / 200)
    const speakingTime = Math.ceil(words / 150)

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    })
  }, [text])

  // SEO Schemas
  const structuredData = generateStructuredData('word-counter')
  const faqSchema = generateFAQSchema([
    {
      question: 'How does word counting work?',
      answer: 'Our tool counts words by splitting text on whitespace. A word is any sequence of characters separated by spaces, tabs, or line breaks. Punctuation attached to words is included in the count.'
    },
    {
      question: 'What are common word limits?',
      answer: 'Twitter: 280 characters. Facebook post: 63,206 characters. Instagram caption: 2,200 characters. Essay: 500-1,000 words. Blog post: 1,500-2,000 words. Novel: 70,000-120,000 words.'
    },
    {
      question: 'How is reading time calculated?',
      answer: 'Average reading speed is 200-250 words per minute. Speaking speed is 120-150 words per minute. Our calculator uses 200 WPM for reading and 150 WPM for speaking to give you time estimates.'
    },
    {
      question: 'What counts as a sentence?',
      answer: 'A sentence is text ending with a period (.), exclamation mark (!), or question mark (?). Complex sentences with multiple clauses count as one sentence if they end with a single punctuation mark.'
    },
    {
      question: 'What is a paragraph?',
      answer: 'In our counter, paragraphs are separated by blank lines (double line breaks). A paragraph is a distinct section of text dealing with one point or theme. Single line breaks within text don\'t create new paragraphs.'
    }
  ])
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fluentools.com' },
    { name: 'Text Tools', url: 'https://fluentools.com/#text' },
    { name: 'Word Counter', url: 'https://fluentools.com/text/word-counter' }
  ])

  return (
    <SEOWrapper structuredData={structuredData} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema}>
      <CalculatorLayout
        title="Word Counter"
        description="Count words, characters, sentences, and paragraphs instantly. Perfect for essays, articles, social media posts, and content creation."
        icon="📄"
        gradient="from-orange-50 to-red-50"
        breadcrumbs={[
          { label: 'Text Tools', href: '/#text' },
          { label: 'Word Counter' }
        ]}
        features={[
          {
            icon: '📝',
            title: 'Word Count',
            description: 'Accurate word counting for any text'
          },
          {
            icon: '🔤',
            title: 'Character Count',
            description: 'Count with and without spaces'
          },
          {
            icon: '⏱️',
            title: 'Reading Time',
            description: 'Estimate reading and speaking time'
          },
          {
            icon: '📊',
            title: 'Detailed Stats',
            description: 'Words, sentences, paragraphs, and more'
          }
        ]}
        relatedTools={relatedTools}
        faqs={[
          {
            icon: '📝',
            question: 'How does word counting work?',
            answer: 'Our tool counts words by splitting text on whitespace. A word is any sequence of characters separated by spaces, tabs, or line breaks. Punctuation attached to words is included in the count.'
          },
          {
            icon: '📱',
            question: 'What are common word limits?',
            answer: 'Twitter: 280 characters. Facebook post: 63,206 characters. Instagram caption: 2,200 characters. Essay: 500-1,000 words. Blog post: 1,500-2,000 words. Novel: 70,000-120,000 words.'
          },
          {
            icon: '⏱️',
            question: 'How is reading time calculated?',
            answer: 'Average reading speed is 200-250 words per minute. Speaking speed is 120-150 words per minute. Our calculator uses 200 WPM for reading and 150 WPM for speaking to give you time estimates.'
          },
          {
            icon: '📊',
            question: 'What counts as a sentence?',
            answer: 'A sentence is text ending with a period (.), exclamation mark (!), or question mark (?). Complex sentences with multiple clauses count as one sentence if they end with a single punctuation mark.'
          },
          {
            icon: '📄',
            question: 'What is a paragraph?',
            answer: 'In our counter, paragraphs are separated by blank lines (double line breaks). A paragraph is a distinct section of text dealing with one point or theme. Single line breaks within text don\'t create new paragraphs.'
          }
        ]}
        seoContent={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Word Counter</h2>
            <p className="text-gray-700 mb-4">
              Type or paste your text into the text area. The word counter updates in real-time, showing character count, word count, sentence count, paragraph count, and estimated reading time. Perfect for writers, students, and content creators.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Common Use Cases</h3>
            <p className="text-gray-700 mb-4">
              Essays and academic papers (meet word requirements), blog posts and articles (optimize for SEO), social media posts (stay within character limits), speeches and presentations (estimate duration), resumes and cover letters (keep concise), and book writing (track progress).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Understanding Text Statistics</h3>
            <p className="text-gray-700">
              Character count includes all letters, numbers, punctuation, and spaces. Character count (no spaces) excludes whitespace. Word count splits on whitespace. Sentence count looks for ending punctuation. Average sentence length and word density help assess readability.
            </p>
          </div>
        }
      >
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📝 Enter or Paste Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              rows={16}
              className="w-full px-4 py-3 text-base font-medium text-gray-600 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 text-white shadow-lg text-center">
              <div className="text-3xl font-extrabold">{stats.words.toLocaleString()}</div>
              <div className="text-xs opacity-90 mt-1">Words</div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-4 text-white shadow-lg text-center">
              <div className="text-3xl font-extrabold">{stats.characters.toLocaleString()}</div>
              <div className="text-xs opacity-90 mt-1">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-4 text-white shadow-lg text-center">
              <div className="text-3xl font-extrabold">{stats.sentences.toLocaleString()}</div>
              <div className="text-xs opacity-90 mt-1">Sentences</div>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-4 text-white shadow-lg text-center">
              <div className="text-3xl font-extrabold">{stats.paragraphs.toLocaleString()}</div>
              <div className="text-xs opacity-90 mt-1">Paragraphs</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">📊 Detailed Statistics</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Characters (no spaces):</span>
                  <span className="font-bold">{stats.charactersNoSpaces.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reading time:</span>
                  <span className="font-bold">{stats.readingTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Speaking time:</span>
                  <span className="font-bold">{stats.speakingTime} min</span>
                </div>
                {stats.words > 0 && stats.sentences > 0 && (
                  <div className="flex justify-between">
                    <span>Avg. sentence length:</span>
                    <span className="font-bold">{(stats.words / stats.sentences).toFixed(1)} words</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">📱 Social Media Limits</h3>
                <div className="text-xs text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Twitter:</span>
                    <span className={stats.characters > 280 ? 'text-red-600 font-bold' : 'text-green-600'}>
                      {stats.characters}/280 {stats.characters > 280 ? '❌' : '✅'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Instagram:</span>
                    <span className={stats.characters > 2200 ? 'text-red-600 font-bold' : 'text-green-600'}>
                      {stats.characters}/2,200 {stats.characters > 2200 ? '❌' : '✅'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setText('')}
                  className="py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all"
                >
                  🗑️ Clear
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(text)}
                  disabled={!text}
                  className="py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                >
                  📋 Copy
                </button>
              </div>
            </div>

          </div>

        </div>
      </CalculatorLayout>
    </SEOWrapper>
  )
}