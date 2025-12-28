export interface FeatureItem {
  icon: string
  title: string
  description: string
}

interface FeatureCardsProps {
  features: FeatureItem[]
  title?: string
}

export default function FeatureCards({ features, title = "✨ Key Features" }: FeatureCardsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>{title}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition"
          >
            <div className="text-4xl mb-3">
              {feature.icon}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}