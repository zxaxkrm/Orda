export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { connection } from "next/server"; 
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Users } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
await connection();

  const session = await auth();

  if (!session?.user?.email) redirect("/");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== "admin") redirect("/");

  return (
    <div className="md:flex min-h-dvh">
      <aside className="w-60 border-r border-gray-200 p-6 space-y-6 shrink-0">
        <h1 className="font-bold text-xl">Admin</h1>
        <nav className="space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
            <ShoppingBag className="w-4 h-4" />
            Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
            <Package className="w-4 h-4" />
            Products
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
            <Users className="w-4 h-4" />
            Users
          </Link>
        </nav>
      </aside>

      
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}