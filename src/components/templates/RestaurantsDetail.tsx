import CardRestaurants from "@/components/reusable/CardRestaurants";
import CardReview from "@/components/reusable/CardReview";
import { useAxios } from "@/hooks/useAxios";
import { getRestaurant } from "@/service/restaurantApi";
import type { IRestaurant, IReview } from "@/utils/Interface";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreateReview from "@/components/reusable/CreateReview";

const RestaurantsDetail = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);
  const { data, loading, error, refetch } = useAxios<IRestaurant>(
    getRestaurant,
    [restaurantId]
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="w-full mx-auto overflow-hidden max-w-[768px] px-4 lg:px-0 mt-5">
      <section className="flex flex-col gap-5">
        <Link to={"/"}>
          <Button type="button" variant={"destructive"}>
            Kembali
          </Button>
        </Link>
        {data && (
          <CardRestaurants
            key={data.id}
            id={data.id}
            name={data.name}
            description={data.description}
            photoUrl={data.photoUrl}
            location={data.location}
            mapsUrl={data.mapsUrl}
            refetch={() => {}}
            isUser={false}
          />
        )}
        <div className="flex justify-center">
          {isLogin ? (
            <CreateReview restaurantId={restaurantId} refetch={refetch} />
          ) : (
            <Link to="/login">
              <Button type="button" variant={"destructive"}>
                Create Review
              </Button>
            </Link>
          )}
        </div>
      </section>
      <section className="mt-10 pb-52">
        <h1 className="mb-5 text-2xl font-bold text-center text-white">
          Semua Review
        </h1>
        <div className="flex flex-col gap-5">
          {data?.reviews?.length === 0 ? (
            <p>Tidak ada review</p>
          ) : (
            data?.reviews?.map((review: IReview) => (
              <CardReview
                key={review.id}
                id={review.id}
                title={review.title}
                text={review.text}
                rating={review.rating}
                createdAt={review.createdAt}
                user={review.user}
                comments={review.comments}
                refetch={refetch}
                isUser={false}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default RestaurantsDetail;
