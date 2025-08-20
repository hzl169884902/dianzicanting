import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../store';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon, FunnelIcon } from '@heroicons/react/24/outline';
import OptimizedImage from '../components/OptimizedImage';
import type { Dish } from '../types/dish';
import { 
  deduplicateDishes, 
  processImageUrl, 
  searchDishes, 
  filterDishesByCategory, 
  filterDishesByBrand, 
  sortDishes,
  cleanDishData
} from '../utils/dishUtils';

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
  const [deduplicationReport, setDeduplicationReport] = useState<string>('');

  // 应用高级去重算法的数据获取函数
  const fetchDishesWithAdvancedDeduplication = async () => {
    try {
      // 获取原始数据
      await fetchDishes();
      await fetchCategories();
      await fetchBrands();
      
      // 清理和去重菜品数据
      const cleanedDishes = cleanDishData(dishes);
      const { dishes: deduplicatedDishes, report } = deduplicateDishes(cleanedDishes);
      
      setDeduplicationReport(report);
      console.log('菜品去重报告:', report);
      
      // 注意：这里不直接修改store中的dishes，而是在渲染时应用去重
      console.log(`原始菜品数量: ${dishes.length}, 去重后数量: ${deduplicatedDishes.length}`);
    } catch (error) {
      console.error('获取菜品数据失败:', error);
    }
  };

  useEffect(() => {
    fetchDishesWithAdvancedDeduplication();
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
  }, [searchParams, setSelectedCategory, setSelectedBrand, setSearchQuery]);

  // 应用去重、过滤和排序
  const processedDishes = (() => {
    // 1. 清理和去重菜品数据
    const cleanedDishes = cleanDishData(dishes);
    const { dishes: deduplicatedDishes } = deduplicateDishes(cleanedDishes);
    
    // 2. 应用搜索过滤
    let filteredDishes = searchDishes(deduplicatedDishes, searchQuery);
    
    // 3. 应用类别过滤
    filteredDishes = filterDishesByCategory(filteredDishes, selectedCategory);
    
    // 4. 应用品牌过滤
    filteredDishes = filterDishesByBrand(filteredDishes, selectedBrand);
    
    // 5. 应用排序
    const sortField = sortBy as 'name' | 'calories' | 'protein';
    return sortDishes(filteredDishes, sortField);
  })();
  
  const filteredAndSortedDishes = processedDishes;

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

      {/* 开发环境去重报告 */}
      {process.env.NODE_ENV === 'development' && deduplicationReport && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            🔧 高级去重报告 (开发环境)
          </h3>
          <pre className="text-sm text-blue-700 whitespace-pre-wrap font-mono bg-white p-4 rounded-lg overflow-auto max-h-96">
            {deduplicationReport}
          </pre>
        </div>
      )}

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
                  src={processImageUrl(dish.image_url)}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                  lazy={true}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{dish.description || '暂无描述'}</p>
                
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
                {dish.brands?.name && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{dish.brands.name}</span>
                  </div>
                )}
                
                {/* 类别信息 */}
                {(dish.categories?.name || dish.category?.name) && (
                  <div className="mt-1">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {dish.categories?.name || dish.category?.name}
                    </span>
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