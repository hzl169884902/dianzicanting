import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 开始去除重复菜品...');

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

async function deduplicateDishes() {
  try {
    console.log('📡 正在从数据库获取菜品数据...');
    const { data: dishes, error } = await supabase
      .from('dishes')
      .select('id, name, description, category_id, created_at')
      .order('name');

    if (error) {
      console.error('❌ 数据库查询错误:', error);
      throw error;
    }

    console.log(`📊 总菜品数量: ${dishes.length}`);

    // 分析重复菜名
    const nameGroups = {};
    const toDelete = [];

    dishes.forEach(dish => {
      const name = dish.name.trim();
      if (!nameGroups[name]) {
        nameGroups[name] = [];
      }
      nameGroups[name].push(dish);
    });

    // 对于每个重复的菜名，保留最早创建的一个，删除其他的
    Object.entries(nameGroups).forEach(([name, dishList]) => {
      if (dishList.length > 1) {
        // 按创建时间排序，保留最早的
        dishList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        
        // 除了第一个，其他都标记为删除
        for (let i = 1; i < dishList.length; i++) {
          toDelete.push(dishList[i]);
        }
        
        console.log(`🔄 "${name}" - 保留ID: ${dishList[0].id}, 删除${dishList.length - 1}个重复`);
      }
    });

    console.log(`\n📈 去重统计:`);
    console.log(`   当前总数: ${dishes.length}`);
    console.log(`   需要删除: ${toDelete.length}`);
    console.log(`   去重后数量: ${dishes.length - toDelete.length}`);

    if (toDelete.length === 0) {
      console.log('✅ 没有发现重复菜品，无需删除');
      return;
    }

    // 确认是否执行删除
    console.log('\n⚠️  准备删除以下重复菜品:');
    toDelete.slice(0, 10).forEach((dish, index) => {
      console.log(`${index + 1}. "${dish.name}" (ID: ${dish.id})`);
    });

    if (toDelete.length > 10) {
      console.log(`   ... 还有 ${toDelete.length - 10} 个菜品`);
    }

    console.log('\n🗑️  开始批量删除重复菜品...');

    // 批量删除，每次删除50个
    const batchSize = 50;
    let deletedCount = 0;

    for (let i = 0; i < toDelete.length; i += batchSize) {
      const batch = toDelete.slice(i, i + batchSize);
      const ids = batch.map(dish => dish.id);
      
      const { error: deleteError } = await supabase
        .from('dishes')
        .delete()
        .in('id', ids);
      
      if (deleteError) {
        console.error(`❌ 删除批次 ${Math.floor(i / batchSize) + 1} 失败:`, deleteError);
        break;
      }
      
      deletedCount += batch.length;
      console.log(`✅ 已删除 ${deletedCount}/${toDelete.length} 个重复菜品`);
    }

    console.log(`\n🎉 去重完成！`);
    console.log(`   成功删除: ${deletedCount} 个重复菜品`);
    console.log(`   剩余菜品: ${dishes.length - deletedCount}`);
    console.log(`   需要补充到1000: ${Math.max(0, 1000 - (dishes.length - deletedCount))}`);

    return {
      originalCount: dishes.length,
      deletedCount,
      remainingCount: dishes.length - deletedCount
    };

  } catch (error) {
    console.error('❌ 去重过程中出现错误:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    const result = await deduplicateDishes();
    console.log('🏁 脚本执行结束');
    return result;
  } catch (error) {
    console.error('❌ 主函数执行失败:', error);
    process.exit(1);
  }
}

// 执行主函数
main();

export { deduplicateDishes };