/**
 * 高级菜品去重工具
 * 专门处理高度相似的菜品名称
 */

/**
 * 计算两个字符串的编辑距离（Levenshtein距离）
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  const len1 = str1.length;
  const len2 = str2.length;

  // 初始化矩阵
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // 填充矩阵
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // 替换
          matrix[i][j - 1] + 1,     // 插入
          matrix[i - 1][j] + 1      // 删除
        );
      }
    }
  }

  return matrix[len1][len2];
}

/**
 * 计算字符串相似度（基于编辑距离）
 */
function calculateSimilarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
}

/**
 * 检查两个菜品名称是否高度相似
 */
function areDishesSimilar(name1: string, name2: string): boolean {
  // 去除空格和标点符号进行比较
  const clean1 = name1.replace(/[\s\-\(\)（）]/g, '');
  const clean2 = name2.replace(/[\s\-\(\)（）]/g, '');
  
  // 如果完全相同，则相似
  if (clean1 === clean2) return true;
  
  // 检查是否一个是另一个的子串
  if (clean1.includes(clean2) || clean2.includes(clean1)) {
    const lengthDiff = Math.abs(clean1.length - clean2.length);
    // 如果长度差异小于等于2个字符，认为相似
    if (lengthDiff <= 2) return true;
  }
  
  // 使用编辑距离计算相似度
  const similarity = calculateSimilarity(clean1, clean2);
  
  // 相似度阈值设为0.85（更严格）
  return similarity >= 0.85;
}

/**
 * 查找相似菜品组
 */
export function findSimilarDishGroups(dishes: any[]): any[][] {
  const groups: any[][] = [];
  const processed = new Set<number>();
  
  for (let i = 0; i < dishes.length; i++) {
    if (processed.has(i)) continue;
    
    const currentGroup = [dishes[i]];
    processed.add(i);
    
    for (let j = i + 1; j < dishes.length; j++) {
      if (processed.has(j)) continue;
      
      if (areDishesSimilar(dishes[i].name, dishes[j].name)) {
        currentGroup.push(dishes[j]);
        processed.add(j);
      }
    }
    
    // 只有当组内有多个菜品时才添加到结果中
    if (currentGroup.length > 1) {
      groups.push(currentGroup);
    }
  }
  
  return groups;
}

/**
 * 合并相似菜品组，保留最佳的一个
 */
export function mergeSimilarDishes(similarGroups: any[][]): any[] {
  const mergedDishes: any[] = [];
  
  for (const group of similarGroups) {
    // 选择最佳菜品的策略：
    // 1. 优先选择评分最高的
    // 2. 如果评分相同，选择评论数最多的
    // 3. 如果都相同，选择名称最短的（通常更简洁）
    const bestDish = group.reduce((best, current) => {
      if (current.avg_rating > best.avg_rating) return current;
      if (current.avg_rating === best.avg_rating) {
        if (current.review_count > best.review_count) return current;
        if (current.review_count === best.review_count) {
          if (current.name.length < best.name.length) return current;
        }
      }
      return best;
    });
    
    mergedDishes.push(bestDish);
  }
  
  return mergedDishes;
}

/**
 * 高级菜品去重主函数
 */
export function advancedDishDeduplication(dishes: any[]): {
  deduplicated: any[];
  removedGroups: any[][];
  stats: {
    original: number;
    deduplicated: number;
    removed: number;
    groups: number;
  };
} {
  const similarGroups = findSimilarDishGroups(dishes);
  const mergedDishes = mergeSimilarDishes(similarGroups);
  
  // 获取所有被合并的菜品ID
  const mergedIds = new Set();
  for (const group of similarGroups) {
    for (const dish of group) {
      mergedIds.add(dish.id);
    }
  }
  
  // 保留最佳菜品的ID
  const bestIds = new Set(mergedDishes.map(dish => dish.id));
  
  // 构建最终的去重列表
  const deduplicated = dishes.filter(dish => {
    return !mergedIds.has(dish.id) || bestIds.has(dish.id);
  });
  
  return {
    deduplicated,
    removedGroups: similarGroups,
    stats: {
      original: dishes.length,
      deduplicated: deduplicated.length,
      removed: dishes.length - deduplicated.length,
      groups: similarGroups.length
    }
  };
}

/**
 * 生成去重报告
 */
export function generateDeduplicationReport(result: ReturnType<typeof advancedDishDeduplication>): string {
  let report = `菜品去重报告\n`;
  report += `================\n`;
  report += `原始菜品数量: ${result.stats.original}\n`;
  report += `去重后数量: ${result.stats.deduplicated}\n`;
  report += `移除数量: ${result.stats.removed}\n`;
  report += `相似组数: ${result.stats.groups}\n\n`;
  
  if (result.removedGroups.length > 0) {
    report += `相似菜品组详情:\n`;
    report += `================\n`;
    
    result.removedGroups.forEach((group, index) => {
      report += `组 ${index + 1}:\n`;
      group.forEach((dish, dishIndex) => {
        const marker = dishIndex === 0 ? '✓ [保留]' : '✗ [移除]';
        report += `  ${marker} ${dish.name} (评分: ${dish.avg_rating}, 评论: ${dish.review_count})\n`;
      });
      report += `\n`;
    });
  }
  
  return report;
}