import { baseApi } from "../query/baseApi";

export const homeApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ categoryName, limit }) => { 
                
                let url = '/products';
                const params = new URLSearchParams();
                if (categoryName === 'all' && limit) {
                    params.append('limit', limit);
                } 
                else if (categoryName && categoryName !== 'all') {
                    url = `/products/category/${categoryName}`;
                }
                
                if (params.toString()) {
                    url += `?${params.toString()}`;
                }
                
                return {
                    url: url,
                    method: 'GET',
                };
            },
        }),
        
        getSingleProduct: builder.query({
            query: (id) => `/products/${id}`,
        }),
        
        getUniqueCategories: builder.query({
            query: () => '/categories',
        }),

        getUniqueBrands: builder.query({
            query: () => '/brands',
        }),
        
        getProductsByBrand: builder.query({
            query: (brandName) => ({
                url: `/products/brand/${brandName}`,
                method: 'GET',
            }),
        }),
    }), 
});

export const { 
    useGetProductsQuery, 
    useGetSingleProductQuery, 
    useGetUniqueCategoriesQuery,
    useGetUniqueBrandsQuery,    
    useGetProductsByBrandQuery   
} = homeApiSlice;