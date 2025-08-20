import { Dish } from '../types/dish';

// 图片处理相关函数
export const processImageUrl = (url: string | null): string => {
  if (!url) {
    return '/api/placeholder/300/200';
  }

  // 如果是相对路径，转换为绝对路径
  if (url.startsWith('/')) {
    return url;
  }

  // 如果是完整的HTTP URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // 如果是其他格式，返回占位图
  return '/api/placeholder/300/200';
};

// 验证图片URL是否有效
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  // 检查是否是有效的URL格式
  try {
    new URL(url);
    return true;
  } catch {
    // 如果不是完整URL，检查是否是有效的相对路径
    return url.startsWith('/') && url.length > 1;
  }
};

// 获取占位图URL
export const getPlaceholderImage = (width: number = 300, height: number = 200): string => {
  return `/api/placeholder/${width}/${height}`;
};

// 菜品去重相关函数

// 计算两个字符串的编辑距离
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

// 提取菜品关键词
function extractKeywords(name: string): string[] {
  const keywords = [];
  const cleanName = name.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
  
  // 常见的菜品关键词
  const commonKeywords = [
    '减脂', '水煮', '清蒸', '红烧', '糖醋', '宫保', '麻婆', '鱼香',
    '鸡胸肉', '鸡胸', '牛肉', '猪肉', '鱼肉', '虾仁', '豆腐',
    '西兰花', '胡萝卜', '土豆', '白菜', '菠菜', '芹菜',
    '米饭', '面条', '粥', '汤', '沙拉', '蛋白'
  ];
  
  for (const keyword of commonKeywords) {
    if (cleanName.includes(keyword)) {
      keywords.push(keyword);
    }
  }
  
  return keywords;
}

// 计算高级相似度
export function calculateAdvancedSimilarity(name1: string, name2: string): number {
  if (name1 === name2) return 1.0;
  
  const clean1 = name1.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
  const clean2 = name2.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
  
  if (clean1 === clean2) return 1.0;
  
  // 1. 编辑距离相似度
  const maxLen = Math.max(clean1.length, clean2.length);
  const editDistance = levenshteinDistance(clean1, clean2);
  const editSimilarity = 1 - (editDistance / maxLen);
  
  // 2. 关键词匹配相似度
  const keywords1 = extractKeywords(name1);
  const keywords2 = extractKeywords(name2);
  const commonKeywords = keywords1.filter(k => keywords2.includes(k));
  const totalKeywords = new Set([...keywords1, ...keywords2]).size;
  const keywordSimilarity = totalKeywords > 0 ? commonKeywords.length / totalKeywords : 0;
  
  // 3. 长度比较相似度
  const lengthSimilarity = 1 - Math.abs(clean1.length - clean2.length) / maxLen;
  
  // 4. 包含关系检查
  const containsSimilarity = clean1.includes(clean2) || clean2.includes(clean1) ? 0.8 : 0;
  
  // 综合相似度计算
  const finalSimilarity = Math.max(
    editSimilarity * 0.4 + keywordSimilarity * 0.4 + lengthSimilarity * 0.2,
    containsSimilarity
  );
  
  return finalSimilarity;
}

