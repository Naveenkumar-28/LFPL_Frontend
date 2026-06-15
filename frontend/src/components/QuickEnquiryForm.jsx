import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  message: z.string().min(8, "Tell us a bit more"),
});

export default function QuickEnquiryForm({ variant = "glass", productId, productName }) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await submitForm({
        type: "enquiry",
        ...data,
        product_id: productId,
        product_type: productName,
      });
      setDone(true);
      reset();
      toast.success("Enquiry sent — we'll respond within 24 hours.");
      setTimeout(() => setDone(false), 4000);
    } catch (e) {
      toast.error("Could not send enquiry. Please try again.");
    }
  };

  const inputCls =
    "w-full bg-[#050816]/50 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#ff6b00] focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/40 transition-colors";

  return (
    <div className={variant === "glass" ? "glass-strong p-6 md:p-8" : "p-0"} data-testid="quick-enquiry-form">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 grid place-items-center bg-[#ff6b00] text-white">
          <Send className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/40">Quick enquiry</div>
          <div className="display text-lg font-bold">Get a quote in 24 hrs</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your name *"
            data-testid="enquiry-name"
            {...register("name")}
            className={inputCls}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="email"
              placeholder="Email *"
              data-testid="enquiry-email"
              {...register("email")}
              className={inputCls}
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone *"
              data-testid="enquiry-phone"
              {...register("phone")}
              className={inputCls}
            />
            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div>
          <textarea
            rows={3}
            placeholder={productName ? `Tell us about your ${productName} needs *` : "Your requirements *"}
            data-testid="enquiry-message"
            {...register("message")}
            className={inputCls}
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          data-testid="enquiry-submit-btn"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : done ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Sent — we'll be in touch
            </>
          ) : (
            <>
              Send Enquiry <Send className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-[11px] text-white/40 text-center">
          By submitting you agree to our terms. We respond within 24 hours.
        </p>
      </form>
    </div>
  );
}
