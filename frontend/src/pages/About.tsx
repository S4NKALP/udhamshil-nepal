
import { LightField, Parallax, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import workshop from "@/assets/workshop.jpg";

export default About;

const values = [
  ["Reliability", "Machines chosen and built to run through long seasons with minimal downtime."],
  ["Innovation", "Continual upgrades to designs so Nepali industry keeps pace with the region."],
  ["Local service", "Parts, training and support delivered from Banke to every district we serve."],
  ["Fair trade", "Transparent pricing across export, manufacture, distribution and supply."],
];

function About() {
  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="Since 2020"
        title="Built in Banke, serving"
        highlight="all of Nepal"
        description="Udhamsil Nepal Global Trade Company is a prominent exporter, manufacturer, distributor and supplier of small scale, medium scale and commercial machinery in Nepal."
      />

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Parallax speed={0.1}>
               <div className="border border-border bg-mist p-3 shadow-glass">
                <img
                  src={workshop}
                  loading="lazy"
                  width={1024}
                  height={1152}
                  alt="Technicians assembling machinery in the Udhamsil workshop"
                   className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Parallax>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">Our story</h2>
              <p className="mt-5 text-muted-foreground">
                Established in 2020 and based in Kohalpur-11, Banke, we began by supplying compact
                machinery to local enterprises. Today we cover the full range — from small workshop
                units to full commercial production lines — for customers across the country.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our mission is to provide reliable and innovative machinery solutions: equipment
                that arrives ready to work, backed by people who know how to keep it running.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Vision</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Where we are heading</h2>
          </Reveal>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                 <div className="border-l-4 border-brand bg-mist p-10">
                   <span className="inline-flex h-12 w-12 items-center justify-center border border-brand/30 bg-background text-brand">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </span>
                  <p className="mt-6 text-xl font-medium leading-relaxed md:text-2xl">
                    To be Nepal's most trusted machinery partner — the first name Nepali industry
                    turns to for equipment that performs, season after season.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Parallax speed={0.08}>
                <Reveal delay={100}>
                  <p className="text-muted-foreground">
                    From Kohalpur to every district, we aim to set the standard for what Nepali
                    businesses can expect from their machinery supplier: dependable equipment,
                    honest advice and service that shows up when it matters.
                  </p>
                </Reveal>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Mission</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What drives us daily</h2>
          </Reveal>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <Parallax speed={0.06}>
                <Reveal delay={100}>
                  <p className="text-muted-foreground">
                    Every machine we export, manufacture, distribute or supply is chosen and
                    prepared with the same goal: it arrives ready to work and stays working.
                  </p>
                </Reveal>
              </Parallax>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Reveal>
                 <div className="border-r-4 border-brand bg-mist p-10">
                   <span className="inline-flex h-12 w-12 items-center justify-center border border-brand/30 bg-background text-brand">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </span>
                  <p className="mt-6 text-xl font-medium leading-relaxed md:text-2xl">
                    To provide reliable and innovative machinery solutions — small scale, medium
                    scale and commercial — delivered ready to work and supported for life.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Values</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What we stand for</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              The principles behind every machine we export, manufacture and supply.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 80}>
                 <div className="h-full border-t-2 border-brand bg-mist p-8">
                  <span className="text-4xl font-bold text-brand/30">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
