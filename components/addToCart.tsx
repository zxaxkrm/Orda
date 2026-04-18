"use client"
import { Product } from '@/lib/types'
import { useCartStore } from '@/store/cartStore'
import React from 'react'
import { toast } from 'sonner'

const AddToCartButton = ({product}:{product: Product}) => {
    const addItem = useCartStore((s)=> s.addItem)

    const handleAdd = ()=>{
      addItem(product);
       toast.success("Item added to cart");
    }
    
  return (
    <button 
    onClick={handleAdd}
    className="h-7 w-full rounded-md flex items-center text-white text-xs hover:bg-black hover:underline hover:text-white transition-all justify-center bg-[#5d00d6]">
            Add to cart
          </button>
  )
}

export default AddToCartButton