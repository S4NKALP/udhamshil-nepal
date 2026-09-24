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

  if (!loading && (!people || people.length === 0)) {
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

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {people?.map((person, i) => (
            <Reveal key={person.id} delay={i * 70}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                
                {/* Top Section: Avatar, Name, Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="h-11 w-11 rounded-full object-cover" />
                    ) : (
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-muted font-display text-lg font-bold text-foreground">
                        {String(person.name).charAt(0)}
                      </div>
                    )}
                    <div>
                      <h2 className="text-[15px] font-semibold text-foreground leading-tight">{person.name}</h2>
                      <h3 className="text-[13px] text-muted-foreground mt-0.5">{person.position}</h3>
                    </div>
                  </div>
                  <span className="text-[12px] text-muted-foreground">
                    {person.email && "Open to chat"}
                  </span>
                </div>

                {/* Middle: Bio */}
                <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground line-clamp-3">
                  {person.short_intro || person.bio.replace(/<[^>]*>?/gm, '')}
                </p>

                {/* Bottom: Location & Icons */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[13px] text-muted-foreground">
                    {person.phone_no ? person.phone_no : "Kohalpur, Nepal"}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {person.email && (
                      <a 
                        href={`mailto:${person.email}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {person.phone_no && (
                      <a 
                        href={`tel:${person.phone_no}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label="Phone"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
