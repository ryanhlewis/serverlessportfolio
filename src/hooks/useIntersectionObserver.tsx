// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState, React } from 'react';

interface IntersectionObserverArgs {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * A reusable hook to detect if an element is in the viewport using the Intersection Observer API.
 */
export function useIntersectionObserver(
  options: IntersectionObserverArgs = {}
): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return [ref, isIntersecting];
}
