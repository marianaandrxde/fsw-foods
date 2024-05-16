import { CartContext, CartProduct } from "../_context/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Ghost, Icon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    cartProduct: CartProduct
}

const CartItem = ({cartProduct}: CartItemProps) => {
    const {decreaseProductQuantity, increaseProductQuantity, removeProductFromCart} = useContext(CartContext)

    const handleIncreaseProductQuantity = () => increaseProductQuantity(cartProduct.id)
    const handleDecreaseProductQuantity = () => decreaseProductQuantity(cartProduct.id)
    const handleRemoveClick = () => removeProductFromCart(cartProduct.id)

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">


        {/*IMAGEM E INFO*/}
        <div className="w-20 h-20 relative">
            <Image src={cartProduct.imageUrl}
             alt={cartProduct.name} 
             fill
             className="rounded-lg object-cover"
            />
        </div>

        <div className="space-y-1">
            <h3 className="text-xs">{cartProduct.name}</h3>
            <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">{formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}</h4>
            {cartProduct.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                    {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
                </span>
            )}
            </div>

            <div className="flex gap-3 items-center">
                    <Button size="icon"
                        variant="ghost"
                        className="h-7 w-7 border border-solid border-muted-foreground">
                        <ChevronLeftIcon size={16} onClick={handleDecreaseProductQuantity}/>
                    </Button>
                    <span className="block w-3 text-xs">{cartProduct.quantity}</span>
                    <Button size="icon" className="w-7 h-7">
                        <ChevronRightIcon size={16} onClick={handleIncreaseProductQuantity}/>
                    </Button>
                </div>
        </div>
        </div>

        {/*BOTÃO DE DELETAR*/}
        <Button size="icon" className="h-8 w-8 border border-solid border-muted-foreground" variant="ghost" onClick={handleRemoveClick}>
            <TrashIcon size={16} />
        </Button>


        </div>
    );
};
 
export default CartItem;