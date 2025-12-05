'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoChevronDownSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on component load
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLogin();
    window.addEventListener("loginStateChange", checkLogin);
    return () => {
      window.removeEventListener("loginStateChange", checkLogin);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStateChange"));
    router.push("/login");
  };

  return (
    <section id="topbar" className="py-3 border-b border-gray-300 sticky top-0 left-0 w-full z-50 shadow-md mt-0 bg-white">
      <div className="container mx-auto px-4 text-[#666666] flex flex-col sm:flex-row justify-between items-center gap-3">

        {/* Left: Location */}
        <div className="flex items-center gap-2 text-sm">
          <IoLocationOutline className="text-lg text-gray-600" />
          <span className="font-medium">
            Store Location: Lincoln-344, Illinois, Chicago, USA
          </span>
        </div>

        {/* Right: Options */}
        <div className="flex items-center gap-8">

          {/* Language + Country Select */}
          <div className="flex items-center gap-4">

            {/* Language Select */}
            <div className="relative">
              <select
                className="appearance-none bg-transparent text-sm border border-gray-300 rounded-md px-3 py-1 pr-6 cursor-pointer outline-none hover:border-gray-400"
              >
                <option>English</option>
                <option>Bangla</option>
              </select>
              <IoChevronDownSharp
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>

            {/* Country Select */}
            <div className="relative">
              <select
                className="appearance-none bg-transparent text-sm border border-gray-300 rounded-md px-3 py-1 pr-6 cursor-pointer outline-none hover:border-gray-400"
              >
                <option>USA</option>
                <option>Bangladesh</option>
                <option>India</option>
              </select>
              <IoChevronDownSharp
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>

          </div>

          {/* Login / Register OR Logout */}
          <div className="flex items-center gap-4 text-sm font-medium">

            {!isLoggedIn ? (
              <>
                <button className="hover:text-black transition">
                  <Link href="/Login">Login</Link>
                </button>

                <button className="hover:text-black transition">
                  <Link href="/Registration">Register</Link>
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-red-600 text-red-500 transition"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Topbar;
