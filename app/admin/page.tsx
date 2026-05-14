export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ShoppingBag, Package, Users, DollarSign } from "lucide-react";


export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const [totalOrders, totalProducts, totalUsers, revenueData] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "paid" },
    }),
  ]);

  const totalRevenue = revenueData._sum.total ?? 0;

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Overview</h1>

     
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Recent Orders</h2>
        <table className="w-full text-sm max-sm:hidden">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <th className="pb-3">Customer</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-3">
                  <p className="font-medium">{order.user.name}</p>
                  <p className="text-xs text-gray-500">{order.user.email}</p>
                </td>
                <td className="py-3">${order.total.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "delivered"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-y py-5 sm:hidden">
        <div className="space-y-4 ">
          {recentOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <div>
                   <p className="font-medium">{order.user.name}</p>
                  <p className="text-xs text-gray-500">{order.user.email}</p>
                </div>
                 <span className={` text-xs font-medium ${
                    order.status === "paid"
                      ? " text-green-700"
                      : order.status === "shipped"
                      ? " text-blue-700"
                      : order.status === "delivered"
                      ? " text-purple-700"
                      : " text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
              </div>

       
              

              <div className="flex justify-between items-center">
                <p className="font-bold">${order.total}</p>

                       <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

                
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
}