import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarningStates: builder.query({
      query: () => ({
        url: `/dashboard/earning/admin-income-summary`,
        method: "GET",
      }),
      providesTags: [tagTypes.earning],
    }),
    getAllEarning: builder.query({
      query: ({ page, limit }) => ({
        url: `/dashboard/earning/admin-income-history`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useGetEarningStatesQuery, useGetAllEarningQuery } = earningApi;
