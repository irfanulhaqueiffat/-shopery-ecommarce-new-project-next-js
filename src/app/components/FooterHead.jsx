import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { SlHandbag } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="py-6  bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="logo">
            <Image src={logo} alt="Logo" width={150} height={150} />
          </div>






<div>
    <h2 className="text-2xl font-normal text-black">Subcribe our Newsletter</h2>
    <p className="text-[#7A997C] text-[14px]">Pellentesque eu nibh eget mauris congue mattis matti.</p>
</div>
          {/* Menu Items + Search */}
          <div className="flex items-center gap-6">
{/* Search Bar */}
<div className="hidden md:flex items-center w-full md:max-w-[498px]">

  {/* Input + Icon Wrapper */}
  <div className="relative flex-1">
    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500" />

    <input
      type="text"
      placeholder="Search..."
      className="w-full border border-gray-300 py-2 pl-10 pr-3 rounded-md focus:outline-none"
    />
  </div>

  {/* Green Button */}
  <button className=" bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 active:scale-95">
    Search
  </button>

</div>

          </div>

          {/* Icons */}
        

        </div>
      </div>
    </header>
  );
};

export default Header;
