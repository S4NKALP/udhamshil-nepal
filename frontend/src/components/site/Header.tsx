import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";

import { useApi } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/projects-events", label: "Projects & Events" },
  { to: "/team", label: "Team" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: org } = useApi<any>("org/organization");
  const logoUrl = org?.logo || `${import.meta.env.BASE_URL}logo.png`;

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-background border-b border-transparent transition-all duration-300 hover:border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex h-24 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logoUrl}
              alt={org?.name || "Udhamshil Nepal"}
              className="h-20 md:h-24 w-auto object-contain scale-110 md:scale-125 origin-left"
            />
          </Link>

          <div className="hidden h-full items-center gap-8 text-xs font-medium uppercase tracking-widest text-muted-foreground lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `flex h-full items-center transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-bold" : ""
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden text-xs font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-70 sm:inline-block"
            >
              Contact
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="rounded-none lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[min(88vw,24rem)] flex-col border-border bg-background p-0 lg:hidden"
              >
                <SheetHeader className="border-b border-border px-6 py-6 text-left">
                  <div className="flex items-center gap-3 pr-10">
                    <span className="grid h-10 w-10 place-items-center bg-brand font-display font-bold text-primary-foreground">
                      U
                    </span>
                    <div>
                      <SheetTitle className="font-display text-base">Udhamsil Nepal</SheetTitle>
                      <SheetDescription className="text-[10px] uppercase tracking-[0.2em]">
                        Global Trade Co.
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-1 flex-col gap-1 px-4 py-6"
                >
                  {links.map((l, index) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      end={l.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between border-b border-border px-4 py-3.5 text-base transition-colors hover:bg-mist hover:text-ink ${
                          isActive ? "bg-mist text-ink font-semibold" : "text-muted-foreground"
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-5 font-display text-xs text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </NavLink>
                  ))}
                </nav>

                <div className="border-t border-border p-4">
                  <Button asChild size="lg" className="h-12 w-full rounded-none">
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Get a Quote
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Kohalpur-11, Banke, Nepal
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
