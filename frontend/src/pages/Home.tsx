import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Factory,
  Headphones,
  Leaf,
  Quote,
  Settings2,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { LightField, Parallax, Reveal } from "@/components/site/Parallax";
import { Button } from "@/components/ui/button";
import heroMachinery from "@/assets/hero-machinery.jpg";
import productSmall from "@/assets/product-small.jpg";
import productMedium from "@/assets/product-medium.jpg";
import productCommercial from "@/assets/product-commercial.jpg";

export default Index;

const categories = [
  {
    title: "Small Scale",
    image: productSmall,
    copy: "Compact units for households and micro-enterprises — easy to install, simple to maintain.",
  },
  {
    title: "Medium Scale",
    image: productMedium,
    copy: "Production lines for growing workshops, balancing output with reliable uptime.",
  },
  {
    title: "Commercial",
    image: productCommercial,
    copy: "Heavy-duty industrial equipment engineered for continuous, high-volume operation.",
  },
];

const clientSectors = [
  { name: "Agro Processing", short: "AP", icon: Leaf },
  { name: "Food Production", short: "FP", icon: Factory },
  { name: "Cold Storage", short: "CS", icon: Building2 },
  { name: "Construction", short: "CN", icon: Wrench },
  { name: "Energy & Utilities", short: "EU", icon: Zap },
  { name: "Local Enterprise", short: "LE", icon: Settings2 },
];

const testimonials = [
  {
    quote:
      "The team understood our production target, recommended the right capacity and stayed involved through installation.",
    role: "Food processing operator",
    location: "Lumbini Province",
  },
  {
    quote:
      "Clear advice and dependable after-sales support made upgrading our workshop far easier than expected.",
    role: "Manufacturing business owner",
    location: "Karnali Province",
  },
  {
    quote:
      "Our equipment arrived prepared for work, and the operators received practical guidance from day one.",
    role: "Commercial project manager",
    location: "Sudurpashchim Province",
  },
];

const sisterCompanies = [
  {
    name: "Udhamsil Agro Systems",
    label: "Agriculture",
    copy: "Mechanisation and processing solutions for Nepal's growing agro-enterprises.",
    icon: Leaf,
  },
  {
    name: "Udhamsil Energy Solutions",
    label: "Energy",
    copy: "Efficient power and utility systems for productive, resilient operations.",
    icon: Zap,
  },
  {
    name: "Udhamsil Industrial Services",
    label: "Support",
    copy: "Installation, maintenance and technical support across the machinery lifecycle.",
    icon: Wrench,
  },
];

const serviceSteps = [
  { number: "01", title: "Understand", copy: "We map your output, space, power and budget." },
  { number: "02", title: "Specify", copy: "We match the right machine and configuration." },
  { number: "03", title: "Deliver", copy: "We coordinate supply, setup and operator guidance." },
  { number: "04", title: "Support", copy: "We stay available for parts and maintenance." },
];

