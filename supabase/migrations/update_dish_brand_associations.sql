-- 为没有品牌关联的菜品随机分配品牌
-- 首先创建一个临时表来存储品牌ID
WITH brand_ids AS (
  SELECT id FROM brands ORDER BY RANDOM()
),
unassigned_dishes AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY RANDOM()) as rn
  FROM dishes 
  WHERE brand_id IS NULL
),
brand_assignment AS (
  SELECT 
    ud.id as dish_id,
    b.id as brand_id
  FROM unassigned_dishes ud
  CROSS JOIN LATERAL (
    SELECT id 
    FROM brand_ids 
    OFFSET ((ud.rn - 1) % (SELECT COUNT(*) FROM brands)) 
    LIMIT 1
  ) b
)
UPDATE dishes 
SET brand_id = ba.brand_id
FROM brand_assignment ba
WHERE dishes.id = ba.dish_id;

-- 验证更新结果
SELECT 
  COUNT(*) as total_dishes,
  COUNT(brand_id) as dishes_with_brand,
  COUNT(*) - COUNT(brand_id) as dishes_without_brand
FROM dishes;

-- 显示各品牌的菜品分布
SELECT 
  b.name as brand_name,
  COUNT(d.id) as dish_count
FROM brands b
LEFT JOIN dishes d ON b.id = d.brand_id
GROUP BY b.id, b.name
HAVING COUNT(d.id) > 0
ORDER BY dish_count DESC
LIMIT 20;