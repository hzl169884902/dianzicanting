-- 028_add_final_4_dishes.sql
-- 添加最后4个减脂餐菜品，达到1000个菜品目标
-- 作者：AI助手
-- 日期：2025-01-21

-- 插入最后4个减脂餐菜品
INSERT INTO dishes (name, description, category, price, image_url, nutrition_facts, ingredients, cooking_instructions, prep_time, cook_time, servings, difficulty, tags, created_at, updated_at) VALUES

-- 减脂晚餐系列 (2个)
('6A减脂晚餐11号', '低卡路里蒸蛋羹配蔬菜丁', '减脂餐', 24.00, 'https://trae-api.mchost.guru/text_to_image?text=6A减脂晚餐11号蒸蛋羹', '{"calories": 180, "protein": 15, "carbs": 8, "fat": 10, "fiber": 3}', '鸡蛋,胡萝卜丁,豌豆,香菇丁', '1. 鸡蛋打散加温水\n2. 蔬菜丁焯水\n3. 蒸制15分钟', 10, 15, 1, 'easy', 'dinner,diet,steamed', NOW(), NOW()),

('6A减脂晚餐12号', '紫薯银耳汤配坚果', '减脂餐', 22.00, 'https://trae-api.mchost.guru/text_to_image?text=6A减脂晚餐12号紫薯银耳汤', '{"calories": 160, "protein": 6, "carbs": 28, "fat": 4, "fiber": 5}', '紫薯,银耳,核桃,枸杞', '1. 银耳提前泡发\n2. 紫薯蒸熟压泥\n3. 煮汤加坚果', 20, 30, 2, 'easy', 'dinner,soup,purple-sweet-potato', NOW(), NOW()),

-- 减脂加餐系列 (2个)
('6A减脂加餐11号', '酸奶坚果杯', '减脂餐', 18.00, 'https://trae-api.mchost.guru/text_to_image?text=6A减脂加餐11号酸奶坚果杯', '{"calories": 140, "protein": 8, "carbs": 12, "fat": 8, "fiber": 2}', '无糖酸奶,混合坚果,蓝莓', '1. 酸奶装杯\n2. 撒上坚果\n3. 点缀蓝莓', 5, 0, 1, 'easy', 'snack,yogurt,nuts', NOW(), NOW()),

('6A减脂加餐12号', '蔬菜脆片', '减脂餐', 16.00, 'https://trae-api.mchost.guru/text_to_image?text=6A减脂加餐12号蔬菜脆片', '{"calories": 95, "protein": 3, "carbs": 18, "fat": 2, "fiber": 4}', '红薯片,紫薯片,胡萝卜片', '1. 蔬菜切薄片\n2. 烤箱低温烘烤\n3. 烤至酥脆', 15, 45, 2, 'easy', 'snack,vegetable,crispy', NOW(), NOW());

-- 验证菜品总数
-- SELECT COUNT(*) as total_dishes FROM dishes;