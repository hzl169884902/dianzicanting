import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import { 
  SunIcon, 
  ClockIcon, 
  FireIcon, 
  StarIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';

interface SummerDish {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category_id: string;
  nutrition_facts: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  avg_rating: number;
  review_count: number;
  cooking_time: number; // 制作时间（分钟）
  difficulty: 'easy' | 'medium' | 'hard';
  summer_features: string[]; // 夏季特色标签
  created_at: string;
}

interface SummerCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const summerCategories: SummerCategory[] = [
  {
    id: 'cold-dishes',
    name: '凉拌菜',
    description: '清爽解腻，开胃下饭',
    icon: '🥗',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'cold-soups',
    name: '冷汤类',
    description: '消暑降温，营养丰富',
    icon: '🍲',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'fruit-dishes',
    name: '水果料理',
    description: '清甜可口，维C丰富',
    icon: '🍉',
    color: 'bg-pink-100 text-pink-800'
  },
  {
    id: 'light-meals',
    name: '轻食简餐',
    description: '简单易做，营养均衡',
    icon: '🥙',
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'beverages',
    name: '夏日饮品',
    description: '解渴消暑，自制健康',
    icon: '🧊',
    color: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'no-cook',
    name: '免煮料理',
    description: '无需开火，简单快手',
    icon: '❄️',
    color: 'bg-indigo-100 text-indigo-800'
  }
];

const difficultyLabels = {
  easy: { text: '简单', color: 'bg-green-100 text-green-800' },
  medium: { text: '中等', color: 'bg-yellow-100 text-yellow-800' },
  hard: { text: '困难', color: 'bg-red-100 text-red-800' }
};

const sortOptions = [
  { value: 'rating', label: '评分最高' },
  { value: 'time', label: '制作时间' },
  { value: 'calories', label: '热量最低' },
  { value: 'created_at', label: '最新发布' }
];

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' }> = ({ rating, size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const halfFilled = rating >= star - 0.5 && rating < star;
        
        return (
          <div key={star} className="relative">
            <StarIcon className={`${sizeClass} text-gray-300`} />
            {filled && (
              <StarSolidIcon className={`absolute inset-0 ${sizeClass} text-yellow-400`} />
            )}
            {halfFilled && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <StarSolidIcon className={`${sizeClass} text-yellow-400`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function SummerRecipes() {
  const { dishes, loading, error, fetchDishes } = useAppStore();
  const [filteredDishes, setFilteredDishes] = useState<SummerDish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [maxCookingTime, setMaxCookingTime] = useState<number>(60);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  useEffect(() => {
    if (dishes.length > 0) {
      // 筛选夏季适合的菜品（这里模拟筛选逻辑）
      const summerDishes = dishes
        .filter(dish => {
          // 筛选低热量、清爽类菜品
          const calories = dish.nutrition_facts?.calories || 0;
          const isLowCalorie = calories < 400;
          const isSummerFriendly = dish.name.includes('凉') || 
                                 dish.name.includes('冷') || 
                                 dish.name.includes('沙拉') ||
                                 dish.name.includes('汤') ||
                                 dish.description?.includes('清爽') ||
                                 dish.description?.includes('解腻');
          return isLowCalorie || isSummerFriendly;
        })
        .map(dish => ({
          ...dish,
          nutrition_facts: {
            calories: dish.nutrition_facts?.calories || 0,
            protein: dish.nutrition_facts?.protein || 0,
            fat: dish.nutrition_facts?.fat || 0,
            carbs: dish.nutrition_facts?.carbs || 0
          },
          cooking_time: Math.floor(Math.random() * 45) + 15, // 模拟制作时间
          difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
          summer_features: getSummerFeatures(dish.name, dish.description || '')
        })) as SummerDish[];

      let filtered = summerDishes;

      // 按分类筛选
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(dish => 
          dish.summer_features.some(feature => 
            getCategoryByFeature(feature) === selectedCategory
          )
        );
      }

      // 按制作时间筛选
      filtered = filtered.filter(dish => dish.cooking_time <= maxCookingTime);

      // 排序
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.avg_rating - a.avg_rating;
          case 'time':
            return a.cooking_time - b.cooking_time;
          case 'calories':
            return (a.nutrition_facts?.calories || 0) - (b.nutrition_facts?.calories || 0);
          case 'created_at':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          default:
            return 0;
        }
      });

      setFilteredDishes(filtered);
    }
  }, [dishes, selectedCategory, sortBy, maxCookingTime]);

  const getSummerFeatures = (name: string, description: string): string[] => {
    const features: string[] = [];
    const text = (name + ' ' + description).toLowerCase();
    
    if (text.includes('凉') || text.includes('冷')) features.push('清爽解腻');
    if (text.includes('汤') || text.includes('粥')) features.push('消暑降温');
    if (text.includes('沙拉') || text.includes('蔬菜')) features.push('营养丰富');
    if (text.includes('简单') || text.includes('快手')) features.push('简单易做');
    if (text.includes('水果') || text.includes('果汁')) features.push('清甜可口');
    
    return features.length > 0 ? features : ['夏日推荐'];
  };

  const getCategoryByFeature = (feature: string): string => {
    const featureMap: { [key: string]: string } = {
      '清爽解腻': 'cold-dishes',
      '消暑降温': 'cold-soups',
      '清甜可口': 'fruit-dishes',
      '简单易做': 'light-meals',
      '解渴消暑': 'beverages',
      '无需开火': 'no-cook'
    };
    return featureMap[feature] || 'light-meals';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">加载失败: {error}</p>
        <button 
          onClick={() => fetchDishes()}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <SunIcon className="w-8 h-8 text-yellow-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">夏季简单菜谱</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          精选清爽易做的夏日料理，让你在炎热的夏天也能轻松享受美味健康的家常菜
        </p>
      </div>

      {/* 分类导航 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部分类
          </button>
          {summerCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 筛选和排序 */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
            筛选
          </button>
          
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          找到 {filteredDishes.length} 道夏季菜谱
        </div>
      </div>

      {/* 高级筛选面板 */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最大制作时间: {maxCookingTime} 分钟
              </label>
              <input
                type="range"
                min="15"
                max="120"
                value={maxCookingTime}
                onChange={(e) => setMaxCookingTime(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15分钟</span>
                <span>120分钟</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 菜谱网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* 菜品图片 */}
            <div className="relative h-48 bg-gray-200">
              <OptimizedImage
                src={dish.image_url}
                alt={dish.name}
                className="w-full h-full object-cover"
                lazy={true}
              />
              {/* 难度标签 */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyLabels[dish.difficulty].color}`}>
                  {difficultyLabels[dish.difficulty].text}
                </span>
              </div>
              {/* 制作时间 */}
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                {dish.cooking_time}分钟
              </div>
            </div>

            {/* 菜品信息 */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{dish.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.description}</p>
              
              {/* 夏季特色标签 */}
              <div className="flex flex-wrap gap-1 mb-3">
                {dish.summer_features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              {/* 营养信息 */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
                  <span>{dish.nutrition_facts?.calories || 0} 卡</span>
                </div>
                <div className="flex items-center">
                  <StarRating rating={dish.avg_rating} />
                  <span className="ml-1 text-xs">({dish.review_count})</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <button className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                  查看菜谱
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  收藏
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <SunIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无符合条件的夏季菜谱</h3>
          <p className="text-gray-600 mb-4">试试调整筛选条件或浏览其他分类</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setMaxCookingTime(60);
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            重置筛选
          </button>
        </div>
      )}
    </div>
  );
}