"use client"

import { useRouter } from "next/navigation";

const SearchFormReset = () => {
 const router = useRouter();
 

    const reset = ()=>{
    router.push("/products");
    }

  return (
    <button type='reset' onClick={reset} className="border rounded-full text-sm w-5 h-5 bg-black text-white">
        X
    </button>
  )
}

export default SearchFormReset