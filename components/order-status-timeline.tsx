import { Check } from "lucide-react";
import { OrderStatus } from "@/lib/types";
import { STATUS_SEQUENCE } from "@/lib/order-service";
import { cn } from "@/lib/utils";

const LABELS: Record<OrderStatus, string> = {
  pending: "Order received",
  payment_processing: "Confirming payment",
  payment_failed: "Payment failed",
  confirmed: "Payment confirmed",
  preparing: "Preparing your food",
  ready: "Ready for pickup",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
};

const STEPS: OrderStatus[] = ["confirmed", "preparing", "out_for_delivery", "delivered"];

export function OrderStatusTimeline({ status }: { status: OrderStatus }) {
  const currentIndex = STATUS_SEQUENCE.indexOf(status);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[0.9rem] font-medium text-ink/70">
        <Check size={15} className="text-brand-green" /> Order received
      </div>
      {STEPS.map((step) => {
        const stepIndex = STATUS_SEQUENCE.indexOf(step);
        const done =
          currentIndex > stepIndex || (status === "delivered" && step === "delivered");
        const isCurrent = status === step;
        const upcoming = !done && !isCurrent;

        return (
          <div
            key={step}
            className={cn(
              "flex items-center gap-2 text-[0.9rem]",
              done && "font-medium text-ink/70",
              isCurrent && "font-semibold text-brand-green",
              upcoming && "text-ink/35"
            )}
          >
            {done ? (
              <Check size={15} className="text-brand-green" />
            ) : isCurrent ? (
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-brand-green/40" />
                <span className="relative h-2 w-2 rounded-full bg-brand-green" />
              </span>
            ) : (
              <span className="h-2 w-2 rounded-full border border-ink/25" />
            )}
            {LABELS[step]}
          </div>
        );
      })}
    </div>
  );
}
