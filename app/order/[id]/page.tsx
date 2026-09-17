"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { Order, OrderStatus } from "@/lib/types";
import {
  getOrder,
  nextStatus,
  subscribeToOrders,
  updateOrderStatus,
} from "@/lib/order-service";
import { OrderStatusTimeline } from "@/components/order-status-timeline";
import { FoodVisual } from "@/components/food-visual";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";

const JUST_PAID_KEY = "heiness_just_paid_order_id";

// How long each stage takes in this simulation, in milliseconds.
const STAGE_DELAYS: Partial<Record<OrderStatus, number>> = {
  confirmed: 4000,
  preparing: 6000,
  ready: 3000,
  out_for_delivery: 7000,
};

export default function OrderTrackingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [justConfirmed, setJustConfirmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldSimulate = useRef(false);

  useEffect(() => {
    const found = getOrder(params.id);
    setOrder(found ?? null);

    try {
      const flagged = window.sessionStorage.getItem(JUST_PAID_KEY);
      if (flagged === params.id) {
        setJustConfirmed(true);
        shouldSimulate.current = true;
        window.sessionStorage.removeItem(JUST_PAID_KEY);
      }
    } catch {
      // ignore storage errors
    }

    const unsubscribe = subscribeToOrders(() => {
      setOrder(getOrder(params.id) ?? null);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // Auto-advance the order status over time, but only in the tab that
  // just completed payment — other tabs (e.g. /admin) simply observe.
  useEffect(() => {
    if (!order || !shouldSimulate.current) return;
    const wait = STAGE_DELAYS[order.status];
    if (!wait) return;

    timerRef.current = setTimeout(() => {
      const upcoming = nextStatus(order.status);
      if (upcoming) updateOrderStatus(order.id, upcoming);
    }, wait);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [order]);

  if (order === undefined) return null;

  if (order === null) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-[1.3rem] font-semibold text-ink">
          Order not found
        </h1>
        <p className="max-w-sm text-[0.92rem] text-ink/55">
          This order link may have expired or belongs to a different
          session.
        </p>
        <Link href="/">
          <Button>Back to menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-lg py-10">
      {justConfirmed && (
        <div className="mb-8 flex flex-col items-center text-center animate-slide-up">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mb-4">
            <circle cx="28" cy="28" r="28" fill="#0E4D34" />
            <path
              d="M17 29l7 7 15-15"
              stroke="#E8622C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              className="animate-check-draw"
            />
          </svg>
          <h1 className="text-[1.35rem] font-semibold text-ink">
            Order confirmed
          </h1>
          <p className="mt-1 text-[0.92rem] text-ink/55">
            Thank you, {order.customer.fullName.split(" ")[0]}. Your food is
            being prepared.
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-border p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[0.78rem] text-ink/45">Order</p>
            <p className="text-[1.05rem] font-semibold text-ink">
              {order.number}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.78rem] text-ink/45">Estimated delivery</p>
            <p className="text-[0.95rem] font-medium text-ink">
              20–35 minutes
            </p>
          </div>
        </div>

        <OrderStatusTimeline status={order.status} />

        <div className="mt-6 space-y-3 border-t border-border pt-5">
          {order.items.map((line) => (
            <div key={line.itemId} className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-none overflow-hidden rounded-lg">
                <FoodVisual item={line} sizes="40px" />
              </div>
              <div className="flex flex-1 items-center justify-between text-[0.85rem]">
                <span className="text-ink/70">
                  {line.quantity} × {line.name}
                </span>
                <span className="font-medium text-ink">
                  {formatNaira(line.quantity * line.price)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between border-t border-dashed border-border pt-4 text-[1rem] font-semibold text-ink">
          <span>Total paid</span>
          <span>{formatNaira(order.total)}</span>
        </div>

        <div className="mt-5 space-y-1 text-[0.85rem] text-ink/55">
          <p>{order.customer.address}</p>
          {order.customer.landmark && <p>Near {order.customer.landmark}</p>}
          <p>{order.customer.phone}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => router.push("/")}>
          Back to menu
        </Button>
        <Link href={`/order/${order.id}`} className="flex-1">
          <Button className="w-full">
            <Check size={16} /> View order
          </Button>
        </Link>
      </div>
    </div>
  );
}
