"use client";

import { CardContent } from "@/app/_components/ui/card"
import { OrderStatus, Prisma } from "@prisma/client"
import { Card } from "@/app/_components/ui/card"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { ChevronRightIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import { Separator } from "@/app/_components/ui/separator"
import { formatCurrency } from "@/app/_helpers/price"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "@/app/_context/cart"
import { useRouter } from "next/navigation"

interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            restaurant: true,
            products: {
                include: {
                    product: true,
                },
            },
        };
    }>
};

const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
        case "CANCELED":
            return "Cancelado";
        case "COMPLETED":
            return "Finalizado";
        case "CONFIRMED":
            return "Confirmado";
        case "DELIVERING":
            return "Em transporte";
        case "PREPARING":
            return "Preparando";
    }
}

const OrderItem = ({ order }: OrderItemProps) => {
    const {addProductToCart} = useContext(CartContext)
    const router = useRouter();

    const handleRedoOrderClick = () => {
        for (const orderProduct of order.products){
            addProductToCart({
                product: {...orderProduct.product, restaurant: order.restaurant},
                quantity: orderProduct.quantity,
            });
        };

        router.push(`/restaurants/${order.restaurantId}`)
    };

    return (
        <Card>
            <CardContent className="p-5">
                <div className={`w-fit px-2 py-1 bg-[#EEEEEE] text-muted-foreground rounded-full ${order.status != 'COMPLETED'
                    && "bg-green-500 text-white"}`}>
                    <span className="block text-xs font-semibold">{getOrderStatusLabel(order.status)}</span>
                </div>

                <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={order.restaurant.imageUrl} />
                        </Avatar>

                        <span className="text-sm font-semibold ">
                            {order.restaurant.name}
                        </span>
                    </div>

                    <Button className="h-5 w-5" variant="link" size="icon" asChild>
                        <Link href={`/restaurants/${order.restaurantId}`}>
                            <ChevronRightIcon />
                        </Link>
                    </Button>
                </div>

                <div className="py-3">
                    <Separator />
                </div>

                <div className="space-y-2">
                    {order.products.map((product) => (
                        <div key={product.id} className="flex items-center gap-2">
                            <div className="flex w-5 h-5 items-center rounded-full justify-center bg-muted-foreground">
                                <span className="block text-xs text-white">
                                    {product.quantity}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {product.product.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="py-3">
                    <Separator />
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
                    <Button variant="ghost" size="sm" onClick={handleRedoOrderClick} className="text-primary text-xs" disabled={order.status != "COMPLETED"}>
                        {order.status == 'COMPLETED'}
                        Refazer pedido
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderItem;