# 🚀 Supabase域名配置 - dianzicanting520.vercel.app

## 📋 配置清单

### ✅ 第一步：登录Supabase控制台
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的电子餐厅项目
3. 点击左侧菜单 **Authentication** → **Settings**

### ✅ 第二步：配置Site URL
在 **Site URL** 字段中输入：
```
https://dianzicanting520.vercel.app
```

### ✅ 第三步：配置Redirect URLs
在 **Redirect URLs** 字段中添加以下4个URL（每行一个）：

```
https://dianzicanting520.vercel.app
https://dianzicanting520.vercel.app/**
https://dianzicanting520.vercel.app/login
https://dianzicanting520.vercel.app/register
```

### ✅ 第四步：保存配置
1. 点击页面底部的 **Save** 按钮
2. 等待配置生效（通常需要1-2分钟）

## 🔍 配置验证

### 方法1：直接测试
1. 访问你的网站：https://dianzicanting520.vercel.app
2. 尝试注册新用户
3. 尝试登录现有用户
4. 如果能正常登录，说明配置成功

### 方法2：检查控制台
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页
3. 如果没有CORS相关错误，说明配置正确

## ⚠️ 常见问题

### 问题1：仍然无法登录
**解决方案**：
- 清除浏览器缓存和Cookie
- 等待5-10分钟让配置完全生效
- 检查URL是否完全匹配（包括https://）

### 问题2：CORS错误
**解决方案**：
- 确认已添加通配符URL：`https://dianzicanting520.vercel.app/**`
- 检查所有URL都使用https协议

### 问题3：重定向失败
**解决方案**：
- 确认已添加所有必要的重定向URL
- 检查URL拼写是否正确

## 📞 需要帮助？

如果按照上述步骤配置后仍然无法登录，请提供以下信息：
1. 浏览器控制台的错误信息截图
2. Supabase配置页面的截图
3. 具体的错误现象描述

---

**配置完成后，你的网站应该能够正常处理用户登录和注册功能！** 🎉