-- 执行菜品去重清理脚本
-- 基于评分、评论数和创建时间来保留最佳版本

-- 1. 删除完全重复的菜品名称，保留最佳版本
WITH duplicate_dishes AS (
    SELECT 
        name,
        id,
        avg_rating,
        review_count,
        created_at,
        ROW_NUMBER() OVER (
            PARTITION BY name 
            ORDER BY 
                avg_rating DESC NULLS LAST,
                review_count DESC NULLS LAST,
                created_at ASC
        ) as rn
    FROM dishes
),
dishes_to_delete AS (
    SELECT id, name
    FROM duplicate_dishes 
    WHERE rn > 1
)
-- 显示将要删除的菜品
SELECT 
    'Will delete: ' || name || ' (ID: ' || id || ')' as action
FROM dishes_to_delete
ORDER BY name;

-- 2. 实际删除重复菜品（取消注释以执行）
/*
WITH duplicate_dishes AS (
    SELECT 
        name,
        id,
        avg_rating,
        review_count,
        created_at,
        ROW_NUMBER() OVER (
            PARTITION BY name 
            ORDER BY 
                avg_rating DESC NULLS LAST,
                review_count DESC NULLS LAST,
                created_at ASC
        ) as rn
    FROM dishes
),
dishes_to_delete AS (
    SELECT id
    FROM duplicate_dishes 
    WHERE rn > 1
)
DELETE FROM dishes 
WHERE id IN (SELECT id FROM dishes_to_delete);
*/

-- 3. 手动清理特定的相似菜品组

-- 清理减脂鸡胸肉相关的重复菜品
/*
-- 保留评分最高的减脂水煮鸡胸肉
DELETE FROM dishes 
WHERE name IN ('减脂水煮鸡胸', '健康水煮鸡胸肉', '营养水煮鸡胸')
AND id NOT IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY avg_rating DESC, review_count DESC) as rn
        FROM dishes 
        WHERE name IN ('减脂水煮鸡胸肉', '减脂水煮鸡胸', '健康水煮鸡胸肉', '营养水煮鸡胸')
    ) ranked WHERE rn = 1
);
*/

-- 4. 清理川菜重复菜品
/*
-- 删除重复的麻辣小龙虾，保留评分最高的
DELETE FROM dishes 
WHERE name = '麻辣小龙虾'
AND id NOT IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY avg_rating DESC, review_count DESC) as rn
        FROM dishes 
        WHERE name = '麻辣小龙虾'
    ) ranked WHERE rn = 1
);

-- 删除重复的宫保鸡丁，保留评分最高的
DELETE FROM dishes 
WHERE name IN ('宫保鸡丁', '川味宫保鸡丁', '正宗宫保鸡丁')
AND id NOT IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY avg_rating DESC, review_count DESC) as rn
        FROM dishes 
        WHERE name IN ('宫保鸡丁', '川味宫保鸡丁', '正宗宫保鸡丁')
    ) ranked WHERE rn = 1
);
*/

-- 5. 清理粤菜重复菜品
/*
-- 删除重复的白切鸡，保留评分最高的
DELETE FROM dishes 
WHERE name IN ('白切鸡', '粤式白切鸡', '广东白切鸡')
AND id NOT IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY avg_rating DESC, review_count DESC) as rn
        FROM dishes 
        WHERE name IN ('白切鸡', '粤式白切鸡', '广东白切鸡')
    ) ranked WHERE rn = 1
);
*/

-- 6. 清理沙拉重复菜品
/*
-- 统一沙拉和色拉的写法，删除重复的
UPDATE dishes SET name = REPLACE(name, '色拉', '沙拉') WHERE name LIKE '%色拉%';

-- 删除更新后产生的重复菜品
WITH duplicate_salads AS (
    SELECT 
        name,
        id,
        avg_rating,
        review_count,
        ROW_NUMBER() OVER (
            PARTITION BY name 
            ORDER BY avg_rating DESC, review_count DESC
        ) as rn
    FROM dishes
    WHERE name LIKE '%沙拉%'
)
DELETE FROM dishes 
WHERE id IN (
    SELECT id FROM duplicate_salads WHERE rn > 1
);
*/

-- 7. 验证清理结果
SELECT 
    'After cleanup' as status,
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_names,
    COUNT(*) - COUNT(DISTINCT name) as remaining_duplicates
FROM dishes;

-- 8. 检查是否还有重复菜品
SELECT 
    name,
    COUNT(*) as count
FROM dishes 
GROUP BY name 
HAVING COUNT(*) > 1
ORDER BY count DESC, name;

-- 9. 按分类统计菜品数量
SELECT 
    c.name as category_name,
    COUNT(d.id) as dish_count
FROM categories c
LEFT JOIN dishes d ON c.id = d.category_id
GROUP BY c.id, c.name
ORDER BY dish_count DESC;

-- 10. 最终数据质量报告
SELECT 
    'Data Quality Report' as report_type,
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_dish_names,
    COUNT(CASE WHEN avg_rating IS NOT NULL THEN 1 END) as dishes_with_rating,
    COUNT(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END) as dishes_with_image,
    COUNT(CASE WHEN brand_id IS NOT NULL THEN 1 END) as dishes_with_brand,
    ROUND(AVG(avg_rating), 2) as average_rating
FROM dishes;