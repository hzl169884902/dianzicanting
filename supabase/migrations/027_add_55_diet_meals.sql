-- 027_add_55_diet_meals.sql
-- 添加55个新的减脂餐菜品，达到1000个菜品目标
-- 作者：AI助手
-- 日期：2025-01-21

-- 插入55个新的减脂餐菜品
INSERT INTO dishes (name, description, category, price, image_url, nutrition_facts, ingredients, cooking_instructions, prep_time, cook_time, servings, difficulty, tags, created_at, updated_at) VALUES

-- 早餐减脂餐系列 (15个)
('燕麦蓝莓杯', '低糖燕麦配新鲜蓝莓，富含膳食纤维和抗氧化物', '减脂餐', 18.00, 'https://trae-api.mchost.guru/text_to_image?text=燕麦蓝莓杯早餐减脂餐', '{"calories": 180, "protein": 6, "carbs": 35, "fat": 3, "fiber": 8}', '燕麦片,蓝莓,低脂牛奶,蜂蜜', '1. 燕麦片用热水冲泡\n2. 加入蓝莓和牛奶\n3. 滴入少量蜂蜜调味', 5, 0, 1, 'easy', 'breakfast,diet,fiber', NOW(), NOW()),

('蛋白质煎饼', '高蛋白低碳水煎饼，适合减脂期早餐', '减脂餐', 22.00, 'https://trae-api.mchost.guru/text_to_image?text=蛋白质煎饼减脂早餐', '{"calories": 220, "protein": 25, "carbs": 15, "fat": 8, "fiber": 3}', '蛋白粉,鸡蛋,燕麦粉,香草精', '1. 混合所有干料\n2. 加入鸡蛋搅拌\n3. 平底锅小火煎制', 10, 8, 1, 'easy', 'breakfast,protein,diet', NOW(), NOW()),

('绿色蔬菜汁', '菠菜芹菜苹果混合蔬菜汁，排毒养颜', '减脂餐', 16.00, 'https://trae-api.mchost.guru/text_to_image?text=绿色蔬菜汁减脂饮品', '{"calories": 85, "protein": 3, "carbs": 18, "fat": 0.5, "fiber": 4}', '菠菜,芹菜,苹果,柠檬汁', '1. 蔬菜洗净切段\n2. 苹果去核切块\n3. 榨汁机榨汁过滤', 8, 0, 1, 'easy', 'breakfast,detox,vegetable', NOW(), NOW()),

('奇亚籽布丁', '奇亚籽椰浆布丁，富含Omega-3脂肪酸', '减脂餐', 20.00, 'https://trae-api.mchost.guru/text_to_image?text=奇亚籽布丁减脂甜品', '{"calories": 160, "protein": 5, "carbs": 12, "fat": 10, "fiber": 12}', '奇亚籽,椰浆,香草精,枫糖浆', '1. 奇亚籽浸泡椰浆\n2. 加入调料搅拌\n3. 冷藏4小时成型', 10, 0, 2, 'easy', 'breakfast,omega3,pudding', NOW(), NOW()),

('蛋白质能量球', '坚果燕麦蛋白球，便携营养小食', '减脂餐', 24.00, 'https://trae-api.mchost.guru/text_to_image?text=蛋白质能量球减脂零食', '{"calories": 140, "protein": 8, "carbs": 12, "fat": 7, "fiber": 3}', '燕麦,杏仁,蛋白粉,椰子油', '1. 坚果打碎混合\n2. 加入蛋白粉\n3. 搓成小球冷藏', 15, 0, 6, 'easy', 'snack,protein,energy', NOW(), NOW()),

('菠菜蛋白卷', '菠菜蛋皮卷配低脂奶酪', '减脂餐', 19.00, 'https://trae-api.mchost.guru/text_to_image?text=菠菜蛋白卷减脂早餐', '{"calories": 195, "protein": 18, "carbs": 8, "fat": 10, "fiber": 2}', '鸡蛋,菠菜,低脂奶酪,黑胡椒', '1. 鸡蛋摊成蛋皮\n2. 菠菜焯水切碎\n3. 卷入奶酪成卷', 12, 5, 1, 'medium', 'breakfast,protein,vegetable', NOW(), NOW()),

