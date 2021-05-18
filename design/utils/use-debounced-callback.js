import { useCallback, useEffect, useRef } from "react";

export default function useDebouncedCallback(handler, debounceTimeout) {
  const debouncerRef = useRef(null);

  const cleanup = () => {
    if (debouncerRef.current) {
      clearTimeout(debouncerRef.current);
    }
  };

  useEffect(() => {
    return cleanup;
  }, [handler, debounceTimeout]);

  return useCallback(
    (...args) => {
      cleanup();

      if (debounceTimeout) {
        debouncerRef.current = setTimeout(handler, debounceTimeout, ...args);
      } else {
        handler(...args);
      }
    },
    [handler, debounceTimeout]
  );
}
