import prisma from "@/lib/prisma";
import { playerSchema } from "@/lib/validations";

export async function GET() {
  const players = await prisma.player.findMany({ include: { team: true }, orderBy: { basePrice: "desc" } });
  return Response.json(players);
}

export async function POST(req: Request) {
  const parsed = playerSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: "Invalid player payload" }, { status: 400 });
  const player = await prisma.player.create({ data: parsed.data });
  return Response.json(player, { status: 201 });
}
