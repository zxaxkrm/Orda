export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteProductButton from "@/components/deleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
        >
          + Add Product
        </Link>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden max-sm:hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="rounded-md object-cover bg-gray-100"
                      sizes="40px"
                    />
                    <p className="font-medium line-clamp-1 max-w-50">{product.title}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 capitalize">{product.category}</td>
                <td className="px-4 py-3">${product.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="px-3 py-1 text-xs border border-gray-200 rounded-md hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <div className="space-y-3 sm:hidden">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={50}
                height={50}
                className="rounded-md object-cover bg-gray-100 shrink-0"
                sizes="50px"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                <p className="text-xs text-gray-500 capitalize">{product.category}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="font-medium">${product.price.toLocaleString()}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.stock > 10
                  ? "bg-green-100 text-green-700"
                  : product.stock > 0
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/admin/products/${product.id}`}
                className="flex-1 text-center px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-100"
              >
                Edit
              </Link>
              <div className="flex-1">
                <DeleteProductButton productId={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}