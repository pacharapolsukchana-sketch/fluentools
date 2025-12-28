// ไฟล์นี้เก็บข้อมูลเมนูทั้งหมด - แก้ที่เดียว อัพเดททุกหน้า!

export type Tool = {
  name: string
  href: string
  icon: string
  active?: boolean
}

export type Category = {
  id: string
  icon: string
  label: string
  tools: Tool[]
}

export type AllTool = {
  id: string
  name: string
  icon: string
  href: string
  color: string
  category: string
  description: string
  keywords: string[]
  isPopular: boolean
  isNew: boolean
}

export const categories: Category[] = [
  {
    id: 'finance',
    icon: '💰',
    label: 'Finance',
    tools: [
      { name: 'Mortgage Calculator', href: '/finance/mortgage', icon: '🏠' },
      { name: 'Loan Calculator', href: '/finance/loan', icon: '🏦' },
      { name: 'Discount Calculator', href: '/finance/discount', icon: '💰' },
      { name: 'Tip Calculator', href: '/finance/tip', icon: '💵' },
    ]
  },
  {
    id: 'health',
    icon: '🏥',
    label: 'Health',
    tools: [
      { name: 'BMI Calculator', href: '/health/bmi', icon: '⚖️' },
      { name: 'Calorie Calculator', href: '/health/calorie', icon: '🍎' },
      { name: 'Age Calculator', href: '/health/age', icon: '🎂' },
      { name: 'Period Calculator', href: '/health/period', icon: '🩸' },
      { name: 'Pregnancy Calculator', href: '/health/pregnancy', icon: '🤰' },
    ]
  },
  {
    id: 'math',
    icon: '🔢',
    label: 'Math',
    tools: [
      { name: 'Percentage Calculator', href: '/calculators/percentage', icon: '📊' },
      { name: 'Ratio Calculator', href: '/calculators/ratio', icon: '📐' },
    ]
  },
  {
    id: 'converters',
    icon: '🔄',
    label: 'Converters',
    tools: [
      { name: 'Length Converter', href: '/converters/length', icon: '📏' },
      { name: 'Weight Converter', href: '/converters/weight', icon: '⚖️' },
      { name: 'Temperature Converter', href: '/converters/temperature', icon: '🌡️' },
      { name: 'Currency Converter', href: '/converters/currency', icon: '💱' },
    ]
  },
  {
    id: 'datetime',
    icon: '📅',
    label: 'Date & Time',
    tools: [
      { name: 'Date Calculator', href: '/datetime/date-calculator', icon: '📆' },
      { name: 'Time Calculator', href: '/datetime/time-calculator', icon: '🕐' },
    ]
  },
  {
    id: 'business',
    icon: '💼',
    label: 'Business',
    tools: [
      { name: 'Salary Calculator', href: '/business/salary', icon: '💰' },
      { name: 'Tax Calculator', href: '/business/tax', icon: '🧾' },
    ]
  },
  {
    id: 'generators',
    icon: '🎲',
    label: 'Generators',
    tools: [
      { name: 'Password Generator', href: '/generators/password', icon: '🔐' },
      { name: 'QR Code Generator', href: '/generators/qr', icon: '📱' },
      { name: 'Random Number', href: '/generators/random-number', icon: '🎲' },
      { name: 'Random Picker', href: '/generators/random-picker', icon: '🎯' },
      { name: 'Dice Roller', href: '/generators/dice-roller', icon: '🎲' },
      { name: 'Card Shuffler', href: '/generators/card-shuffler', icon: '🃏' },
    ]
  },
  {
    id: 'text',
    icon: '📝',
    label: 'Text Tools',
    tools: [
      { name: 'Word Counter', href: '/text/word-counter', icon: '📄' },
    ]
  },
]

