import { tokenManagerService } from "../../../../../shared/utility/services/token-management.service";

type EnrollmentStatus = { year: number; month: number; is_open: boolean };

export const enrollmentService = tokenManagerService.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollmentStatus: builder.query<
      EnrollmentStatus,
      { year: number; month: number }
    >({
      query: ({ year, month }) => ({
        url: "/enrollment",
        method: "GET",
        params: { year, month },
      }),
    }),
    toggleEnrollment: builder.mutation<
      { message: string },
      { year: number; month: number; isOpen: boolean }
    >({
      query: ({ year, month, isOpen }) => ({
        url: "/enrollment/toggle",
        method: "POST",
        data: { year, month, isOpen },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetEnrollmentStatusQuery, useToggleEnrollmentMutation } =
  enrollmentService;
