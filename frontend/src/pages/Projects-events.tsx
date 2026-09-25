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

      <section className="relative z-10 border-t border-border mt-16">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((e, i) => (
              <Reveal key={e.id} delay={i * 80}>
                <article className="group flex h-full flex-col">
                  {e.image && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-muted mb-8">
                      <img
                        src={e.image}
                        loading="lazy"
                        alt={e.title}
                        className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 border-t-2 border-foreground pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{e.year}</p>
                      <span className="h-px flex-1 bg-border" />
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{e.tag}</p>
                    </div>
                    <h2 className="text-2xl font-display font-black tracking-tight uppercase text-foreground">{e.title}</h2>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground">{e.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
