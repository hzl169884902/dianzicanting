import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Smartphone, QrCode } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { toast } from 'sonner';
import { uiLog } from '../utils/logger';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [smsCountdown, setSmsCountdown] = useState(0);
  const [localError, setLocalError] = useState('');
  const { signIn, error, sendSMSCode, verifySMSCode, getQQLoginUrl, getWechatLoginUrl, createDemoAccount, loading } = useAuthStore();
  const navigate = useNavigate();

  // 监听短信验证码显示事件
  useEffect(() => {
    const handleShowSMSCode = (event: CustomEvent) => {
      const { phone, code } = event.detail;
      uiLog.debug('收到SMS验证码显示事件', { phone, code });
      toast.success(`验证码已发送到 ${phone}`, {
        description: `验证码: ${code}`,
        duration: 8000,
      });
    };

    window.addEventListener('showSMSCode', handleShowSMSCode as EventListener);
    return () => {
      window.removeEventListener('showSMSCode', handleShowSMSCode as EventListener);
    };
  }, []);

  // 清除错误信息
  useEffect(() => {
    if (localError) {
      uiLog.debug('设置错误消息自动清除定时器', { error: localError });
      const timer = setTimeout(() => {
        setLocalError('');
        uiLog.debug('自动清除错误消息');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [localError]);
  // 邮箱登录处理
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    uiLog.info('用户尝试邮箱登录', { email });
    
    if (!email || !password) {
      const errorMessage = '请输入邮箱和密码';
      uiLog.warn('邮箱登录表单验证失败', { email, hasPassword: !!password });
      setLocalError(errorMessage);
      return;
    }

    setIsLoading(true);
    setLocalError('');
    
    try {
      const result = await signIn(email, password);
      if (result.success) {
        uiLog.info('邮箱登录成功', { email });
        toast.success('登录成功！');
        navigate('/');
      } else {
        uiLog.error('邮箱登录失败', { email, error: result.error });
        setLocalError(result.error || '登录失败');
        toast.error(result.error || '登录失败');
      }
    } catch (err) {
      console.error('登录失败:', err);
      const errorMsg = err instanceof Error ? err.message : '登录失败，请稍后重试';
      uiLog.error('邮箱登录异常', { email, error: errorMsg }, err instanceof Error ? err : undefined);
      setLocalError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 发送短信验证码
  const handleSendSMSCode = async () => {
    uiLog.info('用户尝试发送短信验证码', { phone });
    
    if (!phone) {
      const errorMessage = '请输入手机号码';
      uiLog.warn('短信验证码发送表单验证失败：缺少手机号');
      setLocalError(errorMessage);
      return;
    }
    
    // 简单的手机号格式验证
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      const errorMessage = '请输入正确的手机号码';
      uiLog.warn('短信验证码发送表单验证失败：手机号格式错误', { phone });
      setLocalError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    
    setIsLoading(true);
    setLocalError('');
    
    try {
      const result = await sendSMSCode(phone);
      if (result.success) {
        uiLog.info('短信验证码发送成功', { phone });
        setSmsCodeSent(true);
        setSmsCountdown(60);
        toast.success('验证码发送成功！');
        
        // 倒计时
        const timer = setInterval(() => {
          setSmsCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        uiLog.error('短信验证码发送失败', { phone, error: result.error });
        setLocalError(result.error || '发送验证码失败');
        toast.error(result.error || '发送验证码失败');
      }
    } catch (err) {
      console.error('发送验证码失败:', err);
      const errorMsg = err instanceof Error ? err.message : '发送验证码失败';
      uiLog.error('短信验证码发送异常', { phone, error: errorMsg }, err instanceof Error ? err : undefined);
      setLocalError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 手机号登录处理
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    uiLog.info('用户尝试手机号登录', { phone, hasSmsCode: !!smsCode });
    
    if (!phone || !smsCode) {
      const errorMessage = '请输入手机号和验证码';
      uiLog.warn('手机号登录表单验证失败', { phone, hasSmsCode: !!smsCode });
      setLocalError(errorMessage);
      return;
    }

    setIsLoading(true);
    setLocalError('');
    
    try {
      const result = await verifySMSCode(phone, smsCode);
      if (result.success) {
        uiLog.info('手机号登录成功', { phone });
        toast.success('验证成功，登录中...');
        navigate('/');
      } else {
        uiLog.error('手机号登录失败', { phone, error: result.error });
        setLocalError(result.error || '验证码错误');
        toast.error(result.error || '验证码错误');
      }
    } catch (err) {
      console.error('手机登录失败:', err);
      const errorMsg = err instanceof Error ? err.message : '验证失败，请重试';
      uiLog.error('手机号登录异常', { phone, error: errorMsg }, err instanceof Error ? err : undefined);
      setLocalError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // QQ登录
  const handleQQLogin = async () => {
    uiLog.info('用户尝试QQ登录');
    
    try {
      const result = await getQQLoginUrl();
      if (result.success && result.url) {
        uiLog.info('QQ登录URL获取成功，打开登录窗口');
        const popup = window.open(result.url, 'qq_login', 'width=600,height=400,scrollbars=yes,resizable=yes');
        if (!popup) {
          uiLog.warn('QQ登录弹窗被阻止');
          toast.error('请允许弹窗以完成QQ登录');
          return;
        }
        toast.info('请在弹出窗口中完成QQ登录');
      } else {
        uiLog.error('QQ登录URL获取失败', { error: result.error });
        setLocalError(result.error || 'QQ登录URL获取失败');
        toast.error(result.error || 'QQ登录URL获取失败');
      }
    } catch (err) {
      console.error('QQ登录失败:', err);
      const errorMsg = err instanceof Error ? err.message : 'QQ登录失败';
      uiLog.error('QQ登录异常', { error: errorMsg }, err instanceof Error ? err : undefined);
      setLocalError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // 微信登录
  const handleWeChatLogin = async () => {
    uiLog.info('用户尝试微信登录');
    
    try {
      const result = await getWechatLoginUrl();
      if (result.success && result.url) {
        uiLog.info('微信登录URL获取成功，打开登录窗口');
        const popup = window.open(result.url, 'wechat_login', 'width=600,height=400,scrollbars=yes,resizable=yes');
        if (!popup) {
          uiLog.warn('微信登录弹窗被阻止');
          toast.error('请允许弹窗以完成微信登录');
          return;
        }
        toast.info('请在弹出窗口中完成微信登录');
      } else {
        uiLog.error('微信登录URL获取失败', { error: result.error });
        setLocalError(result.error || '微信登录URL获取失败');
        toast.error(result.error || '微信登录URL获取失败');
      }
    } catch (err) {
      console.error('微信登录失败:', err);
      const errorMsg = err instanceof Error ? err.message : '微信登录失败';
      uiLog.error('微信登录异常', { error: errorMsg }, err instanceof Error ? err : undefined);
      setLocalError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // 创建演示账户
  const handleCreateDemoAccount = async () => {
    uiLog.info('用户尝试创建演示账户');
    
    setIsLoading(true);
    setLocalError('');
    
    try {
      const result = await createDemoAccount();
      if (result.success && result.email && result.password) {
        uiLog.info('演示账户创建成功', { email: result.email });
        // 自动填入演示账户信息
        setEmail(result.email);
        setPassword(result.password);
        setLoginMethod('email');
        
        toast.success('演示账户创建成功，正在自动登录...');
        
        // 自动登录演示账户
        setTimeout(async () => {
          const loginResult = await signIn(result.email!, result.password!);
          if (loginResult.success) {
            uiLog.info('演示账户自动登录成功', { email: result.email });
            toast.success('登录成功！');
            navigate('/');
          } else {
            uiLog.warn('演示账户自动登录失败', { email: result.email, error: loginResult.error });
            toast.error('自动登录失败，请手动登录');
          }
        }, 500);
      } else {
        uiLog.error('创建演示账户失败', { error: result.error });
        setLocalError(result.error || '创建演示账户失败');
        toast.error(result.error || '创建演示账户失败');
      }
    } catch (err) {
      console.error('创建演示账户失败:', err);
      const errorMsg = err instanceof Error ? err.message : '创建演示账户失败';
      uiLog.error('创建演示账户异常', { error: errorMsg }, err instanceof Error ? err : undefined);
      setLocalError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            欢迎回来
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            登录到您的账户
          </p>
        </div>

        {/* 登录方式切换 */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === 'email'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            邮箱登录
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === 'phone'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            手机登录
          </button>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          {/* 邮箱登录表单 */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  邮箱地址
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="请输入邮箱地址"
                  />
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  密码
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="请输入密码"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  忘记密码？
                </Link>
              </div>

              <button
                type="submit"
                disabled={(isLoading || loading) || !email || !password}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {(isLoading || loading) ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    登录中...
                  </div>
                ) : '登录'}
              </button>
            </form>
          )}

          {/* 手机登录表单 */}
          {loginMethod === 'phone' && (
            <form onSubmit={handlePhoneLogin} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  手机号码
                </label>
                <div className="mt-1 relative">
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="请输入手机号码"
                  />
                  <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="smsCode" className="block text-sm font-medium text-gray-700">
                  验证码
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    id="smsCode"
                    type="text"
                    required
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    className="flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="请输入验证码"
                  />
                  <button
                    type="button"
                    onClick={handleSendSMSCode}
                    disabled={(isLoading || loading) || !phone || smsCountdown > 0}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {smsCountdown > 0 ? `${smsCountdown}s` : smsCodeSent ? '重新发送' : '发送验证码'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={(isLoading || loading) || !phone || !smsCode}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {(isLoading || loading) ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    验证中...
                  </div>
                ) : '登录'}
              </button>
            </form>
          )}

          {/* 错误信息显示 */}
          {(error || localError) && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error || localError}</div>
            </div>
          )}

          {/* 分割线 */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或者使用</span>
              </div>
            </div>
          </div>

          {/* 第三方登录按钮 */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleQQLogin}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <QrCode className="h-5 w-5 text-blue-500" />
              <span className="ml-2">QQ登录</span>
            </button>
            <button
              type="button"
              onClick={handleWeChatLogin}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <QrCode className="h-5 w-5 text-green-500" />
              <span className="ml-2">微信登录</span>
            </button>
          </div>

          {/* 演示账户 */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleCreateDemoAccount}
              disabled={isLoading || loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {(isLoading || loading) ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  创建中...
                </div>
              ) : '创建演示账户'}
            </button>
            
            {/* 一键登录演示账户 */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('test@example.com');
                  setPassword('test123456');
                  setLoginMethod('email');
                }}
                className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                测试账户
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('demo@example.com');
                  setPassword('demo123456');
                  setLoginMethod('email');
                }}
                className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                演示账户
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@example.com');
                  setPassword('admin123456');
                  setLoginMethod('email');
                }}
                className="px-3 py-2 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                管理员
              </button>
            </div>
          </div>
        </div>

        {/* 注册链接 */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            还没有账户？{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              立即注册
            </Link>
          </p>
        </div>

        {/* 测试账户信息 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">测试账户</h3>
          <div className="text-xs text-blue-600 space-y-1">
            <p>邮箱: test@example.com 密码: test123456</p>
            <p>邮箱: demo@example.com 密码: demo123456</p>
            <p>邮箱: admin@example.com 密码: admin123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;