import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 10;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: { category },
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: { category } }),
  ]);

  return NextResponse.json({ products, total, skip: 0, limit });
}