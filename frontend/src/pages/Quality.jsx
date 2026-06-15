import { motion } from "framer-motion";
import { Award, CheckCircle2, FlaskConical } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { CERTIFICATIONS, QUALITY_TIMELINE } from "@/data/site";

export default function Quality() {
  return (
    <div data-testid="quality-page" className="pt-24 pb-24">
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2200" alt="lab" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#050816]/50 to-[#050816]" />
        <div className="container-pad relative">
          <div className="text-xs uppercase tracking-[0.3em] text-[#ff6b00] mb-4">Quality Assurance</div>
          <h1 className="display text-5xl md:text-7xl font-bold leading-[1.05] max-w-3xl">
            Tested. Verified. <span className="text-[#ff6b00]">Trusted.</span>
          </h1>
        </div>
      </section>

      {/* Process */}
      <section className="container-pad py-20">
        <SectionHeader eyebrow="Quality process" title="A six-stage quality protocol." />
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-6 md:space-y-0">
            {QUALITY_TIMELINE.map((q, i) => (
              <motion.div
                key={q.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`md:grid md:grid-cols-2 md:gap-10 md:items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
                data-testid={`quality-step-${i}`}
              >
                <div className={`glass p-6 ${i % 2 === 0 ? "md:mr-12" : "md:ml-12"} ${i > 0 ? "md:-mt-10" : ""}`}>
                  <div className="display text-3xl font-bold text-[#ff6b00] mb-2">0{i + 1}</div>
                  <h4 className="display text-xl font-bold mb-2">{q.step}</h4>
                  <p className="text-sm text-white/60">{q.desc}</p>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-pad py-16">
        <SectionHeader eyebrow="Certifications" title="Globally recognized standards." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 flex items-start gap-4"
              data-testid={`cert-${i}`}
            >
              <div className="w-12 h-12 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="display text-base font-bold">{c.name}</div>
                <div className="text-xs text-white/55 mt-1">{c.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lab */}
      <section className="container-pad py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" alt="testing lab" className="w-full h-full object-cover" />
          </div>
          <div>
            <SectionHeader eyebrow="Testing lab" title="In-house, NABL-grade testing." subtitle="Our lab continuously monitors barrier, seal and print quality — so what leaves our floor is consistently above-spec." />
            <ul className="space-y-3" data-testid="lab-tests">
              {["OTR (Oxygen Transmission Rate)", "WVTR (Water Vapour Transmission Rate)", "Seal & Bond Strength Test", "Migration & Pull Test", "COF & Tear Resistance"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b00] mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
