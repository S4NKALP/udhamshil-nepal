import { useState, useEffect } from "react";
import { ArrowUp, MessageSquare } from "lucide-react";
import { useApi } from "@/hooks/useApi";

interface Organization {
  whatsapp_no: string;
}

export function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: org } = useApi<Organization>("org/organization");

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      {org?.whatsapp_no && (
        <a
          href={`https://wa.me/${org.whatsapp_no}`}
          target="_blank"
          rel="noreferrer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/20"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="h-6 w-6" />
        </a>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-all hover:scale-110 hover:border-brand/50 hover:text-brand ${
          isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
