import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLoader } from './LoadingSpinner';

interface RouteGuardProps {
  children: React.ReactNode;
  loadingDelay?: number;
}

// 路由切换加载状态管理
export function RouteGuard({ children, loadingDelay = 200 }: RouteGuardProps) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // 路由变化时显示加载状态
    setIsLoading(true);
    
    // 延迟显示加载器，避免快速切换时的闪烁
    const showTimer = setTimeout(() => {
      if (isLoading) {
        setShowLoader(true);
      }
    }, loadingDelay);

    // 模拟页面加载完成
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      setShowLoader(false);
    }, loadingDelay + 300);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname, loadingDelay]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
          >
            <PageLoader text="页面加载中" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}

// 页面预加载组件
export function PagePreloader({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 模拟页面资源加载
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <PageLoader text="初始化中" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default RouteGuard;