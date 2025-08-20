/**
 * 修复数据库中菜品名称乱码问题的脚本
 * 使用Supabase Service Role Key直接操作数据库
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少Supabase环境变量');
  process.exit(1);
}

// 创建Supabase客户端（使用Service Role Key）
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 乱码模式映射表 - 根据实际数据库中的乱码格式
const garbagePatterns = {
  // 实际发现的乱码模式
  '6A????1?': '宫保鸡丁',
  '6A????2?': '麻婆豆腐', 
  '6A????3?': '红烧肉',
  '6A????4?': '糖醋里脊',
  '6A????5?': '鱼香肉丝',
  // 通用乱码模式
  '？？？？？': '美味佳肴',
  '？？？？': '特色菜品',
  '？？？': '招牌菜',
};

// 清理乱码文本的函数
function cleanGarbageText(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }

  // 检查是否包含乱码字符（包括6A????格式）
  const hasGarbage = /[？�\x00-\x1F\x7F-\x9F]/.test(text) || 
                    /\?{2,}/.test(text) || 
                    /[\u0000-\u001F\u007F-\u009F]/.test(text) ||
                    /6A\?\?\?\?\d\?/.test(text);

  if (!hasGarbage) {
    return text;
  }

  // 尝试从映射表中找到对应的正确文本
  for (const [garbage, correct] of Object.entries(garbagePatterns)) {
    if (text.includes(garbage)) {
      // 转义特殊字符用于正则表达式
      const escapedGarbage = garbage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp(escapedGarbage, 'g'), correct);
    }
  }

  // 如果没有找到映射，尝试基本清理
  let cleaned = text
    .replace(/[？�\x00-\x1F\x7F-\x9F]/g, '') // 移除乱码字符
    .replace(/\s+/g, ' ') // 合并多个空格
    .trim();

  // 如果清理后为空或太短，返回默认名称
  if (!cleaned || cleaned.length < 2) {
    return '美味佳肴';
  }

  return cleaned;
}

// 修复菜品表中的乱码
async function fixDishesGarbage() {
  console.log('🔍 开始检查菜品表中的乱码...');
  
  try {
    // 获取所有菜品
    const { data: dishes, error } = await supabase
      .from('dishes')
      .select('id, name, description');

    if (error) {
      throw error;
    }

    console.log(`📊 找到 ${dishes.length} 个菜品`);

    let fixedCount = 0;
    const updates = [];

    // 检查每个菜品
    for (const dish of dishes) {
      const originalName = dish.name;
      const originalDescription = dish.description;
      
      const cleanedName = cleanGarbageText(originalName);
      const cleanedDescription = cleanGarbageText(originalDescription);

      // 如果有变化，记录更新
      if (cleanedName !== originalName || cleanedDescription !== originalDescription) {
        updates.push({
          id: dish.id,
          name: cleanedName,
          description: cleanedDescription,
          original_name: originalName,
          original_description: originalDescription
        });
        fixedCount++;
      }
    }

    console.log(`🔧 发现 ${fixedCount} 个需要修复的菜品`);

    if (updates.length > 0) {
      console.log('\n📝 修复详情:');
      updates.forEach((update, index) => {
        console.log(`${index + 1}. ID: ${update.id}`);
        console.log(`   原名称: "${update.original_name}"`);
        console.log(`   新名称: "${update.name}"`);
        if (update.original_description !== update.description) {
          console.log(`   原描述: "${update.original_description}"`);
          console.log(`   新描述: "${update.description}"`);
        }
        console.log('');
      });

      // 批量更新
      console.log('🚀 开始批量更新...');
      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('dishes')
          .update({
            name: update.name,
            description: update.description
          })
          .eq('id', update.id);

        if (updateError) {
          console.error(`❌ 更新菜品 ${update.id} 失败:`, updateError.message);
        } else {
          console.log(`✅ 成功更新菜品: ${update.name}`);
        }
      }
    }

    console.log(`\n🎉 修复完成！共修复了 ${fixedCount} 个菜品`);
    return fixedCount;

  } catch (error) {
    console.error('❌ 修复菜品乱码时出错:', error.message);
    throw error;
  }
}

// 修复分类表中的乱码
async function fixCategoriesGarbage() {
  console.log('\n🔍 开始检查分类表中的乱码...');
  
  try {
    // 获取所有分类
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name, description');

    if (error) {
      throw error;
    }

    console.log(`📊 找到 ${categories.length} 个分类`);

    let fixedCount = 0;
    const updates = [];

    // 检查每个分类
    for (const category of categories) {
      const originalName = category.name;
      const originalDescription = category.description;
      
      const cleanedName = cleanGarbageText(originalName);
      const cleanedDescription = cleanGarbageText(originalDescription);

      // 如果有变化，记录更新
      if (cleanedName !== originalName || cleanedDescription !== originalDescription) {
        updates.push({
          id: category.id,
          name: cleanedName,
          description: cleanedDescription,
          original_name: originalName,
          original_description: originalDescription
        });
        fixedCount++;
      }
    }

    console.log(`🔧 发现 ${fixedCount} 个需要修复的分类`);

    if (updates.length > 0) {
      // 批量更新
      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('categories')
          .update({
            name: update.name,
            description: update.description
          })
          .eq('id', update.id);

        if (updateError) {
          console.error(`❌ 更新分类 ${update.id} 失败:`, updateError.message);
        } else {
          console.log(`✅ 成功更新分类: ${update.name}`);
        }
      }
    }

    console.log(`🎉 分类修复完成！共修复了 ${fixedCount} 个分类`);
    return fixedCount;

  } catch (error) {
    console.error('❌ 修复分类乱码时出错:', error.message);
    throw error;
  }
}

// 验证修复结果
async function validateFix() {
  console.log('\n🔍 验证修复结果...');
  
  try {
    // 检查还有多少乱码
    const { data: dishes, error } = await supabase
      .from('dishes')
      .select('id, name, description');

    if (error) {
      throw error;
    }

    let garbageCount = 0;
    const remainingGarbage = [];

    for (const dish of dishes) {
      const hasGarbageName = /[？�\x00-\x1F\x7F-\x9F]/.test(dish.name) || /\?{2,}/.test(dish.name) || /6A\?\?\?\?\d\?/.test(dish.name);
      const hasGarbageDesc = dish.description && (/[？�\x00-\x1F\x7F-\x9F]/.test(dish.description) || /\?{2,}/.test(dish.description) || /6A\?\?\?\?\d\?/.test(dish.description));
      
      if (hasGarbageName || hasGarbageDesc) {
        garbageCount++;
        remainingGarbage.push({
          id: dish.id,
          name: dish.name,
          description: dish.description
        });
      }
    }

    if (garbageCount > 0) {
      console.log(`⚠️  仍有 ${garbageCount} 个菜品包含乱码:`);
      remainingGarbage.forEach((item, index) => {
        console.log(`${index + 1}. ID: ${item.id}, 名称: "${item.name}"`);
      });
    } else {
      console.log('✅ 所有乱码已修复完成！');
    }

    return garbageCount;

  } catch (error) {
    console.error('❌ 验证修复结果时出错:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始修复数据库乱码问题...');
  console.log('=' .repeat(50));
  
  try {
    // 测试数据库连接
    const { data, error } = await supabase
      .from('dishes')
      .select('count')
      .limit(1);

    if (error) {
      throw new Error(`数据库连接失败: ${error.message}`);
    }

    console.log('✅ 数据库连接成功');

    // 修复菜品乱码
    const dishesFixed = await fixDishesGarbage();
    
    // 修复分类乱码
    const categoriesFixed = await fixCategoriesGarbage();
    
    // 验证修复结果
    const remainingGarbage = await validateFix();
    
    console.log('\n' + '=' .repeat(50));
    console.log('📊 修复总结:');
    console.log(`   - 修复菜品: ${dishesFixed} 个`);
    console.log(`   - 修复分类: ${categoriesFixed} 个`);
    console.log(`   - 剩余乱码: ${remainingGarbage} 个`);
    
    if (remainingGarbage === 0) {
      console.log('\n🎉 所有乱码修复完成！');
    } else {
      console.log('\n⚠️  仍有部分乱码需要手动处理');
    }

  } catch (error) {
    console.error('\n❌ 修复过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行脚本
main().catch(console.error);

export { main, fixDishesGarbage, fixCategoriesGarbage, validateFix };