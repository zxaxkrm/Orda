import { getProducts, searchProduct } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCardPage from "@/components/productCard";
import Link from "next/link";

const PAGE_SIZE = 24;

export default async function ProductGrid({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams; 
  const currentPage = Number(params.page) || 1;
  const query = params.query || "";
  const skip = (currentPage - 1) * PAGE_SIZE;

  const data = query
    ? await searchProduct(query)
    : await getProducts(PAGE_SIZE, skip);

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  return (
    <>
      <div className="sm:grid grid-cols-4 px-5 gap-3">
        {data.products.map((product: Product) => (
          <ProductCardPage key={product.id} item={product} />
        ))}
      </div>

      {!query && (
        <div className="flex items-center justify-center mt-6 gap-6">
          {currentPage > 1 && (
            <Link href={`/products?page=${currentPage - 1}`} className="px-4 py-2 border rounded-md">
              Previous
            </Link>
          )}
          <span>Page {currentPage} of {totalPages}</span>
          {currentPage < totalPages && (
            <Link href={`/products?page=${currentPage + 1}`} className="px-4 py-2 border rounded-md">
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}