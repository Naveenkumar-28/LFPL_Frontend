import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Package, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { INDUSTRIES } from "@/data/industries";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products", mega: "products" },
  { to: "/industries", label: "Industries", mega: "industries" },
  { to: "/infrastructure", label: "Infrastructure" },
  { to: "/quality", label: "Quality" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050816]/85 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="container-pad flex items-center justify-between h-[72px]">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="w-9 h-9 grid place-items-center bg-[#ff6b00] text-white">
            <Package className="w-5 h-5" />
          </span>
          <span className="display text-xl font-bold tracking-tight">
            lombo<span className="text-[#ff6b00]">daran</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMega(null)}>
          {NAV_LINKS.map((l) => (
            <div
              key={l.to}
              className="relative"
              onMouseEnter={() => setOpenMega(l.mega || null)}
            >
              <NavLink
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium tracking-wide flex items-center gap-1 transition-colors ${
                    isActive ? "text-[#ff6b00]" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {l.label}
                {l.mega && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/quote"
            data-testid="nav-get-quote-btn"
            className="btn-primary text-sm"
          >
            Get Quote <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              data-testid="mobile-menu-toggle"
              className="lg:hidden w-10 h-10 grid place-items-center text-white"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#050816] border-l border-white/10 text-white w-[300px]"
          >
            <div className="flex flex-col gap-1 mt-8" data-testid="mobile-menu">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium border-l-2 ${
                      isActive
                        ? "border-[#ff6b00] text-[#ff6b00] bg-white/[0.03]"
                        : "border-transparent text-white/80"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <button
                data-testid="mobile-get-quote-btn"
                onClick={() => {
                  setMobileOpen(false);
                  nav("/quote");
                }}
                className="btn-primary mt-4 mx-4 justify-center"
              >
                Get Quote <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mega menus */}
      <AnimatePresence>
        {openMega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setOpenMega(openMega)}
            onMouseLeave={() => setOpenMega(null)}
            className="absolute left-0 right-0 top-full hidden lg:block"
            data-testid={`mega-${openMega}`}
          >
            <div className="container-pad pt-2">
              <div className="glass-strong p-8 grid grid-cols-3 gap-8">
                {openMega === "products" && (
                  <>
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                      {CATEGORIES.map((c) => (
                        <Link
                          key={c.id}
                          to={`/products/${c.id}`}
                          onClick={() => setOpenMega(null)}
                          data-testid={`mega-product-${c.id}`}
                          className="group flex items-center gap-3 p-3 border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="w-12 h-12 overflow-hidden bg-white/[0.04] shrink-0">
                            <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{c.name}</div>
                            <div className="text-xs text-white/50 line-clamp-1">{c.short}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-l border-white/10 pl-6">
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Featured</div>
                      <img
                        src={CATEGORIES[1].image}
                        alt="featured"
                        className="w-full h-32 object-cover mb-4"
                      />
                      <div className="text-sm font-semibold">{CATEGORIES[1].name}</div>
                      <Link
                        to="/products"
                        onClick={() => setOpenMega(null)}
                        className="text-xs text-[#ff6b00] mt-3 inline-flex items-center gap-1"
                      >
                        View all categories <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </>
                )}
                {openMega === "industries" && (
                  <>
                    {INDUSTRIES.slice(0, 6).map((ind) => (
                      <Link
                        key={ind.id}
                        to="/industries"
                        onClick={() => setOpenMega(null)}
                        data-testid={`mega-industry-${ind.id}`}
                        className="group block border border-transparent hover:border-white/10 transition-colors"
                      >
                        <div className="aspect-[16/9] overflow-hidden mb-3">
                          <img src={ind.image} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="text-sm font-semibold">{ind.name}</div>
                        <div className="text-xs text-white/50 line-clamp-2 mt-1">{ind.short}</div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
