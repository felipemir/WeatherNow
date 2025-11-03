import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-400",
  secondary:
    "bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-400 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white",
  outline:
    "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800",
  ghost:
    "text-slate-700 hover:bg-slate-200/60 focus-visible:ring-slate-300 dark:text-slate-200 dark:hover:bg-slate-800/60",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "h-10 w-10 rounded-full",
};

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      type,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...(!asChild && { type: type ?? "button" })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
