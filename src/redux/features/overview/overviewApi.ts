import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChart: builder.query({
      query: ({ year }) => ({
        url: `/dashboard/chat-user-info`,
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.staticContent, tagTypes.user],
    }),
    getCounts: builder.query({
      query: () => ({
        url: `/dashboard/user-info`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent, tagTypes.user, tagTypes.earning],
    }),
    getNotification: builder.query({
      query: ({ page, limit }) => ({
        url: `/notifications/my-notifications`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.staticContent],
    }),
  }),
});

export const {
  useGetUserChartQuery,
  useGetCountsQuery,
  useGetNotificationQuery,
} = overviewApi;
