
import { baseApi } from "../query/baseApi";

export const homeApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get products
        getProducts: builder.query({
            query: () => '/products',
        })
    })
})

export const { useGetProductsQuery } = homeApiSlice;
