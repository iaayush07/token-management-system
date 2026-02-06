import type { AxiosResponse } from "axios";
import { tokenManagerService } from "../../../../../shared/utility/services/token-management.service";
import type { ISubscriber } from "../models/subscribers.model";

export const subscriberService = tokenManagerService.injectEndpoints({
  endpoints: (builder) => ({
    getSubsribers: builder.query<
      AxiosResponse<ISubscriber[]>,
      { month: string }
    >({
      query: ({ month }) => ({
        url: `/subscriptions?month=${month}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSubsribersQuery } = subscriberService;
