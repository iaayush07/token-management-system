import { createApi } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../../../environment/environment";
import { axiosBaseQuery } from "../../../../../auth/axiosBaseQuery";

const url = apiUrl;
export const tokenManagerService = createApi({
  tagTypes: [],
  reducerPath: "tokenManagerService",
  baseQuery: axiosBaseQuery(url),
  endpoints: (builder) => ({
    scanQr: builder.mutation<
      { message: string; userId: string },
      { token: string }
    >({
      query: ({ token }) => ({
        url: "/qr/scan",
        method: "POST",
        data: { token },
      }),
    }),
    generateQrToken: builder.mutation<
      { token: string; expires_at: string },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: "/qr/generate",
        method: "POST",
        data: { userId },
      }),
    }),
  }),
});

export const { useScanQrMutation, useGenerateQrTokenMutation } =
  tokenManagerService;
