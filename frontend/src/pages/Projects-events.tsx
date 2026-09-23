import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";

export default ProjectsEvents;

interface Project {
  id: number;
  name: string;
  image: string | null;
  short_info: string;
  details: string;
  organization: string;
  created_at: string;
}

interface Event {
  id: number;
  name: string;
  image: string | null;
  short_info: string;
  details: string;
  organization: string;
  created_at: string;
}

type CombinedEntry = {
  id: string;
  tag: string;
  year: string;
  title: string;
  copy: string;
  image: string | null;
  timestamp: number;
};

function ProjectsEvents() {
  const { data: projects, loading: projectsLoading } = useApi<Project[]>("projects");
  const { data: events, loading: eventsLoading } = useApi<Event[]>("events");

  const isLoading = projectsLoading || eventsLoading;

  let entries: CombinedEntry[] = [];
  if (projects) {
    entries = entries.concat(projects.map(p => ({
      id: `p-${p.id}`,
      tag: "Project",
      year: new Date(p.created_at).getFullYear().toString(),
      title: p.name,
      copy: p.short_info,
      image: p.image,
      timestamp: new Date(p.created_at).getTime()
    })));
  }
  if (events) {
    entries = entries.concat(events.map(e => ({
      id: `e-${e.id}`,
      tag: "Event",
      year: new Date(e.created_at).getFullYear().toString(),
      title: e.name,
      copy: e.short_info,
      image: e.image,
      timestamp: new Date(e.created_at).getTime()
    })));
  }

  entries.sort((a, b) => b.timestamp - a.timestamp);

  if (!isLoading && entries.length === 0) {
    return null;
  }

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
            <Reveal key={e.id} delay={i * 80}>
              <article className="group h-full overflow-hidden border border-border bg-background transition hover:border-brand">
                {e.image && (
                  <img
                    src={e.image}
                    loading="lazy"
                    width={1024}
                    height={768}
                    alt={e.title}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                )}
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
