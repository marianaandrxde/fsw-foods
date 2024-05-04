import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
    <Header />

    <div className="py-6 px-5">
      <h2 className="mb-6 px-5 text-lg font-semibold">Restaurantes recomendados</h2>

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

export default RecommendedRestaurants;
