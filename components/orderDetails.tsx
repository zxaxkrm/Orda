import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function OrderDetails({ params }: {params: { id: string }}) {
const {id} = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });

  if (!order) return notFound();

  return (
    <div className="sm:px-23 px-4 py-10">
      <h1 className="border-b pb-3 font-bold text-2xl">
        Order #{order.id.slice(-6).toUpperCase()}
      </h1>
      <div className="py-4 space-y-7">
        <p className="font-semibold text-lg">
          Order status:{" "}
          <span
            className={`px-2 py-1 capitalize text-xs rounded ${order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} `}
          >
            {order.status}
          </span>
        </p>
        <h1 className="font-semibold text-lg">
          Order Total: <span>${order.total.toLocaleString()}</span>
        </h1>
      </div>

      <div className="">
        <h1 className="font-semibold ">Items Ordered</h1>
        <div>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b text-sm  py-2">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={100}
                height={130}
                className="bg-[#e3e3e3]"
              />
              <p>{item.title}</p>
              <p>(x{item.quantity})</p>
              <p>₦{item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
