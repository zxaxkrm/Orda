import React from 'react'
import Advert from './advert'
import Categories from './categories'
import FrequentSearch from './frequent'
import { getCategories } from '@/lib/api'

const Promo = async () => {
const categ = await getCategories();

  return (
   <>
   <section className="min-h-dvh px-5 py-10 max-sm:hidden">
         <div className="h-100 border border-gray-300 rounded-3xl  ">
           <div className="w-full h-full bg-gray-50 rounded-3xl flex justify-between items-center px-7 overflow-hidden gap-4">
             <Categories categ={categ}/>
             <FrequentSearch/>
             <Advert/>
   
             
   
           </div>
         </div>
   
         </section>
   </>
  )
}

export default Promo