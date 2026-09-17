"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order, OrderStatus } from "@/lib/types";
import {
  getAllOrders,
  nextStatus,
  STATUS_SEQUENCE,
  subscribeToOrders,
  updateOrderStatus,
} from "@/lib/order-service";
import { formatNaira, cn } from "@/lib/utils";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-tint text-ink/60",
  payment_processing: "bg-brand-orange-soft text-brand-orange",
  payment_failed: "bg-red-50 text-red-600",
  confirmed: "bg-brand-green-soft text-brand-green",
  preparing: "bg-brand-orange-soft text-brand-orange",
  ready: "bg-brand-green-soft text-brand-green",
  out_for_delivery: "bg-brand-green-soft text-brand-green",
  delivered: "bg-ink/5 text-ink/60",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  payment_processing: "Confirming payment",
  payment_failed: "Payment failed",
  confirmed: "Payment confirmed",
  preparing: "Preparing",
  ready: "Ready",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getAllOrders());
    const unsubscribe = subscribeToOrders(() => setOrders(getAllOrders()));
    return unsubscribe;
  }, []);

  function advance(order: Order) {
    const upcoming = nextStatus(order.status);
    if (upcoming) updateOrderStatus(order.id, upcoming);
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[1.4rem] font-semibold tracking-tight text-ink">
            Orders
          </h1>
          <p className="mt-1 text-[0.87rem] text-ink/50">
            Demo order management — no authentication in this preview.
          </p>
        </div>
        <Link
          href="/"
          className="text-[0.85rem] font-medium text-brand-green hover:underline"
        >
          Back to storefront
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-[0.9rem] text-ink/50">
          No orders yet. Place a demo order from the storefront to see it
          here.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const upcoming = nextStatus(order.status);
            return (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[0.95rem] font-semibold text-ink">
                      {order.number}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[0.72rem] font-medium",
                        STATUS_STYLES[order.status]
                      )}
                    >
                      {STATUS_LABEL[order.status]}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[0.85rem] text-ink/60">
                    {order.customer.fullName} · {order.customer.phone}
                  </p>
                  <p className="mt-0.5 truncate text-[0.8rem] text-ink/40">
                    {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                  </p>
                </div>

                <div className="flex flex-none items-center gap-4">
                  <span className="text-[0.95rem] font-semibold text-ink">
                    {formatNaira(order.total)}
                  </span>
                  {upcoming ? (
                    <button
                      onClick={() => advance(order)}
                      className="rounded-full border border-brand-green/25 px-3.5 py-1.5 text-[0.78rem] font-medium text-brand-green transition hover:bg-brand-green-soft"
                    >
                      Mark as {STATUS_LABEL[upcoming]}
                    </button>
                  ) : (
                    <span className="text-[0.78rem] text-ink/35">
                      {order.status === "payment_failed"
                        ? "Awaiting retry"
                        : "Complete"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-[0.78rem] text-ink/35">
        {STATUS_SEQUENCE.length} tracked stages: {STATUS_SEQUENCE.map((s) => STATUS_LABEL[s]).join(" → ")}
      </p>
    </div>
  );
}
