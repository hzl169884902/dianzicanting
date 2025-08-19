import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 类型定义
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  plan: 'free' | 'premium'
  preferences: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  created_at: string
}

export interface Dish {
  id: string
  name: string
  description?: string
  image_url?: string
  category_id: string
  brand_id?: string
  brands?: {
    id: string
    name: string
    logo_url?: string
  }
  nutrition_facts: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
    fiber?: number
  }
  cooking_time?: number
  avg_rating: number
  review_count: number
  popularity_score: number
  created_at: string
  category?: Category
}

export interface DietRecord {
  id: string
  user_id: string
  dish_id: string
  record_date: string
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  portion: number
  notes?: string
  created_at: string
  dish?: Dish
}

export interface DishReview {
  id: string
  user_id: string
  dish_id: string
  rating: number
  comment?: string
  image_url?: string
  user_name?: string
  created_at: string
  user?: User
}

export interface UserGoal {
  id: string
  user_id: string
  goal_type: string
  target_values: Record<string, any>
  is_active: boolean
  created_at: string
}

export interface Brand {
  id: string
  name: string
  description?: string
  logo_url?: string
  brand_type?: string
  founded_year?: number
  origin_location?: string
  website?: string
  created_at: string
  updated_at: string
}

export interface DishWithDetails extends Dish {
  dish_reviews?: DishReview[]
  dish_ingredients: {
    amount: string
    unit: string
    ingredients: {
      name: string
    }
  }[]
}