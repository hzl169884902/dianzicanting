import { useState, useRef, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc,
  lazy = true,
  onLoad,
  onError
}: OptimizedImageProps) {
  // 初始化图片状态，检查URL有效性
  const [imageSrc, setImageSrc] = useState<string>(() => {
    // 如果是trae-api URL，直接使用fallback
    if (src?.includes('trae-api')) {
      return fallbackSrc || generateFallbackImage(src);
    }
    return src;
  });
  const [isLoading, setIsLoading] = useState(() => {
    // 如果使用了fallback，则不需要加载
    return !src?.includes('trae-api');
  });
  const [hasError, setHasError] = useState(() => {
    // 如果是trae-api URL，直接标记为错误
    return src?.includes('trae-api') || false;
  });
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 根据图片URL或类型生成不同的占位图
  const generateFallbackImage = (originalSrc?: string) => {
    // 使用本地SVG占位图或者无CORS限制的图片源
    const createSvgPlaceholder = (text: string, bgColor: string = '#f3f4f6') => {
      const svg = `
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="${bgColor}"/>
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">${text}</text>
        </svg>
      `;
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    };
    
    // 根据URL内容选择合适的fallback图片
    if (originalSrc?.includes('chicken') || originalSrc?.includes('鸡')) {
      return createSvgPlaceholder('🍗 鸡肉料理', '#fef3c7');
    }
    if (originalSrc?.includes('beef') || originalSrc?.includes('牛')) {
      return createSvgPlaceholder('🥩 牛肉料理', '#fecaca');
    }
    if (originalSrc?.includes('salad') || originalSrc?.includes('沙拉')) {
      return createSvgPlaceholder('🥗 新鲜沙拉', '#d1fae5');
    }
    if (originalSrc?.includes('soup') || originalSrc?.includes('汤')) {
      return createSvgPlaceholder('🍲 营养汤品', '#fde68a');
    }
    if (originalSrc?.includes('rice') || originalSrc?.includes('米饭')) {
      return createSvgPlaceholder('🍚 米饭料理', '#f3e8ff');
    }
    if (originalSrc?.includes('noodle') || originalSrc?.includes('面')) {
      return createSvgPlaceholder('🍜 面条料理', '#fed7d7');
    }
    
    // 默认使用通用美食图片
    return createSvgPlaceholder('🍽️ 美味料理', '#f3f4f6');
  };

  const defaultFallback = generateFallbackImage(src);

  // 懒加载逻辑
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, isInView]);

  // 图片加载超时机制
  useEffect(() => {
    if (!isInView || !isLoading) return;

    const timeout = setTimeout(() => {
      if (isLoading && !hasError) {
        setIsLoading(false);
        setHasError(true);
        setImageSrc(fallbackSrc || defaultFallback);
      }
    }, 5000); // 增加超时时间到5秒，给trae-api更多时间生成图片

    return () => clearTimeout(timeout);
  }, [isInView, isLoading, hasError, fallbackSrc, defaultFallback]);

  // 处理图片加载成功
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  // 处理图片加载失败
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // 如果当前不是fallback图片，则切换到fallback
    if (imageSrc !== fallbackSrc && !imageSrc.startsWith('data:image/svg+xml')) {
      const newFallback = fallbackSrc || generateFallbackImage(src);
      setImageSrc(newFallback);
      // 重新尝试加载fallback图片
      setIsLoading(true);
      setHasError(false);
    }
    
    onError?.();
  };

  // 如果还没有进入视口且启用了懒加载，显示占位符
  if (!isInView) {
    return (
      <div 
        ref={imgRef}
        className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      >
        <PhotoIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  // 如果图片加载失败，显示生成的占位图
  if (hasError) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        crossOrigin="anonymous"
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <PhotoIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        crossOrigin="anonymous"
      />
    </div>
  );
}