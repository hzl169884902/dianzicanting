# QQ和微信API登录集成指南

本文档详细介绍如何在电子餐厅应用中集成QQ和微信第三方登录功能，包括从注册开发者账号到完整实现的全流程。每个步骤都提供详细的操作指引、截图说明和代码示例。

## 目录

1. [前期准备](#前期准备)
2. [QQ登录集成](#qq登录集成)
3. [微信登录集成](#微信登录集成)
4. [代码实现](#代码实现)
5. [测试与调试](#测试与调试)
6. [常见问题](#常见问题)
7. [安全注意事项](#安全注意事项)
8. [部署指南](#部署指南)

---

## 前期准备

### 1. 技术栈确认

在开始集成之前，请确认您的技术栈：
- **前端**：React + TypeScript + Vite
- **后端**：Supabase (Edge Functions)
- **状态管理**：Zustand
- **路由**：React Router
- **UI框架**：Tailwind CSS

### 2. 域名准备

#### 2.1 开发环境
- 本地开发：`http://localhost:5173`
- 如需外网访问，推荐使用 ngrok：
  ```bash
  # 安装 ngrok
  npm install -g ngrok
  
  # 启动隧道
  ngrok http 5173
  ```

#### 2.2 生产环境
- 准备已备案的域名（如：`https://yourapp.com`）
- 确保域名已配置SSL证书
- 确保域名可以正常访问

### 3. 必要文件准备

#### 3.1 身份证明文件
- **个人开发者**：身份证正反面照片
- **企业开发者**：营业执照、法人身份证

#### 3.2 应用资料
- 应用图标（建议尺寸：120x120px，PNG格式）
- 应用截图（至少3张，展示主要功能）
- 应用介绍文档
- 隐私政策和用户协议

---

## QQ登录集成

### 1. 注册QQ开放平台账号

#### 1.1 访问QQ开放平台
1. 打开浏览器，访问：https://connect.qq.com/
2. 页面加载完成后，您会看到QQ互联的首页
3. 点击页面右上角的「登录」按钮
4. 在弹出的登录窗口中：
   - 输入您的QQ号码和密码
   - 或者使用QQ扫码登录
   - 完成安全验证（如需要）

#### 1.2 开发者认证详细流程

##### 步骤1：进入管理中心
1. 登录成功后，点击页面顶部的「管理中心」
2. 如果是首次使用，系统会提示您进行开发者认证

##### 步骤2：选择认证类型
1. **个人开发者认证**（推荐新手）：
   - 点击「个人开发者」
   - 认证费用：免费
   - 认证时间：1-3个工作日
   - 所需材料：身份证正反面照片

2. **企业开发者认证**：
   - 点击「企业开发者」
   - 认证费用：300元/年
   - 认证时间：3-7个工作日
   - 所需材料：营业执照、法人身份证、企业对公账户

##### 步骤3：填写认证信息
**个人开发者填写内容**：
```
真实姓名：[与身份证一致]
身份证号：[18位身份证号码]
手机号码：[常用手机号，用于接收审核通知]
邮箱地址：[常用邮箱，用于接收重要通知]
联系地址：[详细地址，精确到门牌号]
身份证正面：[清晰照片，四角完整，信息清楚]
身份证反面：[清晰照片，四角完整，信息清楚]
```

**企业开发者填写内容**：
```
企业名称：[与营业执照一致]
统一社会信用代码：[18位代码]
法人姓名：[与营业执照一致]
法人身份证号：[18位身份证号码]
企业联系人：[负责对接的人员]
联系电话：[企业座机或负责人手机]
邮箱地址：[企业邮箱或负责人邮箱]
企业地址：[营业执照上的注册地址]
营业执照：[清晰扫描件或照片]
法人身份证：[正反面清晰照片]
```

##### 步骤4：提交审核
1. 仔细检查所有信息是否正确
2. 确认无误后点击「提交审核」
3. 系统会显示「审核中」状态
4. 等待审核结果（通过短信和邮件通知）

#### 1.3 创建应用详细步骤

##### 步骤1：进入应用管理
1. 认证通过后，在管理中心点击「应用管理」
2. 点击「创建应用」按钮

##### 步骤2：选择应用类型
1. 在应用类型选择页面，点击「网站应用」
2. 阅读并同意相关协议

##### 步骤3：填写应用基本信息
```
应用名称：电子餐厅
应用英文名称：Electronic Restaurant
应用简介：智能餐厅管理系统，提供在线点餐、营养分析、个性化推荐等功能
应用详细描述：
本应用是一个综合性的餐厅管理平台，主要功能包括：
1. 用户注册登录系统
2. 菜品浏览和搜索
3. 在线点餐和支付
4. 营养成分分析
5. 个性化菜品推荐
6. 用户评价和反馈
7. 餐厅数据统计和分析

应用官网：https://yourapp.com（如果暂无域名，可填写 http://localhost:5173）
应用类型：网站应用
应用分类：生活服务 > 美食
```

##### 步骤4：上传应用资料
1. **应用图标**：
   - 尺寸要求：120x120像素
   - 格式要求：PNG、JPG
   - 设计建议：简洁明了，体现餐厅特色

2. **应用截图**（至少3张）：
   - 首页截图：展示应用主界面
   - 功能截图：展示核心功能（如菜品浏览、点餐流程）
   - 用户界面截图：展示用户个人中心

##### 步骤5：提交应用审核
1. 检查所有信息是否完整准确
2. 点击「提交审核」
3. 审核时间：3-7个工作日
4. 审核期间可在「应用管理」中查看审核状态

#### 1.4 配置回调地址详细说明

##### 步骤1：找到网站地址设置
1. 应用审核通过后，进入应用详情页
2. 在左侧菜单中找到「网站地址」或「回调地址」设置
3. 点击进入配置页面

##### 步骤2：添加回调URL
**开发环境配置**：
```
URL：http://localhost:5173/auth/callback/qq
描述：本地开发环境回调地址
```

**生产环境配置**：
```
URL：https://yourapp.com/auth/callback/qq
描述：生产环境回调地址
```

**注意事项**：
- 回调地址必须与代码中配置的完全一致
- 协议（http/https）必须匹配
- 端口号必须正确
- 路径必须准确（区分大小写）

##### 步骤3：保存配置
1. 点击「添加」按钮
2. 确认回调地址已成功添加
3. 点击「保存」按钮

#### 1.5 获取应用凭证详细步骤

##### 步骤1：查看应用详情
1. 在应用管理页面，点击您的应用名称
2. 进入应用详情页面

##### 步骤2：获取关键信息
在应用详情页面，您可以看到：

```
APP ID：1234567890
（这是您应用的唯一标识，用于API调用）

APP Key：abcdef1234567890abcdef1234567890
（这是应用密钥，用于服务端验证，请妥善保管）

创建时间：2025-01-20 10:30:00
应用状态：已上线
```

##### 步骤3：安全保存凭证
1. **复制APP ID和APP Key**
2. **保存到安全位置**（如密码管理器）
3. **不要在前端代码中暴露APP Key**
4. **定期更换密钥**（建议每6个月更换一次）

### 2. QQ登录流程

#### 2.1 授权流程图
```
用户点击QQ登录 → 跳转到QQ授权页面 → 用户授权 → 获取授权码 → 换取Access Token → 获取用户信息 → 完成登录
```

#### 2.2 技术参数
- **授权URL**：`https://graph.qq.com/oauth2.0/authorize`
- **Token URL**：`https://graph.qq.com/oauth2.0/token`
- **用户信息URL**：`https://graph.qq.com/user/get_user_info`

---

## 微信登录集成

### 1. 注册微信开放平台账号

#### 1.1 访问微信开放平台详细步骤
1. 打开浏览器，访问：https://open.weixin.qq.com/
2. 页面加载完成后，您会看到微信开放平台首页
3. 点击页面右上角的「登录」按钮
4. 使用微信扫码登录：
   - 打开手机微信
   - 点击右上角「+」→「扫一扫」
   - 扫描页面上的二维码
   - 在手机上确认登录

#### 1.2 开发者认证详细流程

##### 步骤1：进入账号中心
1. 登录成功后，点击页面顶部的「账号中心」
2. 在左侧菜单中找到「开发者资质认证」
3. 点击进入认证页面

##### 步骤2：选择认证类型
**重要提醒**：微信开放平台的个人开发者和企业开发者都需要支付300元认证费用

1. **个人开发者认证**：
   - 点击「个人开发者认证」
   - 认证费用：300元（每年）
   - 认证时间：1-7个工作日
   - 所需材料：身份证正反面照片、手持身份证照片
   - 适用场景：个人项目、学习测试

2. **企业开发者认证**（推荐商业项目）：
   - 点击「企业开发者认证」
   - 认证费用：300元（每年）
   - 认证时间：3-7个工作日
   - 所需材料：营业执照、法人身份证、企业对公账户
   - 适用场景：商业项目、正式运营

##### 步骤3：填写认证信息
**个人开发者填写内容**：
```
真实姓名：[与身份证完全一致]
身份证号：[18位身份证号码]
手机号码：[实名认证的手机号]
邮箱地址：[常用邮箱，用于接收重要通知]
联系地址：[身份证上的地址或常住地址]
身份证正面照片：[清晰照片，四角完整，字迹清楚]
身份证反面照片：[清晰照片，四角完整，字迹清楚]
手持身份证照片：[本人手持身份证正面照片，脸部和证件信息都要清晰]
```

**企业开发者填写内容**：
```
企业名称：[与营业执照完全一致]
统一社会信用代码：[营业执照上的18位代码]
法人姓名：[与营业执照一致]
法人身份证号：[法人18位身份证号码]
企业联系人：[负责对接微信开放平台的人员]
联系人手机：[联系人实名认证手机号]
联系人邮箱：[企业邮箱或联系人邮箱]
企业注册地址：[营业执照上的注册地址]
营业执照扫描件：[清晰的营业执照扫描件或照片]
法人身份证正面：[清晰照片]
法人身份证反面：[清晰照片]
企业对公账户信息：[开户行、账号等信息]
```

##### 步骤4：支付认证费用
1. 填写完认证信息后，点击「提交认证」
2. 系统会生成支付订单（300元）
3. 选择支付方式：
   - 微信支付（推荐）
   - 银行转账
4. 完成支付后，系统开始审核

##### 步骤5：等待审核结果
1. 审核时间：1-7个工作日
2. 审核状态查询：在「账号中心」→「开发者资质认证」中查看
3. 审核结果通知：通过邮件和微信消息通知

#### 1.3 创建网站应用详细步骤

##### 步骤1：进入应用管理
1. 认证通过后，点击页面顶部的「管理中心」
2. 在左侧菜单中找到「网站应用」
3. 点击「创建网站应用」按钮

##### 步骤2：填写应用基本信息
```
应用名称：电子餐厅
应用英文名称：Electronic Restaurant
应用简介：智能餐厅管理系统，提供在线点餐、营养分析、个性化推荐等功能
应用详细介绍：
电子餐厅是一个综合性的智能餐厅管理平台，致力于为用户提供便捷的用餐体验。
主要功能包括：
• 用户注册登录系统，支持多种登录方式
• 丰富的菜品浏览和智能搜索功能
• 便捷的在线点餐和支付系统
• 详细的营养成分分析和健康建议
• 基于用户偏好的个性化菜品推荐
• 用户评价和反馈系统
• 完善的餐厅数据统计和分析功能

应用官网：https://yourapp.com
应用分类：生活服务
```

##### 步骤3：上传应用资料
1. **应用图标**：
   - 尺寸要求：120x120像素
   - 格式要求：PNG、JPG（建议PNG）
   - 文件大小：不超过300KB
   - 设计要求：简洁明了，体现应用特色
   - 注意事项：不能包含微信相关元素

2. **应用截图**（必须上传至少3张）：
   - 首页截图：展示应用主界面和核心功能
   - 功能截图：展示菜品浏览、点餐等核心功能
   - 用户中心截图：展示个人信息、订单等页面
   - 图片要求：清晰度高，尺寸建议1080x1920

##### 步骤4：配置应用域名
```
应用域名：yourapp.com
备注：这里填写您的应用实际域名，不需要协议前缀
```

##### 步骤5：提交应用审核
1. 仔细检查所有信息是否准确
2. 确认应用截图清晰且功能完整
3. 点击「提交审核」按钮
4. 审核时间：3-7个工作日
5. 可在「网站应用」页面查看审核进度

#### 1.4 配置授权回调域详细说明

##### 步骤1：进入应用详情
1. 应用审核通过后，在「网站应用」列表中找到您的应用
2. 点击应用名称进入详情页面
3. 在左侧菜单中找到「开发信息」

##### 步骤2：设置授权回调域
**重要提醒**：微信的授权回调域不需要包含协议前缀（http://或https://）

**开发环境配置**：
```
授权回调域：localhost:5173
说明：本地开发环境域名
```

**生产环境配置**：
```
授权回调域：yourapp.com
说明：生产环境域名
```

**配置注意事项**：
- 不要包含http://或https://前缀
- 不要包含路径部分（如/auth/callback）
- 端口号需要明确指定（开发环境）
- 支持添加多个回调域（用换行分隔）

##### 步骤3：保存配置
1. 输入完回调域后，点击「确定」
2. 系统会验证域名格式
3. 验证通过后，配置立即生效

#### 1.5 获取应用凭证详细步骤

##### 步骤1：查看开发信息
1. 在应用详情页面，点击「开发信息」
2. 在页面中可以看到应用的基本信息

##### 步骤2：获取关键凭证
在开发信息页面，您可以看到：

```
AppID：wx1234567890abcdef
（应用唯一标识，用于前端调用微信API）

AppSecret：abcdef1234567890abcdef1234567890ab
（应用密钥，用于服务端获取access_token，请妥善保管）

创建时间：2025-01-20 14:30:00
应用状态：已上线
授权回调域：yourapp.com
```

##### 步骤3：安全管理凭证
1. **立即复制并保存AppID和AppSecret**
2. **将凭证保存到安全的地方**（如企业密码管理器）
3. **严禁在前端代码中暴露AppSecret**
4. **定期更换AppSecret**（建议每3-6个月更换一次）
5. **设置IP白名单**（如果微信支持的话）

##### 步骤4：测试凭证有效性
可以通过以下API测试凭证是否有效：
```bash
# 测试AppID和AppSecret
curl "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=YOUR_APPID&secret=YOUR_APPSECRET"
```

如果返回包含access_token的JSON，说明凭证有效。

### 2. 微信登录流程

#### 2.1 授权流程图
```
用户点击微信登录 → 跳转到微信授权页面 → 用户授权 → 获取授权码 → 换取Access Token → 获取用户信息 → 完成登录
```

#### 2.2 技术参数
- **授权URL**：`https://open.weixin.qq.com/connect/qrconnect`
- **Token URL**：`https://api.weixin.qq.com/sns/oauth2/access_token`
- **用户信息URL**：`https://api.weixin.qq.com/sns/userinfo`

---

## 代码实现

### 1. 环境变量配置

在项目根目录创建 `.env.local` 文件：

```env
# QQ登录配置
VITE_QQ_APP_ID=你的QQ_APP_ID
VITE_QQ_APP_KEY=你的QQ_APP_KEY
VITE_QQ_REDIRECT_URI=http://localhost:5173/auth/callback/qq

# 微信登录配置
VITE_WECHAT_APP_ID=你的微信AppID
VITE_WECHAT_APP_SECRET=你的微信AppSecret
VITE_WECHAT_REDIRECT_URI=http://localhost:5173/auth/callback/wechat

# 生产环境请修改为实际域名
```

### 2. 前端实现

#### 2.1 QQ登录按钮

```typescript
// src/components/QQLogin.tsx
import React from 'react';
import { useAuthStore } from '../store/auth';

const QQLogin: React.FC = () => {
  const { getQQLoginUrl } = useAuthStore();

  const handleQQLogin = async () => {
    const result = await getQQLoginUrl();
    if (result.success && result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <button
      onClick={handleQQLogin}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <img src="/qq-icon.png" alt="QQ" className="w-5 h-5 mr-2" />
      QQ扫码登录
    </button>
  );
};

export default QQLogin;
```

#### 2.2 微信登录按钮

```typescript
// src/components/WechatLogin.tsx
import React from 'react';
import { useAuthStore } from '../store/auth';

const WechatLogin: React.FC = () => {
  const { getWechatLoginUrl } = useAuthStore();

  const handleWechatLogin = async () => {
    const result = await getWechatLoginUrl();
    if (result.success && result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <button
      onClick={handleWechatLogin}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <img src="/wechat-icon.png" alt="微信" className="w-5 h-5 mr-2" />
      微信扫码登录
    </button>
  );
};

export default WechatLogin;
```

#### 2.3 回调页面处理

```typescript
// src/pages/AuthCallback.tsx
import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { toast } from 'sonner';

const AuthCallback: React.FC = () => {
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithQQ, signInWithWechat } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code) {
        toast.error('授权失败：未获取到授权码');
        navigate('/login');
        return;
      }

      try {
        let result;
        if (provider === 'qq') {
          result = await signInWithQQ(code, state || '');
        } else if (provider === 'wechat') {
          result = await signInWithWechat(code, state || '');
        } else {
          throw new Error('不支持的登录方式');
        }

        if (result.success) {
          toast.success('登录成功');
          navigate('/dashboard');
        } else {
          toast.error(result.error || '登录失败');
          navigate('/login');
        }
      } catch (error) {
        console.error('登录回调处理失败:', error);
        toast.error('登录处理失败');
        navigate('/login');
      }
    };

    handleCallback();
  }, [provider, searchParams, navigate, signInWithQQ, signInWithWechat]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">正在处理登录...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
```

### 3. 后端实现（Supabase Edge Functions）

#### 3.1 QQ登录处理

```typescript
// supabase/functions/auth-qq/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    
    // 1. 使用授权码换取Access Token
    const tokenResponse = await fetch('https://graph.qq.com/oauth2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: Deno.env.get('QQ_APP_ID')!,
        client_secret: Deno.env.get('QQ_APP_KEY')!,
        code: code,
        redirect_uri: Deno.env.get('QQ_REDIRECT_URI')!,
      }),
    });

    const tokenText = await tokenResponse.text();
    const tokenParams = new URLSearchParams(tokenText);
    const accessToken = tokenParams.get('access_token');

    if (!accessToken) {
      throw new Error('获取Access Token失败');
    }

    // 2. 获取OpenID
    const openidResponse = await fetch(`https://graph.qq.com/oauth2.0/me?access_token=${accessToken}`);
    const openidText = await openidResponse.text();
    const openidMatch = openidText.match(/"openid":"([^"]+)"/);
    const openid = openidMatch ? openidMatch[1] : null;

    if (!openid) {
      throw new Error('获取OpenID失败');
    }

    // 3. 获取用户信息
    const userInfoResponse = await fetch(
      `https://graph.qq.com/user/get_user_info?access_token=${accessToken}&oauth_consumer_key=${Deno.env.get('QQ_APP_ID')}&openid=${openid}`
    );
    const userInfo = await userInfoResponse.json();

    if (userInfo.ret !== 0) {
      throw new Error('获取用户信息失败');
    }

    // 4. 创建或更新用户
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const email = `qq_${openid}@temp.com`; // QQ登录没有邮箱，使用临时邮箱
    
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: Math.random().toString(36),
      email_confirm: true,
      user_metadata: {
        provider: 'qq',
        qq_openid: openid,
        name: userInfo.nickname,
        avatar_url: userInfo.figureurl_qq_2 || userInfo.figureurl_qq_1,
      },
    });

    if (authError && !authError.message.includes('already registered')) {
      throw authError;
    }

    // 5. 生成JWT Token
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (sessionError) {
      throw sessionError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: authData?.user,
        session: sessionData,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
```

#### 3.2 微信登录处理

```typescript
// supabase/functions/auth-wechat/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    
    // 1. 使用授权码换取Access Token
    const tokenResponse = await fetch('https://api.weixin.qq.com/sns/oauth2/access_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${Deno.env.get('WECHAT_APP_ID')}&secret=${Deno.env.get('WECHAT_APP_SECRET')}&code=${code}&grant_type=authorization_code`;
    
    const tokenResp = await fetch(tokenUrl);
    const tokenData = await tokenResp.json();

    if (tokenData.errcode) {
      throw new Error(`获取Access Token失败: ${tokenData.errmsg}`);
    }

    const { access_token, openid } = tokenData;

    // 2. 获取用户信息
    const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    const userInfoResponse = await fetch(userInfoUrl);
    const userInfo = await userInfoResponse.json();

    if (userInfo.errcode) {
      throw new Error(`获取用户信息失败: ${userInfo.errmsg}`);
    }

    // 3. 创建或更新用户
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const email = `wechat_${openid}@temp.com`; // 微信登录没有邮箱，使用临时邮箱
    
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: Math.random().toString(36),
      email_confirm: true,
      user_metadata: {
        provider: 'wechat',
        wechat_openid: openid,
        name: userInfo.nickname,
        avatar_url: userInfo.headimgurl,
      },
    });

    if (authError && !authError.message.includes('already registered')) {
      throw authError;
    }

    // 4. 生成JWT Token
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (sessionError) {
      throw sessionError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: authData?.user,
        session: sessionData,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
```

### 4. 路由配置

```typescript
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <Router>
      <Routes>
        {/* 其他路由 */}
        <Route path="/auth/callback/:provider" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 常见问题

### 1. QQ登录常见问题

#### Q: 提示"redirect_uri_mismatch"错误
**A**: 检查QQ开放平台中配置的回调地址是否与代码中的一致，注意协议（http/https）和端口号。

#### Q: 获取不到用户头像
**A**: QQ返回多个头像URL，按优先级使用：`figureurl_qq_2` > `figureurl_qq_1` > `figureurl`

#### Q: 应用审核不通过
**A**: 确保应用信息真实完整，网站能正常访问，功能描述清晰。

### 2. 微信登录常见问题

#### Q: 提示"invalid appid"错误
**A**: 检查AppID是否正确，确认应用已通过审核。

#### Q: 授权回调域配置错误
**A**: 微信的回调域不需要协议前缀，只需要域名，如：`yourapp.com`

#### Q: 获取用户信息失败
**A**: 确认scope参数包含`snsapi_userinfo`，且用户已授权获取基本信息。

### 3. 通用问题

#### Q: 本地开发如何测试？
**A**: 
1. 使用ngrok等工具将本地服务映射到公网域名
2. 在开放平台配置ngrok提供的域名作为回调地址
3. 修改环境变量中的回调地址

#### Q: 如何处理用户取消授权？
**A**: 在回调页面检查URL参数，如果包含`error=access_denied`，说明用户取消了授权。

#### Q: 如何实现账号绑定？
**A**: 
1. 用户已登录时，提供绑定QQ/微信的选项
2. 获取第三方平台的openid
3. 将openid保存到当前用户的profile中

---

## 安全注意事项

### 1. 密钥安全
- **永远不要**在前端代码中暴露APP_SECRET/APP_KEY
- 使用环境变量存储敏感信息
- 生产环境使用不同的密钥

### 2. 数据验证
- 验证回调中的state参数防止CSRF攻击
- 验证授权码的有效性
- 对用户输入进行严格验证

### 3. 错误处理
- 不要在错误信息中暴露敏感信息
- 记录详细的错误日志用于调试
- 为用户提供友好的错误提示

### 4. 会话管理
- 设置合理的会话过期时间
- 实现安全的登出机制
- 定期刷新访问令牌

---

## 部署清单

### 开发环境
- [ ] 注册QQ开放平台账号并创建应用
- [ ] 注册微信开放平台账号并创建应用
- [ ] 配置本地环境变量
- [ ] 实现前端登录组件
- [ ] 部署后端处理函数
- [ ] 测试登录流程

### 生产环境
- [ ] 更新回调地址为生产域名
- [ ] 配置生产环境变量
- [ ] 部署到生产服务器
- [ ] 配置HTTPS证书
- [ ] 进行完整测试
- [ ] 监控错误日志

---

## 技术支持

如果在集成过程中遇到问题，可以参考以下资源：

- **QQ登录官方文档**：https://wiki.connect.qq.com/
- **微信登录官方文档**：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
- **Supabase文档**：https://supabase.com/docs

---

*最后更新时间：2025年1月*