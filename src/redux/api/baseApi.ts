// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Utility function to handle the base API URL
const baseApiHandler = () => {
  const apiUrl = "http://204.197.173.249:5033/api/v1";
  // const apiUrl = "http://10.0.10.121:5033/api/v1";
  // const apiUrl = "http://10.0.10.121:5099/api/v1";
  // const apiUrl = "http://localhost:5033/api/v1";
  return apiUrl;
};

// Define the base API using RTK Query   v
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiHandler(),
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.token;
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["user", "service", "booking"],
});
