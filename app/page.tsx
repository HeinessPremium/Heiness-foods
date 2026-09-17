"use client";

import { useState } from "react";
import { CreditCard, Truck, UtensilsCrossed } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { FloatingMenu } from "@/components/floating-menu";
import { MenuSection } from "@/components/menu-grid";
import { FoodDetailSheet } from "@/components/food-detail-sheet";
import { CartSheet } from "@/components/cart-sheet";
import { CartBar } from "@/components/cart-bar";
import { useCart } from "@/lib/cart-context";
import { MenuItem } from "@/lib/types";

export default function HomePage() {
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <SiteHeader onCartClick={() => setCartOpen(true)} />

      <main>
        <Hero />
        <FloatingMenu onSelect={setSelectedItem} />
        <MenuSection
          onSelectItem={setSelectedItem}
          onQuickAdd={(item) => addItem(item, 1)}
        />

        <section id="how-it-works" className="bg-tint py-16">
          <div className="container">
            <h2 className="mb-8 text-[1.6rem] font-semibold tracking-tight text-ink">
              How it works
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: UtensilsCrossed,
                  title: "Choose your meal",
                  desc: "Browse the menu and add as many dishes as you like.",
                },
                {
                  icon: CreditCard,
                  title: "Pay with OPay",
                  desc: "Enter your delivery details and confirm payment securely.",
                },
                {
                  icon: Truck,
                  title: "Track your order",
                  desc: "Watch your order move from the kitchen to your door.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-1.5 text-[0.98rem] font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="text-[0.87rem] leading-relaxed text-ink/55">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col items-center gap-2 text-center">
          <span className="text-[0.92rem] font-semibold text-ink">
            Heiness Foods
          </span>
          <p className="max-w-md text-[0.8rem] text-ink/45">
            Portfolio demo project. Menu, prices, and OPay checkout are
            simulated and no real orders or payments are processed.
          </p>
        </div>
      </footer>

      <CartBar onOpenCart={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
      <FoodDetailSheet
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAdd={(item, quantity) => addItem(item, quantity)}
      />
    </>
  );
}
