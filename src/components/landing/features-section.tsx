"use client";

import { BarChart3, Gauge, Radio, ShieldCheck, Smartphone, Users } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Real-Time Bidding", description: "Live SSE updates keep every bidder synced without refreshing.", icon: Radio, className: "md:col-span-2" },
  { title: "Player Profiles", description: "Rich stats, skill ratings, photos, and base price context.", icon: Users },
  { title: "Team Rosters", description: "Budget tracking and squad composition at a glance.", icon: ShieldCheck },
  { title: "Auctioneer Control", description: "Accept, reject, pass, pause, and pace the auction.", icon: Gauge },
  { title: "Live Analytics", description: "Budget split, player distribution, and activity trends.", icon: BarChart3, className: "md:col-span-2" },
  { title: "Mobile-First", description: "Responsive bidding controls for every screen size.", icon: Smartphone },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black">Auction Command Center</h2>
        <p className="mt-2 text-muted-foreground">Everything the auctioneer, managers, and viewers need on match day.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} whileHover={{ y: -4 }} className={feature.className}>
              <Card className="h-full transition hover:shadow-gold-lg">
                <CardHeader>
                  <motion.div whileHover={{ rotate: 10 }} className="mb-3 grid h-11 w-11 place-items-center rounded-lg bg-[linear-gradient(135deg,#FFB300_0%,#FF6F00_100%)] text-[#1A0F00]">
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{feature.description}</CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
