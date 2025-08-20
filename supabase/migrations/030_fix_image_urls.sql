-- 修复图片URL问题 - 将无效的trae-api URL替换为可用的图片源
-- 使用高质量的美食图片URL

UPDATE public.dishes 
SET image_url = CASE 
    WHEN name = '宫保鸡丁' THEN 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop&crop=center'
    WHEN name = '白切鸡' THEN 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop&crop=center'
    WHEN name = '麻婆豆腐' THEN 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=400&fit=crop&crop=center'
    WHEN name = '蔬菜沙拉' THEN 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&crop=center'
    WHEN name = '鸡胸肉沙拉' THEN 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop&crop=center'
    WHEN name = '牛肉炒河粉' THEN 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop&crop=center'
    WHEN name = '红烧肉' THEN 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop&crop=center'
    WHEN name = '番茄鸡蛋' THEN 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&crop=center'
    WHEN name = '冬瓜排骨汤' THEN 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop&crop=center'
    WHEN name = '红豆沙' THEN 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&crop=center'
    ELSE image_url
END
WHERE image_url LIKE '%trae-api%';

-- 为所有没有图片的菜品设置默认图片
UPDATE public.dishes 
SET image_url = 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop&crop=center'
WHERE image_url IS NULL OR image_url = '';

-- 验证更新结果
SELECT name, image_url FROM public.dishes WHERE image_url LIKE '%trae-api%' OR image_url IS NULL;