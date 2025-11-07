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
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && options.triggerOnce) {
          observer.unobserve(element);
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
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce]);

  return isIntersecting;
};

export default useIntersectionObserver;