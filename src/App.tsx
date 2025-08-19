import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Dishes from "@/pages/Dishes";
import DishDetail from "@/pages/DishDetail";
import DietRecord from "@/pages/DietRecord";
import Recommendations from "@/pages/Recommendations";
import Social from "@/pages/Social";
import Reports from "@/pages/Reports";
import Profile from "@/pages/Profile";
import WeightLoss from "@/pages/WeightLoss";
import SummerRecipes from "@/pages/SummerRecipes";
import TasteAnalysis from "@/pages/TasteAnalysis";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import QQDemo from "@/pages/auth/QQDemo";
import WechatDemo from "@/pages/auth/WechatDemo";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogViewer from "@/components/LogViewer";
import { uiLog } from '@/utils/logger';

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
    <>
      <Router>
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
          </Route>
        </Routes>
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
    </>
  );
}
