"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, MENU_ITEMS } from "@/lib/mock-data";
import { Category, MenuItem } from "@/lib/types";
import { CategoryTabs } from "@/components/category-tabs";
import { FoodCard } from "@/components/food-card";

export function MenuSection({
  onSelectItem,
  onQuickAdd,
}: {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}) {
  const [active, setActive] = useState<Category>("Popular");

  const items = useMemo(
    () => MENU_ITEMS.filter((item) => item.categories.includes(active)),
    [active]
  );

  return (
    <section id="menu" className="container py-10 sm:py-14">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-[1.6rem] font-semibold tracking-tight text-ink">
          The menu
        </h2>
        <p className="text-[0.95rem] text-ink/55">
          Made fresh to order, every time.
        </p>
      </div>

      <div className="mb-7">
        <CategoryTabs categories={CATEGORIES} active={active} onChange={setActive} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onSelect={onSelectItem}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </section>
  );
}
