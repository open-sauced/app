import { AxiosRequestConfig } from "axios";
import api from "lib/utils/api-utils/api";

export const getCatFacts = (config?: AxiosRequestConfig) => {
  return api.get("fact", config).then(response => response.data);
};