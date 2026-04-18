
import Link from "next/link";
import SearchForm from "@/components/searchForm";
import { Suspense } from "react";

import ProductGrid from "@/components/productGrid";
import { ProductGridSkeleton } from "@/components/skeletons";



const page = async ({ searchParams }: { searchParams: { page?: string; query?: string } }) => {

    const params  = await searchParams;
  const currentPage = Number(params.page) || 1;
  
  const query = params.query || "";


  const totalPages = 9;

  

  return (
    <div className="py-10 space-y-10">
      <div className="sm:flex justify-between px-10">
        <h1 className="max-sm:text-2xl text-4xl  font-bold">All Products</h1>
        <SearchForm query={query}/>
      </div>

      
      <Suspense fallback={<ProductGridSkeleton/>}>
        <ProductGrid query={query} currentPage={currentPage}/>
      </Suspense>

      <div className="flex items-center justify-center mt-6 gap-6">
        {currentPage > 1 && (
          <Link
            href={`/products?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded-md"
          >
            Previous
          </Link>
        )}

        <span className="">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link
            href={`/products?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded-md"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default page;
