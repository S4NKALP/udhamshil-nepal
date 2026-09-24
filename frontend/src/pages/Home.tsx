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
import { OrbitalVisualization } from "@/components/site/OrbitalVisualization";
import { Button } from "@/components/ui/button";
import { ClientsMarquee } from "@/components/site/ClientsMarquee";
import { TestimonialsMarquee } from "@/components/site/TestimonialsMarquee";
import { useApi } from "@/hooks/useApi";


export default Index;

function Index() {
  const { data: heroList } = useApi("homepage/hero");
  const { data: statsList } = useApi("homepage/stats");
  const { data: marqueeList } = useApi("homepage/marquee");
  const { data: whatWeDoList } = useApi("org/what-we-do");
  const { data: partnersList } = useApi("org/partners");
  const { data: sisterCompaniesList } = useApi("org/sister-companies");
  const { data: servicesList } = useApi("org/services");
  const { data: testimonialsList } = useApi("testimonials");

  const hero = heroList?.[0] || null;
  const stats = statsList || [];
  const marquee = marqueeList || [];
  const whatWeDo = whatWeDoList || [];
  const partners = partnersList || [];
  const sisterCompanies = sisterCompaniesList || [];
  const services = servicesList || [];
  const testimonials = testimonialsList || [];

  return (
    <div className="relative">
      <LightField />

      {hero && (
        <section className="relative z-10 overflow-hidden">
          <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-6">
              <div className="rise flex items-center gap-4 text-xs font-bold uppercase text-brand">
                <span className="h-px w-12 bg-brand" /> {hero.eyebrow || "Est. 2020 · Kohalpur, Banke"}
              </div>
              <h1 className="rise-2 mt-8 text-5xl leading-[1.02] md:text-7xl">
                {hero.title || "Machinery built for"} <span className="text-gradient">{hero.highlight || "Nepal."}</span>
              </h1>
              <p className="rise-3 mt-7 max-w-xl text-xl leading-relaxed text-muted-foreground">
                {hero.description || "Reliable, innovative machinery solutions — exporting, manufacturing, distributing and supplying small, medium and commercial scale equipment across the nation."}
              </p>
              <div className="rise-3 mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-none bg-brand px-7 shadow-none">
                  <Link to="/products">Explore Products</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none bg-background px-7">
                  <Link to="/projects-events">View Projects</Link>
                </Button>
              </div>
              {stats.length > 0 && (
                <div className="rise-3 mt-14 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-7">
                  {stats.map((st) => (
                    <div key={st.id}>
                      <p className="font-display text-3xl font-bold">{st.stats}{st.title.includes('delivery') ? '%' : '+'}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{st.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-h-[480px] lg:col-span-6">
              <div className="absolute -right-6 top-0 h-20 w-32 border-r border-t border-brand/40" aria-hidden="true" />
              <div className="absolute inset-4 right-0 md:left-10">
                <Parallax speed={0.06}>
                  <div className="relative overflow-hidden border border-border bg-mist p-3 shadow-glass">
                    <img
                      src={hero.image }
                      width={1024}
                      height={1280}
                      alt="Featured equipment"
                      className="h-[440px] w-full object-cover md:h-[540px]"
                    />
                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between bg-ink/90 p-5 text-primary-foreground">
                      <div>
                        <p className="text-xs font-bold uppercase text-primary-foreground/60">Featured equipment</p>
                        <p className="mt-1 font-display text-lg">{hero.featured_text || "Commercial systems"}</p>
                      </div>
                      <span className="font-display text-3xl text-accent">01</span>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </section>
      )}

      {marquee.length > 0 && (
        <div className="relative z-10 flex overflow-hidden border-y border-border bg-ink py-6">
          <div className="animate-marquee flex whitespace-nowrap">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-12 pr-12 text-xl md:text-2xl font-black uppercase tracking-[0.1em] text-white"
              >
                {marquee.map((m) => (
                  <span key={m.id} className="flex items-center gap-12">
                    <span>{m.title}</span>
                    <Star className="h-6 w-6 text-brand fill-brand" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {partners.length > 0 && (
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
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Parallax speed={0.06}>
                <ClientsMarquee partners={partners} />
              </Parallax>
            </div>
          </div>
        </section>
      )}

      {whatWeDo.length > 0 && (
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
              {whatWeDo.map((c, i) => (
                <Reveal key={c.id} delay={i * 90}>
                  <div className="group h-full overflow-hidden border border-border bg-background transition hover:border-brand">
                    {c.cover_image && (
                      <img
                        src={c.cover_image}
                        loading="lazy"
                        width={1024}
                        height={768}
                        alt={c.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                    <div className="p-7">
                      <h3 className="text-xl font-bold">{c.title}</h3>
                      <div className="mt-2 text-sm text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: c.what_we_do }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {services.length > 0 && (
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
              {services.map((step, index) => (
                <Reveal key={step.id} delay={index * 70}>
                  <div className="h-full bg-background p-7">
                    <span className="font-display text-sm font-bold text-accent">{(index + 1).toString().padStart(2, "0")}</span>
                    <h3 className="mt-8 text-xl font-bold">{step.name}</h3>
                    <div className="mt-3 text-sm leading-relaxed text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: step.description }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {sisterCompanies.length > 0 && (
        <section className="relative z-10 overflow-hidden bg-mist/30">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our sister companies</p>
                <h2 className="mt-3 text-4xl font-bold">One group, connected capability.</h2>
                <p className="mt-4 text-muted-foreground">A growing ecosystem designed to support enterprise from machinery to long-term operations.</p>
              </div>
            </Reveal>
            <div className="mt-16">
              <OrbitalVisualization nodes={sisterCompanies} />
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <TestimonialsMarquee testimonials={testimonials} />
      )}

      <section className="relative z-10 border-y border-border bg-mist/60">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:items-center text-center">
          <Reveal>
             <div className="border border-border bg-background px-8 py-16">
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
