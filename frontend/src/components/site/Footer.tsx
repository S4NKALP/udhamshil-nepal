import { Link } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

interface Organization {
  id: number;
  name: string;
  logo: string | null;
  short_intro: string;
  primary_email: string;
  phone_number: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
}

export function Footer() {
  const { data: org } = useApi<Organization>("org/organization");
  const hasSocials = Boolean(
    org?.facebook || org?.instagram || org?.linkedin || org?.youtube || org?.tiktok,
  );

  return (
    <footer className="relative z-10 bg-ink text-background pt-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
          {/* Logo and Copyright */}
          <div className="flex flex-col lg:w-[35%] shrink-0">
            <div className="flex items-center gap-4">
              <img
                src={org?.logo || `${import.meta.env.BASE_URL}logo.png`}
                alt={org?.name || "UDHAMSIL"}
                className="w-48 lg:w-64 h-auto object-contain"
              />
              <span className="font-display text-2xl font-bold tracking-tight">
                {org?.name || "UDHAMSIL"}
              </span>
            </div>

            {org?.short_intro && (
              <p className="mt-6 text-sm font-medium leading-relaxed text-background/70 max-w-sm">
                {org.short_intro}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-widest text-background/40">
                © {new Date().getFullYear()} {org?.name || "Udhamsil Nepal"}.<br />
                All rights reserved.
              </p>
              <p className="mt-4 text-[10px] font-medium uppercase tracking-widest text-background/30">
                Crafted & Designed by{" "}
                <a
                  href="https://eimagineinfotech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand/80 transition-colors"
                >
                  Imagine Infotech
                </a>
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-12">
            {/* Pages */}
            <div className="flex flex-col gap-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-background/30">
                Index
              </h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-background/70">
                <Link to="/about" className="hover:text-background transition-colors">
                  About
                </Link>
                <Link to="/products" className="hover:text-background transition-colors">
                  Products
                </Link>
                <Link to="/projects-events" className="hover:text-background transition-colors">
                  Projects
                </Link>
                <Link to="/team" className="hover:text-background transition-colors">
                  Team
                </Link>
                <Link to="/career" className="hover:text-background transition-colors">
                  Careers
                </Link>
              </nav>
            </div>

            {/* Socials */}
            {hasSocials && (
              <div className="flex flex-col gap-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-background/30">
                  Network
                </h4>
                <nav className="flex flex-col gap-4 text-sm font-medium text-background/70">
                  {org?.facebook && (
                    <a
                      href={org.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background transition-colors"
                    >
                      Facebook
                    </a>
                  )}
                  {org?.instagram && (
                    <a
                      href={org.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {org?.linkedin && (
                    <a
                      href={org.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {org?.youtube && (
                    <a
                      href={org.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background transition-colors"
                    >
                      YouTube
                    </a>
                  )}
                  {org?.tiktok && (
                    <a
                      href={org.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background transition-colors"
                    >
                      TikTok
                    </a>
                  )}
                </nav>
              </div>
            )}

            {/* Legal */}
            <div className="flex flex-col gap-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-background/30">
                Legal
              </h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-background/70">
                <Link to="/privacy" className="hover:text-background transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-background transition-colors">
                  Terms
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-background/30">
                Contact
              </h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-background/70">
                <Link to="/contact" className="hover:text-background transition-colors">
                  Get in touch
                </Link>
                <span title={org?.primary_email || "info@udhamsilnepal.com"}>
                  {org?.primary_email || "info@udhamsilnepal.com"}
                </span>
                <span>{org?.phone_number || "+977-1234567890"}</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Bottom Text */}
      <div className="w-full flex justify-center overflow-hidden pointer-events-none select-none px-4">
        <h1
          className="font-display font-black tracking-tighter text-background/5 uppercase whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 9.5vw, 15rem)",
            lineHeight: 0.75,
            transform: "translateY(15%)",
          }}
        >
          {org?.name ? org.name.replace("Global Trade Company", "").trim() : "UDHAMSIL"}
        </h1>
      </div>
    </footer>
  );
}
