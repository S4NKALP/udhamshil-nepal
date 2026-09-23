
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";

export default Team;

const people = [
  ["Managing Director", "Leads trade partnerships and company strategy."],
  ["Head of Engineering", "Oversees machine specification, testing and build quality."],
  ["Production Manager", "Runs the Kohalpur assembly floor and delivery schedule."],
  ["Import & Export Lead", "Handles sourcing, customs and cross-border logistics."],
  ["Service Engineer", "Field installation, commissioning and preventive maintenance."],
  ["Customer Support", "First point of contact for parts, training and warranty."],
];

function Team() {
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
          {people.map(([role, copy], i) => (
            <Reveal key={role} delay={i * 70}>
              <div className="h-full border-t-2 border-brand bg-mist p-7 transition hover:bg-background">
                <div className="grid h-12 w-12 place-items-center bg-brand font-display text-lg font-bold text-primary-foreground">
                  {String(role).charAt(0)}
                </div>
                <h2 className="mt-5 text-xl font-bold">{role}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto max-w-7xl px-6 pb-20 text-sm text-muted-foreground">
          Names and photographs are placeholders — send us your team details and we'll add them.
        </p>
      </section>
    </div>
  );
}