// 菜品去重函数
export function deduplicateDishes(dishes: Dish[]): { dishes: Dish[], report: string } {
  const result: Dish[] = [];
  const duplicates: Array<{ original: string, duplicate: string, similarity: number }> = [];
  const processed = new Set<number>();
  
  let report = '=== 高级菜品去重报告 ===\n\n';
  report += `原始菜品数量: ${dishes.length}\n`;
  
  for (let i = 0; i < dishes.length; i++) {
    if (processed.has(i)) continue;
    
    const currentDish = dishes[i];
    const similarDishes = [currentDish];
    processed.add(i);
    
    // 查找相似菜品
    for (let j = i + 1; j < dishes.length; j++) {
      if (processed.has(j)) continue;
      
      const similarity = calculateAdvancedSimilarity(currentDish.name, dishes[j].name);
      
      if (similarity > 0.85) { // 相似度阈值
        similarDishes.push(dishes[j]);
        duplicates.push({
          original: currentDish.name,
          duplicate: dishes[j].name,
          similarity: Math.round(similarity * 100) / 100
        });
        processed.add(j);
      }
    }
    
    // 选择最佳代表菜品（通常是名称最短或最完整的）
    const bestDish = similarDishes.reduce((best, current) => {
      // 优先选择名称较短但信息完整的菜品
      if (current.name.length < best.name.length && current.name.length >= 3) {
        return current;
      }
      return best;
    });
    
    result.push(bestDish);
  }
  
  report += `去重后菜品数量: ${result.length}\n`;
  report += `移除重复菜品: ${dishes.length - result.length}\n\n`;
  
  if (duplicates.length > 0) {
    report += '发现的重复菜品:\n';
    duplicates.forEach(dup => {
      report += `- "${dup.duplicate}" → "${dup.original}" (相似度: ${dup.similarity})\n`;
    });
  } else {
    report += '未发现重复菜品\n';
  }
  
  report += '\n=== 去重完成 ===';
  
  return { dishes: result, report };
}

// 菜品数据验证
export function validateDishData(dish: Dish): boolean {
  return !!dish.name && 
         dish.name.trim().length > 0 && 
         dish.nutrition_facts && 
         typeof dish.nutrition_facts.calories === 'number' && 
         dish.nutrition_facts.calories >= 0;
}

// 菜品数据清理
export function cleanDishData(dishes: Dish[]): Dish[] {
  return dishes
    .filter(validateDishData)
    .map(dish => ({
      ...dish,
      name: dish.name?.trim() || '',
      description: dish.description?.trim() || '',
      image_url: processImageUrl(dish.image_url),
      nutrition_facts: {
        calories: dish.nutrition_facts?.calories || 0,
        protein: dish.nutrition_facts?.protein || 0,
        fat: dish.nutrition_facts?.fat || 0,
        carbs: dish.nutrition_facts?.carbs || 0,
        fiber: dish.nutrition_facts?.fiber || 0
      },
      avg_rating: dish.avg_rating || 0
    }));
}

// 菜品排序
export function sortDishes(dishes: Dish[], sortBy: 'name' | 'calories' | 'protein' | 'rating' = 'name'): Dish[] {
  return [...dishes].sort((a, b) => {
    switch (sortBy) {
      case 'calories':
        return (a.nutrition_facts?.calories || 0) - (b.nutrition_facts?.calories || 0);
      case 'protein':
        return (b.nutrition_facts?.protein || 0) - (a.nutrition_facts?.protein || 0);
      case 'rating':
        return (b.avg_rating || 0) - (a.avg_rating || 0);
      case 'name':
      default:
        return a.name.localeCompare(b.name, 'zh-CN');
    }
  });
}

// 菜品搜索
export function searchDishes(dishes: Dish[], query: string): Dish[] {
  if (!query.trim()) return dishes;
  
  const searchTerm = query.toLowerCase().trim();
  
  return dishes.filter(dish => 
    dish.name.toLowerCase().includes(searchTerm) ||
    dish.description?.toLowerCase().includes(searchTerm) ||
    dish.categories?.name?.toLowerCase().includes(searchTerm) ||
    dish.category?.name?.toLowerCase().includes(searchTerm)
  );
}

// 按类别过滤菜品
export function filterDishesByCategory(dishes: Dish[], category: string): Dish[] {
  if (!category || category === 'all') return dishes;
  return dishes.filter(dish => 
    dish.category_id === category ||
    dish.categories?.name === category ||
    dish.category?.name === category
  );
}

// 按品牌过滤菜品
export function filterDishesByBrand(dishes: Dish[], brandId: string): Dish[] {
  if (!brandId || brandId === 'all') return dishes;
  return dishes.filter(dish => 
    dish.brand_id === brandId ||
    dish.brands?.id === brandId
  );
}