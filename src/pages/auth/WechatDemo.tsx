import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

const WechatDemo: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signInWithWechat, loading, error } = useAuthStore();
  const [countdown, setCountdown] = useState(3);
  const [autoLogin, setAutoLogin] = useState(false);

  const state = searchParams.get('state');

  useEffect(() => {
    if (!state) {
      navigate('/login');
      return;
    }

    // 3秒后自动登录
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setAutoLogin(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state, navigate]);

  useEffect(() => {
    if (autoLogin && state) {
      handleLogin();
    }
  }, [autoLogin, state]);

  const handleLogin = async () => {
    if (!state) return;

    const result = await signInWithWechat('demo_code', state);
    if (result.success) {
      navigate('/');
    }
  };

  const handleManualLogin = () => {
    setAutoLogin(true);
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
        <div className="text-center p-6 border-b">
          <h2 className="text-2xl font-bold text-green-600">微信登录演示</h2>
          <p className="text-gray-600 mt-2">
            这是微信登录的演示页面，将在 {countdown} 秒后自动登录
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">演示说明</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 这是微信登录的模拟演示</li>
              <li>• 将创建一个演示用户账户</li>
              <li>• 真实环境需要配置微信AppID</li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {!autoLogin ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {countdown > 0 ? `${countdown}秒后自动登录` : '准备登录...'}
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={handleManualLogin}
                    disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? '登录中...' : '立即登录'}
                  </button>
                  
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回登录页面
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">正在登录...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WechatDemo;