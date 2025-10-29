import { baseApi } from "../query/baseApi";

export const branchApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBranches: builder.query({
            query: () => '/branches'
        })
    })
});

export const {
    useGetBranchesQuery
} = branchApiSlice;