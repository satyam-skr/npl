import { auth } from "@/lib/auth";
import { hashPassword } from "@better-auth/utils/password";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Only ADMIN can create users
    if (!session?.user || session.user.role !== "ADMIN") {
      return Response.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, username, password, role } = body;

    // Validate required fields
    if (!name || !email || !username || !password || !role) {
      return Response.json(
        { error: "Missing required fields: name, email, username, password, role" },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ["ADMIN", "AUCTIONEER", "MANAGER", "VIEWER"];
    if (!validRoles.includes(role)) {
      return Response.json(
        { error: `Invalid role. Allowed: ${validRoles.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return Response.json(
        { error: "User with this email or username already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        displayUsername: username,
        role: role as any,
        emailVerified: true,
        banned: false,
      },
    });

    // Create account with password
    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: hashedPassword,
      },
    });

    return Response.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
