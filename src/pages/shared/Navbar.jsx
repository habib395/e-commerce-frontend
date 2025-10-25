import { FaSearch, FaUserCircle, FaCartArrowDown, FaHeart, FaStore } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { PiPhoneCallLight } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbJewishStarFilled } from "react-icons/tb";
import { MdNewLabel } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 
import { useGetUniqueCategoriesQuery } from "../provider/home/homeApiSlice";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: categoriesResponse, isLoading: categoriesLoading } = useGetUniqueCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const categoryList = ['all', ...categories]; 

  const handleSignOut = () => {
    signOutUser()
    .then(() => {
      console.log('sign out successful.')
    })
    .catch(error =>{
      console.log('failed to sign out.')
    })
  }
  
  const handleCategorySelect = (category) => {
    if (category === 'all') {
        navigate('/'); 
    } else {
        navigate(`/category/${category}`); 
    }
  };

  
    return (
       <div>
        <div className="flex items-center justify-center gap-10 bg-black text-white"> 
            <a href="tel:16012" className="flex items-center gap-1 text-lg"> 
                <PiPhoneCallLight className="border border-1 rounded-full text-xl p-[2px]" /> 
                <p>16 012</p>
            </a>
            <a href="mailto:info@hunter.com" className="flex items-center gap-1 text-lg"> 
                <AiOutlineMail className="border border-1 rounded-full text-xl p-[2px]" /> 
                <p>info@hunter.com</p>
            </a>
            <a href="#" className="flex items-center gap-1 text-lg">
                <RiCustomerService2Fill className="border border-1 rounded-full text-xl p-[2px]" /> 
                <p>Customer Service</p>
            </a>
            <a href="#" className="flex items-center gap-1 text-lg">
                <TbJewishStarFilled className="border border-1 rounded-full text-xl p-[2px]" /> 
                <p>Offers</p>
            </a>
            <a href="#" className="flex items-center gap-1 text-lg">
                <MdNewLabel className="border border-1 rounded-full text-xl p-[2px]" /> 
                <p>New Items</p>
            </a>
            <a href="#" className="flex items-center gap-1 text-lg">
                <FaStore className="border border-1 rounded-full text-xl p-[2px]" /> 
                <p>Store</p>
            </a>
        </div>
        
        <div className="navbar bg-black px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white" 
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                        {categoriesLoading ? (
                            <li><a>Loading Categories...</a></li>
                        ) : (
                            categoryList.map(category => (
                                <li key={category}>
                                    <a onClick={() => handleCategorySelect(category)} className="cursor-pointer">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </a>
                                </li>
                            ))
                        )}
                         <li>
                           <details>
                             <summary>System Builders</summary>
                             <ul className="p-2">
                               <li><a>PC Building</a></li>
                               <li><a>CC Building</a></li>
                             </ul>
                           </details>
                         </li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost italic text-amber-400 text-2xl">HUNTER</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <div className="join">
                    <input className="input input-bordered join-item bg-white px-4" placeholder="Search products..." />
                    <button className="btn join-item rounded-r-full px-4 bg-amber-400"> <FaSearch /></button>
                </div>

                <ul className="menu bg-amber-400 menu-horizontal px-1 border border-1 rounded-lg ml-2">
                    <li>
                        <details>
                          <summary>System Builders</summary>
                          <ul className="p-2 w-40 z-[1] bg-white text-black">
                            <li><a>PC Building</a></li>
                            <li><a>CC Building</a></li>
                          </ul>
                        </details>
                    </li>
                </ul>
            </div>
            
            <div className="navbar-end gap-2 text-white"> 
                <a className="rounded-full text-3xl">
                <FaHeart />
                </a>
                <a className="rounded-full text-3xl">
                <BiTransfer />
                </a>
                <a className="rounded-full text-3xl">
                <FaCartArrowDown />
                </a>
                {
                  user ? <> <button onClick={handleSignOut} className="btn">SignOut</button> </> : <>
                <Link to='/login' className="rounded-full text-3xl">
                <FaUserCircle />
                </Link>
                  </>
                }
            </div>
        </div>
        
        <div className="bg-white text-black shadow-md p-3 border-b border-gray-200 hidden lg:block">
            <div className="flex space-x-6 overflow-x-auto whitespace-nowrap container mx-auto">
                {categoriesLoading ? (
                    <div className="text-gray-500">Loading Categories...</div>
                ) : (
                    categoryList.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategorySelect(category)} 
                            className={`
                                text-base font-semibold flex-shrink-0 transition-colors duration-200 
                                text-gray-700 hover:text-amber-500 hover:border-b-2 hover:border-amber-500 pb-1
                            `}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)} 
                        </button>
                    ))
                )}
            </div>
        </div>
       </div>
    );
};

export default Navbar;