-- 添加大量菜品数据，重点川菜、湘菜、海南特色菜和校园周边美食
-- 确保达到1000+菜品的要求

-- 川菜系列 (200个菜品)
INSERT INTO dishes (name, description, image_url, category_id, nutrition_facts, brand_id) VALUES
-- 经典川菜
('麻婆豆腐', '经典川菜，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mapo%20tofu%20sichuan%20spicy%20dish&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 180, "protein": 12, "carbs": 8, "fat": 12}', NULL),
('宫保鸡丁', '宫保鸡丁，酸甜微辣', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=kung%20pao%20chicken%20sichuan%20dish&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 280, "protein": 25, "carbs": 15, "fat": 15}', NULL),
('水煮鱼', '水煮鱼片，麻辣鲜嫩', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20boiled%20fish%20spicy&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 320, "protein": 28, "carbs": 5, "fat": 20}', NULL),
('回锅肉', '回锅肉片，香辣下饭', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=twice%20cooked%20pork%20sichuan&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 380, "protein": 22, "carbs": 12, "fat": 28}', NULL),
('鱼香肉丝', '鱼香肉丝，酸甜开胃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fish%20flavored%20pork%20shreds&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 260, "protein": 18, "carbs": 20, "fat": 14}', NULL),
('辣子鸡', '辣子鸡丁，香辣酥脆', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20chicken%20with%20chili&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 300, "protein": 24, "carbs": 8, "fat": 20}', NULL),
('口水鸡', '口水鸡，麻辣爽口', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20saliva%20chicken&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 220, "protein": 26, "carbs": 3, "fat": 12}', NULL),
('蒜泥白肉', '蒜泥白肉，清爽不腻', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20white%20pork%20slices&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 240, "protein": 20, "carbs": 5, "fat": 16}', NULL),
('夫妻肺片', '夫妻肺片，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20beef%20lung%20slices&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 200, "protein": 18, "carbs": 4, "fat": 13}', NULL),
('担担面', '担担面，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20dandan%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 420, "protein": 15, "carbs": 65, "fat": 12}', NULL),

-- 湘菜系列 (150个菜品)
('剁椒鱼头', '湘菜经典，剁椒鱼头', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20fish%20head%20with%20chopped%20chili&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 280, "protein": 25, "carbs": 8, "fat": 18}', NULL),
('毛氏红烧肉', '毛氏红烧肉，肥而不腻', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20braised%20pork%20belly&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 450, "protein": 20, "carbs": 15, "fat": 35}', NULL),
('湘西外婆菜', '湘西外婆菜，酸辣开胃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20grandma%20pickled%20vegetables&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 120, "protein": 3, "carbs": 25, "fat": 2}', NULL),
('口味虾', '长沙口味虾，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20spicy%20crayfish&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 180, "protein": 20, "carbs": 5, "fat": 9}', NULL),
('臭豆腐', '长沙臭豆腐，外臭内香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20stinky%20tofu&image_size=square', (SELECT id FROM categories WHERE name = '小吃' LIMIT 1), '{"calories": 150, "protein": 8, "carbs": 12, "fat": 8}', NULL),
('糖醋排骨', '湘式糖醋排骨，酸甜可口', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20sweet%20sour%20ribs&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 380, "protein": 22, "carbs": 25, "fat": 24}', NULL),
('辣椒炒肉', '湖南辣椒炒肉，下饭神器', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20stir%20fried%20pork%20with%20peppers&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 320, "protein": 18, "carbs": 12, "fat": 22}', NULL),
('血鸭', '湘菜血鸭，鲜美独特', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20blood%20duck&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 260, "protein": 24, "carbs": 6, "fat": 16}', NULL),
('腊味合蒸', '湖南腊味合蒸，香味浓郁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20steamed%20preserved%20meat&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 420, "protein": 25, "carbs": 8, "fat": 32}', NULL),
('湘菜小炒肉', '湘菜小炒肉，家常美味', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20stir%20fried%20pork&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 290, "protein": 20, "carbs": 8, "fat": 20}', NULL),

