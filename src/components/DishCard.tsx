import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon as StarSolidIcon, FireIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import OptimizedImage from './OptimizedImage';
import { Dish } from '../lib/supabase';

interface DishCardProps {
  dish: Dish;
  variant?: 'default' | 'compact' | 'featured';
  showActions?: boolean;
  className?: string;
  index?: number;
}

// 动画变体
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6
    }
  }
};

const overlayVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

const actionButtonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

export function DishCard({ 
  dish, 
  variant = 'default', 
  showActions = true, 
  className = '',
  index = 0 
}: DishCardProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // 根据变体设置不同的样式
  const getCardStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 group',
          imageHeight: 'h-32',
          padding: 'p-4',
          titleSize: 'text-sm font-semibold'
        };
      case 'featured':
        return {
          container: 'bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-300 group',
          imageHeight: 'h-56',
          padding: 'p-6',
          titleSize: 'text-xl font-bold'
        };
      default:
        return {
          container: 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 group',
          imageHeight: 'h-48',
          padding: 'p-6',
          titleSize: 'text-lg font-bold'
        };
    }
  };

  const styles = getCardStyles();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      className={`${styles.container} ${className}`}
    >
      <Link to={`/dishes/${dish.id}`} className="block">
        {/* 图片区域 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <motion.div variants={imageVariants}>
            <OptimizedImage
              src={dish.image_url}
              alt={dish.name}
              className={`w-full ${styles.imageHeight} object-cover`}
              lazy={true}
            />
          </motion.div>
          
          {/* 悬停遮罩 */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0"
            variants={overlayVariants}
          />
          
          {/* 操作按钮 */}
          {showActions && (
            <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                variants={actionButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500/90 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {isLiked ? (
                  <HeartIcon className="w-4 h-4" />
                ) : (
                  <HeartOutlineIcon className="w-4 h-4" />
                )}
              </motion.button>
              
              <motion.button
                variants={actionButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleBookmark}
                className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-blue-500/90 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <BookmarkIcon className="w-4 h-4" />
              </motion.button>
            </div>
          )}
          
          {/* 评分徽章 */}
          {dish.avg_rating && dish.avg_rating > 4.5 && (
            <div className="absolute top-3 left-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-lg"
              >
                <StarSolidIcon className="w-3 h-3 mr-1" />
                推荐
              </motion.div>
            </div>
          )}
        </div>
        
        {/* 内容区域 */}
        <div className={styles.padding}>
          <motion.h3 
            className={`${styles.titleSize} text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200`}
            whileHover={{ x: 2 }}
          >
            {dish.name}
          </motion.h3>
          
          {variant !== 'compact' && dish.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          )}
          
          {/* 底部信息 */}
          <div className="flex items-center justify-between">
            {/* 评分 */}
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                  >
                    <StarSolidIcon
                      className={`w-4 h-4 ${
                        i < Math.floor(dish.avg_rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2">
                {(dish.avg_rating || 0).toFixed(1)}
              </span>
            </div>
            
            {/* 卡路里信息 */}
            <motion.div 
              className="flex items-center text-sm font-medium text-orange-600 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-1 rounded-full border border-orange-100"
              whileHover={{ scale: 1.05 }}
            >
              <FireIcon className="w-4 h-4 mr-1" />
              {dish.nutrition_facts?.calories || 0} 卡
            </motion.div>
          </div>
          
          {/* 额外信息（仅在featured变体中显示） */}
          {variant === 'featured' && (
            <motion.div 
              className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
15 分钟
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
简单
              </div>
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default DishCard;