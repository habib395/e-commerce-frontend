
import React from 'react';
import { useParams } from 'react-router-dom'; 
import { useGetProductsByBrandQuery, useGetProductsQuery } from './provider/home/homeApiSlice';
import ProductCard from '../components/ProductCard';

const MAX_PRODUCTS = 9999; 

const CategoryBrandPage = () => { 
    const { categoryName, brandName } = useParams(); 
    const isCategoryFilter = !!categoryName; 
    const selectedFilter = categoryName || brandName; 

    let products = [];
    let isLoading = false;
    let isError = false;
    let error = null;

    if (!selectedFilter) {
        return <div className="p-8 text-center text-xl font-medium text-red-600">
            Error: Filter parameter not found. Invalid URL structure.
        </div>;
    }

    if (isCategoryFilter) {
        const queryParams = { 
            categoryName: selectedFilter,
            limit: MAX_PRODUCTS 
        }; 
        
        const { data, isLoading: catLoading, isError: catError, error: catErrorData } = useGetProductsQuery(queryParams);

        products = data?.data || [];
        isLoading = catLoading;
        isError = catError;
        error = catErrorData;
    } 
    else if (brandName) {
        const { data, isLoading: brandLoading, isError: brandError, error: brandErrorData } = useGetProductsByBrandQuery(selectedFilter); 

        products = data?.data || [];
        isLoading = brandLoading;
        isError = brandError;
        error = brandErrorData;
    }
    
    
    if (isLoading) {
        return <div className="p-8 text-center text-xl font-medium text-gray-500">Loading {selectedFilter.toUpperCase()} Products...</div>;
    }

    if (isError) {
        const errorMessage = error?.data?.message || 'Failed to load products.';
        return <div className="p-8 text-center text-xl font-bold text-red-600">Error: {errorMessage}</div>;
    }
    
    if (products.length === 0) {
        let notFoundText = isCategoryFilter
            ? `No products found for Category: ${selectedFilter.toUpperCase()}.`
            : `No products found for Brand: ${selectedFilter.toUpperCase()}.`;
        return <div className="p-8 text-center text-xl font-medium text-gray-500">{notFoundText}</div>;
    }
    
    let headerText = isCategoryFilter
        ? `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Collection`
        : `${selectedFilter} Brand Collection`;

    return (
        <section className="py-10 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-amber-500 pb-2">
                    {headerText} ({products.length} Items)
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} /> 
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryBrandPage;