-- 检查数据库中的数据统计
SELECT 'dishes' as table_name, COUNT(*) as record_count FROM dishes
UNION ALL
SELECT 'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 'categories' as table_name, COUNT(*) as record_count FROM categories;

-- 检查减脂餐相关的菜品（热量低于150卡）
SELECT 'low_calorie_dishes' as table_name, COUNT(*) as record_count 
FROM dishes 
WHERE (nutrition_facts->>'calories')::numeric < 150;

-- 检查川菜和湘菜数量
SELECT 'spicy_dishes' as table_name, COUNT(*) as record_count 
FROM dishes 
WHERE name LIKE '%川%' OR name LIKE '%湘%' OR name LIKE '%辣%' OR name LIKE '%麻%' OR description LIKE '%川%' OR description LIKE '%湘%' OR description LIKE '%辣%' OR description LIKE '%麻%';