import { baseApi } from "../query/baseApi";

export const homeApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 1. get products
        getProducts: builder.query({
            query: () => '/products',
        }),
        // 2. get single products 
        getSingleProduct: builder.query({
            query: (id) => `/products/${id}`,
        })
    }), 
});

export const { useGetProductsQuery, useGetSingleProductQuery } = homeApiSlice;