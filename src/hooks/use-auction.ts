"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuctionStore } from "@/lib/auction-store";

export function useAuction() {
  const store = useAuctionStore();
  const setConnected = useAuctionStore((state) => state.setConnected);
  const setCurrentItem = useAuctionStore((state) => state.setCurrentItem);
  const addBid = useAuctionStore((state) => state.addBid);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/auction/events");
    esRef.current = es;

    es.onopen = () => setConnected(true);
    es.onerror = () => {
      setConnected(false);
      toast.warning("Live auction connection interrupted");
      setTimeout(() => es.close(), 3000);
    };
    es.onmessage = (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);
        if (type === "STATE_UPDATE") {
          setCurrentItem(payload);
          if (payload?.bids?.[0]) addBid(payload.bids[0]);
        }
        if (type === "BID_ACCEPTED") toast.success(`${payload.teamName} won ${payload.playerName}`);
      } catch {}
    };

    return () => es.close();
  }, [addBid, setConnected, setCurrentItem]);

  return store;
}
