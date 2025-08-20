import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 菜品分析脚本开始执行...');

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载环境变量，显式指定.env文件路径
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// 调试环境变量
console.log('环境变量检查:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '已设置' : '未设置');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '已设置' : '未设置');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ 环境变量缺失:');
  if (!process.env.SUPABASE_URL) console.error('  - SUPABASE_URL 未设置');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) console.error('  - SUPABASE_SERVICE_ROLE_KEY 未设置');
  process.exit(1);
}

// 创建 Supabase 客户端
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeDishes() {
  try {
    console.log('🔍 开始分析菜品数据...');
    console.log('==================================================');
    
    console.log('📡 正在从数据库获取菜品数据...');
    const { data: dishes, error } = await supabase
      .from('dishes')
      .select('id, name, description, category_id')
      .order('name');
    
    if (error) {
      console.error('❌ 数据库查询错误:', error);
      throw error;
    }
    
    console.log(`📊 总菜品数量: ${dishes.length}`);
    
    if (dishes.length === 0) {
      console.log('⚠️ 数据库中没有菜品数据');
      return;
    }
    
    // 分析重复菜名
    console.log('🔄 正在分析重复菜名...');
    const nameCount = {};
    const duplicates = [];
    
    dishes.forEach(dish => {
      const name = dish.name.trim();
      if (nameCount[name]) {
        nameCount[name].push(dish);
      } else {
        nameCount[name] = [dish];
      }
    });
    
    // 找出重复的菜名
    Object.entries(nameCount).forEach(([name, dishList]) => {
      if (dishList.length > 1) {
        duplicates.push({
          name,
          count: dishList.length,
          dishes: dishList
        });
      }
    });
    
    console.log(`🔄 重复菜名数量: ${duplicates.length}`);
    console.log(`📈 重复菜品总数: ${duplicates.reduce((sum, dup) => sum + dup.count, 0)}`);
    
    // 显示前20个重复菜名
    if (duplicates.length > 0) {
      console.log('\n🔍 重复菜名详情 (前20个):');
      duplicates.slice(0, 20).forEach((dup, index) => {
        console.log(`${index + 1}. "${dup.name}" - ${dup.count}个重复`);
        dup.dishes.forEach((dish, i) => {
          console.log(`   ${i + 1}) ID: ${dish.id}`);
        });
      });
    } else {
      console.log('✅ 没有发现重复的菜名');
    }
    
    // 计算去重后的数量
    const uniqueNames = Object.keys(nameCount);
    const duplicateCount = duplicates.reduce((sum, dup) => sum + (dup.count - 1), 0);
    const afterDeduplication = dishes.length - duplicateCount;
    
    console.log('\n📈 去重统计:');
    console.log(`   当前总数: ${dishes.length}`);
    console.log(`   唯一菜名: ${uniqueNames.length}`);
    console.log(`   需删除重复: ${duplicateCount}`);
    console.log(`   去重后数量: ${afterDeduplication}`);
    console.log(`   需要补充到1000: ${Math.max(0, 1000 - afterDeduplication)}`);
    
    // 分析相似菜名（简单的字符串相似度检查）
    console.log('\n🔍 分析相似菜名...');
    const similarGroups = [];
    const processedNames = new Set();
    
    uniqueNames.forEach(name1 => {
      if (processedNames.has(name1)) return;
      
      const similarNames = [name1];
      uniqueNames.forEach(name2 => {
        if (name1 !== name2 && !processedNames.has(name2)) {
          // 简单的相似度检查：包含关系或长度相近且有共同字符
          if (name1.includes(name2) || name2.includes(name1) || 
              (Math.abs(name1.length - name2.length) <= 2 && 
               name1.split('').some(char => name2.includes(char)) &&
               name2.split('').some(char => name1.includes(char)))) {
            similarNames.push(name2);
            processedNames.add(name2);
          }
        }
      });
      
      if (similarNames.length > 1) {
        similarGroups.push(similarNames);
      }
      processedNames.add(name1);
    });
    
    console.log(`🔍 发现 ${similarGroups.length} 组相似菜名:`);
    similarGroups.slice(0, 10).forEach((group, index) => {
      console.log(`${index + 1}. [${group.join(', ')}]`);
    });
    
    console.log('\n🎉 分析完成!');
    console.log('==================================================');
    
    return {
      total: dishes.length,
      duplicates,
      uniqueCount: uniqueNames.length,
      needToAdd: Math.max(0, 1000 - afterDeduplication),
      similarGroups
    };
    
  } catch (error) {
    console.error('❌ 分析过程中出现错误:', error.message);
    console.error('完整错误信息:', error);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    const result = await analyzeDishes();
    console.log('🏁 脚本执行结束');
    return result;
  } catch (error) {
    console.error('❌ 主函数执行失败:', error);
    process.exit(1);
  }
}

// 执行主函数
main();

export { analyzeDishes };