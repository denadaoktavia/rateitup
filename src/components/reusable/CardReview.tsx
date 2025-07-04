import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Rating } from "@/components/ui/rating";
import CardComment from "@/components/reusable/CardComment";
import AddComment from "@/components/reusable/AddComment";
import type { IComment, IReview } from "@/utils/Interface";
import { formatDate } from "@/lib/utils";
import UpdateReview from "@/components/reusable/UpdateReview";
import DeleteReview from "@/components/reusable/DeleteReview";

const CardReview = ({
  id,
  title,
  text,
  rating,
  createdAt,
  user,
  comments,
  refetch,
  isUser,
}: IReview & {
  refetch: () => void;
  isUser: boolean;
}) => {
  const [seeComments, setSeeComments] = useState(false);

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-neutral-900">
          @{user?.username}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-between">
        <CardTitle className="text-lg font-medium text-neutral-900">
          {title}
        </CardTitle>
        <CardDescription className="text-base font-normal text-muted-foreground">
          {text}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Rating value={rating} />
        <CardDescription>{createdAt && formatDate(createdAt)}</CardDescription>
        <CardAction>
          {isUser ? (
            <div className="flex gap-2">
              {typeof id === "number" && (
                <>
                  <UpdateReview
                    id={id}
                    title={title}
                    text={text}
                    rating={rating}
                    refetch={refetch}
                  />
                  <DeleteReview id={id} refetch={refetch} />
                </>
              )}
            </div>
          ) : (
            <Button
              type={"button"}
              size={"sm"}
              variant={"link"}
              onClick={() => setSeeComments(!seeComments)}
            >
              Komentar
            </Button>
          )}
        </CardAction>
      </CardFooter>
      {seeComments && (
        <section className="px-10">
          <div className="flex flex-col gap-3">
            {comments?.map((comment: IComment) => (
              <CardComment
                key={comment.id}
                id={comment.id}
                text={comment.text}
                createdAt={comment.createdAt}
                user={comment.user}
              />
            ))}
          </div>
          {typeof id === "number" && <AddComment id={id} refetch={refetch} />}
        </section>
      )}
    </Card>
  );
};

export default CardReview;
