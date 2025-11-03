import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Alert({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200",
        className,
      )}
      {...props}
    />
  );
}
