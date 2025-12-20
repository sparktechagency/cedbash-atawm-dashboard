import { baseApi } from "../../api/baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: ({ page, limit }) => ({
        url: `/rating/all-vendor-service-reviews-by-admin`,
        method: "GET",
        params: { page, limit },
      }),
    }),
  }),
});

export const { useGetAllFeedbackQuery } = feedbackApi;
