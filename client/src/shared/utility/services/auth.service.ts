import { tokenManagerService } from "./token-management.service";

export const authService = tokenManagerService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
    }),
    signup: builder.mutation<
      {
        message: string;
        user: { id: number; fullName: string; email: string; role: string };
      },
      { fullName: string; email: string; password: string; role?: string }
    >({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        data: body,
      }),
    }),
    me: builder.query<
      {
        user: { id: number; full_name: string; email: string; role: string };
        permissions: string[];
      },
      void
    >({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useMeQuery } = authService;
