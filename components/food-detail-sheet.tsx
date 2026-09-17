"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FoodVisual } from "@/components/food-visual";
import { formatNaira } from "@/lib/utils";

export function FoodDetailSheet({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (item: MenuItem, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) setQuantity(1);
  }, [item]);

  return (
    <Sheet open={!!item} onClose={onClose} side="bottom" title="">
      {item && (
        <div className="-mt-4">
          <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
            <FoodVisual item={item} priority sizes="(min-width: 640px) 420px, 100vw" />
          </div>

          <h2 className="text-[1.25rem] font-semibold text-ink">{item.name}</h2>
          <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink/60">
            {item.description}
          </p>
          <div className="mt-3 text-[1.15rem] font-semibold text-brand-green">
            {formatNaira(item.price)}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-tint px-4 py-3">
            <span className="text-[0.88rem] font-medium text-ink/70">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-green/25 text-brand-green transition hover:bg-brand-green-soft"
              >
                <Minus size={16} />
              </button>
              <span className="w-5 text-center text-[1rem] font-semibold text-ink">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-green/25 text-brand-green transition hover:bg-brand-green-soft"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <Button
            className="mt-5 w-full"
            size="lg"
            onClick={() => {
              onAdd(item, quantity);
              onClose();
            }}
          >
            Add to order · {formatNaira(item.price * quantity)}
          </Button>
        </div>
      )}
    </Sheet>
  );
}
