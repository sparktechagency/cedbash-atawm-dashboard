import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/dashboard/all-users`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.user],
    }),
    actionUser: builder.mutation({
      query: (req) => ({
        url: `/users/block/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllUserQuery, useActionUserMutation } = userApi;
