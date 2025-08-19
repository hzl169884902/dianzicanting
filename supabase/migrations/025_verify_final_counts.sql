-- 验证最终的菜品和品牌数量
SELECT 'dishes' as table_name, COUNT(*) as total_count FROM dishes
UNION ALL
SELECT 'brands' as table_name, COUNT(*) as total_count FROM brands
UNION ALL
SELECT 'categories' as table_name, COUNT(*) as total_count FROM categories;

-- 按品牌类型统计品牌数量
SELECT brand_type, COUNT(*) as count 
FROM brands 
WHERE brand_type IS NOT NULL 
GROUP BY brand_type 
ORDER BY count DESC;

-- 统计低卡菜品数量（热量 < 150）
SELECT COUNT(*) as low_calorie_dishes 
FROM dishes 
WHERE (nutrition_facts->>'calories')::numeric < 150 AND nutrition_facts->>'calories' IS NOT NULL;

-- 统计川菜湘菜数量
SELECT COUNT(*) as spicy_dishes 
FROM dishes 
WHERE name LIKE '%川%' OR name LIKE '%湘%' OR name LIKE '%辣%' OR name LIKE '%麻%' 
   OR description LIKE '%川%' OR description LIKE '%湘%' OR description LIKE '%辣%' OR description LIKE '%麻%';