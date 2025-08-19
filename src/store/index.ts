import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Dish, Category, DietRecord, DishReview, Brand } from '@/lib/supabase';

interface AppState {
  // 菜品相关
  dishes: Dish[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: 'name' | 'rating' | 'calories' | 'created_at';
  sortOrder: 'asc' | 'desc';
  
  // 品牌相关
  brands: Brand[];
  selectedBrand: string | null;
  
  // 饮食记录相关
  dietRecords: DietRecord[];
  selectedDate: string;
  
  // 加载状态
  loading: boolean;
  error: string | null;
  
  // Actions
  setDishes: (dishes: Dish[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: 'name' | 'rating' | 'calories' | 'created_at') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setBrands: (brands: Brand[]) => void;
  setSelectedBrand: (brand: string | null) => void;
  setDietRecords: (records: DietRecord[]) => void;
  setSelectedDate: (date: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API Actions
  fetchDishes: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchBrands: () => Promise<void>;
  fetchDietRecords: (date?: string) => Promise<void>;
  addDietRecord: (record: Omit<DietRecord, 'id' | 'created_at'>) => Promise<void>;
  updateDietRecord: (id: string, updates: Partial<DietRecord>) => Promise<void>;
  deleteDietRecord: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  dishes: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
  brands: [],
  selectedBrand: null,
  dietRecords: [],
  selectedDate: new Date().toISOString().split('T')[0],
  loading: false,
  error: null,
  
  // Setters
  setDishes: (dishes) => set({ dishes }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setBrands: (brands) => set({ brands }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setDietRecords: (records) => set({ dietRecords: records }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // API Actions
  fetchDishes: async () => {
    try {
      set({ loading: true, error: null });
      let query = supabase
        .from('dishes')
        .select(`
          *,
          categories(name),
          brands(id, name, logo_url),
          dish_reviews(rating)
        `);
      
      // 如果选择了品牌，添加品牌筛选
      const { selectedBrand } = get();
      if (selectedBrand) {
        query = query.eq('brand_id', selectedBrand);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // 计算平均评分
      const dishesWithRating = data?.map(dish => ({
        ...dish,
        average_rating: dish.dish_reviews?.length > 0 
          ? dish.dish_reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / dish.dish_reviews.length
          : 0
      })) || [];
      
      set({ dishes: dishesWithRating });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '获取菜品失败' });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      set({ categories: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '获取分类失败' });
    }
  },

  fetchBrands: async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');
      
      if (error) throw error;
      set({ brands: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '获取品牌失败' });
    }
  },
  
  fetchDietRecords: async (date) => {
    try {
      set({ loading: true, error: null });
      const targetDate = date || get().selectedDate;
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ dietRecords: [] });
        return;
      }
      
      const { data, error } = await supabase
        .from('diet_records')
        .select(`
          *,
          dishes(name, image_url, nutrition_facts)
        `)
        .eq('user_id', user.id)
        .eq('record_date', targetDate)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ dietRecords: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '获取饮食记录失败' });
    } finally {
      set({ loading: false });
    }
  },
  
  addDietRecord: async (record) => {
    try {
      set({ loading: true, error: null });
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('用户未登录');
      }
      
      const { data, error } = await supabase
        .from('diet_records')
        .insert([{ ...record, user_id: user.id }])
        .select(`
          *,
          dishes(name, image_url, nutrition_facts)
        `);
      
      if (error) throw error;
      
      const currentRecords = get().dietRecords;
      set({ dietRecords: [...currentRecords, ...(data || [])] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '添加饮食记录失败' });
    } finally {
      set({ loading: false });
    }
  },
  
  updateDietRecord: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('用户未登录');
      }
      
      const { data, error } = await supabase
        .from('diet_records')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select(`
          *,
          dishes(name, image_url, nutrition_facts)
        `);
      
      if (error) throw error;
      
      const currentRecords = get().dietRecords;
      const updatedRecords = currentRecords.map(record => 
        record.id === id ? { ...record, ...updates } : record
      );
      set({ dietRecords: updatedRecords });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '更新饮食记录失败' });
    } finally {
      set({ loading: false });
    }
  },
  
  deleteDietRecord: async (id) => {
    try {
      set({ loading: true, error: null });
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('用户未登录');
      }
      
      const { error } = await supabase
        .from('diet_records')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const currentRecords = get().dietRecords;
      const filteredRecords = currentRecords.filter(record => record.id !== id);
      set({ dietRecords: filteredRecords });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '删除饮食记录失败' });
    } finally {
      set({ loading: false });
    }
  },
}));