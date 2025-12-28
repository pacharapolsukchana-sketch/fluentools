import MainLayout from '@/app/components/layout/MainLayout'

export default function AboutUs() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Fluentools</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted source for free, accurate, and easy-to-use online calculators and conversion tools.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            At Fluentools, we believe that everyone should have access to powerful calculation tools without the hassle of downloads, registrations, or payments. Our mission is to provide fast, accurate, and user-friendly calculators that help you make informed decisions in your daily life—whether for finances, health, education, or business.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Calculators</h3>
              <p className="text-gray-600">
                Tip calculator, mortgage calculator, loan calculator, investment calculator, ROI calculator, and more to help you manage your finances.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health & Fitness</h3>
              <p className="text-gray-600">
                BMI calculator, calorie calculator, age calculator, pregnancy calculator, and other health tools to track your wellness journey.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl mb-3">🔢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Math & Science</h3>
              <p className="text-gray-600">
                Percentage calculator, ratio calculator, fraction calculator, and other math tools for students and professionals.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Converters</h3>
              <p className="text-gray-600">
                Currency converter, unit converter, time zone converter, and more to help you convert between different measurements.
              </p>
            </div>

          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-3xl">🆓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Always Free</h3>
                  <p className="text-gray-600">
                    No hidden costs, no subscriptions, no paywalls. All our tools are 100% free to use, forever.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-3xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-600">
                    All calculations happen in your browser. We never store, transmit, or have access to your personal data.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Simple</h3>
                  <p className="text-gray-600">
                    No registration required. Just visit, calculate, and get your results instantly. Clean interface, no clutter.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <span className="text-3xl">✅</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate & Reliable</h3>
                  <p className="text-gray-600">
                    We use verified formulas and regularly update our tools to ensure accuracy and reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <span className="text-3xl">📱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile-Friendly</h3>
                  <p className="text-gray-600">
                    Access our tools anywhere, anytime. Fully responsive design works perfectly on all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            Our Story
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Fluentools was born from a simple frustration: finding a reliable, free calculator online shouldn't require navigating through dozens of ads, pop-ups, and registration forms. We noticed that most calculator websites prioritized ad revenue over user experience, making simple tasks unnecessarily complicated.
            </p>
            <p>
              In 2024, we set out to change that. We built Fluentools with a user-first philosophy—clean design, fast performance, and zero barriers to access. What started as a small collection of basic calculators has grown into a comprehensive suite of tools used by thousands of people every day.
            </p>
            <p>
              Today, Fluentools serves users from over 100 countries, helping with everything from splitting dinner bills to planning mortgages, from tracking fitness goals to converting currencies. We're proud to be a trusted resource for people making important calculations in their daily lives.
            </p>
            <p>
              We're constantly adding new calculators based on user feedback and real-world needs. Our commitment remains unchanged: provide the best free calculation tools on the internet, with no compromises on quality or user experience.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Fluentools by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="text-center bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">23+</div>
              <div className="text-sm text-gray-600 font-semibold">Calculators</div>
            </div>

            <div className="text-center bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 font-semibold">Free Forever</div>
            </div>

            <div className="text-center bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-sm text-gray-600 font-semibold">Registration Required</div>
            </div>

            <div className="text-center bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-semibold">Available</div>
            </div>

          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-sm">
            <p className="text-lg text-gray-700 mb-4">
              We're a small but dedicated team passionate about creating tools that genuinely help people. Every feature we add, every design decision we make, starts with one question: "Will this make life easier for our users?"
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We're committed to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Keeping all tools free and accessible to everyone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Protecting your privacy—no data collection, no tracking beyond basic analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Regular updates and improvements based on user feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Adding new calculators that solve real problems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Maintaining fast load times and clean design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Thousands of Happy Users</h2>
          <p className="text-lg mb-6 opacity-90">
            Start using our free calculators today. No registration, no hidden costs, just simple tools that work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Browse All Calculators
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </MainLayout>
  )
}