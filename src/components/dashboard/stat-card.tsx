import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-black">{value}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-primary"><Icon className="h-5 w-5" /></div>
      </CardContent>
    </Card>
  );
}
