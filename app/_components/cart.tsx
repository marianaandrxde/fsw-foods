import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { CardContent } from "./ui/card";
import { Card } from "./ui/card";
import { format } from "path";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";

const Cart = () => {
  const {data} = useSession()

  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  const handleFinishOrderClick =  async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant

    await createOrder({
      subtotalPrice,
      totalDiscounts,
      totalPrice,
      deliveryFree: restaurant.deliveryFree,
      deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
      restaurant: {
        connect: {id: restaurant.id},
      },
      status: OrderStatus.CONFIRMED,
      user: {
        connect: {id: data.user.id},
      },
    });
  };

  return (
    <div className="py-5 flex h-full flex-col">
      <div className="flex-auto space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

    {products.length > 0 ? (
        <>
      <div className="mt-6">
        <Card>
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>-{" "}{formatCurrency(totalDiscounts)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega</span>
              <span>
                {Number(products[0]?.restaurant.deliveryFree) == 0
                  ? (<span className="font-medium uppercase text-primary"> "Grátis"</span>)
                  : formatCurrency(Number(products[0]?.restaurant.deliveryFree))}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="w-full mt-6" onClick={handleFinishOrderClick}> 
        Finalizar pedido
      </Button>
      </>
    ): <h2 className="text-center font-medium">Sua sacola está vazia.</h2>}
    </div>
  );
};

export default Cart;
