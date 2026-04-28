import Link from "next/link";
import { LayoutDashboard, Trophy, Users, Zap } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-card lg:hidden">
      {[
        ["/dashboard", "Home", LayoutDashboard],
        ["/auction", "Auction", Zap],
        ["/players", "Players", Users],
        ["/teams", "Teams", Trophy],
      ].map(([href, label, Icon]) => (
        <Link key={String(href)} href={String(href)} className="flex flex-col items-center gap-1 py-2 text-xs text-muted-foreground">
          <Icon className="h-5 w-5" />
          {String(label)}
        </Link>
      ))}
    </nav>
  );
}
