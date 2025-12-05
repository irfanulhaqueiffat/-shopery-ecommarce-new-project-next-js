import React from 'react'
import Image from 'next/image'
import shp1 from '../../../public/images/shopNow1.png'
import shp2 from '../../../public/images/shopNow2.png'
import shp3 from '../../../public/images/shopNow3.png'

const ShopNow = () => {
  return (
    <>
    <section id='shopNow' className='mt-20 md:mt-52 '>
        <div className="container mx-auto mb-20 px-4">
            <div className='flex flex-col  sm:flex-row gap-4 md:gap-6 p-4 md:p-0'>
                <div className="w-full sm:w-1/3">
                  <Image src={shp1} alt='shopeimgs'  width={424} height={225} className="w-full h-auto rounded-lg"/>
                </div>
                <div className="w-full sm:w-1/3">
                  <Image src={shp2} alt='shopeimgs'  width={424} height={225} className="w-full h-auto rounded-lg"/>
                </div>
                <div className="w-full sm:w-1/3">
                  <Image src={shp3} alt='shopeimgs'  width={424} height={225} className="w-full h-auto rounded-lg"/>
                </div>
            </div>
        </div>
    </section>
    
    
    
    
    </>
  )
}

export default ShopNow