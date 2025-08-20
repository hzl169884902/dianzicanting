import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function addTestUsers() {
  try {
    console.log('开始添加测试用户...');
    
    // 读取迁移文件
    const migrationPath = path.join(__dirname, '../supabase/migrations/20240119000000_add_phone_test_users.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // 执行迁移
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    });
    
    if (error) {
      console.error('迁移执行失败:', error);
      
      // 如果RPC不可用，尝试直接插入用户
      console.log('尝试直接插入用户...');
      
      // 添加phone字段到users表
      const { error: alterError } = await supabase
        .from('users')
        .select('phone')
        .limit(1);
      
      if (alterError && alterError.message.includes('column "phone" does not exist')) {
        console.log('添加phone字段到users表...');
        // 这里需要使用SQL执行，但由于限制，我们先检查用户是否存在
      }
      
      // 检查用户是否已存在
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const phoneNumbers = ['18171629175', '17673903508'];
      
      for (const phone of phoneNumbers) {
        const existingUser = existingUsers.users.find(u => 
          u.phone === phone || 
          (u.user_metadata && u.user_metadata.phone === phone)
        );
        
        if (!existingUser) {
          console.log(`创建用户: ${phone}`);
          
          // 创建认证用户
          const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            phone: phone,
            password: '123456',
            phone_confirm: true,
            user_metadata: {
              name: `用户${phone}`,
              phone: phone
            }
          });
          
          if (authError) {
            console.error(`创建认证用户失败 ${phone}:`, authError);
            continue;
          }
          
          console.log(`认证用户创建成功: ${phone}`);
          
          // 创建用户档案
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: authUser.user.id,
              email: authUser.user.email || `${phone}@temp.com`,
              name: `用户${phone}`,
              phone: phone,
              plan: 'free',
              preferences: {
                dietType: '均衡饮食',
                allergies: [],
                goals: [],
                notifications: true
              }
            });
          
          if (profileError) {
            console.error(`创建用户档案失败 ${phone}:`, profileError);
          } else {
            console.log(`用户档案创建成功: ${phone}`);
          }
        } else {
          console.log(`用户已存在: ${phone}`);
        }
      }
    } else {
      console.log('迁移执行成功:', data);
    }
    
    console.log('测试用户添加完成');
    
  } catch (error) {
    console.error('添加测试用户失败:', error);
    process.exit(1);
  }
}

addTestUsers();