import { Link } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

interface Organization {
  id: number;
  name: string;
  logo: string | null;
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
  

  return (
    <footer className="relative z-10 bg-[#0A0A0A] text-white pt-24 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20 lg:mb-32">
          {/* Logo and Copyright */}
          <div className="flex flex-col lg:w-[35%] shrink-0">
            <div className="flex items-center gap-3">
              {org?.logo ? (
                 <img src={org.logo} alt={org?.name || "Udhamsil Nepal"} className="h-9 w-auto object-contain bg-white rounded p-1" />
              ) : (
                <span className="grid h-9 w-9 place-items-center bg-white font-display text-sm font-bold text-black rounded">
                  {org?.name ? org.name.charAt(0) : "U"}
                </span>
              )}
              <span className="font-display text-lg font-bold">{org?.name || "Udhamsil Nepal"}</span>
            </div>
            <p className="mt-5 text-[13px] text-white/40">
              © copyright {org?.name || "Udhamsil Nepal"} {new Date().getFullYear()}.<br />All rights reserved.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Pages */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-semibold text-white">PAGES</h4>
              <nav className="flex flex-col gap-4 text-[13px] text-white/50">
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                <Link to="/projects-events" className="hover:text-white transition-colors">Projects &amp; Events</Link>
                <Link to="/team" className="hover:text-white transition-colors">Team</Link>
                <Link to="/career" className="hover:text-white transition-colors">Career</Link>
              </nav>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-semibold text-white">SOCIALS</h4>
              <nav className="flex flex-col gap-4 text-[13px] text-white/50">
                {org?.facebook && <a href={org.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>}
                {org?.instagram && <a href={org.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>}
                {org?.linkedin && <a href={org.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>}
                {org?.youtube && <a href={org.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>}
                {org?.tiktok && <a href={org.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>}
                {(!org || (!org.facebook && !org.instagram && !org.linkedin && !org.youtube && !org.tiktok)) && (
                  <>
                    <span className="opacity-50 hover:text-white cursor-pointer transition-colors">Facebook</span>
                    <span className="opacity-50 hover:text-white cursor-pointer transition-colors">Instagram</span>
                    <span className="opacity-50 hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                  </>
                )}
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-semibold text-white">LEGAL</h4>
              <nav className="flex flex-col gap-4 text-[13px] text-white/50">
                <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-semibold text-white">CONTACT</h4>
              <nav className="flex flex-col gap-4 text-[13px] text-white/50">
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                <span title={org?.primary_email || "info@udhamsilnepal.com"}>{org?.primary_email || "info@udhamsilnepal.com"}</span>
                <span>{org?.phone_number || "+977-1234567890"}</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Bottom Text */}
      <div className="w-full flex justify-center overflow-hidden pointer-events-none select-none px-4">
        <h1 
          className="font-black tracking-tighter text-white/[0.03] uppercase whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 11vw, 15rem)", lineHeight: 0.8, transform: "translateY(10%)" }}
        >
          {org?.name ? org.name.replace('Global Trade Company', '').trim() : "UDHAMSIL NEPAL"}
        </h1>
      </div>
    </footer>
  );
}
