import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodVisual } from "@/components/food-visual";
import { getMenuItem } from "@/lib/mock-data";

export function Hero() {
  const heroItem = getMenuItem("jollof-grilled")!;

  return (
    <section className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
      <div>
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-yellow-soft px-3.5 py-1.5 text-[0.8rem] font-semibold text-brand-orange">
          Now delivering in Lekki, Lagos
        </span>
        <h1 className="text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3.4rem]">
          Good food.
          <br />
          Delivered fast.
        </h1>
        <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/65">
          Freshly prepared meals, made to order and delivered to your door —
          pay with OPay and track every step from your phone.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#menu">
            <Button size="lg">
              Order now <ArrowRight size={18} />
            </Button>
          </a>
          <a href="#menu">
            <Button size="lg" variant="outline">
              View menu
            </Button>
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand-yellow-soft via-brand-cream to-brand-orange-soft" />
        <div className="absolute -top-5 -right-5 -z-10 h-28 w-28 rounded-full bg-brand-yellow/40 blur-2xl" />
        <div className="relative overflow-hidden rounded-[32px] border border-border shadow-[0_30px_60px_-25px_rgba(14,77,52,0.35)]">
          <div className="relative aspect-[4/3]">
            <FoodVisual item={heroItem} priority sizes="(min-width: 1024px) 480px, 90vw" />
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h13l4 4v-8h-4l-3-4H3z"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/></svg>
          </div>
          <div>
            <div className="text-[0.8rem] font-semibold text-ink">20–35 min</div>
            <div className="text-[0.72rem] text-ink/55">average delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
}

