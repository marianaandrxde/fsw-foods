import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px]">
      {}
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          fill
          className="rounded-lg object-cover"
          alt={restaurant.name}
        />


          <div className="absolute left-0 gap-2 top-0 bg-primary px-2 py-[2px] rounded-full text-white">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-xs">5.0</span>
          </div>
      </div>

      <Button className="absolute top-2 right-2 bg-gray-700 rounded-full h-7 w-7">
        <HeartIcon size={16} className="fill-white"/>
      </Button>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon className="text-primaru" size={12} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFree) == 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFree))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <TimerIcon className="text-primaru" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
