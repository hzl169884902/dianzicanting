import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 开始添加剩余菜品到1000个...');

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

// 生成随机营养数据
const generateNutrition = () => ({
  calories: Math.floor(Math.random() * 400) + 100,
  protein: Math.floor(Math.random() * 30) + 5,
  carbs: Math.floor(Math.random() * 50) + 10,
  fat: Math.floor(Math.random() * 20) + 2,
  fiber: Math.floor(Math.random() * 10) + 1,
  sodium: Math.floor(Math.random() * 800) + 200
});

// 生成随机评分数据
const generateRating = () => ({
  avg_rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
  review_count: Math.floor(Math.random() * 500) + 50,
  popularity_score: Math.floor(Math.random() * 30) + 70
});

async function addRemainingDishes() {
  try {
    // 获取现有的category_id
    const { data: categories } = await supabase.from('categories').select('id').limit(1);
    const defaultCategoryId = categories?.[0]?.id || '3971b2e6-dac8-41b4-a144-055d63a13541';
    
    // 检查当前菜品数量
    const { count: currentCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`当前菜品数量: ${currentCount}`);
    
    const needToAdd = 1000 - currentCount;
    console.log(`需要添加: ${needToAdd} 个菜品`);
    
    if (needToAdd <= 0) {
      console.log('✅ 已达到1000个菜品，无需添加');
      return;
    }
    
    // 获取现有菜品名称以避免重复
    const { data: existingDishes } = await supabase
      .from('dishes')
      .select('name');
    
    const existingNames = new Set(existingDishes.map(dish => dish.name.trim()));
    console.log(`现有菜品名称数量: ${existingNames.size}`);
    
    // 35个独特的新菜品
    const newDishes = [
      // 创新融合菜 (10个)
      { name: '芝士焗龙虾', description: '西式芝士与中式龙虾的完美融合，奶香浓郁' },
      { name: '黑松露炒饭', description: '法式黑松露配中式炒饭，奢华美味' },
      { name: '和风照烧鸡', description: '日式照烧酱汁配嫩滑鸡肉，甜咸适中' },
      { name: '泰式咖喱牛肉', description: '泰式香浓咖喱配嫩牛肉，香辣开胃' },
      { name: '意式海鲜烩饭', description: '意大利烩饭技法配新鲜海鲜，浓郁鲜美' },
      { name: '韩式泡菜炒肉', description: '韩式泡菜配五花肉，酸辣下饭' },
      { name: '墨西哥鸡肉卷', description: '墨西哥风味鸡肉卷饼，香料丰富' },
      { name: '印度咖喱鸡', description: '正宗印度咖喱配嫩鸡肉，香料浓郁' },
      { name: '法式鹅肝', description: '法式经典鹅肝，口感丰腻' },
      { name: '西班牙海鲜饭', description: '西班牙传统海鲜饭，藏红花香味' },
      
      // 地方特色小吃 (10个)
      { name: '天津煎饼果子', description: '天津传统早餐，酥脆香甜' },
      { name: '重庆小面', description: '重庆特色面条，麻辣鲜香' },
      { name: '陕西凉皮', description: '陕西传统凉皮，爽滑开胃' },
      { name: '山西刀削面', description: '山西特色面条，筋道有嚼劲' },
      { name: '河南烩面', description: '河南传统面食，汤浓面劲' },
      { name: '兰州牛肉面', description: '兰州清汤牛肉面，清香爽口' },
      { name: '新疆抓饭', description: '新疆传统抓饭，香糯可口' },
      { name: '内蒙古手抓肉', description: '内蒙古传统手抓羊肉，鲜美无膻' },
      { name: '云南过桥米线', description: '云南特色米线，汤鲜料丰' },
      { name: '贵州酸汤鱼', description: '贵州特色酸汤鱼，酸辣开胃' },
      
      // 现代健康菜 (10个)
      { name: '藜麦沙拉', description: '营养丰富的藜麦配新鲜蔬菜，健康美味' },
      { name: '牛油果吐司', description: '牛油果配全麦吐司，营养早餐' },
      { name: '三文鱼刺身', description: '新鲜三文鱼刺身，富含Omega-3' },
      { name: '蔬菜卷', description: '多种蔬菜卷成卷，清爽健康' },
      { name: '燕麦粥', description: '营养燕麦粥配坚果，健康饱腹' },
      { name: '鸡胸肉沙拉', description: '低脂鸡胸肉配蔬菜沙拉，减脂首选' },
      { name: '蒸蛋白', description: '纯蛋白蒸制，高蛋白低脂肪' },
      { name: '紫薯泥', description: '营养紫薯制成泥状，富含花青素' },
      { name: '芦笋炒虾仁', description: '芦笋配虾仁，清淡营养' },
      { name: '菠菜汁面条', description: '菠菜汁制作的绿色面条，营养丰富' },
      
      // 创意甜品 (5个)
      { name: '抹茶提拉米苏', description: '日式抹茶配意式提拉米苏，东西合璧' },
      { name: '芒果班戟', description: '港式芒果班戟，香甜软糯' },
      { name: '红豆冰', description: '台式红豆冰，清凉解暑' },
      { name: '榴莲千层', description: '榴莲千层蛋糕，香浓诱人' },
      { name: '焦糖布丁', description: '法式焦糖布丁，丝滑香甜' }
    ];
    
    // 过滤掉已存在的菜品名称
    const uniqueNewDishes = newDishes.filter(dish => !existingNames.has(dish.name.trim()));
    console.log(`过滤后的新菜品数量: ${uniqueNewDishes.length}`);
    
    // 如果过滤后的菜品不够，添加一些编号菜品
    while (uniqueNewDishes.length < needToAdd) {
      const index = uniqueNewDishes.length + 1;
      const dishName = `特色菜品${index}`;
      if (!existingNames.has(dishName)) {
        uniqueNewDishes.push({
          name: dishName,
          description: `第${index}道特色菜品，精心制作，美味可口`
        });
      }
    }
    
    // 只取需要的数量
    const dishesToAdd = uniqueNewDishes.slice(0, needToAdd);
    
    // 为每个菜品添加完整数据
    const dishesWithFullData = dishesToAdd.map(dish => ({
      name: dish.name,
      description: dish.description,
      category_id: defaultCategoryId,
      image_url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=300&fit=crop`,
      nutrition_facts: generateNutrition(),
      ...generateRating()
    }));
    
    console.log(`准备添加 ${dishesWithFullData.length} 个新菜品...`);
    
    // 批量插入菜品
    const { data, error } = await supabase
      .from('dishes')
      .insert(dishesWithFullData)
      .select();
    
    if (error) {
      console.error('❌ 插入菜品失败:', error);
      throw error;
    }
    
    console.log(`✅ 成功添加 ${data.length} 个新菜品`);
    
    // 验证最终数量
    const { count: finalCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n🎉 添加完成！`);
    console.log(`   最终菜品数量: ${finalCount}`);
    console.log(`   目标达成: ${finalCount >= 1000 ? '✅' : '❌'}`);
    
    return {
      added: data.length,
      finalCount
    };
    
  } catch (error) {
    console.error('❌ 添加菜品过程中出现错误:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    const result = await addRemainingDishes();
    console.log('🏁 脚本执行结束');
    return result;
  } catch (error) {
    console.error('❌ 主函数执行失败:', error);
    process.exit(1);
  }
}

// 执行主函数
main();

export { addRemainingDishes };