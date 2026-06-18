import {
  Coffee, Leaf, Sparkles, Heart, Pill, Crown, Flame, Apple, Droplets, Sun, Gem, Snowflake,
} from "lucide-react";

const CLIENTS = [
  { name: "AromaBrew", icon: Coffee },
  { name: "PureLeaf", icon: Leaf },
  { name: "Glow & Co", icon: Sparkles },
  { name: "Wellnest", icon: Heart },
  { name: "MediCore", icon: Pill },
  { name: "Royal Spice", icon: Crown },
  { name: "Spicefire", icon: Flame },
  { name: "Orchard Co", icon: Apple },
  { name: "Hydra Drink", icon: Droplets },
  { name: "SunCrisp", icon: Sun },
  { name: "Lux Beauty", icon: Gem },
  { name: "FrostBite", icon: Snowflake },
];

function Row({ reverse = false }) {
  // Duplicate logos twice for seamless infinite loop
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="overflow-hidden relative group">
      {/* edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#050816] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#050816] to-transparent pointer-events-none" />

      <div
        className={`flex gap-4 md:gap-6 w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {items.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={`${c.name}-${i}`}
              data-testid={`client-${c.name.toLowerCase().replace(/\s+/g, "-")}-${i}`}
              className="shrink-0 flex items-center gap-3 px-6 md:px-8 py-5 border border-white/[0.06] bg-white/[0.02] hover:border-[#ff6b00]/40 hover:bg-white/[0.04] transition-colors min-w-[200px] md:min-w-[240px]"
            >
              <span className="w-9 h-9 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 shrink-0">
                <Icon className="w-4 h-4" />
              </span>
              <span className="display text-base md:text-lg font-bold tracking-tight whitespace-nowrap text-white/85">
                {c.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ClientsMarquee() {
  return (
    <section className="section-pad relative" data-testid="clients-section">
      <div className="container-pad mb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-[#ff6b00] mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-[#ff6b00]" />
          Our Clients
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-4xl md:text-5xl font-bold leading-[1.05]">
            Trusted by <span className="text-[#ff6b00]">100+ brands</span> across India.
          </h2>
          <p className="text-white/55 text-sm md:text-base max-w-md">
            From homegrown startups to global FMCG giants — Lombodaran packages it all.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
