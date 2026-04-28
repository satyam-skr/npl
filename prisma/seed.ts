import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const TEAMS = [
  { name: "Nagpur Ninjas", shortName: "NN", color: "#E53935", budget: 100000 },
  { name: "Phoenix Strikers", shortName: "PS", color: "#8E24AA", budget: 100000 },
  { name: "Titan Blazers", shortName: "TB", color: "#1E88E5", budget: 100000 },
  { name: "Eagle Warriors", shortName: "EW", color: "#43A047", budget: 100000 },
];

const PLAYERS = [
  { name: "Arjun Sharma", skillType: "BATTING", battingLevel: "EXPERT", basePrice: 20000, jerseyNumber: 7, year: 3, stats: { matches: 45, runs: 1823, average: 42.4, strikeRate: 138.5 } },
  { name: "Rohit Kulkarni", skillType: "BATTING", battingLevel: "ADVANCED", basePrice: 15000, jerseyNumber: 18, year: 2 },
  { name: "Vivek Patil", skillType: "BATTING", battingLevel: "INTERMEDIATE", basePrice: 10000, jerseyNumber: 3, year: 1 },
  { name: "Siddharth Nair", skillType: "BATTING", battingLevel: "ADVANCED", basePrice: 15000, jerseyNumber: 11, year: 4 },
  { name: "Manish Tiwari", skillType: "BATTING", battingLevel: "BEGINNER", basePrice: 5000, jerseyNumber: 22, year: 1 },
  { name: "Deepak Joshi", skillType: "BATTING", battingLevel: "EXPERT", basePrice: 20000, jerseyNumber: 45, year: 4 },
  { name: "Karan Desai", skillType: "BOWLING", bowlingLevel: "EXPERT", basePrice: 18000, jerseyNumber: 9, year: 3 },
  { name: "Aditya Rao", skillType: "BOWLING", bowlingLevel: "ADVANCED", basePrice: 13000, jerseyNumber: 33, year: 2 },
  { name: "Pranav Mehta", skillType: "BOWLING", bowlingLevel: "INTERMEDIATE", basePrice: 8000, jerseyNumber: 14, year: 1 },
  { name: "Suresh Gupta", skillType: "BOWLING", bowlingLevel: "ADVANCED", basePrice: 13000, jerseyNumber: 27, year: 3 },
  { name: "Vikas Chandra", skillType: "BOWLING", bowlingLevel: "BEGINNER", basePrice: 5000, jerseyNumber: 6, year: 1 },
  { name: "Nikhil Verma", skillType: "BOWLING", bowlingLevel: "EXPERT", basePrice: 18000, jerseyNumber: 55, year: 4 },
  { name: "Rahul Singh", skillType: "ALL_ROUNDER", battingLevel: "ADVANCED", bowlingLevel: "ADVANCED", basePrice: 25000, jerseyNumber: 1, year: 4 },
  { name: "Aman Dubey", skillType: "ALL_ROUNDER", battingLevel: "INTERMEDIATE", bowlingLevel: "ADVANCED", basePrice: 18000, jerseyNumber: 10, year: 3 },
  { name: "Chirag Patel", skillType: "ALL_ROUNDER", battingLevel: "ADVANCED", bowlingLevel: "INTERMEDIATE", basePrice: 15000, jerseyNumber: 99, year: 2 },
  { name: "Saurabh Mishra", skillType: "ALL_ROUNDER", battingLevel: "EXPERT", bowlingLevel: "ADVANCED", basePrice: 28000, jerseyNumber: 77, year: 4 },
  { name: "Tarun Kapoor", skillType: "ALL_ROUNDER", battingLevel: "BEGINNER", bowlingLevel: "INTERMEDIATE", basePrice: 7000, jerseyNumber: 42, year: 1 },
  { name: "Dev Menon", skillType: "ALL_ROUNDER", battingLevel: "ADVANCED", bowlingLevel: "ADVANCED", basePrice: 20000, jerseyNumber: 8, year: 3 },
  { name: "Harish Kumar", skillType: "BATTING", battingLevel: "ADVANCED", basePrice: 12000, jerseyNumber: 16, year: 2 },
  { name: "Sameer Bhatia", skillType: "BOWLING", bowlingLevel: "ADVANCED", basePrice: 12000, jerseyNumber: 29, year: 2 },
  { name: "Lokesh Choudhary", skillType: "BATTING", battingLevel: "EXPERT", basePrice: 22000, jerseyNumber: 5, year: 4 },
  { name: "Girish Pandey", skillType: "BOWLING", bowlingLevel: "EXPERT", basePrice: 20000, jerseyNumber: 38, year: 3 },
  { name: "Ashwin Rajan", skillType: "ALL_ROUNDER", battingLevel: "INTERMEDIATE", bowlingLevel: "INTERMEDIATE", basePrice: 10000, jerseyNumber: 71, year: 2 },
  { name: "Madhav Shukla", skillType: "BATTING", battingLevel: "INTERMEDIATE", basePrice: 8000, jerseyNumber: 19, year: 1 },
] as const;

async function main() {
  console.log("Seeding NPL database...");
  await prisma.bid.deleteMany();
  await prisma.auctionItem.deleteMany();
  await prisma.auctionSession.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  for (const team of TEAMS) await prisma.team.create({ data: team });
  for (const player of PLAYERS) {
    await prisma.player.create({
      data: {
        ...player,
        skillType: player.skillType,
        battingLevel: "battingLevel" in player ? player.battingLevel : undefined,
        bowlingLevel: "bowlingLevel" in player ? player.bowlingLevel : undefined,
        stats: "stats" in player ? player.stats : undefined,
      },
    });
  }

  const session = await prisma.auctionSession.create({ data: { name: "NPL Auction 2025", status: "UPCOMING" } });
  const players = await prisma.player.findMany({ orderBy: { basePrice: "desc" } });
  for (let i = 0; i < players.length; i++) {
    await prisma.auctionItem.create({ data: { sessionId: session.id, playerId: players[i].id, order: i + 1 } });
  }
  console.log("Seeding complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(() => prisma.$disconnect());
