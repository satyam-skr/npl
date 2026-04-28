"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountdownTimer } from "@/components/auction/countdown-timer";
import { celebrateBid } from "@/lib/confetti";
import { auctionItem, teams } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function BidControls() {
  const [amount, setAmount] = useState((auctionItem.currentBid ?? auctionItem.player.basePrice) + 5000);
  const leading = teams.find((team) => team.id === auctionItem.currentTeamId);

  function quick(increment: number) {
    setAmount((auctionItem.currentBid ?? auctionItem.player.basePrice) + increment);
  }

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current bid</p>
          <p className="flip-number text-4xl font-black text-primary">{formatCurrency(auctionItem.currentBid)}</p>
          <p className="mt-1 text-sm">Leading: <b>{leading?.name ?? "No bids yet"}</b></p>
        </div>
        <CountdownTimer />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[5000, 10000, 25000].map((value) => <Button key={value} type="button" variant="outline" onClick={() => quick(value)}>+{formatCurrency(value)}</Button>)}
      </div>
      <div className="mt-4 flex gap-2">
        <Input type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
        <Button variant="gradient" onClick={() => toast.info(`Bid of ${formatCurrency(amount)} placed successfully`)}>Place Bid</Button>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <Button onClick={() => { celebrateBid(leading?.color ?? "#FFB300"); toast.success("Winning bid accepted"); }}><Check className="h-4 w-4" /> Accept Bid</Button>
        <Button variant="outline" onClick={() => toast.warning("Bid rejected")}><X className="h-4 w-4" /> Reject</Button>
        <Button variant="destructive" onClick={() => toast("Player passed", { description: "Player moved to unsold pool" })}>Pass</Button>
      </div>
    </div>
  );
}
