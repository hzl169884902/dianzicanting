-- 手动菜品去重脚本
-- 针对常见的重复菜品模式进行清理

-- 1. 查找减脂相关的重复菜品
SELECT 
    name,
    COUNT(*) as count,
    STRING_AGG(id::text, ', ') as ids,
    STRING_AGG(avg_rating::text, ', ') as ratings
FROM dishes 
WHERE name ILIKE '%减脂%' OR name ILIKE '%水煮鸡胸%' OR name ILIKE '%健康%'
GROUP BY name
ORDER BY name;

-- 2. 查找鸡胸肉相关的相似菜品
SELECT 
    d1.name as name1,
    d2.name as name2,
    d1.id as id1,
    d2.id as id2,
    d1.avg_rating as rating1,
    d2.avg_rating as rating2
FROM dishes d1
JOIN dishes d2 ON d1.id < d2.id
WHERE (d1.name ILIKE '%鸡胸%' AND d2.name ILIKE '%鸡胸%')
   OR (d1.name ILIKE '%水煮鸡%' AND d2.name ILIKE '%水煮鸡%')
ORDER BY d1.name, d2.name;

-- 3. 查找牛肉相关的相似菜品
SELECT 
    d1.name as name1,
    d2.name as name2,
    d1.id as id1,
    d2.id as id2
FROM dishes d1
JOIN dishes d2 ON d1.id < d2.id
WHERE (d1.name ILIKE '%牛肉%' AND d2.name ILIKE '%牛肉%')
   AND (d1.name ILIKE '%水煮%' OR d1.name ILIKE '%煎%' OR d1.name ILIKE '%烤%')
   AND (d2.name ILIKE '%水煮%' OR d2.name ILIKE '%煎%' OR d2.name ILIKE '%烤%')
ORDER BY d1.name, d2.name;

-- 4. 查找沙拉相关的重复菜品
SELECT 
    name,
    COUNT(*) as count,
    STRING_AGG(id::text, ', ') as ids
FROM dishes 
WHERE name ILIKE '%沙拉%' OR name ILIKE '%色拉%'
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 5. 查找汤类相关的重复菜品
SELECT 
    d1.name as name1,
    d2.name as name2,
    d1.id as id1,
    d2.id as id2
FROM dishes d1
JOIN dishes d2 ON d1.id < d2.id
WHERE d1.name ILIKE '%汤%' AND d2.name ILIKE '%汤%'
   AND LENGTH(d1.name) BETWEEN 3 AND 8
   AND LENGTH(d2.name) BETWEEN 3 AND 8
   AND ABS(LENGTH(d1.name) - LENGTH(d2.name)) <= 2
ORDER BY d1.name, d2.name;

-- 6. 查找川菜相关的重复菜品
SELECT 
    name,
    COUNT(*) as count,
    STRING_AGG(id::text, ', ') as ids
FROM dishes 
WHERE name ILIKE '%川%' OR name ILIKE '%四川%' OR name ILIKE '%麻辣%'
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 7. 查找粤菜相关的重复菜品
SELECT 
    name,
    COUNT(*) as count,
    STRING_AGG(id::text, ', ') as ids
FROM dishes 
WHERE name ILIKE '%粤%' OR name ILIKE '%广东%' OR name ILIKE '%港式%'
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 8. 查找所有完全重复的菜品名称
SELECT 
    name,
    COUNT(*) as duplicate_count,
    STRING_AGG(id::text ORDER BY avg_rating DESC, review_count DESC) as dish_ids,
    STRING_AGG(avg_rating::text ORDER BY avg_rating DESC, review_count DESC) as ratings,
    STRING_AGG(review_count::text ORDER BY avg_rating DESC, review_count DESC) as review_counts
FROM dishes 
GROUP BY name 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, name;

-- 9. 统计各类菜品数量
SELECT 
    '减脂餐' as category,
    COUNT(*) as count
FROM dishes 
WHERE name ILIKE '%减脂%' OR name ILIKE '%健康%' OR name ILIKE '%轻食%'
UNION ALL
SELECT 
    '鸡胸肉类' as category,
    COUNT(*) as count
FROM dishes 
WHERE name ILIKE '%鸡胸%'
UNION ALL
SELECT 
    '牛肉类' as category,
    COUNT(*) as count
FROM dishes 
WHERE name ILIKE '%牛肉%'
UNION ALL
SELECT 
    '沙拉类' as category,
    COUNT(*) as count
FROM dishes 
WHERE name ILIKE '%沙拉%' OR name ILIKE '%色拉%'
UNION ALL
SELECT 
    '汤类' as category,
    COUNT(*) as count
FROM dishes 
WHERE name ILIKE '%汤%'
UNION ALL
SELECT 
    '川菜类' as category,
    COUNT(*) as count
FROM dishes 
WHERE name ILIKE '%川%' OR name ILIKE '%四川%' OR name ILIKE '%麻辣%'
ORDER BY count DESC;

-- 10. 总体统计
SELECT 
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_names,
    COUNT(*) - COUNT(DISTINCT name) as exact_duplicates,
    ROUND((COUNT(*) - COUNT(DISTINCT name))::numeric / COUNT(*) * 100, 2) as duplicate_percentage
FROM dishes;