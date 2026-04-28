import { AuctionRoom } from "@/components/auction/auction-room";
import { PageHeader } from "@/components/shared/page-header";

export default function AuctionPage() {
  return (
    <>
      <PageHeader title="Live Auction" description="Real-time bidding room for the current NPL player auction." />
      <AuctionRoom />
    </>
  );
}
