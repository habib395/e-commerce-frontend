import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { useGetUniqueCategoriesQuery, useGetUniqueBrandsQuery } from '../provider/home/homeApiSlice'; 
import Slider from '../slider/Slider';
import imageOne from '../../assets/slide/upper.jpg'
import imageTwo from '../../assets/slide/lower.jpg'
import { FaRegMoneyBillAlt, FaUserCircle, FaAddressCard } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import Collections from '../../components/Collections';

const Home = () => {
    const { data: categoriesResponse, isLoading: categoriesLoading } = useGetUniqueCategoriesQuery();
    const { data: brandsResponse, isLoading: brandsLoading } = useGetUniqueBrandsQuery(); 
    
    const categories = categoriesResponse?.data || [];
    const brands = brandsResponse?.data || []; 
    
    const categoryList = ['all', ...categories];
    const brandList = ['all', ...brands];

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category') || 'all'; 
    const selectedBrand = searchParams.get('brand') || 'all';

    const handleCategorySelect = (category) => {
        const newParams = { category: category };
        if (category === 'all') {
            newParams.category = undefined;
        }
        
        if (selectedBrand !== 'all') {
            newParams.brand = undefined;
        }

        setSearchParams(newParams); 
    };
    
    const handleBrandSelect = (brand) => {
        const newParams = { brand: brand };
        if (brand === 'all') {
            newParams.brand = selectedBrand;
        }
        
        if (selectedCategory !== 'all') {
            newParams.category = selectedCategory;
        }
        
        setSearchParams(newParams);
    };

    const isLoading = categoriesLoading || brandsLoading;
    
    return (
        <div>
            <div className='bg-white text-black flex gap-1'>
                <div className='w-2/3'>
                <Slider></Slider>
                </div>
                <div className="w-1/3">
                <div className='grid gap-1'>
                    <div className='h-[120px] sm:h-[220px] md:h-[250px]'>
                        <img src={imageOne} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='h-[120px] sm:h-220px] md:h-[250px]'>
                    <img src={imageTwo} alt="" className='w-full h-full object-cover' />
                    </div>
                </div>
                </div>
            </div>
            
            <div className='flex items-center justify-center gap-4 bg-white text-black p-4'>
                <div className='flex items-center gap-2 text-xl font-semibold'>
                <FaRegMoneyBillAlt />
                <p>0% EMI</p>|
                </div>
                <div className='flex items-center gap-2 text-xl font-semibold'>
                <FaUserCircle />
                <p>24/7 Online Support</p>|
                </div>
                <div className='flex items-center gap-2 text-xl font-semibold'>
                <FaAddressCard />
                <p>No charge on card payment</p>|
                </div>
                <div className='flex items-center gap-2 text-xl font-semibold'>
                <TbTruckDelivery />
                <p>Cash on delivery in 64 districts</p>
                </div>
            </div>

            <div className="bg-white text-black shadow-md p-3 border-b border-gray-200">
                <p className='text-sm font-semibold text-gray-700 mb-2'>Shop by Brand:</p>
                <div className="flex space-x-4 overflow-x-auto whitespace-nowrap container mx-auto">
                    {brandsLoading ? (
                        <div className="text-gray-500">Loading Brands...</div>
                    ) : (
                        brandList.map(brand => (
                            <button
                                key={brand}
                                onClick={() => handleBrandSelect(brand)} 
                                className={`
                                    px-5 py-2 rounded-lg text-sm font-medium flex-shrink-0 border-2 transition duration-200
                                    ${selectedBrand === brand
                                        ? 'bg-red-500 text-white border-red-500 shadow-lg font-bold' // Active Style
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500' // Inactive Style
                                    }
                                `}
                            >
                                {brand.charAt(0).toUpperCase() + brand.slice(1)} 
                            </button>
                        ))
                    )}
                </div>
            </div>
            
            <div className="bg-white text-black">
                <Collections 
                    selectedCategory={selectedCategory} 
                    selectedBrand={selectedBrand}
                />
            </div>
        </div>
    );
};

export default Home;