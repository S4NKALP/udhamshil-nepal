import { Link } from "react-router-dom";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import productSmall from "@/assets/product-small.jpg";
import productMedium from "@/assets/product-medium.jpg";
import productCommercial from "@/assets/product-commercial.jpg";

export default Products;

const groups = [
  {
    title: "Small Scale",
    image: productSmall,
    items: ["Mini milling machines", "Grain grinders", "Oil expellers", "Bench drills"],
  },
  {
    title: "Medium Scale",
    image: productMedium,
    items: ["Food processing lines", "Dough & noodle plants", "Filling machines", "Dryers"],
  },
  {
    title: "Commercial",
    image: productCommercial,
    items: ["Automated packaging lines", "Cold storage units", "Conveyor systems", "Boilers"],
  },
];

function Products() {
  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="Catalogue"
        title="Equipment for every"
        highlight="scale of work"
        description="From a single bench unit to a fully automated line — sourced, manufactured and supported by our team in Banke."
      />

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-8 px-6 pb-24">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="grid items-center gap-8 border-y border-border bg-background py-8 md:grid-cols-2">
                <img
                  src={g.image}
                  loading="lazy"
                  width={1024}
                  height={768}
                  alt={`${g.title} machinery`}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{g.title}</h2>
                  <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-7 inline-block bg-ink px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand"
                  >
                    Request pricing
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
