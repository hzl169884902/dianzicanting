-- 清理重复菜品数据并优化图片加载
-- 执行时间：2024-01-20

-- 1. 删除重复的佛跳墙菜品，只保留一个最优版本
DELETE FROM dishes 
WHERE name IN ('福建佛跳墙', '闽菜佛跳墙') 
OR (name = '佛跳墙' AND description != '闽菜顶级名菜，汇聚山珍海味，营养丰富');

-- 2. 更新保留的佛跳墙信息
UPDATE dishes 
SET 
  description = '闽菜顶级名菜，汇聚山珍海味，营养丰富',
  image_url = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNmZjZkMDAiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZmY2ZDAwIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7oj5Hlk4Hlm77niYc8L3RleHQ+Cjwvc3ZnPg==',
  nutrition_facts = '{"calories": 420, "protein": 25, "fat": 22, "carbs": 28}',
  avg_rating = 4.9,
  review_count = 1200,
  popularity_score = 98
WHERE name = '佛跳墙';

-- 3. 删除重复的川菜菜品
-- 删除重复的麻辣小龙虾（保留评分最高的）
DELETE FROM dishes 
WHERE name = '麻辣小龙虾' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY avg_rating DESC, review_count DESC) as rn
    FROM dishes 
    WHERE name = '麻辣小龙虾'
  ) t WHERE rn = 1
);

-- 删除重复的担担面
DELETE FROM dishes 
WHERE name = '担担面' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY avg_rating DESC, review_count DESC) as rn
    FROM dishes 
    WHERE name = '担担面'
  ) t WHERE rn = 1
);

-- 删除重复的重庆小面
DELETE FROM dishes 
WHERE name = '重庆小面' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY avg_rating DESC, review_count DESC) as rn
    FROM dishes 
    WHERE name = '重庆小面'
  ) t WHERE rn = 1
);

-- 删除重复的麻辣烫
DELETE FROM dishes 
WHERE name = '麻辣烫' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY avg_rating DESC, review_count DESC) as rn
    FROM dishes 
    WHERE name = '麻辣烫'
  ) t WHERE rn = 1
);

-- 4. 批量更新所有使用外部API的图片为本地SVG占位图
UPDATE dishes 
SET image_url = CASE 
  -- 根据菜品类别生成不同的SVG占位图
  WHEN category_id = (SELECT id FROM categories WHERE name = '川菜' LIMIT 1) THEN
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmZlYmVlIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNkYzI2MjYiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZGMyNjI2Ii8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7lt53lkIjlt53lk4E8L3RleHQ+Cjwvc3ZnPg=='
  WHEN category_id = (SELECT id FROM categories WHERE name = '粤菜' LIMIT 1) THEN
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjBmZGY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMxNmEzNGEiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjMTZhMzRhIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nspLlkIjnspLlk4E8L3RleHQ+Cjwvc3ZnPg=='
  WHEN category_id = (SELECT id FROM categories WHERE name = '湘菜' LIMIT 1) THEN
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmVmM2M3Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNmNTk3MWYiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZjU5NzFmIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7muZbljZfmuZblk4E8L3RleHQ+Cjwvc3ZnPg=='
  WHEN category_id = (SELECT id FROM categories WHERE name = '闽菜' LIMIT 1) THEN
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNmZjZkMDAiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZmY2ZDAwIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7pl67lkIjpl67lk4E8L3RleHQ+Cjwvc3ZnPg=='
  ELSE
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjlmYWZiIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM2Mzc0OGEiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjNjM3NDhhIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nvo7lkbPnvo7po5g8L3RleHQ+Cjwvc3ZnPg=='
END
WHERE image_url LIKE '%trae-api-us.mchost.guru%';

-- 5. 添加一些新的特色菜品来丰富菜品种类
INSERT INTO dishes (name, description, image_url, category_id, nutrition_facts, avg_rating, review_count, popularity_score, brand_id) VALUES
-- 特色地方菜
('东北锅包肉', '酸甜可口的东北名菜，外酥内嫩', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmVmM2M3Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNmNTk3MWYiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZjU5NzFmIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7kuJzljJfplIXljIXogYk8L3RleHQ+Cjwvc3ZnPg==', (SELECT id FROM categories WHERE name = '东北菜' LIMIT 1), '{"calories": 320, "protein": 22, "fat": 18, "carbs": 24}', 4.5, 1200, 85),

('新疆大盘鸡', '新疆特色菜，鸡肉配土豆和面条', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmZlYmVlIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNkYzI2MjYiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZGMyNjI2Ii8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7mlrDnloblpKfnm5jprLo8L3RleHQ+Cjwvc3ZnPg==', (SELECT id FROM categories WHERE name = '西北菜' LIMIT 1), '{"calories": 380, "protein": 28, "fat": 20, "carbs": 32}', 4.6, 980, 88),

('云南过桥米线', '云南特色米线，汤鲜味美', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjBmZGY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMxNmEzNGEiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjMTZhMzRhIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7kuJHljZfov4fmoKXnsbPnur88L3RleHQ+Cjwvc3ZnPg==', (SELECT id FROM categories WHERE name = '云南菜' LIMIT 1), '{"calories": 280, "protein": 18, "fat": 8, "carbs": 42}', 4.7, 1500, 92),

('内蒙古烤羊腿', '内蒙古特色烤肉，香嫩可口', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZmVmM2M3Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNmNTk3MWYiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjZjU5NzFmIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7lhoXokpnlj6TnuKfnvYrohL48L3RleHQ+Cjwvc3ZnPg==', (SELECT id FROM categories WHERE name = '蒙古菜' LIMIT 1), '{"calories": 450, "protein": 35, "fat": 28, "carbs": 8}', 4.4, 800, 82),

('西藏酥油茶', '西藏传统饮品，营养丰富', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjlmYWZiIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM2Mzc0OGEiLz4KPHN2ZyB4PSIxNzAiIHk9IjE4MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KICA8cGF0aCBkPSJNMTAgMzBMMzAgMTBMNTAgMzBaIiBmaWxsPSIjNjM3NDhhIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7opb/ol4/phajmsrnojLY8L3RleHQ+Cjwvc3ZnPg==', (SELECT id FROM categories WHERE name = '藏菜' LIMIT 1), '{"calories": 180, "protein": 8, "fat": 12, "carbs": 15}', 4.2, 600, 75);

-- 6. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_dishes_name ON dishes(name);
CREATE INDEX IF NOT EXISTS idx_dishes_category_rating ON dishes(category_id, avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_dishes_popularity ON dishes(popularity_score DESC);

-- 7. 更新统计信息
ANALYZE dishes;

-- 输出清理结果
SELECT 
  '数据清理完成' as status,
  COUNT(*) as total_dishes,
  COUNT(DISTINCT name) as unique_dish_names,
  COUNT(*) - COUNT(DISTINCT name) as duplicate_count
FROM dishes;