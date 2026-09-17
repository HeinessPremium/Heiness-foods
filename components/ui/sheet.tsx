"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: "bottom" | "right";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  side = "bottom",
  title,
  children,
  className,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isBottom = side === "bottom";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/45 backdrop-blur-[1px] animate-fade-in sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          "w-full bg-white shadow-2xl",
          isBottom
            ? "max-h-[88vh] overflow-y-auto rounded-t-[28px] animate-sheet-in-bottom sm:max-w-md sm:rounded-[28px]"
            : "ml-auto h-full max-w-md overflow-y-auto animate-sheet-in-right sm:rounded-l-[28px]",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 px-6 py-4 backdrop-blur">
          <span className="text-[1.05rem] font-semibold text-ink">{title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-tint text-ink transition hover:bg-brand-green-soft"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-8 pt-4">{children}</div>
      </div>
    </div>
  );
}
