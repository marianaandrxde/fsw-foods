import { Product } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice } from "../_helpers/price";
import { formatCurrency } from "../_helpers/price";
import { Prisma } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/_lib/utils";


interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  }>;

  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link className={cn("w-[150px] min-w-[150px] space-y-2", className)} href={`/products/${product.id}`}>
      <div className="w-[150px] min-w-[150px] space-y-2">
        <div className="relative h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage > 0 && (
            <div className="absolute left-0 gap-2 top-0 bg-primary px-2 py-[2px] rounded-full text-white">
              <ArrowDownIcon size={12} />
              <span className="font-semibold text-xs">{product.discountPercentage}%</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(Number(calculateProductTotalPrice(product)))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs  text bg-muted-foreground line-through text-[#7E8392] ">
                {formatCurrency(Number(product.price))}</span>
            )}
          </div>

          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
