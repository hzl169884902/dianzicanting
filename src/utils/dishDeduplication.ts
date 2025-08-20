/**
 * 菜品去重和优化工具
 * 用于在前端处理重复菜品数据，提供更好的用户体验
 */

import { Dish } from '../lib/supabase';

/**
 * 检测菜品名称相似度
 */
export function calculateSimilarity(name1: string, name2: string): number {
  // 移除常见的地区前缀和修饰词，增加更多规则
  const cleanName1 = name1
    .replace(/^(重庆|四川|福建|广东|北京|上海|江苏|浙江|湖南|湖北|川味|粤式|闽南|正宗|特色|招牌|精品|经典|减脂|健康|营养|清淡|家常)/, '')
    .replace(/(沙拉|色拉)$/, '沙拉') // 统一沙拉的写法
    .replace(/(鸡胸肉|鸡胸)/, '鸡胸') // 统一鸡胸的写法
    .replace(/(牛肉片|牛肉丝|牛肉)/, '牛肉') // 统一牛肉的写法
    .replace(/(猪肉片|猪肉丝|猪肉)/, '猪肉') // 统一猪肉的写法
    .replace(/(鱼片|鱼肉)/, '鱼') // 统一鱼的写法
    .replace(/\s+/g, '') // 移除所有空格
    .trim();
  const cleanName2 = name2
    .replace(/^(重庆|四川|福建|广东|北京|上海|江苏|浙江|湖南|湖北|川味|粤式|闽南|正宗|特色|招牌|精品|经典|减脂|健康|营养|清淡|家常)/, '')
    .replace(/(沙拉|色拉)$/, '沙拉') // 统一沙拉的写法
    .replace(/(鸡胸肉|鸡胸)/, '鸡胸') // 统一鸡胸的写法
    .replace(/(牛肉片|牛肉丝|牛肉)/, '牛肉') // 统一牛肉的写法
    .replace(/(猪肉片|猪肉丝|猪肉)/, '猪肉') // 统一猪肉的写法
    .replace(/(鱼片|鱼肉)/, '鱼') // 统一鱼的写法
    .replace(/\s+/g, '') // 移除所有空格
    .trim();
  
  // 如果去除前缀后名称相同，认为是重复菜品
  if (cleanName1 === cleanName2) {
    return 1.0;
  }
  
  // 特殊规则：检测高度相似的菜品模式
  const specialPatterns = [
    // 鸡胸肉相关
    [/^(水煮|蒸|煎|烤|炒)鸡胸/, /^(水煮|蒸|煎|烤|炒)鸡胸/],
    // 牛肉相关
    [/^(水煮|蒸|煎|烤|炒)牛肉/, /^(水煮|蒸|煎|烤|炒)牛肉/],
    // 鱼类相关
    [/^(水煮|蒸|煎|烤|炒).*鱼/, /^(水煮|蒸|煎|烤|炒).*鱼/],
    // 沙拉相关
    [/.*沙拉$/, /.*沙拉$/],
    // 汤类相关
    [/.*汤$/, /.*汤$/]
  ];
  
  for (const [pattern1, pattern2] of specialPatterns) {
    if (pattern1.test(cleanName1) && pattern2.test(cleanName2)) {
      // 如果都匹配同一类模式，进一步检查相似度
      const similarity = getPatternSimilarity(cleanName1, cleanName2);
      if (similarity >= 0.8) {
        return similarity;
      }
    }
  }
  
  // 检查是否包含相同的核心词汇
  const coreWords1: string[] = cleanName1.match(/[\u4e00-\u9fa5]{2,}/g) || [];
  const coreWords2: string[] = cleanName2.match(/[\u4e00-\u9fa5]{2,}/g) || [];
  
  if (coreWords1.length > 0 && coreWords2.length > 0) {
    const commonWords = coreWords1.filter((word: string) => coreWords2.includes(word));
    const wordSimilarity = commonWords.length / Math.max(coreWords1.length, coreWords2.length);
    
    // 降低阈值，提高检测敏感度
    if (wordSimilarity >= 0.6) {
      return wordSimilarity;
    }
  }
  
  // 计算编辑距离相似度
  const maxLength = Math.max(cleanName1.length, cleanName2.length);
  if (maxLength === 0) return 1.0;
  
  const distance = levenshteinDistance(cleanName1, cleanName2);
  return 1 - distance / maxLength;
}

/**
 * 计算特定模式下的相似度
 */
function getPatternSimilarity(name1: string, name2: string): number {
  // 提取烹饪方法和主要食材
  const extractComponents = (name: string) => {
    const cookingMethods = name.match(/^(水煮|蒸|煎|烤|炒|红烧|清炖|爆炒)/)?.[0] || '';
    const mainIngredient = name.replace(/^(水煮|蒸|煎|烤|炒|红烧|清炖|爆炒)/, '').replace(/(片|丝|块|条)$/, '');
    return { cookingMethod: cookingMethods, ingredient: mainIngredient };
  };
  
  const comp1 = extractComponents(name1);
  const comp2 = extractComponents(name2);
  
  // 如果烹饪方法相同且主要食材相似度高，认为是相似菜品
  if (comp1.cookingMethod === comp2.cookingMethod) {
    const ingredientSimilarity = calculateBasicSimilarity(comp1.ingredient, comp2.ingredient);
    if (ingredientSimilarity >= 0.7) {
      return 0.9; // 高相似度
    }
  }
  
  return 0;
}

/**
 * 基础字符串相似度计算
 */
function calculateBasicSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1.0;
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1.0;
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
}

