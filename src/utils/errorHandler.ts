import { toast } from 'sonner';
import { authLog, apiLog, uiLog } from './logger';

// 错误类型枚举
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}

// 错误严重程度
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// 应用错误接口
export interface AppError {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  code?: string;
  details?: any;
  timestamp: string;
  context?: string;
}

// 错误映射配置
const ERROR_MESSAGES: Record<string, { userMessage: string; type: ErrorType; severity: ErrorSeverity }> = {
  // 网络错误
  'Failed to fetch': {
    userMessage: '网络连接失败，请检查网络后重试',
    type: ErrorType.NETWORK,
    severity: ErrorSeverity.MEDIUM
  },
  'NetworkError': {
    userMessage: '网络错误，请稍后重试',
    type: ErrorType.NETWORK,
    severity: ErrorSeverity.MEDIUM
  },
  'ERR_NETWORK': {
    userMessage: '网络连接异常，请检查网络设置',
    type: ErrorType.NETWORK,
    severity: ErrorSeverity.MEDIUM
  },
  'ERR_INSUFFICIENT_RESOURCES': {
    userMessage: '系统资源不足，请稍后重试',
    type: ErrorType.NETWORK,
    severity: ErrorSeverity.HIGH
  },
  
  // 认证错误
  'Invalid login credentials': {
    userMessage: '邮箱或密码错误，请重新输入',
    type: ErrorType.AUTH,
    severity: ErrorSeverity.LOW
  },
  'Email not confirmed': {
    userMessage: '邮箱未验证，请先验证邮箱',
    type: ErrorType.AUTH,
    severity: ErrorSeverity.MEDIUM
  },
  'User not found': {
    userMessage: '用户不存在，请检查邮箱地址',
    type: ErrorType.AUTH,
    severity: ErrorSeverity.LOW
  },
  'Invalid email': {
    userMessage: '邮箱格式不正确',
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW
  },
  'Password too weak': {
    userMessage: '密码强度不够，请使用更复杂的密码',
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW
  },
  'Email already registered': {
    userMessage: '该邮箱已被注册，请使用其他邮箱或直接登录',
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW
  },
  
  // 服务器错误
  'Internal Server Error': {
    userMessage: '服务器内部错误，请稍后重试',
    type: ErrorType.SERVER,
    severity: ErrorSeverity.HIGH
  },
  'Service Unavailable': {
    userMessage: '服务暂时不可用，请稍后重试',
    type: ErrorType.SERVER,
    severity: ErrorSeverity.HIGH
  },
  'Bad Gateway': {
    userMessage: '网关错误，请稍后重试',
    type: ErrorType.SERVER,
    severity: ErrorSeverity.MEDIUM
  },
  
  // 验证错误
  'Invalid phone number': {
    userMessage: '手机号格式不正确',
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW
  },
  'Invalid verification code': {
    userMessage: '验证码错误或已过期',
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW
  },
  'Code expired': {
    userMessage: '验证码已过期，请重新获取',
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW
  }
};

// 错误处理器类
class ErrorHandler {
  // 创建应用错误
  createError(
    originalError: Error | string,
    context?: string,
    details?: any
  ): AppError {
    const message = typeof originalError === 'string' ? originalError : originalError.message;
    const errorConfig = ERROR_MESSAGES[message] || {
      userMessage: '操作失败，请稍后重试',
      type: ErrorType.UNKNOWN,
      severity: ErrorSeverity.MEDIUM
    };

    return {
      type: errorConfig.type,
      severity: errorConfig.severity,
      message,
      userMessage: errorConfig.userMessage,
      timestamp: new Date().toISOString(),
      context,
      details
    };
  }

  // 处理并显示错误
  handleError(
    error: Error | string | AppError,
    context?: string,
    showToast: boolean = true
  ): AppError {
    let appError: AppError;

    if (this.isAppError(error)) {
      appError = error;
    } else {
      appError = this.createError(error, context);
    }

    // 记录日志
    this.logError(appError);

    // 显示用户提示
    if (showToast) {
      this.showErrorToast(appError);
    }

    return appError;
  }

  // 检查是否为应用错误
  private isAppError(error: any): error is AppError {
    return error && typeof error === 'object' && 'type' in error && 'userMessage' in error;
  }

