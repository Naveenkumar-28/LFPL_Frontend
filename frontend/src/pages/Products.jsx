import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, ShieldCheck, Cog, Sparkles, Truck,
  FileDown, Download, Layers,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES } from "@/data/categories";

const FEATURES = [
  { icon: ShieldCheck, title: "Premium Quality Assured", desc: "ISO 9001 + FSSAI compliant testing at every stage." },
  { icon: Cog, title: "Advanced Technology", desc: "10-colour rotogravure & solvent-less lamination." },
  { icon: Sparkles, title: "Custom Solutions", desc: "Bespoke structures, finishes and dielines." },
  { icon: Truck, title: "Timely Delivery", desc: "On-time pan-India dispatch, every time." },
];

export default function Products() {
  return (
    <div data-testid="products-page" className="pt-[72px]">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(28)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.15, 0.55, 0.15],
                y: [0, -30, 0],
                x: [0, (i % 2 ? 14 : -14), 0],
              }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                background: i % 3 === 0 ? "#ff6b00" : "rgba(120, 180, 255, 0.55)",
                boxShadow: i % 3 === 0 ? "0 0 8px #ff6b00" : "0 0 8px rgba(120,180,255,0.4)",
              }}
            />
          ))}
        </div>

        {/* light effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#1e3a8a] opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#ff6b00] opacity-15 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <div className="container-pad relative grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs uppercase tracking-widest text-white/70 mb-8"
              data-testid="products-hero-badge"
            >
              <Layers className="w-3.5 h-3.5 text-[#ff6b00]" />
              Catalogue 2026 · 6 categories · 60+ SKUs
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight"
            >
              Our <span className="text-[#ff6b00]">Products</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/65 text-lg mt-7 max-w-xl leading-relaxed"
            >
              Innovative packaging solutions engineered with precision, quality &amp; performance — across rolls, stand-up pouches, spout pouches and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link to="/quote" className="btn-primary" data-testid="hero-request-catalogue-btn">
                Request Catalogue <FileDown className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-secondary" data-testid="hero-download-brochure-btn">
                Download Brochure <Download className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: 3D-ish floating roll mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] md:h-[560px]"
            data-testid="hero-3d-mockup"
          >
            <motion.div
              animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="relative w-[80%] aspect-square">
                <div className="absolute inset-0 rounded-full bg-[#ff6b00] opacity-25 blur-3xl" />
                <div className="absolute inset-0 rounded-full bg-[#1e3a8a] opacity-20 blur-3xl translate-x-8 translate-y-8" />
                <img
                  src="https://images.unsplash.com/photo-1607082352121-fa243f3dde32?auto=format&fit=crop&q=80&w=1200"
                  alt="packaging roll"
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl shadow-[#ff6b00]/30 border border-white/10"
                  style={{ transform: "perspective(900px) rotateY(-12deg) rotateX(8deg)" }}
                />
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-4 glass-strong px-4 py-3 hidden md:block"
            >
              <div className="text-[10px] uppercase tracking-widest text-white/50">Rotogravure</div>
              <div className="text-sm font-bold mt-1">10-colour print</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 left-2 glass-strong px-4 py-3 hidden md:block"
            >
              <div className="text-[10px] uppercase tracking-widest text-white/50">Barrier</div>
              <div className="text-sm font-bold mt-1 text-[#ff6b00]">High OTR + WVTR</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="section-pad">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Categories"
            title="Six categories. Endless possibilities."
            subtitle="Explore Lombodaran's complete packaging range — engineered for every shelf, every brand and every budget."
            testid="categories-header"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                data-testid={`category-card-${c.id}`}
                className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-[#ff6b00] transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="display text-xl md:text-2xl font-bold mb-2 group-hover:text-[#ff6b00] transition-colors">{c.name}</h3>
                  <p className="text-sm text-white/55 line-clamp-2 mb-6 min-h-[2.5rem]">{c.short}</p>
                  <Link
                    to={`/products/${c.id}`}
                    data-testid={`category-explore-${c.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold border-b border-[#ff6b00] pb-1 hover:gap-3 transition-all"
                  >
                    Explore <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="container-pad py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass p-6 group hover:border-[#ff6b00]/50 transition-colors relative overflow-hidden"
              data-testid={`feature-bar-${i}`}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#ff6b00] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
              <div className="w-12 h-12 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/30 mb-5 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors shadow-[0_0_24px_rgba(255,107,0,0.25)]">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="display text-base font-bold mb-2">{f.title}</h3>
              <p className="text-xs text-white/55 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad py-20">
        <div className="relative overflow-hidden glass-strong p-10 md:p-16">
          {/* animated wave gradient */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(120deg, #ff6b00 0%, #1e3a8a 25%, #050816 50%, #1e3a8a 75%, #ff6b00 100%)",
              backgroundSize: "300% 300%",
            }}
          />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-4">Talk to us</div>
              <h2 className="display text-3xl md:text-5xl font-bold leading-tight">
                Looking for the right packaging solution<br />
                for your <span className="text-[#ff6b00]">brand?</span>
              </h2>
            </div>
            <div className="flex md:justify-end">
              <Link to="/contact" className="btn-primary text-base" data-testid="cta-talk-experts">
                Talk to our experts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