('椰子燕麦粥', '椰浆燕麦粥配坚果碎', '减脂餐', 17.00, 'https://trae-api.mchost.guru/text_to_image?text=椰子燕麦粥减脂早餐', '{"calories": 210, "protein": 6, "carbs": 28, "fat": 8, "fiber": 6}', '燕麦,椰浆,核桃,肉桂粉', '1. 燕麦煮粥\n2. 加入椰浆\n3. 撒上坚果碎', 5, 10, 1, 'easy', 'breakfast,coconut,oats', NOW(), NOW()),

('蛋白质司康饼', '低糖高蛋白司康饼', '减脂餐', 21.00, 'https://trae-api.mchost.guru/text_to_image?text=蛋白质司康饼减脂烘焙', '{"calories": 185, "protein": 15, "carbs": 18, "fat": 6, "fiber": 4}', '杏仁粉,蛋白粉,鸡蛋,泡打粉', '1. 混合干料\n2. 加入湿料揉团\n3. 烤箱烘烤20分钟', 15, 20, 4, 'medium', 'breakfast,baking,protein', NOW(), NOW()),

('绿茶燕麦饼干', '抹茶燕麦无糖饼干', '减脂餐', 23.00, 'https://trae-api.mchost.guru/text_to_image?text=绿茶燕麦饼干减脂零食', '{"calories": 120, "protein": 4, "carbs": 16, "fat": 4, "fiber": 3}', '燕麦粉,抹茶粉,椰子油,甜菊糖', '1. 混合所有材料\n2. 压成饼干形状\n3. 烤箱烘烤15分钟', 20, 15, 8, 'easy', 'snack,matcha,cookie', NOW(), NOW()),

('蛋白质马芬', '蓝莓蛋白质马芬蛋糕', '减脂餐', 25.00, 'https://trae-api.mchost.guru/text_to_image?text=蛋白质马芬减脂蛋糕', '{"calories": 165, "protein": 12, "carbs": 20, "fat": 5, "fiber": 3}', '杏仁粉,蛋白粉,蓝莓,鸡蛋', '1. 混合干湿料\n2. 加入蓝莓\n3. 马芬杯烘烤25分钟', 15, 25, 6, 'medium', 'breakfast,muffin,blueberry', NOW(), NOW()),

('坚果酸奶杯', '希腊酸奶配混合坚果', '减脂餐', 18.00, 'https://trae-api.mchost.guru/text_to_image?text=坚果酸奶杯减脂早餐', '{"calories": 190, "protein": 15, "carbs": 12, "fat": 10, "fiber": 2}', '希腊酸奶,核桃,杏仁,蜂蜜', '1. 酸奶装杯\n2. 撒上坚果\n3. 淋少量蜂蜜', 5, 0, 1, 'easy', 'breakfast,yogurt,nuts', NOW(), NOW()),

('蛋白质吐司', '全麦面包配鳄梨蛋白质', '减脂餐', 26.00, 'https://trae-api.mchost.guru/text_to_image?text=蛋白质吐司减脂早餐', '{"calories": 245, "protein": 18, "carbs": 22, "fat": 12, "fiber": 8}', '全麦面包,鳄梨,水煮蛋,黑胡椒', '1. 面包烤制\n2. 鳄梨压泥\n3. 配水煮蛋片', 10, 5, 1, 'easy', 'breakfast,avocado,toast', NOW(), NOW()),

('蔬菜蛋白饼', '西葫芦胡萝卜蛋白饼', '减脂餐', 20.00, 'https://trae-api.mchost.guru/text_to_image?text=蔬菜蛋白饼减脂早餐', '{"calories": 155, "protein": 12, "carbs": 15, "fat": 6, "fiber": 4}', '西葫芦,胡萝卜,鸡蛋,燕麦粉', '1. 蔬菜刨丝\n2. 混合蛋液\n3. 平底锅煎制', 15, 10, 2, 'medium', 'breakfast,vegetable,pancake', NOW(), NOW()),

