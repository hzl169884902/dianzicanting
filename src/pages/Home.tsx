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
  MagnifyingGlassIcon,
  HeartIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';
import { DishCard } from '../components/DishCard';

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
      navigate(`/dishes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickActions = [
    {
      title: '减脂餐',
      description: '低卡健康减脂菜品',
      icon: HeartIcon,
      gradient: 'from-emerald-400 to-teal-600',
      link: '/weight-loss'
    },
    {
      title: '浏览菜品',
      description: '发现更多美味',
      icon: SparklesIcon,
      gradient: 'from-purple-400 to-pink-600',
      link: '/dishes'
    },
    {
      title: '智能推荐',
      description: 'AI个性化推荐',
      icon: BoltIcon,
      gradient: 'from-blue-400 to-indigo-600',
      link: '/recommendations'
    },
    {
      title: '记录饮食',
      description: '快速记录今日饮食',
      icon: UserGroupIcon,
      gradient: 'from-orange-400 to-red-600',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* 英雄区域 */}
      <div className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-white/90 text-sm font-medium">
                <SparklesIcon className="w-4 h-4 mr-2" />
                AI驱动的智能美食平台
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
              美食探索家
              <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent mt-2">
                🍽️ 发现美味
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
              用AI重新定义美食体验，发现健康与美味的完美平衡，
              <br className="hidden md:block" />
              让每一餐都成为生活的艺术
            </p>
            
            {/* 搜索框 */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-2xl">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索你想要的美食，开启味蕾之旅..."
                    className="w-full px-8 py-5 pl-16 bg-transparent rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                  />
                  <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    探索
                  </button>
                </div>
              </div>
            </form>
            
            {/* 统计数据 */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-white/70 text-sm">精选菜品</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">AI</div>
                <div className="text-white/70 text-sm">智能推荐</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/70 text-sm">健康分析</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* 快捷操作 */}
        <section className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              开始你的
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">美食之旅</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              选择你感兴趣的功能，让AI为你打造个性化的美食体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickActions.map((action, index) => (
              <div key={index} className="group">
                <Link
                  to={action.link}
                  className="block relative overflow-hidden bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* 背景装饰 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                      {action.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {action.description}
                    </p>
                    
                    <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      立即体验
                      <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                  
                  {/* 悬停效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 热门分类 */}
        <section className="py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-6 py-2 text-orange-600 text-sm font-medium mb-6">
                <FireIcon className="w-4 h-4 mr-2" />
                热门推荐
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                探索
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">美食分类</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                从传统经典到创新融合，发现属于你的味蕾偏好
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {popularCategories.map((category, index) => (
                <div key={category.id} className="group">
                  <Link
                    to={`/dishes?category=${category.id}`}
                    className="block relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-white/50 hover:-translate-y-2"
                  >
                    {/* 悬停背景效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <span className="text-white text-2xl font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link
                to="/dishes"
                className="inline-flex items-center bg-white/90 backdrop-blur-sm text-orange-600 hover:text-orange-700 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200 hover:bg-white group"
              >
                查看全部分类
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* 精选菜品 */}
        <section className="py-24 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-full px-6 py-2 text-yellow-600 text-sm font-medium mb-6">
                <StarSolidIcon className="w-4 h-4 mr-2" />
                主厨推荐
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                今日
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">精选菜品</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                由AI智能推荐，结合营养价值与口味偏好的完美搭配
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.map((dish, index) => (
                <div key={dish.id} className="group">
                  <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2">
                    <DishCard
                      dish={dish}
                      variant="featured"
                      index={index}
                      showActions={true}
                    />
                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-amber-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link
                to="/dishes"
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                探索更多美味
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* 最新菜品 */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 text-blue-600 text-sm font-medium mb-6">
                <ClockIcon className="w-4 h-4 mr-2" />
                新鲜上架
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                最新
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">创意菜品</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                创新口味与传统工艺的完美结合，每一道都是味蕾的新体验
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentDishes.map((dish, index) => (
                <div key={dish.id} className="group">
                  <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2">
                    <DishCard
                      dish={dish}
                      variant="compact"
                      index={index}
                      showActions={true}
                    />
                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-indigo-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link
                to="/dishes?sort=newest"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                发现更多新品
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>



        {/* 底部提示 */}
        <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-blue-300 text-sm font-medium mb-8">
              <SparklesIcon className="w-4 h-4 mr-2" />
              智能美食平台
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              开启您的
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-2">
                智慧饮食之旅
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI智能推荐 · 精准营养分析 · 个性化定制
              <br className="hidden md:block" />
              让每一餐都成为健康生活的美好开始
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/dishes"
                className="group relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">开始浏览菜品</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/nutrition"
                className="group relative border-2 border-white/30 hover:border-white/50 text-white hover:text-blue-100 px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                了解营养分析
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            {/* 底部装饰统计 */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-200">精选菜品</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50万+</div>
                <div className="text-blue-200">用户信赖</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99%</div>
                <div className="text-blue-200">满意度</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}