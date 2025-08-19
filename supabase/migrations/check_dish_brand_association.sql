-- 检查菜品与品牌关联情况
SELECT 
  COUNT(*) as total_dishes,
  COUNT(brand_id) as dishes_with_brand,
  COUNT(*) - COUNT(brand_id) as dishes_without_brand
FROM dishes;

-- 查看没有品牌关联的菜品
SELECT id, name, category_id
FROM dishes 
WHERE brand_id IS NULL
LIMIT 10;

-- 查看品牌数量
SELECT COUNT(*) as total_brands FROM brands;

-- 查看各品牌的菜品数量
SELECT 
  b.name as brand_name,
  COUNT(d.id) as dish_count
FROM brands b
LEFT JOIN dishes d ON b.id = d.brand_id
GROUP BY b.id, b.name
ORDER BY dish_count DESC
LIMIT 20;