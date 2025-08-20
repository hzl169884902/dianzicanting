// 添加最后90个菜品达到1000个目标
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载项目根目录的.env文件
dotenv.config({ path: path.join(__dirname, '..', '.env') });

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

const addFinalDishes = async () => {
  try {
    console.log('开始添加最后90个菜品...');
    
    // 获取现有的category_id
    const { data: categories } = await supabase.from('categories').select('id').limit(1);
    const defaultCategoryId = categories?.[0]?.id || '3971b2e6-dac8-41b4-a144-055d63a13541';
    
    // 检查当前菜品数量
    const { count: currentCount } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true });
    
    console.log(`当前菜品数量: ${currentCount}`);
    
    // 最后90个菜品 - 京菜、东北菜、西北菜
    const finalDishes = [
      // 京菜系列 (30个)
      { name: '北京烤鸭', description: '京菜招牌，烤鸭皮脆肉嫩，配薄饼蘸酱', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京酱肉丝', description: '京菜经典，肉丝嫩滑，京酱香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '宫保鸡丁', description: '京菜名品，鸡丁嫩滑，花生香脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖醋里脊', description: '京菜传统，里脊酸甜，外酥内嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '炸酱面', description: '北京特色，炸酱香浓，面条爽滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '豆汁焦圈', description: '北京小吃，豆汁酸甜，焦圈酥脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '卤煮火烧', description: '北京传统，卤煮香浓，火烧软糯', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '驴打滚', description: '北京甜品，驴打滚软糯，豆面香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '艾窝窝', description: '北京小吃，艾窝窝软糯，馅料香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '豌豆黄', description: '北京传统，豌豆黄香甜，口感细腻', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '糖火烧', description: '北京小吃，糖火烧香甜，外酥内软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '炒肝', description: '北京传统，炒肝香浓，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '爆肚', description: '北京特色，爆肚脆嫩，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '门钉肉饼', description: '北京小吃，肉饼香嫩，外皮酥脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '褡裢火烧', description: '北京传统，褡裢火烧香脆，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '炸灌肠', description: '北京小吃，炸灌肠外酥内嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '羊蝎子', description: '北京火锅，羊蝎子香浓，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '涮羊肉', description: '北京火锅，涮羊肉鲜嫩，蘸料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '北京炸鸡', description: '京菜改良，炸鸡外酥内嫩，调料独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京式糖醋鱼', description: '京菜经典，糖醋鱼酸甜，鱼肉鲜嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '北京小笼包', description: '京式小吃，小笼包皮薄汁多', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京式红烧肉', description: '京菜传统，红烧肉肥瘦相间，香甜可口', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '北京汤面', description: '京式面食，汤面清香，面条爽滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京式蒸蛋', description: '京菜家常，蒸蛋嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '北京炒饭', description: '京式主食，炒饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京式白切鸡', description: '京菜传统，白切鸡肉质鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '北京粥品', description: '京式粥类，粥品香浓，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京式糖糕', description: '北京甜品，糖糕香甜，口感松软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '北京凉菜', description: '京菜凉菜，爽口开胃，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '京式汤品', description: '京菜汤品，汤汁浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 东北菜系列 (30个)
      { name: '锅包肉', description: '东北名菜，锅包肉酸甜，外酥内嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '白肉血肠', description: '东北传统，白肉血肠香浓，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北乱炖', description: '东北家常，乱炖营养丰富，口感层次', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '红烧肘子', description: '东北硬菜，肘子软糯，汤汁浓郁', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸菜炖粉条', description: '东北经典，酸菜爽脆，粉条滑嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '小鸡炖蘑菇', description: '东北名菜，小鸡鲜嫩，蘑菇香浓', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '猪肉炖粉条', description: '东北家常，猪肉香嫩，粉条滑嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '地三鲜', description: '东北素菜，地三鲜香嫩，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北饺子', description: '东北主食，饺子皮薄馅大，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '哈尔滨红肠', description: '东北特产，红肠香浓，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北大拉皮', description: '东北凉菜，大拉皮爽滑，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '溜肉段', description: '东北名菜，溜肉段外酥内嫩，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北烤肉', description: '东北特色，烤肉香嫩，调料独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸菜鱼', description: '东北改良，酸菜鱼酸辣，鱼肉鲜嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北大骨汤', description: '东北汤品，大骨汤浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '拔丝地瓜', description: '东北甜品，拔丝地瓜香甜，外酥内软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北炖菜', description: '东北家常，炖菜营养丰富，口感层次', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '杀猪菜', description: '东北传统，杀猪菜香浓，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北面条', description: '东北面食，面条爽滑，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '冰糖葫芦', description: '东北小吃，冰糖葫芦酸甜，外脆内软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北炒饭', description: '东北主食，炒饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北蒸蛋', description: '东北家常，蒸蛋嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北粥品', description: '东北粥类，粥品香浓，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北糖糕', description: '东北甜品，糖糕香甜，口感松软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北凉菜', description: '东北凉菜，爽口开胃，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北汤品', description: '东北汤品，汤汁浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北烧烤', description: '东北特色，烧烤香嫩，调料独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北火锅', description: '东北火锅，汤底浓郁，食材丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北小菜', description: '东北配菜，小菜爽脆，开胃下饭', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '东北点心', description: '东北糕点，点心精美，口感香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      
      // 西北菜系列 (30个)
      { name: '羊肉泡馍', description: '西安名食，羊肉泡馍汤浓肉嫩', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '兰州拉面', description: '兰州特色，拉面清汤，面条劲道', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '新疆大盘鸡', description: '新疆名菜，大盘鸡香辣，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '手抓羊肉', description: '西北传统，手抓羊肉香嫩，原汁原味', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '凉皮', description: '西安小吃，凉皮爽滑，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '肉夹馍', description: '西安特色，肉夹馍香嫩，饼皮酥脆', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '胡辣汤', description: '西北汤品，胡辣汤香辣，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '烤羊肉串', description: '新疆烧烤，羊肉串香嫩，调料独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '抓饭', description: '新疆主食，抓饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '馕', description: '新疆面食，馕香脆，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北面片', description: '西北面食，面片爽滑，汤汁鲜美', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '羊肉串', description: '西北烧烤，羊肉串香嫩，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北炖菜', description: '西北家常，炖菜营养丰富，口感层次', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '酸汤面', description: '西北面食，酸汤面酸辣，面条爽滑', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北烤肉', description: '西北特色，烤肉香嫩，调料独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '油泼面', description: '西安面食，油泼面香辣，面条劲道', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北饺子', description: '西北主食，饺子皮薄馅大，口感丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '羊杂汤', description: '西北汤品，羊杂汤浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北炒饭', description: '西北主食，炒饭香糯，配菜丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '烤包子', description: '新疆小吃，烤包子香脆，馅料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北蒸蛋', description: '西北家常，蒸蛋嫩滑，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北粥品', description: '西北粥类，粥品香浓，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北糖糕', description: '西北甜品，糖糕香甜，口感松软', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北凉菜', description: '西北凉菜，爽口开胃，调料丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北汤品', description: '西北汤品，汤汁浓郁，营养丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北烧烤', description: '西北特色，烧烤香嫩，调料独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北火锅', description: '西北火锅，汤底浓郁，食材丰富', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北小菜', description: '西北配菜，小菜爽脆，开胃下饭', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北点心', description: '西北糕点，点心精美，口感香甜', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() },
      { name: '西北特色菜', description: '西北风味，特色菜香浓，口感独特', category_id: defaultCategoryId, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', nutrition_facts: generateNutrition(), ...generateRating() }
    ];
    
    console.log(`准备添加 ${finalDishes.length} 个新菜品到数据库...`);
    
    // 批量插入新菜品
    const { data, error } = await supabase
      .from('dishes')
      .insert(finalDishes);
    
    if (error) {
      console.error('添加菜品时出错:', error);
      throw error;
    }
    
    console.log(`成功添加了 ${finalDishes.length} 个新菜品!`);
    
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
addFinalDishes();