function Index() {
  return (
    <div className="relative">
      <LightField />

      <section className="relative z-10 overflow-hidden">
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <div className="rise flex items-center gap-4 text-xs font-bold uppercase text-brand">
              <span className="h-px w-12 bg-brand" /> Est. 2020 · Kohalpur, Banke
            </div>
            <h1 className="rise-2 mt-8 text-5xl leading-[1.02] md:text-7xl">
              Machinery built for <span className="text-gradient">Nepal.</span>
            </h1>
            <p className="rise-3 mt-7 max-w-xl text-xl leading-relaxed text-muted-foreground">
              Reliable, innovative machinery solutions — exporting, manufacturing, distributing and
              supplying small, medium and commercial scale equipment across the nation.
            </p>
            <div className="rise-3 mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-none bg-brand px-7 shadow-none">
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none bg-background px-7">
                <Link to="/projects-events">View Projects</Link>
              </Button>
            </div>
            <div className="rise-3 mt-14 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-7">
              {[
                ["250+", "Machines supplied"],
                ["40+", "Districts served"],
                ["98%", "On-time delivery"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold">{n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[480px] lg:col-span-6">
            <div className="absolute -right-6 top-0 h-20 w-32 border-r border-t border-brand/40" aria-hidden="true" />
            <div className="absolute inset-4 right-0 md:left-10">
              <Parallax speed={0.06}>
                <div className="relative overflow-hidden border border-border bg-mist p-3 shadow-glass">
                  <img
                    src={heroMachinery}
                    width={1024}
                    height={1280}
                    alt="Industrial machinery on a bright factory floor"
                    className="h-[440px] w-full object-cover md:h-[540px]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between bg-ink/90 p-5 text-primary-foreground">
                    <div>
                      <p className="text-xs font-bold uppercase text-primary-foreground/60">Featured equipment</p>
                      <p className="mt-1 font-display text-lg">Commercial systems</p>
                    </div>
                    <span className="font-display text-3xl text-accent">01</span>
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 overflow-hidden border-y border-border bg-background/60 py-4">
        <div className="animate-marquee flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex gap-12 pr-12 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span>Export</span><span className="text-accent">/</span>
              <span>Manufacture</span><span className="text-accent">/</span>
              <span>Distribute</span><span className="text-accent">/</span>
              <span>Supply</span><span className="text-accent">/</span>
              <span>Service</span><span className="text-accent">/</span>
            </div>
          ))}
        </div>
      </div>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                What we do
              </p>
              <h2 className="mt-3 text-4xl font-bold">Machinery, end to end</h2>
            </div>
            <Link
              to="/products"
              className="hidden text-sm font-semibold text-brand hover:underline sm:inline"
            >
              See all products →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="group h-full overflow-hidden border border-border bg-background transition hover:border-brand">
                  <img
                    src={c.image}
                    loading="lazy"
                    width={1024}
                    height={768}
                    alt={`${c.title} machinery`}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="p-7">
                    <h3 className="text-xl font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-border bg-mist/60">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our clients</p>
              <h2 className="mt-3 text-4xl font-bold">Built around the people who produce.</h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                We work with ambitious enterprises across agriculture, food production, construction,
                utilities and commercial manufacturing.
              </p>
              <div className="mt-8 flex items-center gap-8 border-t border-border pt-7">
                <div><strong className="block font-display text-3xl">40+</strong><span className="text-sm text-muted-foreground">districts reached</span></div>
                <div><strong className="block font-display text-3xl">3</strong><span className="text-sm text-muted-foreground">equipment scales</span></div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Parallax speed={0.06}>
            <div className="client-orbit relative mx-auto aspect-square w-full max-w-[560px]" aria-label="Industries served by Udhamsil Nepal">
                <div className="absolute inset-[12%] rounded-full border border-brand/15" />
                <div className="absolute inset-[28%] rounded-full border border-accent/20" />
                <div className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-brand bg-background text-center shadow-glass">
                  <Settings2 className="h-10 w-10 text-brand md:h-12 md:w-12" aria-hidden="true" />
                  <strong className="mt-3 font-display text-sm md:text-lg">Udhamsil Nepal</strong>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:text-xs">Industry partner</span>
                </div>
                {clientSectors.map(({ name, short, icon: Icon }, index) => (
                  <div key={name} className={`orbit-item orbit-item-${index + 1}`}>
                     <div className="group relative flex h-full w-full items-center justify-center border border-border bg-background shadow-glass" title={name}>
                      <Icon className="h-5 w-5 text-brand transition group-hover:scale-110 md:h-6 md:w-6" aria-hidden="true" />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-muted-foreground md:text-xs">{short}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1.1fr_2fr] md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why Udhamsil</p>
                <h2 className="mt-3 text-4xl font-bold">From requirement to reliable output.</h2>
              </div>
              <p className="max-w-2xl text-muted-foreground md:justify-self-end">
                One accountable team helps you choose, receive and keep the right machinery running.
              </p>
            </div>
          </Reveal>
           <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {serviceSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <div className="h-full bg-background p-7">
                  <span className="font-display text-sm font-bold text-accent">{step.number}</span>
                  <h3 className="mt-8 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-ink text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Client voices</p>
                <h2 className="mt-3 text-4xl font-bold">Confidence earned on the ground.</h2>
              </div>
              <p className="text-sm text-primary-foreground/60">Illustrative stories — verified client details coming soon.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.role} delay={index * 90}>
                 <article className="h-full border border-primary-foreground/15 bg-primary-foreground/5 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-label="Five star rating">
                      {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />)}
                    </div>
                    <Quote className="h-7 w-7 text-accent/60" aria-hidden="true" />
                  </div>
                  <blockquote className="mt-8 text-lg leading-relaxed">“{item.quote}”</blockquote>
                  <footer className="mt-8 border-t border-primary-foreground/15 pt-5">
                    <p className="font-semibold">{item.role}</p>
                    <p className="mt-1 text-sm text-primary-foreground/60">{item.location}</p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our sister companies</p>
              <h2 className="mt-3 text-4xl font-bold">One group, connected capability.</h2>
              <p className="mt-4 text-muted-foreground">A growing ecosystem designed to support enterprise from machinery to long-term operations.</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand">Portfolio preview · company names to be confirmed</p>
            </div>
          </Reveal>
          <div className="relative mt-16 grid gap-6 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
            <div className="hidden h-px bg-gradient-brand lg:block" />
            <Parallax speed={0.08}>
               <div className="mx-auto flex h-52 w-52 flex-col items-center justify-center rounded-full border border-brand bg-background text-center shadow-glass">
                <Settings2 className="h-9 w-9 text-brand" aria-hidden="true" />
                <strong className="mt-3 font-display text-lg">Udhamsil Nepal</strong>
                <span className="mt-1 text-xs text-muted-foreground">Global Trade Company</span>
              </div>
            </Parallax>
            <div className="hidden h-px bg-gradient-brand lg:block" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sisterCompanies.map(({ name, label, copy, icon: Icon }, index) => (
              <Reveal key={name} delay={index * 90}>
                 <article className="h-full border border-border bg-background p-7 transition hover:border-brand">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{label}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-bold">{name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-border bg-mist/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand"><ShieldCheck className="h-6 w-6" aria-hidden="true" /></span>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured work</p>
              <h2 className="mt-3 text-4xl font-bold">Commercial systems, delivered with care.</h2>
              <p className="mt-5 text-muted-foreground">See how planning, equipment selection and on-site support come together in our recent work and events.</p>
              <Button asChild variant="link" className="mt-5 h-auto p-0 text-brand">
                <Link to="/projects-events">Explore projects <ArrowRight aria-hidden="true" /></Link>
              </Button>
            </Reveal>
          </div>
           <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:col-span-7">
            {["Site assessment", "System delivery", "After-sales care"].map((label, index) => (
              <div key={label} className="bg-background p-7">
                {index === 2 ? <Headphones className="h-6 w-6 text-accent" aria-hidden="true" /> : index === 1 ? <Factory className="h-6 w-6 text-accent" aria-hidden="true" /> : <Settings2 className="h-6 w-6 text-accent" aria-hidden="true" />}
                <p className="mt-8 font-display font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
             <div className="border-y border-border bg-mist px-8 py-16 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Need a machine spec'd for your output?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Tell us your scale and target production — our Banke team responds with a tailored
                recommendation.
              </p>
               <Button asChild size="lg" className="mt-8 rounded-none bg-brand">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
