import OrderStatusUpdater from "@/components/orderStatusUpdater";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="border border-gray-200 rounded-xl overflow-hidden max-sm:hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{order.user.name}</p>
                  <p className="text-xs text-gray-500">{order.user.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </td>
                <td className="px-4 py-3">${order.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 truncate max-w-30">
                  {order.paymentReference ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="space-y-3 sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm">{order.user.name}</p>
                <p className="text-xs text-gray-500">{order.user.email}</p>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </p>
              <p className="font-medium">${order.total.toLocaleString()}</p>
            </div>

            <div className="flex justify-between items-center">
              <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
              {order.paymentReference && (
                <p className="text-xs text-gray-400 truncate max-w-30">
                  {order.paymentReference}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}