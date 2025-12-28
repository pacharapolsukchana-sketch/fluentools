import MainLayout from '@/app/components/layout/MainLayout'

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: December 23, 2024</p>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to Fluentools ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website fluentools.com.
            </p>
            <p>
              By using our website, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Automatically Collected Information</h3>
            <p>
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Log Data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, and time/date stamps</li>
              <li><strong>Device Information:</strong> Device type, unique device identifiers, mobile network information</li>
              <li><strong>Usage Data:</strong> How you interact with our calculators and tools, which features you use, time spent on pages</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Calculator Input Data</h3>
            <p>
              All calculations are performed locally in your browser. We do not store, transmit, or have access to any values you enter into our calculators. Your calculation data remains private and is never sent to our servers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
            </p>
            <p>
              Types of cookies we use:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (see Section 3)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-Party Advertising</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Google AdSense</h3>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a> or by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Google Analytics</h3>
            <p>
              We use Google Analytics to analyze website traffic and usage patterns. Google Analytics collects information such as how often users visit the site, what pages they visit, and what other sites they used prior to coming to our site.
            </p>
            <p>
              You can opt-out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website and calculators</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new features, products, services, and functionality</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Google Analytics, Google AdSense, and other third-party vendors who assist in operating our website</li>
              <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Opt-out of marketing communications and personalized advertising</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information in Section 10.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside Thailand and choose to provide information to us, please note that we transfer the data to Thailand and process it there.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:pacharapolsukchana@gmail.com" className="text-blue-600 hover:underline">pacharapolsukchana@gmail.com</a></li>
              <li><strong>Website:</strong> <a href="/contact" className="text-blue-600 hover:underline">fluentools.com/contact</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. GDPR Compliance (European Users)</h2>
            <p>
              If you are from the European Economic Area (EEA), Fluentools' legal basis for collecting and using your personal information depends on the context:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You have given us permission to do so</li>
              <li>The processing is in our legitimate interests</li>
              <li>To comply with the law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to non-discrimination for exercising your CCPA rights</li>
            </ul>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mt-12">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This Privacy Policy is designed to be compliant with Google AdSense requirements, GDPR, and CCPA regulations. By using Fluentools, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}