import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-green-600 text-white",
  warning: "bg-amber-500 text-[#1A0F00]",
  destructive: "bg-destructive text-white",
  outline: "border bg-card",
};

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", variants[variant], className)} {...props} />;
}