export const allTools: AllTool[] = [
  // Finance
  { 
    id: 'mortgage', 
    name: 'Mortgage Calculator', 
    icon: '🏠', 
    href: '/finance/mortgage', 
    color: 'emerald', 
    category: 'Finance',
    description: 'Calculate home loan payments with taxes and insurance',
    keywords: ['mortgage', 'home', 'loan', 'house', 'property', 'buy house'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'loan', 
    name: 'Loan Calculator', 
    icon: '🏦', 
    href: '/finance/loan', 
    color: 'indigo', 
    category: 'Finance',
    description: 'Calculate monthly payments for home, car, and personal loans',
    keywords: ['loan', 'payment', 'finance', 'borrow', 'car', 'personal', 'installment'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'discount', 
    name: 'Discount Calculator', 
    icon: '💰', 
    href: '/finance/discount', 
    color: 'amber', 
    category: 'Finance',
    description: 'Calculate sale prices, discounts, and savings instantly',
    keywords: ['discount', 'sale', 'savings', 'coupon', 'shopping', 'black friday'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'tip', 
    name: 'Tip Calculator', 
    icon: '💵', 
    href: '/finance/tip', 
    color: 'green', 
    category: 'Finance',
    description: 'Calculate tips and split bills easily with friends',
    keywords: ['tip', 'gratuity', 'restaurant', 'split', 'bill', 'dining'],
    isPopular: true,
    isNew: false
  },
  
  // Health
  { 
    id: 'bmi', 
    name: 'BMI Calculator', 
    icon: '⚖️', 
    href: '/health/bmi', 
    color: 'pink', 
    category: 'Health',
    description: 'Calculate your Body Mass Index and get health insights instantly',
    keywords: ['bmi', 'body', 'mass', 'index', 'weight', 'health', 'fitness', 'diet'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'calorie', 
    name: 'Calorie Calculator', 
    icon: '🍎', 
    href: '/health/calorie', 
    color: 'orange', 
    category: 'Health',
    description: 'Calculate daily calorie needs based on your goals and activity',
    keywords: ['calorie', 'calories', 'diet', 'tdee', 'nutrition', 'weight loss', 'fitness'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'age', 
    name: 'Age Calculator', 
    icon: '🎂', 
    href: '/health/age', 
    color: 'purple', 
    category: 'Health',
    description: 'Calculate your exact age in years, months, days, and more',
    keywords: ['age', 'birthday', 'years', 'old', 'how old', 'born'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'period', 
    name: 'Period Calculator', 
    icon: '🩸', 
    href: '/health/period', 
    color: 'red', 
    category: 'Health',
    description: 'Calculate next period, ovulation, and fertile window',
    keywords: ['period', 'ovulation', 'cycle', 'menstrual', 'fertile', 'safe days'],
    isPopular: true,
    isNew: true
  },
  { 
    id: 'pregnancy', 
    name: 'Pregnancy Calculator', 
    icon: '🤰', 
    href: '/health/pregnancy', 
    color: 'pink', 
    category: 'Health',
    description: 'Calculate due date and pregnancy timeline from last period',
    keywords: ['pregnancy', 'due date', 'trimester', 'LMP', 'baby', 'conception'],
    isPopular: true,
    isNew: true
  },
  
  // Math
  { 
    id: 'percentage', 
    name: 'Percentage Calculator', 
    icon: '📊', 
    href: '/calculators/percentage', 
    color: 'blue', 
    category: 'Math',
    description: 'Calculate any percentage quickly - increase, decrease, percentage change',
    keywords: ['percentage', 'percent', '%', 'calculate', 'increase', 'decrease', 'change'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'ratio', 
    name: 'Ratio Calculator', 
    icon: '📐', 
    href: '/calculators/ratio', 
    color: 'indigo', 
    category: 'Math',
    description: 'Simplify ratios, find missing values, and convert to percentages',
    keywords: ['ratio', 'proportion', 'fraction', 'scale', 'compare'],
    isPopular: true,
    isNew: false
  },
  
  // Converters
  { 
    id: 'length', 
    name: 'Length Converter', 
    icon: '📏', 
    href: '/converters/length', 
    color: 'cyan', 
    category: 'Converters',
    description: 'Convert between meters, feet, inches, and more',
    keywords: ['length', 'distance', 'convert', 'meter', 'feet', 'cm', 'inch', 'measurement'],
    isPopular: true,
    isNew: false
  },
  { 
    id: 'weight', 
    name: 'Weight Converter', 
    icon: '⚖️', 
    href: '/converters/weight', 
    color: 'pink', 
    category: 'Converters',
    description: 'Convert between kg, lbs, oz, and more',
    keywords: ['weight', 'mass', 'convert', 'kg', 'pound', 'gram', 'oz'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'temperature', 
    name: 'Temperature Converter', 
    icon: '🌡️', 
    href: '/converters/temperature', 
    color: 'orange', 
    category: 'Converters',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'convert', 'hot', 'cold'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'currency', 
    name: 'Currency Converter', 
    icon: '💱', 
    href: '/converters/currency', 
    color: 'emerald', 
    category: 'Converters',
    description: 'Convert between USD, EUR, THB, and 13 more currencies with live rates',
    keywords: ['currency', 'money', 'exchange', 'usd', 'eur', 'thb', 'convert', 'forex'],
    isPopular: true,
    isNew: true
  },

  // Date & Time
  { 
    id: 'date-calculator', 
    name: 'Date Calculator', 
    icon: '📆', 
    href: '/datetime/date-calculator', 
    color: 'blue', 
    category: 'Date & Time',
    description: 'Calculate days between dates, add/subtract dates, count business days',
    keywords: ['date', 'calendar', 'days', 'between', 'difference', 'add', 'subtract'],
    isPopular: true,
    isNew: true
  },
  { 
    id: 'time-calculator', 
    name: 'Time Calculator', 
    icon: '🕐', 
    href: '/datetime/time-calculator', 
    color: 'indigo', 
    category: 'Date & Time',
    description: 'Calculate time differences, add/subtract time, convert time zones',
    keywords: ['time', 'hours', 'minutes', 'difference', 'timezone', 'convert', 'duration'],
    isPopular: true,
    isNew: true
  },

  // Business
  { 
    id: 'salary', 
    name: 'Salary Calculator', 
    icon: '💰', 
    href: '/business/salary', 
    color: 'green', 
    category: 'Business',
    description: 'Convert between hourly, monthly, and annual salary with tax calculations',
    keywords: ['salary', 'wage', 'income', 'hourly', 'annual', 'monthly', 'pay'],
    isPopular: true,
    isNew: true
  },
  { 
    id: 'tax', 
    name: 'Tax Calculator', 
    icon: '🧾', 
    href: '/business/tax', 
    color: 'purple', 
    category: 'Business',
    description: 'Calculate income tax, sales tax, and VAT',
    keywords: ['tax', 'income tax', 'sales tax', 'vat', 'taxes'],
    isPopular: true,
    isNew: true
  },

  // Generators
  { 
    id: 'password', 
    name: 'Password Generator', 
    icon: '🔐', 
    href: '/generators/password', 
    color: 'purple', 
    category: 'Generators',
    description: 'Generate strong, secure, random passwords',
    keywords: ['password', 'generate', 'secure', 'random', 'strong'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'qr', 
    name: 'QR Code Generator', 
    icon: '📱', 
    href: '/generators/qr', 
    color: 'blue', 
    category: 'Generators',
    description: 'Create QR codes for URLs, text, and more',
    keywords: ['qr', 'qr code', 'generate', 'barcode', 'scan'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'random-number', 
    name: 'Random Number Generator', 
    icon: '🎲', 
    href: '/generators/random-number', 
    color: 'green', 
    category: 'Generators',
    description: 'Generate random numbers within any range',
    keywords: ['random', 'number', 'generate', 'rng', 'dice'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'random-picker', 
    name: 'Random Picker', 
    icon: '🎯', 
    href: '/generators/random-picker', 
    color: 'blue', 
    category: 'Generators',
    description: 'Pick random items from your list',
    keywords: ['random', 'picker', 'select', 'choose', 'raffle', 'winner'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'dice-roller', 
    name: 'Dice Roller', 
    icon: '🎲', 
    href: '/generators/dice-roller', 
    color: 'red', 
    category: 'Generators',
    description: 'Roll virtual dice online for games',
    keywords: ['dice', 'roll', 'd20', 'dnd', 'rpg', 'game', 'random'],
    isPopular: false,
    isNew: true
  },
  { 
    id: 'card-shuffler', 
    name: 'Card Shuffler', 
    icon: '🃏', 
    href: '/generators/card-shuffler', 
    color: 'blue', 
    category: 'Generators',
    description: 'Shuffle playing cards online',
    keywords: ['card', 'shuffle', 'deck', 'poker', 'blackjack', 'playing cards'],
    isPopular: false,
    isNew: true
  },

  // Text Tools
  { 
    id: 'word-counter', 
    name: 'Word Counter', 
    icon: '📄', 
    href: '/text/word-counter', 
    color: 'orange', 
    category: 'Text Tools',
    description: 'Count words, characters, sentences, and paragraphs',
    keywords: ['word', 'counter', 'count', 'character', 'text', 'length'],
    isPopular: false,
    isNew: true
  },
]