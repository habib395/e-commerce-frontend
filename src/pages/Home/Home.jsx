import React from 'react';
import { useGetProductsQuery } from '../provider/home/homeApiSlice';
import Slider from '../slider/Slider';
import imageOne from '../../assets/slide/img-one.jpg'
import imageTwo from '../../assets/slide/img-two.jpg'
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import Collections from '../collections/Collections';
const Home = () => {
    const { data } = useGetProductsQuery()
    console.log(data)

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
        <div className="bg-white text-black">
        <Collections></Collections>
        </div>
        </div>
    );
};

export default Home;