('蛋白质奶昔', '香草蛋白质奶昔', '减脂餐', 22.00, 'https://trae-api.mchost.guru/text_to_image?text=蛋白质奶昔减脂饮品', '{"calories": 180, "protein": 25, "carbs": 8, "fat": 5, "fiber": 1}', '蛋白粉,杏仁奶,香草精,冰块', '1. 所有材料入搅拌机\n2. 高速搅拌1分钟\n3. 倒入杯中即可', 5, 0, 1, 'easy', 'breakfast,shake,protein', NOW(), NOW()),

('燕麦能量棒', '坚果燕麦能量棒', '减脂餐', 19.00, 'https://trae-api.mchost.guru/text_to_image?text=燕麦能量棒减脂零食', '{"calories": 175, "protein": 7, "carbs": 22, "fat": 7, "fiber": 5}', '燕麦,杏仁,椰枣,椰子油', '1. 椰枣打成泥\n2. 混合所有材料\n3. 压实切条冷藏', 20, 0, 8, 'easy', 'snack,energy,oats', NOW(), NOW()),

-- 午餐减脂餐系列 (20个)
('藜麦蔬菜沙拉', '彩虹蔬菜藜麦沙拉配柠檬汁', '减脂餐', 28.00, 'https://trae-api.mchost.guru/text_to_image?text=藜麦蔬菜沙拉减脂午餐', '{"calories": 285, "protein": 12, "carbs": 45, "fat": 8, "fiber": 8}', '藜麦,彩椒,黄瓜,番茄,柠檬汁', '1. 藜麦煮熟晾凉\n2. 蔬菜切丁\n3. 拌匀调味', 15, 15, 2, 'easy', 'lunch,quinoa,salad', NOW(), NOW()),

('鸡胸肉蔬菜卷', '烤鸡胸肉配蔬菜卷饼', '减脂餐', 32.00, 'https://trae-api.mchost.guru/text_to_image?text=鸡胸肉蔬菜卷减脂午餐', '{"calories": 320, "protein": 35, "carbs": 25, "fat": 10, "fiber": 5}', '鸡胸肉,全麦饼皮,生菜,番茄', '1. 鸡胸肉腌制烤制\n2. 蔬菜洗净切丝\n3. 卷入饼皮', 20, 25, 1, 'medium', 'lunch,chicken,wrap', NOW(), NOW()),

('三文鱼牛油果碗', '烤三文鱼配牛油果糙米饭', '减脂餐', 38.00, 'https://trae-api.mchost.guru/text_to_image?text=三文鱼牛油果碗减脂午餐', '{"calories": 420, "protein": 28, "carbs": 35, "fat": 18, "fiber": 8}', '三文鱼,牛油果,糙米,海苔', '1. 三文鱼烤制\n2. 糙米煮熟\n3. 牛油果切片摆盘', 15, 20, 1, 'medium', 'lunch,salmon,avocado', NOW(), NOW()),

('豆腐蔬菜汤', '丝瓜豆腐清汤', '减脂餐', 24.00, 'https://trae-api.mchost.guru/text_to_image?text=豆腐蔬菜汤减脂午餐', '{"calories": 145, "protein": 12, "carbs": 8, "fat": 8, "fiber": 3}', '嫩豆腐,丝瓜,香菇,生姜', '1. 豆腐切块\n2. 丝瓜去皮切段\n3. 清水煮汤调味', 10, 15, 2, 'easy', 'lunch,tofu,soup', NOW(), NOW()),

