import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { BudgetMeter } from "@/components/teams/budget-meter";
import { TeamRoster } from "@/components/teams/team-roster";
import { teams } from "@/lib/mock-data";

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = teams.find((item) => item.id === id);
  if (!team) notFound();

  return (
    <>
      <PageHeader title={team.name} description={`Managed by ${team.manager}`} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <TeamRoster teamId={team.id} />
        <Card><CardHeader><CardTitle>Budget</CardTitle></CardHeader><CardContent><BudgetMeter budget={team.budget} used={team.budgetUsed} /></CardContent></Card>
      </div>
    </>
  );
}
