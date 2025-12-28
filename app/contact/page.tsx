import MainLayout from '@/app/components/layout/MainLayout'

export default function ContactUs() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-12">
          We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-3xl">📧</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-2">
                    For all inquiries and support:
                  </p>
                  <a href="mailto:pacharapolsukchana@gmail.com" className="text-blue-600 hover:underline font-semibold">
                    pacharapolsukchana@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-3xl">⏰</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-gray-600">
                    We typically respond within 24-48 hours during business days (Monday-Friday, 9AM-6PM GMT+7).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-3xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Website</h3>
                  <a href="https://fluentools.com" className="text-blue-600 hover:underline font-semibold">
                    www.fluentools.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white text-gray-900 font-semibold"
                  style={{ color: '#111827' }}
                >
                  <option value="" style={{ color: '#9CA3AF' }}>Select a topic</option>
                  <option value="general" style={{ color: '#111827' }}>General Inquiry</option>
                  <option value="feedback" style={{ color: '#111827' }}>Feedback</option>
                  <option value="bug" style={{ color: '#111827' }}>Report a Bug</option>
                  <option value="feature" style={{ color: '#111827' }}>Feature Request</option>
                  <option value="business" style={{ color: '#111827' }}>Business Partnership</option>
                  <option value="other" style={{ color: '#111827' }}>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ❓ Are the calculators free to use?
              </h3>
              <p className="text-gray-700">
                Yes! All calculators and tools on Fluentools are completely free. No registration or payment required.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🔒 Is my data stored?
              </h3>
              <p className="text-gray-700">
                No. All calculations are performed locally in your browser. We don't store or have access to any values you enter.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📱 Can I use Fluentools on mobile?
              </h3>
              <p className="text-gray-700">
                Absolutely! Our website is fully responsive and works great on smartphones, tablets, and desktops.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💡 Can I suggest a new calculator?
              </h3>
              <p className="text-gray-700">
                Yes! We love hearing feature requests. Use the contact form above and select "Feature Request" to share your ideas.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🐛 I found a bug. How do I report it?
              </h3>
              <p className="text-gray-700">
                Please use the contact form above and select "Report a Bug." Include as much detail as possible (browser, device, steps to reproduce).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🤝 Can I partner with Fluentools?
              </h3>
              <p className="text-gray-700">
                We're open to partnerships! Email us at <a href="mailto:pacharapolsukchana@gmail.com" className="text-blue-600 hover:underline">pacharapolsukchana@gmail.com</a> with your proposal.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Support */}
        <div className="mt-12 bg-white rounded-xl border-2 border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Connect</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">
                Check our calculator guides and tutorials for detailed instructions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">
                Coming soon! Real-time support chat will be available on all pages.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔔</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Updates</h3>
              <p className="text-sm text-gray-600">
                Follow our updates page to stay informed about new calculators and features.
              </p>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  )
}