('鸡蛋蔬菜炒饭', '彩蔬鸡蛋糙米炒饭', '减脂餐', 26.00, 'https://trae-api.mchost.guru/text_to_image?text=鸡蛋蔬菜炒饭减脂午餐', '{"calories": 295, "protein": 15, "carbs": 42, "fat": 8, "fiber": 4}', '糙米饭,鸡蛋,胡萝卜,豌豆', '1. 糙米饭晾凉\n2. 蔬菜切丁\n3. 热锅炒制', 10, 12, 2, 'easy', 'lunch,fried rice,egg', NOW(), NOW()),

('虾仁蔬菜面', '全麦面条配虾仁蔬菜', '减脂餐', 30.00, 'https://trae-api.mchost.guru/text_to_image?text=虾仁蔬菜面减脂午餐', '{"calories": 315, "protein": 22, "carbs": 45, "fat": 6, "fiber": 6}', '全麦面条,虾仁,西兰花,胡萝卜', '1. 面条煮熟\n2. 虾仁炒制\n3. 蔬菜焯水拌面', 15, 12, 1, 'medium', 'lunch,shrimp,noodles', NOW(), NOW()),

('牛肉蔬菜汤', '瘦牛肉萝卜汤', '减脂餐', 34.00, 'https://trae-api.mchost.guru/text_to_image?text=牛肉蔬菜汤减脂午餐', '{"calories": 265, "protein": 28, "carbs": 15, "fat": 10, "fiber": 4}', '瘦牛肉,白萝卜,胡萝卜,香菜', '1. 牛肉切块焯水\n2. 萝卜切块\n3. 炖煮1小时', 20, 60, 3, 'medium', 'lunch,beef,soup', NOW(), NOW()),

('蒸蛋羹', '虾仁蒸蛋羹', '减脂餐', 22.00, 'https://trae-api.mchost.guru/text_to_image?text=虾仁蒸蛋羹减脂午餐', '{"calories": 165, "protein": 18, "carbs": 3, "fat": 8, "fiber": 0}', '鸡蛋,虾仁,温水,香葱', '1. 鸡蛋打散\n2. 加温水搅匀\n3. 蒸制15分钟', 10, 15, 2, 'easy', 'lunch,steamed egg,shrimp', NOW(), NOW()),

('蔬菜咖喱', '低脂椰浆蔬菜咖喱', '减脂餐', 27.00, 'https://trae-api.mchost.guru/text_to_image?text=蔬菜咖喱减脂午餐', '{"calories": 195, "protein": 8, "carbs": 28, "fat": 6, "fiber": 8}', '土豆,胡萝卜,洋葱,咖喱粉', '1. 蔬菜切块\n2. 爆炒洋葱\n3. 加咖喱粉炖煮', 15, 25, 2, 'medium', 'lunch,curry,vegetable', NOW(), NOW()),

('鸡肉蔬菜粥', '瘦鸡肉青菜粥', '减脂餐', 25.00, 'https://trae-api.mchost.guru/text_to_image?text=鸡肉蔬菜粥减脂午餐', '{"calories": 220, "protein": 20, "carbs": 28, "fat": 4, "fiber": 2}', '鸡胸肉,大米,青菜,生姜', '1. 鸡肉切丝腌制\n2. 大米煮粥\n3. 加入鸡肉青菜', 15, 30, 2, 'easy', 'lunch,chicken,porridge', NOW(), NOW()),

('金枪鱼沙拉', '金枪鱼蔬菜沙拉', '减脂餐', 29.00, 'https://trae-api.mchost.guru/text_to_image?text=金枪鱼沙拉减脂午餐', '{"calories": 245, "protein": 25, "carbs": 12, "fat": 12, "fiber": 4}', '金枪鱼罐头,生菜,番茄,橄榄油', '1. 金枪鱼沥油\n2. 蔬菜洗净切块\n3. 拌匀调味', 10, 0, 1, 'easy', 'lunch,tuna,salad', NOW(), NOW()),

