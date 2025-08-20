// 继续添加剩余的菜品数据
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载项目根目录的.env文件
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('环境变量检查:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '已设置' : '未设置');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('缺少必要的环境变量');
  console.error('SUPABASE_URL:', supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '已设置' : '未设置');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 生成随机营养数据
const generateNutrition = () => ({
  calories: Math.floor(Math.random() * 300) + 100,
  protein: Math.floor(Math.random() * 20) + 5,
  carbs: Math.floor(Math.random() * 40) + 10,
  fat: Math.floor(Math.random() * 15) + 2
});

// 生成随机评分和评论数
const generateRating = () => ({
  avg_rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5-5.0
  review_count: Math.floor(Math.random() * 2000) + 100,
  popularity_score: Math.floor(Math.random() * 30) + 70
});

const addMoreDishes = async () => {
  try {
    console.log('开始添加更多菜品...');
    
    // 获取现有的category_id
    const { data: categories } = await supabase.from('categories').select('id').limit(1);
    const defaultCategoryId = categories?.[0]?.id || '3971b2e6-dac8-41b4-a144-055d63a13541';
    
    // 检查当前菜品数量
    const { count: currentCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`当前菜品数量: ${currentCount}`);
    
    // 更多菜品数据 - 苏菜、浙菜、徽菜、京菜等
    const moreDishes = [
      // 苏菜系列 (30个)
      { name: '松鼠桂鱼', description: '苏菜名品，桂鱼酥脆，酸甜可口', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蟹粉狮子头', description: '江苏名菜，狮子头鲜美，蟹粉香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '清汤火方', description: '苏菜传统，火方香嫩，汤汁清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白汁圆菜', description: '苏菜经典，圆菜嫩滑，白汁香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '盐水鸭', description: '南京特色，盐水鸭肉质鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '叫花鸡', description: '苏菜名品，叫花鸡香嫩，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '水晶肴肉', description: '镇江特产，肴肉晶莹，口感Q弹', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蜜汁火方', description: '苏菜传统，火方香甜，蜜汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '扬州炒饭', description: '扬州名菜，炒饭粒粒分明，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蟹黄汤包', description: '江南小吃，汤包皮薄，蟹黄鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '清炖蟹粉', description: '苏菜精品，蟹粉鲜美，汤汁清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋排骨', description: '苏菜家常，排骨酸甜，外酥内嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切肉', description: '苏菜传统，白切肉嫩滑，原汁原味', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '阳澄湖大闸蟹', description: '江苏特产，大闸蟹膏黄肉美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '金陵盐水鸭', description: '南京名菜，盐水鸭皮白肉嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏式月饼', description: '苏州特产，月饼酥脆，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '太湖银鱼', description: '江苏特产，银鱼鲜嫩，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '无锡排骨', description: '无锡名菜，排骨香甜，肉质酥烂', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏州糖粥', description: '苏州小吃，糖粥香甜，口感顺滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '扬州干丝', description: '扬州特色，干丝细如发丝，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏式糕点', description: '苏州传统，糕点精美，口感香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '镇江香醋鱼', description: '镇江特色，香醋鱼酸甜，鱼肉鲜嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏州面条', description: '苏州小吃，面条爽滑，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '金陵烤鸭', description: '南京特色，烤鸭皮脆肉嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏式红烧肉', description: '苏菜经典，红烧肉肥瘦相间，香甜可口', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '扬州三套鸭', description: '扬州名菜，三套鸭层次丰富，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏州桂花糖藕', description: '苏州甜品，糖藕香甜，桂花飘香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '无锡小笼包', description: '无锡特色，小笼包皮薄汁多', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '苏式汤圆', description: '苏州传统，汤圆软糯，馅料香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '南京鸭血粉丝汤', description: '南京特色，鸭血嫩滑，粉丝爽滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 浙菜系列 (30个)
      { name: '西湖醋鱼', description: '杭州名菜，醋鱼酸甜，鱼肉鲜嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东坡肉', description: '浙菜经典，东坡肉肥瘦相间，香糯可口', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '龙井虾仁', description: '杭州特色，虾仁鲜嫩，龙井茶香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '叫花童鸡', description: '浙菜名品，童鸡嫩滑，香味浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '宋嫂鱼羹', description: '杭州传统，鱼羹鲜美，口感顺滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蜜汁莲藕', description: '浙菜甜品，莲藕香甜，蜜汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '油焖春笋', description: '浙菜时令，春笋鲜嫩，油焖香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋里脊', description: '浙菜家常，里脊酸甜，外酥内嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切鸡', description: '浙菜传统，白切鸡肉质鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杭州小笼包', description: '杭州小吃，小笼包皮薄汁多', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西湖莼菜汤', description: '杭州名汤，莼菜清香，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '绍兴醉鸡', description: '绍兴特色，醉鸡香嫩，酒香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋羹', description: '浙菜家常，蛋羹嫩滑，口感细腻', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杭州酱鸭', description: '杭州特产，酱鸭香嫩，味道浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '清汤鱼圆', description: '浙菜传统，鱼圆Q弹，清汤鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '温州鱼丸', description: '温州特色，鱼丸鲜美，汤汁清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '金华火腿', description: '金华特产，火腿香浓，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '宁波汤圆', description: '宁波特色，汤圆软糯，馅料香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '浙江年糕', description: '浙江传统，年糕软糯，口感香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杭州片儿川', description: '杭州面食，片儿川汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '绍兴臭豆腐', description: '绍兴特色，臭豆腐外酥内嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '浙江醉虾', description: '浙菜特色，醉虾鲜美，酒香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杭州桂花糖藕', description: '杭州甜品，糖藕香甜，桂花飘香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '温州瘦肉丸', description: '温州特色，瘦肉丸Q弹，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '浙江红烧肉', description: '浙菜经典，红烧肉香甜，肥瘦相间', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杭州定胜糕', description: '杭州糕点，定胜糕香甜，寓意吉祥', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '宁波雪菜黄鱼', description: '宁波特色，雪菜黄鱼鲜美，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '浙江蒸蛋', description: '浙菜家常，蒸蛋嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杭州猫耳朵', description: '杭州小吃，猫耳朵形状可爱，口感Q弹', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '绍兴黄酒鸡', description: '绍兴特色，黄酒鸡香嫩，酒香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 徽菜系列 (30个)
      { name: '臭鳜鱼', description: '徽菜名品，鳜鱼鲜美，臭香独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '毛豆腐', description: '徽州特色，毛豆腐外酥内嫩，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧肉', description: '徽菜经典，红烧肉肥瘦相间，香甜可口', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州刀板香', description: '徽州传统，刀板香味浓，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山烧饼', description: '黄山特产，烧饼酥脆，香味浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州圆子', description: '徽州传统，圆子鲜美，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '安徽板鸭', description: '安徽特产，板鸭香嫩，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州糯米饭', description: '徽州传统，糯米饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山双石', description: '黄山名菜，双石造型独特，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州腊肉', description: '徽州特产，腊肉香浓，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '安徽蒸蛋', description: '徽菜家常，蒸蛋嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州炒面', description: '徽州面食，炒面香滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山石耳', description: '黄山特产，石耳珍贵，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州豆腐', description: '徽州传统，豆腐嫩滑，口感清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '安徽炒饭', description: '徽菜主食，炒饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州糖醋鱼', description: '徽菜经典，糖醋鱼酸甜，鱼肉鲜嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山笋干', description: '黄山特产，笋干香脆，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州白切鸡', description: '徽菜传统，白切鸡肉质鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '安徽汤面', description: '徽菜面食，汤面清香，面条爽滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州梅菜扣肉', description: '徽菜经典，梅菜扣肉香糯，肥瘦相间', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山茶叶蛋', description: '黄山特色，茶叶蛋香嫩，茶香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州酱菜', description: '徽州传统，酱菜爽脆，开胃下饭', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '安徽粥品', description: '徽菜粥类，粥品香浓，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州糖糕', description: '徽州甜品，糖糕香甜，口感松软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山野菜', description: '黄山特产，野菜清香，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州小炒', description: '徽菜小炒，火候精准，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '安徽馒头', description: '徽州面食，馒头松软，口感香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州凉菜', description: '徽菜凉菜，爽口开胃，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '黄山甜品', description: '黄山甜品，香甜可口，传统风味', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '徽州汤品', description: '徽菜汤品，汤汁浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() }
    ];
    
    console.log(`准备添加 ${moreDishes.length} 个新菜品到数据库...`);
    
    // 批量插入新菜品
    const { data, error } = await supabase
      .from('dishes')
      .insert(moreDishes);
    
    if (error) {
      console.error('添加菜品时出错:', error);
      throw error;
    }
    
    console.log(`成功添加了 ${moreDishes.length} 个新菜品!`);
    
    // 验证添加后的菜品数量
    const { count: finalCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`数据库中现在总共有 ${finalCount} 个菜品`);
    console.log(`目标数量: 1000个菜品`);
    console.log(`是否达到目标: ${finalCount >= 1000 ? '是' : '否'}`);
    
  } catch (error) {
    console.error('执行过程中出现错误:', error);
    process.exit(1);
  }
};

// 执行函数
addMoreDishes();