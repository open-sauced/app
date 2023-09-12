import { useEffect, useRef, useState } from "react";

const useDebounceTerm = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay) as unknown as typeof timeoutRef.current;

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounceTerm;
