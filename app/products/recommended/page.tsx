import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";


import ProductItem from "@/app/_components/product-item";
const RecommendedProductsPage = async () => {
    const products = await db.product.findMany({
        //   where: { discountPercentage: { gt: 0,
        //   },
        //   },
        //   take:10,
        include: {
          restaurant: true,
        },
      });

      return (
        <>
        <Header />
    
        <div className="py-6 px-5">
          <h2 className="mb-6 px-5 text-lg font-semibold">Pedidos Recomendados</h2>
    
          <div className="grid grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                className="min-w-full max-w-full"
              />
            ))}
          </div>
        </div>
        </>
      );
};

 
export default RecommendedProductsPage;