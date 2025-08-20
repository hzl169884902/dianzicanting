import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { ButtonLoader } from './LoadingSpinner';

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animation?: 'bounce' | 'scale' | 'slide' | 'glow' | 'ripple';
  children: React.ReactNode;
}

// 按钮变体样式
const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl border-0',
  secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 border border-gray-300',
  outline: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800 border-0',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl border-0'
};

// 按钮尺寸
const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

// 动画变体
const animationVariants = {
  bounce: {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95, y: 0 },
    transition: { stiffness: 400, damping: 17 }
  },
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { stiffness: 400, damping: 17 }
  },
  slide: {
    whileHover: { x: 2 },
    whileTap: { x: 0 },
    transition: { stiffness: 400, damping: 17 }
  },
  glow: {
    whileHover: { 
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      scale: 1.02
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  },
  ripple: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.95 },
    transition: { stiffness: 400, damping: 17 }
  }
};

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  animation = 'bounce',
  className = '',
  disabled,
  children,
  ...props
}: AnimatedButtonProps) {
  const isDisabled = disabled || loading;
  const animationProps = animationVariants[animation];

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center
        font-medium rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${className}
      `}
      disabled={isDisabled}
      whileHover={animationProps.whileHover}
      whileTap={animationProps.whileTap}
      transition={animationProps.transition}
      {...props}
    >
      {/* 加载状态 */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ButtonLoader size={size === 'lg' ? 'md' : 'sm'} />
        </div>
      )}
      
      {/* 按钮内容 */}
      <div className={`flex items-center space-x-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}
      </div>
      
      {/* 涟漪效果 */}
      {animation === 'ripple' && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
          }}
        />
      )}
    </motion.button>
  );
}

// 浮动操作按钮
export function FloatingActionButton({
  icon,
  onClick,
  className = '',
  ...props
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>) {
  return (
    <motion.button
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600
        text-white rounded-full shadow-lg
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 400,
        damping: 17,
        delay: 0.2
      }}
      onClick={onClick}
      {...props}
    >
      <motion.div
        whileHover={{ rotate: 15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
}

// 按钮组
export function ButtonGroup({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex space-x-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AnimatedButton;