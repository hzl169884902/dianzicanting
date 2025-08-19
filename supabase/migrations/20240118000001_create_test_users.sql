-- 创建测试用户账户
-- 这个迁移文件将创建几个测试用户账户供开发和测试使用

-- 首先检查是否已存在测试用户
DO $$
BEGIN
  -- 创建测试用户1：普通用户
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'test@example.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'test@example.com',
      crypt('test123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"测试用户","avatar_url":"https://via.placeholder.com/100x100?text=Test"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;

  -- 创建测试用户2：管理员用户
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@example.com',
      crypt('admin123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"管理员","avatar_url":"https://via.placeholder.com/100x100?text=Admin"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;

  -- 创建测试用户3：演示用户
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@example.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'demo@example.com',
      crypt('demo123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"演示用户","avatar_url":"https://via.placeholder.com/100x100?text=Demo"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- 为每个测试用户在users表中创建对应的记录
INSERT INTO public.users (id, email, name, avatar_url, plan, preferences, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  (au.raw_user_meta_data->>'name')::text,
  (au.raw_user_meta_data->>'avatar_url')::text,
  'free'::text,
  '{"theme":"light","language":"zh-CN"}'::jsonb,
  au.created_at,
  au.updated_at
FROM auth.users au
WHERE au.email IN ('test@example.com', 'admin@example.com', 'demo@example.com')
  AND NOT EXISTS (
    SELECT 1 FROM public.users pu WHERE pu.id = au.id
  );

-- 输出创建的测试用户信息
DO $$
BEGIN
  RAISE NOTICE '测试用户账户创建完成:';
  RAISE NOTICE '1. 邮箱: test@example.com, 密码: test123456';
  RAISE NOTICE '2. 邮箱: admin@example.com, 密码: admin123456';
  RAISE NOTICE '3. 邮箱: demo@example.com, 密码: demo123456';
END $$;