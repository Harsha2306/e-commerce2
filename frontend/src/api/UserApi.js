import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryParams) =>
        `products?${new URLSearchParams(queryParams).toString()}`,
    }),
    getOrders: builder.query({
      query: () => `orders`,
    }),
    getProductById: builder.query({
      query: (queryParams) =>
        `product?${new URLSearchParams(queryParams).toString()}`,
    }),
    getCheckIfProductPresentInWishlistAndCart: builder.query({
      query: (queryParams) =>
        `checkIfProductPresentInWishlistAndCart?${new URLSearchParams(
          queryParams
        ).toString()}`,
    }),
    getRecommendedAndNewArrivals: builder.query({
      query: () => `products/recommendedAndNewArrivals`,
    }),
    addToCart: builder.mutation({
      query: (productDetails) => ({
        url: `/addToCart`,
        method: "post",
        body: productDetails,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (productDetails) => ({
        url: `/removeFromCart`,
        method: "post",
        body: productDetails,
      }),
    }),
    removeEntireItemFromCart: builder.mutation({
      query: (productDetails) => ({
        url: `/removeEntireItemFromCart`,
        method: "post",
        body: productDetails,
      }),
    }),
    addToWishlist: builder.mutation({
      query: (productDetails) => ({
        url: "/addToWishlist",
        method: "post",
        body: productDetails,
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (productDetails) => ({
        url: "/removeFromWishlist",
        method: "post",
        body: productDetails,
      }),
    }),
    getUserDetails: builder.query({
      query: () => `/account`,
    }),
    changePassword: builder.mutation({
      query: (passwordDetails) => ({
        url: "/changePassword",
        method: "post",
        body: passwordDetails,
      }),
    }),
    getSearchedProducts: builder.query({
      query: (queryParams) =>
        `search?${new URLSearchParams(queryParams).toString()}`,
    }),
    getWishlist: builder.query({
      query: () => "/wishlist",
    }),
    getCart: builder.query({
      query: () => "/cart",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOrdersQuery,
  useGetProductByIdQuery,
  useGetRecommendedAndNewArrivalsQuery,
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetUserDetailsQuery,
  useChangePasswordMutation,
  useGetSearchedProductsQuery,
  useGetWishlistQuery,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useRemoveEntireItemFromCartMutation,
  useRemoveFromWishlistMutation,
  useGetCheckIfProductPresentInWishlistAndCartQuery
} = userApi;
