import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import {
  PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_MATERIALS, PRODUCT_APPLICATIONS, PRODUCT_FEATURES_FILTER,
} from "@/data/products";

const PER_PAGE = 8;

export default function Products() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [mat, setMat] = useState("All");
  const [app, setApp] = useState("All");
  const [feat, setFeat] = useState([]);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (search && !`${p.name} ${p.short}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (cat !== "All" && p.category !== cat) return false;
      if (mat !== "All" && !p.material.toUpperCase().includes(mat.toUpperCase())) return false;
      if (app !== "All" && !p.application.toLowerCase().includes(app.toLowerCase())) return false;
      if (feat.length && !feat.every((f) => p.features.includes(f))) return false;
      return true;
    });
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [search, cat, mat, app, feat, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const reset = () => {
    setSearch(""); setCat("All"); setMat("All"); setApp("All"); setFeat([]); setSort("featured"); setPage(1);
  };

  const Sidebar = (
    <aside className="glass p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto" data-testid="products-sidebar">
      <div className="flex items-center justify-between mb-5">
        <h3 className="display text-lg font-bold flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#ff6b00]" /> Filters
        </h3>
        <button onClick={reset} className="text-xs text-white/40 hover:text-[#ff6b00]" data-testid="filters-reset">Reset</button>
      </div>

      <FilterGroup label="Category" options={PRODUCT_CATEGORIES} value={cat} onChange={(v) => { setCat(v); setPage(1); }} testid="filter-category" />
      <FilterGroup label="Material" options={PRODUCT_MATERIALS} value={mat} onChange={(v) => { setMat(v); setPage(1); }} testid="filter-material" />
      <FilterGroup label="Application" options={PRODUCT_APPLICATIONS} value={app} onChange={(v) => { setApp(v); setPage(1); }} testid="filter-application" />

      <div className="mb-1">
        <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Features</div>
        <div className="space-y-2">
          {PRODUCT_FEATURES_FILTER.map((f) => (
            <label key={f} className="flex items-center gap-2 text-sm cursor-pointer" data-testid={`filter-feature-${f.toLowerCase().replace(/\s+/g, "-")}`}>
              <input
                type="checkbox"
                checked={feat.includes(f)}
                onChange={(e) => {
                  setFeat((cur) => (e.target.checked ? [...cur, f] : cur.filter((x) => x !== f)));
                  setPage(1);
                }}
                className="accent-[#ff6b00] w-4 h-4"
              />
              <span className="text-white/75">{f}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div data-testid="products-page" className="pt-24">
      {/* HEADER */}
      <section className="container-pad pt-12 pb-8">
        <SectionHeader
          eyebrow="Products"
          title="Explore our complete range."
          subtitle="Engineered laminates, pouches and rolls — designed for performance, sustainability and shelf appeal."
        />
      </section>

      {/* TOOLBAR */}
      <div className="container-pad mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              data-testid="products-search"
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-[#0a0f25]/60 border border-white/10 pl-12 pr-4 py-3 text-sm placeholder:text-white/30 focus:border-[#ff6b00] focus:outline-none"
            />
          </div>
          <select
            value={sort}
            data-testid="products-sort"
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#0a0f25]/60 border border-white/10 px-4 py-3 text-sm focus:border-[#ff6b00] focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="az">Name: A–Z</option>
            <option value="za">Name: Z–A</option>
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            data-testid="mobile-filters-toggle"
            className="lg:hidden btn-secondary"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="container-pad pb-24 grid lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block">{Sidebar}</div>
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#050816]/95 backdrop-blur-xl p-6 overflow-y-auto" data-testid="mobile-filters-panel">
            <div className="flex justify-between items-center mb-6">
              <h3 className="display text-xl font-bold">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} data-testid="mobile-filters-close"><X /></button>
            </div>
            {Sidebar}
          </div>
        )}

        <div>
          <div className="text-sm text-white/50 mb-4" data-testid="products-count">
            {filtered.length} products
          </div>
          {current.length === 0 ? (
            <div className="glass p-12 text-center text-white/60" data-testid="no-products">
              No products match your filters. Try resetting.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="products-grid">
              {current.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-12" data-testid="pagination">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  data-testid={`page-${i + 1}`}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 border text-sm font-semibold transition-colors ${
                    page === i + 1
                      ? "bg-[#ff6b00] border-[#ff6b00] text-white"
                      : "border-white/10 text-white/70 hover:border-[#ff6b00]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange, testid }) {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-widest text-white/40 mb-3">{label}</div>
      <div className="flex flex-wrap gap-1.5" data-testid={testid}>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            data-testid={`${testid}-${o.toLowerCase().replace(/\s+/g, "-")}`}
            className={`text-xs px-3 py-1.5 border transition-colors ${
              value === o
                ? "bg-[#ff6b00] border-[#ff6b00] text-white"
                : "border-white/10 text-white/70 hover:border-white/30"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
