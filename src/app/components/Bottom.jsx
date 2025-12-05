import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const Bottom = () => {
  return (
    <>
      <div id="Bottom" className="w-full h-[135px] bg-[#EDF2EE] flex items-center">
        <div className="container mx-auto">
          <div className="bottomsItems flex justify-between items-center">

            {/* LEFT MENU AREA */}
            <div className="menuItems flex items-center gap-6">
              
              {/* ALL CATEGORY BUTTON */}
              <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                <FaBars className="text-white text-lg" />
                <select className="bg-transparent outline-none text-white text-sm cursor-pointer">
                  <option>All Categories</option>
                  <option>Home</option>
                  <option>Shop</option>
                  <option>Pages</option>
                  <option>Blog</option>
                </select>
              </div>

              {/* NAV LINKS WITH HOVER EFFECT */}
              <Link
                href="/"
                className="text-gray-800 cursor-pointer hover:text-green-600 transition"
              >
                Home
              </Link>

              <Link
                href="/Shop"
                className="text-gray-800 cursor-pointer hover:text-green-600 transition"
              >
                Shop
              </Link>

              <Link
                href="/Dashboard"
                className="text-gray-800 cursor-pointer hover:text-green-600 transition"
              >
                Pages
              </Link>

              <Link
                href="/Blogs"
                className="text-gray-800 cursor-pointer hover:text-green-600 transition"
              >
                Blogs
              </Link>

              <Link
                href="/About"
                className="text-gray-800 cursor-pointer text-sm hover:text-green-600 transition"
              >
                About us
              </Link>

              <Link
                href="/Contacs"
                className="text-gray-800 cursor-pointer text-sm hover:text-green-600 transition"
              >
                Contacs
              </Link>
              <a
                href="https://frox-dashboard.vercel.app/"
                className="text-gray-800 cursor-pointer text-sm hover:text-green-600 transition"
              >
                Dashboard
              </a>

            </div>

            {/* RIGHT CONTACT AREA */}
            <div className="contact flex items-center gap-2">
              <FaPhoneAlt className="text-green-700" />
              <span className="text-gray-800 font-medium hover:text-green-600 transition cursor-pointer">
                +8801819575439
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Bottom;
