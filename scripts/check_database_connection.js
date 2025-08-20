/**
 * 数据库连接验证脚本
 * 使用Supabase API key连接数据库并查询菜品数据
 */

import { createClient } from '@supabase/supabase-js';

// Supabase配置
const supabaseUrl = 'https://iaamsobyzdjdrgipllvi.supabase.co'; // 项目URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYW1zb2J5emRqZHJnaXBsbHZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTMzMjA2OSwiZXhwIjoyMDcwOTA4MDY5fQ.LhV_E8ZPjzaabqUMHBAyEnXpwyzmVARkqhV-VDAABos'; // Service Role Key (具有完整数据库访问权限)

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 查询菜品总数
 */
async function getDishCount() {
  try {
    const { count, error } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('查询菜品总数失败:', error);
      return null;
    }
    
    console.log(`数据库中共有 ${count} 个菜品`);
    return count;
  } catch (err) {
    console.error('连接数据库失败:', err);
    return null;
  }
}

/**
 * 查询减脂餐菜品
 */
async function getDietMeals() {
  try {
    const { data, error } = await supabase
      .from('dishes')
      .select('id, name, description, nutrition_facts')
      .ilike('name', '%减脂%')
      .order('name');
    
    if (error) {
      console.error('查询减脂餐失败:', error);
      return [];
    }
    
    console.log(`\n找到 ${data.length} 个减脂餐菜品:`);
    data.forEach((dish, index) => {
      console.log(`${index + 1}. ${dish.name}`);
      console.log(`   描述: ${dish.description}`);
      if (dish.nutrition_facts) {
        const nutrition = typeof dish.nutrition_facts === 'string' 
          ? JSON.parse(dish.nutrition_facts) 
          : dish.nutrition_facts;
        console.log(`   营养信息: 热量${nutrition.calories}卡, 蛋白质${nutrition.protein}g`);
      }
      console.log('');
    });
    
    return data;
  } catch (err) {
    console.error('查询减脂餐失败:', err);
    return [];
  }
}

/**
 * 查询最新添加的菜品
 */
async function getLatestDishes(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('dishes')
      .select('id, name, description, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('查询最新菜品失败:', error);
      return [];
    }
    
    console.log(`\n最新添加的 ${data.length} 个菜品:`);
    data.forEach((dish, index) => {
      console.log(`${index + 1}. ${dish.name} (${new Date(dish.created_at).toLocaleString()})`);
    });
    
    return data;
  } catch (err) {
    console.error('查询最新菜品失败:', err);
    return [];
  }
}

/**
 * 查询分类统计
 */
async function getCategoryStats() {
  try {
    const { data, error } = await supabase
      .from('dishes')
      .select(`
        category_id,
        categories!inner(name)
      `);
    
    if (error) {
      console.error('查询分类统计失败:', error);
      return;
    }
    
    // 统计各分类的菜品数量
    const categoryStats = {};
    data.forEach(dish => {
      const categoryName = dish.categories.name;
      categoryStats[categoryName] = (categoryStats[categoryName] || 0) + 1;
    });
    
    console.log('\n各分类菜品统计:');
    Object.entries(categoryStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`${category}: ${count} 个菜品`);
      });
    
  } catch (err) {
    console.error('查询分类统计失败:', err);
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('=== Supabase 数据库连接测试 ===\n');
  
  // 测试连接并查询数据
  const totalCount = await getDishCount();
  
  if (totalCount !== null) {
    console.log('✅ 数据库连接成功!\n');
    
    // 查询减脂餐
    await getDietMeals();
    
    // 查询最新菜品
    await getLatestDishes();
    
    // 查询分类统计
    await getCategoryStats();
    
  } else {
    console.log('❌ 数据库连接失败!');
    console.log('\n请检查:');
    console.log('1. Supabase项目URL是否正确');
    console.log('2. API key是否有效');
    console.log('3. 网络连接是否正常');
  }
}

// 运行脚本
main().catch(console.error);

// 导出函数供其他模块使用
export {
  getDishCount,
  getDietMeals,
  getLatestDishes,
  getCategoryStats
};