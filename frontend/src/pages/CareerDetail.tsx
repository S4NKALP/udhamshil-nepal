import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Clock, MapPin } from "lucide-react";

import { ApplicationForm } from "@/components/site/ApplicationForm";
import { LightField, Reveal } from "@/components/site/Parallax";
import { useApi } from "@/hooks/useApi";
import type { CareerRole } from "./CareerIndex";

export default CareerDetail;

function RoleNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32 text-center">
      <h1 className="text-3xl md:text-4xl">Role not found</h1>
      <p className="mt-4 text-muted-foreground">
        This position may have been filled or the link is incorrect.
      </p>
      <Link
        to="/career"
        className="mt-8 inline-block bg-ink px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand"
      >
        View open roles
      </Link>
    </div>
  );
}

function CareerDetail() {
  const { slug } = useParams();
  const { data: role, loading } = useApi<CareerRole>(`career/${slug}`);

  if (loading) return null;

  if (!role) {
    return <RoleNotFound />;
  }

  return (
    <div className="relative">
      <LightField />

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <Link
              to="/career"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" /> All open roles
            </Link>
            <div className="mt-8 flex items-center gap-4 text-xs font-bold uppercase text-brand">
              <span className="h-px w-12 bg-brand" /> Careers
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.06] md:text-6xl">
              {role.name}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {role.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" /> {role.job_time}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <Reveal>
              <div>
                <h2 className="text-xs font-bold uppercase text-accent">
                  Role Details
                </h2>
                <div 
                  className="mt-4 max-w-2xl text-lg text-muted-foreground prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: role.details }}
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-4">
            <aside className="glass border border-border p-7 lg:sticky lg:top-28">
              <h3 className="font-display text-base uppercase">{role.name}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {role.job_time} · {role.location}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{role.short_info}</p>
              <p className="mt-4 text-sm font-bold text-accent">Deadline: {role.deadline}</p>
              <a
                href="#apply"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-ink text-sm font-semibold text-primary-foreground transition hover:bg-brand"
              >
                Apply for this role <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Complete the application form below with your contact details
                and CV.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-28">
          <Reveal>
            <ApplicationForm roleTitle={role.name} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
