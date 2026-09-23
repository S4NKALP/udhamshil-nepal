import { LightField, Parallax, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";


export default About;

// Interfaces mapping to backend serializers
interface AboutUs {
  id: number;
  title: string;
  subtitle: string | null;
  about_us: string;
  cover_image: string | null;
}

interface Vision {
  id: number;
  title: string;
  subtitle: string | null;
  vision: string;
  cover_image: string | null;
}

interface Mision {
  id: number;
  title: string;
  subtitle: string | null;
  mision: string;
  cover_image: string | null;
}

interface Value {
  id: number;
  title: string;
  subtitle: string | null;
  values: string;
  cover_image: string | null;
}

function About() {
  const { data: aboutList, loading: aboutLoading } = useApi<AboutUs[]>("org/about");
  const { data: visionList, loading: visionLoading } = useApi<Vision[]>("org/vision");
  const { data: misionList, loading: misionLoading } = useApi<Mision[]>("org/mision");
  const { data: valuesList, loading: valuesLoading } = useApi<Value[]>("org/values");

  const isLoading = aboutLoading || visionLoading || misionLoading || valuesLoading;
  
  const about = aboutList?.[0];
  const vision = visionList?.[0];
  const mision = misionList?.[0];
  const values = valuesList || [];

  if (!isLoading && !about && !vision && !mision && values.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="Since 2020"
        title="Built in Banke, serving"
        highlight="all of Nepal"
        description="Udhamsil Nepal Global Trade Company is a prominent exporter, manufacturer, distributor and supplier of small scale, medium scale and commercial machinery in Nepal."
      />

      {about && (
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Parallax speed={0.1}>
               <div className="border border-border bg-mist p-3 shadow-glass">
                <img
                  src={about.cover_image }
                  loading="lazy"
                  width={1024}
                  height={1152}
                  alt={about.title}
                   className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Parallax>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">{about.title}</h2>
              <div className="mt-5 text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: about.about_us }} />
            </Reveal>
          </div>
        </div>
      </section>
      )}

      {vision && (
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Vision</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{vision.title}</h2>
          </Reveal>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                 <div className="border-l-4 border-brand bg-mist p-10">
                   <span className="inline-flex h-12 w-12 items-center justify-center border border-brand/30 bg-background text-brand">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </span>
                  <div className="mt-6 text-xl font-medium leading-relaxed md:text-2xl prose prose-invert" dangerouslySetInnerHTML={{ __html: vision.vision }} />
                </div>
              </Reveal>
            </div>
            {vision.subtitle && (
            <div className="lg:col-span-5">
              <Parallax speed={0.08}>
                <Reveal delay={100}>
                  <p className="text-muted-foreground">
                    {vision.subtitle}
                  </p>
                </Reveal>
              </Parallax>
            </div>
            )}
          </div>
        </div>
      </section>
      )}

      {mision && (
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Mission</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{mision.title}</h2>
          </Reveal>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
            {mision.subtitle && (
            <div className="order-2 lg:order-1 lg:col-span-5">
              <Parallax speed={0.06}>
                <Reveal delay={100}>
                  <p className="text-muted-foreground">
                    {mision.subtitle}
                  </p>
                </Reveal>
              </Parallax>
            </div>
            )}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Reveal>
                 <div className="border-r-4 border-brand bg-mist p-10">
                   <span className="inline-flex h-12 w-12 items-center justify-center border border-brand/30 bg-background text-brand">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </span>
                  <div className="mt-6 text-xl font-medium leading-relaxed md:text-2xl prose prose-invert" dangerouslySetInnerHTML={{ __html: mision.mision }} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      )}

      {values && values.length > 0 && (
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
            {values.map((val, index) => (
              <Reveal key={val.id} delay={index * 80}>
                 <div className="h-full border-t-2 border-brand bg-mist p-8">
                  <span className="text-4xl font-bold text-brand/30">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-bold">{val.title}</h3>
                  <div className="mt-3 text-sm leading-relaxed text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: val.values }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
