import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

// 页面过渡动画变体
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
};

// 页面过渡动画配置
const pageTransition = {
  duration: 0.4
};

// 滑动过渡动画变体（用于特定页面）
const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  in: {
    x: 0,
    opacity: 1
  },
  out: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

// 淡入淡出过渡动画变体
const fadeVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

// 缩放过渡动画变体
const scaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0,
    scale: 1.1
  }
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// 特定页面的过渡动画组件
export function SlidePageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [direction, setDirection] = React.useState(0);

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={location.pathname}
        custom={direction}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FadePageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeVariants}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function ScalePageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={scaleVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// 路由动画包装器
export function RouteTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  
  // 根据路径选择不同的动画效果
  const getTransitionType = (pathname: string) => {
    if (pathname === '/login' || pathname === '/register') {
      return 'scale';
    }
    if (pathname.startsWith('/dishes/')) {
      return 'slide';
    }
    if (pathname === '/profile' || pathname === '/reports') {
      return 'fade';
    }
    return 'default';
  };

  const transitionType = getTransitionType(location.pathname);

  const renderTransition = () => {
    switch (transitionType) {
      case 'slide':
        return <SlidePageTransition>{children}</SlidePageTransition>;
      case 'fade':
        return <FadePageTransition>{children}</FadePageTransition>;
      case 'scale':
        return <ScalePageTransition>{children}</ScalePageTransition>;
      default:
        return <PageTransition>{children}</PageTransition>;
    }
  };

  return renderTransition();
}

export default PageTransition;