  // 记录错误日志
  private logError(error: AppError) {
    const logData = {
      type: error.type,
      severity: error.severity,
      message: error.message,
      context: error.context,
      details: error.details
    };

    switch (error.type) {
      case ErrorType.AUTH:
        authLog.error(error.message, logData);
        break;
      case ErrorType.NETWORK:
      case ErrorType.SERVER:
        apiLog.error(error.message, logData);
        break;
      default:
        uiLog.error(error.message, logData);
    }
  }

  // 显示错误提示
  private showErrorToast(error: AppError) {
    const toastOptions = {
      duration: this.getToastDuration(error.severity),
      description: error.context ? `上下文: ${error.context}` : undefined
    };

    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        toast.error(error.userMessage, toastOptions);
        break;
      case ErrorSeverity.MEDIUM:
        toast.error(error.userMessage, toastOptions);
        break;
      case ErrorSeverity.LOW:
        toast.warning(error.userMessage, toastOptions);
        break;
    }
  }

  // 获取提示持续时间
  private getToastDuration(severity: ErrorSeverity): number {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return 8000;
      case ErrorSeverity.HIGH:
        return 6000;
      case ErrorSeverity.MEDIUM:
        return 4000;
      case ErrorSeverity.LOW:
        return 3000;
      default:
        return 4000;
    }
  }

  // 处理API响应错误
  handleApiError(response: Response, context?: string): AppError {
    let message = `HTTP ${response.status}`;
    let type = ErrorType.SERVER;
    let severity = ErrorSeverity.MEDIUM;

    switch (response.status) {
      case 400:
        message = 'Bad Request';
        type = ErrorType.VALIDATION;
        severity = ErrorSeverity.LOW;
        break;
      case 401:
        message = 'Unauthorized';
        type = ErrorType.AUTH;
        severity = ErrorSeverity.MEDIUM;
        break;
      case 403:
        message = 'Forbidden';
        type = ErrorType.AUTH;
        severity = ErrorSeverity.MEDIUM;
        break;
      case 404:
        message = 'Not Found';
        type = ErrorType.SERVER;
        severity = ErrorSeverity.LOW;
        break;
      case 429:
        message = 'Too Many Requests';
        type = ErrorType.SERVER;
        severity = ErrorSeverity.MEDIUM;
        break;
      case 500:
        message = 'Internal Server Error';
        type = ErrorType.SERVER;
        severity = ErrorSeverity.HIGH;
        break;
      case 502:
        message = 'Bad Gateway';
        type = ErrorType.SERVER;
        severity = ErrorSeverity.MEDIUM;
        break;
      case 503:
        message = 'Service Unavailable';
        type = ErrorType.SERVER;
        severity = ErrorSeverity.HIGH;
        break;
    }

    return this.handleError(message, context);
  }

  // 处理网络错误
  handleNetworkError(error: Error, context?: string): AppError {
    return this.handleError(error, context || '网络请求');
  }

  // 处理认证错误
  handleAuthError(error: Error | string, context?: string): AppError {
    return this.handleError(error, context || '用户认证');
  }

  // 处理表单验证错误
  handleValidationError(error: Error | string, context?: string): AppError {
    return this.handleError(error, context || '表单验证');
  }

  // 批量处理错误
  handleMultipleErrors(errors: (Error | string)[], context?: string): AppError[] {
    return errors.map(error => this.handleError(error, context, false));
  }

  // 重试机制
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    context?: string
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxRetries) {
          this.handleError(lastError, `${context} (重试 ${maxRetries} 次后失败)`);
          throw lastError;
        }

        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError!;
  }
}

// 导出单例
export const errorHandler = new ErrorHandler();

// 便捷方法
export const handleError = (error: Error | string | AppError, context?: string, showToast: boolean = true) => 
  errorHandler.handleError(error, context, showToast);

export const handleApiError = (response: Response, context?: string) => 
  errorHandler.handleApiError(response, context);

export const handleNetworkError = (error: Error, context?: string) => 
  errorHandler.handleNetworkError(error, context);

export const handleAuthError = (error: Error | string, context?: string) => 
  errorHandler.handleAuthError(error, context);

export const handleValidationError = (error: Error | string, context?: string) => 
  errorHandler.handleValidationError(error, context);

export const withRetry = <T>(
  operation: () => Promise<T>,
  maxRetries?: number,
  delay?: number,
  context?: string
) => errorHandler.withRetry(operation, maxRetries, delay, context);

export default errorHandler;