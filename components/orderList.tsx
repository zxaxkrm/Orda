import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function OrderList(){
     const session = await auth();

     if (!session?.user?.email) {
  return null; 
}

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    include: {
      orders: {
        include: { items: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

 if (!user || user.orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-500 text-sm">You have no orders yet.</p>
        <Link href="/products" className="mt-4 text-sm text-[#5d00d6] underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
     <div>
        <div className="max-sm:hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3">Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {user?.orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-4 font-medium">#{order.id.slice(-6).toUpperCase()}</td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>
                  <span
                    className={`px-2 py-1 capitalize text-xs rounded ${order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} `}
                  >
                    {order.status}
                  </span>
                </td>

                <td>${order.total.toLocaleString()}</td>

                <td>
                  <div className="flex  space-x-2">
                    {order.items.slice(0, 3).map((item) => (
                      <Image
                        width={40}
                        height={40}
                        alt={item.title}
                        key={item.id}
                        src={item.thumbnail}
                        className="w-8 h-8 rounded border"
                      />
                    ))}
                  </div>
                </td>

                <td>
                 <Link href={`/orders/${order.id}`}>
                  <button className="text-sm underline">View</button>
                 </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-y py-5 sm:hidden">
        <div className="space-y-4 ">
          {user?.orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <p className="font-semibold">#{order.id.slice(-6).toUpperCase()}</p>
                <span className={`text-xs  px-2 rounded ${order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>

              <div className="flex gap-2">
                {order.items.slice(0, 3).map((item) => (
                  <Image
                    width={40}
                    height={40}
                    alt={item.title}
                    key={item.id}
                    src={item.thumbnail}
                    className="w-10 h-10 rounded"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold">${order.total}</p>
                <button className="text-sm underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  )
}