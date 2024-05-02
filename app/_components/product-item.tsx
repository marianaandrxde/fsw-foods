import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
      </div>

    <div>
        <h2>{product.name}</h2>
    </div>
      <h3>
        R$ {Intl.NumberFormat("pt-BR", 
        {currency: "BRL",
         minimumFractionDigits: 2,
      }).format(Number(product.price))}
      </h3>
    </div>
  );
};

export default ProductItem;
