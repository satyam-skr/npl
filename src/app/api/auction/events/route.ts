import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { auctionItem as fallbackAuctionItem } from "@/lib/mock-data";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session && process.env.NODE_ENV !== "development") return new Response("Unauthorized", { status: 401 });

  const encoder = new TextEncoder();
  let intervalId: NodeJS.Timeout;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      async function sendState() {
        if (closed) return;
        try {
          let item: unknown = fallbackAuctionItem;
          if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("postgres:postgres")) {
            item = await prisma.auctionItem.findFirst({
              where: { isActive: true },
              include: { player: true, bids: { orderBy: { createdAt: "desc" }, take: 10, include: { team: true, user: true } } },
            });
          }
          const data = JSON.stringify({ type: "STATE_UPDATE", payload: item ?? fallbackAuctionItem, timestamp: new Date().toISOString() });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch {
          const data = JSON.stringify({ type: "STATE_UPDATE", payload: fallbackAuctionItem, timestamp: new Date().toISOString() });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
      }
      intervalId = setInterval(sendState, 3000);
      sendState();
    },
    cancel() {
      closed = true;
      clearInterval(intervalId);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
