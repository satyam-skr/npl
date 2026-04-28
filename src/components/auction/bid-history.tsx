import { BidStatusBadge } from "@/components/auction/bid-status-badge";
import { bids } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function BidHistory() {
  return (
    <div className="space-y-3">
      {bids.map((bid) => (
        <div key={bid.id} className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm">
          <div><p className="font-semibold">{bid.team}</p><p className="text-xs text-muted-foreground">{bid.createdAt}</p></div>
          <div className="text-right"><p className="font-black">{formatCurrency(bid.amount)}</p><BidStatusBadge status={bid.status} /></div>
        </div>
      ))}
    </div>
  );
}
