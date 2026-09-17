"use client";

import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FoodVisual } from "@/components/food-visual";
import { formatNaira } from "@/lib/utils";

export function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { lines, subtotal, deliveryFee, total, increment, decrement, removeItem } =
    useCart();

  return (
    <Sheet open={open} onClose={onClose} side="right" title="Your order">
      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tint text-ink/40">
            <ShoppingBag size={24} />
          </div>
          <p className="text-[0.95rem] text-ink/55">
            Your cart is empty. Add something from the menu to get started.
          </p>
          <Button variant="outline" onClick={onClose}>
            Browse menu
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {lines.map((line) => (
              <div key={line.item.id} className="flex gap-3">
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl">
                  <FoodVisual item={line.item} sizes="64px" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[0.9rem] font-medium leading-snug text-ink">
                      {line.item.name}
                    </span>
                    <button
                      onClick={() => removeItem(line.item.id)}
                      aria-label={`Remove ${line.item.name}`}
                      className="text-ink/30 transition hover:text-brand-orange"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.85rem] text-ink/50">
                      {formatNaira(line.item.price)}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => decrement(line.item.id)}
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-green/25 text-brand-green"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-4 text-center text-[0.88rem] font-semibold">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => increment(line.item.id)}
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-green/25 text-brand-green"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-border pt-5">
            <div className="flex justify-between text-[0.88rem] text-ink/60">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[0.88rem] text-ink/60">
              <span>Delivery</span>
              <span>{formatNaira(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-dashed border-border pt-3 text-[1.02rem] font-semibold text-ink">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={() => {
              onClose();
              router.push("/checkout");
            }}
          >
            Continue to checkout
          </Button>
        </>
      )}
    </Sheet>
  );
}
