-- 创建品牌表
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    brand_type VARCHAR(50),
    founded_year INTEGER,
    origin_location VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- 创建品牌数据访问策略
CREATE POLICY "Allow public read access to brands" ON brands
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert brands" ON brands
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update brands" ON brands
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 插入品牌数据（去重后的完整列表）
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website) VALUES
-- 知名连锁品牌
('麦当劳', '全球知名快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=McDonalds%20logo%20golden%20arches%20red%20yellow&image_size=square', 'fast_food', 1955, '美国', 'https://www.mcdonalds.com.cn'),
('肯德基', '炸鸡快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20logo%20colonel%20sanders%20red%20white&image_size=square', 'fast_food', 1952, '美国', 'https://www.kfc.com.cn'),
('海底捞', '知名火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Haidilao%20hotpot%20logo%20red%20chinese&image_size=square', 'hotpot', 1994, '四川', 'https://www.haidilao.com'),
('星巴克', '咖啡连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20logo%20green%20mermaid%20coffee&image_size=square', 'cafe', 1971, '美国', 'https://www.starbucks.com.cn'),
('必胜客', '披萨连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20Hut%20logo%20red%20hat%20pizza&image_size=square', 'western', 1958, '美国', 'https://www.pizzahut.com.cn'),
('棒约翰', '披萨连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Papa%20Johns%20pizza%20logo%20red%20green&image_size=square', 'western', 1984, '美国', 'https://www.papajohns.com.cn'),

-- 中式连锁品牌
('真功夫', '中式快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Kungfu%20chinese%20fast%20food%20logo&image_size=square', 'chinese', 1990, '广东', 'https://www.zkungfu.com'),
('老乡鸡', '中式快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Laoxiangji%20chicken%20logo%20chinese&image_size=square', 'chinese', 2003, '安徽', 'https://www.laoxiangji.com'),
('袁记云饺', '饺子连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Yuanji%20dumpling%20logo%20chinese&image_size=square', 'chinese', 1993, '上海', 'https://www.yuanji.com'),
('胖哥俩肉蟹煲', '肉蟹煲连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Panggeliang%20crab%20pot%20logo&image_size=square', 'chinese', 2005, '上海', 'https://www.panggeliang.com'),

-- 火锅品牌
('小肥羊', '内蒙古火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Little%20Sheep%20hotpot%20logo%20mongolian&image_size=square', 'hotpot', 1999, '内蒙古', 'https://www.xiaofeiyang.com'),
('小龙坎', '重庆火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaolongkan%20hotpot%20logo%20chongqing&image_size=square', 'hotpot', 2014, '重庆', 'https://www.xiaolongkan.com'),
('大龙燚', '成都火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dalongyi%20hotpot%20logo%20dragon&image_size=square', 'hotpot', 2013, '成都', 'https://www.dalongyi.com'),

-- 茶饮品牌
('喜茶', '新式茶饮连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Heytea%20logo%20modern%20tea%20brand&image_size=square', 'beverage', 2012, '广东', 'https://www.heytea.com'),
('奈雪的茶', '新式茶饮连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nayuki%20tea%20logo%20pink%20modern&image_size=square', 'beverage', 2015, '深圳', 'https://www.nayuki.com'),
('一点点', '台式茶饮连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Yidiandian%20bubble%20tea%20logo&image_size=square', 'beverage', 1994, '台湾', 'https://www.yidiandian.com'),

-- 烘焙甜品品牌
('85度C', '台式烘焙连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=85%20Degrees%20C%20bakery%20logo&image_size=square', 'dessert', 2003, '台湾', 'https://www.85cafe.com'),
('面包新语', '新加坡烘焙连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=BreadTalk%20bakery%20logo&image_size=square', 'dessert', 2000, '新加坡', 'https://www.breadtalk.com.cn'),

