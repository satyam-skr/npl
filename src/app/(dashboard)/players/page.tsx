import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayerGrid } from "@/components/players/player-grid";
import { PageHeader } from "@/components/shared/page-header";
import { players } from "@/lib/mock-data";

export default function PlayersPage() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Players" description="Browse the auction pool, skill profiles, and player statuses." />
        <Button variant="gradient"><Plus className="h-4 w-4" /> Add Player</Button>
      </div>
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        <Input placeholder="Search players" />
        <select className="h-10 rounded-lg border bg-input px-3 text-sm"><option>All skills</option><option>Batting</option><option>Bowling</option><option>All-rounder</option></select>
        <select className="h-10 rounded-lg border bg-input px-3 text-sm"><option>All statuses</option><option>Available</option><option>Sold</option><option>Unsold</option></select>
        <select className="h-10 rounded-lg border bg-input px-3 text-sm"><option>Sort by price</option><option>High to low</option><option>Low to high</option></select>
      </div>
      <PlayerGrid players={players} />
    </>
  );
}
