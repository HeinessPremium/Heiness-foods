"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

function CartGlyph() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.2 9.4 8.1 5.9a2.1 2.1 0 0 1 2-1.6h3.8a2.1 2.1 0 0 1 2 1.6l.9 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.4 9.4h13.2l-1.1 10.1a2 2 0 0 1-2 1.8H8.5a2 2 0 0 1-2-1.8L5.4 9.4Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 13.1c.9-.95 1.6-.95 2.5 0s1.5.95 2.4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader({ onCartClick }: { onCartClick: () => void }) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="container flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0E4D34" />
            <path
              d="M11 20.5c0-4 2.2-7.2 5-7.2s5 3.2 5 7.2c0 .8-.4 1.3-1 1.3H12c-.6 0-1-.5-1-1.3Z"
              fill="#E8622C"
            />
            <path d="M14.6 13.3v-3M16 13.3v-3.6M17.4 13.3v-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
            Heiness Foods
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[0.92rem] font-medium text-ink/70 sm:flex">
          <a href="#menu" className="transition hover:text-ink">
            Menu
          </a>
          <a href="#how-it-works" className="transition hover:text-ink">
            How it works
          </a>
        </nav>

        <button
          onClick={onCartClick}
          aria-label="Open cart"
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition hover:bg-brand-green hover:text-white"
        >
          <CartGlyph />
          <span
            className={cn(
              "absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1 text-[0.68rem] font-bold text-white shadow-sm transition-transform",
              itemCount > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          >
            {itemCount}
          </span>
        </button>
      </div>
    </header>
  );
}

