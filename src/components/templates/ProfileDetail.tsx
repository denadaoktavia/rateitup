import CardRestaurants from "@/components/reusable/CardRestaurants";
import CardReview from "@/components/reusable/CardReview";
import EditProfile from "@/components/reusable/EditProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IRestaurant, IReview, IUser } from "@/utils/Interface";
import { useAxios } from "@/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "@/service/userApi";

const ProfileDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, loading, error, refetch } = useAxios<IUser>(getUser, [token]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <main className="w-full mx-auto overflow-hidden max-w-[768px] mt-5 px-4 lg:px-0">
        <Link to={"/"}>
          <Button type="button" variant={"destructive"}>
            Kembali
          </Button>
        </Link>
        <section className="flex flex-col items-center justify-center gap-5 py-8 mt-3 pb-52 bg-background rounded-3xl">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <div>
            <p className="text-base font-medium text-white">
              Nama Lengkap: {data?.name}
            </p>
            <p className="text-base font-medium text-white">
              Username: @{data?.username}
            </p>
          </div>
          {data?.id && (
            <div className="flex gap-5">
              <EditProfile
                name={data.name}
                username={data.username}
                id={data.id}
                refetch={refetch}
              />
              <Button variant={"destructive"} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
          <Tabs defaultValue="restaurant" className="w-full mt-5">
            <TabsList className="flex justify-center w-full h-10 item">
              <TabsTrigger value="restaurant">Restoran</TabsTrigger>
              <TabsTrigger value="review">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent
              value="restaurant"
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {data?.restaurants?.map((restaurant: IRestaurant) => (
                <CardRestaurants
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description}
                  photoUrl={restaurant.photoUrl}
                  location={restaurant.location}
                  mapsUrl={restaurant.mapsUrl}
                  refetch={refetch}
                  isUser
                />
              ))}
            </TabsContent>
            <TabsContent
              value="review"
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {data?.reviews?.map(
                (review: IReview) =>
                  review?.id && (
                    <CardReview
                      key={review.id}
                      id={review.id}
                      title={review.title}
                      text={review.text}
                      rating={review.rating}
                      user={review.user}
                      refetch={refetch}
                      isUser
                    />
                  )
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default ProfileDetail;
