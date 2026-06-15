import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowLeft, X, ZoomIn, Check, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import QuickEnquiryForm from "@/components/QuickEnquiryForm";

export default function ProductDetails() {
  const { slug } = useParams();
  const nav = useNavigate();
  const product = PRODUCTS.find((p) => p.id === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 container-pad text-center min-h-screen">
        <h1 className="display text-3xl mb-4">Product not found</h1>
        <button onClick={() => nav("/products")} className="btn-primary mt-6">Back to Products</button>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div data-testid="product-detail-page" className="pt-24 pb-24">
      <div className="container-pad">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#ff6b00] mb-8" data-testid="back-to-products">
          <ArrowLeft className="w-4 h-4" /> Back to products
        </Link>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10">
          {/* Gallery + Info */}
          <div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <div className="flex flex-col gap-3" data-testid="thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    data-testid={`thumb-${i}`}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${
                      activeImg === i ? "border-[#ff6b00]" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] overflow-hidden bg-[#0a0f25] group cursor-zoom-in"
                onClick={() => setLightbox(true)}
                data-testid="main-image"
              >
                <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button className="absolute top-4 right-4 w-10 h-10 grid place-items-center bg-[#050816]/70 backdrop-blur border border-white/10">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            <div className="mt-10">
              <div className="text-xs uppercase tracking-widest text-[#ff6b00] mb-3">{product.category}</div>
              <h1 className="display text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <p className="text-white/65 text-lg max-w-2xl leading-relaxed">{product.short}</p>
            </div>

            {/* Specs */}
            <div className="mt-12">
              <h3 className="display text-xl font-bold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#ff6b00]" /> Specifications
              </h3>
              <div className="glass p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8" data-testid="specs-table">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2 border-b border-white/[0.06]">
                    <span className="text-sm text-white/50">{k.replace(/_/g, " ")}</span>
                    <span className="text-sm font-semibold text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-12">
              <h3 className="display text-xl font-bold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#ff6b00]" /> Key Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {product.features.map((f) => (
                  <div key={f} className="glass p-4 flex items-center gap-3" data-testid={`feature-${f.toLowerCase().replace(/\s+/g, "-")}`}>
                    <span className="w-7 h-7 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="mt-12">
              <h3 className="display text-xl font-bold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#ff6b00]" /> Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <span key={a} className="text-sm px-4 py-2 border border-white/10 bg-white/[0.02]">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky enquiry */}
          <div className="lg:sticky lg:top-24 self-start">
            <QuickEnquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>

        {/* Related */}
        <div className="mt-24">
          <SectionHeader eyebrow="Related products" title="You may also like." />
          <Swiper modules={[Autoplay]} slidesPerView={1.2} spaceBetween={20} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
            {related.map((p, i) => (
              <SwiperSlide key={p.id}><ProductCard product={p} index={i} /></SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

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
              src={product.images[activeImg]}
              alt={product.name}
              className="max-w-[92vw] max-h-[88vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
