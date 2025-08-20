/**
 * 手动菜品清理工具
 * 用于在前端识别和处理相似菜品，提供手动清理界面
 */

import { Dish } from '../lib/supabase';
import { calculateSimilarity } from './dishDeduplication';

/**
 * 菜品相似度分析结果
 */
export interface SimilarityAnalysis {
  dish1: Dish;
  dish2: Dish;
  similarity: number;
  reason: string;
  recommendation: 'keep_first' | 'keep_second' | 'merge' | 'manual_review';
}

/**
 * 菜品清理报告
 */
export interface CleanupReport {
  totalDishes: number;
  uniqueNames: number;
  exactDuplicates: number;
  similarPairs: SimilarityAnalysis[];
  categoryStats: { [category: string]: number };
  qualityIssues: string[];
}

/**
 * 分析菜品数据质量和重复情况
 */
export function analyzeDishQuality(dishes: Dish[]): CleanupReport {
  const report: CleanupReport = {
    totalDishes: dishes.length,
    uniqueNames: new Set(dishes.map(d => d.name)).size,
    exactDuplicates: 0,
    similarPairs: [],
    categoryStats: {},
    qualityIssues: []
  };

  // 统计完全重复的菜品
  const nameCount = new Map<string, number>();
  dishes.forEach(dish => {
    const count = nameCount.get(dish.name) || 0;
    nameCount.set(dish.name, count + 1);
  });
  
  report.exactDuplicates = Array.from(nameCount.values())
    .filter(count => count > 1)
    .reduce((sum, count) => sum + count - 1, 0);

  // 分析相似菜品对
  for (let i = 0; i < dishes.length; i++) {
    for (let j = i + 1; j < dishes.length; j++) {
      const dish1 = dishes[i];
      const dish2 = dishes[j];
      const similarity = calculateSimilarity(dish1.name, dish2.name);
      
      if (similarity >= 0.7) {
        const analysis = analyzeSimilarPair(dish1, dish2, similarity);
        report.similarPairs.push(analysis);
      }
    }
  }

  // 按相似度排序
  report.similarPairs.sort((a, b) => b.similarity - a.similarity);

  // 统计分类分布
  dishes.forEach(dish => {
    const category = dish.category_id || 'unknown';
    report.categoryStats[category] = (report.categoryStats[category] || 0) + 1;
  });

  // 检查数据质量问题
  report.qualityIssues = identifyQualityIssues(dishes);

  return report;
}

/**
 * 分析相似菜品对
 */
function analyzeSimilarPair(dish1: Dish, dish2: Dish, similarity: number): SimilarityAnalysis {
  let reason = '';
  let recommendation: 'keep_first' | 'keep_second' | 'merge' | 'manual_review' = 'manual_review';

  // 分析相似原因
  if (dish1.name === dish2.name) {
    reason = '完全重复的菜品名称';
    // 保留评分更高的
    recommendation = (dish1.avg_rating || 0) >= (dish2.avg_rating || 0) ? 'keep_first' : 'keep_second';
  } else if (similarity >= 0.9) {
    reason = '高度相似的菜品名称';
    // 保留评分和评论数更好的
    const score1 = (dish1.avg_rating || 0) * Math.log(1 + (dish1.review_count || 0));
    const score2 = (dish2.avg_rating || 0) * Math.log(1 + (dish2.review_count || 0));
    recommendation = score1 >= score2 ? 'keep_first' : 'keep_second';
  } else if (similarity >= 0.8) {
    reason = '可能是同一菜品的不同表述';
    recommendation = 'manual_review';
  } else {
    reason = '部分相似的菜品';
    recommendation = 'manual_review';
  }

  // 检查特定模式
  if (isRegionalVariant(dish1.name, dish2.name)) {
    reason += ' (地域变体)';
  }
  if (isCookingMethodVariant(dish1.name, dish2.name)) {
    reason += ' (烹饪方法变体)';
  }
  if (isIngredientVariant(dish1.name, dish2.name)) {
    reason += ' (食材变体)';
  }

  return {
    dish1,
    dish2,
    similarity,
    reason,
    recommendation
  };
}

/**
 * 检查是否为地域变体
 */
function isRegionalVariant(name1: string, name2: string): boolean {
  const regions = ['川味', '粤式', '闽南', '北京', '上海', '重庆', '四川', '广东', '福建'];
  const clean1 = name1.replace(new RegExp(`^(${regions.join('|')})`), '');
  const clean2 = name2.replace(new RegExp(`^(${regions.join('|')})`), '');
  return clean1 === clean2 && clean1 !== name1 && clean2 !== name2;
}

