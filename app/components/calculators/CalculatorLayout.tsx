import MainLayout from '../layout/MainLayout'
import Breadcrumb, { BreadcrumbItem } from '../common/Breadcrumb'
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
  breadcrumbs: BreadcrumbItem[]
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
  breadcrumbs,
  children,
  features,
  relatedTools,
  faqs,
  seoContent,
}: CalculatorLayoutProps) {
  return (
    <MainLayout>
      {/* RESPONSIVE CONTAINER - ใช้ w-full และ max-w ที่เหมาะสม */}
      <div className="w-full mx-auto px-3 md:px-4 lg:px-6 py-4 md:py-6 max-w-7xl">
        
        <Breadcrumb items={breadcrumbs} />
        
        <HeroSection
          icon={icon}
          title={title}
          description={description}
          gradient={gradient}
        />

        {/* MAIN GRID - responsive ตามขนาดหน้าจอ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
          
          {/* CALCULATOR CONTENT - responsive padding */}
          <div className="lg:col-span-10 space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4 lg:p-6 shadow-sm">
              {children}
            </div>

            {/* Ad - Desktop only */}
            <div className="hidden lg:block">
              <AdSpace slot="horizontal" />
            </div>
          </div>

          {/* SIDEBAR AD - Desktop only */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-20">
              <AdSpace slot="square" />
            </div>
          </div>
        </div>

        {/* Ad - Mobile only */}
        <div className="lg:hidden mb-4 md:mb-6">
          <AdSpace slot="square" />
        </div>

        {/* RELATED TOOLS - responsive grid */}
        {relatedTools && relatedTools.length > 0 && (
          <RelatedTools tools={relatedTools} />
        )}

        {/* FEATURES - responsive grid */}
        {features && features.length > 0 && (
          <FeatureCards features={features} />
        )}

        {/* SEO CONTENT - responsive padding */}
        {seoContent && (
          <div className="mb-4 md:mb-6 prose prose-sm md:prose-base prose-gray max-w-none">
            <div className="bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4 lg:p-6">
              {seoContent}
            </div>
          </div>
        )}

        {/* FAQ - responsive */}
        {faqs && faqs.length > 0 && (
          <FAQSection faqs={faqs} />
        )}

        {/* Bottom Ad - hide on mobile */}
        <div className="mt-4 md:mt-6 hidden md:block">
          <AdSpace slot="horizontal" />
        </div>

      </div>
    </MainLayout>
  )
}