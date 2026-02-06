import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

export const axiosBaseQuery =
  (
    apiBaseURL: string,
  ): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    { status: number; data: unknown }
  > =>
  async ({ url, method, data, params }) => {
    try {
      Axios.defaults.baseURL = apiBaseURL;
      const token =
        localStorage.getItem("tm_token") || sessionStorage.getItem("tm_token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

      const result = await Axios({ url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      const status = error.response?.status ?? 0;
      const message = error.message;
      const dataPayload = error.response?.data ?? { message };
      return { error: { status, data: dataPayload } };
    }
  };