/**
 * 计算编辑距离
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * 菜品去重函数
 * @param dishes 原始菜品列表
 * @param similarityThreshold 相似度阈值，默认0.8
 * @returns 去重后的菜品列表
 */
export function deduplicateDishes(dishes: any[], similarityThreshold: number = 0.6): any[] {
  const uniqueDishes: any[] = [];
  const processedNames = new Set<string>();
  
  // 按评分降序排序，优先保留高评分菜品
  const sortedDishes = [...dishes].sort((a, b) => (b.avg_rating || b.rating || 0) - (a.avg_rating || a.rating || 0));
  
  for (const dish of sortedDishes) {
    let isDuplicate = false;
    
    // 检查是否与已有菜品重复
    for (const uniqueDish of uniqueDishes) {
      const similarity = calculateSimilarity(dish.name, uniqueDish.name);
      
      if (similarity >= similarityThreshold) {
        isDuplicate = true;
        console.log(`发现重复菜品: "${dish.name}" 与 "${uniqueDish.name}" 相似度: ${similarity.toFixed(2)}`);
        break;
      }
    }
    
    if (!isDuplicate) {
      uniqueDishes.push(dish);
      processedNames.add(dish.name);
    }
  }
  
  console.log(`菜品去重完成: 原始数量 ${dishes.length}, 去重后数量 ${uniqueDishes.length}`);
  return uniqueDishes;
}

/**
 * 按类别对菜品进行去重
 * @param dishes 原始菜品列表
 * @param categories 分类列表
 * @param similarityThreshold 相似度阈值
 * @returns 按类别去重后的菜品列表
 */
export function deduplicateDishesByCategory(dishes: any[], categories: any[], similarityThreshold: number = 0.5): any[] {
  // 按类别分组
  const dishesByCategory = dishes.reduce((acc, dish) => {
    const category = dish.category_id || 'unknown';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(dish);
    return acc;
  }, {} as Record<string, any[]>);
  
  // 对每个类别进行去重
  const deduplicatedDishes: any[] = [];
  
  for (const [categoryId, categoryDishes] of Object.entries(dishesByCategory)) {
    const uniqueCategoryDishes = deduplicateDishes(Array.isArray(categoryDishes) ? categoryDishes : [], similarityThreshold);
    deduplicatedDishes.push(...uniqueCategoryDishes);
    
    // 找到分类名称用于日志
    const categoryName = categories.find(cat => cat.id === categoryId)?.name || categoryId;
    console.log(`类别 ${categoryName}: 原始 ${Array.isArray(categoryDishes) ? categoryDishes.length : 0} 道菜, 去重后 ${Array.isArray(uniqueCategoryDishes) ? uniqueCategoryDishes.length : 0} 道菜`);
  }
  
  return deduplicatedDishes;
}

/**
 * 生成菜品多样性报告
 * @param originalDishes 原始菜品列表
 * @param deduplicatedDishes 去重后菜品列表
 * @param categories 分类列表
 * @returns 多样性统计信息
 */
export function generateDiversityReport(originalDishes: any[], deduplicatedDishes: any[], categories: any[]) {
  const duplicatesRemoved = originalDishes.length - deduplicatedDishes.length;
  
  // 统计各分类的重复情况
  const duplicatesByCategory: Record<string, number> = {};
  
  categories.forEach(category => {
    const originalCount = originalDishes.filter(dish => dish.category_id === category.id).length;
    const deduplicatedCount = deduplicatedDishes.filter(dish => dish.category_id === category.id).length;
    const duplicates = originalCount - deduplicatedCount;
    
    if (duplicates > 0) {
      duplicatesByCategory[category.name] = duplicates;
    }
  });
  
  // 计算分类覆盖率
  const categoriesWithDishes = new Set(deduplicatedDishes.map(dish => dish.category_id));
  const categoryCoverage = Math.round((categoriesWithDishes.size / categories.length) * 100);
  
  return {
    originalCount: originalDishes.length,
    deduplicatedCount: deduplicatedDishes.length,
    duplicatesRemoved,
    categoryCoverage,
    duplicatesByCategory,
    diversityScore: deduplicatedDishes.length / originalDishes.length
  };
}

/**
 * 智能菜品推荐 - 确保推荐的菜品具有多样性
 * @param dishes 所有菜品
 * @param count 推荐数量
 * @returns 多样化的推荐菜品列表
 */
export function getdiverseRecommendations(dishes: Dish[], count: number = 10): Dish[] {
  // 先去重
  const uniqueDishes = deduplicateDishes(dishes, 0.8);
  
  // 按类别分组
  const dishesByCategory = uniqueDishes.reduce((acc, dish) => {
    const category = dish.category_id || 'unknown';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(dish);
    return acc;
  }, {} as Record<string, Dish[]>);
  
  // 从每个类别中选择最好的菜品
  const recommendations: Dish[] = [];
  const categories = Object.keys(dishesByCategory);
  const dishesPerCategory = Math.ceil(count / categories.length);
  
  for (const category of categories) {
    const categoryDishes = dishesByCategory[category]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, dishesPerCategory);
    
    recommendations.push(...categoryDishes);
    
    if (recommendations.length >= count) {
      break;
    }
  }
  
  // 如果还没有足够的推荐，从剩余的高评分菜品中补充
  if (recommendations.length < count) {
    const remaining = uniqueDishes
      .filter(dish => !recommendations.includes(dish))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, count - recommendations.length);
    
    recommendations.push(...remaining);
  }
  
  return recommendations.slice(0, count);
}