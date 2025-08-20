import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogViewer from "@/components/LogViewer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PageLoader } from "@/components/LoadingSpinner";
import { uiLog } from '@/utils/logger';

// 使用React.lazy进行代码分割，提升首屏加载速度
const Home = lazy(() => import("@/pages/Home"));
const Dishes = lazy(() => import("@/pages/Dishes"));
const DishDetail = lazy(() => import("@/pages/DishDetail"));
const DietRecord = lazy(() => import("@/pages/DietRecord"));
const Recommendations = lazy(() => import("@/pages/Recommendations"));
const Social = lazy(() => import("@/pages/Social"));
const Reports = lazy(() => import("@/pages/Reports"));
const Profile = lazy(() => import("@/pages/Profile"));
const WeightLoss = lazy(() => import("@/pages/WeightLoss"));
const SummerRecipes = lazy(() => import("@/pages/SummerRecipes"));
const TasteAnalysis = lazy(() => import("@/pages/TasteAnalysis"));
const DishManagement = lazy(() => import("@/pages/DishManagement").then(module => ({ default: module.DishManagement })));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const QQDemo = lazy(() => import("@/pages/auth/QQDemo"));
const WechatDemo = lazy(() => import("@/pages/auth/WechatDemo"));

export default function App() {
  const [showLogViewer, setShowLogViewer] = useState(false);

  // 添加快捷键支持 (Ctrl+Shift+L 打开日志查看器)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        event.preventDefault();
        setShowLogViewer(true);
        uiLog.debug('通过快捷键打开日志查看器');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 在开发环境下添加全局日志记录
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      uiLog.info('应用启动', { 
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      });
      
      // 监听未捕获的错误
      const handleError = (event: ErrorEvent) => {
        uiLog.error('未捕获的JavaScript错误', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }, event.error);
      };
      
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        uiLog.error('未处理的Promise拒绝', {
          reason: event.reason
        });
      };
      
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      
      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<PageLoader text="页面加载中..." />}>
          <Routes>
            {/* 认证相关路由 - 不使用Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/qq/demo" element={<QQDemo />} />
            <Route path="/auth/wechat/demo" element={<WechatDemo />} />
            
            {/* 应用主要路由 - 使用Layout和认证保护 */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Home />} />
              <Route path="dishes" element={<Dishes />} />
              <Route path="dishes/:id" element={<DishDetail />} />
              <Route path="diet-record" element={<DietRecord />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="weight-loss" element={<WeightLoss />} />
              <Route path="summer-recipes" element={<SummerRecipes />} />
              <Route path="taste-analysis" element={<TasteAnalysis />} />
              <Route path="social" element={<Social />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<Profile />} />
              <Route path="dish-management" element={<DishManagement />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
      
      {/* 日志查看器 */}
      <LogViewer 
        isOpen={showLogViewer} 
        onClose={() => {
          setShowLogViewer(false);
          uiLog.debug('关闭日志查看器');
        }} 
      />
      
      {/* 开发环境下显示日志查看器快捷键提示 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-50 hover:opacity-100 transition-opacity">
            按 Ctrl+Shift+L 打开日志查看器
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
