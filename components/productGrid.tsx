import { getProducts, searchProduct } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCardPage from "@/components/productCard";


const PAGE_SIZE = 24;

export default async function ProductGrid({query,  currentPage}:{query: string, currentPage: number}){
    const skip = (currentPage - 1) * PAGE_SIZE;
      const data = query ? await searchProduct(query): await  getProducts(PAGE_SIZE, skip);

      return(
        <>
        <div className="sm:grid grid-cols-4 px-5 gap-3">
            {data.products.map((product: Product)=>(
                <ProductCardPage key={product.id} item={product}/>
            ))}
        </div>

        <p className="text-center text-sm text-gray-400">
            {data.total} products found
        </p>
        </>
      )

}