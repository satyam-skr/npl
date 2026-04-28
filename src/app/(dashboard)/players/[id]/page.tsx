import { notFound } from "next/navigation";
import { PlayerSkillsBadge } from "@/components/players/player-skills-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { players } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = players.find((item) => item.id === id);
  if (!player) notFound();

  return (
    <>
      <PageHeader title={player.name} description={`Jersey #${player.jerseyNumber} - ${player.year ?? "-"} year`} />
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card><div className="aspect-square bg-secondary" /><CardContent className="p-5"><Badge>{player.status}</Badge><div className="mt-4"><PlayerSkillsBadge skillType={player.skillType} battingLevel={player.battingLevel} bowlingLevel={player.bowlingLevel} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Player Value</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-primary">{formatCurrency(player.basePrice)}</p><pre className="mt-5 overflow-auto rounded-lg bg-muted p-4 text-xs">{JSON.stringify(player.stats, null, 2)}</pre></CardContent></Card>
      </div>
    </>
  );
}
