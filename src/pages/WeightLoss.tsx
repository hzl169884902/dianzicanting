import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store';
import { StarIcon, FunnelIcon, FireIcon, HeartIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import type { Dish } from '@/lib/supabase';

export default function WeightLoss() {
  const {
    dishes,
    categories,
    loading,
    error,
    fetchDishes,
    fetchCategories
  } = useAppStore();

  const [showFilters, setShowFilters] = useState(false);
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 150]);
  const [proteinMin, setProteinMin] = useState(20);
  const [fatMax, setFatMax] = useState(8);
  const [sortBy, setSortBy] = useState<'calories' | 'protein' | 'rating' | 'fat'>('calories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, [fetchDishes, fetchCategories]);

  // 筛选减脂餐菜品
  const weightLossDishes = dishes
    .filter(dish => {
      // 从nutrition_facts JSONB字段中提取营养信息
      const nutritionFacts = dish.nutrition_facts as any || {};
      const calories = parseFloat(nutritionFacts.calories) || 0;
      const protein = parseFloat(nutritionFacts.protein) || 0;
      const fat = parseFloat(nutritionFacts.fat) || 0;
      
      const matchesCalories = calories >= calorieRange[0] && calories <= calorieRange[1];
      const matchesProtein = protein >= proteinMin;
      const matchesFat = fat <= fatMax;
      const matchesCategory = !selectedCategory || dish.category_id === selectedCategory;
      
      return matchesCalories && matchesProtein && matchesFat && matchesCategory;
    })
    .sort((a, b) => {
      const aNutrition = a.nutrition_facts as any || {};
      const bNutrition = b.nutrition_facts as any || {};
      
      switch (sortBy) {
        case 'calories':
          return (parseFloat(aNutrition.calories) || 0) - (parseFloat(bNutrition.calories) || 0);
        case 'protein':
          return (parseFloat(bNutrition.protein) || 0) - (parseFloat(aNutrition.protein) || 0);
        case 'fat':
          return (parseFloat(aNutrition.fat) || 0) - (parseFloat(bNutrition.fat) || 0);
        case 'rating':
          return (b.avg_rating || 0) - (a.avg_rating || 0);
        default:
          return 0;
      }
    });

  // 推荐的减脂餐分类
  const recommendedCategories = [
    { name: '低卡主食', icon: '🍚', description: '健康碳水，饱腹感强' },
    { name: '高蛋白菜品', icon: '🥩', description: '增肌减脂，营养丰富' },
    { name: '蔬菜沙拉', icon: '🥗', description: '纤维丰富，热量极低' },
    { name: '清汤类', icon: '🍲', description: '暖胃饱腹，热量控制' }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarOutlineIcon className="w-4 h-4 text-gray-300" />
            <StarIcon className="w-4 h-4 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(<StarOutlineIcon key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };

  const getHealthScore = (dish: Dish) => {
    const nutritionFacts = dish.nutrition_facts as any || {};
    const calories = parseFloat(nutritionFacts.calories) || 0;
    const protein = parseFloat(nutritionFacts.protein) || 0;
    const fat = parseFloat(nutritionFacts.fat) || 0;
    
    // 计算健康评分 (0-100)
    let score = 100;
    
    // 热量评分 (越低越好，150卡以下满分)
    if (calories > 150) score -= (calories - 150) * 0.3;
    
    // 蛋白质评分 (越高越好，20g以上满分)
    if (protein < 20) score -= (20 - protein) * 2;
    
    // 脂肪评分 (越低越好，8g以下满分)
    if (fat > 8) score -= (fat - 8) * 3;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => fetchDishes()}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和介绍 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowTrendingDownIcon className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">减脂餐专区</h1>
        </div>
        <p className="text-gray-600 text-lg mb-4">
          科学搭配，健康减脂。精选低卡高蛋白菜品，助您达成理想体重目标。
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
            <FireIcon className="w-4 h-4 text-orange-500" />
            <span>低热量</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>高蛋白</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
            <span className="text-green-600">🥬</span>
            <span>营养均衡</span>
          </div>
        </div>
      </div>

      {/* 推荐分类 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">推荐分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedCategories.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 筛选控制 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">减脂菜品</h2>
          <p className="text-gray-600 text-sm mt-1">共找到 {weightLossDishes.length} 道适合减脂的菜品</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
        >
          <FunnelIcon className="w-4 h-4" />
          <span>高级筛选</span>
        </button>
      </div>

      {/* 高级筛选面板 */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 热量范围 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                热量范围 (卡/100g): {calorieRange[0]} - {calorieRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={calorieRange[1]}
                  onChange={(e) => setCalorieRange([calorieRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* 最低蛋白质 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最低蛋白质 (g/100g): {proteinMin}
              </label>
              <input
                type="range"
                min="10"
                max="40"
                value={proteinMin}
                onChange={(e) => setProteinMin(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* 最高脂肪 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最高脂肪 (g/100g): {fatMax}
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={fatMax}
                onChange={(e) => setFatMax(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* 排序方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="calories">按热量 (低到高)</option>
                <option value="protein">按蛋白质 (高到低)</option>
                <option value="fat">按脂肪 (低到高)</option>
                <option value="rating">按评分 (高到低)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 菜品网格 */}
      {weightLossDishes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">没有找到符合条件的减脂菜品</div>
          <p className="text-gray-400 text-sm mb-4">尝试调整筛选条件</p>
          <button
            onClick={() => {
              setCalorieRange([0, 150]);
              setProteinMin(20);
              setFatMax(8);
              setSelectedCategory(null);
            }}
            className="text-green-600 hover:text-green-700"
          >
            重置筛选条件
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weightLossDishes.map((dish) => {
            const healthScore = getHealthScore(dish);
            return (
              <Link
                key={dish.id}
                to={`/dishes/${dish.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* 健康评分标签 */}
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    健康度 {healthScore}
                  </div>
                  {/* 低卡标签 */}
                  {((dish.nutrition_facts?.calories || 0)) < 150 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      低卡
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.description}</p>
                  
                  {/* 营养信息 */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    <div className="text-center bg-orange-50 rounded p-1">
                      <div className="font-medium text-orange-600">{parseFloat((dish.nutrition_facts as any)?.calories) || 0}</div>
                      <div className="text-gray-500">卡路里</div>
                    </div>
                    <div className="text-center bg-blue-50 rounded p-1">
                      <div className="font-medium text-blue-600">{parseFloat((dish.nutrition_facts as any)?.protein) || 0}g</div>
                      <div className="text-gray-500">蛋白质</div>
                    </div>
                    <div className="text-center bg-red-50 rounded p-1">
                      <div className="font-medium text-red-600">{parseFloat((dish.nutrition_facts as any)?.fat) || 0}g</div>
                      <div className="text-gray-500">脂肪</div>
                    </div>
                  </div>
                  
                  {/* 评分 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(dish.avg_rating || 0)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({dish.avg_rating?.toFixed(1) || '0.0'})
                      </span>
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      减脂推荐
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}