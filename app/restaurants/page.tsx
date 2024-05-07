"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RestaurantItem from "../_components/restaurant-item";
import Header from "../_components/header";
import searchForRestaurants from "./_actions/search";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchRestaurants = async () => {
        const searchFor = searchParams.get("search");
        if (!searchFor) return;
        const foundRestaurants = await searchForRestaurants(searchFor);
        setRestaurants(foundRestaurants);
        };
    
    
    fetchRestaurants();
},[searchParams]);

return (
    <>
    <Header />

    <div className="py-6 px-5">
      <h2 className="mb-6 px-5 text-lg font-semibold">Restaurantes encontrados</h2>

      <div className="flex w-full flex-col gap-6 space-y-4 px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </div>
    </>
);
};
 
export default Restaurants;