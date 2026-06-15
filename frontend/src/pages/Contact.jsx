import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/data/site";
import { submitForm } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().optional(),
  message: z.string().min(8),
});

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await submitForm({ type: "contact", ...data });
      reset();
      toast.success("Thanks! We'll reach out within 24 hours.");
    } catch {
      toast.error("Could not send. Please try again.");
    }
  };

  const inputCls = "w-full bg-[#0a0f25]/60 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 focus:border-[#ff6b00] focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/40 transition-colors";

  return (
    <div data-testid="contact-page" className="pt-24 pb-24">
      <section className="container-pad pt-12">
        <SectionHeader
          eyebrow="Contact us"
          title="Let's talk packaging."
          subtitle="Reach out for quotes, partnerships, careers or just to say hi."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-4">
            <InfoBox icon={MapPin} title="Visit us" desc={SITE.address} testid="contact-address" />
            <InfoBox icon={Phone} title="Call us" desc={SITE.phone} testid="contact-phone" link={`tel:${SITE.phone}`} />
            <InfoBox icon={Mail} title="Email us" desc={SITE.email} testid="contact-email" link={`mailto:${SITE.email}`} />
            <InfoBox icon={Clock} title="Working hours" desc={SITE.hours} testid="contact-hours" />

            <div className="aspect-[16/10] overflow-hidden border border-white/10 mt-6" data-testid="contact-map">
              <iframe
                title="map"
                src={SITE.map}
                width="100%" height="100%" style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.5) brightness(0.95)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="glass-strong p-8">
            <h3 className="display text-2xl font-bold mb-2">Send us a message</h3>
            <p className="text-sm text-white/55 mb-6">We typically respond within a few hours.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Your name *" {...register("name")} className={inputCls} data-testid="contact-name" />
                  {errors.name && <p className="text-xs text-red-400 mt-1">Required</p>}
                </div>
                <div>
                  <input type="text" placeholder="Company" {...register("company")} className={inputCls} data-testid="contact-company" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input type="email" placeholder="Email *" {...register("email")} className={inputCls} data-testid="contact-email-input" />
                  {errors.email && <p className="text-xs text-red-400 mt-1">Valid email required</p>}
                </div>
                <div>
                  <input type="tel" placeholder="Phone *" {...register("phone")} className={inputCls} data-testid="contact-phone-input" />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">Required</p>}
                </div>
              </div>
              <div>
                <textarea rows={5} placeholder="Tell us about your requirement *" {...register("message")} className={inputCls} data-testid="contact-message" />
                {errors.message && <p className="text-xs text-red-400 mt-1">Tell us a bit more</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center" data-testid="contact-submit">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send message <Send className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBox({ icon: Icon, title, desc, link, testid }) {
  const Wrap = link ? "a" : "div";
  const props = link ? { href: link } : {};
  return (
    <Wrap {...props} className="glass p-5 flex items-start gap-4 group hover:border-[#ff6b00]/40 transition-colors" data-testid={testid}>
      <div className="w-11 h-11 grid place-items-center bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20 shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="display text-base font-bold">{title}</div>
        <div className="text-sm text-white/60 mt-1">{desc}</div>
      </div>
    </Wrap>
  );
}
