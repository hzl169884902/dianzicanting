import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  ChartBarIcon,
  FireIcon,
  HeartIcon,
  SparklesIcon,
  ClockIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface TasteProfile {
  spicy: number; // 辣味偏好 0-100
  sweet: number; // 甜味偏好 0-100
  sour: number; // 酸味偏好 0-100
  salty: number; // 咸味偏好 0-100
  umami: number; // 鲜味偏好 0-100
}

interface CategoryPreference {
  category: string;
  count: number;
  percentage: number;
  avgRating: number;
}

interface NutritionTrend {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DietRecord {
  id: string;
  dish_id: string;
  record_date: string;
  meal_type: string;
  portion: number;
  created_at: string;
  dish: {
    id: string;
    name: string;
    category_id: string;
    nutrition_facts: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
    };
    categories: {
      name: string;
    };
  };
}

export default function TasteAnalysis() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dietRecords, setDietRecords] = useState<DietRecord[]>([]);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>({
    spicy: 0,
    sweet: 0,
    sour: 0,
    salty: 0,
    umami: 0
  });
  const [categoryPreferences, setCategoryPreferences] = useState<CategoryPreference[]>([]);
  const [nutritionTrends, setNutritionTrends] = useState<NutritionTrend[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    fetchDietData();
  }, [timeRange]);

  const fetchDietData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 计算日期范围
      const endDate = new Date();
      const startDate = new Date();
      switch (timeRange) {
        case 'week':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(endDate.getMonth() - 3);
          break;
      }

      const { data, error } = await supabase
        .from('diet_records')
        .select(`
          *,
          dish:dishes(
            id, name, category_id, nutrition_facts,
            categories(name)
          )
        `)
        .gte('record_date', startDate.toISOString().split('T')[0])
        .lte('record_date', endDate.toISOString().split('T')[0])
        .order('record_date', { ascending: true });

      if (error) throw error;

      const records = data || [];
      setDietRecords(records);

      // 分析口味偏好
      analyzeTasteProfile(records);
      
      // 分析分类偏好
      analyzeCategoryPreferences(records);
      
      // 分析营养趋势
      analyzeNutritionTrends(records);

    } catch (err) {
      setError(err instanceof Error ? err.message : '数据加载失败');
    } finally {
      setLoading(false);
    }
  };

  const analyzeTasteProfile = (records: DietRecord[]) => {
    const profile: TasteProfile = {
      spicy: 0,
      sweet: 0,
      sour: 0,
      salty: 0,
      umami: 0
    };

    records.forEach(record => {
      const dishName = record.dish?.name || '';
      const dishCategory = record.dish?.categories?.name || '';
      
      // 基于菜名和分类分析口味偏好
      if (dishName.includes('辣') || dishName.includes('麻') || dishName.includes('川') || dishName.includes('湘')) {
        profile.spicy += 10;
      }
      if (dishName.includes('甜') || dishName.includes('糖') || dishCategory.includes('甜品')) {
        profile.sweet += 10;
      }
      if (dishName.includes('酸') || dishName.includes('醋') || dishName.includes('柠檬')) {
        profile.sour += 10;
      }
      if (dishName.includes('咸') || dishName.includes('盐') || dishCategory.includes('腌制')) {
        profile.salty += 10;
      }
      if (dishName.includes('鲜') || dishName.includes('汤') || dishCategory.includes('汤类')) {
        profile.umami += 10;
      }
    });

    // 标准化到0-100范围
    const maxValue = Math.max(...Object.values(profile));
    if (maxValue > 0) {
      Object.keys(profile).forEach(key => {
        profile[key as keyof TasteProfile] = Math.min(100, (profile[key as keyof TasteProfile] / maxValue) * 100);
      });
    }

    setTasteProfile(profile);
  };

  const analyzeCategoryPreferences = (records: DietRecord[]) => {
    const categoryMap = new Map<string, { count: number; totalRating: number; ratingCount: number }>();

    records.forEach(record => {
      const category = record.dish?.categories?.name || '其他';
      const current = categoryMap.get(category) || { count: 0, totalRating: 0, ratingCount: 0 };
      current.count += 1;
      categoryMap.set(category, current);
    });

    const totalRecords = records.length;
    const preferences: CategoryPreference[] = Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        count: data.count,
        percentage: (data.count / totalRecords) * 100,
        avgRating: data.ratingCount > 0 ? data.totalRating / data.ratingCount : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    setCategoryPreferences(preferences);
  };

  const analyzeNutritionTrends = (records: DietRecord[]) => {
    const dailyNutrition = new Map<string, { calories: number; protein: number; carbs: number; fat: number }>();

    records.forEach(record => {
      const date = record.record_date;
      const nutrition = record.dish?.nutrition_facts;
      const portion = record.portion / 100;

      if (!nutrition) return;

      const current = dailyNutrition.get(date) || { calories: 0, protein: 0, carbs: 0, fat: 0 };
      current.calories += (nutrition.calories || 0) * portion;
      current.protein += (nutrition.protein || 0) * portion;
      current.carbs += (nutrition.carbs || 0) * portion;
      current.fat += (nutrition.fat || 0) * portion;
      dailyNutrition.set(date, current);
    });

    const trends: NutritionTrend[] = Array.from(dailyNutrition.entries())
      .map(([date, nutrition]) => ({ date, ...nutrition }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14); // 最近14天

    setNutritionTrends(trends);
  };

  const getTasteRadarData = () => {
    return {
      labels: ['辣味', '甜味', '酸味', '咸味', '鲜味'],
      datasets: [
        {
          label: '口味偏好',
          data: [tasteProfile.spicy, tasteProfile.sweet, tasteProfile.sour, tasteProfile.salty, tasteProfile.umami],
          backgroundColor: 'rgba(249, 115, 22, 0.2)',
          borderColor: 'rgba(249, 115, 22, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(249, 115, 22, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(249, 115, 22, 1)'
        }
      ]
    };
  };

  const getCategoryPieData = () => {
    return {
      labels: categoryPreferences.map(pref => pref.category),
      datasets: [
        {
          data: categoryPreferences.map(pref => pref.percentage),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#C9CBCF'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    };
  };

  const getNutritionTrendData = () => {
    return {
      labels: nutritionTrends.map(trend => {
        const date = new Date(trend.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          label: '热量 (kcal)',
          data: nutritionTrends.map(trend => Math.round(trend.calories)),
          borderColor: 'rgb(249, 115, 22)',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
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
          onClick={fetchDietData}
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
          <SparklesIcon className="w-8 h-8 text-purple-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">智能口味分析</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          基于你的饮食历史，深度分析口味偏好和营养习惯，为你提供个性化的美食推荐
        </p>
      </div>

      {/* 时间范围选择 */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          {(['week', 'month', 'quarter'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === 'week' ? '近一周' : range === 'month' ? '近一月' : '近三月'}
            </button>
          ))}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FireIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总用餐次数</p>
              <p className="text-2xl font-bold text-gray-900">{dietRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HeartIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">最爱分类</p>
              <p className="text-2xl font-bold text-gray-900">
                {categoryPreferences[0]?.category || '暂无数据'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均热量</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(nutritionTrends.reduce((sum, trend) => sum + trend.calories, 0) / (nutritionTrends.length || 1))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">口味偏好</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.entries(tasteProfile).reduce((max, [key, value]) => 
                  value > max.value ? { key, value } : max, { key: '', value: 0 }
                ).key === 'spicy' ? '辣味' : 
                 Object.entries(tasteProfile).reduce((max, [key, value]) => 
                  value > max.value ? { key, value } : max, { key: '', value: 0 }
                ).key === 'sweet' ? '甜味' : 
                 Object.entries(tasteProfile).reduce((max, [key, value]) => 
                  value > max.value ? { key, value } : max, { key: '', value: 0 }
                ).key === 'sour' ? '酸味' : 
                 Object.entries(tasteProfile).reduce((max, [key, value]) => 
                  value > max.value ? { key, value } : max, { key: '', value: 0 }
                ).key === 'salty' ? '咸味' : '鲜味'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 口味偏好雷达图 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">口味偏好分析</h3>
          <div className="h-64">
            <Doughnut data={getTasteRadarData()} options={radarOptions} />
          </div>
        </div>

        {/* 分类偏好饼图 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">菜品分类偏好</h3>
          <div className="h-64">
            <Doughnut data={getCategoryPieData()} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 营养趋势图 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">热量摄入趋势</h3>
        <div className="h-64">
          <Line data={getNutritionTrendData()} options={chartOptions} />
        </div>
      </div>

      {/* 分类偏好详情 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">菜品分类详情</h3>
        <div className="space-y-4">
          {categoryPreferences.map((pref, index) => (
            <div key={pref.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{pref.category}</h4>
                  <p className="text-sm text-gray-600">{pref.count} 次用餐</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-orange-600">{pref.percentage.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">占比</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}