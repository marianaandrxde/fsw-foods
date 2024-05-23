import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { CardContent } from "./ui/card";
import { Card } from "./ui/card";
import { format } from "path";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createOrder } from "../_actions/order";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AlertDialogHeader, AlertDialogFooter, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogTitle, AlertDialogDescription, AlertDialogContent } from "./ui/alert-dialog";
import { AlertDialog } from "./ui/alert-dialog";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({setIsOpen}: CartProps ) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data } = useSession();
  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant

    try {
      setIsSubmitLoading(true)

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFree: restaurant.deliveryFree,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id }
        },
        products: {
          createMany: {
            data: products.map(product => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
      setIsOpen(false);

      toast("Pedido finalizado com sucesso", {
        description: "Você pode acompanhá-lo na tela dos seus pedidos.",
        action: {
          label: "Meus pedidos",
          onClick:() => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  return (
    <><div className="py-5 flex h-full flex-col">
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

          <Button className="w-full mt-6" onClick={() => setIsConfirmDialogOpen(true)} disabled={isSubmitLoading}>
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Finalizar pedido
          </Button>
        </>
      ) : <h2 className="absolute text-center font-medium">Sua sacola está vazia.</h2>}
    </div>
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você confirma com os termos e condições da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitLoading}>
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick}>Finalizar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog></>

  );
};

export default Cart;
