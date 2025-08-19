// 日志级别
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// 日志配置
interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStorageSize: number;
}

// 默认配置
const defaultConfig: LoggerConfig = {
  level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableStorage: true,
  maxStorageSize: 1000 // 最多存储1000条日志
};

// 日志条目接口
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
  stack?: string;
}

class Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.loadLogsFromStorage();
  }

  // 从本地存储加载日志
  private loadLogsFromStorage() {
    if (!this.config.enableStorage) return;
    
    try {
      const stored = localStorage.getItem('app_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load logs from storage:', error);
    }
  }

  // 保存日志到本地存储
  private saveLogsToStorage() {
    if (!this.config.enableStorage) return;
    
    try {
      // 限制存储的日志数量
      const logsToStore = this.logs.slice(-this.config.maxStorageSize);
      localStorage.setItem('app_logs', JSON.stringify(logsToStore));
    } catch (error) {
      console.warn('Failed to save logs to storage:', error);
    }
  }

  // 记录日志
  private log(level: LogLevel, category: string, message: string, data?: any, error?: Error) {
    if (level < this.config.level) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      stack: error?.stack
    };

    this.logs.push(entry);
    
    // 控制台输出
    if (this.config.enableConsole) {
      const levelName = LogLevel[level];
      const prefix = `[${entry.timestamp}] [${levelName}] [${category}]`;
      
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(prefix, message, data);
          break;
        case LogLevel.INFO:
          console.info(prefix, message, data);
          break;
        case LogLevel.WARN:
          console.warn(prefix, message, data);
          break;
        case LogLevel.ERROR:
          console.error(prefix, message, data, error?.stack);
          break;
      }
    }

    // 保存到存储
    this.saveLogsToStorage();
  }

  // 调试日志
  debug(category: string, message: string, data?: any) {
    this.log(LogLevel.DEBUG, category, message, data);
  }

  // 信息日志
  info(category: string, message: string, data?: any) {
    this.log(LogLevel.INFO, category, message, data);
  }

  // 警告日志
  warn(category: string, message: string, data?: any) {
    this.log(LogLevel.WARN, category, message, data);
  }

  // 错误日志
  error(category: string, message: string, data?: any, error?: Error) {
    this.log(LogLevel.ERROR, category, message, data, error);
  }

  // 获取所有日志
  getLogs(level?: LogLevel, category?: string): LogEntry[] {
    let filteredLogs = this.logs;
    
    if (level !== undefined) {
      filteredLogs = filteredLogs.filter(log => log.level >= level);
    }
    
    if (category) {
      filteredLogs = filteredLogs.filter(log => log.category === category);
    }
    
    return filteredLogs;
  }

  // 清除日志
  clearLogs() {
    this.logs = [];
    if (this.config.enableStorage) {
      localStorage.removeItem('app_logs');
    }
  }

  // 导出日志
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // 获取日志统计
  getLogStats() {
    const stats = {
      total: this.logs.length,
      debug: 0,
      info: 0,
      warn: 0,
      error: 0
    };

    this.logs.forEach(log => {
      switch (log.level) {
        case LogLevel.DEBUG:
          stats.debug++;
          break;
        case LogLevel.INFO:
          stats.info++;
          break;
        case LogLevel.WARN:
          stats.warn++;
          break;
        case LogLevel.ERROR:
          stats.error++;
          break;
      }
    });

    return stats;
  }
}

// 创建全局日志实例
export const logger = new Logger();

// 便捷的日志函数
export const log = {
  debug: (category: string, message: string, data?: any) => logger.debug(category, message, data),
  info: (category: string, message: string, data?: any) => logger.info(category, message, data),
  warn: (category: string, message: string, data?: any) => logger.warn(category, message, data),
  error: (category: string, message: string, data?: any, error?: Error) => logger.error(category, message, data, error),
};

// 认证相关的日志函数
export const authLog = {
  debug: (message: string, data?: any) => log.debug('AUTH', message, data),
  info: (message: string, data?: any) => log.info('AUTH', message, data),
  warn: (message: string, data?: any) => log.warn('AUTH', message, data),
  error: (message: string, data?: any, error?: Error) => log.error('AUTH', message, data, error),
};

// API相关的日志函数
export const apiLog = {
  debug: (message: string, data?: any) => log.debug('API', message, data),
  info: (message: string, data?: any) => log.info('API', message, data),
  warn: (message: string, data?: any) => log.warn('API', message, data),
  error: (message: string, data?: any, error?: Error) => log.error('API', message, data, error),
};

// UI相关的日志函数
export const uiLog = {
  debug: (message: string, data?: any) => log.debug('UI', message, data),
  info: (message: string, data?: any) => log.info('UI', message, data),
  warn: (message: string, data?: any) => log.warn('UI', message, data),
  error: (message: string, data?: any, error?: Error) => log.error('UI', message, data, error),
};

export default logger;