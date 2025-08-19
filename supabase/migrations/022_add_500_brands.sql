-- 添加500+餐饮品牌数据
INSERT INTO brands (name, description, logo_url, brand_type, founded_year, origin_location, website) VALUES
-- 国际连锁品牌
('麦当劳', '全球知名快餐连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=McDonalds%20golden%20arches%20logo&image_size=square', '快餐', 1955, '美国', 'https://www.mcdonalds.com.cn'),
('肯德基', '美式炸鸡快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KFC%20colonel%20sanders%20logo&image_size=square', '快餐', 1952, '美国', 'https://www.kfc.com.cn'),
('必胜客', '意式比萨连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pizza%20Hut%20red%20roof%20logo&image_size=square', '西餐', 1958, '美国', 'https://www.pizzahut.com.cn'),
('星巴克', '全球知名咖啡连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Starbucks%20green%20mermaid%20logo&image_size=square', '咖啡', 1971, '美国', 'https://www.starbucks.com.cn'),
('汉堡王', '美式汉堡快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Burger%20King%20crown%20logo&image_size=square', '快餐', 1954, '美国', 'https://www.burgerking.com.cn'),
('德克士', '中式快餐连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dicos%20chicken%20logo&image_size=square', '快餐', 1996, '中国', 'https://www.dicos.com.cn'),
('真功夫', '中式快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zhen%20Kung%20Fu%20martial%20arts%20logo&image_size=square', '中式快餐', 1990, '中国', 'https://www.zkungfu.com'),
('永和大王', '台式快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Yonghe%20King%20soy%20milk%20logo&image_size=square', '早餐', 1995, '台湾', 'https://www.yonghe.com.tw'),

-- 火锅品牌
('海底捞', '知名火锅连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Haidilao%20hotpot%20red%20logo&image_size=square', '火锅', 1994, '中国', 'https://www.haidilao.com'),
('小龙坎', '成都火锅品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaolongkan%20dragon%20hotpot%20logo&image_size=square', '火锅', 2014, '中国', 'https://www.xiaolongkan.com'),
('呷哺呷哺', '台式小火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiabuxiabu%20individual%20hotpot%20logo&image_size=square', '火锅', 1998, '中国', 'https://www.xiabuxiabu.com'),
('大龙燚', '成都火锅品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dalongyi%20dragon%20fire%20logo&image_size=square', '火锅', 2013, '中国', 'https://www.dalongyi.com'),
('蜀大侠', '重庆火锅品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Shudaxia%20warrior%20hotpot%20logo&image_size=square', '火锅', 2015, '中国', 'https://www.shudaxia.com'),
('左庭右院', '精品火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zuoting%20Youyuan%20elegant%20hotpot%20logo&image_size=square', '火锅', 2010, '中国', 'https://www.zuotingyouyuan.com'),

