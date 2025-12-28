interface HeroSectionProps {
  icon?: string
  title: string
  description: string
  gradient?: string
}

export default function HeroSection({ 
  icon, 
  title, 
  description,
  gradient = 'from-blue-50 to-indigo-50'
}: HeroSectionProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 md:p-8 mb-6 border-2 border-gray-100`}>
      <div className="max-w-3xl">
        {icon && (
          <div className="text-4xl md:text-5xl mb-3">
            {icon}
          </div>
        )}
        
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {title}
        </h1>
        
        <p className="text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}