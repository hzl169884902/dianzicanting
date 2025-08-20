console.log('🚀 测试脚本开始...');

try {
  console.log('📦 导入 dotenv...');
  const dotenv = await import('dotenv');
  console.log('✅ dotenv 导入成功');
  
  console.log('⚙️ 配置环境变量...');
  dotenv.config();
  console.log('✅ 环境变量配置完成');
  
  console.log('🔑 检查环境变量:');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '已设置' : '未设置');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '已设置' : '未设置');
  
  console.log('📦 导入 Supabase 客户端...');
  const { createClient } = await import('@supabase/supabase-js');
  console.log('✅ Supabase 客户端导入成功');
  
  console.log('🔗 创建 Supabase 连接...');
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  console.log('✅ Supabase 连接创建成功');
  
  console.log('🧪 测试数据库连接...');
  const { data, error } = await supabase
    .from('dishes')
    .select('count')
    .limit(1);
  
  if (error) {
    console.error('❌ 数据库连接测试失败:', error);
  } else {
    console.log('✅ 数据库连接测试成功');
    console.log('🎉 所有测试通过!');
  }
  
} catch (error) {
  console.error('❌ 测试过程中出现错误:', error.message);
  console.error('完整错误:', error);
}

console.log('🏁 测试脚本结束');