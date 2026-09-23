import { Link } from "react-router-dom";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";

export default Career;

const roles = [
  ["workshop-machinist", "Workshop Machinist", "Full-time · Kohalpur, Banke", "Assembly, fitting and finishing of machinery units."],
  ["field-service-engineer", "Field Service Engineer", "Full-time · Travel across Nepal", "Installation, commissioning and maintenance at customer sites."],
  ["sales-distribution-officer", "Sales & Distribution Officer", "Full-time · Lumbini Province", "Dealer relationships, quotations and order follow-up."],
] as const;

function Career() {
  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="Careers"
        title="Build machines that"
        highlight="keep Nepal working"
        description="We hire people who care about the details — precise hands, clear communication and a habit of finishing the job."
      />

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24">
           <div className="divide-y divide-border overflow-hidden border-y border-border bg-background">
            {roles.map(([slug, title, meta, copy], i) => (
              <Reveal key={slug} delay={i * 70}>
                <div className="flex flex-wrap items-center justify-between gap-4 p-7">
                  <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      {meta}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">{copy}</p>
                  </div>
                  <Link
                    to={`/career/${slug}`}
                    className="bg-ink px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand"
                  >
                    View role
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Don't see your role? Send your CV through the contact page and we'll keep it on file.
          </p>
        </div>
      </section>
    </div>
  );
}
