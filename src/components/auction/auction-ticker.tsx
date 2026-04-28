import { bids } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function AuctionTicker() {
  const items = [...bids, ...bids];
  return (
    <div className="overflow-hidden rounded-lg border bg-card py-3">
      <div className="marquee-inner flex w-max gap-8 px-4">
        {items.map((bid, index) => <span key={`${bid.id}-${index}`} className="text-sm"><b>{bid.team}</b> bid <b className="text-primary">{formatCurrency(bid.amount)}</b></span>)}
      </div>
    </div>
  );
}