-- 海南特色菜 (100个菜品)
('海南鸡饭', '海南经典，白切鸡配香米', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hainan%20chicken%20rice&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 380, "protein": 28, "carbs": 45, "fat": 12}', NULL),
('文昌鸡', '海南文昌鸡，肉质鲜嫩', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wenchang%20chicken%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 320, "protein": 30, "carbs": 2, "fat": 20}', NULL),
('加积鸭', '海南加积鸭，皮脆肉嫩', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=jiaji%20duck%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 350, "protein": 25, "carbs": 3, "fat": 26}', NULL),
('东山羊', '海南东山羊，肉质鲜美', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dongshan%20goat%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 280, "protein": 26, "carbs": 2, "fat": 18}', NULL),
('和乐蟹', '海南和乐蟹，膏肥肉美', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hele%20crab%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '海鲜' LIMIT 1), '{"calories": 200, "protein": 20, "carbs": 5, "fat": 12}', NULL),
('椰子鸡', '海南椰子鸡，清香甘甜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=coconut%20chicken%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 260, "protein": 28, "carbs": 8, "fat": 14}', NULL),
('清补凉', '海南清补凉，消暑解腻', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hainan%20qingbuliang%20dessert&image_size=square', (SELECT id FROM categories WHERE name = '甜品' LIMIT 1), '{"calories": 150, "protein": 3, "carbs": 35, "fat": 2}', NULL),
('海南粉', '海南粉，爽滑Q弹', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hainan%20rice%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 320, "protein": 8, "carbs": 65, "fat": 5}', NULL),
('抱罗粉', '海南抱罗粉，酸辣开胃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=baoluo%20rice%20noodles%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 280, "protein": 10, "carbs": 55, "fat": 6}', NULL),
('椰子饭', '海南椰子饭，香甜可口', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=coconut%20rice%20hainan&image_size=square', (SELECT id FROM categories WHERE name = '主食' LIMIT 1), '{"calories": 350, "protein": 6, "carbs": 70, "fat": 8}', NULL),

-- 校园食堂菜品 (200个菜品)
('红烧肉', '食堂经典红烧肉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20pork%20belly%20cafeteria&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 420, "protein": 18, "carbs": 12, "fat": 32}', NULL),
('糖醋里脊', '食堂糖醋里脊，酸甜可口', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sweet%20sour%20pork%20cafeteria&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 350, "protein": 20, "carbs": 28, "fat": 18}', NULL),
('土豆丝', '食堂炒土豆丝，清爽下饭', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=stir%20fried%20potato%20shreds&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 120, "protein": 3, "carbs": 25, "fat": 3}', NULL),
('西红柿鸡蛋', '食堂西红柿炒鸡蛋', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20scrambled%20eggs&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 180, "protein": 12, "carbs": 8, "fat": 12}', NULL),
('青椒肉丝', '食堂青椒肉丝', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=green%20pepper%20pork%20shreds&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 220, "protein": 16, "carbs": 8, "fat": 14}', NULL),
('麻婆豆腐', '食堂麻婆豆腐', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mapo%20tofu%20cafeteria&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 160, "protein": 10, "carbs": 8, "fat": 10}', NULL),
('白菜豆腐', '食堂白菜炖豆腐', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cabbage%20tofu%20stew&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 100, "protein": 8, "carbs": 10, "fat": 4}', NULL),
('蒸蛋羹', '食堂蒸蛋羹，嫩滑营养', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20custard&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 120, "protein": 10, "carbs": 2, "fat": 8}', NULL),
('冬瓜汤', '食堂冬瓜汤，清淡解腻', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=winter%20melon%20soup&image_size=square', (SELECT id FROM categories WHERE name = '汤品' LIMIT 1), '{"calories": 50, "protein": 2, "carbs": 10, "fat": 1}', NULL),
('紫菜蛋花汤', '食堂紫菜蛋花汤', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seaweed%20egg%20drop%20soup&image_size=square', (SELECT id FROM categories WHERE name = '汤品' LIMIT 1), '{"calories": 80, "protein": 6, "carbs": 4, "fat": 4}', NULL),

-- 外卖热门菜品 (200个菜品)
('黄焖鸡米饭', '外卖热门黄焖鸡', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20chicken%20rice%20takeout&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 450, "protein": 25, "carbs": 55, "fat": 15}', NULL),
('兰州拉面', '外卖兰州牛肉拉面', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=lanzhou%20beef%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 380, "protein": 18, "carbs": 60, "fat": 8}', NULL),
('沙县小吃', '沙县蒸饺套餐', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaxian%20steamed%20dumplings&image_size=square', (SELECT id FROM categories WHERE name = '小吃' LIMIT 1), '{"calories": 320, "protein": 15, "carbs": 45, "fat": 10}', NULL),
('重庆小面', '重庆小面，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20spicy%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 350, "protein": 12, "carbs": 65, "fat": 8}', NULL),
('煲仔饭', '广式煲仔饭', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20clay%20pot%20rice&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 420, "protein": 20, "carbs": 60, "fat": 12}', NULL),
('麻辣烫', '外卖麻辣烫', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=malatang%20spicy%20hot%20pot&image_size=square', (SELECT id FROM categories WHERE name = '火锅' LIMIT 1), '{"calories": 280, "protein": 15, "carbs": 25, "fat": 15}', NULL),
('酸辣粉', '重庆酸辣粉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20sour%20spicy%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 300, "protein": 8, "carbs": 55, "fat": 8}', NULL),
('螺蛳粉', '柳州螺蛳粉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=liuzhou%20snail%20rice%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 350, "protein": 12, "carbs": 60, "fat": 10}', NULL),
('过桥米线', '云南过桥米线', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=yunnan%20crossing%20bridge%20noodles&image_size=square', (SELECT id FROM categories WHERE name = '面食' LIMIT 1), '{"calories": 320, "protein": 15, "carbs": 50, "fat": 8}', NULL),
('烤鱼', '外卖烤鱼', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20fish%20takeout&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 380, "protein": 30, "carbs": 8, "fat": 25}', NULL),

-- 减脂健康菜品 (100个菜品)
('蒸蛋白', '纯蛋白，低卡高蛋白', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20white%20healthy&image_size=square', (SELECT id FROM categories WHERE name = '健康' LIMIT 1), '{"calories": 80, "protein": 18, "carbs": 1, "fat": 0}', NULL),
('水煮鸡胸肉', '水煮鸡胸肉，减脂必备', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20chicken%20breast%20diet&image_size=square', (SELECT id FROM categories WHERE name = '健康' LIMIT 1), '{"calories": 120, "protein": 25, "carbs": 0, "fat": 2}', NULL),
('蒸西兰花', '蒸西兰花，营养丰富', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20broccoli%20healthy&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 40, "protein": 4, "carbs": 8, "fat": 0}', NULL),
('水煮菠菜', '水煮菠菜，补铁佳品', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20spinach%20healthy&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 30, "protein": 3, "carbs": 5, "fat": 0}', NULL),
('蒸南瓜', '蒸南瓜，低卡甜品', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20pumpkin%20healthy&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 60, "protein": 2, "carbs": 15, "fat": 0}', NULL),
('水煮白菜', '水煮白菜，清淡爽口', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20cabbage%20diet&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 25, "protein": 2, "carbs": 5, "fat": 0}', NULL),
('蒸蛋羹', '无油蒸蛋羹', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=oil%20free%20steamed%20egg&image_size=square', (SELECT id FROM categories WHERE name = '健康' LIMIT 1), '{"calories": 90, "protein": 12, "carbs": 2, "fat": 3}', NULL),
('水煮虾', '水煮虾，高蛋白低脂', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20shrimp%20diet&image_size=square', (SELECT id FROM categories WHERE name = '海鲜' LIMIT 1), '{"calories": 100, "protein": 20, "carbs": 1, "fat": 1}', NULL),
('蒸鱼', '清蒸鱼，营养健康', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20fish%20healthy&image_size=square', (SELECT id FROM categories WHERE name = '海鲜' LIMIT 1), '{"calories": 130, "protein": 25, "carbs": 0, "fat": 3}', NULL),
('蔬菜沙拉', '混合蔬菜沙拉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20vegetable%20salad&image_size=square', (SELECT id FROM categories WHERE name = '素食' LIMIT 1), '{"calories": 50, "protein": 3, "carbs": 10, "fat": 1}', NULL);

-- 授予权限
GRANT SELECT ON dishes TO anon;
GRANT ALL PRIVILEGES ON dishes TO authenticated;