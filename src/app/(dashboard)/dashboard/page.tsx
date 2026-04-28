import { IndianRupee, Trophy, Users, Zap } from "lucide-react";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { players, teams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const sold = players.filter((player) => player.status === "SOLD").length;
  const spent = teams.reduce((sum, team) => sum + team.budgetUsed, 0);

  return (
    <>
      <PageHeader title="Dashboard" description="Live tournament status, budget movement, and auction operations." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total Players" value={String(players.length)} />
        <StatCard icon={Trophy} label="Sold Players" value={String(sold)} />
        <StatCard icon={IndianRupee} label="Budget Spent" value={formatCurrency(spent)} />
        <StatCard icon={Zap} label="Auction Status" value="Live" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent><QuickActions /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Bids</CardTitle></CardHeader>
          <CardContent><ActivityFeed /></CardContent>
        </Card>
      </div>
    </>
  );
}
