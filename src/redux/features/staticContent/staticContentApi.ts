import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const staticContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaticData: builder.query({
      query: () => ({
        url: `/setting/get-setting`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent],
    }),
    addStaticData: builder.mutation({
      query: (req) => ({
        url: `/setting/update-setting`,
        method: "PATCH",
        body: req,
      }),
      invalidatesTags: [tagTypes.staticContent],
    }),
  }),
});

export const { useGetStaticDataQuery, useAddStaticDataMutation } =
  staticContentApi;
