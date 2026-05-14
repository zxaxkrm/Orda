import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });


async function uploadToImageKit(url: string, fileName: string): Promise<string> {
  try {
    const response = await imagekit.upload({
      file: url, // ImageKit accepts URLs directly
      fileName: fileName,
      folder: "/products",
    });
    return response.url;
  } catch (error) {
    console.error(`Failed to upload ${fileName}:`, error);
    return url; // fallback to original URL if upload fails
  }
}

async function main() {
 


  const initial = await fetch("https://dummyjson.com/products?limit=1");
  const { total } = await initial.json();
  console.log(`${total}`);


  const res = await fetch(`https://dummyjson.com/products?limit=${total}&skip=0`);
  const data = await res.json();


  let success = 0;
  let failed = 0;

  for (const product of data.products) {
    try {
      

      const thumbnail = await uploadToImageKit(
        product.thumbnail,
        `${product.id}-thumbnail`
      );

      const images: string[] = [];
      for (const [index, imageUrl] of product.images.entries()) {
        const url = await uploadToImageKit(imageUrl, `${product.id}-image-${index}`);
        images.push(url);
      }

      await prisma.product.upsert({
        where: { externalId: product.id },
        update: {},
        create: {
          externalId: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          thumbnail,
          images,
          rating: product.rating,
        },
      });

      success++;
      
    } catch (error) {
      failed++;
      
    }
  }


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });