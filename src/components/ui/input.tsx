import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
});
