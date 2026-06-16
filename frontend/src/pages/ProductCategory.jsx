import { useState, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown, ArrowUpRight, ArrowRight, Home as HomeIcon, ChevronRight,
  ShieldCheck, Sparkles, Leaf, Droplets, Recycle, Beaker,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES, categoryBySlug } from "@/data/categories";
import { productsByCategory } from "@/data/products";

const BENEFIT_ICONS = [ShieldCheck, Sparkles, Leaf, Droplets, Recycle, Beaker];

const FILTER_APPLICATIONS = ["Coffee", "Tea", "Dry Fruits", "Snacks", "Pet Food", "Pharma", "Confectionery", "Beverages", "Personal Care", "Frozen Food"];
const FILTER_MATERIALS = ["PET / PE", "PET / MET PET / PE", "BOPP / PE", "Kraft"];
const FILTER_FEATURES = ["Zip Lock", "Window", "Matte Finish", "Gloss Finish", "Spout"];

const PER_PAGE = 9;

export default function ProductCategory() {
  const { slug } = useParams();
  const cat = categoryBySlug(slug);

  // Hooks (always called)
  const allProducts = useMemo(() => (cat ? productsByCategory(cat.id) : []), [cat]);
  const [apps, setApps] = useState([]);
  const [mats, setMats] = useState([]);
  const [feats, setFeats] = useState([]);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [openSections, setOpenSections] = useState({ app: true, mat: true, feat: true });

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (apps.length && !apps.includes(p.application)) return false;
      if (mats.length && !mats.includes(p.material)) return false;
      if (feats.length && !feats.every((f) =>
        p.features.includes(f) || (p.finishes || []).includes(f)
      )) return false;
      return true;
    });
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "latest") list = [...list].reverse();
    return list;
  }, [allProducts, apps, mats, feats, sort]);

  if (!cat) return <Navigate to="/products" replace />;

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleArr = (arr, setter, value) => {
    setter(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
    setPage(1);
  };

  return (
    <div data-testid="product-category-page" className="pt-[72px]">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-transparent" />
          <div className="absolute inset-0 bg-grid opacity-25" />
        </div>

        <div className="container-pad relative grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6" data-testid="breadcrumb">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-white"><HomeIcon className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/products" className="hover:text-white">Products</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#ff6b00]">{cat.name}</span>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              {cat.name.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#ff6b00]">{cat.name.split(" ").slice(-1)}</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-white/65 text-lg mt-6 max-w-lg leading-relaxed"
            >
              {cat.short}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/quote" className="btn-primary" data-testid="category-hero-quote-btn">
                Request a Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="#products" className="btn-secondary">
                Browse products <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Layered 3D-ish arrangement */}
          <div className="relative h-[360px] hidden lg:block" data-testid="category-hero-image">
            {allProducts.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.6, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute aspect-[3/4] w-48 rounded-xl overflow-hidden border border-white/10 shadow-2xl"
                style={{
                  top: `${i * 30}px`,
                  right: `${i * 60}px`,
                  zIndex: 10 - i,
                  transform: `perspective(900px) rotateY(${-8 - i * 3}deg) rotateX(${4}deg)`,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 60px rgba(255,107,0,0.15)",
                }}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="container-pad py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {cat.benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
            return (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-4 flex flex-col items-center text-center group hover:border-[#ff6b00]/50 transition-colors"
                data-testid={`benefit-${i}`}
              >
                <div className="w-10 h-10 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 mb-3 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold leading-tight">{b}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PRODUCT LISTING */}
      <section id="products" className="container-pad py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="glass p-5 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto" data-testid="category-sidebar">
            <h3 className="display text-base font-bold mb-4">Filters</h3>

            <Accordion title="Application" open={openSections.app} onToggle={() => setOpenSections((o) => ({ ...o, app: !o.app }))} testid="filter-application">
              {FILTER_APPLICATIONS.map((a) => (
                <CheckboxRow key={a} label={a} checked={apps.includes(a)} onChange={() => toggleArr(apps, setApps, a)} testid={`app-${a.toLowerCase().replace(/\s+/g, "-")}`} />
              ))}
            </Accordion>

            <Accordion title="Material" open={openSections.mat} onToggle={() => setOpenSections((o) => ({ ...o, mat: !o.mat }))} testid="filter-material">
              {FILTER_MATERIALS.map((m) => (
                <CheckboxRow key={m} label={m} checked={mats.includes(m)} onChange={() => toggleArr(mats, setMats, m)} testid={`mat-${m.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} />
              ))}
            </Accordion>

            <Accordion title="Features" open={openSections.feat} onToggle={() => setOpenSections((o) => ({ ...o, feat: !o.feat }))} testid="filter-feature">
              {FILTER_FEATURES.map((f) => (
                <CheckboxRow key={f} label={f} checked={feats.includes(f)} onChange={() => toggleArr(feats, setFeats, f)} testid={`feat-${f.toLowerCase().replace(/\s+/g, "-")}`} />
              ))}
            </Accordion>

            <button
              onClick={() => { setApps([]); setMats([]); setFeats([]); setPage(1); }}
              data-testid="filters-reset"
              className="text-xs text-white/50 hover:text-[#ff6b00] mt-4"
            >
              Reset all filters
            </button>
          </aside>

          {/* Right side */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="text-sm text-white/55" data-testid="results-count">{filtered.length} products</div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                data-testid="sort-select"
                className="bg-[#0a0f25]/60 border border-white/10 px-4 py-2 text-sm focus:border-[#ff6b00] focus:outline-none"
              >
                <option value="popular">Popular</option>
                <option value="latest">Latest</option>
                <option value="az">A–Z</option>
              </select>
            </div>

            {current.length === 0 ? (
              <div className="glass p-12 text-center text-white/60" data-testid="no-products">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="category-products-grid">
                {current.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i % 3) * 0.06 }}
                    className="group bg-white/[0.02] border border-white/[0.06] hover:border-[#ff6b00]/50 transition-colors"
                    data-testid={`pcat-card-${p.id}`}
                  >
                    <div className="aspect-square overflow-hidden bg-[#0a0f25]">
                      <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-widest text-[#ff6b00] mb-2">{p.type}</div>
                      <h3 className="display text-lg font-bold mb-3 group-hover:text-[#ff6b00] transition-colors line-clamp-1">{p.name}</h3>
                      <Link to={`/products/${cat.id}/${p.id}`} data-testid={`pcat-view-${p.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold border-b border-[#ff6b00] pb-1">
                        View details <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-10" data-testid="pagination">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    data-testid={`page-${i + 1}`}
                    className={`w-10 h-10 border text-sm font-semibold ${page === i + 1 ? "bg-[#ff6b00] border-[#ff6b00] text-white" : "border-white/10 text-white/70 hover:border-[#ff6b00]"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="container-pad py-16">
        <div className="glass-strong p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-orange opacity-50" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <h3 className="display text-3xl md:text-4xl font-bold leading-tight">
              Need a custom <span className="text-[#ff6b00]">{cat.name.toLowerCase()}?</span>
            </h3>
            <div className="flex md:justify-end">
              <Link to="/quote" className="btn-primary" data-testid="category-cta-quote">
                Request a Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Accordion({ title, open, onToggle, children, testid }) {
  return (
    <div className="border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0" data-testid={testid}>
      <button onClick={onToggle} className="w-full flex items-center justify-between text-sm font-semibold mb-2">
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="space-y-2 mt-2">{children}</div>}
    </div>
  );
}

function CheckboxRow({ label, checked, onChange, testid }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer text-white/75 hover:text-white" data-testid={testid}>
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-[#ff6b00] w-4 h-4" />
      <span>{label}</span>
    </label>
  );
}
