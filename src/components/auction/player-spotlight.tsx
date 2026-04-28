import { UserRound } from "lucide-react";
import { PlayerSkillsBadge } from "@/components/players/player-skills-badge";
import { Card, CardContent } from "@/components/ui/card";
import { auctionItem } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function PlayerSpotlight() {
  const player = auctionItem.player;
  return (
    <Card className="bid-live overflow-hidden">
      <div className="grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,#FFF3E0_0%,#FFE0B2_100%)] text-[#7C4D00]">
        <UserRound className="h-24 w-24" />
      </div>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">Now auctioning</p>
        <h2 className="mt-1 text-3xl font-black">{player.name}</h2>
        <div className="mt-4"><PlayerSkillsBadge skillType={player.skillType} battingLevel={player.battingLevel} bowlingLevel={player.bowlingLevel} /></div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-secondary p-3"><p className="text-muted-foreground">Base price</p><p className="font-black">{formatCurrency(player.basePrice)}</p></div>
          <div className="rounded-lg bg-secondary p-3"><p className="text-muted-foreground">Jersey</p><p className="font-black">#{player.jerseyNumber}</p></div>
        </div>
      </CardContent>
    </Card>
  );
}
