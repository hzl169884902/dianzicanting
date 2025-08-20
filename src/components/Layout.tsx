import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from './PageTransition';
import { 
  HomeIcon, 
  BookOpenIcon, 
  CalendarDaysIcon, 
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  UserIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  SunIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';

const navigation = [
  { name: '首页', href: '/', icon: HomeIcon, gradient: 'from-blue-500 to-purple-600' },
  { name: '菜品展示', href: '/dishes', icon: BookOpenIcon, gradient: 'from-emerald-500 to-teal-600' },
  { name: '减脂餐专区', href: '/weight-loss', icon: HeartIcon, gradient: 'from-pink-500 to-rose-600' },
  { name: '夏季菜谱', href: '/summer-recipes', icon: SunIcon, gradient: 'from-yellow-500 to-orange-600' },
  { name: '饮食记录', href: '/diet-record', icon: ClipboardDocumentListIcon, gradient: 'from-orange-500 to-red-600' },
  { name: '智能推荐', href: '/recommendations', icon: SparklesIcon, gradient: 'from-indigo-500 to-purple-600' },
  { name: '口味分析', href: '/taste-analysis', icon: BeakerIcon, gradient: 'from-cyan-500 to-blue-600' },
  { name: '社交互动', href: '/social', icon: ChatBubbleLeftRightIcon, gradient: 'from-green-500 to-emerald-600' },
  { name: '健康报告', href: '/reports', icon: ChartBarIcon, gradient: 'from-violet-500 to-purple-600' },
  { name: '菜品管理', href: '/dish-management', icon: Cog6ToothIcon, gradient: 'from-gray-500 to-slate-600' },
  { name: '个人中心', href: '/profile', icon: UserIcon, gradient: 'from-rose-500 to-pink-600' },
];

// 动画变体
const navVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
};

const linkVariants = {
  inactive: {
    scale: 1,
    color: "rgb(107 114 128)"
  },
  active: {
    scale: 1.05,
    color: "rgb(59 130 246)",
    transition: {
      duration: 0.2
    }
  },
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      duration: 0.2
    }
  }
};

export default function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, userProfile, signOut, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []); // 移除initialize依赖，避免无限循环

  // 点击外部区域关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 导航到菜品页面并传递搜索参数
      window.location.href = `/dishes?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <motion.nav 
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <SparklesIcon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">美食探索家</span>
              </Link>
            </motion.div>

            {/* 搜索框 */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <motion.div 
                className="relative w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索菜品、食材..."
                    className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-gray-500"
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </form>
              </motion.div>
            </div>

            {/* 导航菜单和用户信息 */}
            <div className="hidden md:flex items-center space-x-4">
              {/* 桌面端导航链接 */}
              <div className="hidden md:flex items-center space-x-2">
                {navigation.slice(0, 4).map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={item.href}
                        className="relative group"
                      >
                        <motion.div
                          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'text-white shadow-lg'
                              : 'text-gray-700 hover:text-white'
                          }`}
                          variants={linkVariants}
                          initial="inactive"
                          animate={isActive ? "active" : "inactive"}
                          whileHover="hover"
                          style={{
                            background: isActive ? `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})` : 'transparent'
                          }}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-20"
                              style={{ background: `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})` }}
                              layoutId="activeTab"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* 用户菜单 */}
               {user ? (
                 <div className="relative user-menu">
                   <motion.button
                     onClick={() => setShowUserMenu(!showUserMenu)}
                     className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 hover:bg-white/30 transition-all duration-200"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-medium">
                        {userProfile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="font-medium">{userProfile?.name || '用户'}</span>
                    <motion.div
                      animate={{ rotate: showUserMenu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 py-2 z-50"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 }}
                        >
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 rounded-xl mx-2"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <UserIcon className="w-5 h-5" />
                            <span>个人中心</span>
                          </Link>
                        </motion.div>
                        <div className="border-t border-gray-200/50 my-2 mx-2" />
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          onClick={() => {
                            signOut();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl mx-2"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          <span>退出登录</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-xl hover:bg-white/20"
                    >
                      登录
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                    >
                      注册
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        <AnimatePresence>
          <motion.div
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-white/20">
              {/* 用户信息 */}
              {user ? (
                <motion.div 
                  className="px-4 py-3 border-b border-gray-200/50 mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-medium text-lg">
                        {userProfile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        {userProfile?.name || '用户'}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="px-4 py-3 border-b border-gray-200/50 mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex space-x-3">
                    <Link
                      to="/login"
                      className="flex-1 px-4 py-3 text-center text-sm font-medium text-gray-700 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/70 transition-all duration-200"
                    >
                      登录
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 px-4 py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                    >
                      注册
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* 导航链接 */}
              {navigation.slice(0, -1).map((item, index) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white/50'
                      }`}
                      style={{
                        background: isActive ? `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})` : 'transparent'
                      }}
                    >
                      <item.icon className="w-6 h-6" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* 个人中心和退出登录 */}
              {user && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (navigation.length - 1) * 0.1 }}
                  >
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                        location.pathname === '/profile'
                          ? 'text-white shadow-lg bg-gradient-to-r from-rose-500 to-pink-600'
                          : 'text-gray-700 hover:bg-white/50'
                      }`}
                    >
                      <UserIcon className="w-6 h-6" />
                      <span>个人中心</span>
                    </Link>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (navigation.length - 1) * 0.1 }}
                    onClick={signOut}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-2xl text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    <span>退出登录</span>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* 底部 */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>© 2025 美食探索家. 让健康饮食更简单.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}