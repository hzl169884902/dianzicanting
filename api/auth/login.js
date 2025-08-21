/**
 * Vercel Serverless Function: /api/auth/login
 * User login endpoint
 */

// Test users for demo
const testUsers = [
  {
    id: 1,
    username: '18171629175',
    password: '123456',
    name: '测试用户1',
    email: 'test1@example.com'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    name: '管理员',
    email: 'admin@example.com'
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST for login.'
    });
    return;
  }

  try {
    const { username, password } = req.body;
      
    // Basic validation
    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: '用户名和密码都是必填项'
      });
      return;
    }
    
    // Find user
    const user = testUsers.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      // Login successful
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json({
        success: true,
        message: '登录成功',
        user: userWithoutPassword,
        session: {
          token: `mock_token_${user.id}_${Date.now()}`,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      });
      return;
    } else {
      // Login failed
      res.status(401).json({
        success: false,
        error: '用户名或密码错误'
      });
      return;
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
    return;
  }
}