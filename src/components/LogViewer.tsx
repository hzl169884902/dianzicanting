import React, { useState, useEffect } from 'react';
import { logger } from '../utils/logger';
import { X, Download, Trash2, Filter, Search } from 'lucide-react';

interface LogViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      loadLogs();
      loadStats();
    }
  }, [isOpen]);

  useEffect(() => {
    filterLogs();
  }, [logs, levelFilter, categoryFilter, searchTerm]);

  const loadLogs = () => {
    const allLogs = logger.getLogs();
    setLogs(allLogs);
  };

  const loadStats = () => {
    const statistics = logger.getLogStats();
    setStats(statistics);
  };

  const filterLogs = () => {
    let filtered = [...logs];

    // 按级别过滤
    if (levelFilter !== 'all') {
      filtered = filtered.filter(log => log.level === levelFilter);
    }

    // 按分类过滤
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(log => log.category === categoryFilter);
    }

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(log.data).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  };

  const handleExport = () => {
    const exportData = logger.exportLogs();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (confirm('确定要清除所有日志吗？')) {
      logger.clearLogs();
      loadLogs();
      loadStats();
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warn': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'debug': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">日志查看器</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Download size={16} />
              <span>导出</span>
            </button>
            <button
              onClick={handleClearLogs}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 size={16} />
              <span>清除</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">总日志数：</span>
              <span className="font-semibold">{stats.total || 0}</span>
            </div>
            <div>
              <span className="text-red-600">错误：</span>
              <span className="font-semibold">{stats.error || 0}</span>
            </div>
            <div>
              <span className="text-yellow-600">警告：</span>
              <span className="font-semibold">{stats.warn || 0}</span>
            </div>
            <div>
              <span className="text-blue-600">信息：</span>
              <span className="font-semibold">{stats.info || 0}</span>
            </div>
          </div>
        </div>

        {/* 过滤器 */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="all">所有级别</option>
                <option value="error">错误</option>
                <option value="warn">警告</option>
                <option value="info">信息</option>
                <option value="debug">调试</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="all">所有分类</option>
                <option value="AUTH">认证</option>
                <option value="API">API</option>
                <option value="UI">界面</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="搜索日志内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 日志列表 */}
        <div className="flex-1 overflow-auto">
          {filteredLogs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              没有找到匹配的日志
            </div>
          ) : (
            <div className="divide-y">
              {filteredLogs.map((log, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {log.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm font-medium mb-1">
                        {log.message}
                      </div>
                      {log.data && Object.keys(log.data).length > 0 && (
                        <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded mt-2">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </div>
                      )}
                      {log.error && (
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded mt-2">
                          <pre className="whitespace-pre-wrap">
                            {log.error.stack || log.error.message || String(log.error)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogViewer;