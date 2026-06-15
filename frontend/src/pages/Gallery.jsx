import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { GALLERY, GALLERY_CATEGORIES } from "@/data/gallery";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const items = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat)),
    [cat]
  );

  return (
    <div data-testid="gallery-page" className="pt-24 pb-24">
      <section className="container-pad pt-12">
        <SectionHeader
          eyebrow="Gallery"
          title="Inside Lombodaran."
          subtitle="Behind-the-scenes — our products, factory floor, machines and people."
        />

        <div className="flex flex-wrap gap-2 mb-8" data-testid="gallery-filters">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              data-testid={`gallery-filter-${c.toLowerCase()}`}
              className={`text-sm px-5 py-2 border transition-colors ${
                cat === c
                  ? "bg-[#ff6b00] border-[#ff6b00] text-white"
                  : "border-white/10 text-white/75 hover:border-white/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]" data-testid="gallery-grid">
          {items.map((g, i) => (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="break-inside-avoid mb-3 cursor-zoom-in overflow-hidden group"
              onClick={() => setLightbox(g)}
              data-testid={`gallery-item-${g.id}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lightbox-overlay grid place-items-center p-6"
            onClick={() => setLightbox(null)}
            data-testid="gallery-lightbox"
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-12 h-12 grid place-items-center border border-white/20" data-testid="gallery-lightbox-close">
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={lightbox.src} alt={lightbox.alt}
              className="max-w-[92vw] max-h-[88vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
