-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建用户表 (扩展auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建菜品分类表
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建菜品表
CREATE TABLE public.dishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    category_id UUID REFERENCES categories(id),
    nutrition_facts JSONB DEFAULT '{}',
    avg_rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建饮食记录表
CREATE TABLE public.diet_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    dish_id UUID REFERENCES dishes(id),
    record_date DATE NOT NULL,
    meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    portion DECIMAL(4,2) DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建菜品评价表
CREATE TABLE public.dish_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    dish_id UUID REFERENCES dishes(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户目标表
CREATE TABLE public.user_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    goal_type VARCHAR(50) NOT NULL,
    target_values JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建食材表
CREATE TABLE public.ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    nutrition_per_100g JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建菜品食材关联表
CREATE TABLE public.dish_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dish_id UUID REFERENCES dishes(id),
    ingredient_id UUID REFERENCES ingredients(id),
    amount DECIMAL(8,2),
    unit VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建社交动态表
CREATE TABLE public.social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    content TEXT,
    image_url TEXT,
    dish_id UUID REFERENCES dishes(id),
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建社交动态评论表
CREATE TABLE public.social_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES social_posts(id),
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建点赞表
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    post_id UUID REFERENCES social_posts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- 创建索引
CREATE INDEX idx_dishes_category ON dishes(category_id);
CREATE INDEX idx_dishes_rating ON dishes(avg_rating DESC);
CREATE INDEX idx_dishes_popularity ON dishes(popularity_score DESC);
CREATE INDEX idx_diet_records_user_date ON diet_records(user_id, record_date DESC);
CREATE INDEX idx_diet_records_dish ON diet_records(dish_id);
CREATE INDEX idx_dish_reviews_dish ON dish_reviews(dish_id, created_at DESC);
CREATE INDEX idx_dish_reviews_user ON dish_reviews(user_id);
CREATE INDEX idx_user_goals_user ON user_goals(user_id, is_active);
CREATE INDEX idx_social_posts_user ON social_posts(user_id, created_at DESC);
CREATE INDEX idx_social_comments_post ON social_comments(post_id, created_at DESC);

-- 启用行级安全策略
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dish_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dish_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
-- 用户表策略
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- 分类表策略（所有人可读）
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- 菜品表策略（所有人可读）
CREATE POLICY "Dishes are viewable by everyone" ON public.dishes FOR SELECT USING (true);

-- 饮食记录策略（用户只能访问自己的记录）
CREATE POLICY "Users can view own diet records" ON public.diet_records FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own diet records" ON public.diet_records FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own diet records" ON public.diet_records FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own diet records" ON public.diet_records FOR DELETE USING (auth.uid()::text = user_id::text);

-- 菜品评价策略
CREATE POLICY "Reviews are viewable by everyone" ON public.dish_reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON public.dish_reviews FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own reviews" ON public.dish_reviews FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own reviews" ON public.dish_reviews FOR DELETE USING (auth.uid()::text = user_id::text);

-- 用户目标策略
CREATE POLICY "Users can view own goals" ON public.user_goals FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own goals" ON public.user_goals FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own goals" ON public.user_goals FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own goals" ON public.user_goals FOR DELETE USING (auth.uid()::text = user_id::text);

-- 食材表策略（所有人可读）
CREATE POLICY "Ingredients are viewable by everyone" ON public.ingredients FOR SELECT USING (true);

-- 菜品食材关联表策略（所有人可读）
CREATE POLICY "Dish ingredients are viewable by everyone" ON public.dish_ingredients FOR SELECT USING (true);

-- 社交动态策略
CREATE POLICY "Posts are viewable by everyone" ON public.social_posts FOR SELECT USING (true);
CREATE POLICY "Users can insert own posts" ON public.social_posts FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own posts" ON public.social_posts FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own posts" ON public.social_posts FOR DELETE USING (auth.uid()::text = user_id::text);

-- 社交评论策略
CREATE POLICY "Comments are viewable by everyone" ON public.social_comments FOR SELECT USING (true);
CREATE POLICY "Users can insert own comments" ON public.social_comments FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own comments" ON public.social_comments FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own comments" ON public.social_comments FOR DELETE USING (auth.uid()::text = user_id::text);

-- 点赞策略
CREATE POLICY "Likes are viewable by everyone" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Users can insert own likes" ON public.likes FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own likes" ON public.likes FOR DELETE USING (auth.uid()::text = user_id::text);