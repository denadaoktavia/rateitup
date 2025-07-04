import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, max = 5, size = 20, className }: RatingProps) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFull = rounded >= starValue;
        const isHalf = rounded + 0.5 === starValue;

        return (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={
              isFull || isHalf ? "text-yellow-400" : "text-neutral-300"
            }
            fill={isFull ? "#facc15" : isHalf ? "url(#half)" : "none"}
          />
        );
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
