import { useEffect, useState } from "react";

function useOSDetection(): boolean {
  const [isMac, setIsMac] = useState<boolean>(false);

  useEffect(() => {
    // Constant pattern to test against
    const macOSPatterns = /Mac|Macintosh|MacIntel|Mac OS X/;

    // Initial check using userAgent
    const userAgentCheck = macOSPatterns.test(window.navigator.userAgent);

    setIsMac(userAgentCheck);
  }, []);

  return isMac;
}

export default useOSDetection;
