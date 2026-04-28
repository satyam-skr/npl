import prisma from "@/lib/prisma";
import { playerSchema } from "@/lib/validations";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await prisma.player.findUnique({ where: { id }, include: { team: true, bids: true } });
  if (!player) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(player);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = playerSchema.partial().safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: "Invalid player payload" }, { status: 400 });
  const player = await prisma.player.update({ where: { id }, data: parsed.data });
  return Response.json(player);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.player.delete({ where: { id } });
  return Response.json({ ok: true });
}
