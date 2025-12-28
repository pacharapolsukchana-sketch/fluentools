// app/lib/seoConfig.ts
// Complete SEO configuration for all calculators

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
    title: "Percentage Calculator - Calculate Percentages Instantly",
    description: "Free percentage calculator. Calculate percentages, increases, decreases, and percentage changes instantly. Find what percent, percentage of a number, and percentage change. Fast, accurate, easy to use.",
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
    title: "Ratio Calculator - Simplify Ratios & Find Missing Values",
    description: "Free ratio calculator. Simplify ratios, find missing values, convert ratios to percentages. Perfect for math, recipes, and proportions. Fast and accurate ratio calculations.",
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
    title: "BMI Calculator - Body Mass Index Calculator with Chart",
    description: "Free BMI calculator. Calculate your Body Mass Index (BMI) using metric or imperial units. Check if you're underweight, normal weight, overweight, or obese. Includes BMI chart and healthy weight ranges.",
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
    title: "Currency Converter - Live Exchange Rates & Forex Calculator",
    description: "Free currency converter with live exchange rates. Convert between 160+ world currencies including USD, EUR, GBP, JPY, THB. Real-time forex conversion updated every 30 seconds. Fast and accurate.",
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
    title: "Age Calculator - Calculate Your Exact Age in Years, Months, Days",
    description: "Free age calculator. Calculate your exact age in years, months, weeks, days, hours, and minutes. Find age difference between dates. Perfect for birthdays, anniversaries, and age verification.",
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
    title: "Tip Calculator - Calculate Tips & Split Bills Easily",
    description: "Free tip calculator. Calculate gratuity and split bills with friends. Supports 10%, 15%, 18%, 20% custom tip rates. Perfect for restaurants, deliveries, and service tipping. Fast and accurate.",
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
    title: "Mortgage Calculator - Calculate Home Loan Payments with Taxes & Insurance",
    description: "Free mortgage calculator with taxes and insurance. Calculate monthly home loan payments, total interest, and affordability. Includes PMI, property tax, HOA fees. Compare 15, 20, and 30-year mortgages.",
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
    title: "Loan Calculator - Calculate Monthly Payments & Total Interest",
    description: "Free loan calculator. Calculate monthly payments for personal loans, auto loans, student loans. See total interest, payoff date, and amortization schedule. Compare different loan terms and rates.",
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
    title: "Calorie Calculator - TDEE & Daily Calorie Needs Calculator",
    description: "Free calorie calculator. Calculate your Total Daily Energy Expenditure (TDEE) and daily calorie needs for weight loss, maintenance, or muscle gain. Based on age, weight, height, activity level.",
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
    title: "Discount Calculator - Calculate Sale Prices & Savings Instantly",
    description: "Free discount calculator. Calculate sale prices, discounts, and savings instantly. Find final price after discount, percentage off, and amount saved. Perfect for shopping and sales.",
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
    title: "Weight Converter - Convert kg, lbs, stones, ounces",
    description: "Free weight converter. Convert between kilograms, pounds, stones, ounces, grams, and tons. Instant weight conversion for cooking, shipping, fitness. Metric and imperial units.",
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
    title: "Length Converter - Convert Meters, Feet, Inches, Kilometers",
    description: "Free length converter. Convert between meters, feet, inches, kilometers, miles, centimeters, and more. Instant distance conversion for construction, travel, sports. Metric and imperial units.",
    keywords: "length converter, distance converter, meters to feet, feet to meters, inches to cm, km to miles, length conversion",
    url: "/converters/length",
    category: "Converters",
    searchVolume: 50000,
    schema: {
      name: "Length Converter",
      description: "Convert between length and distance units",
      category: "Converter"
    }
  },

  temperature: {
    title: "Temperature Converter - Celsius, Fahrenheit, Kelvin Converter",
    description: "Free temperature converter. Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K) instantly. Accurate temperature conversion for cooking, weather, science.",
    keywords: "temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter, temperature conversion, c to f, f to c",
    url: "/converters/temperature",
    category: "Converters",
    searchVolume: 40000,
    schema: {
      name: "Temperature Converter",
      description: "Convert between Celsius, Fahrenheit, and Kelvin",
      category: "Converter"
    }
  },

  period: {
    title: "Period Calculator - Menstrual Cycle & Ovulation Tracker",
    description: "Free period calculator. Calculate your next period date, ovulation window, and fertile days. Track your menstrual cycle accurately. Safe days calculator included.",
    keywords: "period calculator, menstrual cycle calculator, ovulation calculator, fertile window, period tracker, cycle tracker, when will my period come, safe days calculator, ovulation predictor",
    url: "/health/period",
    category: "Health",
    searchVolume: 50000,
    schema: {
      name: "Period Calculator",
      description: "Calculate menstrual cycle and fertile days",
      category: "Calculator"
    }
  },

  pregnancy: {
    title: "Pregnancy Calculator - Due Date & Week Calculator",
    description: "Free pregnancy calculator. Calculate your due date, current pregnancy week, trimester, and important milestones from your last menstrual period (LMP). Full pregnancy timeline included.",
    keywords: "pregnancy calculator, due date calculator, pregnancy week calculator, trimester calculator, LMP calculator, conception calculator, baby due date, pregnancy timeline, weeks pregnant",
    url: "/health/pregnancy",
    category: "Health",
    searchVolume: 45000,
    schema: {
      name: "Pregnancy Calculator",
      description: "Calculate pregnancy due date and timeline",
      category: "Calculator"
    }
  },

  'random-number': {
    title: "Random Number Generator - Free Online Tool",
    description: "Free random number generator. Generate random numbers within any range. Perfect for games, raffles, passwords, dice rolls, lottery numbers, and statistical sampling. Instant results.",
    keywords: "random number generator, random numbers, number generator, random picker, raffle generator, dice roller, lottery numbers, random selection, rng",
    url: "/generators/random-number",
    category: "Generators",
    searchVolume: 45000,
    schema: {
      name: "Random Number Generator",
      description: "Generate random numbers within any range for games and raffles",
      category: "Generator"
    }
  },

  'random-picker': {
    title: "Random Picker - Pick Random Items from List",
    description: "Free random picker. Pick random items from your list. Perfect for raffles, team selection, winner draws, and decision making. Fair and instant random selection.",
    keywords: "random picker, random selector, pick random, raffle picker, winner picker, random choice, team picker, random selection tool",
    url: "/generators/random-picker",
    category: "Generators",
    searchVolume: 35000,
    schema: {
      name: "Random Picker",
      description: "Pick random items from list for raffles and selections",
      category: "Generator"
    }
  },

  'dice-roller': {
    title: "Dice Roller - Roll Virtual Dice Online",
    description: "Free online dice roller. Roll D4, D6, D8, D10, D12, D20, D100 dice. Perfect for board games, RPGs, D&D, and tabletop gaming. Fast and fair dice rolling.",
    keywords: "dice roller, online dice, roll dice, d20 roller, dnd dice, virtual dice, rpg dice, dice simulator, d6 roller",
    url: "/generators/dice-roller",
    category: "Generators",
    searchVolume: 30000,
    schema: {
      name: "Dice Roller",
      description: "Roll virtual dice online for gaming and RPGs",
      category: "Generator"
    }
  },

  'card-shuffler': {
    title: "Card Shuffler - Shuffle Playing Cards Online",
    description: "Free card shuffler. Shuffle and draw playing cards online. 52-card and 32-card decks. Perfect for poker, solitaire, blackjack, and card games. Fair random shuffle.",
    keywords: "card shuffler, shuffle cards, online cards, playing cards, card deck, poker cards, card randomizer, virtual cards",
    url: "/generators/card-shuffler",
    category: "Generators",
    searchVolume: 25000,
    schema: {
      name: "Card Shuffler",
      description: "Shuffle and draw playing cards for games",
      category: "Generator"
    }
  },

  password: {
    title: "Password Generator - Strong Random Password Creator",
    description: "Free password generator. Create strong, secure, random passwords instantly. Customize length, uppercase, lowercase, numbers, symbols. Perfect for accounts, WiFi, security.",
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
    title: "QR Code Generator - Create QR Codes Free Online",
    description: "Free QR code generator. Create QR codes for URLs, text, WiFi, contact info, and more. Download as PNG. Perfect for marketing, business cards, events. Instant QR code creation.",
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
    title: "Date Calculator - Calculate Days Between Dates & Add/Subtract",
    description: "Free date calculator. Calculate days between dates, add or subtract days/months/years, count business days. Perfect for deadlines, age calculation, planning. Accurate date arithmetic.",
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
    title: "Time Calculator - Add, Subtract, Convert Time & Duration",
    description: "Free time calculator. Add or subtract time, calculate time difference, convert hours/minutes/seconds. Perfect for work hours, time zones, duration. Accurate time calculations.",
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
    title: "Salary Calculator - Convert Hourly, Monthly, Annual Salary",
    description: "Free salary calculator. Convert between hourly, daily, weekly, monthly, and annual salary. Calculate take-home pay after taxes. Perfect for job offers, budgeting, payroll.",
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
    title: "Tax Calculator - Income Tax, Sales Tax, VAT Calculator",
    description: "Free tax calculator. Calculate income tax, sales tax, VAT, and tax refunds. See tax brackets, deductions, credits. Perfect for tax planning and estimates. Easy tax calculations.",
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
    title: "Word Counter - Count Words, Characters, Sentences Online",
    description: "Free word counter. Count words, characters, sentences, paragraphs in real-time. See reading time, keyword density. Perfect for essays, articles, SEO, social media. Instant character count.",
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