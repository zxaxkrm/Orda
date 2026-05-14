export const dynamic = "force-dynamic";

import ProductForm from "@/components/productForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <ProductForm />
    </div>
  );
}