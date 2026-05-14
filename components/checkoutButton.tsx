import dynamic from "next/dynamic";

const CheckoutButton = dynamic(() => import("./payStackButton"), {
  ssr: false,
  loading: () => (
    <button className="h-7 w-full rounded-md bg-[#5d00d6] text-white text-xs flex items-center justify-center">
      Checkout
    </button>
  ),
});

export default CheckoutButton;