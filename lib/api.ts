import { Product, Category, ProductsResponse } from "./types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch("https://dummyjson.com/products/categories");
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
};

export const getProducts = async (limit = 10, skip = 0): Promise<ProductsResponse> => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("PRODUCT_NOT_FOUND");
  return res.json();
};

export const getProductsByCategory = async (
  category: string,
  limit = 10
): Promise<ProductsResponse> => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}`
  );
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
};

export const searchProduct = async (query: string): Promise<ProductsResponse> => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
};