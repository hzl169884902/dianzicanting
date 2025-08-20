/**
 * 生产环境配置测试脚本
 * 用于验证部署后的Supabase配置是否正确
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// 加载生产环境配置
dotenv.config({ path: '.env.production' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 生产环境配置测试')
console.log('=' .repeat(50))

// 1. 检查环境变量
console.log('\n📋 环境变量检查:')
console.log(`VITE_SUPABASE_URL: ${supabaseUrl ? '✅ 已设置' : '❌ 未设置'}`)
console.log(`VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ 已设置' : '❌ 未设置'}`)
console.log(`VITE_SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ 已设置' : '❌ 未设置'}`)

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ 缺少必要的环境变量，请检查 .env.production 文件')
  process.exit(1)
}

// 2. 测试匿名连接
console.log('\n🔗 测试Supabase连接:')
try {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  // 测试基本连接
  console.log('正在测试基本连接...')
  const { data: dishes, error: dishError } = await supabase
    .from('dishes')
    .select('id, name')
    .limit(1)
  
  if (dishError) {
    console.log(`❌ 数据库连接失败: ${dishError.message}`)
  } else {
    console.log('✅ 数据库连接成功')
    console.log(`   找到菜品数据: ${dishes?.length || 0} 条`)
  }
  
  // 测试认证功能
  console.log('\n🔐 测试认证功能:')
  
  // 尝试获取当前用户（应该为null，因为未登录）
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError) {
    console.log(`❌ 认证服务错误: ${authError.message}`)
  } else {
    console.log('✅ 认证服务正常')
    console.log(`   当前用户状态: ${user ? '已登录' : '未登录（正常）'}`)
  }
  
  // 测试用户表访问
  console.log('\n👥 测试用户表访问:')
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id')
    .limit(1)
  
  if (userError) {
    console.log(`❌ 用户表访问失败: ${userError.message}`)
  } else {
    console.log('✅ 用户表访问成功')
    console.log(`   用户数据: ${users?.length || 0} 条`)
  }
  
} catch (error) {
  console.log(`❌ 连接测试失败: ${error.message}`)
}

// 3. 生成诊断报告
console.log('\n📊 诊断报告:')
console.log('=' .repeat(50))

if (supabaseUrl && supabaseAnonKey) {
  console.log('\n✅ 基础配置完整')
  console.log('\n🔧 如果仍然无法登录，请检查:')
  console.log('   1. Vercel环境变量是否正确设置')
  console.log('   2. Supabase项目中的域名配置')
  console.log('   3. 浏览器控制台的错误信息')
  console.log('\n📖 详细排查步骤请参考: docs/登录问题排查指南.md')
} else {
  console.log('\n❌ 配置不完整，请先完成环境变量设置')
}

// 4. 提供Vercel环境变量配置命令
console.log('\n🚀 Vercel环境变量配置命令:')
console.log('=' .repeat(50))
console.log('vercel env add VITE_SUPABASE_URL')
console.log(`输入值: ${supabaseUrl}`)
console.log('\nvercel env add VITE_SUPABASE_ANON_KEY')
console.log(`输入值: ${supabaseAnonKey}`)
console.log('\nvercel env add VITE_SUPABASE_SERVICE_ROLE_KEY')
console.log(`输入值: ${supabaseServiceKey}`)
console.log('\n然后执行: vercel --prod')

console.log('\n🎯 配置完成后，请访问你的Vercel部署链接测试登录功能')