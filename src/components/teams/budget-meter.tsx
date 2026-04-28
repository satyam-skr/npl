import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

export function BudgetMeter({ budget, used }: { budget: number; used: number }) {
  const remaining = budget - used;
  const percent = (remaining / budget) * 100;
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-muted-foreground">Remaining</span>
        <span className="font-bold">{formatCurrency(remaining)}</span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
