import React from 'react';
// 💡 নতুন: useGetProductsByBrandQuery হুক ইম্পোর্ট করা হলো
import { useGetProductsQuery, useGetProductsByBrandQuery } from '../pages/provider/home/homeApiSlice'; 
import ProductCard from './ProductCard';

// হোম পেজে দেখানোর জন্য সর্বাধিক প্রোডাক্ট সংখ্যা
const MAX_HOME_PRODUCTS = 20;

// 1. প্যারেন্ট থেকে selectedCategory এবং নতুন selectedBrand প্রপস হিসেবে রিসিভ করুন
const Collections = ({ selectedCategory, selectedBrand }) => { 
    
    let products = [];
    let isLoading = false;
    let isError = false;
    let error = null;

    // 💡 লজিক: ক্যাটাগরি/ব্র্যান্ডের মধ্যে কোনটি ফিল্টার করতে হবে?
    // --- ১. যদি কোনো ব্র্যান্ড সিলেক্ট করা থাকে (selectedBrand !== 'all') ---
    if (selectedBrand && selectedBrand !== 'all') {
        // ব্র্যান্ডের জন্য আলাদা হুক ব্যবহার করুন
        const { 
            data: response, 
            isLoading: brandLoading, 
            isError: brandError, 
            error: brandErrorData 
        } = useGetProductsByBrandQuery(selectedBrand); 

        products = response?.data || [];
        isLoading = brandLoading;
        isError = brandError;
        error = brandErrorData;
    } 
    // --- ২. অন্যথায়, ক্যাটাগরি ফিল্টার / All প্রোডাক্টস ---
    else {
        // ক্যাটাগরির জন্য বা 'all' এর জন্য getProductsQuery ব্যবহার করুন
        const queryParams = { categoryName: selectedCategory };
        if (selectedCategory === 'all') {
            queryParams.limit = MAX_HOME_PRODUCTS; 
        } 
        
        const { 
            data: response, 
            isLoading: catLoading, 
            isError: catError, 
            error: catErrorData 
        } = useGetProductsQuery(queryParams);

        products = response?.data || [];
        isLoading = catLoading;
        isError = catError;
        error = catErrorData;
    }
    
    // --- কন্ডিশনাল রেন্ডারিং ---
    if (isLoading) {
        return <div className="p-8 text-center text-xl font-medium text-gray-500">Loading Products...</div>;
    }

    if (isError) {
        const errorMessage = error?.data?.message || 'Failed to load products.';
        return <div className="p-8 text-center text-xl font-bold text-red-600">Error: {errorMessage}</div>;
    }
    
    if (products.length === 0) {
        let notFoundText = '';
        if (selectedBrand && selectedBrand !== 'all') {
            notFoundText = `No products found for Brand: ${selectedBrand.toUpperCase()}.`;
        } else {
            notFoundText = `No products found for Category: ${selectedCategory.toUpperCase()}.`;
        }
        return <div className="p-8 text-center text-xl font-medium text-gray-500">{notFoundText}</div>;
    }
    
    // --- হেডিং লজিক ---
    let headerText = 'Featured Products';
    if (selectedBrand && selectedBrand !== 'all') {
        headerText = `${selectedBrand} Collection`;
    } else if (selectedCategory && selectedCategory !== 'all') {
        headerText = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`;
    }

    // --- ডিসপ্লে অংশ ---
    return (
        <section className="py-10 bg-gray-50">
            {/* 3. হেডিং-এ বর্তমানে নির্বাচিত ক্যাটাগরি বা ব্র্যান্ডের নাম দেখান */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-amber-500 pb-2 mx-4 sm:mx-8">
                {headerText}
            </h2>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>

            {/* 'all' সিলেক্ট করা থাকলে এবং প্রোডাক্ট সংখ্যা ২০ হলে "View All" বাটন দেখান */}
            {(selectedCategory === 'all' && selectedBrand === 'all') && products.length === MAX_HOME_PRODUCTS && (
                <div className="text-center mt-8">
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300">
                        View All Products
                    </button>
                </div>
            )}
        </section>
    );
};

export default Collections;