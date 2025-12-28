import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛠️</span>
              <h3 className="font-bold text-lg">Fluentools</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Free online calculators and tools for everyday use
            </p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-bold text-lg mb-4">Popular</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/finance/tip" className="text-gray-400 hover:text-white transition">
                  Tip Calculator
                </Link>
              </li>
              <li>
                <Link href="/health/bmi" className="text-gray-400 hover:text-white transition">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/finance/mortgage" className="text-gray-400 hover:text-white transition">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/generators/qr" className="text-gray-400 hover:text-white transition">
                  QR Code Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#finance" className="text-gray-400 hover:text-white transition">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/#health" className="text-gray-400 hover:text-white transition">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/#converters" className="text-gray-400 hover:text-white transition">
                  Converters
                </Link>
              </li>
              <li>
                <Link href="/#generators" className="text-gray-400 hover:text-white transition">
                  Generators
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - อัพเดทลิงก์ให้ถูกต้อง */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Fluentools.com - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}