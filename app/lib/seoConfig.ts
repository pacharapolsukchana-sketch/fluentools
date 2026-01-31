// app/lib/seoConfig.ts
// Complete SEO configuration for all calculators
// UPDATED: Optimized titles & descriptions for higher CTR

export type CalculatorKey = 
  | 'percentage' 
  | 'ratio'
  | 'bmi' 
  | 'currency' 
  | 'age' 
  | 'tip' 
  | 'mortgage' 
  | 'loan' 
  | 'calorie' 
  | 'discount' 
  | 'weight'
  | 'length'
  | 'temperature'
  | 'random-number'
  | 'random-picker'
  | 'dice-roller'
  | 'card-shuffler'
  | 'period'
  | 'pregnancy'
  | 'password'
  | 'qr'
  | 'date-calculator'
  | 'time-calculator'
  | 'salary'
  | 'tax'
  | 'word-counter'

interface SEOConfig {
  title: string
  description: string
  keywords: string
  url: string
  category: string
  searchVolume: number
  schema: {
    name: string
    description: string
    category: 'Calculator' | 'Converter' | 'Generator'
  }
}

export const seoConfig: Record<CalculatorKey, SEOConfig> = {
  percentage: {
    title: "Free Percentage Calculator - Calculate % in Seconds (2026)",
    description: "Calculate any percentage instantly! No ads, no signup. Perfect for students, shoppers & business. Find percentage increase, decrease, and change. 100% free & accurate - try now!",
    keywords: "percentage calculator, percent calculator, percentage increase, percentage decrease, percentage change, calculate percentage, percent of number, what percent is",
    url: "/calculators/percentage",
    category: "Math",
    searchVolume: 450000,
    schema: {
      name: "Percentage Calculator",
      description: "Calculate percentages, increases, decreases, and percentage changes",
      category: "Calculator"
    }
  },

  ratio: {
    title: "Ratio Calculator - Simplify & Solve Ratios Instantly (2026)",
    description: "Simplify any ratio in seconds! Find missing values, convert to percentages. Perfect for cooking, math homework & design. No signup required - 100% free calculator!",
    keywords: "ratio calculator, simplify ratio, ratio to percentage, proportion calculator, ratio converter, find ratio, calculate ratio",
    url: "/calculators/ratio",
    category: "Math",
    searchVolume: 35000,
    schema: {
      name: "Ratio Calculator",
      description: "Simplify ratios and find missing values",
      category: "Calculator"
    }
  },

  bmi: {
    title: "BMI Calculator - Check Your Healthy Weight in 30 Seconds (2026)",
    description: "Are you at a healthy weight? Find out instantly! FREE BMI calculator with personalized health tips. Works for men & women. Results you can trust - used by 50,000+ monthly!",
    keywords: "bmi calculator, body mass index calculator, bmi chart, calculate bmi, bmi for men, bmi for women, healthy weight calculator, obesity calculator",
    url: "/health/bmi",
    category: "Health",
    searchVolume: 368000,
    schema: {
      name: "BMI Calculator",
      description: "Calculate Body Mass Index (BMI) and check healthy weight ranges",
      category: "Calculator"
    }
  },

  currency: {
    title: "Currency Converter - Live Exchange Rates (160+ Currencies)",
    description: "Convert 160+ currencies with LIVE exchange rates! USD, EUR, GBP, THB, JPY & more. Updated every 30 seconds. No fees, no hidden charges - 100% accurate & free!",
    keywords: "currency converter, exchange rate calculator, forex converter, usd to thb, eur to usd, currency exchange, live exchange rates, money converter",
    url: "/converters/currency",
    category: "Finance",
    searchVolume: 246000,
    schema: {
      name: "Currency Converter",
      description: "Convert between world currencies with live exchange rates",
      category: "Converter"
    }
  },

  age: {
    title: "Age Calculator - Find Your Exact Age (Years, Months, Days)",
    description: "How old are you EXACTLY? Calculate your age down to the second! Perfect for birthdays, anniversaries & legal documents. Instant results - no signup required!",
    keywords: "age calculator, calculate age, age between dates, how old am i, age difference calculator, birthday calculator, date of birth calculator",
    url: "/health/age",
    category: "Date & Time",
    searchVolume: 201000,
    schema: {
      name: "Age Calculator",
      description: "Calculate exact age in years, months, days from date of birth",
      category: "Calculator"
    }
  },

  tip: {
    title: "Tip Calculator - Calculate Tips & Split Bills (Fast & Easy)",
    description: "Never awkward at restaurants again! Calculate perfect tips for any bill. Split with friends instantly. Supports 10%, 15%, 18%, 20% & custom rates. Free forever!",
    keywords: "tip calculator, gratuity calculator, bill splitter, tip guide, restaurant tip calculator, calculate tip percentage, split bill calculator, tipping calculator",
    url: "/finance/tip",
    category: "Finance",
    searchVolume: 135000,
    schema: {
      name: "Tip Calculator",
      description: "Calculate tips and split bills easily with friends",
      category: "Calculator"
    }
  },

  mortgage: {
    title: "Mortgage Calculator - See Your REAL Monthly Payment (2026)",
    description: "Stop guessing! Calculate your TRUE mortgage payment including property tax, insurance & PMI. Save thousands with accurate estimates. No hidden costs - 100% transparent & free!",
    keywords: "mortgage calculator, home loan calculator, mortgage payment calculator, house payment calculator, mortgage with taxes, PMI calculator, property tax calculator, mortgage affordability",
    url: "/finance/mortgage",
    category: "Finance",
    searchVolume: 110000,
    schema: {
      name: "Mortgage Calculator",
      description: "Calculate home loan payments with taxes, insurance, and PMI",
      category: "Calculator"
    }
  },

  loan: {
    title: "Loan Calculator - Calculate Payments & Save Money (2026)",
    description: "Planning a loan? See your monthly payment, total interest & payoff date instantly! Compare loan terms to save thousands. Works for personal, auto & student loans. Free!",
    keywords: "loan calculator, personal loan calculator, auto loan calculator, loan payment calculator, interest calculator, amortization calculator, monthly payment calculator",
    url: "/finance/loan",
    category: "Finance",
    searchVolume: 90000,
    schema: {
      name: "Loan Calculator",
      description: "Calculate monthly loan payments and total interest",
      category: "Calculator"
    }
  },

  calorie: {
    title: "Calorie Calculator - Find Your Perfect Daily Calories (TDEE)",
    description: "Lose weight, gain muscle or maintain? Calculate your exact calorie needs based on YOUR body & activity. Get personalized results in 30 seconds. Free TDEE & BMR calculator!",
    keywords: "calorie calculator, tdee calculator, daily calorie needs, calories to lose weight, bmr calculator, calories burned calculator, macro calculator",
    url: "/health/calorie",
    category: "Health",
    searchVolume: 74000,
    schema: {
      name: "Calorie Calculator",
      description: "Calculate daily calorie needs and TDEE for weight goals",
      category: "Calculator"
    }
  },

  discount: {
    title: "Discount Calculator - Find Sale Prices & Savings Instantly",
    description: "Shopping? Calculate the REAL sale price instantly! See how much you save with any discount. Perfect for Black Friday, clearance sales & coupons. No math needed - free!",
    keywords: "discount calculator, sale price calculator, percent off calculator, savings calculator, price after discount, markdown calculator",
    url: "/finance/discount",
    category: "Finance",
    searchVolume: 60000,
    schema: {
      name: "Discount Calculator",
      description: "Calculate sale prices, discounts, and savings",
      category: "Calculator"
    }
  },

  weight: {
    title: "Weight Converter - Convert kg, lbs, stones (Instant Results)",
    description: "Convert weight instantly! Kilograms, pounds, stones, ounces & more. Perfect for cooking, fitness & shipping. Works worldwide - metric & imperial. Free converter!",
    keywords: "weight converter, kg to lbs, lbs to kg, weight conversion, kilograms to pounds, pounds to kilograms, convert weight",
    url: "/converters/weight",
    category: "Converters",
    searchVolume: 55000,
    schema: {
      name: "Weight Converter",
      description: "Convert between weight units - kg, lbs, stones, ounces",
      category: "Converter"
    }
  },

  length: {
    title: "Length Converter - Convert cm, inches, feet, meters (Fast)",
    description: "Convert any length instantly! Centimeters, inches, feet, meters & more. Perfect for DIY, construction & travel. No complicated formulas - just enter & convert. Free!",
    keywords: "length converter, cm to inches, feet to meters, inches to cm, meters to feet, distance converter, convert length",
    url: "/converters/length",
    category: "Converters",
    searchVolume: 50000,
    schema: {
      name: "Length Converter",
      description: "Convert between length units - cm, inches, feet, meters",
      category: "Converter"
    }
  },

  temperature: {
    title: "Temperature Converter - Convert °C, °F, K (Instant & Accurate)",
    description: "Convert temperatures instantly! Celsius, Fahrenheit & Kelvin in one click. Perfect for cooking, weather & science. Accurate to 2 decimal places. Free converter!",
    keywords: "temperature converter, celsius to fahrenheit, fahrenheit to celsius, c to f, f to c, kelvin converter, temp converter",
    url: "/converters/temperature",
    category: "Converters",
    searchVolume: 45000,
    schema: {
      name: "Temperature Converter",
      description: "Convert between Celsius, Fahrenheit, and Kelvin",
      category: "Converter"
    }
  },

  'random-number': {
    title: "Random Number Generator - Generate Random Numbers (1-10000)",
    description: "Need a random number? Generate instantly from any range! Perfect for games, raffles, passwords & decisions. Cryptographically secure. Free random generator!",
    keywords: "random number generator, random number, number generator, random picker, lottery number generator, dice roller",
    url: "/generators/random-number",
    category: "Generators",
    searchVolume: 40000,
    schema: {
      name: "Random Number Generator",
      description: "Generate random numbers within any range",
      category: "Generator"
    }
  },

  'random-picker': {
    title: "Random Picker - Choose Random Names, Winners & Items",
    description: "Can't decide? Let us pick for you! Random name picker for raffles, teams & giveaways. Fair & unbiased selection. Perfect for teachers & organizers. Free!",
    keywords: "random picker, name picker, random name generator, random selector, team picker, winner picker, random choice",
    url: "/generators/random-picker",
    category: "Generators",
    searchVolume: 35000,
    schema: {
      name: "Random Picker",
      description: "Randomly select items or names from a list",
      category: "Generator"
    }
  },

  'dice-roller': {
    title: "Dice Roller - Roll Virtual Dice Online (D6, D20 & More)",
    description: "Roll dice instantly! D6, D20, D100 & custom dice. Perfect for D&D, board games & probability. Realistic physics. No physical dice needed - free virtual dice roller!",
    keywords: "dice roller, roll dice, virtual dice, d20 roller, dice simulator, d6 dice, online dice, dnd dice",
    url: "/generators/dice-roller",
    category: "Generators",
    searchVolume: 30000,
    schema: {
      name: "Dice Roller",
      description: "Roll virtual dice with various configurations",
      category: "Generator"
    }
  },

  'card-shuffler': {
    title: "Card Shuffler - Shuffle Playing Cards Online (52 Deck)",
    description: "Shuffle cards perfectly every time! Virtual 52-card deck for poker, solitaire & card games. Truly random algorithm. No physical cards needed - free online shuffler!",
    keywords: "card shuffler, shuffle cards, playing cards, deck shuffler, random cards, card randomizer, online cards",
    url: "/generators/card-shuffler",
    category: "Generators",
    searchVolume: 25000,
    schema: {
      name: "Card Shuffler",
      description: "Shuffle a virtual deck of playing cards",
      category: "Generator"
    }
  },

  period: {
    title: "Period Calculator - Track Your Cycle & Predict Next Period",
    description: "Know when your next period is coming! Track your menstrual cycle accurately. Calculate fertile days & ovulation. Private & secure. Used by 30,000+ women. Free!",
    keywords: "period calculator, menstrual cycle calculator, period tracker, ovulation calculator, fertile days, next period, cycle tracker",
    url: "/health/period",
    category: "Health",
    searchVolume: 55000,
    schema: {
      name: "Period Calculator",
      description: "Calculate menstrual cycle and predict next period",
      category: "Calculator"
    }
  },

  pregnancy: {
    title: "Pregnancy Calculator - Find Your Due Date & Week by Week",
    description: "Pregnant? Calculate your due date & track each week! See baby's development, size & milestones. Based on last period or conception date. Trusted by 40,000+ moms. Free!",
    keywords: "pregnancy calculator, due date calculator, pregnancy week calculator, conception calculator, baby due date, pregnancy tracker",
    url: "/health/pregnancy",
    category: "Health",
    searchVolume: 65000,
    schema: {
      name: "Pregnancy Calculator",
      description: "Calculate pregnancy due date and track progress",
      category: "Calculator"
    }
  },

  password: {
    title: "Password Generator - Create Strong Passwords (Secure & Random)",
    description: "Need a strong password? Generate ultra-secure passwords instantly! Customize length, symbols & numbers. Perfect for accounts, WiFi & security. Never reuse passwords - free!",
    keywords: "password generator, random password, strong password, secure password, password creator, generate password",
    url: "/generators/password",
    category: "Generators",
    searchVolume: 60000,
    schema: {
      name: "Password Generator",
      description: "Generate strong secure passwords",
      category: "Generator"
    }
  },

  qr: {
    title: "QR Code Generator - Create Free QR Codes (Download PNG)",
    description: "Create QR codes in seconds! For URLs, WiFi, text & contact info. Download as PNG instantly. Perfect for business cards, menus & marketing. No signup - 100% free!",
    keywords: "qr code generator, create qr code, qr generator, make qr code, qr code maker, free qr code",
    url: "/generators/qr",
    category: "Generators",
    searchVolume: 80000,
    schema: {
      name: "QR Code Generator",
      description: "Create QR codes for URLs and text",
      category: "Generator"
    }
  },

  'date-calculator': {
    title: "Date Calculator - Count Days Between Dates & Add/Subtract",
    description: "How many days until...? Calculate days between any dates instantly! Add or subtract days, weeks, months. Count business days. Perfect for deadlines & planning. Free!",
    keywords: "date calculator, days between dates, date difference calculator, add days to date, subtract days, business days calculator",
    url: "/datetime/date-calculator",
    category: "Date & Time",
    searchVolume: 55000,
    schema: {
      name: "Date Calculator",
      description: "Calculate days between dates and perform date arithmetic",
      category: "Calculator"
    }
  },

  'time-calculator': {
    title: "Time Calculator - Add, Subtract & Convert Time (Easy & Fast)",
    description: "Calculate time like a pro! Add hours, subtract minutes, convert formats. Perfect for timesheets, cooking & time zones. Works 24/7 - no time zone confusion. Free!",
    keywords: "time calculator, time difference, add time, subtract time, hours calculator, time duration, time zone converter",
    url: "/datetime/time-calculator",
    category: "Date & Time",
    searchVolume: 45000,
    schema: {
      name: "Time Calculator",
      description: "Calculate time differences and durations",
      category: "Calculator"
    }
  },

  salary: {
    title: "Salary Calculator - Convert Hourly to Annual (& Vice Versa)",
    description: "Converting job offers? Calculate hourly ↔ annual salary instantly! See take-home pay after taxes. Compare offers easily. Perfect for job seekers & employers. Free!",
    keywords: "salary calculator, hourly to annual, annual to hourly, monthly salary, wage calculator, paycheck calculator, income converter",
    url: "/business/salary",
    category: "Business",
    searchVolume: 50000,
    schema: {
      name: "Salary Calculator",
      description: "Convert between salary periods and calculate take-home pay",
      category: "Calculator"
    }
  },

  tax: {
    title: "Tax Calculator - Calculate Income Tax & Sales Tax (2026)",
    description: "Don't overpay taxes! Calculate income tax, sales tax & VAT instantly. See deductions, credits & refunds. Plan ahead & save money. Updated for 2026 tax rules. Free!",
    keywords: "tax calculator, income tax calculator, sales tax, vat calculator, tax refund, tax bracket calculator, calculate taxes",
    url: "/business/tax",
    category: "Business",
    searchVolume: 70000,
    schema: {
      name: "Tax Calculator",
      description: "Calculate income tax, sales tax, and VAT",
      category: "Calculator"
    }
  },

  'word-counter': {
    title: "Word Counter - Count Words & Characters (Real-Time & Free)",
    description: "Write with confidence! Count words, characters & reading time as you type. Perfect for essays, SEO, Twitter & articles. No copy-paste needed - just type & go. Free forever!",
    keywords: "word counter, character counter, word count, character count, sentence counter, text counter, essay word count",
    url: "/text/word-counter",
    category: "Text Tools",
    searchVolume: 90000,
    schema: {
      name: "Word Counter",
      description: "Count words, characters, and sentences",
      category: "Calculator"
    }
  },
}

// Helper function to generate metadata
export function generateMetadata(key: CalculatorKey) {
  const config = seoConfig[key]
  const baseUrl = 'https://fluentools.com'
  
  return {
    title: `${config.title} | Fluentools`,
    description: config.description,
    keywords: config.keywords,
    
    openGraph: {
      title: `${config.title} | Fluentools`,
      description: config.description,
      url: `${baseUrl}${config.url}`,
      siteName: 'Fluentools',
      type: 'website' as const,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image' as const,
      title: `${config.title} | Fluentools`,
      description: config.description,
      images: [`${baseUrl}/og-image.png`],
    },

    alternates: {
      canonical: `${baseUrl}${config.url}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

// Helper function to generate structured data
export function generateStructuredData(key: CalculatorKey) {
  const config = seoConfig[key]
  const baseUrl = 'https://fluentools.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.schema.name,
    description: config.schema.description,
    url: `${baseUrl}${config.url}`,
    applicationCategory: `${config.schema.category}Application`,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Fluentools',
      url: baseUrl,
    },
  }
}

// Helper function to generate FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Helper function to generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}