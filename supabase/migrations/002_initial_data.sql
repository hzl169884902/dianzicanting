-- 插入菜品分类数据
INSERT INTO public.categories (name, description, icon) VALUES
('川菜', '四川地方菜系，以麻辣著称', '🌶️'),
('粤菜', '广东地方菜系，清淡鲜美', '🦐'),
('素食', '纯植物性食材制作', '🥬'),
('减脂餐', '低热量健康餐食', '🥗'),
('增肌餐', '高蛋白营养餐食', '🥩'),
('家常菜', '日常家庭料理', '🏠'),
('汤品', '各式汤类料理', '🍲'),
('甜品', '甜点和饮品', '🍰');

-- 插入示例菜品数据
WITH category_ids AS (
  SELECT id, name FROM public.categories
)
INSERT INTO public.dishes (name, description, image_url, category_id, nutrition_facts, avg_rating, review_count, popularity_score) 
SELECT 
  dish_data.name,
  dish_data.description,
  dish_data.image_url,
  c.id,
  dish_data.nutrition_facts::jsonb,
  dish_data.avg_rating,
  dish_data.review_count,
  dish_data.popularity_score
FROM (
  VALUES 
    ('宫保鸡丁', '经典川菜，鸡肉配花生米，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Kung%20Pao%20Chicken%20with%20peanuts%20and%20vegetables%20in%20traditional%20Chinese%20style&image_size=square', '川菜', '{"calories": 280, "protein": 25, "fat": 15, "carbs": 12}', 4.5, 128, 95),
    ('白切鸡', '广东经典菜品，清淡嫩滑', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cantonese%20white%20cut%20chicken%20with%20ginger%20scallion%20sauce&image_size=square', '粤菜', '{"calories": 165, "protein": 31, "fat": 3, "carbs": 0}', 4.3, 89, 78),
    ('麻婆豆腐', '四川传统名菜，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Mapo%20tofu%20with%20minced%20meat%20in%20spicy%20sauce%20Sichuan%20style&image_size=square', '川菜', '{"calories": 150, "protein": 12, "fat": 10, "carbs": 8}', 4.6, 156, 102),
    ('蔬菜沙拉', '新鲜蔬菜配橄榄油醋汁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20vegetable%20salad%20with%20mixed%20greens%20tomatoes%20cucumbers&image_size=square', '素食', '{"calories": 85, "protein": 3, "fat": 6, "carbs": 8}', 4.2, 67, 45),
    ('鸡胸肉沙拉', '高蛋白低脂减脂餐', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Grilled%20chicken%20breast%20salad%20with%20vegetables%20healthy%20meal&image_size=square', '减脂餐', '{"calories": 220, "protein": 35, "fat": 5, "carbs": 10}', 4.4, 93, 87),
    ('牛肉炒河粉', '广式经典炒粉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cantonese%20beef%20chow%20fun%20noodles%20with%20vegetables&image_size=square', '粤菜', '{"calories": 380, "protein": 22, "fat": 12, "carbs": 45}', 4.1, 74, 69),
    ('红烧肉', '经典家常菜，肥瘦相间', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20red%20braised%20pork%20belly%20in%20soy%20sauce&image_size=square', '家常菜', '{"calories": 450, "protein": 18, "fat": 35, "carbs": 15}', 4.7, 201, 134),
    ('番茄鸡蛋', '简单营养的家常菜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20tomato%20and%20scrambled%20eggs%20home%20style%20cooking&image_size=square', '家常菜', '{"calories": 180, "protein": 12, "fat": 12, "carbs": 8}', 4.0, 45, 38),
    ('冬瓜排骨汤', '清淡营养汤品', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Winter%20melon%20and%20pork%20ribs%20soup%20Chinese%20style&image_size=square', '汤品', '{"calories": 120, "protein": 15, "fat": 4, "carbs": 6}', 4.3, 82, 56),
    ('红豆沙', '传统甜品，温润香甜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20red%20bean%20soup%20dessert%20in%20bowl&image_size=square', '甜品', '{"calories": 160, "protein": 6, "fat": 1, "carbs": 35}', 4.1, 39, 28)
) AS dish_data(name, description, image_url, category_name, nutrition_facts, avg_rating, review_count, popularity_score)
JOIN category_ids c ON c.name = dish_data.category_name;

-- 插入示例食材数据
INSERT INTO public.ingredients (name, category, nutrition_per_100g) VALUES
('鸡胸肉', '肉类', '{"calories": 165, "protein": 31, "fat": 3.6, "carbs": 0}'),
('牛肉', '肉类', '{"calories": 250, "protein": 26, "fat": 15, "carbs": 0}'),
('豆腐', '豆制品', '{"calories": 76, "protein": 8, "fat": 4.8, "carbs": 1.9}'),
('西红柿', '蔬菜', '{"calories": 18, "protein": 0.9, "fat": 0.2, "carbs": 3.9}'),
('黄瓜', '蔬菜', '{"calories": 16, "protein": 0.7, "fat": 0.1, "carbs": 3.6}'),
('生菜', '蔬菜', '{"calories": 15, "protein": 1.4, "fat": 0.2, "carbs": 2.9}'),
('鸡蛋', '蛋类', '{"calories": 155, "protein": 13, "fat": 11, "carbs": 1.1}'),
('大米', '谷物', '{"calories": 130, "protein": 2.7, "fat": 0.3, "carbs": 28}'),
('花生', '坚果', '{"calories": 567, "protein": 26, "fat": 49, "carbs": 16}'),
('冬瓜', '蔬菜', '{"calories": 11, "protein": 0.4, "fat": 0.2, "carbs": 2.6}');

-- 为菜品添加食材关联（示例）
WITH dish_ingredient_data AS (
  SELECT 
    d.id as dish_id,
    i.id as ingredient_id,
    rel.amount,
    rel.unit
  FROM (
    VALUES 
      ('宫保鸡丁', '鸡胸肉', 200, '克'),
      ('宫保鸡丁', '花生', 50, '克'),
      ('白切鸡', '鸡胸肉', 300, '克'),
      ('麻婆豆腐', '豆腐', 400, '克'),
      ('麻婆豆腐', '牛肉', 100, '克'),
      ('蔬菜沙拉', '生菜', 100, '克'),
      ('蔬菜沙拉', '西红柿', 80, '克'),
      ('蔬菜沙拉', '黄瓜', 60, '克'),
      ('鸡胸肉沙拉', '鸡胸肉', 150, '克'),
      ('鸡胸肉沙拉', '生菜', 80, '克'),
      ('番茄鸡蛋', '西红柿', 200, '克'),
      ('番茄鸡蛋', '鸡蛋', 2, '个'),
      ('冬瓜排骨汤', '冬瓜', 300, '克')
  ) AS rel(dish_name, ingredient_name, amount, unit)
  JOIN public.dishes d ON d.name = rel.dish_name
  JOIN public.ingredients i ON i.name = rel.ingredient_name
)
INSERT INTO public.dish_ingredients (dish_id, ingredient_id, amount, unit)
SELECT dish_id, ingredient_id, amount, unit FROM dish_ingredient_data;

-- 授予权限
GRANT SELECT ON public.categories TO anon;
GRANT ALL PRIVILEGES ON public.categories TO authenticated;

GRANT SELECT ON public.dishes TO anon;
GRANT ALL PRIVILEGES ON public.dishes TO authenticated;

GRANT SELECT ON public.diet_records TO anon;
GRANT ALL PRIVILEGES ON public.diet_records TO authenticated;

GRANT SELECT ON public.dish_reviews TO anon;
GRANT ALL PRIVILEGES ON public.dish_reviews TO authenticated;

GRANT SELECT ON public.user_goals TO anon;
GRANT ALL PRIVILEGES ON public.user_goals TO authenticated;

GRANT SELECT ON public.users TO anon;
GRANT ALL PRIVILEGES ON public.users TO authenticated;

GRANT SELECT ON public.ingredients TO anon;
GRANT ALL PRIVILEGES ON public.ingredients TO authenticated;

GRANT SELECT ON public.dish_ingredients TO anon;
GRANT ALL PRIVILEGES ON public.dish_ingredients TO authenticated;

GRANT SELECT ON public.social_posts TO anon;
GRANT ALL PRIVILEGES ON public.social_posts TO authenticated;

GRANT SELECT ON public.social_comments TO anon;
GRANT ALL PRIVILEGES ON public.social_comments TO authenticated;

GRANT SELECT ON public.likes TO anon;
GRANT ALL PRIVILEGES ON public.likes TO authenticated;