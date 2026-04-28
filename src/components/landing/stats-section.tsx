import { AnimatedCounter } from "@/components/shared/animated-counter";

export function StatsSection() {
  return (
    <section className="bg-[linear-gradient(135deg,#4E3B00_0%,#7C4D00_100%)] px-4 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Teams competing", 4, ""],
          ["Players available", 24, "+"],
          ["Total budget pool", 100000, ""],
          ["Live updates", 3, "/sec"],
        ].map(([label, value, suffix]) => (
          <div key={label} className="text-center">
            <div className="text-4xl font-black text-[#FFB300]">
              {label === "Total budget pool" ? "₹" : null}<AnimatedCounter value={Number(value)} suffix={String(suffix)} />
            </div>
            <p className="mt-2 text-white/70">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
