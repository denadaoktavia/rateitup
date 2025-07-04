import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteRestaurant } from "@/service/restaurantApi";

const DeleteRestaurant = ({
  id,
  refetch,
}: {
  id: number;
  refetch: () => void;
}) => {
  const onClick = async (id: number) => {
    try {
      await deleteRestaurant(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete restaurant", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" size={"sm"} variant={"destructive"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Kamu yakin ingin menghapus restoran ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Restoran yang telah dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => onClick(id)}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRestaurant;
