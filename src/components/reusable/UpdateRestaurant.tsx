import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { restaurantSchema, type RestaurantForm } from "@/utils/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRestaurant } from "@/service/restaurantApi";
import type { IRestaurant } from "@/utils/Interface";
import { SquarePen } from "lucide-react";

const UpdateRestaurant = ({
  id,
  name,
  description,
  photoUrl,
  location,
  mapsUrl,
  refetch,
}: IRestaurant & { refetch: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RestaurantForm>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = async (data: RestaurantForm) => {
    try {
      await updateRestaurant(id!, data);
      reset();
      refetch();
    } catch (error) {
      console.error("Failed to update restaurant", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={"sm"}
          variant={"outline"}
          className="bg-emerald-400 hover:bg-emerald-300"
        >
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
            <DialogDescription>
              Edit restorant informasi disini
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                type="text"
                required
                {...register("name")}
                defaultValue={name}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                required
                {...register("description")}
                defaultValue={description}
              />
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="photoUrl">Link Photo</Label>
              <Input
                id="photoUrl"
                type="url"
                required
                {...register("photoUrl")}
                defaultValue={photoUrl}
              />
              {errors.photoUrl && (
                <span className="text-xs text-red-500">
                  {errors.photoUrl.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                type="text"
                required
                {...register("location")}
                defaultValue={location}
              />
              {errors.location && (
                <span className="text-xs text-red-500">
                  {errors.location.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="mapsUrl">Link Maps</Label>
              <Input
                id="mapsUrl"
                type="url"
                required
                {...register("mapsUrl")}
                defaultValue={mapsUrl}
              />
              {errors.mapsUrl && (
                <span className="text-xs text-red-500">
                  {errors.mapsUrl.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Edit Restoran"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRestaurant;
