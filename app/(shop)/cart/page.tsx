import { Metadata } from "next";
import CartPage from "@/components/cartPage";

export const metadata: Metadata = {
  title: "My Cart",
};

export default function Page() {
  return <CartPage />;
}