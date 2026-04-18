"use client"

import { useState } from "react"

const QuantitySelector = () => {
const [quantity, setQuantity] = useState(1);

const increase = ()=> setQuantity((prev)=> prev + 1);
const decrease = ()=> setQuantity((prev)=> (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-1">
        <div>
            <h1 className='text-xs '>Quantity <span className="text-red-500">*</span></h1>
        </div>

        <div className="flex items-center justify-between border w-30 h-8 rounded-lg px-2">
            <button className="text-xl font-light" onClick={decrease}>
                -
            </button>

            <span className="text-lg font-medium">{quantity}</span>

            <button className="text-xl font-light" onClick={increase}>
                +
            </button>

        </div>
    </div>
  )}

export default QuantitySelector