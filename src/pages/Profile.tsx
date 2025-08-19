import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { useAuthStore } from '@/store/auth';
import {
  UserCircleIcon,
  CogIcon,
  ChartBarIcon,
  HeartIcon,
  StarIcon,
  CalendarDaysIcon,
  FireIcon,
  TrophyIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
  preferences: {
    dietType: string;
    allergies: string[];
    goals: string[];
    notifications: boolean;
  };
}

interface UserStats {
  totalRecords: number;
  totalDishes: number;
  favoriteCount: number;
  reviewCount: number;
  streakDays: number;
  avgCalories: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const { dietRecords, dishes, loading, fetchDietRecords, fetchDishes } = useAppStore();
  const { user, userProfile, signOut, updateProfile, fetchUserProfile, loading: authLoading } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    dietType: '',
    allergies: [] as string[],
    goals: [] as string[]
  });
  
  // 设置弹窗状态
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  
  // 使用真实用户数据或默认值
  const [localProfile, setLocalProfile] = useState<UserProfile>({
    id: userProfile?.id || user?.id || '',
    name: userProfile?.name || user?.user_metadata?.name || '美食爱好者',
        email: userProfile?.email || user?.email || '',
        avatar: userProfile?.avatar_url || '',
        bio: '热爱美食，享受生活中的每一餐',
        joinDate: userProfile?.created_at ? new Date(userProfile.created_at).toISOString().split('T')[0] : '2025-01-15',
        preferences: {
          dietType: userProfile?.preferences?.dietType || '均衡饮食',
          allergies: userProfile?.preferences?.allergies || ['花生', '海鲜'],
          goals: userProfile?.preferences?.goals || ['减重', '增肌', '健康饮食'],
      notifications: true
    }
  });

  const [userStats, setUserStats] = useState<UserStats>({
    totalRecords: 0,
    totalDishes: 0,
    favoriteCount: 0,
    reviewCount: 0,
    streakDays: 0,
    avgCalories: 0
  });

  const [achievements] = useState([
    { id: 1, name: '初来乍到', description: '完成第一次饮食记录', icon: '🎉', unlocked: true },
    { id: 2, name: '坚持不懈', description: '连续记录7天', icon: '🔥', unlocked: true },
    { id: 3, name: '美食探索家', description: '尝试50种不同菜品', icon: '🍽️', unlocked: false },
    { id: 4, name: '健康达人', description: '连续30天达到营养目标', icon: '💪', unlocked: false },
    { id: 5, name: '社交达人', description: '发布10条动态', icon: '👥', unlocked: true },
    { id: 6, name: '评论家', description: '发表100条评价', icon: '⭐', unlocked: false }
  ]);

  // 获取用户资料和统计数据
  useEffect(() => {
    if (user && !userProfile) {
      fetchUserProfile();
    }
    fetchDietRecords();
    fetchDishes();
  }, [user, userProfile, fetchUserProfile, fetchDietRecords, fetchDishes]);

  // 更新本地资料数据
  useEffect(() => {
    if (userProfile) {
      const updatedProfile = {
        id: userProfile.id || user?.id || '',
        name: userProfile.name || user?.user_metadata?.name || '美食爱好者',
        email: user?.email || 'foodlover@example.com',
        avatar: userProfile.avatar_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20person%20avatar%20profile%20picture%20smiling%20cartoon%20style&image_size=square',
        bio: '热爱美食，享受生活中的每一餐',
        joinDate: userProfile.created_at ? new Date(userProfile.created_at).toISOString().split('T')[0] : '2025-01-15',
        preferences: {
          dietType: userProfile.preferences?.dietType || '均衡饮食',
          allergies: userProfile.preferences?.allergies || ['花生', '海鲜'],
          goals: userProfile.preferences?.goals || ['减重', '增肌', '健康饮食'],
          notifications: true
        }
      };
      setLocalProfile(updatedProfile);
      setEditForm({
        name: updatedProfile.name,
        bio: updatedProfile.bio,
        dietType: updatedProfile.preferences.dietType,
        allergies: [...updatedProfile.preferences.allergies],
        goals: [...updatedProfile.preferences.goals]
      });
    }
  }, [userProfile, user]);

  useEffect(() => {
    if (dietRecords.length > 0 && dishes.length > 0) {
      calculateStats();
    }
  }, [dietRecords, dishes]);

  const calculateStats = () => {
    const totalCalories = dietRecords.reduce((sum, record) => {
      const dish = record.dish;
      if (dish) {
        const multiplier = record.portion / 100;
        return sum + ((dish.nutrition_facts?.calories || 0) * multiplier);
      }
      return sum;
    }, 0);

    // 计算连续记录天数
    const sortedRecords = [...dietRecords].sort((a, b) => 
      new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
    );
    
    let streakDays = 0;
    const today = new Date();
    
    for (let i = 0; i < sortedRecords.length; i++) {
      const recordDate = new Date(sortedRecords[i].record_date);
      const daysDiff = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streakDays++;
      } else {
        break;
      }
    }

    setUserStats({
      totalRecords: dietRecords.length,
      totalDishes: new Set(dietRecords.map(r => r.dish_id)).size,
      favoriteCount: Math.floor(Math.random() * 20) + 5, // 模拟收藏数
      reviewCount: Math.floor(Math.random() * 50) + 10, // 模拟评价数
      streakDays,
      avgCalories: dietRecords.length > 0 ? totalCalories / dietRecords.length : 0
    });
  };

  const handleEditProfile = () => {
    setEditForm({
      name: localProfile.name,
      bio: localProfile.bio,
      dietType: localProfile.preferences.dietType,
      allergies: [...localProfile.preferences.allergies],
      goals: [...localProfile.preferences.goals]
    });
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      const result = await updateProfile({
        name: editForm.name,
        preferences: {
          dietType: editForm.dietType,
          allergies: editForm.allergies,
          goals: editForm.goals,
          notifications: true
        }
      });
      
      if (result.success) {
        const updatedProfile = {
          ...localProfile,
          name: editForm.name,
          bio: editForm.bio,
          preferences: {
            ...localProfile.preferences,
            dietType: editForm.dietType,
            allergies: editForm.allergies,
            goals: editForm.goals
          }
        };
        setLocalProfile(updatedProfile);
        setIsEditing(false);
        toast.success('个人资料更新成功！');
      } else {
        toast.error(result.error || '更新失败，请重试');
      }
    } catch (error) {
      console.error('更新个人资料失败:', error);
      toast.error('更新失败，请重试');
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: localProfile.name,
      bio: localProfile.bio,
      dietType: localProfile.preferences.dietType,
      allergies: [...localProfile.preferences.allergies],
      goals: [...localProfile.preferences.goals]
    });
    setIsEditing(false);
  };

  const addAllergy = (allergy: string) => {
    if (allergy && !editForm.allergies.includes(allergy)) {
      setEditForm(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergy]
      }));
    }
  };

  const removeAllergy = (allergy: string) => {
    setEditForm(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  const addGoal = (goal: string) => {
    if (goal && !editForm.goals.includes(goal)) {
      setEditForm(prev => ({
        ...prev,
        goals: [...prev.goals, goal]
      }));
    }
  };

  const removeGoal = (goal: string) => {
    setEditForm(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g !== goal)
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('已成功退出登录');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('退出登录失败:', error);
      toast.error('退出登录失败');
    }
  };

  const menuItems = [
    { icon: CogIcon, label: '账户设置', action: () => setShowAccountSettings(true) },
    { icon: BellIcon, label: '通知设置', action: () => setShowNotificationSettings(true) },
    { icon: ShieldCheckIcon, label: '隐私设置', action: () => setShowPrivacySettings(true) },
    { icon: QuestionMarkCircleIcon, label: '帮助中心', action: () => setShowHelpCenter(true) },
    { icon: ArrowRightOnRectangleIcon, label: '退出登录', action: handleLogout, danger: true }
  ];

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 用户信息卡片 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-400 to-pink-400 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex items-start -mt-16 mb-4">
            <img
              src={localProfile.avatar}
              alt={localProfile.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="ml-4 flex-1 mt-16">
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-orange-300 focus:border-orange-500 outline-none bg-transparent"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{localProfile.name}</h1>
                  )}
                  <p className="text-gray-600">{localProfile.email}</p>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <CheckIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditProfile}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2">
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full text-gray-700 border border-gray-300 rounded-md p-2 focus:border-orange-500 outline-none resize-none"
                    rows={2}
                    placeholder="介绍一下自己..."
                  />
                ) : (
                  <p className="text-gray-700">{localProfile.bio}</p>
                )}
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <CalendarDaysIcon className="w-4 h-4 mr-1" />
                加入于 {new Date(localProfile.joinDate).toLocaleDateString('zh-CN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{userStats.totalRecords}</div>
          <div className="text-sm text-gray-600">饮食记录</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{userStats.totalDishes}</div>
          <div className="text-sm text-gray-600">尝试菜品</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{userStats.favoriteCount}</div>
          <div className="text-sm text-gray-600">收藏菜品</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{userStats.streakDays}</div>
          <div className="text-sm text-gray-600">连续天数</div>
        </div>
      </div>

      {/* 成就系统 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrophyIcon className="w-5 h-5 mr-2 text-yellow-500" />
          我的成就
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <div>
                  <h4 className={`font-medium ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.unlocked && (
                    <div className="flex items-center text-xs text-yellow-600">
                      <CheckIcon className="w-3 h-3 mr-1" />
                      已解锁
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-sm ${
                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 饮食偏好 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <HeartIcon className="w-5 h-5 mr-2 text-red-500" />
          饮食偏好
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">饮食类型</label>
            {isEditing ? (
              <select
                value={editForm.dietType}
                onChange={(e) => setEditForm(prev => ({ ...prev, dietType: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-orange-500 outline-none"
              >
                <option value="均衡饮食">均衡饮食</option>
                <option value="素食主义">素食主义</option>
                <option value="低碳水化合物">低碳水化合物</option>
                <option value="高蛋白">高蛋白</option>
                <option value="地中海饮食">地中海饮食</option>
              </select>
            ) : (
              <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                {localProfile.preferences.dietType}
              </span>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">过敏原</label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editForm.allergies : localProfile.preferences.allergies).map((allergy) => (
                <span
                  key={allergy}
                  className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                >
                  {allergy}
                  {isEditing && (
                    <button
                      onClick={() => removeAllergy(allergy)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="添加过敏原"
                  className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:border-orange-500 outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addAllergy(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">健康目标</label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editForm.goals : localProfile.preferences.goals).map((goal) => (
                <span
                  key={goal}
                  className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {goal}
                  {isEditing && (
                    <button
                      onClick={() => removeGoal(goal)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="添加目标"
                  className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:border-orange-500 outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addGoal(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 设置菜单 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 p-6 border-b border-gray-200 flex items-center">
          <CogIcon className="w-5 h-5 mr-2 text-gray-600" />
          设置
        </h3>
        <div className="divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 账户设置弹窗 */}
      {showAccountSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">账户设置</h3>
              <button
                onClick={() => setShowAccountSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户ID</label>
                <input
                  type="text"
                  value={user?.id || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm"
                />
              </div>
              <div>
                <button
                  onClick={() => {
                    toast.info('密码重置邮件已发送到您的邮箱');
                    setShowAccountSettings(false);
                  }}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  重置密码
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通知设置弹窗 */}
      {showNotificationSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">通知设置</h3>
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">推送通知</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">邮件通知</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">饮食提醒</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">健康报告</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <button
                onClick={() => {
                  toast.success('通知设置已保存');
                  setShowNotificationSettings(false);
                }}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 隐私设置弹窗 */}
      {showPrivacySettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">隐私设置</h3>
              <button
                onClick={() => setShowPrivacySettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">公开个人资料</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">显示饮食记录</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">允许好友查看</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">数据分析</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <button
                onClick={() => {
                  toast.success('隐私设置已保存');
                  setShowPrivacySettings(false);
                }}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 帮助中心弹窗 */}
      {showHelpCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">帮助中心</h3>
              <button
                onClick={() => setShowHelpCenter(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">常见问题</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Q: 如何记录饮食？</strong></p>
                  <p>A: 点击"饮食记录"页面，选择菜品并输入份量即可。</p>
                  
                  <p><strong>Q: 如何查看营养分析？</strong></p>
                  <p>A: 在"健康报告"页面可以查看详细的营养分析数据。</p>
                  
                  <p><strong>Q: 如何设置饮食目标？</strong></p>
                  <p>A: 在个人资料的"健康目标"中可以设置您的饮食目标。</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">联系我们</h4>
                <p className="text-sm text-gray-600">邮箱: support@foodexplorer.com</p>
                <p className="text-sm text-gray-600">电话: 400-123-4567</p>
              </div>
              <button
                onClick={() => setShowHelpCenter(false)}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}