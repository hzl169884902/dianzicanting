import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AnimatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'floating' | 'minimal';
  animation?: 'slide' | 'fade' | 'bounce';
}

interface AnimatedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  label?: string;
  error?: string;
  success?: string;
  variant?: 'default' | 'floating' | 'minimal';
  animation?: 'slide' | 'fade' | 'bounce';
}

// 输入框动画变体
const inputVariants = {
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  bounce: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  }
};

// 标签动画变体
const labelVariants = {
  default: {
    initial: { y: 0, scale: 1 },
    focused: { y: -24, scale: 0.85, color: '#3B82F6' },
    filled: { y: -24, scale: 0.85 }
  },
  floating: {
    initial: { y: 0, scale: 1 },
    focused: { y: -20, scale: 0.8, color: '#3B82F6' },
    filled: { y: -20, scale: 0.8 }
  }
};

export function AnimatedInput({
  label,
  error,
  success,
  icon,
  variant = 'default',
  animation = 'slide',
  type = 'text',
  className = '',
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(props.value || props.defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const isPasswordType = type === 'password';
  const actualType = isPasswordType && showPassword ? 'text' : type;
  const hasValue = Boolean(value);
  const isFloating = variant === 'floating';

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const getLabelState = () => {
    if (isFocused) return 'focused';
    if (hasValue) return 'filled';
    return 'initial';
  };

  const getInputClasses = () => {
    const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
    
    if (error) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-200`;
    }
    
    if (success) {
      return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-green-200`;
    }
    
    return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={inputVariants[animation]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* 标签 */}
      {label && (
        <motion.label
          className={`absolute left-4 pointer-events-none transition-colors duration-200 ${
            isFloating ? 'top-3' : 'top-0'
          }`}
          variants={labelVariants[isFloating ? 'floating' : 'default']}
          animate={getLabelState()}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </motion.label>
      )}

      {/* 输入框容器 */}
      <div className="relative">
        {/* 左侧图标 */}
        {icon && (
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.div>
        )}

        {/* 输入框 */}
        <motion.input
          ref={inputRef}
          type={actualType}
          className={`${getInputClasses()} ${
            icon ? 'pl-10' : ''
          } ${
            isPasswordType ? 'pr-10' : ''
          } ${
            label && !isFloating ? 'pt-6' : ''
          }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          {...props}
        />

        {/* 密码显示/隐藏按钮 */}
        {isPasswordType && (
          <motion.button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </motion.button>
        )}

        {/* 状态图标 */}
        {(error || success) && (
          <motion.div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isPasswordType ? 'right-10' : 'right-3'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {error && <ExclamationCircleIcon className="w-5 h-5 text-red-500" />}
            {success && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
          </motion.div>
        )}
      </div>

      {/* 错误/成功消息 */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 text-sm flex items-center space-x-1 ${
              error ? 'text-red-600' : 'text-green-600'
            }`}
          >
            <span>{error || success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AnimatedTextarea({
  label,
  error,
  success,
  variant = 'default',
  animation = 'slide',
  className = '',
  ...props
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || props.defaultValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasValue = Boolean(value);
  const isFloating = variant === 'floating';

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const getLabelState = () => {
    if (isFocused) return 'focused';
    if (hasValue) return 'filled';
    return 'initial';
  };

  const getTextareaClasses = () => {
    const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-none';
    
    if (error) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-200`;
    }
    
    if (success) {
      return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-green-200`;
    }
    
    return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={inputVariants[animation]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* 标签 */}
      {label && (
        <motion.label
          className={`absolute left-4 pointer-events-none transition-colors duration-200 ${
            isFloating ? 'top-3' : 'top-0'
          }`}
          variants={labelVariants[isFloating ? 'floating' : 'default']}
          animate={getLabelState()}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={() => textareaRef.current?.focus()}
        >
          {label}
        </motion.label>
      )}

      {/* 文本域容器 */}
      <div className="relative">
        <motion.textarea
          ref={textareaRef}
          className={`${getTextareaClasses()} ${
            label && !isFloating ? 'pt-6' : ''
          }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          {...props}
        />

        {/* 状态图标 */}
        {(error || success) && (
          <motion.div
            className="absolute right-3 top-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {error && <ExclamationCircleIcon className="w-5 h-5 text-red-500" />}
            {success && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
          </motion.div>
        )}
      </div>

      {/* 错误/成功消息 */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 text-sm flex items-center space-x-1 ${
              error ? 'text-red-600' : 'text-green-600'
            }`}
          >
            <span>{error || success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AnimatedInput;