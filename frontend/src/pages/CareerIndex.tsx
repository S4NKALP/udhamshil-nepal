import { Link } from "react-router-dom";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";

export default Career;

export interface CareerRole {
  id: number;
  name: string;
  short_info: string;
  job_time: string;
  location: string;
  deadline: string;
  details: string;
}

function Career() {
  const { data: roles, loading } = useApi<CareerRole[]>("career");

  if (!loading && (!roles || roles.length === 0)) {
    return null;
  }

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
            {roles?.map((role, i) => (
              <Reveal key={role.id} delay={i * 70}>
                <div className="flex flex-wrap items-center justify-between gap-4 p-7">
                  <div>
                    <h2 className="text-xl font-bold">{role.name}</h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      {role.job_time} · {role.location}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">{role.short_info}</p>
                  </div>
                  <Link
                    to={`/career/${role.id}`}
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
