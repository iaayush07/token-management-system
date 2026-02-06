import { createApi } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../environment/environment";
import { axiosBaseQuery } from "../../../auth/axiosBaseQuery";

const url = apiUrl;
export const tokenManagerService = createApi({
  tagTypes: [],
  reducerPath: "tokenManagerService",
  baseQuery: axiosBaseQuery(url),
  endpoints: () => ({}),
});
