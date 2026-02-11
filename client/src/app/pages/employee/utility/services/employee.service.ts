import { tokenManagerService } from "../../../../../shared/utility/services/token-management.service";

export const employeeService = tokenManagerService.injectEndpoints({
  endpoints: (builder) => ({
    // Expose as a "lazy"-named mutation so consumers use trigger imperatively
    generateQR: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/qr/generate`,
        method: "POST",
        data: { userId },
      }),
    }),
  }),
});

export const { useGenerateQRMutation } = employeeService;
