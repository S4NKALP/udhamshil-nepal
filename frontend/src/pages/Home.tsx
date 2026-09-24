import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
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
    <div className="relative bg-background">
      <LightField />

      {hero && (
        <section className="relative z-10 overflow-hidden">
          <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-6">
              <div className="rise inline-flex items-center gap-3 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand"></span>
                </span>
                {hero.eyebrow || "Est. 2020 · Kohalpur, Banke"}
              </div>
              <h1 className="rise-2 mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
                {hero.title || "Machinery built for"} <span className="text-gradient">{hero.highlight || "Nepal."}</span>
              </h1>
              <p className="rise-3 mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground">
                {hero.description || "Reliable, innovative machinery solutions — exporting, manufacturing, distributing and supplying small, medium and commercial scale equipment across the nation."}
              </p>
              <div className="rise-3 mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 rounded-full bg-brand px-8 text-base shadow-lg shadow-brand/20 transition-all hover:scale-105 hover:bg-brand/90">
                  <Link to="/products">Explore Products</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 rounded-full bg-background px-8 text-base border-border/50 hover:bg-muted transition-all hover:scale-105">
                  <Link to="/projects-events">View Projects</Link>
                </Button>
              </div>
              {stats.length > 0 && (
                <div className="rise-3 mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-border/40 pt-8">
                  {stats.map((st) => (
                    <div key={st.id} className="group">
                      <p className="font-display text-3xl font-black tracking-tight text-foreground transition-colors group-hover:text-brand">{st.stats}{st.title.includes('delivery') ? '%' : '+'}</p>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">{st.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-h-[480px] lg:col-span-6">
              <div className="absolute inset-0 right-0 md:left-10">
                <Parallax speed={0.06}>
                  <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card p-2 shadow-2xl transition-all hover:shadow-brand/10">
                    <img
                      src={hero.image}
                      width={1024}
                      height={1280}
                      alt="Featured equipment"
                      className="h-[440px] w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105 md:h-[580px]"
                    />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between rounded-xl bg-ink/90 p-6 text-primary-foreground backdrop-blur-md">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/60">Featured equipment</p>
                        <p className="mt-2 font-display text-xl font-bold">{hero.featured_text || "Commercial systems"}</p>
                      </div>
                      <span className="font-display text-4xl font-black text-accent opacity-50">01</span>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </section>
      )}

      {marquee.length > 0 && (
        <div className="relative z-10 flex overflow-hidden border-y border-border bg-card py-6">
          <div className="animate-marquee flex whitespace-nowrap">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-12 pr-12 text-xl font-black uppercase tracking-[0.1em] text-foreground md:text-2xl"
              >
                {marquee.map((m) => (
                  <span key={m.id} className="flex items-center gap-12">
                    <span>{m.title}</span>
                    <Star className="h-6 w-6 fill-brand text-brand" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {partners.length > 0 && (
        <section className="relative z-10 overflow-hidden border-b border-border bg-mist/30">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                  Our clients
                </div>
                <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">Built around the people who produce.</h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  We work with ambitious enterprises across agriculture, food production, construction,
                  utilities and commercial manufacturing.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Parallax speed={0.04}>
                <div>
                  <ClientsMarquee partners={partners} />
                </div>
              </Parallax>
            </div>
          </div>
        </section>
      )}

      {whatWeDo.length > 0 && (
        <section className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                  What we do
                </div>
                <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">Machinery, end to end</h2>
              </div>
              <Button asChild variant="ghost" className="rounded-full font-bold text-brand hover:bg-brand/10 hover:text-brand">
                <Link to="/products" className="flex items-center gap-2">
                  See all products <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {whatWeDo.map((c, i) => (
                <Reveal key={c.id} delay={i * 90}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5">
                    {c.cover_image && (
                      <div className="overflow-hidden">
                        <img
                          src={c.cover_image}
                          loading="lazy"
                          width={1024}
                          height={768}
                          alt={c.title}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground">{c.title}</h3>
                      <div className="mt-4 text-muted-foreground prose prose-invert line-clamp-4" dangerouslySetInnerHTML={{ __html: c.what_we_do }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="relative z-10 border-y border-border bg-mist/30">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <Reveal>
              <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                    Why Udhamsil
                  </div>
                  <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">From requirement to reliable output.</h2>
                </div>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:justify-self-end">
                  One accountable team helps you choose, receive and keep the right machinery running.
                </p>
              </div>
            </Reveal>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((step, index) => (
                <Reveal key={step.id} delay={index * 70}>
                  <div className="group relative flex h-full flex-col rounded-3xl border border-border/50 bg-card p-8 shadow-lg transition-all hover:border-brand/30 hover:bg-muted/50">
                    <span className="font-display text-5xl font-black text-brand/10 transition-colors group-hover:text-brand/20">{(index + 1).toString().padStart(2, "0")}</span>
                    <h3 className="mt-6 text-xl font-bold tracking-tight">{step.name}</h3>
                    <div className="mt-4 text-sm leading-relaxed text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: step.description }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {sisterCompanies.length > 0 && (
        <section className="relative z-10 overflow-hidden bg-background">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                  Ecosystem
                </div>
                <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">One group, connected capability.</h2>
                <p className="mt-6 text-lg text-muted-foreground">A growing network designed to support enterprise from machinery to long-term operations.</p>
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

      <section className="relative z-10 border-t border-border/50 bg-gradient-to-b from-transparent to-mist/50">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:py-40">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand"></span>
                </span>
                Ready to scale
              </div>
              <h2 className="mt-8 text-4xl font-black tracking-tight text-foreground md:text-6xl md:leading-[1.1]">
                Need a machine spec'd for your output?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Tell us your scale and target production — our Banke team responds with a tailored
                recommendation and pricing.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-14 w-full sm:w-auto rounded-full bg-brand px-10 text-base font-bold shadow-xl shadow-brand/20 transition-all hover:scale-105 hover:bg-brand/90">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-14 w-full sm:w-auto rounded-full px-8 text-base font-bold transition-all hover:bg-muted">
                  <Link to="/products">Browse Catalogue</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
