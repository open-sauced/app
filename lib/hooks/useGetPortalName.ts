import { useRouter } from "next/router";

const useGetPortalName = () => {
  const router = useRouter();

  const { asPath } = router;
  
  function getPortalName(string: string) {
    const tempName = string.slice(8, string.search("\\?"));
    return tempName.charAt(0).toUpperCase() + tempName.slice(1);
  }

  const portalName = getPortalName(asPath);

  return portalName;
};

export default useGetPortalName;