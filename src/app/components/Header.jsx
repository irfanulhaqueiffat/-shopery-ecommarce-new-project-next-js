"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { SlHandbag } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "./CartContext";
import { IoIosRemoveCircle } from "react-icons/io";

const Header = () => {
  const { cart, removeFromCart } = useCart();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartMenuRef = useRef(null);

  // Close cart dropdown when clicking outside
  React.useEffect(() => {
    function handleClick(e) {
      if (cartMenuRef.current && !cartMenuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  const cartTotal = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <header className="py-6 bg-white sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="logo">
            <Image
              src={logo}
              alt="Logo"
              width={140}
              height={60}
              className="object-contain"
            />
          </Link>

          {/* Desktop search bar */}
          <div className="hidden md:flex items-center w-full max-w-[480px]">
            <div className="relative flex-1">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 py-2 pl-10 pr-3 rounded-md focus:outline-none"
              />
            </div>
            <button className="bg-green-600 text-white px-5 py-2 ml-2 rounded-md hover:bg-green-700">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">

            {/* Mobile menu icon */}
            <button
              className="md:hidden text-2xl p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <button className="text-[28px] hover:text-gray-600">
              <CiHeart />
            </button>

            {/* Cart */}
            <div className="relative">
              <button
                className="text-[30px]"
                onClick={() => setOpen((v) => !v)}
              >
                <SlHandbag />
              </button>

              {/* Cart numbers */}
              <div className="hidden sm:block ml-2">
                <p className="text-xs text-gray-500">Items: {cart.length}</p>
                <h1 className="text-sm font-bold">${cartTotal}</h1>
              </div>

              {/* Cart dropdown */}
              <div
                ref={cartMenuRef}
                className={`absolute right-0 top-12 z-50 w-80 bg-white shadow-xl rounded-xl border p-4 transition-all duration-300 
                ${open ? "opacity-100 translate-y-0 pointer-events-auto"
                       : "opacity-0 -translate-y-4 pointer-events-none"}`}
              >
                <h3 className="font-bold text-lg mb-3">Your Cart</h3>

                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    Cart is empty.
                  </div>
                ) : (
                  <ul className="divide-y">
                    {cart.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 py-3 group">
                        <img
                          src={item.thumbnail || item.images?.[0]}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">Qty: {item.qty}</div>
                        </div>
                        <div className="font-bold text-green-600 text-sm">
                          ${(item.price * item.qty).toFixed(2)}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 text-xl opacity-50 group-hover:opacity-100"
                        >
                          <IoIosRemoveCircle />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-lg">Total: ${cartTotal}</span>
                  <Link
                    href="/CheckOut"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-md rounded-md p-4 mt-3">
            <div className="flex items-center gap-3 mb-3">
              <IoSearchOutline className="text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-200 py-2 px-3 rounded-md focus:outline-none"
              />
              <button className="bg-green-600 text-white px-3 py-2 rounded-md">
                Search
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link href="/" className="py-2 px-3 rounded hover:bg-gray-100">Home</Link>
              <Link href="/Shop" className="py-2 px-3 rounded hover:bg-gray-100">Shop</Link>
              <Link href="/Blogs" className="py-2 px-3 rounded hover:bg-gray-100">Blogs</Link>
              <Link href="/About" className="py-2 px-3 rounded hover:bg-gray-100">About</Link>
              <Link href="/Contact" className="py-2 px-3 rounded hover:bg-gray-100">Contact</Link>
              <Link href="/Login" className="py-2 px-3 rounded hover:bg-gray-100">Login</Link>
              <Link href="/Registration" className="py-2 px-3 rounded hover:bg-gray-100">Register</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
