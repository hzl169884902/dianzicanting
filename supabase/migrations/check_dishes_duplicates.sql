-- 检查菜品重复情况和分类分布

-- 1. 检查重复菜品名称
SELECT name, COUNT(*) as count
FROM dishes
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 2. 查看总菜品数量
SELECT COUNT(*) as total_dishes FROM dishes;

-- 3. 查看各分类菜品数量
SELECT c.name as category_name, COUNT(d.id) as dish_count
FROM categories c
LEFT JOIN dishes d ON c.id = d.category_id
GROUP BY c.id, c.name
ORDER BY dish_count DESC;

-- 4. 查看减脂餐数量（假设减脂餐在健康分类中）
SELECT COUNT(*) as weight_loss_dishes
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name ILIKE '%健康%' OR c.name ILIKE '%减脂%' OR c.name ILIKE '%轻食%';

-- 5. 查看夜宵分类菜品数量
SELECT COUNT(*) as night_snack_dishes
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name ILIKE '%夜宵%' OR c.name ILIKE '%宵夜%';

-- 6. 查看外卖热门分类菜品数量
SELECT COUNT(*) as takeout_dishes
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name ILIKE '%外卖%' OR c.name ILIKE '%快餐%';