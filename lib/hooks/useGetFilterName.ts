import { useRouter } from "next/router";

const useGetFilterName = () => {
  const router = useRouter();

  const { asPath } = router;

  const firstLetterInPath = 1;
  
  function getFilterName(string: string) {
    const tempName = string.slice(firstLetterInPath);
    return tempName.charAt(0).toUpperCase() + tempName.slice(1);
  }

  const filterName = getFilterName(asPath);

  return filterName;
};

export default useGetFilterName;