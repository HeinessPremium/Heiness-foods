import Image from "next/image";
import { MenuItem } from "@/lib/types";
import { FoodIllustration } from "@/components/food-illustration";
import { cn } from "@/lib/utils";

export function FoodVisual({
  item,
  className,
  sizes = "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw",
  priority = false,
}: {
  item: Pick<MenuItem, "photo" | "illustration" | "name">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (item.photo) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={item.photo}
          alt={item.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <FoodIllustration illustration={item.illustration} className={className} />
  );
}
