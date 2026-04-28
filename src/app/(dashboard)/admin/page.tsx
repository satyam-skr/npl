import { IndianRupee, Trophy, UserCheck, Users } from "lucide-react";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { players, teams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  const sold = players.filter((player) => player.status === "SOLD").length;
  const unsold = players.filter((player) => player.status === "UNSOLD").length;
  const distributed = teams.reduce((sum, team) => sum + team.budgetUsed, 0);

  return (
    <>
      <PageHeader title="Admin Dashboard" description="Auction operations, spending, inventory, and recent activity." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total Players" value={String(players.length)} />
        <StatCard icon={UserCheck} label="Sold Players" value={String(sold)} />
        <StatCard icon={Trophy} label="Unsold" value={String(unsold)} />
        <StatCard icon={IndianRupee} label="Budget Distributed" value={formatCurrency(distributed)} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Budget Remaining</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {teams.map((team) => (
              <div key={team.id}>
                <div className="mb-1 flex justify-between text-sm"><span>{team.shortName}</span><b>{formatCurrency(team.budget - team.budgetUsed)}</b></div>
                <div className="h-3 rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${((team.budget - team.budgetUsed) / team.budget) * 100}%`, backgroundColor: team.color }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader><CardContent><ActivityFeed /></CardContent></Card>
      </div>
    </>
  );
}
