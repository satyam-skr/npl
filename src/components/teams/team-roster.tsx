import { players } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function TeamRoster({ teamId }: { teamId: string }) {
  const roster = players.filter((player) => player.teamId === teamId);
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left"><tr><th className="p-3">Player</th><th>Skill</th><th>Price</th></tr></thead>
        <tbody>
          {roster.map((player) => (
            <tr key={player.id} className="border-t"><td className="p-3 font-medium">{player.name}</td><td>{player.skillType}</td><td>{formatCurrency(player.soldPrice)}</td></tr>
          ))}
          {!roster.length ? <tr><td className="p-4 text-muted-foreground" colSpan={3}>No players bought yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}
