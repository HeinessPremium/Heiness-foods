"use client";

import { MENU_ITEMS } from "@/lib/mock-data";
import { MenuItem } from "@/lib/types";
import { FoodVisual } from "@/components/food-visual";
import { formatNaira } from "@/lib/utils";

function Lane({
  items,
  direction,
  duration,
  onSelect,
}: {
  items: MenuItem[];
  direction: "left" | "right";
  duration: number;
  onSelect: (item: MenuItem) => void;
}) {
  const track = [...items, ...items];

  return (
    <div className="marquee-viewport">
      <div
        className="marquee-track"
        style={{
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${duration}s`,
        }}
      >
        {track.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => onSelect(item)}
            className="group flex w-[128px] flex-none flex-col items-center gap-2 sm:w-[144px]"
            aria-label={`Order ${item.name} — ${formatNaira(item.price)}`}
          >
            <span
              className="floating-bubble relative block h-[104px] w-[104px] overflow-hidden rounded-full border-4 border-white shadow-[0_18px_30px_-12px_rgba(14,77,52,0.45)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:h-[120px] sm:w-[120px]"
              style={{ animationDelay: `${(index % 5) * 0.35}s` }}
            >
              <FoodVisual item={item} sizes="120px" />
            </span>
            <span className="rounded-full bg-brand-green px-3 py-1 text-[0.78rem] font-semibold text-white shadow-sm">
              {formatNaira(item.price)}
            </span>
            <span className="max-w-[120px] truncate text-[0.74rem] font-medium text-ink/60">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function FloatingMenu({
  onSelect,
}: {
  onSelect: (item: MenuItem) => void;
}) {
  const rowA = MENU_ITEMS.filter((_, i) => i % 2 === 0);
  const rowB = MENU_ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section className="overflow-hidden bg-gradient-to-b from-brand-yellow-soft/70 via-brand-cream/60 to-white py-12 sm:py-16">
      <div className="container mb-7 text-center">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.78rem] font-semibold text-brand-orange shadow-sm">
          Tap a dish to order
        </span>
        <h2 className="text-[1.5rem] font-semibold tracking-tight text-ink sm:text-[1.8rem]">
          Today's favourites, floating your way
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <Lane items={rowA} direction="left" duration={34} onSelect={onSelect} />
        <Lane items={rowB} direction="right" duration={40} onSelect={onSelect} />
      </div>
    </section>
  );
}
