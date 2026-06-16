import { Link } from "react-router-dom";
import { Package, MapPin, Phone, Mail, Linkedin, Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="bg-[#050816] border-t border-white/[0.06]" data-testid="site-footer">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <span className="w-9 h-9 grid place-items-center bg-[#ff6b00] text-white">
                <Package className="w-5 h-5" />
              </span>
              <span className="display text-xl font-bold">
                lombo<span className="text-[#ff6b00]">daran</span>
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Premium flexible packaging solutions engineered for brands across food, pharma, personal care and industrial sectors.
            </p>
            <div className="flex gap-2">
              <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" data-testid="social-linkedin" className="w-9 h-9 grid place-items-center border border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" data-testid="social-instagram" className="w-9 h-9 grid place-items-center border border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer" data-testid="social-facebook" className="w-9 h-9 grid place-items-center border border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noreferrer" data-testid="social-youtube" className="w-9 h-9 grid place-items-center border border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/about", "About Us"],
                ["/infrastructure", "Infrastructure"],
                ["/quality", "Quality Assurance"],
                ["/gallery", "Gallery"],
                ["/contact", "Contact"],
              ].map(([to, l]) => (
                <li key={to}>
                  <Link to={to} className="text-white/70 hover:text-[#ff6b00] transition-colors" data-testid={`footer-link-${l.toLowerCase().replace(/\s+/g, "-")}`}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">Products</h4>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link to={`/products/${c.id}`} className="text-white/70 hover:text-[#ff6b00] transition-colors" data-testid={`footer-product-${c.id}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">Get in touch</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#ff6b00] shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-[#ff6b00] shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-[#ff6b00] shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
            </ul>
            <Link to="/quote" data-testid="footer-quote-cta" className="inline-flex items-center gap-2 mt-6 text-[#ff6b00] text-sm font-semibold">
              Request a quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-pad py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Lombodaran Packaging Pvt Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
