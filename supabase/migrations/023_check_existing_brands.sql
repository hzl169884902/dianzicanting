-- 查看现有品牌数据
SELECT name, brand_type, founded_year FROM brands ORDER BY name;

-- 统计品牌数量
SELECT COUNT(*) as brand_count FROM brands;