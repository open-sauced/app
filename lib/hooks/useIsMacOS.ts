import { useEffect, useState } from "react";

const MACOS_USER_AGENT_PART = /Mac|Macintosh|MacIntel|Mac OS X/;

function useIsMacOS(): boolean {
  const [isMac, setIsMac] = useState<boolean>(false);

  useEffect(() => {
    const userAgentCheck = MACOS_USER_AGENT_PART.test(window.navigator.userAgent);
    setIsMac(userAgentCheck);
  }, []);

  return isMac;
}

export default useIsMacOS;
