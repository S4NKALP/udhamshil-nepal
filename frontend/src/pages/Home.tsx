import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { LightField, Parallax, Reveal } from "@/components/site/Parallax";
import { OrbitalVisualization } from "@/components/site/OrbitalVisualization";
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
        <section className="relative z-10 overflow-hidden pt-32 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
              <div className="lg:col-span-9 rise">
                <h1 className="font-display text-[12vw] sm:text-[8vw] lg:text-[6rem] leading-[0.85] tracking-tighter uppercase">
                  {hero.title || "Machinery built for"} <br />
                  <span className="text-brand">{hero.highlight || "Nepal."}</span>
                </h1>
              </div>
              <div className="lg:col-span-3 pb-4 rise-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-4 mb-4">
                  {hero.eyebrow || "Est. 2020 · Kohalpur, Banke"}
                </p>
                <p className="text-sm font-medium leading-relaxed text-foreground">
                  {hero.description || "Reliable, innovative machinery solutions — exporting, manufacturing, distributing and supplying small, medium and commercial scale equipment across the nation."}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-brand transition-colors">
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    Get a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-muted overflow-hidden rise-3">
              <Parallax speed={0.05}>
                <img
                  src={hero.image}
                  alt="Featured equipment"
                  className="w-full h-full object-cover object-center scale-110"
                />
              </Parallax>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white mix-blend-difference">Featured equipment</p>
                  <p className="mt-1 font-display text-lg text-white mix-blend-difference">{hero.featured_text || "Commercial systems"}</p>
                </div>
                <span className="font-display text-2xl font-black text-white mix-blend-difference opacity-50">01</span>
              </div>
            </div>
            
            {stats.length > 0 && (
              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-8 rise-3">
                {stats.map((st) => (
                  <div key={st.id}>
                    <p className="font-display text-4xl md:text-5xl font-black tracking-tighter">{st.stats}{st.title.includes('delivery') ? '%' : '+'}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">{st.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {marquee.length > 0 && (
        <section className="relative z-10 border-t border-border mt-16 pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-16">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Capabilities</p>
                <h2 className="text-4xl font-display font-black tracking-tighter uppercase md:text-6xl">What we do at scale.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {marquee.map((m, i) => {
                const bentoClasses = [
                  "md:col-span-2 lg:col-span-2",
                  "md:col-span-2 lg:col-span-2",
                  "md:col-span-4 lg:col-span-2",
                  "md:col-span-2 lg:col-span-1",
                  "md:col-span-2 lg:col-span-1"
                ];
                const spanClass = bentoClasses[i % bentoClasses.length];
                
                return (
                  <Reveal key={m.id} delay={i * 50} className={`${spanClass} bg-muted p-8 flex flex-col justify-between group overflow-hidden relative border border-border/50`}>
                    <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10 text-2xl font-display font-black text-muted-foreground/30 group-hover:text-background/30 transition-colors duration-700">0{i + 1}</span>
                    <h3 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-foreground group-hover:text-background transition-colors duration-700 break-words">{m.title}</h3>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {partners.length > 0 && (
        <section className="relative z-10 w-full pt-32 pb-16 overflow-hidden">
          {/* Centered pill on horizontal line */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-border"></div>
            <div className="relative z-10 bg-background px-4">
              <div className="rounded-full bg-muted/30 border border-border/50 px-6 py-2 text-sm font-semibold tracking-wide text-foreground">
                Our partners
              </div>
            </div>
          </div>
          
          {/* Marquee below */}
          <div className="mx-auto w-full max-w-[1600px] mt-16 px-4">
            <ClientsMarquee partners={partners} />
          </div>
        </section>
      )}

      {whatWeDo.length > 0 && (
        <section className="relative z-10 border-t border-border mt-24">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <div className="mb-24 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-5xl font-display font-black tracking-tighter uppercase md:text-7xl">Machinery,<br />end to end.</h2>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-brand transition-colors">
                See all products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid gap-24">
              {whatWeDo.map((c, i) => (
                <Reveal key={c.id} delay={i * 50}>
                  <div className={`grid gap-12 items-center lg:grid-cols-12 ${i % 2 !== 0 ? 'lg:rtl' : ''}`}>
                    <div className={`lg:col-span-7 ${i % 2 !== 0 ? 'lg:ltr' : ''}`}>
                      {c.cover_image && (
                        <div className="overflow-hidden aspect-[4/3] bg-muted">
                          <img
                            src={c.cover_image}
                            loading="lazy"
                            alt={c.title}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                      )}
                    </div>
                    <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:ltr' : ''}`}>
                      <span className="font-display text-4xl font-black text-brand/20">{(i + 1).toString().padStart(2, "0")}</span>
                      <h3 className="mt-4 text-3xl font-display font-black uppercase tracking-tight">{c.title}</h3>
                      <div className="mt-6 text-base leading-relaxed text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: c.what_we_do }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="relative z-10 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-5">
                  <h2 className="text-4xl font-display font-black tracking-tighter uppercase md:text-5xl">From requirement<br />to reliable output.</h2>
                  <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground uppercase tracking-widest">
                    One accountable team helps you choose, receive and keep the right machinery running.
                  </p>
                </div>
                
                <div className="lg:col-span-7">
                  <div className="flex flex-col gap-0 border-t border-border">
                    {services.map((step, index) => (
                      <Reveal key={step.id} delay={index * 50}>
                        <div className="group grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-12 py-10 border-b border-border transition-colors hover:bg-muted/30">
                          <span className="font-display text-lg font-black text-muted-foreground">{(index + 1).toString().padStart(2, "0")} —</span>
                          <div>
                            <h3 className="text-2xl font-display font-black tracking-tight uppercase group-hover:text-brand transition-colors">{step.name}</h3>
                            <div className="mt-4 text-base leading-relaxed text-muted-foreground prose prose-invert max-w-xl" dangerouslySetInnerHTML={{ __html: step.description }} />
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {sisterCompanies.length > 0 && (
        <section className="relative z-10 overflow-hidden border-t border-border mt-16 pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mx-auto max-w-4xl text-center mb-16">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Ecosystem
                </p>
                <h2 className="text-4xl font-display font-black tracking-tighter uppercase md:text-6xl">One group, connected capability.</h2>
                <p className="mt-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">A growing network designed to support enterprise from machinery to long-term operations.</p>
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

      <section className="relative z-10 bg-brand text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-48 text-center">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-8">
                Ready to scale
              </p>
              <h2 className="text-5xl font-display font-black tracking-tighter uppercase md:text-7xl lg:text-[7rem] leading-[0.9]">
                Need a machine<br />spec'd for your<br />output?
              </h2>
              <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row">
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand bg-white px-8 py-4 hover:bg-white/90 transition-colors">
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors border-b border-white/30 pb-1 hover:border-white">
                  Browse Catalogue
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
