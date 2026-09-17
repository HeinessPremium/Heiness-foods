"use client";

import { useCart } from "@/lib/cart-context";
import { formatNaira, cn } from "@/lib/utils";

export function CartBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { itemCount, subtotal } = useCart();

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-5 z-40 flex justify-center px-5 transition-all duration-300",
        itemCount > 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      )}
    >
      <button
        onClick={onOpenCart}
        className="flex w-full max-w-sm items-center justify-between gap-4 rounded-full bg-brand-green px-5 py-3.5 text-white shadow-[0_16px_40px_-14px_rgba(18,59,44,0.6)]"
      >
        <span className="text-[0.86rem] font-medium">
          {itemCount} item{itemCount === 1 ? "" : "s"} · {formatNaira(subtotal)}
        </span>
        <span className="rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-brand-green">
          View cart
        </span>
      </button>
    </div>
  );
}
