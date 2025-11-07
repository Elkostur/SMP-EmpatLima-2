import { useState, useEffect, RefObject, useCallback } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: ObserverOptions = { threshold: 0.1, triggerOnce: true }
): boolean => {
  // Calculate initial visibility once
  const getInitialVisibility = useCallback(() => {
    if (!ref.current) return false;
    const rect = ref.current.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom >= 0 &&
      rect.right >= 0
    );
  }, [ref]);

  const [isVisible, setIsVisible] = useState(getInitialVisibility);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only update if the state actually changes to avoid unnecessary re-renders
        if (entry.isIntersecting && !isVisible) { // If it becomes visible and wasn't before
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!entry.isIntersecting && isVisible && !options.triggerOnce) { // If it leaves view and we want to re-animate
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    );

    // If triggerOnce is true and it's already visible, no need to observe
    if (options.triggerOnce && isVisible) {
        return;
    }

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce, isVisible]);

  return isVisible;
};

export default useIntersectionObserver;