('蒸蔬菜', '五彩蒸蔬菜', '减脂餐', 20.00, 'https://trae-api.mchost.guru/text_to_image?text=五彩蒸蔬菜减脂午餐', '{"calories": 125, "protein": 5, "carbs": 25, "fat": 2, "fiber": 8}', '西兰花,胡萝卜,玉米,豌豆', '1. 蔬菜洗净切块\n2. 蒸锅蒸制\n3. 调味即可', 10, 15, 2, 'easy', 'lunch,steamed,vegetable', NOW(), NOW()),

('鸡蛋灌饼', '全麦鸡蛋灌饼', '减脂餐', 23.00, 'https://trae-api.mchost.guru/text_to_image?text=全麦鸡蛋灌饼减脂午餐', '{"calories": 275, "protein": 16, "carbs": 32, "fat": 10, "fiber": 5}', '全麦面粉,鸡蛋,韭菜,香油', '1. 面粉和面\n2. 擀成薄饼\n3. 灌入蛋液煎制', 25, 10, 1, 'medium', 'lunch,pancake,egg', NOW(), NOW()),

('蔬菜寿司', '黄瓜牛油果寿司', '减脂餐', 31.00, 'https://trae-api.mchost.guru/text_to_image?text=蔬菜寿司减脂午餐', '{"calories": 185, "protein": 6, "carbs": 35, "fat": 4, "fiber": 6}', '寿司米,海苔,黄瓜,牛油果', '1. 寿司米调味\n2. 海苔铺米\n3. 卷入蔬菜切段', 30, 0, 6, 'hard', 'lunch,sushi,vegetable', NOW(), NOW()),

('豆浆面条', '豆浆汤面', '减脂餐', 21.00, 'https://trae-api.mchost.guru/text_to_image?text=豆浆面条减脂午餐', '{"calories": 235, "protein": 15, "carbs": 35, "fat": 5, "fiber": 3}', '面条,豆浆,青菜,榨菜', '1. 面条煮熟\n2. 豆浆加热\n3. 浇面配菜', 10, 8, 1, 'easy', 'lunch,soy milk,noodles', NOW(), NOW()),

('蔬菜包子', '韭菜鸡蛋包子', '减脂餐', 24.00, 'https://trae-api.mchost.guru/text_to_image?text=蔬菜包子减脂午餐', '{"calories": 195, "protein": 10, "carbs": 28, "fat": 6, "fiber": 3}', '全麦面粉,韭菜,鸡蛋,香油', '1. 面粉发酵\n2. 调制馅料\n3. 包制蒸熟', 60, 20, 4, 'hard', 'lunch,bun,vegetable', NOW(), NOW()),

('蛋花汤', '番茄蛋花汤', '减脂餐', 18.00, 'https://trae-api.mchost.guru/text_to_image?text=番茄蛋花汤减脂午餐', '{"calories": 95, "protein": 8, "carbs": 8, "fat": 4, "fiber": 2}', '番茄,鸡蛋,香葱,胡椒粉', '1. 番茄炒出汁\n2. 加水煮开\n3. 淋入蛋液', 8, 10, 2, 'easy', 'lunch,tomato,egg soup', NOW(), NOW()),

('蔬菜春卷', '生菜虾仁春卷', '减脂餐', 26.00, 'https://trae-api.mchost.guru/text_to_image?text=蔬菜春卷减脂午餐', '{"calories": 155, "protein": 12, "carbs": 18, "fat": 5, "fiber": 4}', '春卷皮,生菜,虾仁,胡萝卜丝', '1. 虾仁煮熟\n2. 蔬菜洗净\n3. 卷制春卷', 20, 5, 4, 'medium', 'lunch,spring roll,shrimp', NOW(), NOW()),

('蒸蛋饺', '韭菜蒸蛋饺', '减脂餐', 28.00, 'https://trae-api.mchost.guru/text_to_image?text=韭菜蒸蛋饺减脂午餐', '{"calories": 215, "protein": 12, "carbs": 25, "fat": 8, "fiber": 3}', '饺子皮,韭菜,鸡蛋,虾仁', '1. 调制馅料\n2. 包制饺子\n3. 蒸制15分钟', 30, 15, 6, 'medium', 'lunch,dumpling,steamed', NOW(), NOW()),

