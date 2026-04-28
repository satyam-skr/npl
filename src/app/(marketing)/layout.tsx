import Link from "next/link";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Trophy className="h-5 w-5" />
            </span>
            NPL Auction
          </Link>
          <div className="flex items-center gap-2">
            <Link className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex" href="/about">About</Link>
            <ThemeToggle />
            <Button asChild variant="gradient" size="sm"><Link href="/login">Sign in</Link></Button>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
