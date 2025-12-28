// Component สำหรับแสดง placeholder โฆษณาก่อนได้ AdSense approval

type AdSpaceProps = {
  slot: 'horizontal' | 'square' | 'vertical' | 'mobile'
  className?: string
  hideOnMobile?: boolean
}

export default function AdSpace({ slot, className = '', hideOnMobile = false }: AdSpaceProps) {
  // กำหนดขนาดตาม slot
  let sizeClasses = ''
  let label = ''
  
  switch(slot) {
    case 'horizontal':
      sizeClasses = 'h-[90px] max-w-[728px]'
      label = '728x90 - Leaderboard'
      break
    case 'square':
      sizeClasses = 'h-[250px] max-w-[300px]'
      label = '300x250 - Medium Rectangle'
      break
    case 'vertical':
      sizeClasses = 'h-[600px] max-w-[160px]'
      label = '160x600 - Wide Skyscraper'
      break
    case 'mobile':
      sizeClasses = 'h-[50px] max-w-[320px]'
      label = '320x50 - Mobile Banner'
      break
  }

  // เพิ่ม hide on mobile class
  const responsiveClass = hideOnMobile ? 'hidden md:flex' : 'flex'

  return (
    <div 
      className={`mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${responsiveClass} flex-col items-center justify-center text-gray-400 p-6 ${sizeClasses} ${className}`}
    >
      <div className="text-4xl mb-2">📢</div>
      <div className="font-semibold text-sm">Advertisement</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  )
}

// ===========================
// วิธีใช้ในหน้าต่างๆ:
// ===========================

/*
import AdSpace from '@/app/components/common/AdSpace'

// Desktop Leaderboard (บนสุดของหน้า) - ซ่อนใน mobile
<AdSpace slot="horizontal" className="my-6" hideOnMobile={true} />

// Medium Rectangle (ในเนื้อหา)
<AdSpace slot="square" className="my-6" />

// Wide Skyscraper (Sidebar) - ซ่อนใน mobile
<AdSpace slot="vertical" className="my-6" hideOnMobile={true} />

// Mobile Banner (แสดงเฉพาะ mobile)
<div className="md:hidden">
  <AdSpace slot="mobile" className="my-4" />
</div>

// หรือใช้ hideOnMobile แบบกลับด้าน (แสดงเฉพาะ mobile)
<div className="flex md:hidden">
  <AdSpace slot="mobile" className="my-4" />
</div>
*/

// ===========================
// แทนที่ด้วย Google AdSense จริงเมื่อได้ approval:
// ===========================

/*
export default function AdSpace({ slot, hideOnMobile = false }: AdSpaceProps) {
  const responsiveClass = hideOnMobile ? 'hidden md:block' : 'block'
  
  return (
    <div className={responsiveClass}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // ใส่ AdSense ID
        data-ad-slot="XXXXXXXXXX"                   // ใส่ Ad Slot ID
        data-ad-format={slot === 'horizontal' ? 'horizontal' : 'auto'}
      />
    </div>
  )
}

// เพิ่มใน layout.tsx หรือ app/layout.tsx:
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
></script>

// เพิ่มใน useEffect ของแต่ละหน้า (ถ้าใช้ client component):
useEffect(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    console.log(err);
  }
}, []);
*/