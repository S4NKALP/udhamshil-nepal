import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";
import { Mail, Phone } from "lucide-react";

export default Team;

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string | null;
  short_intro: string | null;
  bio: string;
  phone_no: string | null;
  email: string | null;
}

function Team() {
  const { data: people, loading } = useApi<TeamMember[]>("team");

  if (loading) {
    return <div className="min-h-[150vh] bg-background" />;
  }

  if (!people || people.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <LightField />

      <PageHero
        eyebrow="People"
        title="The team behind"
        highlight="every machine"
        description="A compact, hands-on team of engineers, machinists and trade specialists working from Kohalpur-11, Banke."
      />

      <section className="relative z-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-16">
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {people?.map((person, i) => (
              <Reveal key={person.id} delay={i * 70}>
                <div className="group flex h-full flex-col">
                  {person.image ? (
                    <div className="aspect-[3/4] w-full overflow-hidden bg-muted mb-6">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] w-full bg-muted mb-6 grid place-items-center">
                      <span className="font-display text-6xl font-black text-muted-foreground/30">
                        {String(person.name).charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-display font-black tracking-tight uppercase text-foreground">
                        {person.name}
                      </h2>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2 mb-6 border-b border-border pb-4">
                        {person.position}
                      </h3>
                      <p className="text-sm font-medium leading-relaxed text-foreground line-clamp-4">
                        {person.short_intro || person.bio.replace(/<[^>]*>?/gm, "")}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-2">
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-brand transition-colors flex items-center gap-2"
                        >
                          <Mail className="h-3 w-3" /> {person.email}
                        </a>
                      )}
                      {person.phone_no && (
                        <a
                          href={`tel:${person.phone_no}`}
                          className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-brand transition-colors flex items-center gap-2"
                        >
                          <Phone className="h-3 w-3" /> {person.phone_no}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
