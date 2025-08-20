import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { DishCleanupManager } from '../components/DishCleanupManager';
import { Dish, supabase } from '../lib/supabase';
import { Search, Filter, Download, Upload, Settings } from 'lucide-react';
import { DishCard } from '../components/DishCard';

export function DishManagement() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCleanupManager, setShowCleanupManager] = useState(false);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    loadDishes();
    loadCategories();
  }, []);

  useEffect(() => {
    filterDishes();
  }, [dishes, searchTerm, selectedCategory]);

  const loadDishes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('dishes')
        .select(`
          *,
          brands(name),
          categories(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDishes(data || []);
    } catch (error) {
      console.error('加载菜品失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('加载分类失败:', error);
    }
  };

  const filterDishes = () => {
    let filtered = dishes;

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dish.brands?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dish => dish.category_id === selectedCategory);
    }

    setFilteredDishes(filtered);
  };

  const handleDishesUpdated = (updatedDishes: Dish[]) => {
    setDishes(updatedDishes);
    // 这里可以添加保存到数据库的逻辑
    console.log('菜品已更新:', updatedDishes.length);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(dishes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dishes_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getDuplicateCount = () => {
    const nameCount = new Map<string, number>();
    dishes.forEach(dish => {
      const count = nameCount.get(dish.name) || 0;
      nameCount.set(dish.name, count + 1);
    });
    return Array.from(nameCount.values()).filter(count => count > 1).length;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">加载菜品数据...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">菜品管理</h1>
          <p className="text-gray-600 mt-1">管理和清理菜品数据</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
          <Button 
            onClick={() => setShowCleanupManager(!showCleanupManager)}
            className={showCleanupManager ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
          >
            <Settings className="w-4 h-4 mr-2" />
            {showCleanupManager ? '关闭清理工具' : '打开清理工具'}
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{dishes.length}</div>
            <div className="text-sm text-gray-500">总菜品数</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {new Set(dishes.map(d => d.name)).size}
            </div>
            <div className="text-sm text-gray-500">唯一名称</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{getDuplicateCount()}</div>
            <div className="text-sm text-gray-500">重复菜品</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-500">分类数量</div>
          </CardContent>
        </Card>
      </div>

      {/* 清理工具 */}
      {showCleanupManager && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              菜品清理工具
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DishCleanupManager 
              dishes={dishes} 
              onDishesUpdated={handleDishesUpdated}
            />
          </CardContent>
        </Card>
      )}

      {/* 搜索和过滤 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索菜品名称或品牌..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有分类</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {searchTerm || selectedCategory !== 'all' ? (
            <div className="mt-2 text-sm text-gray-600">
              显示 {filteredDishes.length} / {dishes.length} 个菜品
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* 菜品列表 */}
      <Card>
        <CardHeader>
          <CardTitle>菜品列表</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDishes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || selectedCategory !== 'all' ? '没有找到匹配的菜品' : '暂无菜品数据'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDishes.slice(0, 50).map((dish, index) => (
                <DishCard 
                  key={dish.id} 
                  dish={dish} 
                  variant="default"
                  index={index}
                  showActions={false}
                />
              ))}
            </div>
          )}
          
          {filteredDishes.length > 50 && (
            <div className="mt-4 text-center">
              <Alert>
                <AlertDescription>
                  显示前50个结果，共 {filteredDishes.length} 个菜品。请使用搜索功能缩小范围。
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}