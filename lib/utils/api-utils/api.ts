/* 

  Idea for API Layer:

  YouTube: https://github.com/ThomasFindlay/react-advanced-london-managing-apis
  GitHub: https://github.com/ThomasFindlay/react-advanced-london-managing-apis

*/

import axios, { AxiosInstance } from "axios";

const axiosParams = {
  baseURL: process.env.NEXT_PUBLIC_OPENSAUCED_API_URL
};

const axiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: (url: string, config = {}) => axios.get(url, config),
    post: (url: string, body: any, config = {}) => axios.post(url, body, config),
    put: (url: string, body: any, config = {}) => axios.put(url, body, config),
    patch: (url: string, body: any, config = {}) => axios.patch(url, body, config),
    delete: (url: string, config = {}) => axios.get(url, config)
  };
};

export default api(axiosInstance);