import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { toast } from 'sonner';
import { uiLog } from '../utils/logger';
import { handleError, ErrorType, ErrorSeverity } from '../utils/errorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 生成错误ID用于追踪
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误详情
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId
    };

    uiLog.error('React组件错误边界捕获到错误', errorDetails, error);

    // 处理错误
    handleError({
      type: ErrorType.UNKNOWN,
      severity: ErrorSeverity.HIGH,
      message: error.message,
      userMessage: '页面出现异常，请刷新页面重试',
      timestamp: new Date().toISOString(),
      context: '组件渲染',
      details: errorDetails
    }, '组件错误边界', false);

    // 调用自定义错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 显示错误提示
    toast.error('页面出现异常', {
      description: '我们已记录此错误，请尝试刷新页面',
      duration: 6000
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: null
    });
    
    uiLog.info('用户尝试从错误边界恢复', { errorId: this.state.errorId });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  页面出现异常
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  抱歉，页面遇到了一些问题。我们已经记录了这个错误，请尝试以下操作：
                </p>
                
                {/* 错误详情（开发环境显示） */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-left">
                    <p className="text-xs text-red-600 font-mono break-all">
                      {this.state.error.message}
                    </p>
                    {this.state.errorId && (
                      <p className="text-xs text-gray-500 mt-1">
                        错误ID: {this.state.errorId}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="space-y-3">
                  <button
                    onClick={this.handleRetry}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重试
                  </button>
                  
                  <button
                    onClick={this.handleReload}
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    刷新页面
                  </button>
                  
                  <button
                    onClick={this.handleGoHome}
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    返回首页
                  </button>
                </div>
                
                <div className="mt-6 text-xs text-gray-500">
                  <p>如果问题持续存在，请联系技术支持</p>
                  {this.state.errorId && (
                    <p className="mt-1">错误追踪ID: {this.state.errorId}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// 高阶组件版本
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook版本（用于函数组件）
export function useErrorHandler() {
  const handleError = React.useCallback((error: Error, context?: string) => {
    // 手动触发错误边界
    throw error;
  }, []);

  return handleError;
}