import Link from 'next/link'

export interface RelatedTool {
  name: string
  href: string
  icon: string
  description?: string
}

interface RelatedToolsProps {
  tools: RelatedTool[]
  title?: string
}

export default function RelatedTools({ tools, title = " 🎯 You Might Also Like" }: RelatedToolsProps) {
  const colorClasses = [
    'from-blue-50 to-indigo-50 border-blue-100 hover:border-blue-300',
    'from-emerald-50 to-green-50 border-emerald-100 hover:border-emerald-300',
    'from-pink-50 to-rose-50 border-pink-100 hover:border-pink-300',
    'from-orange-50 to-amber-50 border-orange-100 hover:border-orange-300',
    'from-purple-50 to-violet-50 border-purple-100 hover:border-purple-300',
    'from-cyan-50 to-teal-50 border-cyan-100 hover:border-cyan-300',
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>{title}</span>
      </h2>
      
      {/* เพิ่ม items-stretch เพื่อให้ทุก card สูงเท่ากัน */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="group flex"
          >
            {/* เพิ่ม flex-1 และ flex flex-col เพื่อให้ card ยืดเต็มความสูง */}
            <div 
              className={`flex-1 flex flex-col bg-gradient-to-br rounded-xl p-6 border-2 hover:shadow-lg transition-all ${colorClasses[index % colorClasses.length]}`}
            >
              <div className="text-3xl mb-3">
                {tool.icon}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                {tool.name}
              </h3>
              
              {/* เพิ่ม flex-1 เพื่อให้ description กินพื้นที่ที่เหลือ */}
              {tool.description && (
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {tool.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}