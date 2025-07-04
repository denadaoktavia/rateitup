import AddRestaurant from "@/components/reusable/AddRestaurant";
import CardRestaurants from "@/components/reusable/CardRestaurants";
import { useAxios } from "@/hooks/useAxios";
import { getRestaurants } from "@/service/restaurantApi";
import type { IRestaurant } from "@/utils/Interface";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroImage from "@/assets/images/Hero.png";

const AllRestaurants = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const { data, loading, error, refetch } =
    useAxios<IRestaurant[]>(getRestaurants);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="w-full mx-auto overflow-hidden max-w-[1240px] mt-5 px-4 lg:px-0">
      <section className="relative w-full h-[400px] overflow-hidden rounded-xl">
        <img
          src={HeroImage}
          alt="Hero Image"
          className="object-cover w-full h-full rounded-sm lg:aspect-video"
        />
        <div className="absolute flex flex-col items-center justify-center gap-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {isLogin ? (
            <AddRestaurant refetch={refetch} />
          ) : (
            <Link to="/login">
              <Button
                variant="default"
                size={"lg"}
                className="p-4 text-xl font-medium rounded-lg"
              >
                Tambah Restoran
              </Button>
            </Link>
          )}
          <h1 className="text-3xl font-bold text-center text-white md:text-5xl">
            Cari dan Temukan Restoran Favorit
          </h1>
        </div>
      </section>
      <section className="max-w-[768px] mx-auto mt-10 pb-52">
        <h1 className="mb-5 text-2xl font-bold text-center text-white">
          Semua Restoran
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {data?.map((restaurant: IRestaurant) => (
            <CardRestaurants
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
              photoUrl={restaurant.photoUrl}
              location={restaurant.location}
              mapsUrl={restaurant.mapsUrl}
              isUser={false}
              refetch={refetch}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllRestaurants;
