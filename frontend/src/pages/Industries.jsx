import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { INDUSTRIES } from "@/data/industries";

export default function Industries() {
  return (
    <div data-testid="industries-page" className="pt-24 pb-24">
      <section className="container-pad pt-12">
        <SectionHeader
          eyebrow="Industries"
          title="Trusted across categories."
          subtitle="From food and pharma to home care and industrial — Lombodaran engineers packaging for the world's most demanding sectors."
        />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative overflow-hidden border border-white/[0.06] hover:border-[#ff6b00]/40 transition-colors"
              data-testid={`industry-card-${ind.id}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={ind.image} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-2">0{i + 1}</div>
                <h3 className="display text-2xl md:text-3xl font-bold mb-3">{ind.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{ind.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ind.products.map((p) => (
                    <span key={p} className="text-xs px-3 py-1 border border-white/10 text-white/70">{p}</span>
                  ))}
                </div>
                <Link to="/quote" data-testid={`industry-cta-${ind.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#ff6b00] transition-colors">
                  Discuss this category <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
