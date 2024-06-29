import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce2-one.vercel.app/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/",
    }),
    getProductById: builder.query({
      query: (productId) => `product/${productId}`,
    }),
    postAddProduct: builder.mutation({
      query: ({
        productId,
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
        available,
      }) => ({
        url: "/add-product",
        method: "post",
        body: {
          productId,
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
          available,
        },
      }),
    }),
  }),
});

export const {
  usePostAddProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = adminApi;
