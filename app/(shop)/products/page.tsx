import Link from "next/link";
import SearchForm from "@/components/searchForm";
import { Suspense } from "react";
import ProductGrid from "@/components/productGrid";
import { ProductGridSkeleton } from "@/components/skeletons";

const PAGE_SIZE = 24;

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  return (
    <div className="py-10 space-y-10">
      <div className="sm:flex justify-between px-10">
        <h1 className="max-sm:text-2xl text-4xl font-bold">All Products</h1>
        <Suspense fallback={null}>
          <SearchFormWrapper searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchFormWrapper({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  return <SearchForm query={params.query || ""} />;
}