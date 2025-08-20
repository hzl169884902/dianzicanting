/**
 * This is a user authentication API route demo.
 * Handle user registration, login, token management, etc.
 */
import { Router, type Request, type Response } from 'express';


const router = Router();

/**
 * User Register
 * POST /api/auth/register
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    // 基本验证
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        error: '邮箱、密码和姓名都是必填项'
      });
      return;
    }
    
    // 模拟注册成功
    res.status(201).json({
      success: true,
      message: '注册成功',
      user: {
        id: `user_${Date.now()}`,
        email,
        name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '注册失败'
    });
  }
});

/**
 * User Login
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;
    const loginField = email || username;
    
    // 基本验证
    if (!loginField || !password) {
      res.status(400).json({
        success: false,
        error: '用户名/邮箱和密码都是必填项'
      });
      return;
    }
    
    // 定义测试用户数据
    const testUsers = {
      '18171629175': { name: '胡至伦', email: '18171629175@example.com' },
      '17673903508': { name: '张淼', email: '17673903508@example.com' },
      '13545510002': { name: '姜三霞', email: '13545510002@example.com' },
      '13545549595': { name: '胡浩', email: '13545549595@example.com' },
      'test@example.com': { name: '测试用户', email: 'test@example.com' }
    };
    
    // 验证测试账号
    const user = testUsers[loginField as keyof typeof testUsers];
    if (!user) {
      res.status(401).json({
        success: false,
        error: '用户名或密码错误'
      });
      return;
    }
    
    // 验证密码（所有测试账号密码都是123456）
    if (password !== '123456') {
      res.status(401).json({
        success: false,
        error: '用户名或密码错误'
      });
      return;
    }
    
    // 模拟登录成功
    res.status(200).json({
      success: true,
      message: '登录成功',
      user: {
        id: `user_${Date.now()}`,
        email: user.email,
        name: user.name,
        username: loginField
      },
      token: `token_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '登录失败'
    });
  }
});

/**
 * User Logout
 * POST /api/auth/logout
 */
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: '登出成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '登出失败'
    });
  }
});

/**
 * Get User Profile
 * GET /api/auth/profile
 */
router.get('/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: '未提供有效的认证令牌'
      });
      return;
    }

    const token = authHeader.substring(7);
    
    // 定义测试用户档案数据
    const userProfiles = {
      '18171629175': {
        id: 'user_18171629175',
        email: '18171629175@example.com',
        name: '胡至伦',
        phone: '18171629175'
      },
      '17673903508': {
        id: 'user_17673903508',
        email: '17673903508@example.com',
        name: '张淼',
        phone: '17673903508'
      },
      '13545510002': {
        id: 'user_13545510002',
        email: '13545510002@example.com',
        name: '姜三霞',
        phone: '13545510002'
      },
      '13545549595': {
        id: 'user_13545549595',
        email: '13545549595@example.com',
        name: '胡浩',
        phone: '13545549595'
      },
      'test@example.com': {
        id: 'user_test',
        email: 'test@example.com',
        name: '测试用户',
        phone: '18171629175'
      }
    };
    
    // 从token中提取用户信息（简化处理）
    // 在实际应用中应该从数据库查询
    const defaultProfile = userProfiles['18171629175']; // 默认使用第一个用户
    
    const mockProfile = {
      ...defaultProfile,
      avatar_url: null,
      phone_verified: true,
      qq_openid: null,
      wechat_openid: null,
      two_factor_enabled: false,
      plan: 'free' as const,
      preferences: {
        dietType: '均衡饮食',
        allergies: [],
        goals: ['健康饮食'],
        notifications: true
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      profile: mockProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取用户档案失败'
    });
  }
});

/**
 * QQ Login
 * POST /api/auth/qq
 */
router.post('/qq', async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.body;
    
    // 模拟QQ登录成功
    res.status(200).json({
      success: true,
      message: 'QQ登录成功',
      user: {
        id: `qq_user_${Date.now()}`,
        email: 'qq_user@example.com',
        name: 'QQ用户',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=123456&s=100'
      },
      token: `qq_token_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'QQ登录失败'
    });
  }
});

/**
 * WeChat Login
 * POST /api/auth/wechat
 */
router.post('/wechat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.body;
    
    // 模拟微信登录成功
    res.status(200).json({
      success: true,
      message: '微信登录成功',
      user: {
        id: `wechat_user_${Date.now()}`,
        email: 'wechat_user@example.com',
        name: '微信用户',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLL1byctY955FrMQueH2c4kxqtdeYtTRi1MS4ib4IkjicC9pJZmWqhAp2e7WI8JmqIb1RG4iaTDywJJw/132'
      },
      token: `wechat_token_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '微信登录失败'
    });
  }
});

export default router;