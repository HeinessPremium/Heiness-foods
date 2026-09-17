"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, BadgeCheck, Lock, ShieldCheck, Zap } from "lucide-react";
import { Order } from "@/lib/types";
import { getOrder, updateOrder } from "@/lib/order-service";
import { getPaymentProvider } from "@/lib/payment-service";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";

const CURRENT_ORDER_KEY = "heiness_current_order_id";
const JUST_PAID_KEY = "heiness_just_paid_order_id";

type LocalStage = "idle" | "processing" | "failed";

function OPayBadge() {
  return (
    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#00A651] shadow-[0_6px_14px_-4px_rgba(0,166,81,0.6)]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="12" r="6.2" stroke="white" strokeWidth="2" />
        <path
          d="M15.5 8.2h2.3c1.5 0 2.7 1.15 2.7 2.55 0 1.4-1.2 2.55-2.7 2.55h-2.3"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M15.5 8.2v9.2" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [stage, setStage] = useState<LocalStage>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const orderId = window.sessionStorage.getItem(CURRENT_ORDER_KEY);
    if (!orderId) {
      setOrder(null);
      return;
    }
    setOrder(getOrder(orderId) ?? null);
  }, []);

  async function handlePay() {
    if (!order) return;
    setStage("processing");
    setErrorMessage(null);
    updateOrder(order.id, { status: "payment_processing" });

    const provider = getPaymentProvider();
    const result = await provider.charge({
      orderId: order.id,
      orderNumber: order.number,
      amount: order.total,
      customerName: order.customer.fullName,
    });

    if (result.success) {
      updateOrder(order.id, {
        status: "confirmed",
        paymentReference: result.reference,
      });
      try {
        window.sessionStorage.setItem(JUST_PAID_KEY, order.id);
        window.sessionStorage.removeItem(CURRENT_ORDER_KEY);
      } catch {
        // ignore storage errors
      }
      clearCart();
      router.push(`/order/${order.id}`);
    } else {
      updateOrder(order.id, { status: "payment_failed" });
      setErrorMessage(result.message);
      setStage("failed");
    }
  }

  if (order === undefined) {
    return null;
  }

  if (order === null) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-[1.3rem] font-semibold text-ink">
          We couldn&apos;t find that order
        </h1>
        <p className="max-w-sm text-[0.92rem] text-ink/55">
          Your checkout session may have expired. Please start again from the
          menu.
        </p>
        <Button onClick={() => router.push("/")}>Back to menu</Button>
      </div>
    );
  }

  return (
    <div className="container flex min-h-[85vh] max-w-md flex-col justify-center py-10">
      <div className="rounded-[28px] border border-border p-7 shadow-[0_30px_60px_-35px_rgba(18,59,44,0.4)]">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[1.02rem] font-semibold text-ink">
            Heiness Foods
          </span>
          <span className="rounded-full bg-tint px-2.5 py-1 text-[0.72rem] font-medium text-ink/50">
            OPay payment demo
          </span>
        </div>

        <div className="mb-6 rounded-2xl bg-tint p-5 text-center">
          <p className="text-[0.8rem] text-ink/50">Order {order.number}</p>
          <p className="mt-1 text-[2rem] font-semibold tracking-tight text-ink">
            {formatNaira(order.total)}
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border p-4">
          <OPayBadge />
          <div className="flex-1">
            <p className="text-[0.9rem] font-medium text-ink">Pay with OPay</p>
            <p className="text-[0.78rem] text-ink/50">
              You&apos;ll be asked to confirm on the next step
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-center gap-5 text-[0.72rem] font-medium text-ink/45">
          <span className="flex items-center gap-1.5">
            <Lock size={13} /> Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={13} /> Instant
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={13} /> Verified demo
          </span>
        </div>

        {stage === "failed" && errorMessage && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-[0.83rem] text-red-700">
            <AlertTriangle size={16} className="mt-0.5 flex-none" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button
          size="lg"
          className="w-full"
          onClick={handlePay}
          disabled={stage === "processing"}
        >
          {stage === "processing" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Processing payment…
            </>
          ) : stage === "failed" ? (
            "Try payment again"
          ) : (
            `Pay ${formatNaira(order.total)} with OPay`
          )}
        </Button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.75rem] text-ink/40">
          <ShieldCheck size={13} /> Simulated payment — no real charge is made
        </p>
      </div>
    </div>
  );
}
