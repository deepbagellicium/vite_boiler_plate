import { useCallback, useRef } from "react";

type ThrottleFunction<T extends (...args: any[]) => void> = T;

export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): ThrottleFunction<T> => {
  const lastCall = useRef<number>(0);
  const throttledCallback = useRef<(...args: Parameters<T>) => void>();

  useCallback(() => {
    throttledCallback.current = (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    };
  }, [callback, delay]);

  return throttledCallback.current as ThrottleFunction<T>;
};
