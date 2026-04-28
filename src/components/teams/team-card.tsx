import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BudgetMeter } from "@/components/teams/budget-meter";
import type { Team } from "@/types/team";

export function TeamCard({ team, count = 0 }: { team: Team; count?: number }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: team.color }} />
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg text-white" style={{ backgroundColor: team.color }}>
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black">{team.name}</h3>
            <p className="text-sm text-muted-foreground">Manager: {team.manager ?? "Unassigned"}</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Players: <span className="font-semibold text-foreground">{count}/11</span></p>
        <div className="mt-4"><BudgetMeter budget={team.budget} used={team.budgetUsed} /></div>
        <Button asChild className="mt-5 w-full" variant="outline"><Link href={`/teams/${team.id}`}>View Roster</Link></Button>
      </CardContent>
    </Card>
  );
}
