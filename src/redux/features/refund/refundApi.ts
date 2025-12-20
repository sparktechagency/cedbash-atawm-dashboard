import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const refundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRefund: builder.query({
      query: ({ page, limit }) => ({
        url: `/cancellation/pending-cancellations`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.refund],
    }),
    acceptRefund: builder.mutation({
      query: (req) => ({
        url: `/cancellation/pending-cancellations-confirm/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.refund],
    }),
  }),
});

export const { useGetAllRefundQuery, useAcceptRefundMutation } = refundApi;
