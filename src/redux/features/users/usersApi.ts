import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/dashboard/users/all-users-get-by-admin`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.user],
    }),
    actionUser: builder.mutation({
      query: (req) => ({
        url: `/admin/block/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllUserQuery, useActionUserMutation } = userApi;
