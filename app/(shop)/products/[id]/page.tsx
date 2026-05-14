import ProductDetails from '@/components/productDetails';
import Spinner from '@/components/spinner';
import { getProductById } from '@/lib/api';
import { Metadata } from 'next';
import { Suspense } from 'react';



export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail, width: 500, height: 500 }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description,
        images: [product.thumbnail],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}


const page = async ({params}:{params: Promise<{id:string}>}) => {



  return (
<Suspense fallback={<Spinner/>}>
   <ProductDetails params={params}/>
</Suspense>
  )
}

export default page