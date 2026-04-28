import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { AuctionItem, Bid } from "@/types/auction";

interface AuctionState {
  currentItem: AuctionItem | null;
  bids: Bid[];
  teamBudgets: Record<string, number>;
  isConnected: boolean;
  setCurrentItem: (item: AuctionItem | null) => void;
  addBid: (bid: Bid) => void;
  updateBudget: (teamId: string, amount: number) => void;
  setConnected: (connected: boolean) => void;
}

export const useAuctionStore = create<AuctionState>()(
  subscribeWithSelector((set) => ({
    currentItem: null,
    bids: [],
    teamBudgets: {},
    isConnected: false,
    setCurrentItem: (item) => set({ currentItem: item }),
    addBid: (bid) => set((state) => ({ bids: [bid, ...state.bids].slice(0, 50) })),
    updateBudget: (teamId, amount) => set((state) => ({ teamBudgets: { ...state.teamBudgets, [teamId]: amount } })),
    setConnected: (connected) => set({ isConnected: connected }),
  })),
);
