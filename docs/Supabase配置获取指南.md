# Supabase配置获取指南

本指南将详细说明如何获取电子餐厅项目所需的三个Supabase配置信息。

## 所需配置信息

```env
VITE_SUPABASE_URL=你的Supabase项目URL
VITE_SUPABASE_ANON_KEY=你的Supabase匿名密钥
VITE_SUPABASE_SERVICE_ROLE_KEY=你的Supabase服务角色密钥
```

## 获取步骤

### 1. 登录Supabase控制台

1. 访问 [Supabase官网](https://supabase.com/)
2. 点击右上角的 "Sign in" 登录
3. 如果没有账号，点击 "Sign up" 注册新账号

### 2. 创建或选择项目

#### 创建新项目（如果还没有项目）：
1. 登录后，点击 "New project"
2. 选择组织（Organization）
3. 填写项目信息：
   - **Name**: 例如 "dianzicanting" 或 "e-restaurant"
   - **Database Password**: 设置一个强密码（请记住这个密码）
   - **Region**: 选择离你最近的区域（推荐选择 "Southeast Asia (Singapore)"）
4. 点击 "Create new project"
5. 等待项目创建完成（通常需要1-2分钟）

#### 选择现有项目：
1. 在控制台首页，点击你要使用的项目

### 3. 获取配置信息

项目创建完成后，按以下步骤获取配置：

#### 步骤1：进入项目设置
1. 在项目控制台左侧菜单中，点击 "Settings"（设置）
2. 在设置菜单中，点击 "API"

#### 步骤2：获取URL和密钥
在API设置页面，你会看到以下信息：

**1. Project URL（项目URL）**
- 位置："Project URL" 部分
- 格式：`https://你的项目ID.supabase.co`
- 这就是 `VITE_SUPABASE_URL` 的值

**2. API Keys（API密钥）**
- **anon public（匿名公钥）**：
  - 位置："Project API keys" 部分的 "anon public" 行
  - 这就是 `VITE_SUPABASE_ANON_KEY` 的值
  - 点击右侧的复制图标复制密钥

- **service_role（服务角色密钥）**：
  - 位置："Project API keys" 部分的 "service_role" 行
  - 这就是 `VITE_SUPABASE_SERVICE_ROLE_KEY` 的值
  - ⚠️ **重要**：这是敏感信息，只在服务器端使用
  - 点击右侧的复制图标复制密钥

### 4. 配置环境变量

#### 本地开发环境：
1. 在项目根目录创建 `.env` 文件（如果不存在）
2. 添加以下内容：

```env
VITE_SUPABASE_URL=https://你的项目ID.supabase.co
VITE_SUPABASE_ANON_KEY=你复制的anon密钥
VITE_SUPABASE_SERVICE_ROLE_KEY=你复制的service_role密钥
```

#### 生产环境：
1. 在项目根目录创建 `.env.production` 文件
2. 添加相同的配置内容

### 5. 验证配置

配置完成后，可以通过以下方式验证：

1. **检查环境变量**：
   ```bash
   npm run dev
   ```
   启动开发服务器，如果没有报错，说明配置正确

2. **测试数据库连接**：
   - 访问 `http://localhost:5173`
   - 尝试注册或登录功能
   - 如果能正常使用，说明配置成功

## 常见问题

### Q1: 找不到API设置页面？
**A**: 确保你已经选择了正确的项目，然后在左侧菜单中找到 "Settings" → "API"。

### Q2: 密钥复制后不工作？
**A**: 
- 检查密钥是否完整复制（没有多余的空格或换行）
- 确保使用的是正确的密钥类型
- 重启开发服务器

### Q3: 项目URL格式不对？
**A**: 正确格式应该是 `https://项目ID.supabase.co`，不要添加额外的路径。

### Q4: service_role密钥安全吗？
**A**: 
- 这个密钥具有管理员权限，非常敏感
- 只在服务器端使用，不要暴露在客户端代码中
- 不要提交到公开的代码仓库
- 在生产环境中使用环境变量管理

## 安全提醒

⚠️ **重要安全提醒**：
1. 不要将 `.env` 文件提交到Git仓库
2. `service_role` 密钥具有完全访问权限，请妥善保管
3. 在生产环境中，建议使用更细粒度的权限控制
4. 定期轮换API密钥以提高安全性

## 下一步

配置完成后，你可以：
1. 运行 `npm run dev` 启动开发服务器
2. 测试用户注册和登录功能
3. 查看Supabase控制台中的数据表
4. 继续开发其他功能

如果遇到问题，请检查控制台错误信息或参考 [Supabase官方文档](https://supabase.com/docs)。