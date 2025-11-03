import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type FavoriteButtonProps = {
  isActive: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function FavoriteButton({
  isActive,
  className,
  children,
  ...props
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
        isActive
          ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
          : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
        className,
      )}
      {...props}
    >
      <StarIcon filled={isActive} />
      <span>{children}</span>
    </button>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-4 w-4", filled ? "text-amber-600" : "text-slate-500")}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l1.77 3.584 3.955.575a.562.562 0 0 1 .312.959l-2.86 2.787.675 3.935a.562.562 0 0 1-.815.592L12 15.651l-3.56 1.88a.562.562 0 0 1-.815-.592l.675-3.935-2.86-2.787a.562.562 0 0 1 .312-.959l3.955-.575 1.77-3.584Z"
      />
    </svg>
  );
}
