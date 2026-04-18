"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/lib/types";


export default function ProductInfo({productData}:{productData: Product}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 0 = first open by default

  const items = [
  {
    title: "Product Info",
    content: `${productData.description}. Dimension: ${productData.dimensions}`
  },
  {
    title: "Shipping Info",
    content: productData.shippingInformation
  },
  {
    title: "Return & Refund Policy",
    content: "We accept returns within 30 days of purchase. Items must be unused and in original packaging.",
  },
];

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-xs flex items-center justify-between py-4 text-left"
          >
            <span className=" text-gray-900">{item.title}</span>
            {openIndex === index ? (
              <Minus className="w-4 h-4 shrink-0" />
            ) : (
              <Plus className="w-4 h-4 shrink-0" />
            )}
          </button>

          {/* Content */}
          {openIndex === index && (
            <p className="pb-4 text-xs text-gray-600 leading-relaxed">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}