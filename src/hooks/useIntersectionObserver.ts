import { useState, useEffect, RefObject } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: ObserverOptions = { threshold: 0.1, triggerOnce: true }
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
        return;
    }

    // Initial check for visibility on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const inViewport = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
      );
      if (inViewport) {
        setIsVisible(true);
      }
    };
    checkInitialVisibility(); // Run once on mount

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!options.triggerOnce) { // Only set to false if not triggerOnce
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    );

    // Only observe if not already visible (or if triggerOnce is false)
    // This prevents re-observing if it was already visible and triggerOnce is true
    if (!isVisible || !options.triggerOnce) {
        observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce, isVisible]); // isVisible in dependencies to ensure re-evaluation if initial check changes it

  return isVisible;
};

export default useIntersectionObserver;