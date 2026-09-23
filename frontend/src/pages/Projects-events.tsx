
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import productMedium from "@/assets/product-medium.jpg";
import productCommercial from "@/assets/product-commercial.jpg";
import workshop from "@/assets/workshop.jpg";

export default ProjectsEvents;

const entries = [
  {
    tag: "Project",
    year: "2023",
    title: "Commercial food line, Banke",
    copy: "Supplied and commissioned a full processing line for a regional food producer.",
    image: productMedium,
  },
  {
    tag: "Event",
    year: "2024",
    title: "National industry expo",
    copy: "Showcased our packaging and cold-storage range to buyers from across Nepal.",
    image: productCommercial,
  },
  {
    tag: "Project",
    year: "2022",
    title: "Cooperative mill programme",
    copy: "Distributed small-scale milling units to farming cooperatives across the Terai.",
    image: workshop,
  },
];

function ProjectsEvents() {
  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="On the record"
        title="Installations, programmes and"
        highlight="industry events"
        description="A look at recent work — machines delivered, lines commissioned and exhibitions attended."
      />

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
          {entries.map((e, i) => (
            <Reveal key={e.title} delay={i * 80}>
              <article className="group h-full overflow-hidden border border-border bg-background transition hover:border-brand">
                <img
                  src={e.image}
                  loading="lazy"
                  width={1024}
                  height={768}
                  alt={e.title}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {e.year} · {e.tag}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{e.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{e.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
