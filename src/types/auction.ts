export type Bid = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  team?: { id: string; name: string; color?: string };
  user?: { id: string; name: string };
};

export type AuctionItem = {
  id: string;
  currentBid: number | null;
  currentTeamId: string | null;
  isActive: boolean;
  player: unknown;
  bids: Bid[];
};
