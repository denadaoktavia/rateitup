import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, type CommentForm } from "@/utils/Schema";
import { createComment } from "@/service/commentApi";

const AddComment = ({ id, refetch }: { id: number; refetch: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentForm) => {
    try {
      await createComment(id, data);
      reset();
      refetch();
    } catch (error) {
      console.error("Failed to create comment", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center w-full gap-2 mt-5"
    >
      <Textarea
        id="text"
        placeholder="Tulis Komentar..."
        required
        {...register("text")}
      />
      {errors.text && (
        <span className="text-xs text-red-500">{errors.text.message}</span>
      )}
      <Button
        type={"submit"}
        variant={"default"}
        disabled={isSubmitting}
        className="size-14"
      >
        <Send />
      </Button>
    </form>
  );
};

export default AddComment;
