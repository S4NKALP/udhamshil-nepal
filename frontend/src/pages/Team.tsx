import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";

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
        <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {people?.map((person, i) => (
            <Reveal key={person.id} delay={i * 70}>
              <div className="h-full border-t-2 border-brand bg-mist p-7 transition hover:bg-background">
                {person.image ? (
                  <img src={person.image} alt={person.name} className="h-12 w-12 rounded-full object-cover mb-4" />
                ) : (
                  <div className="grid h-12 w-12 place-items-center bg-brand font-display text-lg font-bold text-primary-foreground mb-4 rounded-full">
                    {String(person.name).charAt(0)}
                  </div>
                )}
                <h2 className="text-xl font-bold">{person.name}</h2>
                <h3 className="text-sm font-semibold text-brand mt-1">{person.position}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{person.short_intro}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
