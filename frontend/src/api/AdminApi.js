import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/admin" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/",
    }),
    postAddProduct: builder.mutation({
      query: ({
        itemName,
        itemPrice,
        itemDiscount,
        itemDescription,
        itemTag,
        itemCategory,
        itemGender,
        itemAvailableSizes,
        itemAvailableColors,
        itemAvailableImages,
      }) => ({
        url: "/add-product",
        method: "post",
        body: {
          itemName,
          itemPrice,
          itemDiscount,
          itemDescription,
          itemTag,
          itemCategory,
          itemGender,
          itemAvailableSizes,
          itemAvailableColors,
          itemAvailableImages,
        },
      }),
    }),
  }),
});

export const { usePostAddProductMutation } = adminApi;
