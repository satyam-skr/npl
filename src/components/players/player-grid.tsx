import { PlayerCard } from "@/components/players/player-card";
import type { Player } from "@/types/player";

export function PlayerGrid({ players }: { players: Player[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {players.map((player) => <PlayerCard key={player.id} player={player} />)}
    </div>
  );
}
