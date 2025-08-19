import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for backend')
}

// 后端使用 service role key，拥有完整的数据库访问权限
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// 用于验证用户token的客户端
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
if (supabaseAnonKey) {
  const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey)
}