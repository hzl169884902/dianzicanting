-- 安全添加品牌数据，避免重复插入
-- 使用 ON CONFLICT DO NOTHING 来处理重复的品牌名称

-- 国际连锁品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('麦当劳', '全球知名快餐连锁品牌，以汉堡、薯条、鸡块等快餐食品闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=McDonald%27s%20golden%20arches%20logo%20red%20background%20fast%20food%20restaurant&image_size=square', '快餐', 1940, '美国', 'https://www.mcdonalds.com'),
('肯德基', '以炸鸡为主打的国际快餐连锁品牌，拥有独特的11种香料配方', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20Colonel%20Sanders%20logo%20red%20white%20fried%20chicken%20restaurant&image_size=square', '快餐', 1930, '美国', 'https://www.kfc.com'),
('必胜客', '全球最大的比萨连锁餐厅品牌，提供各种口味的比萨和意式美食', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20Hut%20red%20roof%20logo%20pizza%20restaurant%20Italian%20food&image_size=square', '西餐', 1958, '美国', 'https://www.pizzahut.com'),
('星巴克', '全球知名咖啡连锁品牌，提供高品质咖啡和轻食', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20green%20mermaid%20logo%20coffee%20shop%20cafe&image_size=square', '咖啡', 1971, '美国', 'https://www.starbucks.com'),
('汉堡王', '以火烤汉堡为特色的国际快餐连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Burger%20King%20crown%20logo%20flame%20grilled%20burger%20restaurant&image_size=square', '快餐', 1954, '美国', 'https://www.burgerking.com'),
('德克士', '中国本土西式快餐连锁品牌，以炸鸡汉堡为主', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dicos%20chicken%20burger%20Chinese%20fast%20food%20restaurant%20logo&image_size=square', '快餐', 1996, '中国', 'https://www.dicos.com.cn'),
('真功夫', '中式快餐连锁品牌，主打蒸品和煲仔饭', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zhen%20Kung%20Fu%20Chinese%20fast%20food%20steamed%20rice%20restaurant&image_size=square', '中式快餐', 1990, '中国', 'https://www.zkungfu.com'),
('永和大王', '24小时中式快餐连锁，以豆浆油条和粥品闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Yonghe%20King%20Chinese%20breakfast%20soy%20milk%20fried%20dough%20restaurant&image_size=square', '中式快餐', 1995, '中国台湾', 'https://www.yonghe.com.cn')
ON CONFLICT (name) DO NOTHING;

-- 校园食堂品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('海南大学第一食堂', '海南大学主要食堂，提供多样化餐饮', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20University%20First%20Canteen%20student%20dining%20hall&image_size=square', '校园食堂', 1958, '中国海南', 'https://www.hainanu.edu.cn'),
('海南大学第二食堂', '海南大学学生餐厅，经济实惠', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20University%20Second%20Canteen%20affordable%20student%20meals&image_size=square', '校园食堂', 1960, '中国海南', 'https://www.hainanu.edu.cn'),
('海南大学清真食堂', '海南大学清真餐厅，服务少数民族学生', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20University%20Halal%20Canteen%20Muslim%20student%20dining&image_size=square', '校园食堂', 1965, '中国海南', 'https://www.hainanu.edu.cn'),
('海南大学教工餐厅', '海南大学教职工专用餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20University%20Faculty%20Restaurant%20staff%20dining&image_size=square', '校园食堂', 1970, '中国海南', 'https://www.hainanu.edu.cn'),
('海南大学夜宵档', '海南大学夜间小食摊位', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20University%20Night%20Snack%20Stall%20late%20night%20food&image_size=square', '校园小吃', 1980, '中国海南', 'https://www.hainanu.edu.cn')
ON CONFLICT (name) DO NOTHING;

-- 地方小吃品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('沙县小吃', '福建沙县特色小吃连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Shaxian%20Snacks%20Fujian%20noodles%20dumplings%20chain&image_size=square', '小吃', 1997, '中国福建', 'https://www.shaxianxiaochi.com'),
('兰州拉面', '西北特色牛肉面连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Lanzhou%20Ramen%20beef%20noodle%20soup%20northwest%20China&image_size=square', '小吃', 1915, '中国甘肃', 'https://www.lanzhoulamian.com'),
('黄焖鸡米饭', '山东特色黄焖鸡连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Braised%20Chicken%20Rice%20Shandong%20specialty%20chain&image_size=square', '小吃', 2011, '中国山东', 'https://www.huangmenji.com'),
('桂林米粉', '广西桂林特色米粉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Guilin%20Rice%20Noodles%20Guangxi%20specialty%20soup&image_size=square', '小吃', 1980, '中国广西', 'https://www.guilinmifen.com'),
('重庆小面', '重庆特色面条小吃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chongqing%20Noodles%20spicy%20Sichuan%20street%20food&image_size=square', '小吃', 1990, '中国重庆', 'https://www.chongqingxiaomian.com'),
('煎饼果子', '天津传统街头小吃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Jianbing%20Guozi%20Tianjin%20crepe%20street%20food&image_size=square', '小吃', 1950, '中国天津', 'https://www.jianbingguozi.com'),
('肉夹馍', '陕西传统小吃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Roujiamo%20Shaanxi%20meat%20sandwich%20traditional&image_size=square', '小吃', 1900, '中国陕西', 'https://www.roujiamo.com'),
('胡辣汤', '河南传统早餐汤品', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hulatang%20Henan%20spicy%20soup%20breakfast&image_size=square', '小吃', 1800, '中国河南', 'https://www.hulatang.com')
ON CONFLICT (name) DO NOTHING;

-- 连锁餐厅品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('外婆家', '杭帮菜连锁餐厅品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Grandma%20Home%20Hangzhou%20cuisine%20family%20restaurant&image_size=square', '中餐', 1998, '中国杭州', 'https://www.waipojia.com'),
('绿茶餐厅', '时尚中餐连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Green%20Tea%20Restaurant%20modern%20Chinese%20dining&image_size=square', '中餐', 2008, '中国杭州', 'https://www.lvcha.com'),
('新白鹿', '江浙菜连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=New%20White%20Deer%20Jiangzhe%20cuisine%20restaurant&image_size=square', '中餐', 2009, '中国杭州', 'https://www.newwhitedeer.com'),
('弄堂里', '上海本帮菜连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nongtangli%20Shanghai%20local%20cuisine%20alley%20restaurant&image_size=square', '中餐', 2005, '中国上海', 'https://www.nongtangli.com'),
('云海肴', '云南菜连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Yunhaiyao%20Yunnan%20cuisine%20ethnic%20restaurant&image_size=square', '中餐', 2009, '中国云南', 'https://www.yunhaiyao.com'),
('局气', '北京菜连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Juqi%20Beijing%20cuisine%20traditional%20restaurant&image_size=square', '中餐', 2013, '中国北京', 'https://www.juqi.com'),
('花家怡园', '川菜连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Huajia%20Yiyuan%20Sichuan%20cuisine%20elegant%20restaurant&image_size=square', '川菜', 1999, '中国北京', 'https://www.huajiayiyuan.com'),
('金鼎轩', '港式茶餐厅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Jindingxuan%20Hong%20Kong%20style%20tea%20restaurant&image_size=square', '港式', 1989, '中国北京', 'https://www.jindingxuan.com')
ON CONFLICT (name) DO NOTHING;

-- 烘焙甜品品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('85度C', '台式烘焙连锁品牌，提供咖啡和烘焙产品', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=85%20Degrees%20C%20Taiwan%20bakery%20coffee%20bread%20cake&image_size=square', '烘焙', 2003, '中国台湾', 'https://www.85cafe.com'),
('面包新语', '新加坡烘焙连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=BreadTalk%20Singapore%20bakery%20fresh%20bread%20pastry&image_size=square', '烘焙', 2000, '新加坡', 'https://www.breadtalk.com'),
('好利来', '中式烘焙连锁品牌，以生日蛋糕闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Holiland%20Chinese%20bakery%20birthday%20cake%20pastry&image_size=square', '烘焙', 1992, '中国北京', 'https://www.holiland.com'),
('元祖', '台式精品蛋糕品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Yuanzu%20Taiwan%20premium%20cake%20dessert%20brand&image_size=square', '烘焙', 1980, '中国台湾', 'https://www.ganso.com.tw'),
('满记甜品', '港式甜品连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Honeymoon%20Dessert%20Hong%20Kong%20style%20sweet%20soup&image_size=square', '甜品', 1995, '中国香港', 'https://www.honeymoon-dessert.com'),
('许留山', '港式甜品品牌，以芒果甜品著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hui%20Lau%20Shan%20Hong%20Kong%20mango%20dessert%20brand&image_size=square', '甜品', 1960, '中国香港', 'https://www.huilaushan.com')
ON CONFLICT (name) DO NOTHING;

-- 海南本地品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('海南鸡饭', '海南特色美食，白切鸡配香米饭', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20Chicken%20Rice%20white%20cut%20chicken%20fragrant%20rice&image_size=square', '海南菜', 1900, '中国海南', 'https://www.hainanchickenrice.com'),
('文昌鸡', '海南四大名菜之一，肉质鲜美', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Wenchang%20Chicken%20Hainan%20famous%20dish%20tender%20meat&image_size=square', '海南菜', 1800, '中国海南文昌', 'https://www.wenchangji.com'),
('加积鸭', '海南传统名菜，鸭肉香嫩', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Jiaji%20Duck%20Hainan%20traditional%20dish%20tender%20duck&image_size=square', '海南菜', 1850, '中国海南琼海', 'https://www.jiajiya.com'),
('东山羊', '海南特色羊肉，肉质鲜美无膻味', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dongshan%20Goat%20Hainan%20specialty%20mutton%20no%20gamey%20taste&image_size=square', '海南菜', 1700, '中国海南万宁', 'https://www.dongshanyang.com'),
('和乐蟹', '海南四大名菜，膏满肉肥', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hele%20Crab%20Hainan%20famous%20dish%20fat%20crab%20roe&image_size=square', '海南菜', 1600, '中国海南万宁', 'https://www.helexie.com'),
('椰子鸡', '海南特色汤品，椰汁炖鸡', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Coconut%20Chicken%20Hainan%20soup%20coconut%20water%20stewed&image_size=square', '海南菜', 1950, '中国海南', 'https://www.yeziji.com'),
('清补凉', '海南传统甜品，消暑解腻', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Qingbuliang%20Hainan%20dessert%20cooling%20sweet%20soup&image_size=square', '海南甜品', 1400, '中国海南', 'https://www.qingbuliang.com'),
('抱罗粉', '海南特色米粉，汤鲜味美', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Baoluo%20Noodles%20Hainan%20rice%20noodle%20soup%20fresh%20broth&image_size=square', '海南小吃', 1300, '中国海南文昌', 'https://www.baoluofen.com'),
('海南粉', '海南传统小吃，米粉配料丰富', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20Fen%20traditional%20rice%20noodle%20rich%20toppings&image_size=square', '海南小吃', 1200, '中国海南', 'https://www.hainanfen.com'),
('老爸茶', '海南茶文化，悠闲品茶聊天', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Lao%20Dad%20Cha%20Hainan%20tea%20culture%20leisure%20chat&image_size=square', '海南茶饮', 1980, '中国海南', 'https://www.laodacha.com')
ON CONFLICT (name) DO NOTHING;

-- 外卖平台品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('美团外卖', '中国领先的外卖配送平台', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Meituan%20Delivery%20yellow%20kangaroo%20food%20delivery%20platform&image_size=square', '外卖平台', 2013, '中国北京', 'https://www.meituan.com'),
('饿了么', '阿里巴巴旗下外卖配送平台', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Ele.me%20blue%20food%20delivery%20platform%20hungry&image_size=square', '外卖平台', 2008, '中国上海', 'https://www.ele.me'),
('百度外卖', '百度旗下外卖配送服务', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Baidu%20Waimai%20food%20delivery%20service%20platform&image_size=square', '外卖平台', 2014, '中国北京', 'https://waimai.baidu.com')
ON CONFLICT (name) DO NOTHING;

-- 粤菜品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('点都德', '广式茶餐厅连锁品牌，以港式点心闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dian%20Dou%20De%20Cantonese%20dim%20sum%20tea%20restaurant%20Hong%20Kong%20style&image_size=square', '粤菜', 1933, '中国香港', 'https://www.diandoude.com'),
('陶陶居', '广州老字号茶楼，传承粤菜文化', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Tao%20Tao%20Ju%20traditional%20Guangzhou%20teahouse%20Cantonese%20cuisine&image_size=square', '粤菜', 1880, '中国广州', 'https://www.taotaoju.com'),
('翠华餐厅', '香港茶餐厅连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Tsui%20Wah%20Hong%20Kong%20tea%20restaurant%20cha%20chaan%20teng&image_size=square', '港式茶餐厅', 1967, '中国香港', 'https://www.tsuiwah.com'),
('大家乐', '香港快餐连锁品牌，提供港式快餐', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cafe%20de%20Coral%20Hong%20Kong%20fast%20food%20restaurant%20chain&image_size=square', '港式快餐', 1968, '中国香港', 'https://www.cafedecoral.com')
ON CONFLICT (name) DO NOTHING;

-- 日韩料理品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('味千拉面', '日式拉面连锁品牌，以白汤拉面著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Ajisen%20Ramen%20Japanese%20noodle%20soup%20restaurant%20white%20broth&image_size=square', '日料', 1968, '日本', 'https://www.ajisen.com'),
('元气寿司', '回转寿司连锁品牌，提供新鲜寿司', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Genki%20Sushi%20conveyor%20belt%20sushi%20Japanese%20restaurant&image_size=square', '日料', 1990, '日本', 'https://www.genkisushi.com'),
('和民', '日式居酒屋连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Watami%20Japanese%20izakaya%20pub%20restaurant%20sake&image_size=square', '日料', 1984, '日本', 'https://www.watami.com'),
('汉拿山', '韩式烤肉连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hannashan%20Korean%20BBQ%20grilled%20meat%20restaurant&image_size=square', '韩料', 1996, '韩国', 'https://www.hannashan.com'),
('权金城', '韩式烤肉和料理连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Quanjincheng%20Korean%20BBQ%20kimchi%20restaurant%20grill&image_size=square', '韩料', 2001, '韩国', 'https://www.quanjincheng.com')
ON CONFLICT (name) DO NOTHING;

-- 西餐品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('萨莉亚', '意式休闲餐厅连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Saizeriya%20Italian%20casual%20dining%20pasta%20pizza%20restaurant&image_size=square', '西餐', 1973, '日本', 'https://www.saizeriya.com'),
('豪客来', '西式牛排连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Haoke%20Lai%20Western%20steak%20house%20beef%20restaurant&image_size=square', '西餐', 1993, '中国台湾', 'https://www.howcome.com.tw'),
('牛排家', '平价牛排连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Niupai%20Jia%20affordable%20steak%20house%20family%20restaurant&image_size=square', '西餐', 2005, '中国', 'https://www.niupaijia.com'),
('绿茵阁', '西式简餐连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Lvyinge%20Western%20casual%20dining%20green%20restaurant&image_size=square', '西餐', 1998, '中国', 'https://www.greengage.com.cn')
ON CONFLICT (name) DO NOTHING;

-- 奶茶饮品品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('喜茶', '新式茶饮品牌，以芝士茶闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Heytea%20modern%20tea%20drink%20cheese%20tea%20brand&image_size=square', '茶饮', 2012, '中国广东', 'https://www.heytea.com'),
('奈雪的茶', '高端茶饮品牌，茶饮配软欧包', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nayuki%20premium%20tea%20drink%20soft%20bread%20brand&image_size=square', '茶饮', 2015, '中国深圳', 'https://www.nayuki.com'),
('一点点', '台式手摇茶连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=A%20Little%20Tea%20Taiwan%20bubble%20tea%20hand%20shaken&image_size=square', '茶饮', 1994, '中国台湾', 'https://www.alittle-tea.com'),
('CoCo都可', '台式茶饮连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CoCo%20Taiwan%20milk%20tea%20bubble%20tea%20chain&image_size=square', '茶饮', 1997, '中国台湾', 'https://www.coco-tea.com'),
('茶颜悦色', '长沙本土茶饮品牌，以中式茶饮著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sexy%20Tea%20Changsha%20Chinese%20style%20tea%20drink%20traditional&image_size=square', '茶饮', 2013, '中国长沙', 'https://www.chayanyuese.com'),
('古茗', '新式茶饮连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Gu%20Ming%20modern%20tea%20drink%20fresh%20fruit%20tea&image_size=square', '茶饮', 2010, '中国浙江', 'https://www.guming.com'),
('书亦烧仙草', '以烧仙草为特色的茶饮品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Shuyi%20Shaoxiancao%20grass%20jelly%20tea%20drink%20dessert&image_size=square', '茶饮', 2007, '中国四川', 'https://www.shuyitea.com'),
('蜜雪冰城', '平价茶饮连锁品牌，以冰淇淋和柠檬茶著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Mixue%20Bingcheng%20affordable%20ice%20cream%20lemon%20tea%20snowman&image_size=square', '茶饮', 1997, '中国河南', 'https://www.mixuebingcheng.com')
ON CONFLICT (name) DO NOTHING;

-- 火锅品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('海底捞', '知名火锅连锁品牌，以优质服务和新鲜食材著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Haidilao%20hotpot%20restaurant%20red%20logo%20Chinese%20dining&image_size=square', '火锅', 1994, '中国', 'https://www.haidilao.com'),
('小龙坎', '成都知名火锅品牌，以正宗川味火锅闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaolongkan%20Sichuan%20hotpot%20spicy%20red%20pepper%20restaurant&image_size=square', '火锅', 2014, '中国成都', 'https://www.xiaolongkan.com'),
('呷哺呷哺', '一人一锅的小火锅连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiabuxiabu%20individual%20hotpot%20small%20pot%20restaurant%20logo&image_size=square', '火锅', 1998, '中国北京', 'https://www.xiabuxiabu.com'),
('大龙燚', '成都火锅品牌，主打传统川味', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dalongyi%20traditional%20Sichuan%20hotpot%20dragon%20logo%20spicy&image_size=square', '火锅', 2013, '中国成都', 'https://www.dalongyi.com'),
('蜀大侠', '重庆火锅品牌，以麻辣鲜香著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Shudaxia%20Chongqing%20hotpot%20spicy%20numbing%20warrior%20logo&image_size=square', '火锅', 2015, '中国重庆', 'https://www.shudaxia.com'),
('左庭右院', '精致火锅品牌，注重用餐环境', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zuoting%20Youyuan%20elegant%20hotpot%20restaurant%20refined%20dining&image_size=square', '火锅', 2008, '中国', 'https://www.zuotingyouyuan.com')
ON CONFLICT (name) DO NOTHING;

-- 川菜品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('眉州东坡', '知名川菜连锁品牌，传承东坡文化', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Meizhou%20Dongpo%20Sichuan%20cuisine%20traditional%20Chinese%20restaurant&image_size=square', '川菜', 1996, '中国四川', 'https://www.mzdp.com'),
('陈麻婆豆腐', '成都老字号川菜品牌，以麻婆豆腐闻名', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chen%20Mapo%20Tofu%20traditional%20Sichuan%20spicy%20tofu%20restaurant&image_size=square', '川菜', 1862, '中国成都', 'https://www.chenmapo.com'),
('巴国布衣', '川菜连锁品牌，主打家常川菜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Baguo%20Buyi%20Sichuan%20home%20style%20cooking%20restaurant&image_size=square', '川菜', 1998, '中国重庆', 'https://www.baguobuyi.com'),
('川西坝子', '川菜火锅品牌，融合传统与现代', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chuanxi%20Bazi%20Sichuan%20hotpot%20traditional%20modern%20fusion&image_size=square', '川菜', 2001, '中国四川', 'https://www.chuanxibazi.com')
ON CONFLICT (name) DO NOTHING;

-- 湘菜品牌
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website)
VALUES 
('57度湘', '时尚湘菜连锁品牌，主打创新湘菜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=57%20degrees%20Xiang%20modern%20Hunan%20cuisine%20stylish%20restaurant&image_size=square', '湘菜', 2009, '中国长沙', 'https://www.57duxiang.com'),
('炊烟时代', '湘菜连锁品牌，传承湖南味道', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chuiyan%20Shidai%20traditional%20Hunan%20cuisine%20cooking%20smoke&image_size=square', '湘菜', 2005, '中国湖南', 'https://www.chuiyanshidai.com'),
('湘鄂情', '知名湘菜品牌，以正宗湘菜著称', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiang%20E%20Qing%20authentic%20Hunan%20cuisine%20spicy%20restaurant&image_size=square', '湘菜', 1999, '中国北京', 'https://www.xiangequing.com'),
('农耕年代', '主题湘菜餐厅，营造乡村氛围', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nong%20Geng%20Niandai%20rural%20themed%20Hunan%20restaurant%20countryside&image_size=square', '湘菜', 2003, '中国湖南', 'https://www.nonggengniandia.com')
ON CONFLICT (name) DO NOTHING;