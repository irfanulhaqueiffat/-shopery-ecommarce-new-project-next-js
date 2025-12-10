'use client';

import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const Bottom = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div id="Bottom" className="w-full bg-[#EDF2EE]">
      <div className="container mx-auto py-3 md:py-4">
        <div className="bottomsItems flex flex-col md:flex-row md:justify-between md:items-center gap-3">

          {/* LEFT MENU AREA */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            {/* ALL CATEGORY BUTTON */}
            <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-700 transition shrink-0">
              <FaBars className="text-white text-lg" />
              <select className="bg-transparent outline-none text-white text-sm cursor-pointer">
                <option>All Categories</option>
                <option>Home</option>
                <option>Shop</option>
                <option>Pages</option>
                <option>Blog</option>
              </select>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-4 md:gap-6 flex-wrap">
              <Link href="/" className="text-gray-800 hover:text-green-600 transition">Home</Link>
              <Link href="/Shop" className="text-gray-800 hover:text-green-600 transition">Shop</Link>
              <Link href="/Dashboard" className="text-gray-800 hover:text-green-600 transition">Pages</Link>
              <Link href="/Blogs" className="text-gray-800 hover:text-green-600 transition">Blogs</Link>
              <Link href="/About" className="text-gray-800 text-sm hover:text-green-600 transition">About us</Link>
              <Link href="/Contacs" className="text-gray-800 text-sm hover:text-green-600 transition">Contacs</Link>
              <a href="https://frox-dashboard.vercel.app/" className="text-gray-800 text-sm hover:text-green-600 transition">Dashboard</a>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden ml-auto text-2xl p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              <FaBars />
            </button>
          </div>

          {/* RIGHT CONTACT AREA */}
          <div className="flex items-center gap-2 justify-end">
            <FaPhoneAlt className="text-green-700" />
            <span className="text-gray-800 font-medium hover:text-green-600 transition cursor-pointer">+8801819575439</span>
          </div>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className="md:hidden mt-2 bg-transparent">
              <div className="bg-white rounded-md shadow p-3 flex flex-col gap-2">
                <Link href="/" className="py-2 px-3 rounded hover:bg-gray-100">Home</Link>
                <Link href="/Shop" className="py-2 px-3 rounded hover:bg-gray-100">Shop</Link>
                <Link href="/Dashboard" className="py-2 px-3 rounded hover:bg-gray-100">Pages</Link>
                <Link href="/Blogs" className="py-2 px-3 rounded hover:bg-gray-100">Blogs</Link>
                <Link href="/About" className="py-2 px-3 rounded hover:bg-gray-100">About us</Link>
                <Link href="/Contacs" className="py-2 px-3 rounded hover:bg-gray-100">Contacs</Link>
                <a href="https://frox-dashboard.vercel.app/" className="py-2 px-3 rounded hover:bg-gray-100">Dashboard</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bottom;
