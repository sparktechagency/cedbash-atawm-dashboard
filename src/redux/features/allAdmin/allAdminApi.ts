import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const allAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (req) => ({
        url: `/admin/create-new-admin`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
    getAdmin: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `/admin/admin-lists`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.allAdmin],
    }),
    updateAdmin: build.mutation({
      query: (req) => ({
        url: `/users/edit_admin`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
    deleteAdmin: build.mutation({
      query: (req) => ({
        url: `/users/delete_admin/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = allAdminApi;

export default allAdminApi;
