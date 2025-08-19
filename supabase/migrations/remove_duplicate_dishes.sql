-- 清理重复菜品数据的脚本
-- 保留每个重复菜品名称中ID最小的记录（最早创建的）

-- 1. 创建临时表存储要保留的菜品ID（使用created_at排序，保留最早的记录）
CREATE TEMP TABLE dishes_to_keep AS
SELECT DISTINCT ON (name) id
FROM dishes
ORDER BY name, created_at ASC;

-- 2. 删除重复的菜品记录（保留ID最小的）
DELETE FROM dishes
WHERE id NOT IN (SELECT id FROM dishes_to_keep);

-- 3. 显示清理结果
SELECT 
    'After cleanup' as status,
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_dish_names
FROM dishes;

-- 4. 检查是否还有重复
SELECT 
    name,
    COUNT(*) as count
FROM dishes 
GROUP BY name 
HAVING COUNT(*) > 1;

-- 5. 更新菜品的品牌关联（为没有品牌的菜品随机分配品牌）
UPDATE dishes 
SET brand_id = (
    SELECT id 
    FROM brands 
    ORDER BY RANDOM() 
    LIMIT 1
)
WHERE brand_id IS NULL
AND EXISTS (SELECT 1 FROM brands LIMIT 1);

-- 6. 显示品牌关联更新结果
SELECT 
    COUNT(*) as total_dishes,
    COUNT(CASE WHEN brand_id IS NOT NULL THEN 1 END) as dishes_with_brand,
    COUNT(CASE WHEN brand_id IS NULL THEN 1 END) as dishes_without_brand
FROM dishes;