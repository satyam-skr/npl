import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.auctionItem.findUnique({ where: { id }, include: { player: true, bids: { include: { team: true, user: true } } } });
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(item);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (process.env.NODE_ENV !== "development" && role !== "ADMIN" && role !== "AUCTIONEER") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const body = await req.json();

  if (body.action === "REJECT_BID" && body.bidId) {
    const bid = await prisma.bid.update({ where: { id: body.bidId }, data: { status: "REJECTED" } });
    return Response.json({ ok: true, bid });
  }

  if (body.action === "PASS_PLAYER") {
    const item = await prisma.auctionItem.update({ where: { id }, data: { isActive: false, endedAt: new Date(), player: { update: { status: "UNSOLD" } } }, include: { player: true } });
    return Response.json({ ok: true, item });
  }

  if (body.action === "ACCEPT_BID" && body.bidId) {
    const result = await prisma.$transaction(async (tx) => {
      const bid = await tx.bid.update({ where: { id: body.bidId }, data: { status: "ACCEPTED" } });
      await tx.player.update({ where: { id: bid.playerId }, data: { status: "SOLD", teamId: bid.teamId, soldPrice: bid.amount } });
      await tx.team.update({ where: { id: bid.teamId }, data: { budgetUsed: { increment: bid.amount } } });
      await tx.auctionItem.update({ where: { id }, data: { isActive: false, endedAt: new Date() } });
      return bid;
    });
    return Response.json({ ok: true, bid: result });
  }

  return Response.json({ error: "Unsupported action" }, { status: 400 });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.auctionItem.delete({ where: { id } });
  return Response.json({ ok: true });
}
