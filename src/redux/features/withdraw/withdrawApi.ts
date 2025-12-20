import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const withdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/transaction/all-withdraw-request`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.earning],
    }),
    acceptWithdraw: builder.mutation({
      query: (req) => ({
        url: `/transaction/accept-withdraw/${req.params}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.earning],
    }),
    rejectWithdraw: builder.mutation({
      query: (req) => ({
        url: `/transaction/rejected-withdraw/${req.params}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.earning],
    }),
  }),
});

export const {
  useGetAllTransactionQuery,
  useAcceptWithdrawMutation,
  useRejectWithdrawMutation,
} = withdrawApi;
