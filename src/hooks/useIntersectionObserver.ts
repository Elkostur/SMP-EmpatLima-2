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
  // Function to check if element is currently in viewport
  const checkInViewport = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom >= 0 &&
      rect.right >= 0
    );
  }, []);

  // Initialize state based on initial visibility
  const [isIntersecting, setIsIntersecting] = useState(() => {
    if (ref.current) {
      return checkInViewport(ref.current);
    }
    return false;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
        return;
    }

    // If triggerOnce is true and it's already intersecting, no need to observe
    // The initial state already reflects its visibility.
    if (options.triggerOnce && isIntersecting) {
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (options.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!options.triggerOnce) { // Only set to false if not triggerOnce
          setIsIntersecting(false);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce, isIntersecting, checkInViewport]);

  return isIntersecting;
};

export default useIntersectionObserver;