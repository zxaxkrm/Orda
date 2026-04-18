import OrderDetails from "@/components/orderDetails";
import Spinner from "@/components/spinner";
import { Suspense } from "react";


export default  function OrderedItems({ params }: { params: { id: string }}) {
  

  return (
    <Suspense fallback={<Spinner />}>
      <OrderDetails params={params} />
    </Suspense>
  );
}