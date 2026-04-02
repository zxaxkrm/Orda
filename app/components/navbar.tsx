import Image from 'next/image'
import React from 'react'
import SearchForm from './searchForm'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='h-30 p-6 bg-[#54c6f0] '>
        <div className='bg-[#ffffff] h-20 rounded-xl flex justify-between items-center px-8'>
            <div className='flex gap-2 items-center'>
                <Image src={"/hare.png"} alt='logo' width={40} height={40}/>
                <h1 className='font-bold text-2xl text-[#000000]'>Orda</h1>
            </div>

        
            <SearchForm/>

            <div className='flex gap-3 items-center'>
                <Link href={"/"} className='text-lg'>Log in</Link>

                <Link href={"/orders"} className='text-lg'>Returns & Orders</Link>

                 <Image  src={"/trolley.png"} alt="cart" width={40} height={40}/>
            </div>

        </div>
    </div>
  )
}

export default Navbar