import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`product-card-${product.id}`}
      className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-[#ff6b00]/50 transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#0a0f25]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#050816]/80 backdrop-blur text-[10px] uppercase tracking-widest text-white/80 border border-white/10">
          {product.category}
        </div>
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-[#ff6b00] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-white/55 line-clamp-2 mb-5 min-h-[2.5rem]">
          {product.short}
        </p>
        <Link
          to={`/products/${product.id}`}
          data-testid={`product-view-${product.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#ff6b00] transition-colors"
        >
          View details
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
