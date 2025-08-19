import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import {
  FireIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';

export default function Home() {
  const { dishes, categories, loading, fetchDishes, fetchCategories } = useAppStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredDishes, setFeaturedDishes] = useState<any[]>([]);
  const [popularCategories, setPopularCategories] = useState<any[]>([]);
  const [recentDishes, setRecentDishes] = useState<any[]>([]);

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, [fetchDishes, fetchCategories]);

  useEffect(() => {
    if (dishes.length > 0 && categories.length > 0) {
      // 精选菜品 - 评分最高的菜品
      const topRatedDishes = [...dishes]
        .sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0))
        .slice(0, 6);
      setFeaturedDishes(topRatedDishes);

      // 热门分类 - 随机选择一些分类
      const shuffledCategories = [...categories]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
      setPopularCategories(shuffledCategories);

      // 最新菜品 - 按创建时间排序
      const latestDishes = [...dishes]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4);
      setRecentDishes(latestDishes);
    }
  }, [dishes, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 使用React Router导航到搜索结果页面
      navigate(`/dishes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickActions = [
    {
      title: '减脂餐',
      description: '低卡健康减脂菜品',
      icon: FireIcon,
      color: 'bg-green-500',
      link: '/weight-loss'
    },
    {
      title: '浏览菜品',
      description: '发现更多美味',
      icon: SparklesIcon,
      color: 'bg-purple-500',
      link: '/dishes'
    },
    {
      title: '智能推荐',
      description: '个性化菜品推荐',
      icon: ArrowTrendingUpIcon,
      color: 'bg-blue-500',
      link: '/recommendations'
    },
    {
      title: '记录饮食',
      description: '快速记录今日饮食',
      icon: UserGroupIcon,
      color: 'bg-orange-500',
      link: '/diet-record'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 欢迎横幅 */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            欢迎来到美食探索家 🍽️
          </h1>
          <p className="text-lg opacity-90 mb-6">
            发现美味菜品，记录饮食习惯，享受健康生活
          </p>
          
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索菜品、食材或分类..."
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              搜索
            </button>
          </form>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* 热门分类 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">热门分类</h2>
          <Link
            to="/dishes"
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            查看全部
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularCategories.map((category) => (
            <Link
              key={category.id}
              to={`/dishes?category=${category.id}`}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-lg font-bold">
                  {category.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* 精选菜品 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <StarSolidIcon className="w-6 h-6 text-yellow-500 mr-2" />
            精选菜品
          </h2>
          <Link
            to="/dishes"
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            查看更多
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <Link
              key={dish.id}
              to={`/dishes/${dish.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <OptimizedImage
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  lazy={true}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {dish.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(dish.average_rating || 0)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      {(dish.average_rating || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FireIcon className="w-4 h-4 mr-1" />
                    {dish.nutrition_facts?.calories || 0} 卡
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 最新菜品 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ClockIcon className="w-6 h-6 text-blue-500 mr-2" />
            最新菜品
          </h2>
          <Link
            to="/dishes?sort=newest"
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            查看更多
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentDishes.map((dish) => (
            <Link
              key={dish.id}
              to={`/dishes/${dish.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <OptimizedImage
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                  lazy={true}
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                  {dish.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <StarSolidIcon className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-gray-600">
                      {(dish.average_rating || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FireIcon className="w-3 h-3 mr-1" />
                    {dish.nutrition_facts?.calories || 0}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
        <SparklesIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          开始你的健康饮食之旅
        </h3>
        <p className="text-gray-600 mb-4">
          记录每一餐，发现更健康的生活方式
        </p>
        <Link
          to="/diet-record"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          立即开始
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}