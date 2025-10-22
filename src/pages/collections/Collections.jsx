import React from 'react';
import { useGetProductsQuery } from '../provider/home/homeApiSlice';
import { FaHeart, FaCartPlus, FaEye } from 'react-icons/fa';
import { BiTransfer } from "react-icons/bi";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 p-4 flex flex-col items-center">
        <div className="h-48 w-full flex items-center justify-center p-2 relative group"> 
            <img 
                src={product.product_image} 
                alt={product.product_title} 
                className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/e0e0e0/555?text=No+Image" }}
            />
            <div className="absolute  inset-0 bg-black bg-opacity-40 grid items-center justify-end pr-4 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                <button 
                    className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
                    onClick={() => console.log(`Added ${product.product_title} to Wishlist!`)}
                >
                    <FaHeart className="w-5 h-5" />
                </button>
                
                <button 
                    className="text-white bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition-colors"
                    onClick={() => console.log(`Added ${product.product_title} to Cart!`)}
                >
                    <FaCartPlus className="w-5 h-5" />
                </button>

                <button 
                    className="text-white bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition-colors"
                    onClick={() => console.log(`Added ${product.product_title} to Cart!`)}
                >
                    <BiTransfer className="w-5 h-5" />
                </button>
                
                <Link to={`/products/${product._id}`}>
                <button 
                    className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    onClick={() => console.log(`Viewing ${product.product_title} details!`)}
                >
                    <FaEye className="w-5 h-5" />
                </button>
                </Link>
            </div>
        </div>

        {/* Product Details */}
        <div className="p-4 w-full flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight line-clamp-2">
                {product.product_title}
            </h3>
            
            <p className="text-sm text-indigo-600 font-medium mb-2">
                {product.brand} | {product.category}
            </p>

            <div className="mt-auto pt-2">
                <p className="text-2xl font-bold text-red-600 mb-2">
                    ৳{product.price}
                </p>
                
                <div className="flex items-center text-sm text-gray-600">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-4 h-4 text-yellow-400 mr-1"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                    <span>{product.rating}</span>
                    <span className="ml-3 font-semibold text-green-600">
                        {product.availability ? "In Stock" : "Out of Stock"}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

const Collections = () => {
    const { data: products, isLoading, isError, error } = useGetProductsQuery();
    
    if (isLoading) {
        return <div className="p-8 text-center text-xl font-medium text-gray-500">Loading Products...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-xl font-bold text-red-600">Error: Failed to load products.</div>;
    }

    if (!products || products.length === 0) {
        return <div className="p-8 text-center text-xl font-medium text-gray-500">No products found.</div>;
    }
    
    return (
        <section className="py-10 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-8 border-b-2 border-indigo-500 pb-2 mx-4 sm:mx-8">
                Collections
            </h2>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;