-- 高级菜品去重脚本
-- 基于前端去重算法的逻辑，识别和清理高度相似的菜品

-- 1. 创建临时函数来计算菜品名称相似度
CREATE OR REPLACE FUNCTION calculate_dish_similarity(name1 TEXT, name2 TEXT)
RETURNS FLOAT AS $$
DECLARE
    clean_name1 TEXT;
    clean_name2 TEXT;
    similarity FLOAT;
BEGIN
    -- 清理菜品名称，移除地区前缀和修饰词
    clean_name1 := REGEXP_REPLACE(name1, '^(重庆|四川|福建|广东|北京|上海|江苏|浙江|湖南|湖北|川味|粤式|闽南|正宗|特色|招牌|精品|经典|减脂|健康|营养|清淡|家常)', '', 'g');
    clean_name2 := REGEXP_REPLACE(name2, '^(重庆|四川|福建|广东|北京|上海|江苏|浙江|湖南|湖北|川味|粤式|闽南|正宗|特色|招牌|精品|经典|减脂|健康|营养|清淡|家常)', '', 'g');
    
    -- 统一常见变体
    clean_name1 := REGEXP_REPLACE(clean_name1, '(沙拉|色拉)$', '沙拉', 'g');
    clean_name1 := REGEXP_REPLACE(clean_name1, '(鸡胸肉|鸡胸)', '鸡胸', 'g');
    clean_name1 := REGEXP_REPLACE(clean_name1, '(牛肉片|牛肉丝|牛肉)', '牛肉', 'g');
    clean_name1 := REGEXP_REPLACE(clean_name1, '(猪肉片|猪肉丝|猪肉)', '猪肉', 'g');
    clean_name1 := REGEXP_REPLACE(clean_name1, '(鱼片|鱼肉)', '鱼', 'g');
    
    clean_name2 := REGEXP_REPLACE(clean_name2, '(沙拉|色拉)$', '沙拉', 'g');
    clean_name2 := REGEXP_REPLACE(clean_name2, '(鸡胸肉|鸡胸)', '鸡胸', 'g');
    clean_name2 := REGEXP_REPLACE(clean_name2, '(牛肉片|牛肉丝|牛肉)', '牛肉', 'g');
    clean_name2 := REGEXP_REPLACE(clean_name2, '(猪肉片|猪肉丝|猪肉)', '猪肉', 'g');
    clean_name2 := REGEXP_REPLACE(clean_name2, '(鱼片|鱼肉)', '鱼', 'g');
    
    -- 移除空格
    clean_name1 := REPLACE(clean_name1, ' ', '');
    clean_name2 := REPLACE(clean_name2, ' ', '');
    
    -- 如果清理后名称相同，返回1.0
    IF clean_name1 = clean_name2 THEN
        RETURN 1.0;
    END IF;
    
    -- 计算编辑距离相似度
    similarity := 1.0 - (levenshtein(clean_name1, clean_name2)::FLOAT / GREATEST(LENGTH(clean_name1), LENGTH(clean_name2)));
    
    RETURN similarity;
END;
$$ LANGUAGE plpgsql;

-- 2. 查找高度相似的菜品对（相似度 >= 0.8）
WITH similar_dishes AS (
    SELECT 
        d1.id as id1,
        d1.name as name1,
        d1.avg_rating as rating1,
        d1.review_count as reviews1,
        d1.created_at as created1,
        d2.id as id2,
        d2.name as name2,
        d2.avg_rating as rating2,
        d2.review_count as reviews2,
        d2.created_at as created2,
        calculate_dish_similarity(d1.name, d2.name) as similarity
    FROM dishes d1
    JOIN dishes d2 ON d1.id < d2.id
    WHERE calculate_dish_similarity(d1.name, d2.name) >= 0.8
),
-- 3. 确定要保留的菜品（优先保留评分高、评论多、创建时间早的）
dishes_to_keep AS (
    SELECT 
        CASE 
            WHEN rating1 > rating2 THEN id1
            WHEN rating2 > rating1 THEN id2
            WHEN reviews1 > reviews2 THEN id1
            WHEN reviews2 > reviews1 THEN id2
            WHEN created1 < created2 THEN id1
            ELSE id2
        END as keep_id,
        CASE 
            WHEN rating1 > rating2 THEN id2
            WHEN rating2 > rating1 THEN id1
            WHEN reviews1 > reviews2 THEN id2
            WHEN reviews2 > reviews1 THEN id1
            WHEN created1 < created2 THEN id2
            ELSE id1
        END as remove_id,
        similarity,
        name1,
        name2
    FROM similar_dishes
)
-- 4. 显示将要删除的重复菜品
SELECT 
    'Will remove: ' || name1 || ' (keeping: ' || name2 || ')' as action,
    similarity,
    remove_id
FROM dishes_to_keep
ORDER BY similarity DESC;

-- 5. 实际删除重复菜品（取消注释以执行）
/*
WITH similar_dishes AS (
    SELECT 
        d1.id as id1,
        d1.name as name1,
        d1.avg_rating as rating1,
        d1.review_count as reviews1,
        d1.created_at as created1,
        d2.id as id2,
        d2.name as name2,
        d2.avg_rating as rating2,
        d2.review_count as reviews2,
        d2.created_at as created2,
        calculate_dish_similarity(d1.name, d2.name) as similarity
    FROM dishes d1
    JOIN dishes d2 ON d1.id < d2.id
    WHERE calculate_dish_similarity(d1.name, d2.name) >= 0.8
),
dishes_to_remove AS (
    SELECT 
        CASE 
            WHEN rating1 > rating2 THEN id2
            WHEN rating2 > rating1 THEN id1
            WHEN reviews1 > reviews2 THEN id2
            WHEN reviews2 > reviews1 THEN id1
            WHEN created1 < created2 THEN id2
            ELSE id1
        END as remove_id
    FROM similar_dishes
)
DELETE FROM dishes 
WHERE id IN (SELECT remove_id FROM dishes_to_remove);
*/

-- 6. 查找完全重复的菜品名称
SELECT 
    name,
    COUNT(*) as duplicate_count,
    STRING_AGG(id::text, ', ') as dish_ids,
    STRING_AGG(avg_rating::text, ', ') as ratings
FROM dishes 
GROUP BY name 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 7. 统计清理前后的数据
SELECT 
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_dish_names,
    COUNT(*) - COUNT(DISTINCT name) as exact_duplicates
FROM dishes;

-- 8. 清理函数
DROP FUNCTION IF EXISTS calculate_dish_similarity(TEXT, TEXT);