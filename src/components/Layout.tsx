import { Outlet, Link, useLocation } from 'react-router-dom';
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
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';

const navigation = [
  { name: '首页', href: '/', icon: HomeIcon },
  { name: '菜品展示', href: '/dishes', icon: BookOpenIcon },
  { name: '减脂餐专区', href: '/weight-loss', icon: HeartIcon },
  { name: '夏季菜谱', href: '/summer-recipes', icon: SunIcon },
  { name: '饮食记录', href: '/diet-record', icon: ClipboardDocumentListIcon },
  { name: '智能推荐', href: '/recommendations', icon: SparklesIcon },
    { name: '口味分析', href: '/taste-analysis', icon: BeakerIcon },
  { name: '社交互动', href: '/social', icon: ChatBubbleLeftRightIcon },
  { name: '健康报告', href: '/reports', icon: ChartBarIcon },
  { name: '个人中心', href: '/profile', icon: UserIcon },
];

export default function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, userProfile, signOut, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">餐</span>
                </div>
                <span className="text-xl font-bold text-gray-900">美食探索家</span>
              </Link>
            </div>

            {/* 搜索框 */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="搜索菜品..."
                />
              </form>
            </div>

            {/* 导航菜单和用户信息 */}
            <div className="hidden md:flex items-center space-x-4">
              {/* 导航链接 */}
              <div className="flex items-center space-x-1">
                {navigation.slice(0, -1).map((item) => {
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4 inline-block mr-1" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* 用户菜单 */}
               {user ? (
                 <div className="relative user-menu">
                   <button
                     onClick={() => setShowUserMenu(!showUserMenu)}
                     className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                   >
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {userProfile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span>{userProfile?.name || '用户'}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        个人中心
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors"
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* 用户信息 */}
            {user ? (
              <div className="px-3 py-2 border-b border-gray-200 mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {userProfile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {userProfile?.name || '用户'}
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-3 py-2 border-b border-gray-200 mb-2">
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="flex-1 px-3 py-2 text-center text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 px-3 py-2 text-center text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
                  >
                    注册
                  </Link>
                </div>
              </div>
            )}

            {/* 导航链接 */}
            {navigation.slice(0, -1).map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 inline-block mr-2" />
                  {item.name}
                </Link>
              );
            })}

            {/* 个人中心和退出登录 */}
            {user && (
              <>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === '/profile'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <UserIcon className="w-5 h-5 inline-block mr-2" />
                  个人中心
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 inline-block mr-2" />
                  退出登录
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
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