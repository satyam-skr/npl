import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-4 py-20 text-center">
      <h2 className="text-3xl font-black">Ready to Build Your Dream Team?</h2>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" variant="gradient"><Link href="/register?role=MANAGER">Team Manager</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/register?role=AUCTIONEER">Auctioneer</Link></Button>
      </div>
    </section>
  );
}