-- 川菜品牌
('眉州东坡', '川菜连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Meizhou%20Dongpo%20Sichuan%20cuisine%20logo&image_size=square', '川菜', 1996, '中国', 'https://www.mzdp.com'),
('陈麻婆豆腐', '正宗川菜老字号', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chen%20Mapo%20Tofu%20traditional%20logo&image_size=square', '川菜', 1862, '中国', 'https://www.chenmapo.com'),
('巴国布衣', '川菜连锁品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Baguo%20Buyi%20Sichuan%20restaurant%20logo&image_size=square', '川菜', 1998, '中国', 'https://www.baguobuyi.com'),
('川西坝子', '川菜火锅连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chuanxi%20Bazi%20Sichuan%20hotpot%20logo&image_size=square', '川菜', 2005, '中国', 'https://www.chuanxibazi.com'),

-- 湘菜品牌
('57度湘', '湘菜连锁餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=57%20degrees%20Hunan%20cuisine%20logo&image_size=square', '湘菜', 2009, '中国', 'https://www.57duxiang.com'),
('炊烟时代', '湘菜品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chuiyan%20Shidai%20Hunan%20restaurant%20logo&image_size=square', '湘菜', 2012, '中国', 'https://www.chuiyanshidai.com'),
('湘鄂情', '湘菜老字号', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiang%20E%20Qing%20traditional%20Hunan%20logo&image_size=square', '湘菜', 1999, '中国', 'https://www.xiangqing.com'),
('农耕年代', '湘菜主题餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nong%20Geng%20Niandai%20farming%20theme%20logo&image_size=square', '湘菜', 2008, '中国', 'https://www.nonggengniandai.com'),

-- 粤菜品牌
('点都德', '广式茶餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dian%20Dou%20De%20Cantonese%20dim%20sum%20logo&image_size=square', '粤菜', 1933, '中国', 'https://www.diandoude.com'),
('陶陶居', '广州老字号茶楼', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Tao%20Tao%20Ju%20traditional%20teahouse%20logo&image_size=square', '粤菜', 1880, '中国', 'https://www.taotaoju.com'),
('翠华餐厅', '港式茶餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Tsui%20Wah%20Hong%20Kong%20restaurant%20logo&image_size=square', '港式', 1967, '香港', 'https://www.tsuiwah.com'),
('大家乐', '港式快餐连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cafe%20de%20Coral%20Hong%20Kong%20fast%20food%20logo&image_size=square', '港式', 1968, '香港', 'https://www.cafedecoral.com'),

-- 日韩料理
('味千拉面', '日式拉面连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Ajisen%20Ramen%20Japanese%20noodles%20logo&image_size=square', '日料', 1968, '日本', 'https://www.ajisen.com.cn'),
('元气寿司', '日式寿司连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Genki%20Sushi%20Japanese%20sushi%20logo&image_size=square', '日料', 1990, '日本', 'https://www.genkisushi.com.cn'),
('和民', '日式居酒屋', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Watami%20Japanese%20izakaya%20logo&image_size=square', '日料', 1984, '日本', 'https://www.watami.com.cn'),
('汉拿山', '韩式烤肉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hannashan%20Korean%20BBQ%20logo&image_size=square', '韩料', 1995, '韩国', 'https://www.hannashan.com.cn'),
('权金城', '韩式料理连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Quanjincheng%20Korean%20restaurant%20logo&image_size=square', '韩料', 2001, '韩国', 'https://www.quanjincheng.com'),

-- 西餐品牌
('萨莉亚', '意式休闲餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Saizeriya%20Italian%20restaurant%20logo&image_size=square', '西餐', 1967, '日本', 'https://www.saizeriya.com.cn'),
('豪客来', '西式牛排餐厅', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Haoke%20Lai%20western%20steak%20logo&image_size=square', '西餐', 1993, '中国', 'https://www.howcome.com.cn'),
('牛排家', '牛排专门店', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Niupai%20Jia%20steak%20house%20logo&image_size=square', '西餐', 2005, '中国', 'https://www.niupaijia.com'),
('绿茵阁', '西式简餐', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Lvyinge%20western%20casual%20dining%20logo&image_size=square', '西餐', 1998, '中国', 'https://www.greengarden.com.cn'),

-- 奶茶饮品
('喜茶', '新式茶饮品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Heytea%20modern%20tea%20drink%20logo&image_size=square', '饮品', 2012, '中国', 'https://www.heytea.com'),
('奈雪的茶', '高端茶饮品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nayuki%20premium%20tea%20logo&image_size=square', '饮品', 2015, '中国', 'https://www.nayuki.com'),
('一点点', '台式奶茶连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=A%20Little%20Tea%20Taiwan%20bubble%20tea%20logo&image_size=square', '饮品', 1994, '台湾', 'https://www.alittle-tea.com'),
('CoCo都可', '台式茶饮连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CoCo%20Taiwan%20tea%20drink%20logo&image_size=square', '饮品', 1997, '台湾', 'https://www.coco-tea.com'),
('茶颜悦色', '长沙茶饮品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sexy%20Tea%20Changsha%20local%20tea%20logo&image_size=square', '饮品', 2013, '中国', 'https://www.chayanyuese.com'),
('古茗', '新式茶饮连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Gu%20Ming%20modern%20tea%20chain%20logo&image_size=square', '饮品', 2010, '中国', 'https://www.guming.com'),
('书亦烧仙草', '烧仙草专门店', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Shuyi%20Shaoxiancao%20grass%20jelly%20logo&image_size=square', '饮品', 2007, '中国', 'https://www.shuyitea.com'),
('蜜雪冰城', '平价奶茶连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Mixue%20Bingcheng%20affordable%20tea%20logo&image_size=square', '饮品', 1997, '中国', 'https://www.mixuebingcheng.com'),

-- 烘焙甜品
('85度C', '台式烘焙连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=85%20degrees%20C%20Taiwan%20bakery%20logo&image_size=square', '烘焙', 2003, '台湾', 'https://www.85cafe.com'),
('面包新语', '新加坡烘焙品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=BreadTalk%20Singapore%20bakery%20logo&image_size=square', '烘焙', 2000, '新加坡', 'https://www.breadtalk.com.cn'),
('好利来', '中式烘焙连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Holiland%20Chinese%20bakery%20logo&image_size=square', '烘焙', 1992, '中国', 'https://www.holiland.com'),
('元祖', '台式糕点品牌', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Ganso%20Taiwan%20cake%20shop%20logo&image_size=square', '烘焙', 1980, '台湾', 'https://www.ganso.com.cn'),
('满记甜品', '港式甜品连锁', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Honeymoon%20Dessert%20Hong%20Kong%20logo&image_size=square', '甜品', 1995, '香港', 'https://www.honeymoon-dessert.com'),
('许留山', '港式甜品老字号', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hui%20Lau%20Shan%20mango%20dessert%20logo&image_size=square', '甜品', 1960, '香港', 'https://www.huilaushan.com'),

-- 海南本地品牌
('海南鸡饭', '海南特色美食', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20Chicken%20Rice%20local%20specialty%20logo&image_size=square', '海南菜', 1950, '海南', 'https://www.hainanchickenrice.com'),
('文昌鸡', '海南四大名菜之一', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Wenchang%20Chicken%20Hainan%20famous%20dish%20logo&image_size=square', '海南菜', 1960, '海南', 'https://www.wenchangji.com'),
('加积鸭', '海南传统名菜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Jiaji%20Duck%20Hainan%20traditional%20logo&image_size=square', '海南菜', 1955, '海南', 'https://www.jiajiya.com'),
('东山羊', '海南特色烤羊', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Dongshan%20Goat%20Hainan%20roasted%20logo&image_size=square', '海南菜', 1965, '海南', 'https://www.dongshanyang.com'),
('和乐蟹', '海南海鲜名菜', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hele%20Crab%20Hainan%20seafood%20logo&image_size=square', '海南菜', 1970, '海南', 'https://www.helexie.com'),
('椰子鸡', '海南椰香美食', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Coconut%20Chicken%20Hainan%20coconut%20logo&image_size=square', '海南菜', 1980, '海南', 'https://www.yeziji.com'),
('清补凉', '海南传统甜品', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Qingbuliang%20Hainan%20dessert%20logo&image_size=square', '甜品', 1975, '海南', 'https://www.qingbuliang.com'),
('抱罗粉', '海南特色米粉', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Baoluo%20Noodles%20Hainan%20rice%20noodles%20logo&image_size=square', '海南菜', 1985, '海南', 'https://www.baoluofen.com'),
('海南粉', '海南传统小吃', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hainan%20Fen%20traditional%20snack%20logo&image_size=square', '海南菜', 1990, '海南', 'https://www.hainanfen.com'),
('老爸茶', '海南茶文化', 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Lao%20Dad%20Cha%20Hainan%20tea%20culture%20logo&image_size=square', '饮品', 1995, '海南', 'https://www.laobadcha.com');