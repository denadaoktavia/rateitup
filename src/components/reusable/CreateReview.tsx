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
import { reviewSchema, type ReviewForm } from "@/utils/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "@/service/reviewApi";

const CreateReview = ({
  restaurantId,
  refetch,
}: {
  restaurantId: number;
  refetch: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: ReviewForm) => {
    try {
      await createReview(restaurantId, data);
      console.log(data);
      reset();
      refetch();
    } catch (error) {
      console.error("Failed to create review", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size={"lg"}
          className="p-4 text-xl font-medium text-neutral-900 rounded-lg"
        >
          Tambah Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Tambah Review</DialogTitle>
            <DialogDescription>
              Silahkan isi form dibawah ini untuk menambahkan review
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" type="text" required {...register("title")} />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="text">Teks</Label>
              <Textarea id="text" required {...register("text")} />
              {errors.text && (
                <span className="text-xs text-red-500">
                  {errors.text.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                required
                {...register("rating", { valueAsNumber: true })}
              />
              {errors.rating && (
                <span className="text-xs text-red-500">
                  {errors.rating.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Buat Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
