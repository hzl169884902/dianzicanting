# 🌐 Supabase域名配置指南

## 问题背景
部署到Vercel后无法登录的主要原因是**Supabase没有配置允许的域名**，导致CORS（跨域资源共享）错误。

## 🎯 解决方案：配置Supabase允许域名

### 步骤1：获取Vercel部署域名
✅ **你的域名已确认**：`dianzicanting520.vercel.app`

1. 登录 [Vercel控制台](https://vercel.com/dashboard)
2. 找到你的项目，复制部署域名
3. 你的具体域名：`https://dianzicanting520.vercel.app`

### 步骤2：配置Supabase域名
1. **登录Supabase控制台**
   - 访问：[https://supabase.com/dashboard](https://supabase.com/dashboard)
   - 选择你的项目

2. **进入认证设置**
   - 点击左侧菜单 "Authentication"
   - 选择 "URL Configuration"

3. **配置Site URL**
   ```
   Site URL: https://dianzicanting520.vercel.app
   ```
   
4. **配置Redirect URLs**
   添加以下URL（每行一个）：
   ```
   https://dianzicanting520.vercel.app
   https://dianzicanting520.vercel.app/**
   https://dianzicanting520.vercel.app/login
   https://dianzicanting520.vercel.app/register
   ```

5. **保存配置**
   - 点击 "Save" 按钮
   - 等待1-2分钟让配置生效

## 📸 详细配置截图说明

### 1. 找到Authentication设置
```
Supabase Dashboard
├── 选择你的项目
├── 左侧菜单：Authentication
└── 子菜单：URL Configuration
```

### 2. Site URL配置
```
字段名：Site URL
填入值：https://dianzicanting520.vercel.app
说明：这是你的主域名，用户登录后的默认跳转地址
```

### 3. Redirect URLs配置
```
字段名：Redirect URLs
填入值：
https://dianzicanting520.vercel.app
https://dianzicanting520.vercel.app/**
https://dianzicanting520.vercel.app/login
https://dianzicanting520.vercel.app/register

说明：这些是允许的重定向地址，** 表示允许所有子路径
```

## 🔧 高级配置（可选）

### 1. 添加自定义域名
如果你有自定义域名，也需要添加：
```
Site URL: https://你的域名.com

Redirect URLs:
https://你的域名.com
https://你的域名.com/**
```

### 2. 开发环境配置
为了本地开发，也可以添加：
```
Redirect URLs:
http://localhost:5173
http://localhost:5173/**
http://127.0.0.1:5173
http://127.0.0.1:5173/**
```

## ⚠️ 常见错误

### 错误1：忘记添加通配符
❌ 错误：`https://dianzicanting520.vercel.app`
✅ 正确：`https://dianzicanting520.vercel.app/**`

### 错误2：协议不匹配
❌ 错误：`http://dianzicanting520.vercel.app`（http）
✅ 正确：`https://dianzicanting520.vercel.app`（https）

### 错误3：域名拼写错误
❌ 错误：`https://dianzicanting520.vercel.com`（.com）
✅ 正确：`https://dianzicanting520.vercel.app`（.app）

## 🧪 验证配置

### 方法1：浏览器控制台检查
1. 打开你的Vercel网站
2. 按F12打开开发者工具
3. 尝试登录，查看Console标签
4. 如果没有CORS错误，说明配置成功

### 方法2：网络请求检查
1. 在开发者工具的Network标签中
2. 尝试登录，查看请求状态
3. 找到发送到supabase.co的请求
4. 状态码应该是200而不是403或404

## 📋 完整配置检查清单

- [ ] 已获取正确的Vercel部署域名
- [ ] 已登录Supabase控制台
- [ ] 已进入Authentication → URL Configuration
- [ ] Site URL已设置为Vercel域名
- [ ] Redirect URLs包含所有必要的地址
- [ ] 已保存配置并等待生效
- [ ] 已测试登录功能
- [ ] 浏览器控制台无CORS错误

## 🚨 紧急修复步骤

如果配置后仍然无法登录：

1. **清除浏览器缓存**
   - 按Ctrl+Shift+Delete
   - 清除所有缓存和Cookie

2. **等待配置生效**
   - Supabase配置需要1-2分钟生效
   - 可以尝试等待后再测试

3. **检查Vercel环境变量**
   - 确认环境变量正确设置
   - 重新部署项目

4. **重启Supabase项目**
   - 在Supabase控制台暂停并重启项目
   - 等待项目完全启动后测试

## 💡 最佳实践

1. **使用通配符**：总是在域名后添加`/**`
2. **协议一致**：确保使用https而不是http
3. **及时更新**：每次更换域名都要更新配置
4. **测试验证**：配置后立即测试登录功能
5. **备份配置**：记录所有配置的域名列表

---

🎯 **配置完成后，你的用户就可以正常登录了！**

如果仍有问题，请检查：
1. Vercel环境变量是否正确
2. 浏览器控制台的具体错误信息
3. 网络请求的详细状态