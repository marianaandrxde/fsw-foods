import { Card } from "./ui/card";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
    restaurant: Pick<Restaurant, 'deliveryFree' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({restaurant}: DeliveryInfoProps) => {
    return (
        <>
        <Card className="flex justify-around py-3 mt-6">
            {/* CUSTO*/}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <BikeIcon size={14} />
                    <span>Entrega</span>
                </div>

                {Number(restaurant.deliveryFree) > 0 ? (
                    <p className="text-xs font-semibold">
                        {formatCurrency(Number(restaurant.deliveryFree))}
                    </p>
                ) : (
                    <p className="text-sm font-semibold">Grátis</p>
                )}
            </div>

            {/* TEMPO*/}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <TimerIcon size={14} />
                    <span>Entrega</span>
                </div>

                <p className="text-xs font-semibold">
                    {restaurant.deliveryTimeMinutes} min
                </p>
            </div>
        </Card>
    </>
    );
}

export default DeliveryInfo;