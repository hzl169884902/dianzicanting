/**
 * 菜品去重功能测试脚本
 * 用于验证去重算法的效果和准确性
 */

import { calculateSimilarity } from './dishDeduplication';
import { analyzeDishQuality, generateCleanupSuggestions } from './manualDishCleanup';
import { Dish } from '../lib/supabase';

// 测试数据 - 模拟真实的重复菜品情况
const testDishes: Dish[] = [
  {
    id: '1',
    name: '减脂水煮鸡胸肉',
    image_url: 'test1.jpg',
    avg_rating: 4.5,
    review_count: 120,
    category_id: 'protein',
    brand_id: 'brand1',
    created_at: '2024-01-01',
    nutrition_facts: { calories: 150, protein: 30, carbs: 0, fat: 3 },
    popularity_score: 85
  },
  {
    id: '2', 
    name: '减脂水煮鸡胸',
    image_url: 'test2.jpg',
    avg_rating: 4.3,
    review_count: 85,
    category_id: 'protein',
    brand_id: 'brand2',
    created_at: '2024-01-02',
    nutrition_facts: { calories: 145, protein: 28, carbs: 0, fat: 3 },
    popularity_score: 80
  },
  {
    id: '3',
    name: '水煮鸡胸肉(减脂)',
    image_url: 'test3.jpg',
    avg_rating: 4.7,
    review_count: 200,
    category_id: 'protein',
    brand_id: 'brand1',
    created_at: '2024-01-03',
    nutrition_facts: { calories: 155, protein: 32, carbs: 0, fat: 2 },
    popularity_score: 90
  },
  {
    id: '4',
    name: '川味水煮鱼',
    image_url: 'test4.jpg',
    avg_rating: 4.2,
    review_count: 150,
    category_id: 'sichuan',
    brand_id: 'brand3',
    created_at: '2024-01-04',
    nutrition_facts: { calories: 220, protein: 25, carbs: 5, fat: 12 },
    popularity_score: 75
  },
  {
    id: '5',
    name: '四川水煮鱼',
    image_url: 'test5.jpg',
    avg_rating: 4.4,
    review_count: 180,
    category_id: 'sichuan',
    brand_id: 'brand4',
    created_at: '2024-01-05',
    nutrition_facts: { calories: 230, protein: 26, carbs: 6, fat: 13 },
    popularity_score: 82
  },
  {
    id: '6',
    name: '蒸蛋羹',
    image_url: 'test6.jpg',
    avg_rating: 4.0,
    review_count: 90,
    category_id: 'egg',
    brand_id: 'brand2',
    created_at: '2024-01-06',
    nutrition_facts: { calories: 120, protein: 8, carbs: 2, fat: 8 },
    popularity_score: 65
  },
  {
    id: '7',
    name: '水蒸蛋',
    image_url: 'test7.jpg',
    avg_rating: 4.1,
    review_count: 75,
    category_id: 'egg',
    brand_id: 'brand3',
    created_at: '2024-01-07',
    nutrition_facts: { calories: 115, protein: 7, carbs: 2, fat: 7 },
    popularity_score: 60
  },
  {
    id: '8',
    name: '蒸鸡蛋羹',
    image_url: 'test8.jpg',
    avg_rating: 4.3,
    review_count: 110,
    category_id: 'egg',
    brand_id: 'brand1',
    created_at: '2024-01-08',
    nutrition_facts: { calories: 125, protein: 9, carbs: 2, fat: 8 },
    popularity_score: 70
  },
  {
    id: '9',
    name: '红烧肉',
    image_url: 'test9.jpg',
    avg_rating: 4.6,
    review_count: 300,
    category_id: 'pork',
    brand_id: 'brand4',
    created_at: '2024-01-09',
    nutrition_facts: { calories: 350, protein: 20, carbs: 8, fat: 28 },
    popularity_score: 95
  },
  {
    id: '10',
    name: '糖醋里脊',
    image_url: 'test10.jpg',
    avg_rating: 4.4,
    review_count: 220,
    category_id: 'pork',
    brand_id: 'brand2',
    created_at: '2024-01-10',
    nutrition_facts: { calories: 280, protein: 18, carbs: 15, fat: 18 },
    popularity_score: 88
  }
];

/**
 * 运行相似度测试
 */
export function runSimilarityTests() {
  console.log('=== 菜品相似度测试 ===\n');
  
  const testPairs = [
    ['减脂水煮鸡胸肉', '减脂水煮鸡胸'],
    ['减脂水煮鸡胸肉', '水煮鸡胸肉(减脂)'],
    ['川味水煮鱼', '四川水煮鱼'],
    ['蒸蛋羹', '水蒸蛋'],
    ['蒸蛋羹', '蒸鸡蛋羹'],
    ['红烧肉', '糖醋里脊'],
    ['减脂水煮鸡胸肉', '红烧肉']
  ];
  
  testPairs.forEach(([name1, name2]) => {
    const similarity = calculateSimilarity(name1, name2);
    const status = similarity >= 0.8 ? '🔴 高度相似' : 
                   similarity >= 0.6 ? '🟡 中度相似' : 
                   '🟢 不相似';
    
    console.log(`${status} (${(similarity * 100).toFixed(1)}%)`);
    console.log(`  "${name1}" vs "${name2}"\n`);
  });
}

