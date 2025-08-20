-- 添加手机号测试用户
-- 为用户指定的两个手机号创建测试账户

-- 首先为users表添加phone字段（如果不存在）
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

DO $$
BEGIN
  -- 创建测试用户1：手机号 18171629175
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = '18171629175@phone.local') THEN
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
      '18171629175@phone.local',
      crypt('123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"phone","providers":["phone"]}',
      '{"name":"用户18171629175","phone":"18171629175","avatar_url":"https://via.placeholder.com/100x100?text=U1"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;

  -- 创建测试用户2：手机号 17673903508
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = '17673903508@phone.local') THEN
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
      '17673903508@phone.local',
      crypt('123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"phone","providers":["phone"]}',
      '{"name":"用户17673903508","phone":"17673903508","avatar_url":"https://via.placeholder.com/100x100?text=U2"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- 为每个手机号用户在users表中创建对应的记录
INSERT INTO public.users (id, email, name, phone, avatar_url, plan, preferences, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  (au.raw_user_meta_data->>'name')::text,
  (au.raw_user_meta_data->>'phone')::text,
  (au.raw_user_meta_data->>'avatar_url')::text,
  'free'::text,
  '{"theme":"light","language":"zh-CN"}'::jsonb,
  au.created_at,
  au.updated_at
FROM auth.users au
WHERE au.email IN ('18171629175@phone.local', '17673903508@phone.local')
  AND NOT EXISTS (
    SELECT 1 FROM public.users pu WHERE pu.id = au.id
  );

-- 输出创建的手机号用户信息
DO $$
BEGIN
  RAISE NOTICE '手机号测试用户账户创建完成:';
  RAISE NOTICE '1. 手机号: 18171629175, 密码: 123456';
  RAISE NOTICE '2. 手机号: 17673903508, 密码: 123456';
END $$;