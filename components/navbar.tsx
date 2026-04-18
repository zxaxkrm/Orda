"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cartStore";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const {data: session} = useSession();

  return (
    <div className="h-30 max-sm:h-25 p-2  sm:p-6 bg-[#97e292] ">
      <div className="bg-[#ffffff]  h-20 rounded-xl flex justify-between items-center max-sm:px-4 px-8">
        <Link href={"/"}>
          <div className="flex gap-2 items-center">
            <Image src={"/hare.png"} alt="logo" width={40} height={40} />
            <h1 className="font-bold text-2xl text-[#000000] max-sm:hidden">
              Orda
            </h1>
          </div>
        </Link>

        <div className="flex gap-3 items-center max-sm:hidden">
          <Link href={"/products"} className="text-lg">
            All Products
          </Link>

          <div>
            {!session && (
              <Link href={"/login"} className="text-lg">
            Log in
          </Link>
            )}
          </div>

          <Link href={"/orders"} className="text-lg max-sm:hidden">
            Returns & Orders
          </Link>

       <Link href={"/cart"}>
          
           <div className="text-sm text-white flex items-center justify-center h-10 w-10 rounded-full font-bold bg-green-900 ">
              <div>
                {totalItems}
              </div>
            </div>
       </Link>
        </div>

        <div className="flex justify-between px-3 gap-3 items-center sm:hidden">
         <div>
            {!session && (
              <Link href={"/login"} className="text-lg">
            Log in
          </Link>
            )}
          </div>

             <Link href={"/cart"}>
          
           <div className="text-sm text-white flex items-center justify-center h-10 w-10 rounded-full font-bold bg-green-900 ">
              <div>
                {totalItems}
              </div>
            </div>
       </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <Menu />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={"/products"}>All Products</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={"/orders"}>Order History</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <button onClick={()=> signOut()}>
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
