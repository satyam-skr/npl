import Link from "next/link";
import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PlayerSkillsBadge } from "@/components/players/player-skills-badge";
import { formatCurrency } from "@/lib/utils";
import type { Player } from "@/types/player";

const statusVariant = {
  AVAILABLE: "success",
  ON_AUCTION: "warning",
  SOLD: "default",
  UNSOLD: "outline",
} as const;

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link href={`/players/${player.id}`}>
      <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-gold">
        <div className="grid aspect-[4/3] place-items-center bg-[linear-gradient(135deg,#FFF3E0_0%,#FFE0B2_100%)] text-[#7C4D00] dark:bg-secondary">
          <UserRound className="h-16 w-16" />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Jersey #{player.jerseyNumber ?? "--"}</p>
              <h3 className="mt-1 font-black">{player.name}</h3>
            </div>
            <Badge variant={statusVariant[player.status]}>{player.status.replace("_", " ")}</Badge>
          </div>
          <div className="mt-4"><PlayerSkillsBadge skillType={player.skillType} battingLevel={player.battingLevel} bowlingLevel={player.bowlingLevel} /></div>
          <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
            <span className="text-muted-foreground">Base</span>
            <span className="font-bold">{formatCurrency(player.basePrice)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
