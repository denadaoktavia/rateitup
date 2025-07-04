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
import { updateUser } from "@/service/userApi";
import { userSchema, type UserForm } from "@/utils/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const EditProfile = ({
  name,
  username,
  refetch,
  id,
}: {
  name?: string;
  username?: string;
  refetch: () => void;
  id: number;
}) => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserForm) => {
    try {
      await updateUser(id, data);
      reset();
      refetch();
      dialogCloseRef.current?.click();
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit Akun</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Edit Akun</DialogTitle>
            <DialogDescription>Ganti informasi akunmu disini</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                required
                defaultValue={name}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                {...register("username")}
                required
                defaultValue={username}
              />
              {errors.username && (
                <span className="text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button ref={dialogCloseRef} type="button" className="hidden" />
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Editing..." : "Edit Akun"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
