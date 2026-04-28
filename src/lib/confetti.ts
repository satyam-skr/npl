"use client";

import confetti from "canvas-confetti";

export function celebrateBid(teamColor: string) {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#FFB300", "#FF6F00", teamColor, "#FFFFFF"],
    startVelocity: 45,
  });
}
