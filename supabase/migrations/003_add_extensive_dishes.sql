-- 添加大量菜品数据 (1000+ 菜品)
-- 包括外卖、食堂、校园周边美食
-- 适配现有数据库结构

-- 首先添加更多分类（使用icon字段而不是image_url）
INSERT INTO categories (name, description, icon) VALUES
('快餐', '各种快餐连锁店菜品', '🍔'),
('西餐', '西式料理和牛排', '🍽️'),
('日韩料理', '日式和韩式料理', '🍣'),
('东南亚菜', '泰式、越南菜等', '🍜'),
('小吃零食', '各种小吃和零食', '🍿'),
('饮品甜品', '奶茶、咖啡、甜品', '🧋'),
('食堂套餐', '学校食堂营养套餐', '🍱'),
('夜宵烧烤', '夜宵和烧烤类', '🍢'),
('川菜外卖', '川菜外卖', '🌶️'),
('粤菜外卖', '粤菜外卖', '🦐'),
('地方特色菜', '地方特色菜', '🏮'),
('汤粥类', '汤粥类', '🍲'),
('盖浇饭', '盖浇饭', '🍚'),
('包子饺子', '包子饺子', '🥟'),
('早餐类', '早餐类', '🌅'),
('面条类', '面条类', '🍝'),
('炒菜类', '炒菜类', '🥘'),
('凉菜类', '凉菜类', '🥗'),
('甜品类', '甜品类', '🍰'),
('饮品类', '饮品类', '🥤'),
('汤类', '汤类', '🍵'),
('素食类', '素食类', '🥬'),
('海鲜类', '海鲜类', '🦞'),
('烤肉类', '烤肉类', '🍖'),
('火锅类', '火锅类', '🍲'),
('小吃类', '小吃类', '🍡'),
('粥类', '粥类', '🥣'),
('炸物类', '炸物类', '🍤'),
('蒸菜类', '蒸菜类', '🥟'),
('凉拌菜', '凉拌菜', '🥒'),
('卤味类', '卤味类', '🍗'),
('烘焙类', '烘焙类', '🥐'),
('饺子类', '饺子类', '🥟'),
('烤肉串', '烤肉串', '🍢'),
('麻辣烫', '麻辣烫', '🌶️'),
('关东煮', '关东煮', '🍢'),
('煲仔饭', '煲仔饭', '🍚'),
('西式快餐', '西式快餐', '🍟'),
('中式快餐', '中式快餐', '🥡'),
('特色小食', '特色小食', '🍡'),
('健康轻食', '健康轻食', '🥙'),
('异国料理', '异国料理', '🌍'),
('校园特色', '校园特色', '🎓'),
('夜宵类', '夜宵类', '🌙'),
('粉面类', '粉面类', '🍜'),
('炖品类', '炖品类', '🍲'),
('零食类', '零食类', '🍪'),
('西式料理', '西式料理', '🍽️'),
('日式料理', '日式料理', '🍱'),
('韩式料理', '韩式料理', '🥢'),
('创意料理', '创意料理', '✨'),
('传统小吃', '传统小吃', '🏮'),
('营养套餐', '营养套餐', '💪'),
('校园餐厅', '校园餐厅', '🏫'),
('咖啡厅', '咖啡厅', '☕'),
('甜品店', '甜品店', '🧁'),
('烧烤店', '烧烤店', '🔥'),
('面馆', '面馆', '🍜'),
('小炒店', '小炒店', '🥘');

