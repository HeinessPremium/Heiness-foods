import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-white px-4 text-[0.95rem] text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
