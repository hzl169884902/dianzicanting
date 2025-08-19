-- 检查当前减脂餐相关菜品的数量
SELECT 
  'total_diet_meals' as type,
  COUNT(*) as count
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name IN ('减脂餐', '健康餐', '健康轻食')
   OR d.name LIKE '%减脂%'
   OR d.name LIKE '%轻食%'
   OR d.name LIKE '%沙拉%'
   OR (d.nutrition_facts::json->>'calories')::int < 150;

-- 按分类统计
SELECT 
  c.name as category,
  COUNT(*) as count
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name IN ('减脂餐', '健康餐', '健康轻食')
GROUP BY c.name
ORDER BY count DESC;

-- 查看现有减脂餐菜品名称
SELECT 
  d.name,
  c.name as category,
  (d.nutrition_facts::json->>'calories')::int as calories
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name IN ('减脂餐', '健康餐', '健康轻食')
   OR d.name LIKE '%减脂%'
   OR d.name LIKE '%轻食%'
   OR d.name LIKE '%沙拉%'
ORDER BY calories ASC;