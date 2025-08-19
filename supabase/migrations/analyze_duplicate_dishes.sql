-- 分析菜品重复情况的详细查询

-- 1. 查找完全重复的菜品名称
SELECT 
    name,
    COUNT(*) as duplicate_count,
    STRING_AGG(id::text, ', ') as dish_ids
FROM dishes 
GROUP BY name 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 2. 查找可能相似的菜品名称（基于长度和部分匹配）
SELECT 
    d1.name as name1,
    d2.name as name2,
    d1.id as id1,
    d2.id as id2
FROM dishes d1
JOIN dishes d2 ON d1.id < d2.id
WHERE d1.name ILIKE '%' || SUBSTRING(d2.name, 1, 3) || '%'
   OR d2.name ILIKE '%' || SUBSTRING(d1.name, 1, 3) || '%'
LIMIT 50;

-- 3. 统计总体数据
SELECT 
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_dish_names,
    COUNT(*) - COUNT(DISTINCT name) as duplicate_count
FROM dishes;

-- 4. 查看品牌关联情况
SELECT 
    COUNT(*) as total_dishes,
    COUNT(CASE WHEN brand_id IS NOT NULL THEN 1 END) as dishes_with_brand,
    COUNT(CASE WHEN brand_id IS NULL THEN 1 END) as dishes_without_brand
FROM dishes;

-- 5. 查看分类分布
SELECT 
    c.name as category_name,
    COUNT(d.id) as dish_count
FROM categories c
LEFT JOIN dishes d ON c.id = d.category_id
GROUP BY c.id, c.name
ORDER BY dish_count DESC;

-- 6. 查找可能有问题的图片URL
SELECT 
    image_url,
    COUNT(*) as usage_count,
    STRING_AGG(name, ', ') as dish_names
FROM dishes 
GROUP BY image_url 
HAVING COUNT(*) > 5
ORDER BY usage_count DESC;