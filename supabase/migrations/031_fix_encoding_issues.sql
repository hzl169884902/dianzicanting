-- 修复数据库编码问题
-- 这个迁移文件将修复菜品名称和描述中的乱码问题

-- 首先备份当前数据
CREATE TABLE IF NOT EXISTS dishes_backup AS SELECT * FROM dishes;
CREATE TABLE IF NOT EXISTS categories_backup AS SELECT * FROM categories;

-- 修复菜品表中的乱码数据
-- 将常见的乱码字符替换为正确的中文字符
UPDATE dishes SET 
  name = CASE 
    -- 修复常见乱码模式
    WHEN name LIKE '%6A？？？3%' THEN REPLACE(name, '6A？？？3', '冒菜')
    WHEN name LIKE '%？？？%' THEN 
      CASE 
        WHEN name LIKE '%钵钵鸡%' THEN '钵钵鸡'
        WHEN name LIKE '%串串香%' THEN '串串香'
        WHEN name LIKE '%麻辣烫%' THEN '麻辣烫'
        WHEN name LIKE '%火锅%' THEN '火锅'
        WHEN name LIKE '%冒菜%' THEN '冒菜'
        WHEN name LIKE '%酸辣粉%' THEN '酸辣粉'
        WHEN name LIKE '%担担面%' THEN '担担面'
        WHEN name LIKE '%红烧肉%' THEN '红烧肉'
        WHEN name LIKE '%宫保鸡丁%' THEN '宫保鸡丁'
        WHEN name LIKE '%麻婆豆腐%' THEN '麻婆豆腐'
        WHEN name LIKE '%回锅肉%' THEN '回锅肉'
        WHEN name LIKE '%水煮鱼%' THEN '水煮鱼'
        WHEN name LIKE '%口水鸡%' THEN '口水鸡'
        WHEN name LIKE '%夫妻肺片%' THEN '夫妻肺片'
        WHEN name LIKE '%蒜泥白肉%' THEN '蒜泥白肉'
        WHEN name LIKE '%白切鸡%' THEN '白切鸡'
        WHEN name LIKE '%凉拌黄瓜%' THEN '凉拌黄瓜'
        WHEN name LIKE '%糖醋排骨%' THEN '糖醋排骨'
        WHEN name LIKE '%红烧茄子%' THEN '红烧茄子'
        WHEN name LIKE '%青椒肉丝%' THEN '青椒肉丝'
        WHEN name LIKE '%鱼香肉丝%' THEN '鱼香肉丝'
        WHEN name LIKE '%土豆丝%' THEN '酸辣土豆丝'
        WHEN name LIKE '%西红柿鸡蛋%' THEN '西红柿炒鸡蛋'
        WHEN name LIKE '%蛋炒饭%' THEN '蛋炒饭'
        WHEN name LIKE '%扬州炒饭%' THEN '扬州炒饭'
        WHEN name LIKE '%小笼包%' THEN '小笼包'
        WHEN name LIKE '%煎饺%' THEN '煎饺'
        WHEN name LIKE '%蒸饺%' THEN '蒸饺'
        WHEN name LIKE '%包子%' THEN '包子'
        WHEN name LIKE '%馒头%' THEN '馒头'
        WHEN name LIKE '%粥%' THEN '白粥'
        WHEN name LIKE '%豆浆%' THEN '豆浆'
        WHEN name LIKE '%油条%' THEN '油条'
        WHEN name LIKE '%煎蛋%' THEN '煎蛋'
        WHEN name LIKE '%蒸蛋%' THEN '蒸蛋'
        ELSE REPLACE(REPLACE(REPLACE(name, '？', ''), '6A', ''), '3', '')
      END
    ELSE name
  END,
  description = CASE 
    WHEN description LIKE '%？？？%' THEN 
      CASE 
        WHEN description LIKE '%四川%' THEN '四川特色美食'
        WHEN description LIKE '%麻辣%' THEN '麻辣鲜香'
        WHEN description LIKE '%香辣%' THEN '香辣可口'
        WHEN description LIKE '%清淡%' THEN '清淡爽口'
        WHEN description LIKE '%营养%' THEN '营养丰富'
        WHEN description LIKE '%美味%' THEN '美味可口'
        ELSE REPLACE(REPLACE(REPLACE(description, '？', ''), '6A', ''), '3', '')
      END
    ELSE description
  END
