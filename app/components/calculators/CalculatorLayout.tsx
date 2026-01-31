import MainLayout from '../layout/MainLayout'
import HeroSection from '../common/HeroSection'
import FeatureCards, { FeatureItem } from '../common/FeatureCards'
import RelatedTools, { RelatedTool } from '../common/RelatedTools'
import FAQSection, { FAQItem } from '../common/FAQSection'
import AdSpace from '../common/AdSpace'

interface CalculatorLayoutProps {
  title: string
  description: string
  icon?: string
  gradient?: string
  breadcrumbs?: any // Keep for compatibility but won't use
  children: React.ReactNode
  features?: FeatureItem[]
  relatedTools?: RelatedTool[]
  faqs?: FAQItem[]
  seoContent?: React.ReactNode
}

export default function CalculatorLayout({
  title,
  description,
  icon,
  gradient,
  children,
  features,
  relatedTools,
  faqs,
  seoContent,
}: CalculatorLayoutProps) {
  return (
    <MainLayout>
      <div className="w-full mx-auto px-3 md:px-4 lg:px-6 py-4 md:py-6 max-w-7xl">
        
        <HeroSection
          icon={icon}
          title={title}
          description={description}
          gradient={gradient}
        />

        {/* Top Ad - Horizontal Banner - Desktop only */}
        <AdSpace 
          slot="4008645655" 
          format="horizontal"
          hideOnMobile={true}
        />

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
          
          {/* CALCULATOR CONTENT */}
          <div className="lg:col-span-9 space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4 lg:p-6 shadow-sm">
              {children}
            </div>

            {/* In-content Ad - Mobile & Tablet */}
            <div className="lg:hidden">
              <AdSpace 
                slot="4008645655" 
                format="rectangle"
              />
            </div>
          </div>

          {/* SIDEBAR AD - Desktop only */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <AdSpace 
                slot="4008645655" 
                format="rectangle"
              />
            </div>
          </div>
        </div>

        {/* RELATED TOOLS */}
        {relatedTools && relatedTools.length > 0 && (
          <RelatedTools tools={relatedTools} />
        )}

        {/* FEATURES */}
        {features && features.length > 0 && (
          <FeatureCards features={features} />
        )}

        {/* SEO CONTENT */}
        {seoContent && (
          <div className="mb-4 md:mb-6 prose prose-sm md:prose-base prose-gray max-w-none">
            <div className="bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4 lg:p-6">
              {seoContent}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <FAQSection faqs={faqs} />
        )}

        {/* Bottom Ad - Horizontal Banner - All devices */}
        <div className="mt-4 md:mt-6">
          <AdSpace 
            slot="4008645655" 
            format="horizontal"
          />
        </div>

      </div>
    </MainLayout>
  )
}