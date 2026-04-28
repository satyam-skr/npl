"use client";

import { Download, Pause, Play, Square } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { players } from "@/lib/mock-data";

export default function AuctionControlPage() {
  return (
    <>
      <PageHeader title="Auction Control" description="Create sessions, queue players, control pace, and export results." />
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader><CardTitle>Session Controls</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="gradient" onClick={() => toast.info("Auction session started")}><Play className="h-4 w-4" /> Start</Button>
            <Button variant="outline" onClick={() => toast.info("Auction paused")}><Pause className="h-4 w-4" /> Pause</Button>
            <Button variant="destructive" onClick={() => toast.warning("Auction ended")}><Square className="h-4 w-4" /> End</Button>
            <Button variant="outline" onClick={() => toast.success("CSV export queued")}><Download className="h-4 w-4" /> Export Results</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Player Queue</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {players.map((player, index) => <div key={player.id} className="flex items-center justify-between rounded-lg border p-3 text-sm"><span>#{index + 1} {player.name}</span><b>{player.basePrice.toLocaleString("en-IN")}</b></div>)}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
