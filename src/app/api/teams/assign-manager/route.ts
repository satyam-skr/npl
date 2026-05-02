import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Only ADMIN can assign managers
    if (!session?.user || session.user.role !== "ADMIN") {
      return Response.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { userId, teamId } = body;

    if (!userId || !teamId) {
      return Response.json(
        { error: "Missing required fields: userId, teamId" },
        { status: 400 }
      );
    }

    // Verify user exists and is a MANAGER
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "MANAGER") {
      return Response.json(
        { error: "User must have MANAGER role to manage a team" },
        { status: 400 }
      );
    }

    // Verify team exists
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return Response.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }

    // Check if team already has a manager
    if (team.managerId) {
      return Response.json(
        { error: "Team already has a manager. Unassign first." },
        { status: 409 }
      );
    }

    // Check if user is already managing another team
    const existingTeam = await prisma.team.findFirst({
      where: { managerId: userId },
    });

    if (existingTeam) {
      return Response.json(
        { error: `User is already managing ${existingTeam.name}` },
        { status: 409 }
      );
    }

    // Assign manager to team
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: { managerId: userId },
      include: { manager: true },
    });

    return Response.json({
      success: true,
      team: {
        id: updatedTeam.id,
        name: updatedTeam.name,
        managerId: updatedTeam.managerId,
        manager: updatedTeam.manager ? {
          id: updatedTeam.manager.id,
          name: updatedTeam.manager.name,
          email: updatedTeam.manager.email,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error assigning manager:", error);
    return Response.json(
      { error: "Failed to assign manager" },
      { status: 500 }
    );
  }
}
