import { LightField, Parallax, Reveal } from "@/components/site/Parallax";
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

  if (isLoading) {
    return <div className="min-h-[150vh] bg-background" />;
  }

  if (!about && !vision && !mision && values.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <LightField />

      {about && (
        <section className="relative z-10 pt-32 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
              <div className="lg:col-span-8 rise">
                <h1 className="font-display text-[10vw] sm:text-[8vw] lg:text-[5.5rem] leading-[0.85] tracking-tighter uppercase">
                  {about.title}
                  {about.subtitle && (
                    <span className="text-brand block mt-2">{about.subtitle}</span>
                  )}
                </h1>
              </div>
              <div className="lg:col-span-4 pb-4 rise-2">
                <div
                  className="text-sm font-medium leading-relaxed text-foreground prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: about.about_us }}
                />
              </div>
            </div>

            {about.cover_image && (
              <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-muted overflow-hidden rise-3 mt-16">
                <Parallax speed={0.05}>
                  <img
                    src={about.cover_image}
                    alt={about.title}
                    className="w-full h-full object-cover object-center scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </Parallax>
              </div>
            )}
          </div>
        </section>
      )}

      {vision && (
        <section className="relative z-10 border-t border-border mt-16 pt-32">
          <div className="mx-auto max-w-7xl px-6 pb-32">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    01 — Vision
                  </p>
                  <h2 className="text-4xl font-display font-black tracking-tighter uppercase">
                    {vision.title}
                  </h2>
                  {vision.subtitle && (
                    <p className="mt-6 text-sm font-medium text-foreground uppercase tracking-widest">
                      {vision.subtitle}
                    </p>
                  )}
                </div>
                <div className="lg:col-span-8 lg:pl-12">
                  <div
                    className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight leading-tight text-foreground/80 prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: vision.vision }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {mision && (
        <section className="relative z-10 border-t border-border pt-32">
          <div className="mx-auto max-w-7xl px-6 pb-32">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    02 — Mission
                  </p>
                  <h2 className="text-4xl font-display font-black tracking-tighter uppercase">
                    {mision.title}
                  </h2>
                  {mision.subtitle && (
                    <p className="mt-6 text-sm font-medium text-foreground uppercase tracking-widest">
                      {mision.subtitle}
                    </p>
                  )}
                </div>
                <div className="lg:col-span-8 lg:pl-12">
                  <div
                    className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight leading-tight text-foreground/80 prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: mision.mision }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {values && values.length > 0 && (
        <section className="relative z-10 border-t border-border pt-32">
          <div className="mx-auto max-w-7xl px-6 pb-32">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                03 — Values
              </p>
              <h2 className="text-5xl font-display font-black tracking-tighter uppercase md:text-7xl">
                What we stand for.
              </h2>
            </Reveal>
            <div className="mt-24 grid gap-16 md:grid-cols-2 lg:grid-cols-4">
              {values.map((val, index) => (
                <Reveal key={val.id} delay={index * 80}>
                  <div className="border-t-2 border-foreground pt-8">
                    <span className="text-4xl font-display font-black text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 text-xl font-display font-black uppercase tracking-tight">
                      {val.title}
                    </h3>
                    <div
                      className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground prose prose-invert"
                      dangerouslySetInnerHTML={{ __html: val.values }}
                    />
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
