import { motion } from "framer-motion";
import { Play, Cog, Layers, Package, FlaskConical } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { INFRA_STATS } from "@/data/site";

const UNITS = [
  { icon: Cog, name: "Printing", desc: "10-colour rotogravure presses for high-resolution print." },
  { icon: Layers, name: "Lamination", desc: "Solvent-less and solvent-based multi-layer lamination." },
  { icon: Package, name: "Pouch Making", desc: "Stand-up, center seal, three side seal, spout — all formats." },
  { icon: FlaskConical, name: "QC Lab", desc: "OTR, WVTR, seal strength, bond strength and migration testing." },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1400",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400",
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=1400",
  "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=1400",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=1400",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1400",
];

export default function Infrastructure() {
  return (
    <div data-testid="infrastructure-page" className="pt-24 pb-24">
      {/* Banner */}
      <section className="relative h-[60vh] overflow-hidden flex items-center">
        <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=2200" alt="factory" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#050816]/40 to-[#050816]" />
        <div className="container-pad relative">
          <div className="text-xs uppercase tracking-[0.3em] text-[#ff6b00] mb-4">Infrastructure</div>
          <h1 className="display text-5xl md:text-7xl font-bold leading-[1.05] max-w-3xl">
            A facility engineered for <span className="text-[#ff6b00]">scale</span>.
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="container-pad py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INFRA_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass p-6"
              data-testid={`infra-stat-${i}`}
            >
              <div className="display text-4xl font-bold text-[#ff6b00]">{s.value}</div>
              {s.suffix && <div className="text-sm text-white/50 mt-1">{s.suffix}</div>}
              <div className="text-xs uppercase tracking-widest text-white/50 mt-3">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Units */}
      <section className="container-pad py-16">
        <SectionHeader eyebrow="Manufacturing units" title="Four production wings under one roof." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {UNITS.map((u, i) => (
            <motion.div
              key={u.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass p-6 group hover:border-[#ff6b00]/40"
              data-testid={`unit-${u.name.toLowerCase()}`}
            >
              <div className="w-12 h-12 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] mb-5 border border-[#ff6b00]/20 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                <u.icon className="w-5 h-5" />
              </div>
              <h3 className="display text-lg font-bold mb-2">{u.name}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery masonry */}
      <section className="container-pad py-16">
        <SectionHeader eyebrow="Facility gallery" title="A look inside our plant." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`overflow-hidden ${i === 0 ? "md:row-span-2 md:col-span-2 aspect-square" : "aspect-square"}`}
              data-testid={`infra-img-${i}`}
            >
              <img src={src} alt={`facility ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video section */}
      <section className="container-pad py-16">
        <div className="relative aspect-video overflow-hidden glass-strong group cursor-pointer" data-testid="video-section">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2200" alt="video" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <span className="w-20 h-20 mx-auto rounded-full bg-[#ff6b00] grid place-items-center group-hover:scale-110 transition-transform shadow-2xl shadow-[#ff6b00]/40 mb-6">
                <Play className="w-7 h-7 text-white ml-1" />
              </span>
              <div className="display text-2xl md:text-3xl font-bold">Take a virtual tour</div>
              <div className="text-sm text-white/55 mt-2">3 minutes inside Lombodaran</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
