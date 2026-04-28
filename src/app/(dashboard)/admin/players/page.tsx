import { Plus, Trash2 } from "lucide-react";
import { PlayerUploadForm } from "@/components/players/player-upload-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { players } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function ManagePlayersPage() {
  return (
    <>
      <PageHeader title="Manage Players" description="CRUD table, upload form, and bulk actions for the player pool." />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader className="flex-row items-center justify-between"><CardTitle>Player Inventory</CardTitle><Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /> Bulk Delete</Button></CardHeader>
          <CardContent className="overflow-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-secondary text-left"><tr><th className="p-3">Name</th><th>Skill</th><th>Status</th><th>Base</th><th>Year</th></tr></thead>
              <tbody>{players.map((player) => <tr key={player.id} className="border-t"><td className="p-3 font-semibold">{player.name}</td><td>{player.skillType}</td><td>{player.status}</td><td>{formatCurrency(player.basePrice)}</td><td>{player.year}</td></tr>)}</tbody>
            </table>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle><Plus className="mr-2 inline h-4 w-4" /> Add Player</CardTitle></CardHeader><CardContent><PlayerUploadForm /></CardContent></Card>
      </div>
    </>
  );
}
