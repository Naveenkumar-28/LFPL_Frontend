import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div data-testid="not-found-page" className="pt-24 pb-24 min-h-screen grid place-items-center">
      <div className="container-pad text-center">
        <div className="display text-[20vw] md:text-[12vw] font-black leading-none text-[#ff6b00] mb-4">404</div>
        <h1 className="display text-3xl md:text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-white/55 max-w-md mx-auto mb-8">The page you were looking for has moved or doesn't exist.</p>
        <Link to="/" className="btn-primary" data-testid="not-found-home">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}
