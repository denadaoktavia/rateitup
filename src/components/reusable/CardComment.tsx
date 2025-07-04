import type { IComment } from "@/utils/Interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const CardComment = ({ text, createdAt, user }: IComment) => {
  return (
    <Card className="w-full py-3 bg-secondary">
      <CardHeader>
        <CardTitle className="text-base font-medium text-neutral-900">
          @{user?.username}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base font-normal text-muted-foreground">
          {text}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <CardDescription>{createdAt && formatDate(createdAt)}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default CardComment;
