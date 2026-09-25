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

  if (loading) {
    return <div className="min-h-[150vh] bg-background" />;
  }

  if (!roles || roles.length === 0) {
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

      <section className="relative z-10 border-t border-border mt-16 pt-16">
        <div className="mx-auto max-w-7xl px-6 pb-32">
          <div className="flex flex-col gap-0 border-t-2 border-foreground">
            {roles?.map((role, i) => (
              <Reveal key={role.id} delay={i * 70}>
                <div className="flex flex-wrap items-start md:items-center justify-between gap-8 py-10 border-b border-border hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {role.job_time} <span className="mx-2">—</span> {role.location}
                    </p>
                    <h2 className="text-3xl font-display font-black tracking-tighter uppercase">
                      {role.name}
                    </h2>
                    <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-muted-foreground">
                      {role.short_info}
                    </p>
                  </div>
                  <Link
                    to={`/career/${role.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-background bg-foreground px-8 py-4 hover:bg-foreground/80 transition-colors shrink-0"
                  >
                    View role
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Don't see your role? Send your CV through the contact page and we'll keep it on file.
          </p>
        </div>
      </section>
    </div>
  );
}
