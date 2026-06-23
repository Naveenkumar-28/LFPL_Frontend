import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import {
  ArrowUpRight, ArrowRight, ShieldCheck, Cog, Edit3, Truck, Leaf, Headphones,
  Play, Sparkles
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import QuickEnquiryForm from "@/components/QuickEnquiryForm";
import ClientsMarquee from "@/components/ClientsMarquee";
import { PRODUCTS } from "@/data/products";
import { INDUSTRIES } from "@/data/industries";
import { STATS, WHY_US, PROCESS_STEPS, SITE } from "@/data/site";
import { GALLERY } from "@/data/gallery";

const ICONS = { shield: ShieldCheck, cog: Cog, edit: Edit3, truck: Truck, leaf: Leaf, headphones: Headphones };

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-screen pt-[72px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2400"
            alt="hero bg"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/85 via-[#050816]/60 to-[#050816]" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-radial-orange" />
        </div>

        <div className="container-pad relative grid lg:grid-cols-12 gap-12 py-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs uppercase tracking-widest text-white/70 mb-8"
              data-testid="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff6b00]" />
              ISO 9001 · FSSAI · BRC Certified
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight"
            >
              Premium <span className="text-[#ff6b00]">flexible</span><br />
              packaging engineered<br />for ambitious brands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/65 text-lg mt-8 max-w-xl leading-relaxed"
            >
              Lombodaran manufactures high-barrier pouches, printed rolls and laminates from a 50,000 sq ft facility in Pune — trusted by 100+ brands across food, pharma, personal care and industrial sectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link to="/quote" data-testid="hero-quote-btn" className="btn-primary">
                Request Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/products" data-testid="hero-products-btn" className="btn-secondary">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10"
            >
              {STATS.map((s) => (
                <div key={s.label} data-testid={`hero-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="display text-3xl md:text-4xl font-bold text-white">{s.value}</div>
                  <div className="text-xs uppercase tracking-widest text-white/40 mt-2">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <QuickEnquiryForm />
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-pad relative">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Packaging that fits every category."
            subtitle="Engineered for brands across food, pharma, personal care, home care, textile and industrial sectors."
            testid="industries-header"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative aspect-[4/5] overflow-hidden border border-white/[0.06] hover:border-[#ff6b00]/40 transition-colors"
                data-testid={`home-industry-${ind.id}`}
              >
                <img src={ind.image} alt={ind.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-2">0{i + 1}</div>
                  <h3 className="display text-xl md:text-2xl font-bold">{ind.name}</h3>
                  <p className="text-sm text-white/60 mt-2 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                    {ind.short}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR CLIENTS */}
      <ClientsMarquee />


      {/* FEATURED PRODUCTS */}
      <section className="section-pad bg-gradient-to-b from-transparent via-[#0a0f25]/30 to-transparent">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Featured Products"
              title="Engineered packaging formats."
              testid="featured-products-header"
            />
            <Link to="/products" className="btn-secondary" data-testid="view-all-products-btn">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1.2}
            spaceBetween={20}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            data-testid="featured-products-slider"
          >
            {PRODUCTS.map((p, i) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Why Lombodaran"
            title="Six reasons brands choose us."
            testid="why-us-header"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {WHY_US.map((w, i) => {
              const Icon = ICONS[w.icon] || ShieldCheck;
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass p-7 hover:border-[#ff6b00]/40 transition-colors group"
                  data-testid={`why-card-${i}`}
                >
                  <div className="w-12 h-12 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 mb-5 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="display text-lg font-bold mb-2">{w.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE PREVIEW */}
      <section className="section-pad bg-[#0a0f25]/30">
        <div className="container-pad grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative overflow-hidden aspect-[4/5] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=1600"
                alt="factory"
                className="w-full h-full object-cover"
              />
              {/* <button className="absolute inset-0 grid place-items-center group" data-testid="infra-video-trigger">
                <span className="w-20 h-20 rounded-full bg-[#ff6b00] grid place-items-center group-hover:scale-110 transition-transform shadow-2xl shadow-[#ff6b00]/40">
                  <Play className="w-7 h-7 text-white ml-1" />
                </span>
              </button> */}
            </div>
            <div className="absolute -bottom-6 -right-6 glass-strong p-5 hidden md:block">
              <div className="display text-4xl font-bold text-[#ff6b00]">10,000</div>
              <div className="text-xs uppercase tracking-widest text-white/60">Sq Ft Facility</div>
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Infrastructure"
              title="A 50,000 sq ft facility built for scale."
              subtitle="State-of-the-art rotogravure presses, solvent-less lamination, multi-format pouch making and an in-house quality lab — all under one roof."
            />
            <ul className="space-y-3 mb-8">
              {[
                "Production machines including 8-colour rotogravure",
                "Solvent-less lamination for sustainability",
                "Multi-format pouch making lines",
                "In-house quality lab with OTR & WVTR testing",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 bg-[#ff6b00] mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/infrastructure" data-testid="infra-cta" className="btn-primary">
              Explore facility <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="section-pad">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Our Process"
            title="From brief to dispatch in 7 steps."
            align="center"
            testid="process-header"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 md:gap-2 max-w-7xl mx-auto">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative border-t border-white/10 pt-5 group hover:border-[#ff6b00] transition-colors"
                data-testid={`process-step-${i}`}
              >
                <div className="display text-[#ff6b00] text-xs font-bold tracking-widest mb-3">{p.step}</div>
                <h4 className="font-semibold text-base mb-2">{p.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section-pad bg-[#0a0f25]/30">
        <div className="container-pad">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeader eyebrow="Gallery" title="A look inside Lombodaran." />
            <Link to="/gallery" className="btn-secondary" data-testid="view-gallery-btn">
              View gallery <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.slice(0, 8).map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`overflow-hidden ${i === 0 ? "md:row-span-2 md:col-span-2 aspect-square" : "aspect-square"}`}
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-pad">
          <div className="glass-strong p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-orange opacity-50" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-4">Ready when you are</div>
                <h2 className="display text-4xl md:text-5xl font-bold leading-tight">
                  Let's package something <br />
                  <span className="text-[#ff6b00]">extraordinary.</span>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row md:justify-end gap-4">
                <Link to="/quote" className="btn-primary" data-testid="cta-quote-btn">
                  Get a Quote <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-secondary" data-testid="cta-contact-btn">
                  Talk to expert <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
