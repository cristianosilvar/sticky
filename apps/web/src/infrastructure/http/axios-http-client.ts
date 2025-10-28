import type { HttpRequest, IHttpClient } from "@/shared/core/http-client";
import axios, { type AxiosInstance, type AxiosError } from "axios";

export class AxiosHttpClient implements IHttpClient {
  protected api: AxiosInstance = axios;
  constructor(protected baseUrl: string = import.meta.env.VITE_API_URL) {}

  async sendRequest<TResponse, TBody>(params: HttpRequest<TBody>) {
    const { endpoint, method, body, headers } = params;

    try {
      const { data } = await this.api.request<TResponse>({
        url: endpoint,
        method,
        headers,
        data: body,
        baseURL: this.baseUrl,
      });

      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as TResponse;
      }

      throw error;
    }
  }
}
