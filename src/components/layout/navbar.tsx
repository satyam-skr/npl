import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
        <div>
          <p className="text-xs text-muted-foreground">IIIT Nagpur Premier League</p>
          <p className="font-semibold">Auction Console</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" aria-label="Notifications"><Bell className="h-4 w-4" /></Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
