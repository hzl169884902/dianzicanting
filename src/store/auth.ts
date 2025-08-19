import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import { authLog } from '../utils/logger';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  phone?: string;
  phone_verified?: boolean;
  qq_openid?: string;
  wechat_openid?: string;
  two_factor_enabled?: boolean;
  plan: 'free' | 'premium';
  preferences: {
    dietType?: string;
    allergies?: string[];
    goals?: string[];
    notifications?: boolean;
  };
  created_at: string;
  updated_at: string;
}

interface SMSVerification {
  phone: string;
  code: string;
  expires_at: string;
}

interface ThirdPartyLoginData {
  provider: 'qq' | 'wechat';
  code: string;
  state?: string;
}

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Auth Actions
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  fetchUserProfile: () => Promise<void>;
  initialize: () => Promise<void>;
  
  // Phone verification
  sendSMSCode: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifySMSCode: (phone: string, code: string) => Promise<{ success: boolean; error?: string }>;
  bindPhone: (phone: string, code: string) => Promise<{ success: boolean; error?: string }>;
  
  // Third-party login
  signInWithQQ: (code: string, state?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithWechat: (code: string, state?: string) => Promise<{ success: boolean; error?: string }>;
  getQQLoginUrl: () => Promise<{ success: boolean; url?: string; error?: string }>;
  getWechatLoginUrl: () => Promise<{ success: boolean; url?: string; error?: string }>;
  
  // Demo accounts
  createDemoAccount: () => Promise<{ success: boolean; email?: string; password?: string; error?: string }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  session: null,
  loading: false,
  error: null,
  
  // Setters
  setUser: (user) => set({ user }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Auth Actions
  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        set({ error: error.message });
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        // 创建用户档案
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email!,
              name,
              preferences: {
                dietType: '均衡饮食',
                allergies: [],
                goals: [],
                notifications: true,
              },
            },
          ]);
        
        if (profileError) {
          console.error('创建用户档案失败:', profileError);
        }
        
        set({ user: data.user, session: data.session });
      }
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册失败';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  signIn: async (email: string, password: string) => {
    authLog.info('开始登录', { email });
    
    try {
      set({ loading: true, error: null });
      
      console.log('尝试登录:', { email, passwordLength: password.length });
      
      // 优化超时处理，减少等待时间
      const loginPromise = supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('登录超时，请检查网络连接')), 8000); // 从15秒减少到8秒
      });
      
      const { data, error } = await Promise.race([loginPromise, timeoutPromise]) as any;
      
      console.log('登录响应:', { data, error });
      
      if (error) {
        let errorMessage = error.message;
        
        // 提供更友好的错误信息
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = '邮箱或密码错误，请检查后重试';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = '请先验证您的邮箱';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = '登录尝试过于频繁，请稍后再试';
        } else if (error.message.includes('登录超时')) {
          errorMessage = '登录超时，请检查网络连接后重试';
        }
        
        authLog.error('登录失败', { email, error: errorMessage }, error);
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      if (!data.user || !data.session) {
        const errorMessage = '登录失败：未获取到用户信息';
        authLog.warn('登录失败：未返回用户数据', { email });
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      authLog.info('登录成功', { userId: data.user.id, email: data.user.email });
      set({ user: data.user, session: data.session });
      
      // 异步获取用户档案，不阻塞登录流程
      get().fetchUserProfile().catch(profileError => {
        authLog.warn('获取用户档案失败', { error: profileError instanceof Error ? profileError.message : 'Unknown error' });
      });
      
      return { success: true };
    } catch (error) {
      console.error('登录异常:', error);
      let errorMessage = '登录失败，请稍后重试';
      
      if (error instanceof Error) {
        if (error.message.includes('登录超时')) {
          errorMessage = '登录超时，请检查网络连接后重试';
        } else {
          errorMessage = error.message;
        }
      }
      
      authLog.error('登录异常', { email, error: errorMessage }, error instanceof Error ? error : undefined);
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  signOut: async () => {
    authLog.info('开始登出');
    
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        authLog.error('登出失败', { error: error.message }, error);
        set({ error: error.message });
        return;
      }
      
      set({ user: null, userProfile: null, session: null });
      authLog.info('登出成功');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '退出登录失败';
      authLog.error('登出异常', { error: errorMessage }, error instanceof Error ? error : undefined);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  
  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        set({ error: error.message });
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '重置密码失败';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  updateProfile: async (updates: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      
      const { user } = get();
      if (!user) {
        throw new Error('用户未登录');
      }
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        set({ error: error.message });
        return { success: false, error: error.message };
      }
      
      set({ userProfile: data });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '更新档案失败';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  fetchUserProfile: async () => {
    const { user } = get();
    if (!user) {
      authLog.warn('尝试获取用户档案但用户未登录');
      return;
    }
    
    authLog.info('开始获取用户档案', { userId: user.id });
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        authLog.error('获取用户档案失败', { userId: user.id, error: error.message }, error);
        return;
      }
      
      set({ userProfile: data });
      authLog.info('用户档案获取成功', { userId: user.id, hasProfile: !!data });
    } catch (error) {
      authLog.error('获取用户档案异常', { userId: user.id, error: error instanceof Error ? error.message : 'Unknown error' }, error instanceof Error ? error : undefined);
    }
  },
  
  initialize: async () => {
    authLog.info('开始初始化认证状态');
    
    try {
      set({ loading: true });
      
      // 添加超时处理，避免长时间卡顿
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('初始化超时')), 5000); // 5秒超时
      });
      
      const sessionPromise = supabase.auth.getSession();
      
      const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]) as any;
      
      if (error) {
        authLog.error('获取会话失败', { error: error.message }, error);
        return;
      }
      
      if (session) {
        authLog.info('用户会话有效', { userId: session.user.id, email: session.user.email });
        set({ user: session.user, session });
        // 异步获取用户档案，不阻塞主流程
        get().fetchUserProfile().catch(err => {
          authLog.warn('获取用户详细信息失败', { error: err instanceof Error ? err.message : 'Unknown error' });
        });
      } else {
        authLog.info('无有效用户会话');
      }
      
      // 监听认证状态变化
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({ user: session?.user || null, session });
        
        if (session?.user) {
          await get().fetchUserProfile();
        } else {
          set({ userProfile: null });
        }
      });
    } catch (error) {
      authLog.error('初始化认证失败', { error: error instanceof Error ? error.message : 'Unknown error' }, error instanceof Error ? error : undefined);
      set({ user: null, error: null }); // 静默处理错误，避免影响用户体验
    } finally {
      set({ loading: false });
      authLog.info('认证状态初始化完成');
    }
  },
  
  // 短信验证功能
  sendSMSCode: async (phone: string) => {
    authLog.info('开始发送短信验证码', { phone });
    
    try {
      set({ loading: true, error: null });
      
      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        const errorMessage = '请输入正确的手机号码';
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 生成6位验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5分钟后过期
      
      authLog.debug('生成验证码', { phone, code });
      
      // 添加超时处理
      const insertPromise = supabase
        .from('sms_verification')
        .insert({
          phone,
          code,
          expires_at: expiresAt.toISOString(),
        });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('发送验证码超时')), 10000);
      });
      
      const { error } = await Promise.race([insertPromise, timeoutPromise]) as any;
      
      if (error) {
        console.error('保存验证码失败:', error);
        const errorMessage = '发送验证码失败，请稍后重试';
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 使用toast显示验证码，提供更好的用户体验
      console.log(`🔐 验证码已发送到 ${phone}: ${code}`);
      
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        // 触发自定义事件来显示toast
        const event = new CustomEvent('showSMSCode', {
          detail: { phone, code }
        });
        window.dispatchEvent(event);
      }
      
      // 创建一个临时的提示元素显示验证码
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 16px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease-out;">
          <div style="font-weight: 600; margin-bottom: 4px;">📱 验证码已发送</div>
          <div style="font-size: 14px;">手机号: ${phone}</div>
          <div style="font-size: 14px; font-weight: 600;">验证码: <span style="font-size: 16px; color: #fbbf24;">${code}</span></div>
          <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">5分钟内有效</div>
        </div>
      `;
      
      // 添加CSS动画
      if (!document.getElementById('sms-notification-style')) {
        const style = document.createElement('style');
        style.id = 'sms-notification-style';
        style.textContent = `
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(notification);
      
      // 5秒后自动移除提示
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'slideIn 0.3s ease-out reverse';
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }
      }, 5000);
      
      // 减少模拟延迟，提升用户体验
      await new Promise(resolve => setTimeout(resolve, 500)); // 从800ms减少到500ms
      
      authLog.info('短信验证码发送成功', { phone });
      return { success: true };
    } catch (error) {
      console.error('发送短信验证码异常:', error);
      let errorMessage = '发送验证码失败';
      
      if (error instanceof Error && error.message.includes('超时')) {
        errorMessage = '发送验证码超时，请检查网络连接';
      }
      
      authLog.error('发送短信验证码失败', { phone, error: errorMessage }, error instanceof Error ? error : undefined);
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  verifySMSCode: async (phone: string, code: string) => {
    authLog.info('开始验证短信验证码', { phone, code });
    
    try {
      set({ loading: true, error: null });
      
      // 查询验证码
      const { data, error } = await supabase
        .from('sms_verification')
        .select('*')
        .eq('phone', phone)
        .eq('code', code)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error || !data) {
        const errorMessage = '验证码错误或已过期';
        authLog.warn('验证码验证失败', { phone, code, error: error?.message });
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 标记验证码为已使用
      await supabase
        .from('sms_verification')
        .update({ verified: true })
        .eq('id', data.id);
      
      authLog.info('短信验证码验证成功', { phone });
      return { success: true };
    } catch (error) {
      console.error('验证短信验证码异常:', error);
      const errorMessage = error instanceof Error ? error.message : '验证失败';
      authLog.error('验证短信验证码失败', { phone, error: errorMessage }, error instanceof Error ? error : undefined);
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  bindPhone: async (phone: string, code: string) => {
    try {
      set({ loading: true, error: null });
      
      const { user } = get();
      if (!user) {
        const errorMessage = '请先登录';
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 先验证短信验证码
      const verifyResult = await get().verifySMSCode(phone, code);
      if (!verifyResult.success) {
        return verifyResult;
      }
      
      // 绑定手机号
      const { error } = await supabase
        .from('users')
        .update({ 
          phone, 
          phone_verified: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('绑定手机号失败:', error);
        const errorMessage = '绑定手机号失败，请稍后重试';
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 更新用户档案
      await get().fetchUserProfile();
      
      return { success: true };
    } catch (error) {
      console.error('绑定手机号异常:', error);
      const errorMessage = error instanceof Error ? error.message : '绑定失败';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
  
  // 第三方登录功能
  getQQLoginUrl: async () => {
    authLog.info('开始生成QQ登录URL');
    
    try {
      // 检查是否配置了真实的QQ AppID
      const appId = process.env.VITE_QQ_APP_ID || 'demo_qq_app_id';
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/qq/callback`);
      const state = Math.random().toString(36).substring(2);
      
      // 保存state到localStorage用于验证
      localStorage.setItem('qq_oauth_state', state);
      
      if (appId === 'demo_qq_app_id') {
        console.warn('使用演示模式QQ登录，请配置真实的VITE_QQ_APP_ID环境变量');
        // 返回模拟的登录URL
        const url = `${window.location.origin}/auth/qq/demo?state=${state}`;
        authLog.info('QQ登录URL生成成功（演示模式）', { appId, redirectUri, state });
        return { success: true, url };
      }
      
      const url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=get_user_info`;
      
      authLog.info('QQ登录URL生成成功', { appId, redirectUri, state });
      return { success: true, url };
    } catch (error: any) {
      authLog.error('QQ登录URL生成失败', { error: error.message }, error);
      return { success: false, error: error.message };
    }
  },

  getWechatLoginUrl: async () => {
    authLog.info('开始生成微信登录URL');
    
    try {
      // 检查是否配置了真实的微信AppID
      const appId = process.env.VITE_WECHAT_APP_ID || 'demo_wechat_app_id';
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/wechat/callback`);
      const state = Math.random().toString(36).substring(2);
      
      // 保存state到localStorage用于验证
      localStorage.setItem('wechat_oauth_state', state);
      
      if (appId === 'demo_wechat_app_id') {
        console.warn('使用演示模式微信登录，请配置真实的VITE_WECHAT_APP_ID环境变量');
        // 返回模拟的登录URL
        const url = `${window.location.origin}/auth/wechat/demo?state=${state}`;
        authLog.info('微信登录URL生成成功（演示模式）', { appId, redirectUri, state });
        return { success: true, url };
      }
      
      const url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=${state}`;
      
      authLog.info('微信登录URL生成成功', { appId, redirectUri, state });
      return { success: true, url };
    } catch (error: any) {
      authLog.error('微信登录URL生成失败', { error: error.message }, error);
      return { success: false, error: error.message };
    }
  },
  
  signInWithQQ: async (code: string, state: string) => {
    try {
      set({ loading: true, error: null });
      
      // 验证state
      const savedState = localStorage.getItem('qq_oauth_state');
      if (state !== savedState) {
        const errorMessage = '登录状态验证失败';
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 检查是否为演示模式
      const isDemo = code === 'demo_code';
      let qqUserInfo;
      
      if (isDemo) {
        // 演示模式，使用模拟数据
        qqUserInfo = {
          openid: `qq_demo_${Date.now()}`,
          nickname: 'QQ演示用户',
          figureurl_qq_1: 'https://via.placeholder.com/100x100?text=QQ'
        };
        console.log('QQ演示登录模式，用户信息:', qqUserInfo);
      } else {
        // 真实模式，调用QQ API（需要配置真实的AppID和AppSecret）
        try {
          // 这里应该调用真实的QQ API
          // 由于没有真实配置，我们提供友好的错误提示
          throw new Error('QQ登录需要配置真实的AppID和AppSecret');
        } catch (apiError) {
          console.error('QQ API调用失败:', apiError);
          const errorMessage = 'QQ登录配置错误，请联系管理员或使用其他登录方式';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
      }
      
      // 检查是否已有关联账户
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('qq_openid', qqUserInfo.openid)
        .single();
      
      if (existingUser) {
        // 已有关联账户，直接登录
        const { data, error } = await supabase.auth.signInWithPassword({
          email: existingUser.email,
          password: 'qq_login_' + qqUserInfo.openid // 使用特殊密码
        });
        
        if (error) {
          console.error('QQ登录失败:', error);
          const errorMessage = 'QQ登录失败，请稍后重试';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
        
        return { success: true };
      } else {
        // 创建新账户
        const email = `qq_${qqUserInfo.openid}@temp.com`;
        const password = 'qq_login_' + qqUserInfo.openid;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: qqUserInfo.nickname,
              avatar_url: qqUserInfo.figureurl_qq_1,
              qq_openid: qqUserInfo.openid
            }
          }
        });
        
        if (error) {
          console.error('QQ注册失败:', error);
          const errorMessage = 'QQ登录失败，请稍后重试';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
        
        // 记录第三方登录信息
        if (data.user) {
          await supabase.from('third_party_logins').insert({
            user_id: data.user.id,
            provider: 'qq',
            provider_user_id: qqUserInfo.openid,
            user_info: qqUserInfo
          });
        }
        
        return { success: true };
      }
    } catch (error) {
      console.error('QQ登录异常:', error);
      const errorMessage = error instanceof Error ? error.message : 'QQ登录失败';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
      localStorage.removeItem('qq_oauth_state');
    }
  },
  
  signInWithWechat: async (code: string, state: string) => {
    try {
      set({ loading: true, error: null });
      
      // 验证state
      const savedState = localStorage.getItem('wechat_oauth_state');
      if (state !== savedState) {
        const errorMessage = '登录状态验证失败';
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      // 检查是否为演示模式
      const isDemo = code === 'demo_code';
      let wechatUserInfo;
      
      if (isDemo) {
        // 演示模式，使用模拟数据
        wechatUserInfo = {
          openid: `wechat_demo_${Date.now()}`,
          nickname: '微信演示用户',
          headimgurl: 'https://via.placeholder.com/100x100?text=WeChat'
        };
        console.log('微信演示登录模式，用户信息:', wechatUserInfo);
      } else {
        // 真实模式，调用微信API（需要配置真实的AppID和AppSecret）
        try {
          // 这里应该调用真实的微信API
          // 由于没有真实配置，我们提供友好的错误提示
          throw new Error('微信登录需要配置真实的AppID和AppSecret');
        } catch (apiError) {
          console.error('微信API调用失败:', apiError);
          const errorMessage = '微信登录配置错误，请联系管理员或使用其他登录方式';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
      }
      
      // 检查是否已有关联账户
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('wechat_openid', wechatUserInfo.openid)
        .single();
      
      if (existingUser) {
        // 已有关联账户，直接登录
        const { data, error } = await supabase.auth.signInWithPassword({
          email: existingUser.email,
          password: 'wechat_login_' + wechatUserInfo.openid
        });
        
        if (error) {
          console.error('微信登录失败:', error);
          const errorMessage = '微信登录失败，请稍后重试';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
        
        return { success: true };
      } else {
        // 创建新账户
        const email = `wechat_${wechatUserInfo.openid}@temp.com`;
        const password = 'wechat_login_' + wechatUserInfo.openid;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: wechatUserInfo.nickname,
              avatar_url: wechatUserInfo.headimgurl,
              wechat_openid: wechatUserInfo.openid
            }
          }
        });
        
        if (error) {
          console.error('微信注册失败:', error);
          const errorMessage = '微信登录失败，请稍后重试';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
        
        // 记录第三方登录信息
        if (data.user) {
          await supabase.from('third_party_logins').insert({
            user_id: data.user.id,
            provider: 'wechat',
            provider_user_id: wechatUserInfo.openid,
            user_info: wechatUserInfo
          });
        }
        
        return { success: true };
      }
    } catch (error) {
      console.error('微信登录异常:', error);
      const errorMessage = error instanceof Error ? error.message : '微信登录失败';
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
      localStorage.removeItem('wechat_oauth_state');
    }
  },
  
  // 创建演示账户
  createDemoAccount: async () => {
    authLog.info('开始创建演示账户');
    
    try {
      set({ loading: true, error: null });
      
      // 使用预设的演示账户，避免每次创建新账户
      const demoAccounts = [
        { email: 'demo1@example.com', password: 'demo123456', name: '演示用户1' },
        { email: 'demo2@example.com', password: 'demo123456', name: '演示用户2' },
        { email: 'demo3@example.com', password: 'demo123456', name: '演示用户3' }
      ];
      
      const randomDemo = demoAccounts[Math.floor(Math.random() * demoAccounts.length)];
      
      authLog.debug('选择演示账户', { email: randomDemo.email });
      
      // 先尝试登录现有演示账户
      const loginResult = await get().signIn(randomDemo.email, randomDemo.password);
      
      if (loginResult.success) {
        console.log('使用现有演示账户登录成功:', randomDemo.email);
        authLog.info('演示账户登录成功', { email: randomDemo.email });
        return { 
          success: true, 
          email: randomDemo.email, 
          password: randomDemo.password 
        };
      }
      
      // 如果登录失败，创建新的演示账户
      const { data, error } = await supabase.auth.signUp({
        email: randomDemo.email,
        password: randomDemo.password,
        options: {
          data: {
            name: randomDemo.name,
            avatar_url: 'https://via.placeholder.com/100x100?text=Demo'
          }
        }
      });
      
      if (error && !error.message.includes('already registered')) {
        console.error('创建演示账户失败:', error);
        const errorMessage = '创建演示账户失败，请稍后重试';
        authLog.error('创建演示账户失败', { email: randomDemo.email, error: errorMessage }, error);
        set({ error: errorMessage });
        return { success: false, error: errorMessage };
      }
      
      console.log('演示账户创建成功:', randomDemo);
      authLog.info('演示账户创建成功', { email: randomDemo.email });
      
      return { 
        success: true, 
        email: randomDemo.email, 
        password: randomDemo.password 
      };
    } catch (error) {
      console.error('创建演示账户异常:', error);
      const errorMessage = error instanceof Error ? error.message : '创建演示账户失败';
      authLog.error('创建演示账户异常', { error: errorMessage }, error instanceof Error ? error : undefined);
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
}));