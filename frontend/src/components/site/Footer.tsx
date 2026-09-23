import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative z-10 bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-brand font-display text-sm font-bold text-primary-foreground">
              U
            </span>
            <span className="font-display text-lg font-bold">Udhamsil Nepal</span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-primary-foreground/60">
            Global Trade Company — exporter, manufacturer, distributor and supplier of small, medium
            and commercial scale machinery. Established 2020.
          </p>
        </div>

        <div className="lg:col-span-3">
           <p className="text-xs font-semibold uppercase text-primary-foreground/50">Pages</p>
           <ul className="mt-4 space-y-2 text-sm text-primary-foreground/60">
            <li><Link to="/about" className="hover:text-brand">About</Link></li>
            <li><Link to="/products" className="hover:text-brand">Products</Link></li>
            <li><Link to="/projects-events" className="hover:text-brand">Projects &amp; Events</Link></li>
            <li><Link to="/team" className="hover:text-brand">Team</Link></li>
            <li><Link to="/career" className="hover:text-brand">Career</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
           <p className="text-xs font-semibold uppercase text-primary-foreground/50">Visit us</p>
           <p className="mt-4 text-sm text-primary-foreground/60">
            Kohalpur-11, Banke
            <br />
            Lumbini Province, Nepal
          </p>
           <p className="mt-3 text-sm text-primary-foreground/60">info@udhamsilnepal.com</p>
        </div>
      </div>
       <div className="border-t border-primary-foreground/15">
         <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Udhamsil Nepal Global Trade Company · Kohalpur-11, Banke
        </div>
      </div>
    </footer>
  );
}
