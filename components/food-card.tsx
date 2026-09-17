"use client";

import { Plus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { FoodVisual } from "@/components/food-visual";
import { formatNaira } from "@/lib/utils";

export function FoodCard({
  item,
  onSelect,
  onQuickAdd,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:shadow-[0_16px_40px_-24px_rgba(18,59,44,0.4)]">
      <button
        onClick={() => onSelect(item)}
        className="aspect-[4/3] w-full overflow-hidden text-left"
        aria-label={`View ${item.name}`}
      >
        <div className="relative h-full w-full transition duration-300 group-hover:scale-[1.04]">
          <FoodVisual item={item} />
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <button onClick={() => onSelect(item)} className="text-left">
          <h3 className="text-[0.98rem] font-semibold leading-snug text-ink">
            {item.name}
          </h3>
        </button>
        <p className="line-clamp-2 text-[0.83rem] leading-relaxed text-ink/55">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[0.98rem] font-semibold text-brand-green">
            {formatNaira(item.price)}
          </span>
          <button
            onClick={() => onQuickAdd(item)}
            aria-label={`Add ${item.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition hover:bg-brand-green hover:text-white active:scale-90"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
