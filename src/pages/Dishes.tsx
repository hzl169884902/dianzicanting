import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../store';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon, FunnelIcon } from '@heroicons/react/24/outline';
import OptimizedImage from '../components/OptimizedImage';
import type { Dish } from '@/lib/supabase';

export default function Dishes() {
  const [searchParams] = useSearchParams();
  const {
    dishes,
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    searchQuery,
    sortBy,
    sortOrder,
    loading,
    error,
    fetchDishes,
    fetchCategories,
    fetchBrands,
    setSelectedCategory,
    setSelectedBrand,
    setSearchQuery,
    setSortBy,
    setSortOrder
  } = useAppStore();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDishes();
    fetchCategories();
    fetchBrands();
    
    // 处理URL搜索参数
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    if (brand) {
      setSelectedBrand(brand);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [fetchDishes, fetchCategories, fetchBrands, searchParams, setSelectedCategory, setSelectedBrand, setSearchQuery]);

  // 过滤和排序菜品
  const filteredAndSortedDishes = dishes
    .filter(dish => {
      const matchesCategory = !selectedCategory || dish.category_id === selectedCategory;
      const matchesSearch = !searchQuery || 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'rating':
          aValue = a.avg_rating || 0;
          bValue = b.avg_rating || 0;
          break;
        case 'calories':
          aValue = a.nutrition_facts?.calories || 0;
          bValue = b.nutrition_facts?.calories || 0;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => fetchDishes()}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">菜品展示</h1>
          <p className="text-gray-600 mt-1">发现美味，享受健康</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
        >
          <FunnelIcon className="w-4 h-4" />
          <span>筛选</span>
        </button>
      </div>

      {/* 筛选和排序 */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 分类筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">全部分类</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 品牌筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">品牌</label>
              <select
                value={selectedBrand || ''}
                onChange={(e) => setSelectedBrand(e.target.value || null)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">全部品牌</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 排序方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="name">按名称</option>
                <option value="rating">按评分</option>
                <option value="calories">按热量</option>
                <option value="created_at">按时间</option>
              </select>
            </div>

            {/* 排序顺序 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">排序顺序</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="asc">升序</option>
                <option value="desc">降序</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 搜索结果统计 */}
      <div className="text-sm text-gray-600">
        {searchQuery && (
          <span>搜索 "{searchQuery}" 的结果：</span>
        )}
        共找到 {filteredAndSortedDishes.length} 道菜品
      </div>

      {/* 菜品网格 */}
      {filteredAndSortedDishes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">没有找到符合条件的菜品</div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedBrand(null);
              setSearchQuery('');
            }}
            className="mt-4 text-orange-600 hover:text-orange-700"
          >
            清除筛选条件
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedDishes.map((dish) => (
            <Link
              key={dish.id}
              to={`/dishes/${dish.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <OptimizedImage
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                  lazy={true}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{dish.description}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(dish.avg_rating || 0)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({dish.avg_rating?.toFixed(1) || '0.0'})
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {dish.nutrition_facts?.calories || 0} 卡/100g
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    蛋白质: {dish.nutrition_facts?.protein || 0}g
                  </span>
                  <span className="text-gray-600">
                    脂肪: {dish.nutrition_facts?.fat || 0}g
                  </span>
                </div>
                
                {/* 品牌信息 */}
                {dish.brands && (
                  <div className="flex items-center space-x-2">
                    {dish.brands.logo_url && (
                      <img 
                        src={dish.brands.logo_url} 
                        alt={dish.brands.name}
                        className="w-4 h-4 object-contain"
                      />
                    )}
                    <span className="text-xs text-gray-500">{dish.brands.name}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}