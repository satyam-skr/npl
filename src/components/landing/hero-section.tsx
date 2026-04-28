"use client";

import Link from "next/link";
import { ArrowRight, Radio, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const words = ["The", "Ultimate", "Cricket", "Auction", "Experience"];

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0D0800] px-4 pb-16 pt-24 text-white sm:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,179,0,.35),transparent_30%),radial-gradient(circle_at_75%_20%,rgba(255,111,0,.24),transparent_28%),linear-gradient(135deg,#7C4D00_0%,#4E3B00_45%,#0D0800_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:64px_64px]" />
      <motion.div
        className="absolute left-4 top-24 h-16 w-16 rounded-full border-4 border-[#FFB300] bg-[#C62828] shadow-gold sm:left-[8%] sm:top-32 sm:h-20 sm:w-20"
        animate={{ y: [0, 18, 0], rotate: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-24 right-[12%] hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur md:block"
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        Current bid: Rs 45,000
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <Badge variant="warning" className="mb-6 gap-2">
          <Trophy className="h-3.5 w-3.5" />
          IIIT Nagpur Premier League 2025
        </Badge>
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl px-2 text-4xl font-black leading-[0.95] text-[#FFF7E6] drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] sm:text-7xl"
        >
          {words.map((word) => (
            <motion.span key={word} variants={fadeInUp} className="mr-3 inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="mt-6 max-w-3xl text-xl font-bold text-[#FFD54F] sm:text-2xl">
          Bid Bold. Win Big. Build Your Dream Team.
        </motion.p>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          A premium real-time auction platform where strategy meets cricket. 4 teams, unlimited drama.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="gradient">
            <Link href="/register">
              Join the Auction
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" className="glass text-white hover:bg-white/15">
            <Link href="/auction">
              <Radio className="h-4 w-4" />
              View Live Auction
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {["24 Players", "4 Teams", "Live Bidding", "Real-Time Results"].map((stat) => (
            <div key={stat} className="glass rounded-lg px-4 py-3 text-sm font-semibold">
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
