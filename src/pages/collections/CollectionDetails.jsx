// src/pages/collections/CollectionDetails.jsx (বা আপনার ফাইলটির নাম)

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../provider/home/homeApiSlice'; // আপনার RTK Query হুক

const CollectionDetails = () => {
    const { id } = useParams(); 
    const { data: response, isLoading, isError } = useGetSingleProductQuery(id);
    const product = response?.data; 

    if (isLoading) {
        return <div className="p-12 text-center text-2xl text-indigo-600">Loading product details...</div>;
    }

    if (isError) {
        return <div className="p-12 text-center text-2xl text-red-600">Error: Failed to load product details.</div>;
    }

    if (!product) {
        return <div className="p-12 text-center text-2xl text-gray-600">Product not found.</div>;
    }
    
    return (
        <div className="container mx-auto p-4 sm:p-8 bg-white min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
                <div className="w-full lg:w-1/2 flex justify-center items-center p-4 bg-gray-50 rounded-lg shadow-inner">
                    <img 
                        src={product.product_image} 
                        alt={product.product_title} 
                        className="max-w-full max-h-[500px] object-contain" 
                    />
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        {product.product_title}
                    </h1>
                    <div className="flex items-center space-x-4 border-b pb-4">
                        <span className="text-3xl font-bold text-red-600">
                            ৳{product.price}
                        </span>
                        <span className={`text-lg font-semibold px-3 py-1 rounded-full ${product.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.availability ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="flex items-center space-x-6 text-gray-700">
                        <p className="font-semibold">Brand: <span className="text-indigo-600">{product.brand}</span></p>
                        <p className="font-semibold">Rating: <span className="text-yellow-500">{product.rating} ★</span></p>
                        <p className="font-semibold">Warranty: <span>{product.warranty}</span></p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Technical Specifications</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                            {product.Specification?.map((spec, index) => (
                                <li key={index} className="text-base">{spec}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionDetails;