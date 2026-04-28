"use client";

import { useEffect, useState } from "react";

export function CountdownTimer({ seconds = 30 }: { seconds?: number }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((value) => (value <= 0 ? seconds : value - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  return <div className="rounded-lg bg-secondary px-3 py-2 text-sm font-bold">{left}s</div>;
}
