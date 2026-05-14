import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, description, price, stock, category, thumbnail, images, rating } =
    await req.json();

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price,
      stock,
      category,
      thumbnail,
      images,
      rating,
    },
  });

  return NextResponse.json(product);
}