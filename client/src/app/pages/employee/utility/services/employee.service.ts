import { tokenManagerService } from "../../../admin/utility/services/token-management.service";

export const employeeService = tokenManagerService.injectEndpoints({
  endpoints: (builder) => ({
    getTodayToken: builder.query<
      { token?: string; status: string; expires_at?: string },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/qr/today`,
        method: "GET",
        params: { userId },
      }),
    }),
    // Expose as a "lazy"-named mutation so consumers use trigger imperatively
    generateQR: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/qr/generate`,
        method: "POST",
        data: { userId },
      }),
    }),
    getQRStatus: builder.query<
      { status: string; expires_at?: string },
      { token: string }
    >({
      query: ({ token }) => ({
        url: `/qr/status`,
        method: "GET",
        params: { token },
      }),
    }),
  }),
});

export const {
  useGetTodayTokenQuery,
  useGenerateQRMutation,
  useGetQRStatusQuery,
} = employeeService;
