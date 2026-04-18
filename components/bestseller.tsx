import BestsellerItems from "./bestsellerItems"
import { getProducts } from "@/lib/api"


const BestsellerPage = async () => {

   const data = await getProducts(10, 0);

 
  return (
   <BestsellerItems products={data.products}/>
  )
}

export default BestsellerPage