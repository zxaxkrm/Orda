import { prisma } from "./prisma";
import { Product, Category, ProductsResponse } from "./types";

export const getCategories = async (): Promise<Category[]> => {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  return categories.map((c) => ({
    slug: c.category,
    name: c.category,
    url: `/products/category/${c.category}`,
  }));
};

export const getProducts = async (limit = 10, skip = 0): Promise<ProductsResponse> => {
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      take: limit,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);

  return { products: products as unknown as Product[], total, skip, limit };
};

export const getProductById = async (id: string): Promise<Product> => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) throw new Error("PRODUCT_NOT_FOUND");
  return product as unknown as Product;
};

export const getProductsByCategory = async (
  category: string,
  limit = 10
): Promise<ProductsResponse> => {
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: { category },
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: { category } }),
  ]);

  return { products: products as unknown as Product[], total, skip: 0, limit };
};

export const searchProduct = async (query: string): Promise<ProductsResponse> => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  return {
    products: products as unknown as Product[],
    total: products.length,
    skip: 0,
    limit: products.length,
  };
};