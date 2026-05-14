"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function ProductForm({ product }: {
  product?: {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
    images: string[];
    rating: number;
  }
}) {
  const router = useRouter();
  const isEditing = !!product;

  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(product?.thumbnail || "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category || "",
    rating: product?.rating || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let thumbnailUrl = product?.thumbnail || "";

      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        formData.append("fileName", `${form.title}-thumbnail`);

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error("Image upload failed");
        thumbnailUrl = uploadData.url;
      }

      const res = await fetch(
        isEditing ? `/api/admin/products/${product.id}` : "/api/admin/products",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
            rating: Number(form.rating),
            thumbnail: thumbnailUrl,
            images: [thumbnailUrl],
          }),
        }
      );

      if (res.ok) {
        toast.success(isEditing ? "Product updated" : "Product created");
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error("Failed to save product");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <label className="text-sm font-medium">Thumbnail</label>
        {thumbnailPreview && (
          <Image
            src={thumbnailPreview}
            alt="thumbnail preview"
            width={120}
            height={120}
            className="rounded-md object-cover bg-gray-100"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-black file:text-white"
        />
      </div>

     
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </div>

     
      <div className="space-y-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </div>

    
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Price ($)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

    
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Rating</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={form.rating}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}