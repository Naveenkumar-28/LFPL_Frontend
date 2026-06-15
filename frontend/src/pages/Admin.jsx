import { useEffect, useState } from "react";
import { fetchSubmissions, fetchSubmissionStats } from "@/lib/api";
import { Mail, Building2, Phone, MessageSquare, Inbox } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const TYPES = ["all", "quote", "contact", "enquiry"];

export default function Admin() {
  const [type, setType] = useState("all");
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [list, s] = await Promise.all([
        fetchSubmissions(type === "all" ? undefined : type),
        fetchSubmissionStats(),
      ]);
      setItems(list);
      setStats(s);
      setLoading(false);
    })();
  }, [type]);

  return (
    <div data-testid="admin-page" className="pt-24 pb-24">
      <section className="container-pad pt-12">
        <SectionHeader eyebrow="Internal · Admin" title="Submissions inbox." subtitle="All quote requests, contact messages and enquiries — in one place." />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            ["Total", stats.total],
            ["Quote", stats.quote || 0],
            ["Contact", stats.contact || 0],
            ["Enquiry", stats.enquiry || 0],
          ].map(([l, v]) => (
            <div key={l} className="glass p-5" data-testid={`stat-${l.toLowerCase()}`}>
              <div className="text-xs uppercase tracking-widest text-white/40">{l}</div>
              <div className="display text-3xl font-bold text-[#ff6b00] mt-2">{v}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)} data-testid={`admin-tab-${t}`} className={`text-sm px-4 py-2 border ${type === t ? "bg-[#ff6b00] border-[#ff6b00] text-white" : "border-white/10 text-white/70"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="glass p-12 text-center text-white/60">Loading…</div>
        ) : items.length === 0 ? (
          <div className="glass p-12 text-center text-white/60 flex flex-col items-center gap-3" data-testid="admin-empty">
            <Inbox className="w-10 h-10 text-white/30" />
            No submissions yet.
          </div>
        ) : (
          <div className="space-y-3" data-testid="admin-list">
            {items.map((it) => (
              <div key={it.id} className="glass p-5" data-testid={`admin-item-${it.id}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-[#ff6b00] text-white">{it.type}</span>
                  <span className="text-xs text-white/40">{new Date(it.created_at).toLocaleString()}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  {it.name && <Row icon={Building2} label={it.name + (it.company ? ` · ${it.company}` : "")} />}
                  {it.email && <Row icon={Mail} label={it.email} />}
                  {it.phone && <Row icon={Phone} label={it.phone} />}
                  {it.product_type && <Row icon={MessageSquare} label={`Product: ${it.product_type}`} />}
                  {it.quantity && <Row icon={MessageSquare} label={`Qty: ${it.quantity}`} />}
                </div>
                {(it.message || it.requirement) && (
                  <p className="text-sm text-white/65 mt-4 pt-4 border-t border-white/[0.06]">
                    {it.message || it.requirement}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Row({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-white/75">
      <Icon className="w-3.5 h-3.5 text-[#ff6b00]" /> {label}
    </div>
  );
}
