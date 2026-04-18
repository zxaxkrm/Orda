import { Skeleton } from "../ui/skeleton";

export default function PromoSkeleton(){
    return(
         <div className="h-100 border border-gray-300 bg-gray-50 mx-7 my-9 rounded-3xl  ">

         </div>
    )
};


export const SuggestSkeleton = ()=> {
  return (
    <div className="h-full sm:w-70 p-4 bg-[#ffffff] space-y-4">
      <Skeleton className="font-bold text-xl" />
      <div className="grid grid-cols-2">
        <div className="">
          <div className="space-y-2">
            <Skeleton className="h-28 w-28 object-cover" />
            <Skeleton className="text-xs line-clamp-1" />
          </div>
        </div>
      </div>
      <Skeleton className="text-xs pt-5" />
    </div>
  );
};

export const SuggestGridSkeleton = ()=> {
  return (
    <div className=" sm:h-120 border border-gray-300 bg-[#e3e6e6] rounded-3xl max-sm:space-y-7 sm:flex gap-3 p-5 items-center justify-between">
      <div className="sm:grid grid-cols-4 px-5 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SuggestSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export const ProductSkeleton = ()=>{
  return (
    <div className='border border-gray-200 rounded-md h-85 px-2'>
        <Skeleton className='w-full h-3/5 rounded-lg'/>
        <div className='px-3 py-1 space-y-2'>
            <Skeleton className='h-3 w-3/4 mx-auto'/>
            <Skeleton className='h-3 w-1/2 mx-auto'/>
        </div>
        <div className="px-3 space-y-2.5 mt-2">
        <Skeleton className="h-7 w-full rounded-md" />
      </div>
    </div>
  )
}

export const ProductGridSkeleton = ()=>{
    return (
        <div className='sm:grid grid-cols-4 px-5 gap-3'>
            {Array.from({length: 24}).map((_, i)=>(
                <ProductSkeleton key={i}/>
            ))}
        </div>
    );
};

export const BestSellerGridSkeleton = ()=>{
    return (
        <div className='sm:grid grid-cols-4 px-5 gap-3'>
            {Array.from({length: 4}).map((_, i)=>(
                <ProductSkeleton key={i}/>
            ))}
        </div>
    );
}
