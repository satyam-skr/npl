import type { Player } from "@/types/player";
import type { Team } from "@/types/team";

export const teams: Team[] = [
  { id: "nn", name: "Nagpur Ninjas", shortName: "NN", color: "#E53935", budget: 100000, budgetUsed: 18000, manager: "Aarav Mehta" },
  { id: "ps", name: "Phoenix Strikers", shortName: "PS", color: "#8E24AA", budget: 100000, budgetUsed: 44000, manager: "Isha Rao" },
  { id: "tb", name: "Titan Blazers", shortName: "TB", color: "#1E88E5", budget: 100000, budgetUsed: 9000, manager: "Kabir Sethi" },
  { id: "ew", name: "Eagle Warriors", shortName: "EW", color: "#43A047", budget: 100000, budgetUsed: 32000, manager: "Meera Kulkarni" },
];

export const players: Player[] = [
  { id: "p1", name: "Arjun Sharma", skillType: "BATTING", battingLevel: "EXPERT", bowlingLevel: null, basePrice: 20000, jerseyNumber: 7, year: 3, status: "ON_AUCTION", soldPrice: null, teamId: null, stats: { matches: 45, runs: 1823, average: 42.4, strikeRate: 138.5 } },
  { id: "p2", name: "Rahul Singh", skillType: "ALL_ROUNDER", battingLevel: "ADVANCED", bowlingLevel: "ADVANCED", basePrice: 25000, jerseyNumber: 1, year: 4, status: "SOLD", soldPrice: 44000, teamId: "ps", stats: { matches: 38, runs: 980, wickets: 36, strikeRate: 129.1 } },
  { id: "p3", name: "Karan Desai", skillType: "BOWLING", battingLevel: null, bowlingLevel: "EXPERT", basePrice: 18000, jerseyNumber: 9, year: 3, status: "AVAILABLE", soldPrice: null, teamId: null, stats: { matches: 31, wickets: 52, economy: 6.4 } },
  { id: "p4", name: "Saurabh Mishra", skillType: "ALL_ROUNDER", battingLevel: "EXPERT", bowlingLevel: "ADVANCED", basePrice: 28000, jerseyNumber: 77, year: 4, status: "AVAILABLE", soldPrice: null, teamId: null, stats: { matches: 50, runs: 1504, wickets: 41 } },
  { id: "p5", name: "Aditya Rao", skillType: "BOWLING", battingLevel: null, bowlingLevel: "ADVANCED", basePrice: 13000, jerseyNumber: 33, year: 2, status: "UNSOLD", soldPrice: null, teamId: null, stats: { matches: 18, wickets: 21, economy: 7.2 } },
  { id: "p6", name: "Lokesh Choudhary", skillType: "BATTING", battingLevel: "EXPERT", bowlingLevel: null, basePrice: 22000, jerseyNumber: 5, year: 4, status: "AVAILABLE", soldPrice: null, teamId: null, stats: { matches: 36, runs: 1302, average: 39.4 } },
];

export const bids = [
  { id: "b1", team: "Phoenix Strikers", teamId: "ps", amount: 45000, status: "PENDING", createdAt: "15:32:01" },
  { id: "b2", team: "Nagpur Ninjas", teamId: "nn", amount: 40000, status: "OUTBID", createdAt: "15:31:55" },
  { id: "b3", team: "Eagle Warriors", teamId: "ew", amount: 35000, status: "OUTBID", createdAt: "15:31:41" },
];

export const auctionItem = {
  id: "mock-auction-item",
  currentBid: 45000,
  currentTeamId: "ps",
  isActive: true,
  player: players[0],
  bids,
};
