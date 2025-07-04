import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import type { IRestaurant } from "@/utils/Interface";
import UpdateRestaurant from "@/components/reusable/UpdateRestaurant";
import DeleteRestaurant from "@/components/reusable/DeleteRestaurant";

const CardRestaurants = ({
  id,
  name,
  description,
  photoUrl,
  location,
  mapsUrl,
  isUser,
  refetch,
}: IRestaurant & { isUser: boolean; refetch: () => void }) => {
  return (
    <Card>
      <CardContent className="relative w-full aspect-video bg-primary rounded-t-xl">
        {isUser ? (
          <img
            src={photoUrl}
            alt={name}
            className="absolute inset-0 object-cover w-full h-full rounded-t-xl"
          />
        ) : (
          <Link to={`/restaurants/${id}`}>
            <img
              src={photoUrl}
              alt={name}
              className="absolute inset-0 object-cover w-full h-full rounded-t-xl"
            />
          </Link>
        )}
      </CardContent>
      <CardFooter className="w-full h-full flex flex-col items-start justify-between gap-1.5 pb-4">
        <CardTitle className="text-xl font-semibold text-neutral-900">
          {name}
        </CardTitle>
        <CardDescription className="text-base font-normal text-muted-foreground">
          {description}
        </CardDescription>
        <CardAction className="flex items-center justify-between w-full gap-2">
          <Link to={mapsUrl} target="_blank">
            <Button type="button" size={"sm"} variant={"link"}>
              <MapPin />
              {location}
            </Button>
          </Link>
          {isUser && (
            <div className="flex gap-2">
              <UpdateRestaurant
                id={id}
                name={name}
                description={description}
                photoUrl={photoUrl}
                location={location}
                mapsUrl={mapsUrl}
                refetch={refetch}
              />
              {typeof id === "number" && (
                <DeleteRestaurant id={id} refetch={refetch} />
              )}
            </div>
          )}
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default CardRestaurants;
