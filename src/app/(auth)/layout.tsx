import Link from "next/link";
import { Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_520px]">
      <section className="relative hidden overflow-hidden bg-[linear-gradient(135deg,#4E3B00_0%,#0D0800_100%)] p-10 text-white lg:block">
        <Link href="/" className="relative z-10 flex items-center gap-2 font-black">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Trophy className="h-5 w-5" /></span>
          NPL Auction
        </Link>
        <div className="absolute left-20 top-1/3 h-64 w-16 rotate-45 rounded-full bg-[#C66A1C] shadow-2xl" />
        <div className="absolute left-64 top-1/2 h-28 w-28 rounded-full border-8 border-[#FFB300] bg-[#C62828]" />
        <div className="relative z-10 mt-28 max-w-lg">
          <h1 className="text-5xl font-black leading-tight">Strategy starts before the toss.</h1>
          <p className="mt-5 text-lg text-white/70">Sign in to manage bids, budgets, players, and the live auction floor.</p>
        </div>
      </section>
      <section className="flex min-h-screen flex-col bg-background">
        <div className="flex justify-between p-4 lg:justify-end">
          <Link href="/" className="font-black lg:hidden">NPL Auction</Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-10">{children}</div>
      </section>
    </main>
  );
}
