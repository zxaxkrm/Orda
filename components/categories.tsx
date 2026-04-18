"use client";
import { getProductsByCategory } from "@/lib/api";
import { Category, Product } from "@/lib/types";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./spinner";

export default function Categories({ categ }: { categ: Category[] }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async (slug: string, name: string) => {
    setSelected(name);
    if (!isOpen) setIsOpen(true);
    setLoading(true);
    const data = await getProductsByCategory(slug, 20);
    setProducts(data.products);
    setLoading(false);
  };

  return (
    <>
      <div className="w-75 shrink-0 bg-gray-50 rounded-md border border-gray-200">
        <div className="overflow-y-auto max-h-85 divide-y divide-gray-100">
          {categ.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug, cat.name)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left"
            >
              {/* <cat.icon className="w-5 h-5 text-gray-600 shrink-0"/> */}
              <span className="text-lg font-medium text-gray-800 flex-1">
                {cat.name}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-[90vw] max-h-[95vh] flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left — categories sidebar (never re-renders) */}
            <div className="w-60 shrink-0 border-r overflow-y-auto">
              {categ.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleClick(cat.slug, cat.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left
                    ${selected === cat.name ? "bg-gray-100 font-semibold" : ""}
                  `}
                >
                  <span className="text-sm text-gray-800 flex-1">{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </button>
              ))}
            </div>

            {/* Right — only this part refreshes */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold capitalize">{selected}</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loading ? (
     <Spinner/>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                    <div  className="border rounded-lg p-3">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <p className="text-sm font-medium mt-2 line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
