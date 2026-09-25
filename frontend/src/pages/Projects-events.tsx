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
    entries = entries.concat(
      projects.map((p) => ({
        id: `p-${p.id}`,
        tag: "Project",
        year: new Date(p.created_at).getFullYear().toString(),
        title: p.name,
        copy: p.short_info,
        image: p.image,
        timestamp: new Date(p.created_at).getTime(),
      })),
    );
  }
  if (events) {
    entries = entries.concat(
      events.map((e) => ({
        id: `e-${e.id}`,
        tag: "Event",
        year: new Date(e.created_at).getFullYear().toString(),
        title: e.name,
        copy: e.short_info,
        image: e.image,
        timestamp: new Date(e.created_at).getTime(),
      })),
    );
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
          <div className="flex flex-col gap-32">
            {entries.map((e, i) => {
              const isLarge = i % 5 === 0; // Large
              const isTwoCol = i % 5 === 1 || i % 5 === 2; // Two smaller
              const isOffset = i % 5 === 3; // Offset large
              const isFull = i % 5 === 4; // Full width

              if (isTwoCol && i % 5 === 2) {
                return (
                  <Reveal key={e.id} delay={50}>
                    <article className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                      <div className={`md:col-span-5 md:col-start-8`}>
                        {e.image && (
                          <div className="aspect-[4/5] w-full overflow-hidden bg-muted mb-6">
                            <img
                              src={e.image}
                              loading="lazy"
                              alt={e.title}
                              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="border-t border-border pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              {e.tag}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              {e.year}
                            </span>
                          </div>
                          <h3 className="text-2xl font-display font-black tracking-tight uppercase mb-4">
                            {e.title}
                          </h3>
                          <p className="text-sm font-medium leading-relaxed text-foreground">
                            {e.copy}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              }
              if (isTwoCol && i % 5 === 1) {
                return (
                  <Reveal key={e.id} delay={50}>
                    <article className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                      <div className={`md:col-span-5 md:col-start-1`}>
                        {e.image && (
                          <div className="aspect-[4/5] w-full overflow-hidden bg-muted mb-6">
                            <img
                              src={e.image}
                              loading="lazy"
                              alt={e.title}
                              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="border-t border-border pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              {e.tag}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              {e.year}
                            </span>
                          </div>
                          <h3 className="text-2xl font-display font-black tracking-tight uppercase mb-4">
                            {e.title}
                          </h3>
                          <p className="text-sm font-medium leading-relaxed text-foreground">
                            {e.copy}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              }

              return (
                <Reveal key={e.id} delay={100}>
                  <article
                    className={`group flex flex-col ${isFull ? "items-center text-center" : ""} ${isOffset ? "md:w-3/4 md:ml-auto" : ""}`}
                  >
                    {e.image && (
                      <div
                        className={`w-full overflow-hidden bg-muted mb-8 ${isLarge || isFull ? "aspect-[21/9]" : "aspect-[4/3]"}`}
                      >
                        <img
                          src={e.image}
                          loading="lazy"
                          alt={e.title}
                          className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div
                      className={`flex flex-col border-t-2 border-foreground pt-6 ${isFull ? "w-full max-w-3xl" : "w-full"}`}
                    >
                      <div
                        className={`flex items-center gap-4 mb-4 ${isFull ? "justify-center" : ""}`}
                      >
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {e.year}
                        </p>
                        <span className={`h-px bg-border ${isFull ? "w-12" : "flex-1"}`} />
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {e.tag}
                        </p>
                      </div>
                      <h2
                        className={`text-3xl md:text-5xl font-display font-black tracking-tight uppercase text-foreground ${isFull ? "text-center" : ""}`}
                      >
                        {e.title}
                      </h2>
                      <p
                        className={`mt-4 text-sm font-medium leading-relaxed text-muted-foreground ${isFull ? "text-center" : ""}`}
                      >
                        {e.copy}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
