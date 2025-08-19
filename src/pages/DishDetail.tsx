import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { StarIcon, ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';
import type { DishWithDetails, DishReview } from '@/lib/supabase';

export default function DishDetail() {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<DishWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDishDetail(id);
    }
  }, [id]);

  const fetchDishDetail = async (dishId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('dishes')
        .select(`
          *,
          categories(name),
          dish_ingredients(
            amount,
            unit,
            ingredients(name)
          ),
          dish_reviews(
            id,
            rating,
            comment,
            created_at,
            user_id
          )
        `)
        .eq('id', dishId)
        .single();
      
      if (error) throw error;
      setDish(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : '获取菜品详情失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!dish || !newReview.comment.trim()) return;
    
    try {
      setSubmittingReview(true);
      
      const { data, error } = await supabase
        .from('dish_reviews')
        .insert({
          dish_id: dish.id,
          rating: newReview.rating,
          comment: newReview.comment.trim(),
          user_name: '匿名用户' // 简化版本，不需要用户认证
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // 更新本地状态
      setDish(prev => prev ? {
        ...prev,
        dish_reviews: [data, ...(prev.dish_reviews || [])]
      } : null);
      
      setNewReview({ rating: 5, comment: '' });
      setShowAddReview(false);
    } catch (error) {
      alert('添加评价失败，请重试');
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      const filled = i <= rating;
      const StarComponent = filled ? StarIcon : StarOutlineIcon;
      
      stars.push(
        <StarComponent
          key={i}
          className={`w-5 h-5 ${
            interactive 
              ? 'cursor-pointer hover:text-yellow-400' 
              : ''
          } ${
            filled ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => interactive && onRate && onRate(i)}
        />
      );
    }
    
    return stars;
  };

  const averageRating = dish?.dish_reviews?.length 
    ? dish.dish_reviews.reduce((sum, review) => sum + review.rating, 0) / dish.dish_reviews.length
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || '菜品不存在'}</div>
        <Link to="/dishes" className="text-orange-600 hover:text-orange-700">
          返回菜品列表
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 返回按钮 */}
      <Link
        to="/dishes"
        className="inline-flex items-center text-orange-600 hover:text-orange-700"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        返回菜品列表
      </Link>

      {/* 菜品主要信息 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <OptimizedImage
              src={dish.image_url}
              alt={dish.name}
              className="w-full h-64 md:h-full object-cover"
              lazy={false}
            />
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{dish.name}</h1>
                <span className="inline-block bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">
                  {dish.category?.name || '未分类'}
                </span>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <p className="text-gray-600 mb-6">{dish.description}</p>

            {/* 评分 */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-1 mr-3">
                {renderStars(averageRating)}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-500 ml-2">
                ({dish.dish_reviews?.length || 0} 条评价)
              </span>
            </div>

            {/* 营养信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">热量</div>
                <div className="text-lg font-semibold">{dish.nutrition_facts?.calories || 0} 卡</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">蛋白质</div>
                <div className="text-lg font-semibold">{dish.nutrition_facts?.protein || 0}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">脂肪</div>
                <div className="text-lg font-semibold">{dish.nutrition_facts?.fat || 0}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">碳水化合物</div>
                <div className="text-lg font-semibold">{dish.nutrition_facts?.carbs || 0}g</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 食材列表 */}
      {dish.dish_ingredients.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">主要食材</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {dish.dish_ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="text-gray-900">{ingredient.ingredients.name}</span>
                <span className="text-sm text-gray-600">
                  {ingredient.amount}{ingredient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 用户评价 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">用户评价</h2>
          <button
            onClick={() => setShowAddReview(true)}
            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            <PlusIcon className="w-4 h-4" />
            <span>添加评价</span>
          </button>
        </div>

        {/* 添加评价表单 */}
        {showAddReview && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">添加您的评价</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">评分</label>
                <div className="flex items-center space-x-1">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">评价内容</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="分享您的用餐体验..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddReview}
                  disabled={submittingReview || !newReview.comment.trim()}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingReview ? '提交中...' : '提交评价'}
                </button>
                <button
                  onClick={() => {
                    setShowAddReview(false);
                    setNewReview({ rating: 5, comment: '' });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 评价列表 */}
        {!dish.dish_reviews || dish.dish_reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无评价，成为第一个评价的人吧！
          </div>
        ) : (
          <div className="space-y-4">
            {dish.dish_reviews?.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">用户{review.user_id}</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}