import { Badge } from "@/components/ui/badge";

export function BidStatusBadge({ status }: { status: string }) {
  const variant = status === "PENDING" ? "warning" : status === "ACCEPTED" ? "success" : status === "REJECTED" ? "destructive" : "outline";
  return <Badge variant={variant}>{status}</Badge>;
}
