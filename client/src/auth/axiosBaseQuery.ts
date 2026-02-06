import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

export const axiosBaseQuery =
  (apiBaseURL: string): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
  async ({ url, method, data, params }) => {
    try {
      Axios.defaults.baseURL = apiBaseURL;
      const result = await Axios({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error,
      };
    }
  };