('蔬菜炒河粉', '豆芽韭黄炒河粉', '减脂餐', 25.00, 'https://trae-api.mchost.guru/text_to_image?text=蔬菜炒河粉减脂午餐', '{"calories": 285, "protein": 8, "carbs": 52, "fat": 6, "fiber": 4}', '河粉,豆芽,韭黄,生抽', '1. 河粉过水软化\n2. 蔬菜洗净\n3. 大火炒制', 10, 8, 2, 'easy', 'lunch,rice noodles,vegetable', NOW(), NOW()),

-- 晚餐减脂餐系列 (20个)
('蒸蛋白', '纯蛋白蒸蛋', '减脂餐', 16.00, 'https://trae-api.mchost.guru/text_to_image?text=蒸蛋白减脂晚餐', '{"calories": 85, "protein": 18, "carbs": 1, "fat": 0, "fiber": 0}', '蛋白,温水,盐,香葱', '1. 蛋白打散\n2. 加温水调匀\n3. 蒸制12分钟', 5, 12, 1, 'easy', 'dinner,egg white,steamed', NOW(), NOW()),

('蔬菜清汤', '冬瓜海带汤', '减脂餐', 14.00, 'https://trae-api.mchost.guru/text_to_image?text=冬瓜海带汤减脂晚餐', '{"calories": 45, "protein": 3, "carbs": 8, "fat": 0.5, "fiber": 3}', '冬瓜,海带,生姜,盐', '1. 冬瓜去皮切块\n2. 海带泡发\n3. 清水煮汤', 10, 20, 3, 'easy', 'dinner,winter melon,soup', NOW(), NOW()),

('蒸鸡胸肉', '柠檬蒸鸡胸肉', '减脂餐', 28.00, 'https://trae-api.mchost.guru/text_to_image?text=柠檬蒸鸡胸肉减脂晚餐', '{"calories": 185, "protein": 35, "carbs": 2, "fat": 4, "fiber": 0}', '鸡胸肉,柠檬,迷迭香,黑胡椒', '1. 鸡胸肉腌制\n2. 柠檬片铺底\n3. 蒸制20分钟', 15, 20, 1, 'easy', 'dinner,chicken breast,steamed', NOW(), NOW()),

('蔬菜沙拉', '混合绿叶蔬菜沙拉', '减脂餐', 22.00, 'https://trae-api.mchost.guru/text_to_image?text=混合蔬菜沙拉减脂晚餐', '{"calories": 95, "protein": 4, "carbs": 12, "fat": 4, "fiber": 6}', '生菜,菠菜,番茄,橄榄油', '1. 蔬菜洗净撕片\n2. 番茄切块\n3. 淋橄榄油拌匀', 10, 0, 2, 'easy', 'dinner,salad,greens', NOW(), NOW()),

('蒸蔬菜拼盘', '彩色蒸蔬菜', '减脂餐', 20.00, 'https://trae-api.mchost.guru/text_to_image?text=彩色蒸蔬菜减脂晚餐', '{"calories": 115, "protein": 5, "carbs": 22, "fat": 1, "fiber": 8}', '西兰花,胡萝卜,南瓜,玉米', '1. 蔬菜洗净切块\n2. 分层摆盘\n3. 蒸制15分钟', 15, 15, 2, 'easy', 'dinner,steamed vegetables,colorful', NOW(), NOW()),

('白灼虾', '白灼基围虾', '减脂餐', 35.00, 'https://trae-api.mchost.guru/text_to_image?text=白灼基围虾减脂晚餐', '{"calories": 125, "protein": 25, "carbs": 2, "fat": 2, "fiber": 0}', '基围虾,生姜,料酒,生抽', '1. 虾洗净去线\n2. 水开下虾\n3. 煮3分钟捞起', 10, 5, 2, 'easy', 'dinner,shrimp,boiled', NOW(), NOW()),

