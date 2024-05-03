"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { formatCurrency, calculateProductTotalPrice } from "@/app/_helpers/price";
import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { BikeIcon, ChevronLeftIcon, TimerIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";
import DeliveryInfo from "@/app/_components/delivery-info";


interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        };
    }>[];
}

const ProductDetails = ({ product, complementaryProducts }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick = () => setQuantity((currentState) => currentState + 1);
    const handleDecreaseQuantityClick = () => setQuantity((currentState) => {
        if (currentState == 1) return 1;

        return currentState - 1;
    });

    return (
        <div className="py-5 relative z-index mt-[-5px] rounded-tr-3xl bg-white">
            <div className="flex items-center gap-=[0.375rem]">
                <div className="relative h-6 w-6">
                    <Image src={product.restaurant.imageUrl}
                        alt={product.restaurant.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <span className="text-xs text-muted-foreground">
                    {product.restaurant.name}
                </span>
            </div>

            <h1 className="mb-3 mt-1 text-xl px-5 font-semibold">{product.name}</h1>


            <div className="flex justify-between px-5">

                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            {formatCurrency(calculateProductTotalPrice(product))}
                        </h2>

                        {product.discountPercentage && (
                            <DiscountBadge product={product} />
                        )}
                    </div>

                    {/*PREÇO ORIGINAL */}
                    {product.discountPercentage > 0 && (
                        <p className="text-sm text-muted-foreground">
                            De {formatCurrency(Number(product.price))}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 items-center">
                    <Button size="icon"
                        variant="ghost"
                        className="border border-solid border-muted-foreground"
                        onClick={handleDecreaseQuantityClick}>
                        <ChevronLeftIcon />
                    </Button>
                    <span className="w-4">{quantity}</span>
                    <Button size="icon"
                        onClick={handleIncreaseQuantityClick}>
                        <ChevronLeftIcon />
                    </Button>
                </div>
            </div>

            <div className="px-5">
                <DeliveryInfo restaurant={product.restaurant}/>
            </div>

            <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className="text-sm text-muted-foreground">
                    {product.description}
                </p>
            </div>

            <div className="mt-6 space-y-3">
                <h3 className="font-semibold px-5">Sucos</h3>
                    <ProductList products={complementaryProducts} />
            </div>

            <div className="mt-6 px-5">
                <Button className="font-semibold w-full">
                    Adicionar à sacola
                </Button>
            </div>
        </div>
    );
}

export default ProductDetails;