/**
 * 检查是否为烹饪方法变体
 */
function isCookingMethodVariant(name1: string, name2: string): boolean {
  const methods = ['水煮', '蒸', '煎', '烤', '炒', '红烧', '清炖', '爆炒'];
  const pattern = new RegExp(`^(${methods.join('|')})`);
  
  const match1 = name1.match(pattern);
  const match2 = name2.match(pattern);
  
  if (match1 && match2 && match1[0] !== match2[0]) {
    const ingredient1 = name1.replace(pattern, '');
    const ingredient2 = name2.replace(pattern, '');
    return ingredient1 === ingredient2;
  }
  
  return false;
}

/**
 * 检查是否为食材变体
 */
function isIngredientVariant(name1: string, name2: string): boolean {
  const variants = [
    ['鸡胸肉', '鸡胸'],
    ['牛肉片', '牛肉丝', '牛肉'],
    ['猪肉片', '猪肉丝', '猪肉'],
    ['鱼片', '鱼肉', '鱼'],
    ['沙拉', '色拉']
  ];
  
  for (const variantGroup of variants) {
    const hasVariant1 = variantGroup.some(variant => name1.includes(variant));
    const hasVariant2 = variantGroup.some(variant => name2.includes(variant));
    
    if (hasVariant1 && hasVariant2) {
      // 替换变体后比较
      let normalized1 = name1;
      let normalized2 = name2;
      
      for (const variant of variantGroup) {
        normalized1 = normalized1.replace(variant, variantGroup[0]);
        normalized2 = normalized2.replace(variant, variantGroup[0]);
      }
      
      if (normalized1 === normalized2) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * 识别数据质量问题
 */
function identifyQualityIssues(dishes: Dish[]): string[] {
  const issues: string[] = [];
  
  // 检查缺失图片的菜品
  const missingImages = dishes.filter(d => !d.image_url || d.image_url.trim() === '').length;
  if (missingImages > 0) {
    issues.push(`${missingImages} 个菜品缺少图片`);
  }
  
  // 检查缺失评分的菜品
  const missingRatings = dishes.filter(d => !d.avg_rating || d.avg_rating === 0).length;
  if (missingRatings > 0) {
    issues.push(`${missingRatings} 个菜品缺少评分`);
  }
  
  // 检查缺失品牌的菜品
  const missingBrands = dishes.filter(d => !d.brand_id).length;
  if (missingBrands > 0) {
    issues.push(`${missingBrands} 个菜品缺少品牌关联`);
  }
  
  // 检查异常短的菜品名称
  const shortNames = dishes.filter(d => d.name.length < 2).length;
  if (shortNames > 0) {
    issues.push(`${shortNames} 个菜品名称过短`);
  }
  
  // 检查异常长的菜品名称
  const longNames = dishes.filter(d => d.name.length > 20).length;
  if (longNames > 0) {
    issues.push(`${longNames} 个菜品名称过长`);
  }
  
  return issues;
}

/**
 * 生成清理建议
 */
export function generateCleanupSuggestions(report: CleanupReport): string[] {
  const suggestions: string[] = [];
  
  if (report.exactDuplicates > 0) {
    suggestions.push(`删除 ${report.exactDuplicates} 个完全重复的菜品`);
  }
  
  const highSimilarityPairs = report.similarPairs.filter(p => p.similarity >= 0.9).length;
  if (highSimilarityPairs > 0) {
    suggestions.push(`审查 ${highSimilarityPairs} 对高度相似的菜品`);
  }
  
  const autoMergeable = report.similarPairs.filter(p => 
    p.recommendation === 'keep_first' || p.recommendation === 'keep_second'
  ).length;
  if (autoMergeable > 0) {
    suggestions.push(`可自动合并 ${autoMergeable} 对重复菜品`);
  }
  
  if (report.qualityIssues.length > 0) {
    suggestions.push('修复数据质量问题：' + report.qualityIssues.join('、'));
  }
  
  return suggestions;
}

/**
 * 执行自动清理
 */
export function executeAutoCleanup(dishes: Dish[], report: CleanupReport): Dish[] {
  const dishesToRemove = new Set<string>();
  
  // 处理可自动合并的菜品
  report.similarPairs.forEach(pair => {
    if (pair.recommendation === 'keep_first') {
      dishesToRemove.add(pair.dish2.id);
    } else if (pair.recommendation === 'keep_second') {
      dishesToRemove.add(pair.dish1.id);
    }
  });
  
  // 返回清理后的菜品列表
  return dishes.filter(dish => !dishesToRemove.has(dish.id));
}