/**
 * 运行质量分析测试
 */
export function runQualityAnalysisTest() {
  console.log('=== 菜品质量分析测试 ===\n');
  
  const report = analyzeDishQuality(testDishes);
  
  console.log('📊 数据统计:');
  console.log(`  总菜品数: ${report.totalDishes}`);
  console.log(`  唯一名称: ${report.uniqueNames}`);
  console.log(`  完全重复: ${report.exactDuplicates}`);
  console.log(`  相似对数: ${report.similarPairs.length}\n`);
  
  console.log('🔍 相似菜品对:');
  report.similarPairs.forEach((pair, index) => {
    console.log(`  ${index + 1}. "${pair.dish1.name}" vs "${pair.dish2.name}"`);
    console.log(`     相似度: ${(pair.similarity * 100).toFixed(1)}%`);
    console.log(`     原因: ${pair.reason}`);
    console.log(`     建议: ${pair.recommendation}\n`);
  });
  
  console.log('📋 分类统计:');
  Object.entries(report.categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} 个菜品`);
  });
  console.log();
  
  if (report.qualityIssues.length > 0) {
    console.log('⚠️ 质量问题:');
    report.qualityIssues.forEach(issue => {
      console.log(`  - ${issue}`);
    });
    console.log();
  }
  
  const suggestions = generateCleanupSuggestions(report);
  if (suggestions.length > 0) {
    console.log('💡 清理建议:');
    suggestions.forEach(suggestion => {
      console.log(`  - ${suggestion}`);
    });
    console.log();
  }
  
  return report;
}

/**
 * 测试特定相似度算法组件
 */
export function testSimilarityComponents() {
  console.log('=== 相似度算法组件测试 ===\n');
  
  // 测试前缀移除
  console.log('🏷️ 前缀移除测试:');
  const prefixTests = [
    '减脂水煮鸡胸肉',
    '川味水煮鱼',
    '粤式白切鸡',
    '北京烤鸭'
  ];
  
  prefixTests.forEach(name => {
    // 这里需要访问内部函数，实际使用时可能需要导出这些函数
    console.log(`  "${name}" -> 处理后的核心名称`);
  });
  console.log();
  
  // 测试编辑距离
  console.log('📏 编辑距离测试:');
  const editDistanceTests = [
    ['鸡胸肉', '鸡胸'],
    ['水煮鱼', '水煮鱼片'],
    ['蒸蛋羹', '蒸鸡蛋羹'],
    ['红烧肉', '糖醋里脊']
  ];
  
  editDistanceTests.forEach(([str1, str2]) => {
    // 计算编辑距离（需要从算法中提取）
    console.log(`  "${str1}" vs "${str2}" -> 编辑距离`);
  });
}

/**
 * 性能测试
 */
export function runPerformanceTest() {
  console.log('=== 性能测试 ===\n');
  
  const startTime = performance.now();
  
  // 测试大量菜品的分析性能
  const largeDishSet = [];
  for (let i = 0; i < 1000; i++) {
    largeDishSet.push({
      ...testDishes[i % testDishes.length],
      id: `test_${i}`,
      name: `${testDishes[i % testDishes.length].name}_${i}`
    });
  }
  
  const report = analyzeDishQuality(largeDishSet);
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`⏱️ 处理 ${largeDishSet.length} 个菜品耗时: ${duration.toFixed(2)}ms`);
  console.log(`📊 发现 ${report.similarPairs.length} 个相似对`);
  console.log(`🚀 平均每个菜品处理时间: ${(duration / largeDishSet.length).toFixed(3)}ms\n`);
}

/**
 * 运行所有测试
 */
export function runAllTests() {
  console.log('🧪 开始菜品去重功能测试\n');
  console.log('='.repeat(50));
  
  runSimilarityTests();
  console.log('='.repeat(50));
  
  const report = runQualityAnalysisTest();
  console.log('='.repeat(50));
  
  testSimilarityComponents();
  console.log('='.repeat(50));
  
  runPerformanceTest();
  console.log('='.repeat(50));
  
  console.log('✅ 测试完成!');
  
  return {
    testDishes,
    report,
    summary: {
      totalDishes: testDishes.length,
      similarPairs: report.similarPairs.length,
      qualityIssues: report.qualityIssues.length
    }
  };
}

// 如果直接运行此文件，执行测试
if (typeof window !== 'undefined' && (window as any).runDishTests) {
  (window as any).runDishTests = runAllTests;
}