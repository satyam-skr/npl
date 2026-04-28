import { AuctionTicker } from "@/components/auction/auction-ticker";
import { BidControls } from "@/components/auction/bid-controls";
import { BidHistory } from "@/components/auction/bid-history";
import { PlayerSpotlight } from "@/components/auction/player-spotlight";
import { BudgetMeter } from "@/components/teams/budget-meter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teams } from "@/lib/mock-data";

export function AuctionRoom() {
  return (
    <div className="space-y-5">
      <AuctionTicker />
      <div className="grid gap-5 xl:grid-cols-[1fr_460px]">
        <PlayerSpotlight />
        <BidControls />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teams.map((team) => (
          <Card key={team.id}>
            <div className="h-1.5" style={{ backgroundColor: team.color }} />
            <CardHeader><CardTitle className="text-base">{team.name}</CardTitle></CardHeader>
            <CardContent><BudgetMeter budget={team.budget} used={team.budgetUsed} /></CardContent>
          </Card>
        ))}
      </div>
      <Card><CardHeader><CardTitle>Bid History</CardTitle></CardHeader><CardContent><BidHistory /></CardContent></Card>
    </div>
  );
}
