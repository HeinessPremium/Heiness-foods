"use client";

import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: Category[];
  active: Category;
  onChange: (category: Category) => void;
}) {
  return (
    <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "flex-none rounded-full border px-4 py-2 text-[0.86rem] font-medium transition",
            active === category
              ? "border-brand-green bg-brand-green text-white"
              : "border-border bg-white text-ink/70 hover:border-brand-green/30 hover:text-ink"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
