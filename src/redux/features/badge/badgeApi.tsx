import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const badgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBadge: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/badge/get-badges`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.badge],
    }),
    addBadge: builder.mutation({
      query: (req) => ({
        url: `/badge/create-badge`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.badge],
    }),
    updateBadge: builder.mutation({
      query: (req) => ({
        url: `/badge/update-badge/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.badge],
    }),
    deleteBadge: builder.mutation({
      query: (req) => ({
        url: `/badge/delete-badge/${req.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.badge],
    }),
    giveABadge: builder.mutation({
      query: (req) => ({
        url: `/badge/give-badge`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.badge, tagTypes.user, tagTypes.vendor],
    }),
  }),
});

export const {
  useGetAllBadgeQuery,
  useAddBadgeMutation,
  useUpdateBadgeMutation,
  useDeleteBadgeMutation,
  useGiveABadgeMutation,
} = badgeApi;
