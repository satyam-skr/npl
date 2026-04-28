import prisma from "@/lib/prisma";

export async function GET() {
  const teams = await prisma.team.findMany({ include: { manager: true, players: true }, orderBy: { name: "asc" } });
  return Response.json(teams);
}
