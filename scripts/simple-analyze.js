import('dotenv').then(dotenv => {
  dotenv.config();
  return import('@supabase/supabase-js');
}).then(({ createClient }) => {
  console.log('🚀 开始分析菜品数据...');
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  return supabase
    .from('dishes')
    .select('id, name, description, category_id')
    .order('name');
}).then(({ data: dishes, error }) => {
  if (error) {
    console.error('❌ 数据库查询错误:', error);
    return;
  }
  
  console.log(`📊 总菜品数量: ${dishes.length}`);
  
  // 分析重复菜名
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
  
  // 显示前10个重复菜名
  if (duplicates.length > 0) {
    console.log('\n🔍 重复菜名详情 (前10个):');
    duplicates.slice(0, 10).forEach((dup, index) => {
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
  
  console.log('\n🎉 分析完成!');
  
}).catch(error => {
  console.error('❌ 分析过程中出现错误:', error.message);
  console.error('完整错误信息:', error);
});