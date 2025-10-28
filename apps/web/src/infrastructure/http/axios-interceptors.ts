import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const addAxiosInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      return error.response;
    }
  );

  return api;
};