('蒸蛋羹', '水蒸蛋', '减脂餐', 15.00, 'https://trae-api.mchost.guru/text_to_image?text=水蒸蛋减脂晚餐', '{"calories": 155, "protein": 14, "carbs": 2, "fat": 10, "fiber": 0}', '鸡蛋,温水,盐,香油', '1. 鸡蛋打散\n2. 加温水搅匀\n3. 蒸制15分钟', 5, 15, 1, 'easy', 'dinner,steamed egg,simple', NOW(), NOW()),

('蔬菜汤', '丝瓜蛋花汤', '减脂餐', 18.00, 'https://trae-api.mchost.guru/text_to_image?text=丝瓜蛋花汤减脂晚餐', '{"calories": 85, "protein": 6, "carbs": 8, "fat": 4, "fiber": 2}', '丝瓜,鸡蛋,生姜,香葱', '1. 丝瓜去皮切段\n2. 水开下丝瓜\n3. 淋入蛋液', 8, 10, 2, 'easy', 'dinner,loofah,egg soup', NOW(), NOW()),

('凉拌黄瓜', '蒜泥黄瓜', '减脂餐', 12.00, 'https://trae-api.mchost.guru/text_to_image?text=蒜泥黄瓜减脂晚餐', '{"calories": 35, "protein": 2, "carbs": 6, "fat": 1, "fiber": 2}', '黄瓜,大蒜,醋,香油', '1. 黄瓜拍碎\n2. 蒜泥调味\n3. 腌制10分钟', 10, 0, 2, 'easy', 'dinner,cucumber,cold dish', NOW(), NOW()),

('蒸豆腐', '嫩豆腐蒸蛋', '减脂餐', 19.00, 'https://trae-api.mchost.guru/text_to_image?text=嫩豆腐蒸蛋减脂晚餐', '{"calories": 135, "protein": 12, "carbs": 5, "fat": 8, "fiber": 1}', '嫩豆腐,鸡蛋,香葱,生抽', '1. 豆腐切块\n2. 蛋液调味\n3. 蒸制12分钟', 8, 12, 2, 'easy', 'dinner,tofu,steamed egg', NOW(), NOW()),

('白菜汤', '大白菜豆腐汤', '减脂餐', 16.00, 'https://trae-api.mchost.guru/text_to_image?text=大白菜豆腐汤减脂晚餐', '{"calories": 75, "protein": 6, "carbs": 8, "fat": 3, "fiber": 3}', '大白菜,豆腐,香菇,盐', '1. 白菜洗净切段\n2. 豆腐切块\n3. 清水煮汤', 10, 15, 3, 'easy', 'dinner,cabbage,tofu soup', NOW(), NOW()),

('蒸茄子', '蒜蓉蒸茄子', '减脂餐', 17.00, 'https://trae-api.mchost.guru/text_to_image?text=蒜蓉蒸茄子减脂晚餐', '{"calories": 65, "protein": 3, "carbs": 12, "fat": 2, "fiber": 5}', '茄子,大蒜,生抽,香油', '1. 茄子切条\n2. 蒜蓉调味\n3. 蒸制15分钟', 10, 15, 2, 'easy', 'dinner,eggplant,steamed', NOW(), NOW()),

('凉拌萝卜丝', '白萝卜丝', '减脂餐', 13.00, 'https://trae-api.mchost.guru/text_to_image?text=凉拌萝卜丝减脂晚餐', '{"calories": 25, "protein": 1, "carbs": 5, "fat": 0.5, "fiber": 2}', '白萝卜,醋,盐,香菜', '1. 萝卜刨丝\n2. 盐腌出水\n3. 调味拌匀', 15, 0, 2, 'easy', 'dinner,radish,cold dish', NOW(), NOW()),

