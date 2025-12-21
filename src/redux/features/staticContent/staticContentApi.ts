import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const staticContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashbaordStatus: builder.query({
      query: () => ({
        url: `/dashboard/dashboard-overview`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent],
    }),
    getIncomeOverview: builder.query({
      query: ({ year }) => ({
        url: `/dashboard/yearly-income-chart-data?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent],
    }),
    getStaticData: builder.query({
      query: () => ({
        url: `/setting/get-setting`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent],
    }),
    addStaticData: builder.mutation({
      query: (req) => ({
        url: `/setting/update-setting`,
        method: "PATCH",
        body: req,
      }),
      invalidatesTags: [tagTypes.staticContent],
    }),
  }),
});

export const {
  useGetDashbaordStatusQuery,
  useGetIncomeOverviewQuery,
  useGetStaticDataQuery,
  useAddStaticDataMutation,
} = staticContentApi;
