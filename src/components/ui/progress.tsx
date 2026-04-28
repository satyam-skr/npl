import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({ value = 0, className }: { value?: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-[linear-gradient(135deg,#FFB300_0%,#FF6F00_100%)] transition-all duration-700" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
