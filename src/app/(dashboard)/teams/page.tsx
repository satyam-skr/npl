import { PageHeader } from "@/components/shared/page-header";
import { TeamCard } from "@/components/teams/team-card";
import { players, teams } from "@/lib/mock-data";

export default function TeamsPage() {
  return (
    <>
      <PageHeader title="Teams" description="Budgets, managers, rosters, and remaining buying power." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teams.map((team) => <TeamCard key={team.id} team={team} count={players.filter((player) => player.teamId === team.id).length} />)}
      </div>
    </>
  );
}
