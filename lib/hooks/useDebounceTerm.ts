import { useEffect, useRef, useState } from "react";

const useDebounceTerm = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounceTerm;
