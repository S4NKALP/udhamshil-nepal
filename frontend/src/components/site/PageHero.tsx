import { Parallax } from "./Parallax";

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
}) {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:pb-24 md:pt-48">
        <Parallax speed={0.05}>
          <div className="rise flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
            {eyebrow} <span className="h-px w-12 bg-border" />
          </div>
          <h1 className="rise-2 font-display text-[10vw] sm:text-[8vw] lg:text-[7rem] leading-[0.85] tracking-tighter uppercase mb-16">
            {title} {highlight && <span className="text-brand block">{highlight}</span>}
          </h1>
          <div className="rise-3 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-8">
            <p className="md:col-start-7 md:col-span-6 text-sm font-medium leading-relaxed text-foreground uppercase tracking-widest">
              {description}
            </p>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
