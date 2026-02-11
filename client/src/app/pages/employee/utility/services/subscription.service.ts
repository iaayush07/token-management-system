import { tokenManagerService } from "../../../../../shared/utility/services/token-management.service";

export type SaveSubscriptionPayload = {
  userId: number | string;
  planName: string;
  status: "ACTIVE" | "INACTIVE";
  startDate: string; // ISO date e.g., YYYY-MM-01
  endDate?: string | null;
};

export const employeeSubscriptionService = tokenManagerService.injectEndpoints({
  endpoints: (builder) => ({
    saveSubscription: builder.mutation<
      { message: string },
      SaveSubscriptionPayload
    >({
      query: (body) => ({
        url: "/subscriptions",
        method: "POST",
        data: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSaveSubscriptionMutation } = employeeSubscriptionService;
