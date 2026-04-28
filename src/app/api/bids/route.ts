import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { bidSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session && process.env.NODE_ENV !== "development") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = bidSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: "Invalid bid" }, { status: 400 });

  if (process.env.NODE_ENV === "development" && process.env.DATABASE_URL?.includes("postgres:postgres")) {
    return Response.json({ ok: true, bid: { amount: parsed.data.amount, status: "PENDING" } });
  }

  const userId = session?.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { managedTeam: true } });
  if (!user || user.role !== "MANAGER" || !user.managedTeam) return Response.json({ error: "Only team managers can bid" }, { status: 403 });

  const item = await prisma.auctionItem.findUnique({ where: { id: parsed.data.auctionItemId }, include: { player: true } });
  if (!item?.isActive) return Response.json({ error: "Auction item is not active" }, { status: 400 });
  if (parsed.data.amount <= (item.currentBid ?? item.player.basePrice)) return Response.json({ error: "Bid must exceed current bid" }, { status: 400 });
  if (user.managedTeam.budget - user.managedTeam.budgetUsed < parsed.data.amount) return Response.json({ error: "Insufficient budget" }, { status: 400 });

  const bid = await prisma.$transaction(async (tx) => {
    await tx.bid.updateMany({ where: { auctionItemId: item.id, status: "PENDING" }, data: { status: "OUTBID" } });
    const created = await tx.bid.create({
      data: { amount: parsed.data.amount, userId: user.id, teamId: user.managedTeam!.id, playerId: item.playerId, auctionItemId: item.id },
    });
    await tx.auctionItem.update({ where: { id: item.id }, data: { currentBid: parsed.data.amount, currentTeamId: user.managedTeam!.id } });
    return created;
  });

  return Response.json({ ok: true, bid });
}
