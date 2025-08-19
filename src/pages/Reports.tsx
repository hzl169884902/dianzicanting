import { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { 
  ChartBarIcon,
  CalendarDaysIcon,
  FireIcon,
  BeakerIcon,
  ScaleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface DailyReport {
  date: string;
  nutrition: NutritionSummary;
  meals: number;
  water: number;
}

export default function Reports() {
  const { dietRecords, loading, fetchDietRecords } = useAppStore();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [dailyReports, setDailyReports] = useState<DailyReport[]>([]);
  const [nutritionGoals] = useState<NutritionSummary>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25
  });

  useEffect(() => {
    fetchDietRecords();
  }, [fetchDietRecords]);

  useEffect(() => {
    if (dietRecords.length > 0) {
      generateReports();
    }
  }, [dietRecords, timeRange]);

  const generateReports = () => {
    const now = new Date();
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
    const reports: DailyReport[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayRecords = dietRecords.filter(record => 
        record.record_date === dateString
      );
      
      const nutrition = dayRecords.reduce((sum, record) => {
        const dish = record.dish;
        if (dish) {
          const multiplier = record.portion / 100;
          return {
            calories: sum.calories + ((dish.nutrition_facts?.calories || 0) * multiplier),
            protein: sum.protein + ((dish.nutrition_facts?.protein || 0) * multiplier),
            carbs: sum.carbs + ((dish.nutrition_facts?.carbs || 0) * multiplier),
            fat: sum.fat + ((dish.nutrition_facts?.fat || 0) * multiplier),
            fiber: sum.fiber + ((dish.nutrition_facts?.fiber || 0) * multiplier)
          };
        }
        return sum;
      }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
      
      reports.push({
        date: dateString,
        nutrition,
        meals: dayRecords.length,
        water: Math.floor(Math.random() * 3000) + 1500 // 模拟饮水量
      });
    }
    
    setDailyReports(reports);
  };

  const getCurrentPeriodSummary = () => {
    if (dailyReports.length === 0) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    }
    
    const total = dailyReports.reduce((sum, report) => ({
      calories: sum.calories + report.nutrition.calories,
      protein: sum.protein + report.nutrition.protein,
      carbs: sum.carbs + report.nutrition.carbs,
      fat: sum.fat + report.nutrition.fat,
      fiber: sum.fiber + report.nutrition.fiber
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
    
    const days = dailyReports.length;
    return {
      calories: total.calories / days,
      protein: total.protein / days,
      carbs: total.carbs / days,
      fat: total.fat / days,
      fiber: total.fiber / days
    };
  };

  const getCaloriesTrendData = () => {
    const labels = dailyReports.map(report => {
      const date = new Date(report.date);
      return timeRange === 'week' 
        ? date.toLocaleDateString('zh-CN', { weekday: 'short' })
        : timeRange === 'month'
        ? date.getDate().toString()
        : date.toLocaleDateString('zh-CN', { month: 'short' });
    });
    
    return {
      labels,
      datasets: [
        {
          label: '每日热量摄入',
          data: dailyReports.map(report => Math.round(report.nutrition.calories)),
          borderColor: 'rgb(249, 115, 22)',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: '目标热量',
          data: dailyReports.map(() => nutritionGoals.calories),
          borderColor: 'rgb(156, 163, 175)',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          pointRadius: 0
        }
      ]
    };
  };

  const getNutritionDistributionData = () => {
    const summary = getCurrentPeriodSummary();
    
    return {
      labels: ['蛋白质', '碳水化合物', '脂肪'],
      datasets: [
        {
          data: [
            Math.round(summary.protein * 4), // 蛋白质热量
            Math.round(summary.carbs * 4),   // 碳水化合物热量
            Math.round(summary.fat * 9)      // 脂肪热量
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)'
          ],
          borderWidth: 2
        }
      ]
    };
  };

  const getMealsData = () => {
    const labels = dailyReports.map(report => {
      const date = new Date(report.date);
      return timeRange === 'week' 
        ? date.toLocaleDateString('zh-CN', { weekday: 'short' })
        : timeRange === 'month'
        ? date.getDate().toString()
        : date.toLocaleDateString('zh-CN', { month: 'short' });
    });
    
    return {
      labels,
      datasets: [
        {
          label: '每日用餐次数',
          data: dailyReports.map(report => report.meals),
          backgroundColor: 'rgba(139, 69, 19, 0.8)',
          borderColor: 'rgb(139, 69, 19)',
          borderWidth: 1
        }
      ]
    };
  };

  const summary = getCurrentPeriodSummary();
  const caloriesTrend = dailyReports.length >= 2 
    ? dailyReports[dailyReports.length - 1].nutrition.calories - dailyReports[dailyReports.length - 2].nutrition.calories
    : 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和时间范围选择 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">健康报告</h1>
          <p className="text-gray-600 mt-1">分析你的饮食习惯和营养摄入</p>
        </div>
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === 'week' ? '近7天' : range === 'month' ? '近30天' : '近一年'}
            </button>
          ))}
        </div>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">平均热量</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(summary.calories)}
                <span className="text-sm font-normal text-gray-500 ml-1">卡</span>
              </p>
              <div className="flex items-center mt-1">
                {caloriesTrend > 0 ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 text-red-500 mr-1" />
                ) : caloriesTrend < 0 ? (
                  <ArrowTrendingDownIcon className="w-4 h-4 text-green-500 mr-1" />
                ) : null}
                <span className={`text-xs ${
                  caloriesTrend > 0 ? 'text-red-500' : caloriesTrend < 0 ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {caloriesTrend > 0 ? '+' : ''}{Math.round(caloriesTrend)} vs 昨日
                </span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FireIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">平均蛋白质</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(summary.protein)}
                <span className="text-sm font-normal text-gray-500 ml-1">g</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((summary.protein / nutritionGoals.protein) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">用餐频率</p>
              <p className="text-2xl font-bold text-gray-900">
                {(dailyReports.reduce((sum, r) => sum + r.meals, 0) / Math.max(dailyReports.length, 1)).toFixed(1)}
                <span className="text-sm font-normal text-gray-500 ml-1">次/天</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                总计 {dailyReports.reduce((sum, r) => sum + r.meals, 0)} 次用餐
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">目标达成</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((summary.calories / nutritionGoals.calories) * 100)}
                <span className="text-sm font-normal text-gray-500 ml-1">%</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                热量目标完成度
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ScaleIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 热量趋势图 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">热量摄入趋势</h3>
            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Line data={getCaloriesTrendData()} options={chartOptions} />
          </div>
        </div>

        {/* 营养成分分布 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">营养成分分布</h3>
            <BeakerIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Doughnut data={getNutritionDistributionData()} options={doughnutOptions} />
          </div>
        </div>

        {/* 用餐次数统计 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">用餐次数统计</h3>
            <ChartBarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Bar data={getMealsData()} options={chartOptions} />
          </div>
        </div>

        {/* 营养目标对比 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">营养目标对比</h3>
            <ScaleIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { name: '热量', current: summary.calories, goal: nutritionGoals.calories, unit: '卡', color: 'orange' },
              { name: '蛋白质', current: summary.protein, goal: nutritionGoals.protein, unit: 'g', color: 'blue' },
              { name: '碳水化合物', current: summary.carbs, goal: nutritionGoals.carbs, unit: 'g', color: 'green' },
              { name: '脂肪', current: summary.fat, goal: nutritionGoals.fat, unit: 'g', color: 'yellow' },
              { name: '纤维', current: summary.fiber, goal: nutritionGoals.fiber, unit: 'g', color: 'purple' }
            ].map((item) => {
              const percentage = Math.min((item.current / item.goal) * 100, 100);
              const colorClasses = {
                orange: 'bg-orange-500',
                blue: 'bg-blue-500',
                green: 'bg-green-500',
                yellow: 'bg-yellow-500',
                purple: 'bg-purple-500'
              };
              
              return (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(item.current)}/{item.goal} {item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${colorClasses[item.color as keyof typeof colorClasses]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(percentage)}% 完成
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 健康建议 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ArrowPathIcon className="w-5 h-5 mr-2 text-blue-600" />
          健康建议
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">营养建议</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {summary.protein < nutritionGoals.protein * 0.8 && (
                <li>• 建议增加蛋白质摄入，可选择鸡胸肉、鱼类等优质蛋白</li>
              )}
              {summary.fiber < nutritionGoals.fiber * 0.8 && (
                <li>• 膳食纤维不足，建议多吃蔬菜、水果和全谷物</li>
              )}
              {summary.calories > nutritionGoals.calories * 1.1 && (
                <li>• 热量摄入偏高，建议控制食物分量或增加运动</li>
              )}
              {summary.calories < nutritionGoals.calories * 0.8 && (
                <li>• 热量摄入不足，建议适当增加健康食物的摄入</li>
              )}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">饮食习惯</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 保持规律的用餐时间，建议一日三餐</li>
              <li>• 多样化饮食，确保营养均衡</li>
              <li>• 适量饮水，建议每日2000-2500ml</li>
              <li>• 细嚼慢咽，有助于消化和控制食量</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 数据为空的提示 */}
      {dailyReports.length === 0 && (
        <div className="text-center py-12">
          <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无数据</h3>
          <p className="text-gray-600">开始记录你的饮食，生成个性化健康报告</p>
        </div>
      )}
    </div>
  );
}