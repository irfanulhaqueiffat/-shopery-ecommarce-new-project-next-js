"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { SlHandbag } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useCart } from "./CartContext";
import { IoIosRemoveCircle } from "react-icons/io";


const Header = () => {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const cartMenuRef = useRef(null);

  // Close menu on outside click
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

  return (
    <header className="py-6 bg-white sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <Image src={logo} alt="Logo" width={150} height={150} />
            </Link>
          </div>

          {/* Search */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center w-[498px]">
              <div className="relative flex-1">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border border-gray-300 py-2 pl-10 pr-3 rounded-md focus:outline-none"
                />
              </div>
              <button className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 active:scale-95">
                Search
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="text-[32px] text-black hover:text-gray-600">
              <CiHeart />
            </button>

            <div className="relative flex items-center gap-2">
              <button
                className="text-[30px] text-black focus:outline-none"
                onClick={() => setOpen((v) => !v)}
                aria-label="Open cart menu"
              >
                <SlHandbag />
              </button>
              <div>
                <p className="text-xs text-gray-400">
                  Shopping cart: ({cart.length})
                </p>
                <h1 className="text-sm font-bold">
                  ${cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
                </h1>
              </div>

              {/* Animated Dropdown cart menu */}
              <div
                ref={cartMenuRef}
                className={`absolute right-0 top-12 z-50 w-80 bg-white shadow-lg rounded-xl border p-4 transition-all duration-300
                  ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                style={{ willChange: 'transform, opacity' }}
              >
                <h3 className="font-bold text-lg mb-3">Your Cart</h3>
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">Cart is empty.</div>
                ) : (
                  <ul className="divide-y mb-4">
                    {cart.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 py-3 group">
                        <img src={item.thumbnail || item.images?.[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">Qty: {item.qty}</div>
                        </div>
                        <div className="font-bold text-green-600 text-sm">${(item.price * item.qty).toFixed(2)}</div>
                        <button
                          className="ml-2 text-xs text-red-500 hover:underline opacity-80 group-hover:opacity-100"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <IoIosRemoveCircle />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-lg">Total: ${cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span>
                  <Link href="/CheckOut" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Checkout</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
