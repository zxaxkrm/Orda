import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <>
    <section className=' px-4 sm:px-23 py-5'>
      <div className='flex justify-between items-center border-b pb-5 border-gray-300'>
          <Link href={"/"}>
            <div className='flex gap-2 items-center'>
                <Image src={"/hare.png"} alt='logo' width={40} height={40}/>
                <h1 className='font-bold text-2xl text-[#000000] max-sm:hidden'>Orda</h1>
            </div>
            </Link>

            <h1 className='text-xs text-gray-500'>Delivery on the pin</h1>
      </div>

      <div className='sm:flex max-sm:grid grid-cols-2 sm:gap-30 gap-8 justify-start py-10'>
        <div className='text-xs  space-y-7'>
            <h1 className='text-gray-500 font-semibold uppercase'>Products</h1>

            <div className=' space-y-3'>
                <h1>Order Management</h1>
                <h1>Automations</h1>
                <h1>New Stocks</h1>
                <h1>Management</h1>
            </div>


        </div>

         <div className='text-xs  space-y-7'>
            <h1 className='text-gray-500 font-semibold uppercase'>Company</h1>

            <div className=' space-y-3'>
                <h1>About</h1>
                <h1>Career</h1>
            </div>


        </div>

         <div className='text-xs  space-y-7'>
            <h1 className='text-gray-500 font-semibold uppercase'>Resources</h1>

            <div className=' space-y-3'>
                <h1>Blog</h1>
                <h1>Help Docs</h1>
                <h1>Developer API</h1>
            </div>


        </div>
      </div>

      <div  className='border-t border-gray-300 flex items-center gap-80 text-xs text-gray-500 w-full  font-semibold py-7'>
        <div className='flex justify-between w-1/2 items-center'>
            <h1>&copy;</h1>
            <h1>2026</h1>
            <h1>Orda</h1>
        </div>

        <div className='flex justify-between w-1/2 items-center'>
            <h1>All System Operational</h1>
            <h1>Terms of Use</h1>
            <h1>Privacy Policy</h1>
        </div>
      </div>
    </section>
    </>
  )
}

export default Footer