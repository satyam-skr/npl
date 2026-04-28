import prisma from "@/lib/prisma";

export async function GET() {
  const sessions = await prisma.auctionSession.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });
  return Response.json(sessions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const session = await prisma.auctionSession.create({ data: { name: body.name ?? "NPL Auction 2025" } });
  return Response.json(session, { status: 201 });
}
