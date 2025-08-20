import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Dish } from '../lib/supabase';
import { 
  analyzeDishQuality, 
  generateCleanupSuggestions, 
  executeAutoCleanup,
  CleanupReport,
  SimilarityAnalysis 
} from '../utils/manualDishCleanup';
import { Trash2, Eye, Merge, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface DishCleanupManagerProps {
  dishes: Dish[];
  onDishesUpdated: (dishes: Dish[]) => void;
}

export function DishCleanupManager({ dishes, onDishesUpdated }: DishCleanupManagerProps) {
  const [report, setReport] = useState<CleanupReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (dishes.length > 0) {
      analyzeData();
    }
  }, [dishes]);

  const analyzeData = async () => {
    setLoading(true);
    try {
      // 模拟异步处理，避免阻塞UI
      await new Promise(resolve => setTimeout(resolve, 100));
      const analysisReport = analyzeDishQuality(dishes);
      setReport(analysisReport);
    } catch (error) {
      console.error('分析失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoCleanup = () => {
    if (!report) return;
    
    const cleanedDishes = executeAutoCleanup(dishes, report);
    onDishesUpdated(cleanedDishes);
    
    // 重新分析
    setTimeout(() => {
      analyzeData();
    }, 100);
  };

  const handleManualMerge = (pairIndex: number, keepFirst: boolean) => {
    if (!report) return;
    
    const pair = report.similarPairs[pairIndex];
    const dishToRemove = keepFirst ? pair.dish2 : pair.dish1;
    
    const updatedDishes = dishes.filter(d => d.id !== dishToRemove.id);
    onDishesUpdated(updatedDishes);
    
    // 重新分析
    setTimeout(() => {
      analyzeData();
    }, 100);
  };

  const togglePairSelection = (index: number) => {
    const newSelected = new Set(selectedPairs);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedPairs(newSelected);
  };

  const handleBatchCleanup = () => {
    if (!report) return;
    
    let updatedDishes = [...dishes];
    const dishesToRemove = new Set<string>();
    
    selectedPairs.forEach(pairIndex => {
      const pair = report.similarPairs[pairIndex];
      if (pair.recommendation === 'keep_first') {
        dishesToRemove.add(pair.dish2.id);
      } else if (pair.recommendation === 'keep_second') {
        dishesToRemove.add(pair.dish1.id);
      }
    });
    
    updatedDishes = updatedDishes.filter(d => !dishesToRemove.has(d.id));
    onDishesUpdated(updatedDishes);
    setSelectedPairs(new Set());
    
    // 重新分析
    setTimeout(() => {
      analyzeData();
    }, 100);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>正在分析菜品数据...</span>
          </div>
          <Progress value={33} className="mt-2" />
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-gray-500">暂无数据可分析</p>
        </CardContent>
      </Card>
    );
  }

  const suggestions = generateCleanupSuggestions(report);
  const autoMergeableCount = report.similarPairs.filter(p => 
    p.recommendation === 'keep_first' || p.recommendation === 'keep_second'
  ).length;

  return (
    <div className="w-full space-y-4">
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{report.totalDishes}</div>
            <div className="text-sm text-gray-500">总菜品数</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{report.uniqueNames}</div>
            <div className="text-sm text-gray-500">唯一名称</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{report.exactDuplicates}</div>
            <div className="text-sm text-gray-500">完全重复</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{report.similarPairs.length}</div>
            <div className="text-sm text-gray-500">相似对</div>
          </CardContent>
        </Card>
      </div>

      {/* 清理建议 */}
      {suggestions.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium mb-2">清理建议：</div>
            <ul className="list-disc list-inside space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm">{suggestion}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* 操作按钮 */}
      <div className="flex space-x-2">
        <Button 
          onClick={handleAutoCleanup}
          disabled={autoMergeableCount === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          自动清理 ({autoMergeableCount})
        </Button>
        <Button 
          onClick={handleBatchCleanup}
          disabled={selectedPairs.size === 0}
          variant="outline"
        >
          <Merge className="w-4 h-4 mr-2" />
          批量处理 ({selectedPairs.size})
        </Button>
        <Button onClick={analyzeData} variant="outline">
          重新分析
        </Button>
      </div>

      {/* 详细信息标签页 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="similar">相似菜品 ({report.similarPairs.length})</TabsTrigger>
          <TabsTrigger value="categories">分类统计</TabsTrigger>
          <TabsTrigger value="quality">质量问题</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>数据质量概览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>数据完整性</span>
                  <span className="font-medium">
                    {Math.round((report.uniqueNames / report.totalDishes) * 100)}%
                  </span>
                </div>
                <Progress value={(report.uniqueNames / report.totalDishes) * 100} />
                
                <div className="flex justify-between">
                  <span>重复率</span>
                  <span className="font-medium text-red-600">
                    {Math.round((report.exactDuplicates / report.totalDishes) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(report.exactDuplicates / report.totalDishes) * 100} 
                  className="[&>div]:bg-red-500"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="similar" className="space-y-4">
          {report.similarPairs.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                没有发现相似的菜品
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {report.similarPairs.map((pair, index) => (
                <SimilarPairCard
                  key={index}
                  pair={pair}
                  index={index}
                  isSelected={selectedPairs.has(index)}
                  onToggleSelect={() => togglePairSelection(index)}
                  onManualMerge={handleManualMerge}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>分类分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(report.categoryStats)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span>{category === 'unknown' ? '未分类' : category}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>数据质量问题</CardTitle>
            </CardHeader>
            <CardContent>
              {report.qualityIssues.length === 0 ? (
                <div className="text-center text-green-600">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>未发现数据质量问题</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {report.qualityIssues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-2 text-orange-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 相似菜品对卡片组件
function SimilarPairCard({ 
  pair, 
  index, 
  isSelected, 
  onToggleSelect, 
  onManualMerge 
}: {
  pair: SimilarityAnalysis;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  onManualMerge: (index: number, keepFirst: boolean) => void;
}) {
  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.9) return 'text-red-600 bg-red-50';
    if (similarity >= 0.8) return 'text-orange-600 bg-orange-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'keep_first':
        return <Badge className="bg-blue-100 text-blue-800">保留第一个</Badge>;
      case 'keep_second':
        return <Badge className="bg-green-100 text-green-800">保留第二个</Badge>;
      case 'merge':
        return <Badge className="bg-purple-100 text-purple-800">建议合并</Badge>;
      default:
        return <Badge variant="outline">需要审查</Badge>;
    }
  };

  return (
    <Card className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="rounded"
            />
            <Badge className={getSimilarityColor(pair.similarity)}>
              {Math.round(pair.similarity * 100)}% 相似
            </Badge>
            {getRecommendationBadge(pair.recommendation)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 菜品1 */}
          <div className="border rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src={pair.dish1.image_url || '/placeholder-dish.jpg'} 
                alt={pair.dish1.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{pair.dish1.name}</h4>
                <div className="text-sm text-gray-500">
                  评分: {pair.dish1.avg_rating?.toFixed(1) || 'N/A'} | 
                  评论: {pair.dish1.review_count || 0}
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onManualMerge(index, true)}
              className="w-full"
            >
              保留此项
            </Button>
          </div>
          
          {/* 菜品2 */}
          <div className="border rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src={pair.dish2.image_url || '/placeholder-dish.jpg'} 
                alt={pair.dish2.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{pair.dish2.name}</h4>
                <div className="text-sm text-gray-500">
                  评分: {pair.dish2.avg_rating?.toFixed(1) || 'N/A'} | 
                  评论: {pair.dish2.review_count || 0}
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onManualMerge(index, false)}
              className="w-full"
            >
              保留此项
            </Button>
          </div>
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          <strong>相似原因:</strong> {pair.reason}
        </div>
      </CardContent>
    </Card>
  );
}