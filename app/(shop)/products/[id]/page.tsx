import AddToCartButton from '@/components/addToCart';
import ProductInfo from '@/components/productInfo';
import QuantitySelector from '@/components/quantitySelector';
import StarRating from '@/components/starRating';
import { getProductById } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({params}:{params: Promise<{id:number}>}) => {
const {id} = await params;

const data = await getProductById(id);
console.log(data);


  return (
    <div className='min-h-dvh py-10 sm:flex gap-2 px-3'>
        <section className='flex'>
            <div>
                {data.images.map((item, index)=>(
                    <div key={index}>
                        <Image src={item} alt={`${data.title} image-${index}`} width={40} height={40} className=''/>  
                    </div>
                ))}
            </div>
         <div>
        <Image src={data.thumbnail} alt={data.title} width={500} height={500} className='bg-[#e3e3e3]'/> 
        </div>   
        </section>

        <section className='space-y-4 sm:w-1/2'>
          <div className='space-y-1'>
              <h1 className='text-2xl font-semibold'>{data.title}</h1>
            <div className="text-xs">
                      <span>NGN</span>
                      <span>{data.price.toLocaleString()}</span>
                    </div>
                    <StarRating rating={data.rating}/>
          </div>

          <div>
            
            <QuantitySelector/>
          </div>

          <div className='space-y-2'>

             <Link href={"/cart"} className='my-2'>
              <AddToCartButton product={data}/>
             </Link>

          <div className="h-7 w-full rounded-md my-2 flex items-center text-white text-xs bg-black hover:underline hover:text-white transition-all justify-center ">
            Buy Now
          </div>

          </div>

          <div>
            <p className='text-xs'>
                {data.description}
            </p>
          </div>

          <ProductInfo productData={data}/>
        </section>
    </div>
  )
}

export default page