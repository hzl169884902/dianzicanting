-- 检查最终菜品数量和分类统计
SELECT 
    'Total Dishes' as metric,
    COUNT(*) as count
FROM dishes

UNION ALL

SELECT 
    'Healthy Light Meals' as metric,
    COUNT(*) as count
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name = '健康轻食'

UNION ALL

SELECT 
    'BBQ/Night Snacks' as metric,
    COUNT(*) as count
FROM dishes d
JOIN categories c ON d.category_id = c.id
WHERE c.name = '烧烤'

UNION ALL

SELECT 
    'Takeout Popular' as metric,
    COUNT(*) as count
FROM dishes d
WHERE d.popularity_score >= 85

UNION ALL

SELECT 
    c.name as metric,
    COUNT(*) as count
FROM dishes d
JOIN categories c ON d.category_id = c.id
GROUP BY c.name
ORDER BY count DESC;