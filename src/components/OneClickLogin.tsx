import React, { useState, useEffect } from 'react';
import { User, Smartphone } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { toast } from 'sonner';
import { uiLog } from '../utils/logger';

interface LocalUserInfo {
  platform: 'qq' | 'wechat';
  nickname: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface OneClickLoginProps {
  onSuccess?: () => void;
}

const OneClickLogin: React.FC<OneClickLoginProps> = ({ onSuccess }) => {
  const [localUsers, setLocalUsers] = useState<LocalUserInfo[]>([]);
  const [isDetecting, setIsDetecting] = useState(true);
  const { signInWithQQ, signInWithWechat, loading } = useAuthStore();

  // 模拟检测本地登录状态的函数
  const detectLocalLoginStatus = async (): Promise<LocalUserInfo[]> => {
    // 在真实环境中，这里会调用本地API或检查本地存储
    // 由于浏览器安全限制，我们模拟这个功能
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUsers: LocalUserInfo[] = [];
        
        // 模拟检测到的本地用户（在实际应用中，这些信息会从本地QQ/微信客户端获取）
        if (Math.random() > 0.3) { // 70%概率检测到QQ用户
          mockUsers.push({
            platform: 'qq',
            nickname: '演示QQ用户',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=123456789&s=100',
            isLoggedIn: true
          });
        }
        
        if (Math.random() > 0.4) { // 60%概率检测到微信用户
          mockUsers.push({
            platform: 'wechat',
            nickname: '演示微信用户',
            avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKxrUx0mxFiafEEHShLQLUkiblwjwQWBDwMTSRWiaEaKoibE1yB817CCoGMnvdEoMl9eMQqVLuibSKjdcA/132',
            isLoggedIn: true
          });
        }
        
        resolve(mockUsers);
      }, 1500);
    });
  };

  // 检测本地登录状态
  useEffect(() => {
    const checkLocalStatus = async () => {
      if (import.meta.env.VITE_ENABLE_ONE_CLICK_LOGIN === 'true') {
        uiLog.info('开始检测本地QQ/微信登录状态');
        try {
          const users = await detectLocalLoginStatus();
          setLocalUsers(users);
          uiLog.info('本地登录状态检测完成', { userCount: users.length });
        } catch (error) {
          uiLog.error('检测本地登录状态失败', { error });
        }
      }
      setIsDetecting(false);
    };

    checkLocalStatus();
  }, []);

  // 一键登录处理
  const handleOneClickLogin = async (user: LocalUserInfo) => {
    uiLog.info('用户尝试一键登录', { platform: user.platform, nickname: user.nickname });
    
    try {
      let result;
      
      if (user.platform === 'qq') {
        // 模拟获取QQ授权码
        const mockCode = 'demo_qq_auth_code_' + Date.now();
        const mockState = 'demo_state';
        result = await signInWithQQ(mockCode, mockState);
      } else {
        // 模拟获取微信授权码
        const mockCode = 'demo_wechat_auth_code_' + Date.now();
        const mockState = 'demo_state';
        result = await signInWithWechat(mockCode, mockState);
      }
      
      if (result.success) {
        uiLog.info('一键登录成功', { platform: user.platform });
        toast.success(`${user.platform === 'qq' ? 'QQ' : '微信'}一键登录成功！`);
        onSuccess?.();
      } else {
        uiLog.error('一键登录失败', { platform: user.platform, error: result.error });
        toast.error(result.error || '一键登录失败');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '一键登录失败';
      uiLog.error('一键登录异常', { platform: user.platform, error: errorMsg });
      toast.error(errorMsg);
    }
  };

  if (!import.meta.env.VITE_ENABLE_ONE_CLICK_LOGIN || import.meta.env.VITE_ENABLE_ONE_CLICK_LOGIN !== 'true') {
    return null;
  }

  if (isDetecting) {
    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-blue-700">正在检测本地登录状态...</span>
        </div>
      </div>
    );
  }

  if (localUsers.length === 0) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <User className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">未检测到本地QQ或微信登录</p>
          <p className="text-xs text-gray-500 mt-1">请先在电脑上登录QQ或微信客户端</p>
        </div>
      </div>
    );
  }

  return null;
};

export default OneClickLogin;