import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-28">
      <h1 className="text-4xl font-black">About NPL Auction</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        NPL Auction is a real-time cricket auction platform for the IIIT Nagpur Premier League, built for fast bidding, clear team budgeting, and a premium event-day experience.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Auctioneer control", "Team dashboards", "Viewer-friendly live room"].map((item) => (
          <Card key={item}><CardHeader><CardTitle>{item}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Designed for college tournament operations with responsive layouts and role-based access.</CardContent></Card>
        ))}
      </div>
    </main>
  );
}
