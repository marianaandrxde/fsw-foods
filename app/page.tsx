import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/product-list";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    //   where: { discountPercentage: { gt: 0,
    //   },
    //   },
    //   take:10,
          include:{
            restaurant: true,
          }
    });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full object-contain"
          quality={100}
        />
      </div>

      <div className="pt-6 spave-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button variant="ghost" className="h-fit p-0 text primary hover:bg-transparent"
          >
            Ver todos 
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
