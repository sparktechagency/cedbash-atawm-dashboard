import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/category/get-all-categories`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.category],
    }),
    addCategory: builder.mutation({
      query: (req) => ({
        url: `/category/create-category`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation({
      query: (req) => ({
        url: `/category/update-category/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation({
      query: (req) => ({
        url: `/category/delete-category/${req.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
