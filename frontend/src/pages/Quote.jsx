import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import { PRODUCTS } from "@/data/products";
import { submitForm } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  product_type: z.string().min(1, "Select a product"),
  quantity: z.string().min(1, "Quantity required"),
  requirement: z.string().min(10, "Tell us more (10+ chars)"),
});

const STEPS = [
  { id: 1, title: "About you", fields: ["name", "company", "email", "phone"] },
  { id: 2, title: "Product", fields: ["product_type", "quantity"] },
  { id: 3, title: "Requirements", fields: ["requirement"] },
];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const {
    register, handleSubmit, trigger, formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const next = async () => {
    const valid = await trigger(STEPS[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data) => {
    try {
      await submitForm({ type: "quote", ...data });
      setSuccess(true);
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const inputCls = "w-full bg-[#0a0f25]/60 border border-white/10 px-4 py-3.5 text-sm placeholder:text-white/30 focus:border-[#ff6b00] focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/40 transition-colors";

  return (
    <div data-testid="quote-page" className="pt-24 pb-24">
      <section className="container-pad pt-12 max-w-3xl">
        <SectionHeader
          eyebrow="Get a Quote"
          title="A precise quote in 24 hours."
          subtitle="Tell us about your packaging needs and we'll send a detailed proposal within one business day."
        />

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10" data-testid="quote-progress">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex-1 flex items-center gap-3">
              <div className={`w-9 h-9 grid place-items-center text-sm font-semibold border ${
                i <= step ? "bg-[#ff6b00] border-[#ff6b00] text-white" : "border-white/15 text-white/40"
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <div className="hidden md:block">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Step {s.id}</div>
                <div className={`text-sm font-semibold ${i <= step ? "text-white" : "text-white/40"}`}>{s.title}</div>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-strong p-6 md:p-10" data-testid="quote-form">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h3 className="display text-xl font-bold mb-1">Tell us about yourself</h3>
                <p className="text-sm text-white/55 mb-4">We'll need these to send you the quote.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Full name *" {...register("name")} className={inputCls} data-testid="quote-name" />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Company name *" {...register("company")} className={inputCls} data-testid="quote-company" />
                    {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company.message}</p>}
                  </div>
                  <div>
                    <input type="email" placeholder="Email *" {...register("email")} className={inputCls} data-testid="quote-email" />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <input type="tel" placeholder="Phone *" {...register("phone")} className={inputCls} data-testid="quote-phone" />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h3 className="display text-xl font-bold mb-1">Product details</h3>
                <p className="text-sm text-white/55 mb-4">What are you looking to package?</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <select {...register("product_type")} className={inputCls} data-testid="quote-product">
                      <option value="">Select product type *</option>
                      {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                      <option value="Custom">Custom / Other</option>
                    </select>
                    {errors.product_type && <p className="text-xs text-red-400 mt-1">{errors.product_type.message}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Quantity (e.g. 50,000 pcs/month) *" {...register("quantity")} className={inputCls} data-testid="quote-quantity" />
                    {errors.quantity && <p className="text-xs text-red-400 mt-1">{errors.quantity.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h3 className="display text-xl font-bold mb-1">Your requirements</h3>
                <p className="text-sm text-white/55 mb-4">Share dimensions, structure preferences, finish and timeline.</p>
                <textarea rows={6} placeholder="Describe your requirement in detail *" {...register("requirement")} className={inputCls} data-testid="quote-requirement" />
                {errors.requirement && <p className="text-xs text-red-400 mt-1">{errors.requirement.message}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/[0.06]">
            <button type="button" onClick={back} disabled={step === 0} className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed" data-testid="quote-back">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} className="btn-primary" data-testid="quote-next">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-primary" data-testid="quote-submit">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Submit quote request <CheckCircle2 className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </form>
      </section>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lightbox-overlay grid place-items-center p-6"
            data-testid="success-modal"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="glass-strong p-10 max-w-md text-center relative"
            >
              <button onClick={() => setSuccess(false)} className="absolute top-4 right-4 w-9 h-9 grid place-items-center text-white/60 hover:text-white" data-testid="success-close">
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ff6b00] grid place-items-center mb-5">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="display text-2xl font-bold mb-3">Quote request received!</h3>
              <p className="text-white/60 text-sm mb-6">Thanks for reaching out — our team will send you a detailed proposal within 24 hours.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/" className="btn-primary" data-testid="success-home">Back to home <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/products" className="btn-secondary" data-testid="success-products">Explore products</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