('蒸南瓜', '蜂蜜蒸南瓜', '减脂餐', 15.00, 'https://trae-api.mchost.guru/text_to_image?text=蜂蜜蒸南瓜减脂晚餐', '{"calories": 95, "protein": 2, "carbs": 22, "fat": 0.5, "fiber": 3}', '南瓜,蜂蜜,枸杞', '1. 南瓜去皮切块\n2. 摆盘蒸制\n3. 淋蜂蜜装饰', 10, 20, 2, 'easy', 'dinner,pumpkin,steamed', NOW(), NOW()),

('紫菜蛋花汤', '紫菜蛋花汤', '减脂餐', 14.00, 'https://trae-api.mchost.guru/text_to_image?text=紫菜蛋花汤减脂晚餐', '{"calories": 65, "protein": 6, "carbs": 4, "fat": 3, "fiber": 1}', '紫菜,鸡蛋,香葱,胡椒粉', '1. 紫菜泡发\n2. 水开下紫菜\n3. 淋入蛋液', 5, 8, 2, 'easy', 'dinner,seaweed,egg soup', NOW(), NOW()),

('蒸蛋白布丁', '香草蛋白布丁', '减脂餐', 21.00, 'https://trae-api.mchost.guru/text_to_image?text=香草蛋白布丁减脂晚餐', '{"calories": 95, "protein": 15, "carbs": 8, "fat": 1, "fiber": 0}', '蛋白,牛奶,香草精,甜菊糖', '1. 蛋白打发\n2. 加入调料\n3. 蒸制20分钟', 15, 20, 2, 'medium', 'dinner,egg white,pudding', NOW(), NOW()),

('凉拌海带丝', '醋拌海带丝', '减脂餐', 16.00, 'https://trae-api.mchost.guru/text_to_image?text=醋拌海带丝减脂晚餐', '{"calories": 45, "protein": 3, "carbs": 8, "fat": 1, "fiber": 4}', '海带丝,醋,蒜泥,香油', '1. 海带丝焯水\n2. 调制料汁\n3. 拌匀腌制', 10, 3, 2, 'easy', 'dinner,kelp,cold dish', NOW(), NOW()),

('蒸蛋羹', '虾皮蒸蛋羹', '减脂餐', 18.00, 'https://trae-api.mchost.guru/text_to_image?text=虾皮蒸蛋羹减脂晚餐', '{"calories": 125, "protein": 14, "carbs": 3, "fat": 6, "fiber": 0}', '鸡蛋,虾皮,温水,香葱', '1. 鸡蛋打散\n2. 加虾皮温水\n3. 蒸制15分钟', 8, 15, 2, 'easy', 'dinner,dried shrimp,steamed egg', NOW(), NOW()),

('蔬菜汤', '菠菜豆腐汤', '减脂餐', 17.00, 'https://trae-api.mchost.guru/text_to_image?text=菠菜豆腐汤减脂晚餐', '{"calories": 85, "protein": 8, "carbs": 6, "fat": 4, "fiber": 3}', '菠菜,豆腐,香菇,盐', '1. 菠菜洗净切段\n2. 豆腐切块\n3. 清水煮汤', 8, 12, 2, 'easy', 'dinner,spinach,tofu soup', NOW(), NOW()),

('蒸蔬菜', '蒸胡萝卜丝', '减脂餐', 13.00, 'https://trae-api.mchost.guru/text_to_image?text=蒸胡萝卜丝减脂晚餐', '{"calories": 55, "protein": 2, "carbs": 12, "fat": 0.5, "fiber": 4}', '胡萝卜,盐,香油,香菜', '1. 胡萝卜刨丝\n2. 调味拌匀\n3. 蒸制10分钟', 10, 10, 2, 'easy', 'dinner,carrot,steamed', NOW(), NOW());

-- 输出统计信息
SELECT 
    '添加完成' as status,
    COUNT(*) as total_dishes,
    COUNT(DISTINCT name) as unique_dish_names,
    COUNT(*) - COUNT(DISTINCT name) as duplicate_count
FROM dishes;

-- 检查减脂餐数量
SELECT 
    category,
    COUNT(*) as dish_count
FROM dishes 
WHERE category = '减脂餐'
GROUP BY category;