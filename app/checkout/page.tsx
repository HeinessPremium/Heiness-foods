"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/order-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FoodVisual } from "@/components/food-visual";
import { formatNaira } from "@/lib/utils";

const CURRENT_ORDER_KEY = "heiness_current_order_id";

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, deliveryFee, total, toSnapshot } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const next: FormErrors = {};
    if (fullName.trim().length < 2) next.fullName = "Enter your full name.";
    if (phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a valid phone number.";
    if (address.trim().length < 5) next.address = "Enter a delivery address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const order = createOrder({
      items: toSnapshot(),
      subtotal,
      deliveryFee,
      total,
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        landmark: landmark.trim() || undefined,
        instructions: instructions.trim() || undefined,
      },
    });

    window.sessionStorage.setItem(CURRENT_ORDER_KEY, order.id);
    router.push("/payment");
  }

  if (lines.length === 0) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-[1.3rem] font-semibold text-ink">
          Your cart is empty
        </h1>
        <p className="max-w-sm text-[0.92rem] text-ink/55">
          Add a few dishes from the menu before heading to checkout.
        </p>
        <Link href="/">
          <Button>Back to menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-ink/60 hover:text-ink"
      >
        <ArrowLeft size={15} /> Back to menu
      </Link>

      <h1 className="mb-1 text-[1.5rem] font-semibold tracking-tight text-ink">
        Delivery details
      </h1>
      <p className="mb-7 text-[0.9rem] text-ink/55">
        No account needed — checkout as a guest.
      </p>

      <div className="mb-8 rounded-2xl border border-border p-5">
        <h2 className="mb-4 text-[0.92rem] font-semibold text-ink">
          Order summary
        </h2>
        <div className="space-y-3">
          {lines.map((line) => (
            <div key={line.item.id} className="flex items-center gap-3">
              <div className="relative h-11 w-11 flex-none overflow-hidden rounded-lg">
                <FoodVisual item={line.item} sizes="44px" />
              </div>
              <div className="flex flex-1 items-center justify-between text-[0.87rem]">
                <span className="text-ink/75">
                  {line.quantity} × {line.item.name}
                </span>
                <span className="font-medium text-ink">
                  {formatNaira(line.quantity * line.item.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5 border-t border-dashed border-border pt-4 text-[0.87rem]">
          <div className="flex justify-between text-ink/60">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink/60">
            <span>Delivery</span>
            <span>{formatNaira(deliveryFee)}</span>
          </div>
          <div className="flex justify-between pt-1.5 text-[1rem] font-semibold text-ink">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Ada Obi"
            autoComplete="name"
          />
          {errors.fullName && (
            <p className="mt-1.5 text-[0.78rem] text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0803 000 0000"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="mt-1.5 text-[0.78rem] text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address">Delivery address</Label>
          <Textarea
            id="address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House number, street, area"
          />
          {errors.address && (
            <p className="mt-1.5 text-[0.78rem] text-red-600">{errors.address}</p>
          )}
        </div>

        <div>
          <Label htmlFor="landmark">Landmark (optional)</Label>
          <Input
            id="landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="e.g. Opposite Access Bank"
          />
        </div>

        <div>
          <Label htmlFor="instructions">Delivery instructions (optional)</Label>
          <Textarea
            id="instructions"
            rows={2}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Gate code, preferred drop-off point"
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continue to payment
        </Button>
      </form>
    </div>
  );
}
