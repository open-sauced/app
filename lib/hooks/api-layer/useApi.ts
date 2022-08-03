/* 

  Idea for API Layer:

  YouTube: https://github.com/ThomasFindlay/react-advanced-london-managing-apis
  GitHub: https://github.com/ThomasFindlay/react-advanced-london-managing-apis

*/

import { useState } from "react";

const useApi = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const api = "test";
  
  return {
    api,
    isLoading,
    error
  };
};

export default useApi;