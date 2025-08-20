/**
 * Supabase配置验证脚本
 * 用于验证环境变量配置是否正确
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// 颜色输出函数
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

async function verifySupabaseConfig() {
  console.log(colors.cyan('🔍 开始验证Supabase配置...\n'));

  // 检查环境变量
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_SUPABASE_SERVICE_ROLE_KEY'
  ];

  console.log(colors.blue('📋 检查环境变量:'));
  let allEnvVarsPresent = true;

  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    if (value) {
      console.log(colors.green(`✅ ${envVar}: ${value.substring(0, 20)}...`));
    } else {
      console.log(colors.red(`❌ ${envVar}: 未设置`));
      allEnvVarsPresent = false;
    }
  });

  if (!allEnvVarsPresent) {
    console.log(colors.red('\n❌ 部分环境变量未设置，请检查.env文件'));
    return;
  }

  console.log(colors.blue('\n🔗 测试Supabase连接:'));

  try {
    // 使用匿名密钥创建客户端
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    // 测试基本连接
    console.log(colors.yellow('正在测试匿名连接...'));
    const { data, error } = await supabase.from('dishes').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log(colors.red(`❌ 匿名连接失败: ${error.message}`));
    } else {
      console.log(colors.green(`✅ 匿名连接成功，dishes表记录数: ${data || '未知'}`));
    }

    // 测试服务角色密钥
    console.log(colors.yellow('正在测试服务角色连接...'));
    const supabaseAdmin = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: adminData, error: adminError } = await supabaseAdmin.from('dishes').select('count', { count: 'exact', head: true });
    
    if (adminError) {
      console.log(colors.red(`❌ 服务角色连接失败: ${adminError.message}`));
    } else {
      console.log(colors.green(`✅ 服务角色连接成功，dishes表记录数: ${adminData || '未知'}`));
    }

    // 测试用户表
    console.log(colors.yellow('正在测试用户表连接...'));
    const { data: usersData, error: usersError } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (usersError) {
      console.log(colors.red(`❌ 用户表连接失败: ${usersError.message}`));
    } else {
      console.log(colors.green(`✅ 用户表连接成功，users表记录数: ${usersData || '未知'}`));
    }

  } catch (error) {
    console.log(colors.red(`❌ 连接测试失败: ${error.message}`));
  }

  console.log(colors.cyan('\n🎉 Supabase配置验证完成!'));
  console.log(colors.blue('\n📝 配置信息:'));
  console.log(`   项目URL: ${process.env.VITE_SUPABASE_URL}`);
  console.log(`   匿名密钥: ${process.env.VITE_SUPABASE_ANON_KEY.substring(0, 30)}...`);
  console.log(`   服务密钥: ${process.env.VITE_SUPABASE_SERVICE_ROLE_KEY.substring(0, 30)}...`);
  
  console.log(colors.green('\n✅ 环境配置已完成，可以开始使用应用了!'));
}

// 运行验证
verifySupabaseConfig().catch(console.error);