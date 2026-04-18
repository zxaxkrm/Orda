import ProductDetails from '@/components/productDetails';
import Spinner from '@/components/spinner';
import { Suspense } from 'react';

const page = async ({params}:{params: Promise<{id:number}>}) => {



  return (
<Suspense fallback={<Spinner/>}>
   <ProductDetails params={params}/>
</Suspense>
  )
}

export default page