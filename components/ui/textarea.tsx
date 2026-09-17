import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
