import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/store/cartStore";

export async function POST(req: Request){
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const {items, total} = await req.json();

      const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name ?? "",
    },
  });


    if (!user) {
        return NextResponse.json({error:"User not found"}, {status: 404});
    }

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            total,
            items: {
                create: items.map((item: CartItem)=>({
                    productId: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    thumbnail: item.thumbnail,
                }))
            },
        },
        include: {items: true},
    });
    return NextResponse.json(order)
}