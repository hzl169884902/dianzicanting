import { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { supabase } from '@/lib/supabase';
import { 
  CalendarDaysIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import type { Dish } from '@/lib/supabase';

interface AddRecordForm {
  dish_id: string;
  portion_size: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes: string;
}

export default function DietRecord() {
  const {
    dietRecords,
    selectedDate,
    loading,
    error,
    fetchDietRecords,
    addDietRecord,
    updateDietRecord,
    deleteDietRecord,
    setSelectedDate
  } = useAppStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [addForm, setAddForm] = useState<AddRecordForm>({
    dish_id: '',
    portion_size: 100,
    meal_type: 'breakfast',
    notes: ''
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchDietRecords();
    fetchDishes();
  }, [fetchDietRecords]);

  useEffect(() => {
    fetchDietRecords(selectedDate);
  }, [selectedDate, fetchDietRecords]);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select(`
          id, name, description, image_url, category_id,
          nutrition_facts,
          cooking_time, avg_rating, review_count,
          popularity_score, created_at
        `)
        .order('name');
      
      if (error) throw error;
      setDishes(data || []);
    } catch (error) {
      console.error('获取菜品列表失败:', error);
    }
  };

  const handleAddRecord = async () => {
    if (!addForm.dish_id) return;
    
    try {
      await addDietRecord({
        user_id: 'default-user', // 简化版本，无用户认证
        dish_id: addForm.dish_id,
        portion: addForm.portion_size,
        meal_type: addForm.meal_type,
        record_date: selectedDate,
        notes: addForm.notes
      });
      
      setShowAddForm(false);
      setAddForm({
        dish_id: '',
        portion_size: 100,
        meal_type: 'breakfast',
        notes: ''
      });
    } catch (error) {
      console.error('添加饮食记录失败:', error);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (confirm('确定要删除这条饮食记录吗？')) {
      await deleteDietRecord(id);
    }
  };

  const calculateDayTotals = () => {
    return dietRecords.reduce((totals, record) => {
      const dish = record.dish;
      if (dish) {
        const calories = ((dish.nutrition_facts?.calories || 0) * record.portion) / 100;
        totals.calories += calories;
        totals.records += 1;
      }
      return totals;
    }, { calories: 0, records: 0 });
  };

  const groupRecordsByMealType = () => {
    const groups = {
      breakfast: [] as typeof dietRecords,
      lunch: [] as typeof dietRecords,
      dinner: [] as typeof dietRecords,
      snack: [] as typeof dietRecords
    };
    
    dietRecords.forEach(record => {
      groups[record.meal_type].push(record);
    });
    
    return groups;
  };

  const getMealTypeLabel = (mealType: string) => {
    const labels = {
      breakfast: '早餐',
      lunch: '午餐',
      dinner: '晚餐',
      snack: '加餐'
    };
    return labels[mealType as keyof typeof labels] || mealType;
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    return date.toISOString().split('T')[0] === selectedDate;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const dayTotals = calculateDayTotals();
  const mealGroups = groupRecordsByMealType();
  const calendarDays = generateCalendarDays();

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">饮食记录</h1>
          <p className="text-gray-600 mt-1">记录每日饮食，追踪健康目标</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          <PlusIcon className="w-4 h-4" />
          <span>添加记录</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 日历视图 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* 日历头部 */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">
                {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* 日历日期 */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                  className={`
                    p-2 text-sm rounded hover:bg-gray-100 transition-colors
                    ${!isCurrentMonth(date) ? 'text-gray-300' : 'text-gray-900'}
                    ${isToday(date) ? 'bg-blue-100 text-blue-700' : ''}
                    ${isSelectedDate(date) ? 'bg-orange-100 text-orange-700 font-semibold' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 饮食记录详情 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 日期和统计 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {new Date(selectedDate).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </h2>
              <CalendarDaysIcon className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-orange-600">总热量</div>
                <div className="text-2xl font-bold text-orange-700">
                  {Math.round(dayTotals.calories)} 卡
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">记录数</div>
                <div className="text-2xl font-bold text-blue-700">
                  {dayTotals.records} 条
                </div>
              </div>
            </div>
          </div>

          {/* 各餐记录 */}
          {Object.entries(mealGroups).map(([mealType, records]) => (
            <div key={mealType} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {getMealTypeLabel(mealType)}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({records.length} 项)
                </span>
              </h3>
              
              {records.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  暂无{getMealTypeLabel(mealType)}记录
                </div>
              ) : (
                <div className="space-y-3">
                  {records.map((record) => {
                    const dish = record.dish;
                    const calories = dish ? ((dish.nutrition_facts?.calories || 0) * record.portion) / 100 : 0;
                    
                    return (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {dish?.image_url && (
                            <img
                              src={dish.image_url}
                              alt={dish.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{dish?.name}</div>
                            <div className="text-sm text-gray-600">
                              {record.portion}g · {Math.round(calories)} 卡
                            </div>
                            {record.notes && (
                              <div className="text-sm text-gray-500">{record.notes}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingRecord(record.id)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 添加记录弹窗 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">添加饮食记录</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择菜品</label>
                <select
                  value={addForm.dish_id}
                  onChange={(e) => setAddForm(prev => ({ ...prev, dish_id: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">请选择菜品</option>
                  {dishes.map(dish => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">餐次</label>
                <select
                  value={addForm.meal_type}
                  onChange={(e) => setAddForm(prev => ({ ...prev, meal_type: e.target.value as any }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="breakfast">早餐</option>
                  <option value="lunch">午餐</option>
                  <option value="dinner">晚餐</option>
                  <option value="snack">加餐</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分量 (克)</label>
                <input
                  type="number"
                  value={addForm.portion_size}
                  onChange={(e) => setAddForm(prev => ({ ...prev, portion_size: Number(e.target.value) }))}
                  min="1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">备注</label>
                <textarea
                  value={addForm.notes}
                  onChange={(e) => setAddForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="可选备注信息..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddRecord}
                disabled={!addForm.dish_id}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                添加记录
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setAddForm({
                    dish_id: '',
                    portion_size: 100,
                    meal_type: 'breakfast',
                    notes: ''
                  });
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}