WHERE name LIKE '%？%' OR name LIKE '%6A%' OR name LIKE '%3%' OR description LIKE '%？%';

-- 修复分类表中的乱码数据
UPDATE categories SET 
  name = CASE 
    WHEN name LIKE '%？？？%' THEN 
      CASE 
        WHEN name LIKE '%川菜%' THEN '川菜'
        WHEN name LIKE '%湘菜%' THEN '湘菜'
        WHEN name LIKE '%粤菜%' THEN '粤菜'
        WHEN name LIKE '%鲁菜%' THEN '鲁菜'
        WHEN name LIKE '%苏菜%' THEN '苏菜'
        WHEN name LIKE '%浙菜%' THEN '浙菜'
        WHEN name LIKE '%闽菜%' THEN '闽菜'
        WHEN name LIKE '%徽菜%' THEN '徽菜'
        WHEN name LIKE '%小吃%' THEN '小吃'
        WHEN name LIKE '%面食%' THEN '面食'
        WHEN name LIKE '%汤品%' THEN '汤品'
        WHEN name LIKE '%凉菜%' THEN '凉菜'
        WHEN name LIKE '%热菜%' THEN '热菜'
        WHEN name LIKE '%主食%' THEN '主食'
        WHEN name LIKE '%甜品%' THEN '甜品'
        WHEN name LIKE '%饮品%' THEN '饮品'
        ELSE REPLACE(REPLACE(REPLACE(name, '？', ''), '6A', ''), '3', '')
      END
    ELSE name
  END,
  description = CASE 
    WHEN description LIKE '%？？？%' THEN 
      CASE 
        WHEN description LIKE '%传统%' THEN '传统美食'
        WHEN description LIKE '%特色%' THEN '特色菜品'
        WHEN description LIKE '%经典%' THEN '经典菜系'
        ELSE REPLACE(REPLACE(REPLACE(description, '？', ''), '6A', ''), '3', '')
      END
    ELSE description
  END
WHERE name LIKE '%？%' OR name LIKE '%6A%' OR name LIKE '%3%' OR description LIKE '%？%';

-- 确保数据库使用正确的字符编码
-- 注意：Supabase使用PostgreSQL，默认就是UTF-8编码
-- 但我们可以验证当前的编码设置
SELECT 
  datname,
  pg_encoding_to_char(encoding) as encoding,
  datcollate,
  datctype
FROM pg_database 
WHERE datname = current_database();

-- 创建一个函数来清理乱码文本
CREATE OR REPLACE FUNCTION clean_garbled_text(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  IF input_text IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- 移除常见的乱码字符
  RETURN REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(input_text, '[？]+', '', 'g'),
      '[0-9A-F]{2}', '', 'g'
    ),
    '[^\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\u30a0-\u30ff\ua-zA-Z0-9\s\p{P}]', '', 'g'
  );
END;
$$ LANGUAGE plpgsql;

-- 使用函数清理所有可能的乱码
UPDATE dishes SET 
  name = clean_garbled_text(name),
  description = clean_garbled_text(description)
WHERE name != clean_garbled_text(name) OR description != clean_garbled_text(description);

UPDATE categories SET 
  name = clean_garbled_text(name),
  description = clean_garbled_text(description)
WHERE name != clean_garbled_text(name) OR description != clean_garbled_text(description);

-- 验证修复结果
SELECT 
  'dishes' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN name LIKE '%？%' OR name LIKE '%6A%' THEN 1 END) as garbled_names,
  COUNT(CASE WHEN description LIKE '%？%' OR description LIKE '%6A%' THEN 1 END) as garbled_descriptions
FROM dishes
UNION ALL
SELECT 
  'categories' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN name LIKE '%？%' OR name LIKE '%6A%' THEN 1 END) as garbled_names,
  COUNT(CASE WHEN description LIKE '%？%' OR description LIKE '%6A%' THEN 1 END) as garbled_descriptions
FROM categories;

-- 记录修复操作
INSERT INTO public.migration_logs (migration_name, executed_at, description) 
VALUES (
  '031_fix_encoding_issues', 
  NOW(), 
  '修复数据库中菜品和分类的乱码问题，清理无效字符，确保中文显示正常'
) ON CONFLICT DO NOTHING;

-- 创建迁移日志表（如果不存在）
CREATE TABLE IF NOT EXISTS migration_logs (
  id SERIAL PRIMARY KEY,
  migration_name VARCHAR(255) NOT NULL,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);