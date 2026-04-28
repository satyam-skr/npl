import Link from "next/link";
import { Gavel, LayoutDashboard, LogOut, Shield, Trophy, User, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/auction", label: "Live Auction", icon: Zap, live: true },
  { href: "/players", label: "Players", icon: Users },
  { href: "/teams", label: "Teams", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

const adminNav = [
  { href: "/admin", label: "Admin Panel", icon: Shield },
  { href: "/admin/players", label: "Manage Players", icon: Users },
  { href: "/admin/users", label: "Manage Users", icon: User },
  { href: "/admin/auction", label: "Auction Control", icon: Gavel },
];

export function Sidebar({
  user,
}: {
  user?: { name?: string | null; email?: string | null; role?: string | null };
}) {
  const isAdmin = user?.role === "ADMIN" || user?.role === "AUCTIONEER";

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-card p-4 lg:block">
      <Link href="/dashboard" className="flex items-center gap-2 font-black">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Trophy className="h-5 w-5" />
        </span>
        NPL Auction
      </Link>
      <div className="mt-6 rounded-lg border bg-background p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold">
          {(user?.name ?? user?.email ?? "U").slice(0, 1).toUpperCase()}
        </div>
        <p className="mt-3 truncate text-sm font-semibold">{user?.name ?? "NPL User"}</p>
        <Badge className="mt-2" variant="secondary">{user?.role ?? "VIEWER"}</Badge>
      </div>
      <nav className="mt-6 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground")}
            >
              <span className="flex items-center gap-3"><Icon className="h-4 w-4" /> {item.label}</span>
              {item.live ? <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,.8)]" /> : null}
            </Link>
          );
        })}
      </nav>
      {isAdmin ? (
        <>
          <Separator className="my-5" />
          <p className="px-3 text-xs font-bold uppercase text-muted-foreground">Admin</p>
          <nav className="mt-2 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"><Icon className="h-4 w-4" /> {item.label}</Link>;
            })}
          </nav>
        </>
      ) : null}
      <div className="mt-8">
        <Button variant="outline" className="w-full justify-start"><LogOut className="h-4 w-4" /> Sign out</Button>
      </div>
    </aside>
  );
}
