export interface Dish {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  category_id: string;
  brand_id?: string;
  brands?: {
    id: string;
    name: string;
    logo_url?: string;
  };
  nutrition_facts: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  cooking_time?: number;
  avg_rating: number;
  review_count: number;
  popularity_score: number;
  created_at: string;
  category?: {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    created_at: string;
  };
  categories?: {
    name: string;
  };
}

export interface DishCategory {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}

export interface DishBrand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  created_at?: string;
}

export interface DishFilters {
  category?: string;
  brand?: string;
  search?: string;
  minCalories?: number;
  maxCalories?: number;
  minProtein?: number;
  maxProtein?: number;
}

export interface DishSortOptions {
  field: 'name' | 'calories' | 'protein' | 'rating';
  direction: 'asc' | 'desc';
}

export interface DeduplicationResult {
  dishes: Dish[];
  report: string;
  duplicatesRemoved: number;
  originalCount: number;
  finalCount: number;
}