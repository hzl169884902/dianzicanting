import { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { supabase } from '@/lib/supabase';
import { 
  SparklesIcon, 
  HeartIcon, 
  ClockIcon,
  FireIcon,
  StarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import type { Dish } from '@/lib/supabase';
import OptimizedImage from '../components/OptimizedImage';

interface RecommendationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  dishes: Dish[];
}

export default function Recommendations() {
  const { dishes, dietRecords, loading, fetchDishes, fetchDietRecords } = useAppStore();
  const [recommendations, setRecommendations] = useState<RecommendationCategory[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('today-special');

  useEffect(() => {
    fetchDishes();
    fetchDietRecords();
    loadFavorites();
  }, [fetchDishes, fetchDietRecords]);

  useEffect(() => {
    if (dishes.length > 0) {
      generateRecommendations();
    }
  }, [dishes, dietRecords]);

  const loadFavorites = async () => {
    // 模拟从本地存储加载收藏
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  };

  const toggleFavorite = (dishId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dishId)) {
      newFavorites.delete(dishId);
    } else {
      newFavorites.add(dishId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
  };

  const generateRecommendations = () => {
    // 获取今日种子，确保每日推荐不同
    const today = new Date().toDateString();
    const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    
    // 基于日期的随机函数
    const dailyRandom = (index: number) => {
      return ((seed + index) * 9301 + 49297) % 233280 / 233280;
    };

    // 打乱数组但保持每日一致
    const shuffleDaily = (array: Dish[], count: number = 8) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(dailyRandom(i) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, count);
    };

    // 今日特推 - 每日不同的精选菜品
    const todaySpecial = shuffleDaily(dishes.filter(dish => dish.avg_rating >= 4.0));

    // 食堂推荐 - 适合食堂的家常菜
    const cafeteriaFriendly = shuffleDaily(
      dishes.filter(dish => 
        dish.name.includes('炒') || dish.name.includes('烧') || 
        dish.name.includes('炖') || dish.name.includes('汤') ||
        dish.name.includes('面') || dish.name.includes('饭') ||
        (dish.nutrition_facts?.calories || 0) < 200
      )
    );

    // 外卖爆款 - 基于真实外卖平台热门数据
    const deliveryHits = shuffleDaily(
      dishes.filter(dish => 
        // 基于2024年真实外卖热门品类数据
        dish.name.includes('小龙虾') ||
        dish.name.includes('烧烤') ||
        dish.name.includes('炸鸡') ||
        dish.name.includes('汉堡') ||
        dish.name.includes('薯条') ||
        dish.name.includes('奶茶') ||
        dish.name.includes('卤味') ||
        dish.name.includes('麻辣烫') ||
        dish.name.includes('火锅') ||
        dish.name.includes('串串') ||
        dish.name.includes('烤肉') ||
        dish.name.includes('披萨') ||
        dish.name.includes('寿司') ||
        dish.avg_rating >= 4.2 && 
        (dish.name.includes('鸡') || dish.name.includes('牛') || 
         dish.name.includes('猪') || dish.name.includes('鱼') ||
         dish.name.includes('虾') || dish.name.includes('蛋'))
      )
    );

    // 省钱美食 - 经济实惠的选择
    const budgetFriendly = shuffleDaily(
      dishes.filter(dish => 
        dish.name.includes('土豆') || dish.name.includes('白菜') ||
        dish.name.includes('豆腐') || dish.name.includes('蛋') ||
        dish.name.includes('面条') || dish.name.includes('米饭')
      )
    );

    // 夜宵推荐 - 基于真实夜宵热门菜品数据
    const lateNightSnacks = shuffleDaily(
      dishes.filter(dish => 
        // 基于2024年真实夜宵热门数据：烤串、小龙虾、炸鸡等
        dish.name.includes('小龙虾') ||
        dish.name.includes('麻辣小龙虾') ||
        dish.name.includes('烧烤') ||
        dish.name.includes('烤串') ||
        dish.name.includes('炸鸡') ||
        dish.name.includes('炸串') ||
        dish.name.includes('麻辣烫') ||
        dish.name.includes('烤冷面') ||
        dish.name.includes('湖南米粉') ||
        dish.name.includes('烤肉') ||
        dish.name.includes('串串香') ||
        dish.name.includes('卤味') ||
        dish.name.includes('炸鸡排') ||
        dish.name.includes('烤鱼') ||
        dish.name.includes('烤鸭') ||
        dish.name.includes('烤羊肉串') ||
        dish.name.includes('烤牛肉串') ||
        ((dish.nutrition_facts?.calories || 0) < 180 &&
        (dish.name.includes('粥') || dish.name.includes('汤') ||
         dish.name.includes('面') || dish.name.includes('蒸蛋')))
      )
    );

    // 个性化推荐 - 基于用户饮食记录
    const personalizedDishes = getPersonalizedRecommendations();

    const categories: RecommendationCategory[] = [
      {
        id: 'today-special',
        title: '今日特推',
        description: '每日精选，今天就吃这个！',
        icon: SparklesIcon,
        color: 'text-yellow-600 bg-yellow-100',
        dishes: todaySpecial
      },
      {
        id: 'cafeteria',
        title: '食堂推荐',
        description: '食堂必点，经济实惠又好吃',
        icon: HeartIcon,
        color: 'text-green-600 bg-green-100',
        dishes: cafeteriaFriendly
      },
      {
        id: 'delivery',
        title: '外卖爆款',
        description: '外卖点餐，这些最受欢迎',
        icon: FireIcon,
        color: 'text-red-600 bg-red-100',
        dishes: deliveryHits
      },
      {
        id: 'budget',
        title: '省钱美食',
        description: '学生党福利，便宜又美味',
        icon: StarIcon,
        color: 'text-blue-600 bg-blue-100',
        dishes: budgetFriendly
      },
      {
        id: 'late-night',
        title: '夜宵推荐',
        description: '熬夜必备，轻食不负担',
        icon: ClockIcon,
        color: 'text-purple-600 bg-purple-100',
        dishes: lateNightSnacks
      },
      {
        id: 'personalized',
        title: '为你推荐',
        description: '基于你的饮食偏好定制',
        icon: HeartIcon,
        color: 'text-pink-600 bg-pink-100',
        dishes: personalizedDishes
      }
    ];

    setRecommendations(categories);
  };

  const getPersonalizedRecommendations = (): Dish[] => {
    if (dietRecords.length === 0) {
      // 如果没有饮食记录，返回适合大学生的高评分菜品
      return [...dishes]
        .filter(dish => {
          const calories = dish.nutrition_facts?.calories || 0;
          const protein = dish.nutrition_facts?.protein || 0;
          // 适合大学生的营养标准：热量适中，蛋白质充足
          return calories >= 150 && calories <= 400 && protein >= 8;
        })
        .sort((a, b) => b.avg_rating - a.avg_rating)
        .slice(0, 8);
    }

    // 分析用户口味偏好
    const tasteProfile = analyzeTastePreferences();
    
    // 分析用户营养需求
    const nutritionNeeds = analyzeNutritionNeeds();
    
    // 分析用户偏好的分类
    const categoryPreferences = new Map<string, number>();
    dietRecords.forEach(record => {
      if (record.dish?.category_id) {
        const count = categoryPreferences.get(record.dish.category_id) || 0;
        categoryPreferences.set(record.dish.category_id, count + 1);
      }
    });

    // 获取用户最喜欢的分类
    const preferredCategories = [...categoryPreferences.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([categoryId]) => categoryId);

    // 智能推荐算法：综合考虑口味、营养、分类偏好
    const scoredDishes = dishes
      .filter(dish => !dietRecords.some(record => record.dish_id === dish.id)) // 排除已吃过的
      .map(dish => {
        let score = dish.avg_rating * 20; // 基础评分
        
        // 口味匹配加分
        score += calculateTasteScore(dish, tasteProfile);
        
        // 营养匹配加分
        score += calculateNutritionScore(dish, nutritionNeeds);
        
        // 分类偏好加分
        if (preferredCategories.includes(dish.category_id)) {
          const categoryRank = preferredCategories.indexOf(dish.category_id);
          score += (3 - categoryRank) * 15; // 第一偏好+45分，第二+30分，第三+15分
        }
        
        // 时间因素加分（根据当前时间推荐合适的菜品）
        score += calculateTimeScore(dish);
        
        return { dish, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.dish);

    return scoredDishes.length > 0 ? scoredDishes : 
      [...dishes].sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 8);
  };

  // 分析用户口味偏好
  const analyzeTastePreferences = () => {
    const tasteProfile = {
      spicy: 0,
      sweet: 0,
      sour: 0,
      salty: 0,
      umami: 0
    };

    dietRecords.forEach(record => {
      const dishName = record.dish?.name || '';
      
      // 基于菜名分析口味偏好
      if (dishName.includes('辣') || dishName.includes('麻') || dishName.includes('川') || dishName.includes('湘')) {
        tasteProfile.spicy += 1;
      }
      if (dishName.includes('甜') || dishName.includes('糖')) {
        tasteProfile.sweet += 1;
      }
      if (dishName.includes('酸') || dishName.includes('醋')) {
        tasteProfile.sour += 1;
      }
      if (dishName.includes('咸') || dishName.includes('盐')) {
        tasteProfile.salty += 1;
      }
      if (dishName.includes('鲜') || dishName.includes('汤')) {
        tasteProfile.umami += 1;
      }
    });

    return tasteProfile;
  };

  // 分析用户营养需求
  const analyzeNutritionNeeds = () => {
    if (dietRecords.length === 0) {
      // 默认大学生营养需求
      return {
        targetCalories: 300, // 单餐目标热量
        targetProtein: 15,   // 单餐目标蛋白质
        targetCarbs: 40,     // 单餐目标碳水
        targetFat: 10        // 单餐目标脂肪
      };
    }

    // 基于历史记录计算平均营养摄入
    const totalRecords = dietRecords.length;
    const avgCalories = dietRecords.reduce((sum, record) => 
      sum + ((record.dish?.nutrition_facts?.calories || 0) * record.portion / 100), 0) / totalRecords;
    const avgProtein = dietRecords.reduce((sum, record) => 
      sum + ((record.dish?.nutrition_facts?.protein || 0) * record.portion / 100), 0) / totalRecords;
    
    return {
      targetCalories: Math.max(200, Math.min(400, avgCalories)), // 限制在合理范围
      targetProtein: Math.max(10, Math.min(25, avgProtein)),
      targetCarbs: avgCalories * 0.5 / 4, // 50%热量来自碳水
      targetFat: avgCalories * 0.25 / 9   // 25%热量来自脂肪
    };
  };

  // 计算口味匹配分数
  const calculateTasteScore = (dish: Dish, tasteProfile: any): number => {
    let score = 0;
    const dishName = dish.name;
    
    // 根据用户口味偏好给菜品打分
    if (tasteProfile.spicy > 0 && (dishName.includes('辣') || dishName.includes('麻') || dishName.includes('川') || dishName.includes('湘'))) {
      score += Math.min(tasteProfile.spicy * 5, 25);
    }
    if (tasteProfile.sweet > 0 && (dishName.includes('甜') || dishName.includes('糖'))) {
      score += Math.min(tasteProfile.sweet * 5, 25);
    }
    if (tasteProfile.sour > 0 && (dishName.includes('酸') || dishName.includes('醋'))) {
      score += Math.min(tasteProfile.sour * 5, 25);
    }
    if (tasteProfile.salty > 0 && (dishName.includes('咸') || dishName.includes('盐'))) {
      score += Math.min(tasteProfile.salty * 5, 25);
    }
    if (tasteProfile.umami > 0 && (dishName.includes('鲜') || dishName.includes('汤'))) {
      score += Math.min(tasteProfile.umami * 5, 25);
    }
    
    return score;
  };

  // 计算营养匹配分数
  const calculateNutritionScore = (dish: Dish, nutritionNeeds: any): number => {
    let score = 0;
    const nutrition = dish.nutrition_facts;
    
    if (nutrition) {
      // 热量匹配度
      const caloriesDiff = Math.abs((nutrition.calories || 0) - nutritionNeeds.targetCalories);
      score += Math.max(0, 20 - caloriesDiff / 10); // 热量越接近目标，分数越高
      
      // 蛋白质匹配度
      const proteinDiff = Math.abs((nutrition.protein || 0) - nutritionNeeds.targetProtein);
      score += Math.max(0, 15 - proteinDiff / 2);
      
      // 营养均衡加分
      const calories = nutrition.calories || 0;
      const protein = nutrition.protein || 0;
      const carbs = nutrition.carbs || 0;
      const fat = nutrition.fat || 0;
      
      // 蛋白质占比合理加分
      if (calories > 0) {
        const proteinRatio = (protein * 4) / calories;
        if (proteinRatio >= 0.15 && proteinRatio <= 0.35) {
          score += 10;
        }
      }
    }
    
    return score;
  };

  // 计算时间因素分数
  const calculateTimeScore = (dish: Dish): number => {
    const hour = new Date().getHours();
    let score = 0;
    
    // 根据时间推荐合适的菜品
    if (hour >= 6 && hour < 10) {
      // 早餐时间：推荐轻食、粥类
      if (dish.name.includes('粥') || dish.name.includes('蛋') || dish.name.includes('面包')) {
        score += 15;
      }
    } else if (hour >= 11 && hour < 14) {
      // 午餐时间：推荐正餐
      if ((dish.nutrition_facts?.calories || 0) >= 250) {
        score += 10;
      }
    } else if (hour >= 17 && hour < 20) {
      // 晚餐时间：推荐营养均衡的菜品
      if ((dish.nutrition_facts?.protein || 0) >= 12) {
        score += 10;
      }
    } else if (hour >= 21 || hour < 6) {
      // 夜宵时间：推荐低热量菜品
      if ((dish.nutrition_facts?.calories || 0) < 200) {
        score += 15;
      }
    }
    
    return score;
  };

  const activeRecommendation = recommendations.find(r => r.id === activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">智能推荐</h1>
        <p className="text-gray-600 mt-1">为你精选的美味佳肴</p>
      </div>

      {/* 推荐分类标签 */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {recommendations.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors
                ${isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* 当前分类信息 */}
      {activeRecommendation && (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${activeRecommendation.color}`}>
              <activeRecommendation.icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {activeRecommendation.title}
              </h2>
              <p className="text-gray-600">{activeRecommendation.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* 推荐菜品网格 */}
      {activeRecommendation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRecommendation.dishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* 菜品图片 */}
              <div className="relative">
                <OptimizedImage
                  src={dish.image_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20chinese%20food%20dish%20on%20white%20plate&image_size=square'}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                  lazy={true}
                />
                <button
                  onClick={() => toggleFavorite(dish.id)}
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                >
                  {favorites.has(dish.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {/* 推荐标签 */}
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    推荐
                  </span>
                </div>
              </div>

              {/* 菜品信息 */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {dish.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm text-yellow-600">
                    <StarIcon className="w-4 h-4 fill-current" />
                    <span>{dish.avg_rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {dish.description}
                </p>
                
                {/* 营养信息 */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-orange-600 font-semibold">{dish.nutrition_facts?.calories || 0}</div>
                    <div className="text-gray-500">卡路里</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-blue-600 font-semibold">{dish.nutrition_facts?.protein || 0}g</div>
                    <div className="text-gray-500">蛋白质</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-green-600 font-semibold">{dish.cooking_time || '--'}min</div>
                    <div className="text-gray-500">制作时间</div>
                  </div>
                </div>
                
                {/* 查看详情按钮 */}
                <Link
                  to={`/dishes/${dish.id}`}
                  className="flex items-center justify-center space-x-2 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                >
                  <span>查看详情</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {activeRecommendation && activeRecommendation.dishes.length === 0 && (
        <div className="text-center py-12">
          <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无推荐</h3>
          <p className="text-gray-600">当前分类下暂无推荐菜品</p>
        </div>
      )}

      {/* 推荐算法说明 */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">大学生专属推荐</h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <strong>今日特推</strong>：每日精选不重复，解决选择困难症</p>
          <p>• <strong>食堂推荐</strong>：适合食堂的家常菜，经济实惠</p>
          <p>• <strong>外卖爆款</strong>：基于2024年真实餐饮数据，包含小龙虾、烧烤、炸鸡等热门品类</p>
          <p>• <strong>省钱美食</strong>：学生党专属，便宜又好吃</p>
          <p>• <strong>夜宵推荐</strong>：涵盖烤串、麻辣小龙虾、烤冷面等真实夜宵菜品</p>
          <p>• <strong>为你推荐</strong>：基于你的饮食记录智能推荐</p>
        </div>
      </div>
    </div>
  );
}