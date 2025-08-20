import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
};

export function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* 主要加载动画 */}
      <div className="relative">
        {/* 外圈旋转 */}
        <div className={`${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin`} />
        
        {/* 内部脉冲图标 */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <SparklesIcon className={`${sizeClasses[size === 'lg' ? 'md' : 'sm']} text-blue-600`} />
        </div>
      </div>
      
      {/* 加载文本 */}
      {text && (
        <div className="flex items-center space-x-1">
          <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
            {text}
          </span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 页面级加载器
export function PageLoader({ text = '加载中' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
}

// 内联加载器
export function InlineLoader({ text = '加载中...', className = '' }: { text?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <LoadingSpinner size="md" text={text} />
    </div>
  );
}

// 按钮加载器
export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <div className={`${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full animate-spin`} />
  );
}

// 卡片骨架屏
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSpinner;