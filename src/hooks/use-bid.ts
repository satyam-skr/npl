"use client";

import { toast } from "sonner";

export function useBid() {
  async function placeBid(auctionItemId: string, amount: number) {
    const response = await fetch("/api/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auctionItemId, amount }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Unable to place bid");
    toast.info(`Bid of ₹${amount.toLocaleString("en-IN")} placed successfully`);
    return data;
  }

  return { placeBid };
}
