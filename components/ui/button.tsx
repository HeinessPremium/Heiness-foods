import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-brand-green text-white hover:bg-brand-green-dark",
        secondary:
          "bg-brand-orange text-white hover:bg-brand-orange/90",
        outline:
          "border border-brand-green/25 text-brand-green hover:bg-brand-green-soft",
        ghost: "text-brand-green hover:bg-brand-green-soft",
        subtle: "bg-tint text-ink hover:bg-brand-green-soft",
      },
      size: {
        default: "h-12 px-6 text-[0.95rem]",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
