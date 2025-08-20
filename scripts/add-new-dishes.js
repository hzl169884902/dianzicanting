require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('缺少必要的环境变量');
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

const addNewDishes = async () => {
  try {
    console.log('开始添加新菜品...');
    
    // 获取现有的category_id
    const { data: categories } = await supabase.from('categories').select('id').limit(1);
    const defaultCategoryId = categories?.[0]?.id || '3971b2e6-dac8-41b4-a144-055d63a13541';
    
    // 检查当前菜品数量
    const { count: currentCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`当前菜品数量: ${currentCount}`);
    
    // 180个新菜品数据 - 分为6个地方菜系，每个30道菜
    const newDishes = [
      // 川菜系列 (30个)
      { name: '水煮鱼片', description: '麻辣鲜香的经典川菜，鱼片嫩滑，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '口水鸡', description: '四川传统凉菜，鸡肉嫩滑，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒜泥白肉', description: '经典川菜凉菜，肉片薄如纸，蒜香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '夫妻肺片', description: '成都名小吃，牛肉牛杂切片，麻辣鲜香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '钟水饺', description: '成都传统小吃，皮薄馅嫩，红油调料', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '担担面', description: '四川传统面食，芝麻酱香浓，微辣开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸辣粉', description: '重庆特色小吃，粉条爽滑，酸辣开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '毛血旺', description: '重庆火锅菜品，血旺嫩滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '辣子鸡丁', description: '川菜经典，鸡丁酥脆，干辣椒香麻', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '樟茶鸭', description: '四川传统名菜，鸭肉香嫩，茶香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '回锅肉', description: '川菜经典，五花肉香嫩，豆瓣酱浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '鱼香肉丝', description: '川菜名菜，肉丝嫩滑，鱼香味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '宫保鸡丁', description: '川菜经典，鸡丁嫩滑，花生米香脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '水煮牛肉', description: '川菜名品，牛肉嫩滑，麻辣鲜香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '麻婆豆腐', description: '川菜经典，豆腐嫩滑，麻辣鲜香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒜泥茄子', description: '川菜家常菜，茄子软糯，蒜香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '干煸豆角', description: '川菜经典，豆角爽脆，干香味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '口水茄子', description: '川菜凉菜，茄子软糯，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '川北凉粉', description: '四川小吃，凉粉爽滑，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '冒菜', description: '成都特色，蔬菜肉类，麻辣鲜香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '火锅鱼', description: '四川特色，鱼肉鲜嫩，汤底麻辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒜蓉白肉', description: '川菜凉菜，白肉嫩滑，蒜香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红油抄手', description: '四川小吃，抄手嫩滑，红油香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '麻辣香锅', description: '川菜创新，配菜丰富，麻辣过瘾', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '川味牛肉面', description: '四川面食，牛肉软烂，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '麻辣烫', description: '四川小吃，配菜自选，麻辣鲜香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '川式回锅肉', description: '川菜经典，五花肉香嫩，豆瓣酱浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒜泥黄瓜', description: '川菜凉菜，黄瓜爽脆，蒜香清新', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '川味口水鸭', description: '四川凉菜，鸭肉鲜嫩，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '麻辣兔头', description: '四川特色，兔头鲜美，麻辣过瘾', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 粤菜系列 (30个)
      { name: '白切鸡', description: '广东经典，鸡肉嫩滑，原汁原味', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '叉烧包', description: '广式点心，包子松软，叉烧香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '虾饺', description: '广式茶点，皮薄透明，虾仁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '烧鹅', description: '广东名菜，鹅肉香嫩，皮脆肉滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸排骨', description: '广式茶点，排骨嫩滑，豉汁香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '干炒牛河', description: '广东经典，河粉爽滑，牛肉嫩香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '艇仔粥', description: '广东粥品，配菜丰富，口感顺滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '肠粉', description: '广式茶点，米皮嫩滑，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋里脊', description: '粤菜经典，里脊嫩滑，糖醋开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白灼菜心', description: '粤菜经典，菜心爽脆，清淡健康', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蜜汁叉烧', description: '广东名菜，叉烧香甜，色泽诱人', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '煲仔饭', description: '广东特色，米饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式月饼', description: '广东传统，饼皮酥脆，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '老火汤', description: '广东汤品，汤汁浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白云猪手', description: '广东名菜，猪手软糯，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式腊肠', description: '广东特产，腊肠香甜，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋羹', description: '粤菜家常，蛋羹嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式炒面', description: '广东面食，面条爽滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '双皮奶', description: '广东甜品，奶香浓郁，口感顺滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '姜撞奶', description: '广东甜品，姜香浓郁，奶味醇厚', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式烧鸭', description: '广东名菜，鸭肉香嫩，皮脆肉滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切猪肚', description: '粤菜经典，猪肚爽脆，蘸料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式点心', description: '广东传统，造型精美，口味多样', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸凤爪', description: '广式茶点，凤爪软糯，豉汁香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式烧饼', description: '广东小吃，饼皮酥脆，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切羊肉', description: '粤菜经典，羊肉鲜嫩，原汁原味', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式糯米鸡', description: '广东传统，糯米香糯，鸡肉鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋挞', description: '广式甜点，蛋挞嫩滑，奶香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '广式云吞', description: '广东小吃，云吞皮薄，馅料鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切牛肉', description: '粤菜经典，牛肉嫩滑，蘸料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 鲁菜系列 (30个)
      { name: '糖醋鲤鱼', description: '山东名菜，鲤鱼鲜嫩，糖醋味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '九转大肠', description: '济南名菜，大肠软糯，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '油爆双脆', description: '鲁菜经典，口感爽脆，火候精准', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '葱烧海参', description: '山东名菜，海参软糯，葱香浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '德州扒鸡', description: '山东特产，鸡肉香嫩，五香味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '四喜丸子', description: '鲁菜经典，丸子鲜美，寓意吉祥', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '爆炒腰花', description: '鲁菜名品，腰花嫩滑，火候精准', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白扒四宝', description: '山东名菜，配菜丰富，营养均衡', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋排骨', description: '鲁菜经典，排骨香嫩，糖醋开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧肘子', description: '山东名菜，肘子软糯，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '锅塌豆腐', description: '济南名菜，豆腐嫩滑，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '油焖大虾', description: '胶东名菜，大虾鲜美，油焖香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋羹', description: '鲁菜家常，蛋羹嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧狮子头', description: '鲁菜经典，狮子头鲜美，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '清汤燕窝', description: '山东名菜，燕窝滋补，清汤鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋饺', description: '鲁菜点心，蛋饺嫩滑，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧带鱼', description: '胶东名菜，带鱼鲜美，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '爆炒肚丝', description: '鲁菜经典，肚丝爽脆，火候精准', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白扒鱼翅', description: '山东名菜，鱼翅珍贵，白扒清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋黄河鲤鱼', description: '济南名菜，鲤鱼鲜嫩，糖醋味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧肉', description: '鲁菜经典，五花肉香嫩，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋卷', description: '鲁菜点心，蛋卷嫩滑，造型精美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '油爆海螺', description: '胶东名菜，海螺鲜美，油爆香脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白扒通天鱼翅', description: '山东名菜，鱼翅珍贵，白扒清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧鲍鱼', description: '鲁菜珍品，鲍鱼鲜美，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '爆炒鱿鱼', description: '胶东名菜，鱿鱼爽脆，火候精准', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋糕', description: '鲁菜甜点，蛋糕松软，口感香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧鸡块', description: '鲁菜家常，鸡块香嫩，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '油焖茄子', description: '鲁菜经典，茄子软糯，油焖香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白扒菜心', description: '鲁菜经典，菜心爽脆，白扒清香', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 湘菜系列 (30个)
      { name: '剁椒鱼头', description: '湖南名菜，鱼头鲜嫩，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '口味虾', description: '长沙特色，小龙虾鲜美，口味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '毛氏红烧肉', description: '湘菜经典，五花肉香嫩，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '辣椒炒肉', description: '湖南家常，辣椒爽脆，肉丝香嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋排骨', description: '湘菜经典，排骨香嫩，糖醋开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '臭豆腐', description: '长沙小吃，豆腐外酥内嫩，臭香独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '长沙米粉', description: '湖南特色，米粉爽滑，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘味小炒肉', description: '湖南家常，小炒肉香嫩，辣椒爽脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸辣土豆丝', description: '湘菜经典，土豆丝爽脆，酸辣开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘西腊肉', description: '湖南特产，腊肉香浓，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '剁椒蒸蛋', description: '湘菜家常，蒸蛋嫩滑，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '口味蛇', description: '湖南特色，蛇肉鲜美，口味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘味牛肉粉', description: '湖南面食，牛肉软烂，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '剁椒茄子', description: '湘菜经典，茄子软糯，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘味口水鸡', description: '湖南凉菜，鸡肉鲜嫩，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸辣白菜', description: '湘菜经典，白菜爽脆，酸辣开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘西血鸭', description: '湖南特色，血鸭鲜美，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '剁椒豆腐', description: '湘菜家常，豆腐嫩滑，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘味炒河粉', description: '湖南面食，河粉爽滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸辣藕片', description: '湘菜经典，藕片爽脆，酸辣开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘西腊肠', description: '湖南特产，腊肠香浓，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '剁椒鸡蛋', description: '湘菜家常，鸡蛋嫩滑，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘味酸菜鱼', description: '湖南特色，鱼肉鲜嫩，酸菜开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '辣椒炒蛋', description: '湘菜家常，辣椒爽脆，鸡蛋嫩滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘西猪脚', description: '湖南特色，猪脚软糯，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '剁椒蒸鸡', description: '湘菜经典，鸡肉鲜嫩，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘味炒面', description: '湖南面食，面条爽滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸辣豆角', description: '湘菜经典，豆角爽脆，酸辣开胃', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '湘西牛肉干', description: '湖南特产，牛肉干香浓，风味独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '剁椒蒸排骨', description: '湘菜经典，排骨香嫩，剁椒香辣', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 闽菜系列 (30个)
      { name: '佛跳墙', description: '福建名菜，食材丰富，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '沙茶面', description: '厦门特色，面条爽滑，沙茶香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '土笋冻', description: '泉州小吃，土笋鲜美，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '荔枝肉', description: '福州名菜，猪肉香甜，形似荔枝', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切河田鸡', description: '福建名菜，河田鸡鲜嫩，原汁原味', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红糟鸡', description: '福州特色，鸡肉香嫩，红糟味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蛎煎', description: '闽南小吃，牡蛎鲜美，煎蛋香嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '鱼丸汤', description: '福建特色，鱼丸弹牙，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白斩鸡', description: '闽菜经典，鸡肉嫩滑，蘸料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧肉', description: '闽菜经典，五花肉香嫩，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋', description: '闽菜家常，蒸蛋嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '炒河粉', description: '闽菜经典，河粉爽滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白灼菜心', description: '闽菜经典，菜心爽脆，清淡健康', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧鱼', description: '闽菜经典，鱼肉鲜嫩，红烧味浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '蒸蛋羹', description: '闽菜家常，蛋羹嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '炒面', description: '闽菜经典，面条爽滑，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白切猪肉', description: '闽菜经典，猪肉嫩滑，蘸料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() }
    ];

    console.log(`准备添加 ${newDishes.length} 个新菜品`);

    const { data, error } = await supabase
      .from('dishes')
      .insert(newDishes);

    if (error) {
      console.error('添加菜品时出错:', error);
      return;
    }

    console.log(`成功添加了 ${newDishes.length} 个新菜品`);
    
    const { count: finalCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`最终菜品数量: ${finalCount}`);
    
  } catch (error) {
    console.error('执行过程中出错:', error);
  }
};

addNewDishes();
