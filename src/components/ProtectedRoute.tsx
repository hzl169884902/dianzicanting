import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { Loader2, RefreshCw } from 'lucide-react';
import { uiLog } from '../utils/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, initialize, error } = useAuthStore();
  const location = useLocation();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    // 初始化认证状态
    initialize();
  }, []); // 移除initialize依赖，避免无限循环

  // 设置加载超时
  useEffect(() => {
    if (loading && !loadingTimeout) {
      uiLog.debug('开始认证状态检查，设置超时定时器');
      const timer = setTimeout(() => {
        if (loading) {
          uiLog.warn('认证状态检查超时');
          setLoadingTimeout(true);
          toast.error('加载超时，请刷新页面重试');
        }
      }, 10000); // 10秒超时

      return () => clearTimeout(timer);
    }
  }, [loading, loadingTimeout]);

  // 如果有错误，显示错误信息
  if (error && !loading) {
    uiLog.error('认证失败', { error });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">认证失败</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={() => {
              uiLog.info('用户点击刷新按钮');
              window.location.reload();
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg mb-2">
            {loadingTimeout ? '加载时间较长，请稍候...' : '正在验证身份...'}
          </div>
          <div className="text-gray-500 text-sm">
            {loadingTimeout ? '如果长时间无响应，请刷新页面' : '请稍等片刻'}
          </div>
          {loadingTimeout && (
            <button
              onClick={() => {
                uiLog.info('用户手动刷新页面');
                window.location.reload();
              }}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              刷新页面
            </button>
          )}
        </div>
      </div>
    );
  }

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    uiLog.info('用户未认证，重定向到登录页');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 用户已登录，渲染子组件
  return <>{children}</>;
};

export default ProtectedRoute;