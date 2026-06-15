import { motion } from "framer-motion";
import { Target, Eye, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import { TIMELINE_JOURNEY, CORE_VALUES } from "@/data/site";

const TEAM = [
  { name: "Rajat Kulkarni", role: "Managing Director", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" },
  { name: "Anita Deshmukh", role: "Head of Operations", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" },
  { name: "Vikram Patil", role: "Head of QA", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600" },
  { name: "Priya Joshi", role: "Head of Sales", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" },
];

export default function About() {
  return (
    <div data-testid="about-page" className="pt-24 pb-24">
      {/* Intro */}
      <section className="container-pad pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[#ff6b00] mb-4">About Lombodaran</div>
          <h1 className="display text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
            Packaging is more than a product. <br />
            It's a <span className="text-[#ff6b00]">promise.</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mb-5">
            Since 2017, Lombodaran has manufactured premium flexible packaging from Pune for India's most exciting consumer brands. Today we operate a 50,000 sq ft facility with 10+ production machines, an in-house QA lab and a 70+ strong team.
          </p>
          <p className="text-white/65 leading-relaxed">
            We obsess over barrier, finish and shelf appeal — so your brand looks and performs at its best, every single time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-[3/4] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=900" alt="factory" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[3/4] overflow-hidden mt-8">
            <img src="https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=900" alt="machines" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="container-pad py-16">
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-8" data-testid="mission-card">
            <Target className="w-8 h-8 text-[#ff6b00] mb-4" />
            <h3 className="display text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-white/60 leading-relaxed">
              To engineer flexible packaging that protects products, elevates brands and reduces environmental impact — while delivering on time, every time.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-8" data-testid="vision-card">
            <Eye className="w-8 h-8 text-[#ff6b00] mb-4" />
            <h3 className="display text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-white/60 leading-relaxed">
              To be India's most trusted flexible packaging partner — recognized for premium quality, design and sustainability leadership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey */}
      <section className="container-pad py-16">
        <SectionHeader eyebrow="Our journey" title="Eight years. One obsession: packaging." />
        <div className="relative pl-8 md:pl-0">
          <div className="absolute md:left-1/2 left-3 top-2 bottom-2 w-px bg-white/10" />
          {TIMELINE_JOURNEY.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative mb-10 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "" : "md:[&>div:first-child]:order-2"}`}
              data-testid={`journey-${t.year}`}
            >
              <div className={`glass p-6 md:max-w-md ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                <div className="display text-3xl font-bold text-[#ff6b00] mb-1">{t.year}</div>
                <div className="display text-lg font-bold mb-2">{t.title}</div>
                <div className="text-sm text-white/60">{t.desc}</div>
              </div>
              <span className="absolute md:left-1/2 left-3 top-6 -translate-x-1/2 w-3 h-3 bg-[#ff6b00] rounded-full ring-4 ring-[#050816]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-pad py-16">
        <SectionHeader eyebrow="Core values" title="What we stand for." />
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CORE_VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-t border-white/10 pt-5 hover:border-[#ff6b00] transition-colors"
              data-testid={`value-${v.title.toLowerCase()}`}
            >
              <div className="display text-xs uppercase tracking-widest text-[#ff6b00] mb-3">0{i + 1}</div>
              <div className="display text-lg font-bold mb-2">{v.title}</div>
              <div className="text-xs text-white/55">{v.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-pad py-16">
        <SectionHeader eyebrow="Leadership" title="The team behind Lombodaran." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEAM.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group" data-testid={`team-${i}`}>
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad py-16">
        <div className="glass-strong p-10 md:p-14 text-center">
          <h3 className="display text-3xl md:text-4xl font-bold mb-4">Let's build your next launch together.</h3>
          <p className="text-white/55 max-w-xl mx-auto mb-7">From brief to dispatch — we're with you at every step.</p>
          <Link to="/quote" className="btn-primary" data-testid="about-cta">Start a project <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  );
}
