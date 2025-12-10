import React from 'react'
import Image from 'next/image'
import stimg from '../../../public/images/Group 27.png'
import { FaLongArrowAltRight } from "react-icons/fa";
import NewSettelarAdd from '../components/NewSettelarAdd'  // <<< ADD THIS
import Link from 'next/link';

const Banner = () => {
  return (
    <>
      {/* Popup Inside Banner (optional) */}
      <NewSettelarAdd />

      <section id='banner'>
        <div className="container">

          <div className="banner-content flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <div className="banner-img w-full md:w-1/2">
              <Image src={stimg} alt='bannerimg' width={795} height={594} className="w-full h-auto"/>
            </div>

            <div className="contant-part w-full md:w-1/2 px-4 md:px-0">
              <p className='text-xs sm:text-sm text-green-500 font-normal mb-2'>
                Welcome to shopery
              </p>
              <h1 className='w-full max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-[56px] text-black font-semibold pb-3 md:pb-5'>
                Fresh & Healthy Organic Food
              </h1>

              <p className='text-xs sm:text-sm text-black font-normal mb-6 md:mb-8'>
                Free shipping on all your order. we deliver, you enjoy
              </p>
              <Link href="/Shop">
              <button className='py-2 px-4 sm:py-3 sm:px-6 bg-green-500 rounded-4xl gap-2 flex items-center text-white text-sm sm:text-base hover:bg-green-600 transition'>
               Shop now <span><FaLongArrowAltRight /></span> 
              </button></Link> 
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Banner
