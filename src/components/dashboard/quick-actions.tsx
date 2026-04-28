import Link from "next/link";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="gradient"><Link href="/auction">Open Auction Room</Link></Button>
      <Button asChild variant="outline"><Link href="/admin/players">Manage Players</Link></Button>
      <Button asChild variant="outline"><Link href="/teams">View Teams</Link></Button>
    </div>
  );
}