-- 地方特色品牌
('狗不理', '天津包子老字号', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Goubuli%20baozi%20logo%20tianjin&image_size=square', 'chinese', 1858, '天津', 'https://www.goubuli.com'),
('全聚德', '北京烤鸭老字号', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Quanjude%20roast%20duck%20logo%20beijing&image_size=square', 'chinese', 1864, '北京', 'https://www.quanjude.com'),
('鼎泰丰', '台湾小笼包连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Din%20Tai%20Fung%20xiaolongbao%20logo&image_size=square', 'chinese', 1958, '台湾', 'https://www.dintaifung.com.cn'),

-- 国际品牌
('赛百味', '美式潜艇堡连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Subway%20sandwich%20logo%20green%20yellow&image_size=square', 'western', 1965, '美国', 'https://www.subway.com.cn'),
('温迪汉堡', '美式汉堡连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Wendys%20burger%20logo%20red%20pigtails&image_size=square', 'western', 1969, '美国', 'https://www.wendys.com.cn'),
('邓肯甜甜圈', '美式甜甜圈连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dunkin%20Donuts%20logo%20orange%20pink&image_size=square', 'dessert', 1950, '美国', 'https://www.dunkindonuts.com.cn');

-- 为dishes表添加brand_id字段
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS brand_id UUID REFERENCES brands(id);

-- 为新增品牌添加对应菜品数据
INSERT INTO dishes (name, description, image_url, category_id, nutrition_facts, brand_id) VALUES
-- 海底捞菜品
('招牌肉蟹煲', '海底捞招牌菜品，新鲜肉蟹配特制汤底', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Haidilao%20signature%20crab%20pot%20hotpot&image_size=square', (SELECT id FROM categories WHERE name = '火锅' LIMIT 1), '{"calories": 450, "protein": 25, "carbs": 15, "fat": 30}', (SELECT id FROM brands WHERE name = '海底捞' LIMIT 1)),
('麻辣牛肉', '精选牛肉片，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20beef%20slices%20hotpot&image_size=square', (SELECT id FROM categories WHERE name = '火锅' LIMIT 1), '{"calories": 320, "protein": 28, "carbs": 5, "fat": 20}', (SELECT id FROM brands WHERE name = '海底捞' LIMIT 1)),
('手工拉面', '现场制作手工拉面', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20noodles%20hotpot&image_size=square', (SELECT id FROM categories WHERE name = '火锅' LIMIT 1), '{"calories": 280, "protein": 12, "carbs": 55, "fat": 3}', (SELECT id FROM brands WHERE name = '海底捞' LIMIT 1)),
('虾滑', '新鲜虾肉制作的虾滑', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=shrimp%20paste%20balls%20hotpot&image_size=square', (SELECT id FROM categories WHERE name = '火锅' LIMIT 1), '{"calories": 180, "protein": 20, "carbs": 8, "fat": 8}', (SELECT id FROM brands WHERE name = '海底捞' LIMIT 1)),
('毛肚', '新鲜毛肚，爽脆可口', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20tripe%20hotpot&image_size=square', (SELECT id FROM categories WHERE name = '火锅' LIMIT 1), '{"calories": 150, "protein": 18, "carbs": 2, "fat": 8}', (SELECT id FROM brands WHERE name = '海底捞' LIMIT 1)),

-- 麦当劳菜品
('巨无霸', '麦当劳经典汉堡', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Big%20Mac%20burger%20McDonalds&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 550, "protein": 25, "carbs": 45, "fat": 33}', (SELECT id FROM brands WHERE name = '麦当劳' LIMIT 1)),
('薯条', '金黄酥脆薯条', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=McDonalds%20french%20fries&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 320, "protein": 4, "carbs": 43, "fat": 15}', (SELECT id FROM brands WHERE name = '麦当劳' LIMIT 1)),
('麦乐鸡', '酥脆鸡块', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=McDonalds%20chicken%20nuggets&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 270, "protein": 15, "carbs": 16, "fat": 17}', (SELECT id FROM brands WHERE name = '麦当劳' LIMIT 1)),
('板烧鸡腿堡', '嫩滑鸡腿肉汉堡', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grilled%20chicken%20burger%20McDonalds&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 410, "protein": 28, "carbs": 42, "fat": 16}', (SELECT id FROM brands WHERE name = '麦当劳' LIMIT 1)),
('苹果派', '热腾腾苹果派', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=McDonalds%20apple%20pie&image_size=square', (SELECT id FROM categories WHERE name = '甜品' LIMIT 1), '{"calories": 230, "protein": 2, "carbs": 32, "fat": 11}', (SELECT id FROM brands WHERE name = '麦当劳' LIMIT 1)),

-- 肯德基菜品
('原味鸡', '肯德基招牌炸鸡', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20original%20fried%20chicken&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 320, "protein": 22, "carbs": 8, "fat": 22}', (SELECT id FROM brands WHERE name = '肯德基' LIMIT 1)),
('辣翅', '香辣鸡翅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20spicy%20chicken%20wings&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 180, "protein": 12, "carbs": 6, "fat": 12}', (SELECT id FROM brands WHERE name = '肯德基' LIMIT 1)),
('汉堡', '经典鸡肉汉堡', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20chicken%20burger&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 450, "protein": 20, "carbs": 40, "fat": 25}', (SELECT id FROM brands WHERE name = '肯德基' LIMIT 1)),
('薯条', '金黄薯条', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20french%20fries&image_size=square', (SELECT id FROM categories WHERE name = '快餐' LIMIT 1), '{"calories": 310, "protein": 4, "carbs": 41, "fat": 14}', (SELECT id FROM brands WHERE name = '肯德基' LIMIT 1)),
('蛋挞', '港式蛋挞', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20egg%20tart&image_size=square', (SELECT id FROM categories WHERE name = '甜品' LIMIT 1), '{"calories": 200, "protein": 4, "carbs": 22, "fat": 11}', (SELECT id FROM brands WHERE name = '肯德基' LIMIT 1)),

-- 袁记云饺菜品
('冬菇马蹄鲜肉饺', '袁记招牌饺子，冬菇马蹄鲜肉馅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mushroom%20water%20chestnut%20pork%20dumplings&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 280, "protein": 15, "carbs": 35, "fat": 10}', (SELECT id FROM brands WHERE name = '袁记云饺' LIMIT 1)),
('冬菇鸡肉饺', '冬菇鸡肉馅饺子，营养丰富', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mushroom%20chicken%20dumplings&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 260, "protein": 18, "carbs": 32, "fat": 8}', (SELECT id FROM brands WHERE name = '袁记云饺' LIMIT 1)),
('紫菜鲜肉云吞', '紫菜鲜肉馅云吞，汤鲜味美', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seaweed%20pork%20wonton&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 220, "protein": 12, "carbs": 28, "fat": 8}', (SELECT id FROM brands WHERE name = '袁记云饺' LIMIT 1)),

-- 胖哥俩肉蟹煲菜品
('招牌肉蟹煲', '胖哥俩招牌菜，肉蟹配特制酱料', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=signature%20crab%20pot%20spicy&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 520, "protein": 30, "carbs": 20, "fat": 35}', (SELECT id FROM brands WHERE name = '胖哥俩肉蟹煲' LIMIT 1)),
('牛蛙煲', '新鲜牛蛙，麻辣鲜香', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=spicy%20bullfrog%20pot&image_size=square', (SELECT id FROM categories WHERE name = '中餐' LIMIT 1), '{"calories": 380, "protein": 28, "carbs": 15, "fat": 25}', (SELECT id FROM brands WHERE name = '胖哥俩肉蟹煲' LIMIT 1));

-- 授予权限
GRANT SELECT ON brands TO anon;
GRANT ALL PRIVILEGES ON brands TO authenticated;
GRANT SELECT ON dishes TO anon;
GRANT ALL PRIVILEGES ON dishes TO authenticated;
