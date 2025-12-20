import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendor: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/dashboard/vendors/accepted-vendor-list`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.vendor],
    }),
    getAllVendorReq: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/dashboard/vendors/requested-vendor-list`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.vendor],
    }),
    acceptVendor: builder.mutation({
      query: (req) => ({
        url: `/dashboard/vendors/accept-vendor/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.vendor],
    }),
    rejectVendor: builder.mutation({
      query: (req) => ({
        url: `/admin/delete/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.vendor],
    }),
  }),
});

export const {
  useGetAllVendorQuery,
  useGetAllVendorReqQuery,
  useAcceptVendorMutation,
  useRejectVendorMutation,
} = vendorApi;
