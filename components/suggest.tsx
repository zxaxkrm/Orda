import { getProductsByCategory } from "@/lib/api";
import { shuffleArray } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const SuggestPage = async () => {

const getFit = await getProductsByCategory("sports-accessories", 20);
  const getBeauty = await getProductsByCategory("beauty", 20);
  const getLap = await getProductsByCategory("laptops", 20);
  const getFrangrances = await getProductsByCategory("fragrances", 20);

  const sections = [
    { title: "Gear up to get fit", products: getFit.products },
    { title: "Level up your beauty routine", products: getBeauty.products },
    { title: "Level up your PC here", products: getLap.products },
    { title: "Top fragrances for you", products: getFrangrances.products },
  ];

  return (
    <div className="min-h-dvh px-5 py-10">
      <div className=" sm:h-120 border border-gray-300 bg-[#e3e6e6] rounded-3xl max-sm:space-y-7 sm:flex gap-3 p-5 items-center justify-between">
        {sections.map((section)=>(
            <div key={section.title} className="h-full sm:w-70 p-4 bg-[#ffffff] space-y-4">
                <div className="font-bold text-xl">{section.title}</div>
                <div className="grid grid-cols-2">
                    {shuffleArray(section.products).slice(0,4).map((item)=>(
                        <div key={item.id} className="">
                  <Link href={`/products/${item.id}`} className="space-y-2">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="h-28 w-28 object-cover"
                    />
                    <h1 className="text-xs line-clamp-1">{item.title}</h1>
                  </Link>
                </div>
                    ))}
                </div>
                    <Link href={"/products"} className="text-xs pt-5 underline">See more</Link>

            </div>    
            ))}
        
      </div>
    </div>
  );
};

export default SuggestPage;
