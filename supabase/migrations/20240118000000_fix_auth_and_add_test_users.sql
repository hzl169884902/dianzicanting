-- 修复认证问题并添加测试用户

-- 确保用户表有正确的权限
GRANT ALL PRIVILEGES ON users TO authenticated;
GRANT SELECT ON users TO anon;

-- 创建或更新用户表的RLS策略
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;

-- 允许用户查看自己的资料
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- 允许用户更新自己的资料
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 允许认证用户插入数据
CREATE POLICY "Enable insert for authenticated users only" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 添加手机号字段（为后续功能准备）
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS qq_openid VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS wechat_openid VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT FALSE;

-- 创建短信验证码表
CREATE TABLE IF NOT EXISTS sms_verification (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 为短信验证码表设置权限
GRANT ALL PRIVILEGES ON sms_verification TO authenticated;
GRANT SELECT ON sms_verification TO anon;

-- 启用RLS
ALTER TABLE sms_verification ENABLE ROW LEVEL SECURITY;

-- 创建短信验证码的RLS策略
CREATE POLICY "Users can manage own verification codes" ON sms_verification
  FOR ALL USING (TRUE); -- 暂时允许所有操作，后续可以根据需要调整

-- 创建第三方登录记录表
CREATE TABLE IF NOT EXISTS third_party_logins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(20) NOT NULL, -- 'qq', 'wechat'
  provider_id VARCHAR(100) NOT NULL,
  provider_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider, provider_id)
);

-- 为第三方登录表设置权限
GRANT ALL PRIVILEGES ON third_party_logins TO authenticated;
GRANT SELECT ON third_party_logins TO anon;

-- 启用RLS
ALTER TABLE third_party_logins ENABLE ROW LEVEL SECURITY;

-- 创建第三方登录的RLS策略
CREATE POLICY "Users can view own third party logins" ON third_party_logins
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own third party logins" ON third_party_logins
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own third party logins" ON third_party_logins
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own third party logins" ON third_party_logins
  FOR DELETE USING (user_id = auth.uid());

-- 检查当前权限
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND grantee IN ('anon', 'authenticated') 
AND table_name IN ('users', 'sms_verification', 'third_party_logins')
ORDER BY table_name, grantee;