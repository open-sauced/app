import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = (mediaQuery: string): boolean => {
    // Prevents SSR issues

    if (typeof window !== "undefined") {
      return window.matchMedia(mediaQuery).matches;
    }

    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    const isOldBrowser = !matchMedia.addEventListener;
    // Triggered at the first client-side load and if query changes

    handleChange();

    // Listen matchMedia

    if (isOldBrowser) {
      matchMedia.addEventListener("change", handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (isOldBrowser) {
        matchMedia.removeEventListener("change", handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
