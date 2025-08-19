-- 检查菜品重复情况
-- 查找重复的菜品名称
SELECT 
    name,
    COUNT(*) as duplicate_count,
    array_agg(id) as dish_ids
FROM dishes 
GROUP BY name 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 查看总菜品数量
SELECT COUNT(*) as total_dishes FROM dishes;

-- 查看不同菜品名称数量
SELECT COUNT(DISTINCT name) as unique_dish_names FROM dishes;

-- 查看品牌关联情况
SELECT 
    COUNT(*) as total_dishes,
    COUNT(brand_id) as dishes_with_brand,
    COUNT(*) - COUNT(brand_id) as dishes_without_brand
FROM dishes;