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
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <Parallax speed={0.06}>
          <div className="rise flex items-center gap-4 text-xs font-bold uppercase text-brand">
            <span className="h-px w-12 bg-brand" /> {eyebrow}
          </div>
          <h1 className="rise-2 mt-7 max-w-5xl text-4xl leading-[1.06] md:text-7xl">
            {title} {highlight && <span className="text-gradient">{highlight}</span>}
          </h1>
          <div className="rise-3 mt-8 grid border-t border-border pt-6 md:grid-cols-12">
            <p className="max-w-2xl text-lg text-muted-foreground md:col-start-6 md:col-span-7">{description}</p>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
