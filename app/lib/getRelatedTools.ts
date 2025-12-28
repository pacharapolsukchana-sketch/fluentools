import { allTools } from './navigation-data'
import { RelatedTool } from '../components/common/RelatedTools'

/**
 * Smart related tools based on user context and journey
 * Each tool has manually curated recommendations based on user scenarios
 */
const smartRecommendations: Record<string, string[]> = {
  // Finance - Dining/Shopping Context
  'tip': ['calorie', 'bmi', 'discount'],
  'discount': ['percentage', 'tip', 'loan'],
  
  // Finance - Big Purchase Context
  'mortgage': ['loan', 'percentage', 'discount'],
  'loan': ['mortgage', 'percentage', 'discount'],
  
  // Health - Wellness Context
  'bmi': ['calorie', 'age', 'period'],
  'calorie': ['bmi', 'age', 'period'],
  'age': ['bmi', 'calorie', 'period'],
  'period': ['pregnancy', 'age', 'calorie'],          // ✅ เพิ่มใหม่
  'pregnancy': ['period', 'age', 'calorie'],           // ✅ เพิ่มใหม่
  
  // Math - General Purpose
  'percentage': ['discount', 'loan', 'tip'],
  'ratio': ['percentage', 'bmi', 'loan'],
  
  // Converters - Measurement Context
  'unit': ['length', 'currency', 'percentage'],
  'currency': ['percentage', 'discount', 'tip'],
  'length': ['unit', 'percentage', 'ratio'],
  
  // Date & Time Context
  'date': ['age', 'percentage', 'calorie'],
  
  // Business Context
  'roi': ['percentage', 'loan', 'discount'],
  
  // Generators - Gaming/Random Context
  'password': ['qr', 'random-number', 'random-picker'],
  'qr': ['password', 'random-number', 'random-picker'],
  'random-number': ['random-picker', 'dice-roller', 'password'],
  'random-picker': ['random-number', 'dice-roller', 'card-shuffler'],
  'dice-roller': ['random-number', 'random-picker', 'card-shuffler'],
  'card-shuffler': ['random-picker', 'dice-roller', 'random-number'],
  
  // Text Tools - Content Creation Context
  'word-counter': ['percentage', 'random-number', 'qr'],
}

/**
 * Get smart related tools based on context and user journey
 * @param currentToolId - ID of current tool
 * @param limit - Number of related tools to return (default: 3)
 * @returns Array of contextually related tools
 */
export function getSmartRelatedTools(currentToolId: string, limit: number = 3): RelatedTool[] {
  // Get recommended tool IDs for this context
  const recommendedIds = smartRecommendations[currentToolId] || []
  
  // Convert IDs to RelatedTool format
  const relatedTools: RelatedTool[] = []
  
  for (const toolId of recommendedIds) {
    if (relatedTools.length >= limit) break
    
    const tool = allTools.find(t => t.id === toolId)
    if (tool) {
      relatedTools.push({
        name: tool.name,
        href: tool.href,
        icon: tool.icon,
        description: tool.description
      })
    }
  }
  
  // If we don't have enough recommendations, fill with popular tools
  if (relatedTools.length < limit) {
    const popularTools = allTools
      .filter(tool => tool.isPopular && tool.id !== currentToolId)
      .filter(tool => !relatedTools.some(rt => rt.href === tool.href))
      .slice(0, limit - relatedTools.length)
      .map(tool => ({
        name: tool.name,
        href: tool.href,
        icon: tool.icon,
        description: tool.description
      }))
    
    relatedTools.push(...popularTools)
  }
  
  return relatedTools.slice(0, limit)
}

/**
 * Get popular tools (fallback)
 * @param currentToolId - ID of current tool to exclude
 * @param limit - Number of tools to return (default: 3)
 * @returns Array of popular tools
 */
export function getPopularTools(currentToolId: string, limit: number = 3): RelatedTool[] {
  return allTools
    .filter(tool => tool.isPopular && tool.id !== currentToolId)
    .slice(0, limit)
    .map(tool => ({
      name: tool.name,
      href: tool.href,
      icon: tool.icon,
      description: tool.description
    }))
}