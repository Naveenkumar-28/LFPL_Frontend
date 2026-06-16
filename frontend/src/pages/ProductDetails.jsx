import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  ArrowUpRight, ArrowRight, X, ZoomIn, Check, RotateCw, Home as HomeIcon, ChevronRight,
  FileDown, ShieldCheck, Droplets, Wind, Lock, Sparkles, Package2,
} from "lucide-react";
import { productBySlug, productsByCategory } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import SectionHeader from "@/components/SectionHeader";
import QuickEnquiryForm from "@/components/QuickEnquiryForm";

const FEATURE_ICONS = {
  "High Barrier": ShieldCheck,
  "Moisture Resistant": Droplets,
  "Oxygen Barrier": Wind,
  "Puncture Resistant": Lock,
  "Leak Proof": Droplets,
  "Food Safe": Check,
  "Tamper Evident": Lock,
  "Zip Lock": Lock,
  "Re-closable": Lock,
};

export default function ProductDetails() {
  const { category: catSlug, slug } = useParams();
  const product = productBySlug(slug);
  const cat = product ? categoryBySlug(product.category) : null;

  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!product) return <Navigate to="/products" replace />;
  if (catSlug && product.category !== catSlug) return <Navigate to={`/products/${product.category}/${product.id}`} replace />;

  const related = productsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div data-testid="product-detail-page" className="pt-[72px]">
      {/* Breadcrumb */}
      <div className="container-pad pt-8">
        <nav className="flex items-center gap-2 text-xs text-white/50" data-testid="breadcrumb">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-white"><HomeIcon className="w-3 h-3" /> Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-white">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/products/${product.category}`} className="hover:text-white">{cat?.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#ff6b00]">{product.name}</span>
        </nav>
      </div>

      <section className="container-pad pt-8 pb-16">
        <div className="grid lg:grid-cols-[40%_60%] gap-10 lg:gap-12">
          {/* GALLERY */}
          <div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto" data-testid="thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    data-testid={`thumb-${i}`}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${activeImg === i ? "border-[#ff6b00]" : "border-white/10 hover:border-white/30"}`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] overflow-hidden bg-[#0a0f25] group cursor-zoom-in"
                onClick={() => setLightbox(true)}
                data-testid="main-image"
              >
                <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button className="absolute top-4 right-4 w-10 h-10 grid place-items-center bg-[#050816]/70 backdrop-blur border border-white/10">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-2 bg-[#050816]/70 backdrop-blur border border-white/10 text-xs" data-testid="view-360-btn">
                  <RotateCw className="w-3.5 h-3.5" /> 360° View
                </button>
              </motion.div>
            </div>
          </div>

          {/* INFO */}
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-3">{product.type}</div>
            <h1 className="display text-4xl md:text-5xl font-bold mb-5 leading-tight">{product.name}</h1>
            <p className="text-white/65 text-lg leading-relaxed mb-6">{product.description}</p>

            <ul className="space-y-2.5 mb-8" data-testid="bullet-features">
              {product.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-3 text-white/85 text-sm">
                  <Check className="w-4 h-4 text-[#ff6b00] mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/quote" className="btn-primary" data-testid="info-quote-btn">
                Request Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button className="btn-secondary" data-testid="info-datasheet-btn">
                Download Datasheet <FileDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="mt-16">
          <h3 className="display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" /> Specifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="specs-grid">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="glass p-5">
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">{k.replace(/_/g, " ")}</div>
                <div className="text-base font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATIONS */}
        <div className="mt-16">
          <h3 className="display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" /> Applications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3" data-testid="applications-grid">
            {product.applications.map((a) => (
              <div key={a} className="glass p-5 flex flex-col items-center text-center group hover:border-[#ff6b00]/50 transition-colors">
                <div className="w-10 h-10 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 mb-3 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                  <Package2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KEY FEATURES */}
        <div className="mt-16">
          <h3 className="display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" /> Key Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" data-testid="key-features-grid">
            {product.features.map((f) => {
              const Icon = FEATURE_ICONS[f] || Sparkles;
              return (
                <div key={f} className="glass p-5 group hover:border-[#ff6b00]/50 transition-colors">
                  <div className="w-10 h-10 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 mb-3 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-semibold">{f}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="container-pad py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeader
              eyebrow="Get a quote"
              title="Get Quote Now."
              subtitle={`Tell us about your ${product.name} needs. Our team will respond within 24 hours.`}
            />
            <div className="glass p-6 mb-4">
              <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Currently viewing</div>
              <div className="display text-lg font-bold">{product.name}</div>
              <div className="text-xs text-white/55 mt-1">{product.type}</div>
            </div>
          </div>
          <div>
            <QuickEnquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="container-pad py-16">
          <SectionHeader eyebrow="Related products" title="You may also like." />
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.2}
            spaceBetween={20}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={related.length > 3}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
            data-testid="related-slider"
          >
            {related.map((p) => (
              <SwiperSlide key={p.id}>
                <Link to={`/products/${p.category}/${p.id}`} className="group block bg-white/[0.02] border border-white/[0.06] hover:border-[#ff6b00]/50 transition-colors" data-testid={`related-${p.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-widest text-[#ff6b00] mb-2">{p.type}</div>
                    <div className="display text-base font-bold group-hover:text-[#ff6b00] transition-colors">{p.name}</div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="container-pad py-20">
        <div className="glass-strong p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-orange opacity-40" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-4">Final word</div>
            <h2 className="display text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
              Let's create packaging that <br />
              <span className="text-[#ff6b00]">elevates your brand.</span>
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="btn-primary" data-testid="final-cta-experts">
                Talk to our experts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/quote" className="btn-secondary" data-testid="final-cta-quote">
                Get a Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lightbox-overlay grid place-items-center p-6"
            onClick={() => setLightbox(false)}
            data-testid="lightbox"
          >
            <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 w-12 h-12 grid place-items-center border border-white/20 text-white" data-testid="lightbox-close">
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.92 }} animate={{ scale: 1 }}
              src={product.images[activeImg]} alt={product.name}
              className="max-w-[92vw] max-h-[88vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
