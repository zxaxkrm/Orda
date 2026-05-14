import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const reviews = await prisma.review.findMany({
    where: { productId: id },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { rating, comment } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // check if user already reviewed this product
  const existing = await prisma.review.findUnique({
    where: { userId_productId: { userId: user.id, productId: id } },
  });

  if (existing) {
    return NextResponse.json({ error: "Already reviewed" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      userId: user.id,
      productId: id,
      rating,
      comment,
    },
    include: { user: { select: { name: true } } },
  });

  // update product average rating
  const allReviews = await prisma.review.findMany({
    where: { productId: id },
    select: { rating: true },
  });

  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  await prisma.product.update({
    where: { id },
    data: { rating: avgRating },
  });

  return NextResponse.json(review);
}