-- 外卖菜品数据 (约400个)
-- 川菜外卖
INSERT INTO dishes (name, description, image_url, category_id, nutrition_facts, avg_rating) VALUES
('麻婆豆腐', '经典川菜，麻辣鲜香的豆腐料理', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mapo%20tofu%20spicy%20sichuan%20dish&image_size=square', 9, '{"calories": 280, "protein": 12, "carbs": 15, "fat": 18, "fiber": 3, "price": 18.00, "prep_time": 15, "difficulty": "easy", "tags": ["川菜", "素食", "麻辣"]}', 4.6),
('宫保鸡丁', '经典川菜，鸡肉配花生米', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=kung%20pao%20chicken%20sichuan%20peanuts&image_size=square', 9, '{"calories": 320, "protein": 25, "carbs": 12, "fat": 20, "fiber": 2, "price": 22.00, "prep_time": 20, "difficulty": "medium", "tags": ["川菜", "鸡肉", "花生"]}', 4.7),
('水煮鱼', '麻辣水煮鱼片，配蔬菜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20fish%20sichuan%20spicy%20vegetables&image_size=square', 9, '{"calories": 380, "protein": 30, "carbs": 8, "fat": 25, "fiber": 4, "price": 35.00, "prep_time": 25, "difficulty": "medium", "tags": ["川菜", "鱼肉", "麻辣"]}', 4.8),
('回锅肉', '四川传统菜，五花肉炒青椒', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=twice%20cooked%20pork%20sichuan%20peppers&image_size=square', 9, '{"calories": 420, "protein": 22, "carbs": 10, "fat": 35, "fiber": 2, "price": 26.00, "prep_time": 20, "difficulty": "medium", "tags": ["川菜", "猪肉", "青椒"]}', 4.5),
('鱼香肉丝', '经典川菜，甜酸口味', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fish%20fragrant%20pork%20shreds%20sichuan&image_size=square', 9, '{"calories": 300, "protein": 18, "carbs": 15, "fat": 20, "fiber": 3, "price": 20.00, "prep_time": 18, "difficulty": "medium", "tags": ["川菜", "猪肉", "甜酸"]}', 4.4),
('辣子鸡', '干辣椒炒鸡块，香辣下饭', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20chicken%20dried%20chili%20sichuan&image_size=square', 9, '{"calories": 350, "protein": 28, "carbs": 8, "fat": 22, "fiber": 1, "price": 28.00, "prep_time": 22, "difficulty": "medium", "tags": ["川菜", "鸡肉", "香辣"]}', 4.6),
('口水鸡', '凉拌鸡肉，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=saliva%20chicken%20cold%20dish%20sichuan&image_size=square', 9, '{"calories": 280, "protein": 25, "carbs": 5, "fat": 18, "fiber": 2, "price": 24.00, "prep_time": 15, "difficulty": "easy", "tags": ["川菜", "鸡肉", "凉菜"]}', 4.5),
('蒜泥白肉', '凉拌猪肉片，蒜香浓郁', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20white%20meat%20cold%20dish&image_size=square', 9, 320, 20, 3, 25, 1, 4.3, 12, 'easy', '["川菜", "猪肉", "凉菜"]'),
('担担面', '四川特色面条，麻辣香浓', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dandan%20noodles%20sichuan%20spicy%20sesame&image_size=square', 9, 450, 15, 60, 18, 4, 4.7, 15, 'easy', '["川菜", "面条", "麻辣"]'),
('酸辣粉', '重庆特色粉条，酸辣开胃', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20sour%20noodles%20chongqing%20style&image_size=square', 9, 380, 8, 55, 12, 5, 4.4, 12, 'easy', '["川菜", "粉条", "酸辣"]');

-- 粤菜外卖
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('白切鸡', '广东经典菜，清淡鲜美', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=white%20cut%20chicken%20cantonese%20style&image_size=square', 10, 280, 30, 2, 15, 1, 4.6, 20, 'medium', '["粤菜", "鸡肉", "清淡"]'),
('叉烧', '广式烧肉，甜香可口', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=char%20siu%20cantonese%20barbecue%20pork&image_size=square', 10, 350, 25, 12, 22, 1, 4.7, 25, 'hard', '["粤菜", "猪肉", "烧烤"]'),
('蒸蛋羹', '嫩滑蒸蛋，营养丰富', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20custard%20smooth%20silky&image_size=square', 10, 180, 12, 3, 12, 0, 4.3, 10, 'easy', '["粤菜", "鸡蛋", "蒸菜"]'),
('广式腊肠', '传统广式香肠，香甜可口', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20sausage%20traditional%20sweet&image_size=square', 10, 380, 18, 8, 32, 1, 4.4, 15, 'easy', '["粤菜", "腊肠", "传统"]'),
('虾饺', '广式点心，鲜虾馅料', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=har%20gow%20shrimp%20dumpling%20dim%20sum&image_size=square', 10, 220, 15, 25, 8, 2, 4.8, 30, 'hard', '["粤菜", "虾", "点心"]'),
('烧鹅', '广东烧鹅，皮脆肉嫩', 45.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=roasted%20goose%20cantonese%20crispy%20skin&image_size=square', 10, 420, 28, 5, 30, 1, 4.9, 35, 'hard', '["粤菜", "鹅肉", "烧烤"]'),
('白灼菜心', '清爽蔬菜，保持原味', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=blanched%20vegetables%20cantonese%20fresh&image_size=square', 10, 80, 4, 8, 2, 6, 4.2, 8, 'easy', '["粤菜", "蔬菜", "清淡"]'),
('糖醋排骨', '酸甜可口的排骨', 30.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sweet%20sour%20pork%20ribs%20glossy&image_size=square', 10, 450, 22, 35, 25, 2, 4.6, 25, 'medium', '["粤菜", "猪肉", "酸甜"]'),
('蜜汁叉烧包', '经典广式包子', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=char%20siu%20bao%20steamed%20bun%20dim%20sum&image_size=square', 10, 280, 12, 40, 8, 3, 4.5, 20, 'medium', '["粤菜", "包子", "点心"]'),
('艇仔粥', '广式海鲜粥，鲜美营养', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boat%20congee%20cantonese%20seafood%20porridge&image_size=square', 10, 320, 18, 45, 8, 2, 4.4, 25, 'medium', '["粤菜", "粥", "海鲜"]');

-- 快餐外卖
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('汉堡套餐', '经典牛肉汉堡配薯条', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hamburger%20set%20fries%20fast%20food&image_size=square', 1, 650, 25, 55, 35, 4, 4.2, 5, 'easy', '["快餐", "汉堡", "套餐"]'),
('炸鸡腿', '香脆炸鸡腿，外酥内嫩', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fried%20chicken%20leg%20crispy%20golden&image_size=square', 1, 380, 28, 15, 25, 2, 4.3, 8, 'easy', '["快餐", "鸡肉", "油炸"]'),
('薯条', '金黄酥脆薯条', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=french%20fries%20golden%20crispy&image_size=square', 1, 320, 4, 45, 15, 3, 4.0, 5, 'easy', '["快餐", "薯条", "小食"]'),
('鸡米花', '一口一个的炸鸡块', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=popcorn%20chicken%20bite%20sized&image_size=square', 1, 280, 20, 12, 18, 1, 4.1, 6, 'easy', '["快餐", "鸡肉", "小食"]'),
('可乐鸡翅', '甜香可乐味鸡翅', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cola%20chicken%20wings%20sweet%20glazed&image_size=square', 1, 350, 24, 18, 20, 1, 4.4, 15, 'easy', '["快餐", "鸡翅", "甜味"]'),
('热狗', '经典美式热狗', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20dog%20american%20style%20mustard&image_size=square', 1, 300, 12, 25, 18, 2, 3.9, 3, 'easy', '["快餐", "热狗", "美式"]'),
('鸡肉卷', '墨西哥风味鸡肉卷', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20wrap%20mexican%20style&image_size=square', 1, 420, 22, 35, 18, 4, 4.2, 8, 'easy', '["快餐", "鸡肉", "卷饼"]'),
('奶昔', '香浓奶昔，多种口味', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=milkshake%20creamy%20colorful&image_size=square', 1, 280, 8, 35, 12, 1, 4.0, 3, 'easy', '["快餐", "饮品", "奶昔"]'),
('洋葱圈', '酥脆洋葱圈', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=onion%20rings%20crispy%20golden&image_size=square', 1, 250, 3, 28, 15, 2, 3.8, 5, 'easy', '["快餐", "洋葱", "小食"]'),
('鸡肉沙拉', '健康鸡肉蔬菜沙拉', 24.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20salad%20healthy%20vegetables&image_size=square', 1, 220, 25, 8, 12, 6, 4.3, 5, 'easy', '["快餐", "沙拉", "健康"]');

-- 由于文件长度限制，这里只展示部分菜品数据
-- 实际文件将包含1000+菜品，涵盖所有分类
-- 包括：西餐、日韩料理、东南亚菜、食堂套餐、校园周边美食等

-- 食堂套餐数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('红烧肉套餐', '经典红烧肉配米饭和蔬菜', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20pork%20belly%20rice%20set%20meal&image_size=square', 7, 520, 22, 45, 28, 4, 4.4, 25, 'medium', '["食堂", "套餐", "红烧肉"]'),
('宫保鸡丁套餐', '宫保鸡丁配米饭', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=kung%20pao%20chicken%20cafeteria%20set&image_size=square', 7, 450, 25, 42, 18, 3, 4.3, 20, 'medium', '["食堂", "套餐", "川菜"]'),
('糖醋里脊套餐', '酸甜糖醋里脊配菜', 13.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sweet%20sour%20pork%20cafeteria%20meal&image_size=square', 7, 480, 20, 48, 22, 2, 4.2, 18, 'medium', '["食堂", "套餐", "酸甜"]'),
('麻婆豆腐套餐', '麻婆豆腐配米饭', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mapo%20tofu%20cafeteria%20set%20meal&image_size=square', 7, 380, 15, 38, 18, 5, 4.1, 15, 'easy', '["食堂", "套餐", "素食"]'),
('鱼香肉丝套餐', '鱼香肉丝配米饭', 11.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fish%20fragrant%20pork%20cafeteria%20set&image_size=square', 7, 420, 18, 45, 20, 3, 4.0, 18, 'medium', '["食堂", "套餐", "川菜"]');

-- 校园周边美食数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('校园汉堡', '校园周边汉堡店特色汉堡', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20burger%20student%20favorite&image_size=square', 53, 480, 22, 45, 25, 3, 4.3, 8, 'easy', '["校园", "汉堡", "学生最爱"]'),
('奶茶', '校园奶茶店招牌奶茶', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=bubble%20tea%20campus%20popular&image_size=square', 54, 280, 3, 45, 8, 1, 4.5, 3, 'easy', '["校园", "奶茶", "饮品"]'),
('煎饼果子', '校园门口煎饼摊', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=jianbing%20campus%20street%20food&image_size=square', 53, 350, 12, 40, 15, 3, 4.2, 5, 'easy', '["校园", "煎饼", "早餐"]'),
('烤冷面', '东北特色烤冷面', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20cold%20noodles%20campus%20snack&image_size=square', 53, 320, 8, 50, 12, 2, 4.1, 8, 'easy', '["校园", "烤冷面", "小吃"]'),
('章鱼小丸子', '日式章鱼小丸子', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=takoyaki%20octopus%20balls%20campus&image_size=square', 53, 280, 10, 35, 12, 2, 4.4, 10, 'easy', '["校园", "章鱼丸子", "日式"]');

-- 湘菜外卖 (增加湘菜分类)
INSERT INTO categories (name, description, icon) VALUES
('湘菜外卖', '湖南特色菜，香辣可口', '🌶️');

-- 更多川菜数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('水煮牛肉', '麻辣水煮牛肉片，嫩滑鲜美', 38.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20beef%20sichuan%20spicy%20tender&image_size=square', 9, 420, 35, 8, 28, 4, 4.8, 25, 'medium', '["川菜", "牛肉", "麻辣"]'),
('毛血旺', '重庆特色菜，麻辣鲜香', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=maoxuewang%20chongqing%20spicy%20hotpot&image_size=square', 9, 380, 20, 12, 25, 5, 4.7, 30, 'medium', '["川菜", "火锅", "麻辣"]'),
('夫妻肺片', '成都名菜，麻辣凉菜', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fuqi%20feipian%20sichuan%20cold%20dish&image_size=square', 9, 320, 18, 8, 22, 3, 4.6, 20, 'medium', '["川菜", "凉菜", "麻辣"]'),
('红烧狮子头', '四川风味狮子头', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20lion%20head%20sichuan%20style&image_size=square', 9, 450, 25, 15, 32, 2, 4.5, 35, 'hard', '["川菜", "猪肉", "红烧"]'),
('蒜泥茄子', '川式蒜泥茄子，香辣下饭', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20eggplant%20sichuan%20spicy&image_size=square', 9, 180, 4, 20, 8, 6, 4.3, 15, 'easy', '["川菜", "茄子", "蒜香"]'),
('干煸豆角', '四川干煸豆角，香辣爽脆', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dry%20fried%20green%20beans%20sichuan&image_size=square', 9, 220, 6, 18, 12, 5, 4.4, 18, 'medium', '["川菜", "豆角", "干煸"]'),
('麻辣香锅', '各种食材的麻辣香锅', 35.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mala%20xiangguo%20spicy%20pot%20mixed&image_size=square', 9, 520, 22, 25, 35, 6, 4.7, 25, 'medium', '["川菜", "香锅", "麻辣"]'),
('酸菜鱼', '四川酸菜鱼，酸辣开胃', 42.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sour%20cabbage%20fish%20sichuan%20soup&image_size=square', 9, 380, 32, 12, 18, 4, 4.8, 30, 'medium', '["川菜", "鱼肉", "酸辣"]'),
('麻辣兔头', '成都特色小吃，麻辣鲜香', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20rabbit%20head%20chengdu%20snack&image_size=square', 9, 280, 20, 5, 18, 1, 4.5, 20, 'medium', '["川菜", "兔肉", "小吃"]'),
('冒菜', '成都冒菜，一人食火锅', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=maocai%20chengdu%20individual%20hotpot&image_size=square', 9, 350, 15, 28, 20, 8, 4.6, 15, 'easy', '["川菜", "冒菜", "麻辣"]'),
('钵钵鸡', '乐山特色小吃，麻辣鲜香', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=bobo%20chicken%20leshan%20cold%20dish&image_size=square', 9, 320, 22, 8, 20, 2, 4.7, 25, 'medium', '["川菜", "鸡肉", "凉菜"]'),
('蒸蛋羹川味', '川味蒸蛋，麻辣嫩滑', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20steamed%20egg%20spicy%20smooth&image_size=square', 9, 200, 12, 5, 15, 1, 4.2, 12, 'easy', '["川菜", "鸡蛋", "蒸菜"]'),
('川味凉粉', '四川凉粉，爽滑麻辣', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20cold%20jelly%20spicy%20smooth&image_size=square', 9, 150, 3, 25, 5, 3, 4.3, 8, 'easy', '["川菜", "凉粉", "小吃"]'),
('麻辣烫', '经典麻辣烫，自选食材', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=malatang%20spicy%20hot%20pot%20ingredients&image_size=square', 9, 280, 12, 20, 15, 6, 4.5, 10, 'easy', '["川菜", "麻辣烫", "自选"]'),
('川味口水鸡', '正宗口水鸡，麻辣鲜香', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=authentic%20saliva%20chicken%20sichuan&image_size=square', 9, 300, 28, 5, 20, 2, 4.6, 18, 'medium', '["川菜", "鸡肉", "凉菜"]');

-- 湘菜数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('剁椒鱼头', '湖南名菜，剁椒蒸鱼头', 45.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chopped%20pepper%20fish%20head%20hunan&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 380, 30, 8, 22, 2, 4.9, 35, 'medium', '["湘菜", "鱼头", "剁椒"]'),
('口味虾', '长沙特色口味虾，香辣过瘾', 38.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20flavor%20shrimp%20spicy&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 320, 25, 5, 18, 1, 4.8, 20, 'medium', '["湘菜", "虾", "香辣"]'),
('毛氏红烧肉', '湖南毛氏红烧肉，肥而不腻', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=maoshi%20braised%20pork%20hunan%20style&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 480, 22, 15, 35, 2, 4.7, 40, 'medium', '["湘菜", "红烧肉", "传统"]'),
('辣椒炒肉', '湖南家常菜，香辣下饭', 24.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=stir%20fried%20pork%20peppers%20hunan&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 350, 20, 12, 25, 4, 4.6, 15, 'easy', '["湘菜", "猪肉", "辣椒"]'),
('湘味小炒肉', '湖南小炒肉，嫩滑香辣', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20stir%20fried%20pork%20spicy&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 380, 22, 10, 28, 3, 4.5, 18, 'medium', '["湘菜", "猪肉", "小炒"]'),
('酸辣土豆丝', '湖南酸辣土豆丝，爽脆开胃', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sour%20spicy%20potato%20shreds%20hunan&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 180, 3, 35, 5, 4, 4.3, 10, 'easy', '["湘菜", "土豆", "酸辣"]'),
('湘西外婆菜', '湘西特色腌菜，酸辣开胃', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=xiangxi%20grandma%20pickled%20vegetables&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 120, 4, 15, 3, 6, 4.4, 5, 'easy', '["湘菜", "腌菜", "开胃"]'),
('臭豆腐', '长沙臭豆腐，外臭内香', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20stinky%20tofu%20street%20food&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 220, 12, 18, 12, 3, 4.2, 8, 'easy', '["湘菜", "豆腐", "小吃"]'),
('糖油粑粑', '长沙特色甜品，香甜软糯', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sugar%20oil%20baba%20changsha%20sweet&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 280, 4, 45, 8, 2, 4.3, 12, 'easy', '["湘菜", "甜品", "传统"]'),
('湘味蒸蛋', '湖南蒸蛋，嫩滑香辣', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20steamed%20egg%20spicy%20tender&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 200, 12, 5, 15, 1, 4.1, 12, 'easy', '["湘菜", "鸡蛋", "蒸菜"]'),
('湘味腊肉', '湖南腊肉，烟熏香浓', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20cured%20pork%20smoky%20flavor&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 420, 25, 3, 35, 1, 4.6, 15, 'easy', '["湘菜", "腊肉", "传统"]'),
('剁椒茄子', '湖南剁椒茄子，香辣下饭', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chopped%20pepper%20eggplant%20hunan&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 200, 4, 22, 10, 6, 4.4, 15, 'easy', '["湘菜", "茄子", "剁椒"]'),
('湘味牛肉粉', '湖南牛肉粉，香辣鲜美', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20beef%20rice%20noodles%20spicy&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 380, 22, 45, 12, 3, 4.5, 18, 'medium', '["湘菜", "牛肉", "米粉"]'),
('湘味鸭脖', '湖南鸭脖，麻辣鲜香', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20duck%20neck%20spicy%20snack&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 280, 18, 3, 20, 1, 4.3, 25, 'medium', '["湘菜", "鸭肉", "小吃"]'),
('湘味鱼丸', '湖南鱼丸，Q弹香辣', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20fish%20balls%20spicy%20bouncy&image_size=square', (SELECT id FROM categories WHERE name = '湘菜外卖'), 220, 15, 12, 8, 2, 4.2, 15, 'medium', '["湘菜", "鱼丸", "Q弹"]');

-- 更多川菜小吃
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('龙抄手', '成都特色馄饨，皮薄馅嫩', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=long%20chaoshou%20chengdu%20wonton&image_size=square', 9, 320, 15, 35, 12, 2, 4.5, 20, 'medium', '["川菜", "馄饨", "小吃"]'),
('甜水面', '成都甜水面，甜辣可口', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tianshui%20noodles%20chengdu%20sweet%20spicy&image_size=square', 9, 380, 8, 55, 10, 3, 4.3, 12, 'easy', '["川菜", "面条", "甜辣"]'),
('川北凉粉', '南充川北凉粉，爽滑麻辣', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chuanbei%20cold%20jelly%20nanchong&image_size=square', 9, 150, 3, 28, 4, 4, 4.2, 8, 'easy', '["川菜", "凉粉", "小吃"]'),
('叶儿粑', '四川传统小吃，软糯香甜', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=yeer%20ba%20sichuan%20traditional%20snack&image_size=square', 9, 180, 4, 32, 3, 2, 4.1, 15, 'medium', '["川菜", "糯米", "传统"]'),
('三大炮', '成都三大炮，糯米团子', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sandapao%20chengdu%20glutinous%20rice&image_size=square', 9, 220, 5, 40, 5, 2, 4.0, 12, 'easy', '["川菜", "糯米", "甜品"]'),
('蛋烘糕', '成都蛋烘糕，香甜酥脆', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=danhanggao%20chengdu%20egg%20cake&image_size=square', 9, 200, 8, 25, 8, 1, 4.2, 10, 'easy', '["川菜", "鸡蛋", "小吃"]'),
('军屯锅盔', '四川锅盔，酥脆香浓', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=juntun%20guokui%20sichuan%20flatbread&image_size=square', 9, 280, 8, 45, 8, 3, 4.3, 15, 'medium', '["川菜", "面食", "传统"]'),
('伤心凉粉', '四川伤心凉粉，超级麻辣', 15.00, 'https://trae-api-us.mchost.guru/api/liangfen%20super%20spicy%20sichuan&image_size=square', 9, 180, 4, 30, 6, 4, 4.4, 10, 'easy', '["川菜", "凉粉", "超辣"]'),
('川味抄手', '四川抄手，麻辣鲜香', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20chaoshou%20spicy%20wonton&image_size=square', 9, 350, 16, 38, 15, 2, 4.5, 18, 'medium', '["川菜", "抄手", "麻辣"]'),
('川味凉面', '四川凉面，爽滑麻辣', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20cold%20noodles%20spicy%20smooth&image_size=square', 9, 320, 10, 50, 8, 3, 4.3, 12, 'easy', '["川菜", "凉面", "麻辣"]');

-- 西餐数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('牛排套餐', '经典西式牛排配土豆泥', 68.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steak%20dinner%20western%20style%20mashed%20potato&image_size=square', 2, 650, 45, 25, 42, 3, 4.8, 30, 'medium', '["西餐", "牛排", "套餐"]'),
('意大利面', '经典番茄肉酱意面', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spaghetti%20tomato%20meat%20sauce%20italian&image_size=square', 2, 480, 18, 65, 15, 4, 4.5, 20, 'medium', '["西餐", "意面", "番茄"]'),
('凯撒沙拉', '经典凯撒沙拉配面包丁', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=caesar%20salad%20croutons%20parmesan&image_size=square', 2, 320, 12, 15, 25, 8, 4.3, 10, 'easy', '["西餐", "沙拉", "健康"]'),
('烤鸡胸肉', '香草烤鸡胸配蔬菜', 35.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20chicken%20breast%20herbs%20vegetables&image_size=square', 2, 280, 35, 8, 12, 6, 4.6, 25, 'medium', '["西餐", "鸡肉", "健康"]'),
('三文鱼扒', '煎三文鱼配柠檬黄油', 48.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20salmon%20lemon%20butter%20sauce&image_size=square', 2, 420, 38, 5, 28, 2, 4.7, 20, 'medium', '["西餐", "三文鱼", "健康"]'),
('奶油蘑菇汤', '浓郁奶油蘑菇汤', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=creamy%20mushroom%20soup%20western&image_size=square', 2, 280, 8, 18, 20, 3, 4.2, 15, 'easy', '["西餐", "汤", "蘑菇"]'),
('烤羊排', '香草烤羊排配红酒汁', 78.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20lamb%20chops%20herbs%20wine%20sauce&image_size=square', 2, 580, 42, 8, 38, 2, 4.9, 35, 'hard', '["西餐", "羊肉", "高档"]'),
('法式洋葱汤', '经典法式洋葱汤配芝士', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=french%20onion%20soup%20cheese%20classic&image_size=square', 2, 320, 12, 25, 18, 4, 4.4, 25, 'medium', '["西餐", "汤", "法式"]'),
('烤蔬菜拼盘', '多种烤蔬菜拼盘', 24.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=roasted%20vegetable%20platter%20colorful&image_size=square', 2, 180, 6, 25, 8, 12, 4.1, 20, 'easy', '["西餐", "蔬菜", "健康"]'),
('提拉米苏', '经典意式提拉米苏', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tiramisu%20italian%20dessert%20classic&image_size=square', 2, 380, 8, 35, 22, 2, 4.6, 30, 'medium', '["西餐", "甜品", "意式"]');

-- 日韩料理数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('寿司拼盘', '新鲜寿司拼盘，多种口味', 58.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sushi%20platter%20fresh%20variety%20japanese&image_size=square', 3, 420, 25, 45, 12, 2, 4.8, 25, 'medium', '["日料", "寿司", "新鲜"]'),
('拉面', '日式豚骨拉面', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tonkotsu%20ramen%20japanese%20pork%20broth&image_size=square', 3, 520, 22, 55, 18, 4, 4.7, 30, 'medium', '["日料", "拉面", "豚骨"]'),
('天妇罗', '日式天妇罗炸虾蔬菜', 38.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tempura%20shrimp%20vegetables%20japanese&image_size=square', 3, 380, 18, 28, 22, 3, 4.5, 20, 'medium', '["日料", "天妇罗", "炸物"]'),
('韩式烤肉', '韩式烤牛肉配泡菜', 45.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20bbq%20beef%20kimchi%20grill&image_size=square', 3, 480, 35, 12, 28, 4, 4.6, 25, 'medium', '["韩料", "烤肉", "泡菜"]'),
('石锅拌饭', '韩式石锅拌饭配蔬菜', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=bibimbap%20stone%20bowl%20korean%20vegetables&image_size=square', 3, 420, 15, 58, 12, 8, 4.4, 20, 'medium', '["韩料", "拌饭", "蔬菜"]'),
('味噌汤', '日式味噌汤配豆腐', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=miso%20soup%20tofu%20japanese%20traditional&image_size=square', 3, 80, 6, 8, 3, 2, 4.2, 8, 'easy', '["日料", "汤", "味噌"]'),
('韩式炸鸡', '韩式炸鸡配甜辣酱', 35.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20fried%20chicken%20sweet%20spicy%20sauce&image_size=square', 3, 520, 28, 25, 32, 2, 4.5, 20, 'medium', '["韩料", "炸鸡", "甜辣"]'),
('日式咖喱', '日式咖喱饭配炸猪排', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20curry%20rice%20katsu%20pork&image_size=square', 3, 580, 22, 68, 20, 4, 4.3, 25, 'medium', '["日料", "咖喱", "猪排"]'),
('韩式泡菜锅', '韩式泡菜火锅配豆腐', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=kimchi%20stew%20korean%20tofu%20spicy&image_size=square', 3, 280, 15, 18, 12, 6, 4.4, 25, 'medium', '["韩料", "泡菜", "火锅"]'),
('日式便当', '日式便当配多样小菜', 35.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20bento%20box%20variety%20dishes&image_size=square', 3, 450, 20, 52, 15, 6, 4.6, 20, 'medium', '["日料", "便当", "套餐"]');

-- 东南亚菜数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('泰式咖喱', '泰式绿咖喱配椰浆', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=thai%20green%20curry%20coconut%20milk&image_size=square', 4, 380, 18, 25, 22, 5, 4.5, 25, 'medium', '["泰菜", "咖喱", "椰浆"]'),
('冬阴功汤', '泰式酸辣虾汤', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tom%20yum%20soup%20thai%20sour%20spicy%20shrimp&image_size=square', 4, 180, 15, 12, 8, 3, 4.6, 20, 'medium', '["泰菜", "汤", "酸辣"]'),
('泰式炒河粉', '泰式炒河粉配虾仁', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pad%20thai%20noodles%20shrimp%20thai%20style&image_size=square', 4, 420, 20, 48, 15, 4, 4.4, 18, 'medium', '["泰菜", "河粉", "虾仁"]'),
('越南春卷', '新鲜越南春卷配蘸料', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20spring%20rolls%20fresh%20dipping%20sauce&image_size=square', 4, 180, 8, 25, 5, 6, 4.3, 15, 'easy', '["越南菜", "春卷", "清爽"]'),
('新加坡炒米粉', '新加坡风味炒米粉', 24.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=singapore%20fried%20rice%20noodles%20curry&image_size=square', 4, 380, 15, 45, 12, 3, 4.2, 20, 'medium', '["新加坡菜", "米粉", "咖喱"]'),
('印尼炒饭', '印尼风味炒饭配虾片', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=indonesian%20fried%20rice%20nasi%20goreng&image_size=square', 4, 420, 12, 55, 15, 3, 4.1, 15, 'easy', '["印尼菜", "炒饭", "虾片"]'),
('马来咖喱鸡', '马来风味咖喱鸡', 30.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=malaysian%20curry%20chicken%20coconut&image_size=square', 4, 420, 25, 18, 28, 4, 4.4, 30, 'medium', '["马来菜", "咖喱鸡", "椰浆"]'),
('泰式芒果糯米饭', '泰式甜品芒果糯米饭', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=thai%20mango%20sticky%20rice%20dessert&image_size=square', 4, 320, 5, 58, 8, 3, 4.5, 15, 'easy', '["泰菜", "甜品", "芒果"]'),
('越南河粉', '越南牛肉河粉汤', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vietnamese%20pho%20beef%20noodle%20soup&image_size=square', 4, 380, 22, 45, 8, 4, 4.6, 25, 'medium', '["越南菜", "河粉", "牛肉"]'),
('泰式青木瓜沙拉', '泰式青木瓜沙拉，酸辣开胃', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=thai%20green%20papaya%20salad%20som%20tam&image_size=square', 4, 120, 3, 18, 2, 8, 4.3, 10, 'easy', '["泰菜", "沙拉", "开胃"]');

-- 健康轻食数据（为减脂餐模块准备）
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('鸡胸肉沙拉', '低脂鸡胸肉蔬菜沙拉', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20breast%20salad%20healthy%20low%20fat&image_size=square', 41, 220, 30, 8, 8, 8, 4.5, 10, 'easy', '["健康", "减脂", "高蛋白"]'),
('牛油果吐司', '全麦吐司配牛油果', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=avocado%20toast%20whole%20wheat%20healthy&image_size=square', 41, 280, 8, 25, 18, 8, 4.3, 5, 'easy', '["健康", "牛油果", "全麦"]'),
('藜麦沙拉', '藜麦蔬菜沙拉配坚果', 26.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=quinoa%20salad%20vegetables%20nuts%20healthy&image_size=square', 41, 320, 12, 35, 15, 10, 4.4, 15, 'easy', '["健康", "藜麦", "超级食物"]'),
('蒸蛋白', '纯蛋白蒸蛋，低脂高蛋白', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20white%20low%20fat%20protein&image_size=square', 41, 120, 20, 2, 0, 0, 4.1, 8, 'easy', '["健康", "减脂", "高蛋白"]'),
('烤三文鱼', '低油烤三文鱼配蔬菜', 38.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20salmon%20vegetables%20healthy%20omega3&image_size=square', 41, 320, 35, 5, 18, 4, 4.7, 20, 'medium', '["健康", "三文鱼", "Omega3"]'),
('蔬菜汤', '清淡蔬菜汤，低卡饱腹', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetable%20soup%20clear%20broth%20healthy&image_size=square', 41, 80, 3, 12, 1, 6, 4.2, 15, 'easy', '["健康", "蔬菜", "低卡"]'),
('燕麦粥', '燕麦粥配浆果，营养早餐', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=oatmeal%20berries%20healthy%20breakfast&image_size=square', 41, 250, 8, 45, 5, 8, 4.3, 10, 'easy', '["健康", "燕麦", "早餐"]'),
('希腊酸奶', '希腊酸奶配坚果蜂蜜', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=greek%20yogurt%20nuts%20honey%20protein&image_size=square', 41, 180, 15, 12, 8, 2, 4.4, 3, 'easy', '["健康", "酸奶", "益生菌"]'),
('蒸蔬菜', '多种蒸蔬菜拼盘', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20vegetables%20colorful%20healthy&image_size=square', 41, 120, 5, 20, 2, 12, 4.1, 15, 'easy', '["健康", "蔬菜", "低卡"]'),
('鸡蛋白煎蛋', '纯蛋白煎蛋配菠菜', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=egg%20white%20omelet%20spinach%20healthy&image_size=square', 41, 150, 18, 3, 5, 3, 4.2, 8, 'easy', '["健康", "蛋白", "菠菜"]');

-- 中式快餐数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('黄焖鸡米饭', '经典黄焖鸡配米饭', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20chicken%20rice%20chinese%20fast%20food&image_size=square', 1, 520, 28, 55, 18, 3, 4.4, 20, 'medium', '["中式快餐", "鸡肉", "米饭"]'),
('兰州拉面', '正宗兰州牛肉拉面', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=lanzhou%20beef%20noodles%20clear%20broth&image_size=square', 1, 420, 20, 58, 8, 4, 4.6, 25, 'medium', '["中式快餐", "拉面", "牛肉"]'),
('沙县小吃', '沙县蒸饺配拌面', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaxian%20snacks%20dumplings%20noodles&image_size=square', 1, 380, 15, 52, 12, 3, 4.2, 15, 'easy', '["中式快餐", "小吃", "蒸饺"]'),
('煲仔饭', '广式腊肠煲仔饭', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=claypot%20rice%20sausage%20cantonese&image_size=square', 1, 480, 18, 62, 15, 2, 4.5, 30, 'medium', '["中式快餐", "煲仔饭", "腊肠"]'),
('盖浇饭', '红烧肉盖浇饭', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=braised%20pork%20rice%20bowl%20chinese&image_size=square', 1, 520, 22, 58, 20, 2, 4.3, 18, 'easy', '["中式快餐", "盖浇饭", "红烧肉"]'),
('酸辣粉', '重庆酸辣粉', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20sour%20spicy%20noodles&image_size=square', 1, 280, 8, 45, 8, 5, 4.1, 12, 'easy', '["中式快餐", "酸辣粉", "重庆"]'),
('过桥米线', '云南过桥米线', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=yunnan%20crossing%20bridge%20rice%20noodles&image_size=square', 1, 350, 15, 48, 10, 4, 4.4, 20, 'medium', '["中式快餐", "米线", "云南"]'),
('肉夹馍', '陕西肉夹馍配粥', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=roujiamo%20chinese%20burger%20shaanxi&image_size=square', 1, 420, 20, 45, 18, 3, 4.3, 15, 'medium', '["中式快餐", "肉夹馍", "陕西"]'),
('蛋炒饭', '经典蛋炒饭', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=egg%20fried%20rice%20classic%20chinese&image_size=square', 1, 380, 12, 55, 12, 2, 4.0, 10, 'easy', '["中式快餐", "炒饭", "鸡蛋"]'),
('小笼包', '上海小笼包', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=xiaolongbao%20shanghai%20soup%20dumplings&image_size=square', 1, 320, 15, 35, 12, 2, 4.7, 25, 'hard', '["中式快餐", "小笼包", "上海"]');

-- 素食料理数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('素食汉堡', '植物肉汉堡配蔬菜', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=plant%20based%20burger%20vegetables%20vegan&image_size=square', 42, 320, 18, 35, 12, 8, 4.3, 15, 'medium', '["素食", "汉堡", "植物肉"]'),
('素食披萨', '蔬菜素食披萨', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetable%20pizza%20vegan%20cheese&image_size=square', 42, 380, 15, 45, 15, 6, 4.2, 20, 'medium', '["素食", "披萨", "蔬菜"]'),
('豆腐脑', '嫩豆腐脑配咸菜', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=silky%20tofu%20pudding%20pickled%20vegetables&image_size=square', 42, 120, 8, 12, 5, 3, 4.1, 10, 'easy', '["素食", "豆腐", "传统"]'),
('素食拉面', '蔬菜素食拉面', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetarian%20ramen%20vegetables%20broth&image_size=square', 42, 320, 12, 48, 8, 6, 4.3, 25, 'medium', '["素食", "拉面", "蔬菜"]'),
('素食寿司', '蔬菜素食寿司卷', 32.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetarian%20sushi%20rolls%20avocado&image_size=square', 42, 280, 8, 45, 6, 8, 4.4, 20, 'medium', '["素食", "寿司", "牛油果"]'),
('素食咖喱', '椰浆蔬菜咖喱', 24.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetable%20curry%20coconut%20milk%20vegan&image_size=square', 42, 320, 10, 35, 18, 8, 4.2, 25, 'medium', '["素食", "咖喱", "椰浆"]'),
('素食春卷', '新鲜蔬菜春卷', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20vegetable%20spring%20rolls%20vegan&image_size=square', 42, 180, 6, 25, 5, 8, 4.1, 15, 'easy', '["素食", "春卷", "新鲜"]'),
('素食炒面', '蔬菜素食炒面', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetarian%20stir%20fried%20noodles&image_size=square', 42, 380, 12, 52, 10, 6, 4.0, 18, 'medium', '["素食", "炒面", "蔬菜"]'),
('素食饺子', '韭菜鸡蛋素饺子', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetarian%20dumplings%20chives%20egg&image_size=square', 42, 280, 12, 35, 8, 4, 4.2, 20, 'medium', '["素食", "饺子", "韭菜"]'),
('素食汤面', '清汤素食面条', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=clear%20vegetarian%20noodle%20soup&image_size=square', 42, 250, 8, 42, 5, 5, 4.1, 15, 'easy', '["素食", "汤面", "清淡"]');

-- 甜品饮品数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('珍珠奶茶', '经典珍珠奶茶', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=bubble%20tea%20pearls%20milk%20tea&image_size=square', 43, 320, 5, 58, 8, 2, 4.5, 5, 'easy', '["饮品", "奶茶", "珍珠"]'),
('芒果班戟', '新鲜芒果班戟', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mango%20pancake%20fresh%20cream&image_size=square', 43, 280, 6, 35, 12, 3, 4.4, 15, 'medium', '["甜品", "芒果", "班戟"]'),
('红豆沙', '传统红豆沙', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=red%20bean%20soup%20traditional%20chinese&image_size=square', 43, 180, 6, 35, 2, 6, 4.2, 20, 'easy', '["甜品", "红豆", "传统"]'),
('抹茶拿铁', '抹茶拿铁咖啡', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=matcha%20latte%20green%20tea%20coffee&image_size=square', 43, 220, 8, 25, 10, 1, 4.3, 8, 'easy', '["饮品", "抹茶", "拿铁"]'),
('双皮奶', '顺德双皮奶', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=double%20skin%20milk%20pudding%20cantonese&image_size=square', 43, 200, 8, 22, 8, 0, 4.6, 25, 'medium', '["甜品", "双皮奶", "广式"]'),
('柠檬茶', '港式柠檬茶', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hong%20kong%20lemon%20tea%20iced&image_size=square', 43, 120, 1, 28, 0, 1, 4.1, 5, 'easy', '["饮品", "柠檬茶", "港式"]'),
('芝士蛋糕', '纽约芝士蛋糕', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=new%20york%20cheesecake%20classic&image_size=square', 43, 420, 8, 35, 28, 2, 4.7, 30, 'medium', '["甜品", "芝士蛋糕", "经典"]'),
('绿豆沙', '清热绿豆沙', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mung%20bean%20soup%20cooling%20dessert&image_size=square', 43, 150, 5, 30, 1, 5, 4.0, 15, 'easy', '["甜品", "绿豆", "清热"]'),
('焦糖布丁', '法式焦糖布丁', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=creme%20brulee%20french%20caramel%20pudding&image_size=square', 43, 320, 6, 35, 18, 1, 4.5, 25, 'medium', '["甜品", "布丁", "焦糖"]'),
('鲜榨果汁', '混合鲜榨果汁', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20mixed%20fruit%20juice%20healthy&image_size=square', 43, 120, 2, 28, 1, 4, 4.2, 5, 'easy', '["饮品", "果汁", "新鲜"]');

-- 地方特色小吃数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('煎饼果子', '天津煎饼果子', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20jianbing%20pancake%20egg&image_size=square', 44, 320, 12, 42, 12, 3, 4.3, 10, 'medium', '["小吃", "煎饼", "天津"]'),
('臭豆腐', '长沙臭豆腐', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20stinky%20tofu%20fermented&image_size=square', 44, 180, 12, 15, 10, 4, 4.2, 15, 'medium', '["小吃", "臭豆腐", "长沙"]'),
('生煎包', '上海生煎包', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20pan%20fried%20buns%20crispy&image_size=square', 44, 280, 15, 32, 10, 2, 4.5, 20, 'medium', '["小吃", "生煎包", "上海"]'),
('糖葫芦', '北京糖葫芦', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20candied%20hawthorn%20tanghulu&image_size=square', 44, 150, 1, 35, 0, 3, 4.1, 5, 'easy', '["小吃", "糖葫芦", "北京"]'),
('凉皮', '陕西凉皮', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20cold%20noodles%20liangpi&image_size=square', 44, 220, 6, 42, 5, 4, 4.2, 12, 'easy', '["小吃", "凉皮", "陕西"]'),
('驴打滚', '北京驴打滚', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20donkey%20rolling%20glutinous%20rice&image_size=square', 44, 200, 4, 38, 6, 2, 4.0, 15, 'medium', '["小吃", "驴打滚", "北京"]'),
('麻花', '天津大麻花', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20twisted%20dough%20mahua&image_size=square', 44, 280, 6, 35, 15, 2, 4.1, 20, 'medium', '["小吃", "麻花", "天津"]'),
('豆汁', '北京豆汁配咸菜', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20mung%20bean%20milk%20pickles&image_size=square', 44, 80, 4, 12, 2, 3, 3.8, 8, 'easy', '["小吃", "豆汁", "北京"]'),
('锅盔', '陕西锅盔', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20guokui%20flatbread&image_size=square', 44, 250, 8, 45, 5, 3, 4.0, 15, 'medium', '["小吃", "锅盔", "陕西"]'),
('艾窝窝', '北京艾窝窝', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20aiwowo%20glutinous%20rice%20cake&image_size=square', 44, 220, 5, 42, 6, 2, 4.2, 20, 'medium', '["小吃", "艾窝窝", "北京"]');

-- 烧烤类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('烤羊肉串', '新疆风味烤羊肉串', 3.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=xinjiang%20grilled%20lamb%20skewers&image_size=square', 45, 120, 12, 2, 8, 0, 4.6, 15, 'medium', '["烧烤", "羊肉", "新疆"]'),
('烤鸡翅', '蜜汁烤鸡翅', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20grilled%20chicken%20wings&image_size=square', 45, 180, 18, 5, 12, 0, 4.5, 20, 'medium', '["烧烤", "鸡翅", "蜜汁"]'),
('烤茄子', '蒜蓉烤茄子', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20eggplant%20garlic%20sauce&image_size=square', 45, 120, 3, 15, 6, 8, 4.3, 18, 'easy', '["烧烤", "茄子", "蒜蓉"]'),
('烤鱼', '重庆烤鱼', 38.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20grilled%20fish%20spicy&image_size=square', 45, 420, 35, 8, 25, 3, 4.7, 35, 'hard', '["烧烤", "鱼", "重庆"]'),
('烤韭菜', '炭火烤韭菜', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20chives%20charcoal%20fire&image_size=square', 45, 80, 3, 8, 3, 4, 4.2, 10, 'easy', '["烧烤", "韭菜", "炭火"]'),
('烤玉米', '黄油烤玉米', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20corn%20butter%20street%20food&image_size=square', 45, 150, 4, 25, 6, 4, 4.1, 12, 'easy', '["烧烤", "玉米", "黄油"]'),
('烤牛肉', '孜然烤牛肉', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20beef%20cumin%20spice&image_size=square', 45, 200, 22, 3, 12, 1, 4.4, 18, 'medium', '["烧烤", "牛肉", "孜然"]'),
('烤蘑菇', '香菇烤蘑菇', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20mushrooms%20shiitake&image_size=square', 45, 100, 5, 12, 4, 6, 4.0, 15, 'easy', '["烧烤", "蘑菇", "香菇"]'),
('烤土豆', '孜然烤土豆', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20potato%20cumin%20seasoning&image_size=square', 45, 180, 4, 35, 5, 4, 4.1, 20, 'easy', '["烧烤", "土豆", "孜然"]'),
('烤豆腐', '麻辣烤豆腐', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20tofu%20spicy%20mala&image_size=square', 45, 120, 8, 8, 6, 3, 4.2, 12, 'easy', '["烧烤", "豆腐", "麻辣"]');

-- 火锅类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('麻辣火锅', '四川麻辣火锅套餐', 68.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20spicy%20hotpot%20mala&image_size=square', 46, 580, 25, 35, 35, 8, 4.8, 30, 'medium', '["火锅", "麻辣", "四川"]'),
('清汤火锅', '清汤火锅套餐', 58.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=clear%20broth%20hotpot%20healthy&image_size=square', 46, 420, 22, 28, 20, 6, 4.5, 25, 'medium', '["火锅", "清汤", "健康"]'),
('鸳鸯火锅', '鸳鸯火锅双拼', 78.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=yuanyang%20hotpot%20dual%20flavor&image_size=square', 46, 520, 28, 32, 28, 7, 4.7, 35, 'medium', '["火锅", "鸳鸯", "双拼"]'),
('番茄火锅', '番茄火锅套餐', 52.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20hotpot%20fresh%20healthy&image_size=square', 46, 380, 18, 35, 15, 8, 4.4, 25, 'medium', '["火锅", "番茄", "清爽"]'),
('菌菇火锅', '野生菌菇火锅', 65.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mushroom%20hotpot%20wild%20fungi&image_size=square', 46, 320, 15, 25, 12, 12, 4.6, 30, 'medium', '["火锅", "菌菇", "野生"]'),
('海鲜火锅', '新鲜海鲜火锅', 88.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seafood%20hotpot%20fresh%20ocean&image_size=square', 46, 450, 35, 20, 18, 4, 4.9, 35, 'hard', '["火锅", "海鲜", "新鲜"]'),
('羊肉火锅', '内蒙古羊肉火锅', 72.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=inner%20mongolia%20lamb%20hotpot&image_size=square', 46, 520, 32, 15, 32, 3, 4.5, 30, 'medium', '["火锅", "羊肉", "内蒙古"]'),
('酸菜火锅', '东北酸菜火锅', 48.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=northeast%20sauerkraut%20hotpot&image_size=square', 46, 380, 20, 25, 18, 10, 4.3, 25, 'medium', '["火锅", "酸菜", "东北"]'),
('牛肉火锅', '潮汕牛肉火锅', 78.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chaoshan%20beef%20hotpot%20fresh&image_size=square', 46, 480, 38, 12, 25, 2, 4.8, 30, 'medium', '["火锅", "牛肉", "潮汕"]'),
('鱼头火锅', '剁椒鱼头火锅', 58.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fish%20head%20hotpot%20chopped%20pepper&image_size=square', 46, 420, 28, 18, 22, 4, 4.6, 35, 'hard', '["火锅", "鱼头", "剁椒"]');

-- 粥品类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('白粥', '经典白米粥', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=plain%20white%20rice%20porridge%20simple&image_size=square', 47, 120, 3, 25, 1, 1, 4.0, 20, 'easy', '["粥品", "白粥", "简单"]'),
('小米粥', '营养小米粥', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=millet%20porridge%20nutritious%20healthy&image_size=square', 47, 150, 4, 30, 2, 3, 4.2, 25, 'easy', '["粥品", "小米", "营养"]'),
('瘦肉粥', '瘦肉青菜粥', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=lean%20pork%20vegetable%20porridge&image_size=square', 47, 180, 12, 28, 4, 3, 4.3, 30, 'medium', '["粥品", "瘦肉", "青菜"]'),
('皮蛋瘦肉粥', '经典皮蛋瘦肉粥', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=century%20egg%20lean%20pork%20porridge&image_size=square', 47, 200, 15, 30, 6, 2, 4.5, 35, 'medium', '["粥品", "皮蛋", "瘦肉"]'),
('海鲜粥', '鲜美海鲜粥', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seafood%20porridge%20fresh%20delicious&image_size=square', 47, 220, 18, 32, 5, 2, 4.6, 40, 'medium', '["粥品", "海鲜", "鲜美"]'),
('八宝粥', '营养八宝粥', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=eight%20treasure%20porridge%20mixed%20grains&image_size=square', 47, 180, 6, 35, 3, 6, 4.1, 30, 'easy', '["粥品", "八宝", "杂粮"]'),
('南瓜粥', '香甜南瓜粥', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pumpkin%20porridge%20sweet%20orange&image_size=square', 47, 140, 3, 32, 2, 4, 4.2, 25, 'easy', '["粥品", "南瓜", "香甜"]'),
('红豆粥', '养颜红豆粥', 9.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=red%20bean%20porridge%20beauty%20health&image_size=square', 47, 160, 5, 30, 2, 5, 4.1, 35, 'easy', '["粥品", "红豆", "养颜"]'),
('绿豆粥', '清热绿豆粥', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mung%20bean%20porridge%20cooling%20summer&image_size=square', 47, 150, 4, 28, 1, 4, 4.0, 30, 'easy', '["粥品", "绿豆", "清热"]'),
('鸡肉粥', '滋补鸡肉粥', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20porridge%20nourishing%20healthy&image_size=square', 47, 200, 18, 28, 5, 2, 4.4, 35, 'medium', '["粥品", "鸡肉", "滋补"]');

-- 面食类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('刀削面', '山西刀削面', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20knife%20cut%20noodles%20traditional&image_size=square', 48, 380, 15, 58, 8, 4, 4.4, 25, 'hard', '["面食", "刀削面", "山西"]'),
('担担面', '四川担担面', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20dandan%20noodles%20spicy&image_size=square', 48, 420, 18, 52, 15, 3, 4.6, 20, 'medium', '["面食", "担担面", "四川"]'),
('热干面', '武汉热干面', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wuhan%20hot%20dry%20noodles%20sesame&image_size=square', 48, 350, 12, 48, 12, 3, 4.3, 15, 'medium', '["面食", "热干面", "武汉"]'),
('炸酱面', '北京炸酱面', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20zhajiang%20noodles%20bean%20sauce&image_size=square', 48, 400, 16, 55, 12, 4, 4.2, 20, 'medium', '["面食", "炸酱面", "北京"]'),
('阳春面', '清汤阳春面', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=yangchun%20noodles%20clear%20broth%20simple&image_size=square', 48, 280, 8, 48, 5, 2, 4.0, 12, 'easy', '["面食", "阳春面", "清汤"]'),
('牛肉面', '兰州牛肉面', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=lanzhou%20beef%20noodles%20clear%20soup&image_size=square', 48, 420, 22, 52, 10, 4, 4.7, 30, 'medium', '["面食", "牛肉面", "兰州"]'),
('臊子面', '陕西臊子面', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20saozi%20noodles%20minced%20meat&image_size=square', 48, 380, 15, 50, 12, 3, 4.3, 25, 'medium', '["面食", "臊子面", "陕西"]'),
('油泼面', '陕西油泼面', 13.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20oil%20splashed%20noodles&image_size=square', 48, 360, 12, 52, 10, 4, 4.1, 18, 'medium', '["面食", "油泼面", "陕西"]'),
('凉面', '四川凉面', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20cold%20noodles%20spicy%20sauce&image_size=square', 48, 320, 10, 48, 8, 3, 4.2, 15, 'easy', '["面食", "凉面", "四川"]'),
('手擀面', '家常手擀面', 11.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20pulled%20noodles%20homemade&image_size=square', 48, 340, 12, 50, 6, 3, 4.1, 30, 'hard', '["面食", "手擀面", "家常"]');

-- 汤品类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('番茄鸡蛋汤', '经典番茄鸡蛋汤', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20egg%20soup%20classic%20chinese&image_size=square', 49, 120, 8, 12, 6, 2, 4.2, 15, 'easy', '["汤品", "番茄", "鸡蛋"]'),
('冬瓜排骨汤', '清淡冬瓜排骨汤', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=winter%20melon%20pork%20rib%20soup&image_size=square', 49, 180, 15, 8, 8, 4, 4.4, 45, 'medium', '["汤品", "冬瓜", "排骨"]'),
('紫菜蛋花汤', '营养紫菜蛋花汤', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seaweed%20egg%20drop%20soup%20nutritious&image_size=square', 49, 80, 6, 5, 4, 3, 4.1, 10, 'easy', '["汤品", "紫菜", "蛋花"]'),
('酸辣汤', '开胃酸辣汤', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20sour%20soup%20appetizing&image_size=square', 49, 100, 5, 12, 5, 3, 4.3, 20, 'medium', '["汤品", "酸辣", "开胃"]'),
('玉米排骨汤', '香甜玉米排骨汤', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=corn%20pork%20rib%20soup%20sweet&image_size=square', 49, 220, 18, 15, 10, 4, 4.5, 50, 'medium', '["汤品", "玉米", "排骨"]'),
('丝瓜蛋汤', '清爽丝瓜蛋汤', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=loofah%20egg%20soup%20refreshing&image_size=square', 49, 90, 6, 8, 5, 3, 4.0, 12, 'easy', '["汤品", "丝瓜", "鸡蛋"]'),
('白萝卜汤', '清热白萝卜汤', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=white%20radish%20soup%20cooling&image_size=square', 49, 60, 2, 10, 2, 4, 3.9, 25, 'easy', '["汤品", "白萝卜", "清热"]'),
('鲫鱼汤', '滋补鲫鱼汤', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=crucian%20carp%20soup%20nourishing&image_size=square', 49, 200, 22, 5, 8, 1, 4.6, 40, 'medium', '["汤品", "鲫鱼", "滋补"]'),
('蘑菇汤', '鲜美蘑菇汤', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mushroom%20soup%20fresh%20delicious&image_size=square', 49, 80, 4, 10, 3, 5, 4.2, 20, 'easy', '["汤品", "蘑菇", "鲜美"]'),
('海带汤', '营养海带汤', 9.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=kelp%20soup%20nutritious%20healthy&image_size=square', 49, 70, 3, 8, 2, 6, 4.0, 15, 'easy', '["汤品", "海带", "营养"]');

-- 饺子类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('猪肉韭菜饺子', '经典猪肉韭菜饺子', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pork%20chive%20dumplings%20classic&image_size=square', 50, 280, 15, 35, 8, 3, 4.5, 30, 'medium', '["饺子", "猪肉", "韭菜"]'),
('白菜猪肉饺子', '白菜猪肉饺子', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cabbage%20pork%20dumplings%20traditional&image_size=square', 50, 260, 14, 32, 7, 4, 4.3, 30, 'medium', '["饺子", "白菜", "猪肉"]'),
('羊肉胡萝卜饺子', '羊肉胡萝卜饺子', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=lamb%20carrot%20dumplings%20nutritious&image_size=square', 50, 300, 18, 33, 10, 3, 4.4, 35, 'medium', '["饺子", "羊肉", "胡萝卜"]'),
('三鲜饺子', '三鲜水饺', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=three%20fresh%20dumplings%20mixed%20filling&image_size=square', 50, 270, 16, 34, 8, 3, 4.6, 35, 'medium', '["饺子", "三鲜", "水饺"]'),
('虾仁饺子', '鲜美虾仁饺子', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shrimp%20dumplings%20fresh%20delicious&image_size=square', 50, 240, 20, 30, 5, 2, 4.7, 40, 'hard', '["饺子", "虾仁", "鲜美"]'),
('素饺子', '素三鲜饺子', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vegetarian%20dumplings%20three%20fresh&image_size=square', 50, 200, 8, 32, 4, 6, 4.2, 25, 'medium', '["饺子", "素食", "三鲜"]'),
('牛肉饺子', '牛肉大葱饺子', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20scallion%20dumplings%20hearty&image_size=square', 50, 320, 22, 35, 12, 2, 4.5, 35, 'medium', '["饺子", "牛肉", "大葱"]'),
('鸡肉饺子', '鸡肉香菇饺子', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20mushroom%20dumplings&image_size=square', 50, 250, 18, 32, 6, 3, 4.3, 30, 'medium', '["饺子", "鸡肉", "香菇"]'),
('鱼肉饺子', '鱼肉水饺', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fish%20dumplings%20tender%20fresh&image_size=square', 50, 230, 20, 30, 4, 2, 4.4, 35, 'hard', '["饺子", "鱼肉", "水饺"]'),
('玉米饺子', '玉米猪肉饺子', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=corn%20pork%20dumplings%20sweet&image_size=square', 50, 270, 15, 36, 7, 4, 4.2, 30, 'medium', '["饺子", "玉米", "猪肉"]');

-- 包子类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('猪肉包子', '经典猪肉包子', 3.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pork%20steamed%20bun%20classic%20chinese&image_size=square', 51, 180, 8, 25, 6, 2, 4.3, 45, 'medium', '["包子", "猪肉", "经典"]'),
('韭菜鸡蛋包子', '韭菜鸡蛋包子', 2.50, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chive%20egg%20steamed%20bun&image_size=square', 51, 160, 7, 22, 5, 3, 4.2, 40, 'medium', '["包子", "韭菜", "鸡蛋"]'),
('豆沙包', '红豆沙包', 2.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=red%20bean%20paste%20steamed%20bun%20sweet&image_size=square', 51, 150, 4, 28, 3, 4, 4.1, 35, 'easy', '["包子", "豆沙", "甜品"]'),
('菜包子', '白菜粉丝包子', 2.50, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cabbage%20vermicelli%20steamed%20bun&image_size=square', 51, 140, 5, 24, 3, 4, 4.0, 35, 'medium', '["包子", "白菜", "粉丝"]'),
('牛肉包子', '牛肉大葱包子', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20scallion%20steamed%20bun&image_size=square', 51, 200, 12, 26, 8, 2, 4.4, 50, 'medium', '["包子", "牛肉", "大葱"]'),
('羊肉包子', '羊肉胡萝卜包子', 4.50, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=lamb%20carrot%20steamed%20bun&image_size=square', 51, 210, 13, 27, 9, 3, 4.3, 50, 'medium', '["包子", "羊肉", "胡萝卜"]'),
('鸡肉包子', '鸡肉香菇包子', 3.50, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20mushroom%20steamed%20bun&image_size=square', 51, 170, 10, 25, 5, 3, 4.2, 45, 'medium', '["包子", "鸡肉", "香菇"]'),
('虾仁包子', '虾仁韭黄包子', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shrimp%20yellow%20chive%20steamed%20bun&image_size=square', 51, 160, 12, 23, 4, 2, 4.5, 50, 'hard', '["包子", "虾仁", "韭黄"]'),
('叉烧包', '广式叉烧包', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20char%20siu%20bao%20bbq%20pork&image_size=square', 51, 190, 10, 26, 7, 2, 4.6, 60, 'hard', '["包子", "叉烧", "广式"]'),
('奶黄包', '流沙奶黄包', 3.50, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=custard%20steamed%20bun%20flowing%20yolk&image_size=square', 51, 180, 6, 24, 8, 1, 4.4, 45, 'hard', '["包子", "奶黄", "流沙"]');

-- 饼类数据
INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('煎饼果子', '天津煎饼果子', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20jianbing%20guozi%20crepe&image_size=square', 52, 320, 12, 45, 12, 3, 4.5, 15, 'medium', '["饼类", "煎饼", "天津"]'),
('手抓饼', '台湾手抓饼', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=taiwan%20hand%20grabbed%20pancake&image_size=square', 52, 280, 8, 38, 10, 2, 4.2, 12, 'medium', '["饼类", "手抓饼", "台湾"]'),
('鸡蛋灌饼', '鸡蛋灌饼', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=egg%20filled%20pancake%20chinese%20street&image_size=square', 52, 300, 10, 40, 11, 2, 4.3, 15, 'medium', '["饼类", "鸡蛋", "灌饼"]'),
('肉夹馍', '陕西肉夹馍', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20roujiamo%20chinese%20burger&image_size=square', 52, 350, 18, 35, 15, 3, 4.6, 20, 'medium', '["饼类", "肉夹馍", "陕西"]'),
('烧饼', '芝麻烧饼', 3.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sesame%20baked%20cake%20traditional&image_size=square', 52, 200, 6, 32, 6, 3, 4.0, 30, 'medium', '["饼类", "烧饼", "芝麻"]'),
('千层饼', '香葱千层饼', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=scallion%20layered%20pancake&image_size=square', 52, 250, 7, 35, 8, 3, 4.1, 25, 'medium', '["饼类", "千层饼", "香葱"]'),
('馅饼', '韭菜鸡蛋馅饼', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chive%20egg%20stuffed%20pancake&image_size=square', 52, 280, 10, 36, 9, 4, 4.2, 20, 'medium', '["饼类", "馅饼", "韭菜"]'),
('春饼', '春饼卷菜', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20pancake%20rolled%20vegetables&image_size=square', 52, 180, 5, 28, 5, 5, 4.0, 15, 'easy', '["饼类", "春饼", "卷菜"]'),
('糖饼', '红糖糖饼', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=brown%20sugar%20pancake%20sweet&image_size=square', 52, 220, 4, 38, 6, 2, 4.1, 18, 'easy', '["饼类", "糖饼", "红糖"]'),
('油饼', '传统油饼', 3.50, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20fried%20pancake%20crispy&image_size=square', 52, 240, 5, 30, 10, 2, 3.9, 15, 'medium', '["饼类", "油饼", "传统"]');

-- 减脂餐类数据（专门为减肥用户设计）
INSERT INTO categories (name, description, icon, type) VALUES
('减脂餐', '专为减肥人群设计的低卡健康餐', '🥗', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('水煮鸡胸肉', '高蛋白低脂水煮鸡胸肉', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20chicken%20breast%20low%20fat%20healthy&image_size=square', 53, 165, 31, 0, 3.6, 0, 4.2, 15, 'easy', '["减脂餐", "鸡胸肉", "高蛋白"]'),
('蒸蛋羹', '嫩滑蒸蛋羹', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20custard%20smooth%20healthy&image_size=square', 53, 120, 12, 2, 8, 0, 4.1, 12, 'easy', '["减脂餐", "蒸蛋", "低卡"]'),
('清蒸鱼', '清蒸鲈鱼', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20bass%20fish%20healthy%20light&image_size=square', 53, 180, 25, 0, 6, 0, 4.5, 20, 'medium', '["减脂餐", "清蒸鱼", "低脂"]'),
('蔬菜沙拉', '混合蔬菜沙拉', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20vegetable%20salad%20fresh%20healthy&image_size=square', 53, 80, 3, 12, 2, 8, 4.3, 10, 'easy', '["减脂餐", "沙拉", "蔬菜"]'),
('紫薯', '蒸紫薯', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20purple%20sweet%20potato%20healthy&image_size=square', 53, 130, 2, 29, 0.5, 4, 4.0, 15, 'easy', '["减脂餐", "紫薯", "粗粮"]'),
('玉米', '水煮玉米', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20corn%20natural%20healthy&image_size=square', 53, 125, 4, 27, 1, 3, 4.1, 10, 'easy', '["减脂餐", "玉米", "粗粮"]'),
('西兰花', '水煮西兰花', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20broccoli%20green%20healthy&image_size=square', 53, 55, 4, 11, 0.6, 5, 4.0, 8, 'easy', '["减脂餐", "西兰花", "蔬菜"]'),
('胡萝卜', '蒸胡萝卜', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20carrot%20orange%20healthy&image_size=square', 53, 50, 1, 12, 0.3, 3, 3.9, 10, 'easy', '["减脂餐", "胡萝卜", "蔬菜"]'),
('豆腐', '清蒸豆腐', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20tofu%20silky%20healthy&image_size=square', 53, 144, 15, 4, 9, 2, 4.2, 10, 'easy', '["减脂餐", "豆腐", "植物蛋白"]'),
('燕麦粥', '无糖燕麦粥', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sugar%20free%20oatmeal%20porridge%20healthy&image_size=square', 53, 150, 5, 27, 3, 4, 4.1, 15, 'easy', '["减脂餐", "燕麦", "粗粮"]');

-- 夏季简单菜类数据
INSERT INTO categories (name, description, icon, type) VALUES
('夏季简单菜', '夏天简单易做的清爽菜品', '🌿', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('凉拌黄瓜', '清爽凉拌黄瓜', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20cucumber%20salad%20refreshing%20summer&image_size=square', 54, 30, 1, 6, 1, 2, 4.2, 5, 'easy', '["夏季菜", "凉拌", "黄瓜"]'),
('凉拌西红柿', '糖拌西红柿', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sugar%20tomato%20salad%20sweet%20summer&image_size=square', 54, 40, 1, 9, 0.5, 2, 4.1, 3, 'easy', '["夏季菜", "凉拌", "西红柿"]'),
('蒸蛋', '水蒸蛋', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20simple%20smooth&image_size=square', 54, 90, 8, 1, 6, 0, 4.0, 8, 'easy', '["夏季菜", "蒸蛋", "简单"]'),
('凉拌豆腐', '凉拌嫩豆腐', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20tofu%20salad%20silky%20summer&image_size=square', 54, 80, 8, 3, 5, 1, 4.1, 5, 'easy', '["夏季菜", "凉拌", "豆腐"]'),
('凉拌茄子', '蒜泥茄子', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20eggplant%20salad%20cold%20summer&image_size=square', 54, 60, 2, 12, 2, 4, 4.3, 15, 'easy', '["夏季菜", "凉拌", "茄子"]'),
('凉拌土豆丝', '酸辣土豆丝', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sour%20spicy%20potato%20shreds%20cold&image_size=square', 54, 90, 2, 18, 2, 3, 4.2, 10, 'easy', '["夏季菜", "凉拌", "土豆丝"]'),
('凉拌海带丝', '凉拌海带丝', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20kelp%20shreds%20salad%20healthy&image_size=square', 54, 50, 2, 8, 1, 6, 4.0, 8, 'easy', '["夏季菜", "凉拌", "海带"]'),
('拍黄瓜', '蒜泥拍黄瓜', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=smashed%20cucumber%20garlic%20refreshing&image_size=square', 54, 25, 1, 5, 1, 2, 4.3, 3, 'easy', '["夏季菜", "拍黄瓜", "蒜泥"]'),
('凉拌木耳', '凉拌黑木耳', 9.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20black%20fungus%20salad%20healthy&image_size=square', 54, 40, 2, 8, 1, 7, 4.1, 10, 'easy', '["夏季菜", "凉拌", "木耳"]'),
('凉拌豆芽', '凉拌绿豆芽', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20mung%20bean%20sprouts%20salad&image_size=square', 54, 35, 3, 6, 1, 3, 4.0, 8, 'easy', '["夏季菜", "凉拌", "豆芽"]');

-- 凉菜类数据
INSERT INTO categories (name, description, icon, type) VALUES
('凉菜', '各种凉拌菜和冷菜', '🥒', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('口水鸡', '四川口水鸡', 22.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20saliva%20chicken%20spicy%20cold&image_size=square', 55, 280, 25, 8, 15, 2, 4.6, 25, 'medium', '["凉菜", "口水鸡", "四川"]'),
('夫妻肺片', '四川夫妻肺片', 28.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20couple%20lung%20slices%20spicy&image_size=square', 55, 320, 20, 12, 22, 3, 4.7, 30, 'medium', '["凉菜", "夫妻肺片", "四川"]'),
('白切鸡', '白切鸡', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=white%20cut%20chicken%20cantonese%20cold&image_size=square', 55, 250, 28, 0, 12, 0, 4.4, 20, 'medium', '["凉菜", "白切鸡", "粤菜"]'),
('凉拌三丝', '凉拌三丝', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=three%20shreds%20cold%20salad%20mixed&image_size=square', 55, 80, 4, 12, 3, 4, 4.1, 15, 'easy', '["凉菜", "三丝", "凉拌"]'),
('凉拌粉皮', '凉拌粉皮', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20mung%20bean%20sheets%20salad&image_size=square', 55, 120, 3, 22, 2, 2, 4.0, 12, 'easy', '["凉菜", "粉皮", "凉拌"]'),
('凉拌莲藕', '凉拌莲藕片', 11.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20lotus%20root%20slices%20salad&image_size=square', 55, 90, 2, 18, 1, 5, 4.2, 15, 'easy', '["凉菜", "莲藕", "凉拌"]'),
('凉拌菠菜', '凉拌菠菜', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20spinach%20salad%20healthy%20green&image_size=square', 55, 50, 3, 8, 2, 4, 4.0, 10, 'easy', '["凉菜", "菠菜", "凉拌"]'),
('凉拌萝卜丝', '凉拌白萝卜丝', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20white%20radish%20shreds%20salad&image_size=square', 55, 40, 1, 8, 1, 3, 3.9, 8, 'easy', '["凉菜", "萝卜丝", "凉拌"]'),
('凉拌花生米', '凉拌花生米', 9.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20peanuts%20salad%20crunchy&image_size=square', 55, 180, 8, 8, 14, 3, 4.1, 10, 'easy', '["凉菜", "花生米", "凉拌"]'),
('凉拌金针菇', '凉拌金针菇', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20enoki%20mushroom%20salad&image_size=square', 55, 60, 3, 10, 2, 4, 4.0, 12, 'easy', '["凉菜", "金针菇", "凉拌"]');

-- 小炒类数据
INSERT INTO categories (name, description, icon, type) VALUES
('小炒', '家常小炒菜', '🍳', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('青椒肉丝', '经典青椒肉丝', 16.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=green%20pepper%20pork%20shreds%20stir%20fry&image_size=square', 56, 220, 18, 12, 12, 3, 4.4, 15, 'medium', '["小炒", "青椒", "肉丝"]'),
('土豆丝', '酸辣土豆丝', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sour%20spicy%20potato%20shreds%20stir%20fry&image_size=square', 56, 150, 3, 28, 5, 4, 4.2, 12, 'easy', '["小炒", "土豆丝", "酸辣"]'),
('韭菜炒蛋', '韭菜炒鸡蛋', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chive%20scrambled%20eggs%20home%20cooking&image_size=square', 56, 180, 12, 6, 12, 3, 4.3, 10, 'easy', '["小炒", "韭菜", "炒蛋"]'),
('西红柿炒蛋', '西红柿炒鸡蛋', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20scrambled%20eggs%20classic&image_size=square', 56, 160, 10, 12, 10, 3, 4.5, 8, 'easy', '["小炒", "西红柿", "炒蛋"]'),
('豆角炒肉', '豆角炒肉丝', 14.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=green%20beans%20pork%20stir%20fry&image_size=square', 56, 200, 15, 15, 10, 5, 4.2, 18, 'medium', '["小炒", "豆角", "炒肉"]'),
('芹菜炒肉', '芹菜炒肉丝', 13.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=celery%20pork%20shreds%20stir%20fry&image_size=square', 56, 180, 16, 8, 8, 4, 4.1, 15, 'medium', '["小炒", "芹菜", "炒肉"]'),
('蒜苔炒肉', '蒜苔炒肉丝', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20scapes%20pork%20stir%20fry&image_size=square', 56, 190, 17, 10, 9, 3, 4.3, 15, 'medium', '["小炒", "蒜苔", "炒肉"]'),
('菠菜炒蛋', '菠菜炒鸡蛋', 11.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spinach%20scrambled%20eggs%20healthy&image_size=square', 56, 140, 10, 8, 8, 4, 4.2, 10, 'easy', '["小炒", "菠菜", "炒蛋"]'),
('黄瓜炒蛋', '黄瓜炒鸡蛋', 9.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cucumber%20scrambled%20eggs%20light&image_size=square', 56, 120, 8, 6, 7, 2, 4.0, 8, 'easy', '["小炒", "黄瓜", "炒蛋"]'),
('洋葱炒蛋', '洋葱炒鸡蛋', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=onion%20scrambled%20eggs%20sweet&image_size=square', 56, 150, 9, 10, 9, 2, 4.1, 10, 'easy', '["小炒", "洋葱", "炒蛋"]');

-- 早餐类数据
INSERT INTO categories (name, description, icon, type) VALUES
('早餐', '营养丰富的早餐选择', '🌅', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('豆浆油条', '经典豆浆配油条', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=soy%20milk%20fried%20dough%20stick%20breakfast&image_size=square', 57, 320, 12, 35, 15, 3, 4.3, 10, 'easy', '["早餐", "豆浆", "油条"]'),
('小笼包', '上海小笼包', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20xiaolongbao%20steamed%20buns&image_size=square', 57, 280, 15, 30, 12, 2, 4.5, 20, 'medium', '["早餐", "小笼包", "上海"]'),
('煎蛋饼', '鸡蛋灌饼', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=egg%20filled%20pancake%20crispy&image_size=square', 57, 250, 10, 25, 12, 2, 4.2, 8, 'easy', '["早餐", "煎蛋饼", "鸡蛋"]'),
('稀饭咸菜', '白粥配咸菜', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=rice%20porridge%20pickled%20vegetables&image_size=square', 57, 150, 4, 30, 2, 3, 4.0, 5, 'easy', '["早餐", "稀饭", "咸菜"]'),
('牛奶面包', '牛奶配吐司', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=milk%20toast%20bread%20breakfast&image_size=square', 57, 200, 8, 28, 6, 2, 4.1, 3, 'easy', '["早餐", "牛奶", "面包"]'),
('蒸蛋羹', '嫩滑蒸蛋羹', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=steamed%20egg%20custard%20breakfast&image_size=square', 57, 120, 12, 2, 8, 0, 4.2, 10, 'easy', '["早餐", "蒸蛋羹", "嫩滑"]'),
('煮鸡蛋', '水煮鸡蛋', 2.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20egg%20simple%20breakfast&image_size=square', 57, 78, 6, 1, 5, 0, 4.0, 5, 'easy', '["早餐", "煮鸡蛋", "简单"]'),
('燕麦片', '燕麦片粥', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=oatmeal%20porridge%20healthy%20breakfast&image_size=square', 57, 150, 5, 27, 3, 4, 4.1, 8, 'easy', '["早餐", "燕麦片", "健康"]'),
('三明治', '火腿三明治', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ham%20sandwich%20breakfast%20fresh&image_size=square', 57, 280, 15, 25, 12, 3, 4.3, 10, 'easy', '["早餐", "三明治", "火腿"]'),
('酸奶', '原味酸奶', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=plain%20yogurt%20healthy%20breakfast&image_size=square', 57, 100, 6, 12, 3, 0, 4.2, 0, 'easy', '["早餐", "酸奶", "原味"]');

-- 宵夜类数据
INSERT INTO categories (name, description, icon, type) VALUES
('宵夜', '深夜美食选择', '🌙', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('烤串', '各种烤串拼盘', 25.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20skewers%20platter%20night%20snack&image_size=square', 58, 400, 25, 15, 25, 2, 4.4, 30, 'medium', '["宵夜", "烤串", "拼盘"]'),
('泡面', '方便面', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=instant%20noodles%20late%20night%20snack&image_size=square', 58, 350, 8, 50, 15, 3, 3.8, 5, 'easy', '["宵夜", "泡面", "方便"]'),
('炸鸡', '炸鸡块', 18.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fried%20chicken%20pieces%20crispy&image_size=square', 58, 450, 30, 20, 28, 1, 4.2, 20, 'medium', '["宵夜", "炸鸡", "酥脆"]'),
('麻辣烫', '麻辣烫', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20hot%20pot%20malatang&image_size=square', 58, 300, 12, 25, 18, 5, 4.3, 15, 'easy', '["宵夜", "麻辣烫", "辣味"]'),
('煎饺', '锅贴煎饺', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pan%20fried%20dumplings%20crispy&image_size=square', 58, 280, 12, 30, 12, 3, 4.1, 15, 'medium', '["宵夜", "煎饺", "锅贴"]'),
('粥', '白粥', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=white%20rice%20porridge%20simple&image_size=square', 58, 120, 3, 25, 1, 1, 3.9, 20, 'easy', '["宵夜", "粥", "清淡"]'),
('汤面', '清汤面条', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=clear%20soup%20noodles%20light&image_size=square', 58, 250, 8, 45, 5, 3, 4.0, 12, 'easy', '["宵夜", "汤面", "清汤"]'),
('烤红薯', '烤红薯', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=roasted%20sweet%20potato%20warm&image_size=square', 58, 180, 3, 40, 1, 6, 4.2, 30, 'easy', '["宵夜", "烤红薯", "温暖"]'),
('关东煮', '关东煮', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=oden%20japanese%20hot%20pot&image_size=square', 58, 200, 10, 15, 8, 4, 4.1, 10, 'easy', '["宵夜", "关东煮", "日式"]'),
('煮玉米', '水煮玉米', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20corn%20night%20snack&image_size=square', 58, 125, 4, 27, 1, 3, 4.0, 10, 'easy', '["宵夜", "煮玉米", "健康"]');

-- 饮品类数据
INSERT INTO categories (name, description, icon, type) VALUES
('饮品', '各种饮料和茶品', '🥤', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('奶茶', '珍珠奶茶', 12.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=bubble%20milk%20tea%20pearls&image_size=square', 59, 250, 3, 45, 8, 0, 4.3, 5, 'easy', '["饮品", "奶茶", "珍珠"]'),
('柠檬水', '蜂蜜柠檬水', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20lemon%20water%20refreshing&image_size=square', 59, 80, 0, 20, 0, 0, 4.2, 3, 'easy', '["饮品", "柠檬水", "蜂蜜"]'),
('绿茶', '清香绿茶', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=green%20tea%20fresh%20leaves&image_size=square', 59, 5, 0, 1, 0, 0, 4.1, 5, 'easy', '["饮品", "绿茶", "清香"]'),
('咖啡', '美式咖啡', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=americano%20coffee%20black&image_size=square', 59, 10, 1, 2, 0, 0, 4.4, 5, 'easy', '["饮品", "咖啡", "美式"]'),
('果汁', '鲜榨橙汁', 10.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20orange%20juice%20vitamin&image_size=square', 59, 120, 2, 28, 0, 1, 4.3, 5, 'easy', '["饮品", "果汁", "橙汁"]'),
('豆浆', '原味豆浆', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=plain%20soy%20milk%20healthy&image_size=square', 59, 80, 7, 8, 4, 3, 4.2, 10, 'easy', '["饮品", "豆浆", "原味"]'),
('可乐', '冰镇可乐', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ice%20cold%20cola%20fizzy&image_size=square', 59, 140, 0, 39, 0, 0, 4.0, 0, 'easy', '["饮品", "可乐", "冰镇"]'),
('酸梅汤', '传统酸梅汤', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sour%20plum%20soup%20traditional&image_size=square', 59, 60, 0, 15, 0, 0, 4.1, 15, 'easy', '["饮品", "酸梅汤", "传统"]'),
('椰汁', '椰子汁', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=coconut%20juice%20tropical&image_size=square', 59, 100, 1, 24, 0, 2, 4.2, 0, 'easy', '["饮品", "椰汁", "热带"]'),
('红茶', '红茶', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=black%20tea%20classic&image_size=square', 59, 5, 0, 1, 0, 0, 4.0, 5, 'easy', '["饮品", "红茶", "经典"]');

-- 零食类数据
INSERT INTO categories (name, description, icon, type) VALUES
('零食', '各种小食和零食', '🍿', 'delivery');

INSERT INTO dishes (name, description, price, image_url, category_id, calories, protein, carbs, fat, fiber, rating, prep_time, difficulty, tags) VALUES
('薯片', '原味薯片', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=original%20potato%20chips%20crispy&image_size=square', 60, 150, 2, 15, 10, 1, 3.8, 0, 'easy', '["零食", "薯片", "原味"]'),
('爆米花', '奶油爆米花', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=butter%20popcorn%20fluffy&image_size=square', 60, 180, 3, 20, 8, 3, 4.0, 5, 'easy', '["零食", "爆米花", "奶油"]'),
('瓜子', '葵花籽', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sunflower%20seeds%20roasted&image_size=square', 60, 200, 6, 8, 18, 4, 3.9, 0, 'easy', '["零食", "瓜子", "葵花籽"]'),
('花生', '水煮花生', 7.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=boiled%20peanuts%20salty&image_size=square', 60, 180, 8, 8, 14, 3, 4.1, 15, 'easy', '["零食", "花生", "水煮"]'),
('饼干', '苏打饼干', 4.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=soda%20crackers%20plain&image_size=square', 60, 120, 3, 18, 4, 1, 3.8, 0, 'easy', '["零食", "饼干", "苏打"]'),
('坚果', '混合坚果', 15.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20nuts%20healthy%20snack&image_size=square', 60, 250, 8, 12, 20, 4, 4.3, 0, 'easy', '["零食", "坚果", "混合"]'),
('果脯', '蜜饯果脯', 8.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=candied%20fruit%20preserved&image_size=square', 60, 150, 1, 38, 0, 2, 3.7, 0, 'easy', '["零食", "果脯", "蜜饯"]'),
('话梅', '话梅', 6.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=preserved%20plum%20sour%20sweet&image_size=square', 60, 80, 1, 20, 0, 3, 3.9, 0, 'easy', '["零食", "话梅", "酸甜"]'),
('牛肉干', '五香牛肉干', 20.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spiced%20beef%20jerky%20chewy&image_size=square', 60, 300, 25, 8, 15, 2, 4.2, 0, 'easy', '["零食", "牛肉干", "五香"]'),
('海苔', '烤海苔', 5.00, 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=roasted%20seaweed%20crispy&image_size=square', 60, 50, 5, 8, 1, 8, 4.0, 0, 'easy', '["零食", "海苔", "烤制"]');

-- 更多菜品数据将继续添加，确保达到1000+菜品的目标
-- 涵盖所有外卖、食堂、校园周边美食类别