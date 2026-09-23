import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Clock, MapPin } from "lucide-react";

import { ApplicationForm } from "@/components/site/ApplicationForm";
import { LightField, Reveal } from "@/components/site/Parallax";

export const roles = [
  {
    slug: "workshop-machinist",
    title: "Workshop Machinist",
    meta: "Full-time · Kohalpur, Banke",
    location: "Kohalpur-11, Banke, Nepal",
    schedule: "Full-time · Sun–Fri",
    intro:
      "Assembly, fitting and finishing of machinery units at our Kohalpur workshop.",
    about:
      "You will work hands-on with small, medium and commercial machinery units — from receiving components to final quality checks before dispatch. Precision and care for finish matter more than speed.",
    responsibilities: [
      "Assemble and fit machinery components to specification drawings",
      "Perform finishing, alignment and calibration of completed units",
      "Run pre-dispatch quality and safety checks",
      "Maintain workshop tools, jigs and a clean working area",
      "Report material defects and suggest process improvements",
    ],
    requirements: [
      "2+ years of machining, fitting or mechanical assembly experience",
      "Ability to read basic engineering drawings",
      "Comfortable with hand tools, grinders, drills and measuring instruments",
      "Technical training (CTEVT or equivalent) is an advantage",
    ],
  },
  {
    slug: "field-service-engineer",
    title: "Field Service Engineer",
    meta: "Full-time · Travel across Nepal",
    location: "Customer sites across Nepal",
    schedule: "Full-time · Field-based",
    intro:
      "Installation, commissioning and maintenance at customer sites across the country.",
    about:
      "You will be the face of Udhamsil Nepal at customer sites — installing machines, training operators, and keeping equipment running. Expect regular travel and direct responsibility for customer satisfaction.",
    responsibilities: [
      "Install and commission machinery at customer facilities",
      "Diagnose and repair mechanical and electrical faults on site",
      "Train customer operators on safe machine use",
      "Keep service records and report recurring issues to the workshop",
      "Plan travel and spare parts for scheduled maintenance visits",
    ],
    requirements: [
      "Diploma or degree in mechanical/electrical engineering or equivalent experience",
      "Willingness to travel frequently within Nepal",
      "Strong troubleshooting skills and clear communication in Nepali",
      "Valid driving licence is an advantage",
    ],
  },
  {
    slug: "sales-distribution-officer",
    title: "Sales & Distribution Officer",
    meta: "Full-time · Lumbini Province",
    location: "Kohalpur, Banke · Lumbini Province region",
    schedule: "Full-time · Office + dealer visits",
    intro:
      "Dealer relationships, quotations and order follow-up across Lumbini Province.",
    about:
      "You will grow our dealer and distribution network, prepare quotations, and make sure orders move smoothly from enquiry to delivery. This role suits someone organised, personable and comfortable with numbers.",
    responsibilities: [
      "Manage and grow relationships with dealers and distributors",
      "Prepare quotations, proforma invoices and order documentation",
      "Follow up orders through production, dispatch and payment",
      "Track territory sales and report weekly to management",
      "Gather market feedback on pricing and competitor activity",
    ],
    requirements: [
      "2+ years in sales, distribution or dealer management (machinery/FMCG preferred)",
      "Confident with spreadsheets, email and basic documentation",
      "Strong spoken Nepali; English working knowledge is an advantage",
      "Self-motivated with a valid driving licence",
    ],
  },
];

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

import { useParams } from "react-router-dom";

function CareerDetail() {
  const { slug } = useParams();
  const role = roles.find((r) => r.slug === slug);

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
              {role.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {role.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" /> {role.schedule}
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
                  About the role
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  {role.about}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <h2 className="text-xs font-bold uppercase text-accent">
                  What you'll do
                </h2>
                <ul className="mt-5 space-y-3">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div>
                <h2 className="text-xs font-bold uppercase text-accent">
                  What you'll bring
                </h2>
                <ul className="mt-5 space-y-3">
                  {role.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-4">
            <aside className="glass border border-border p-7 lg:sticky lg:top-28">
              <h3 className="font-display text-base uppercase">{role.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {role.meta}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{role.intro}</p>
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
            <ApplicationForm roleTitle={role.title} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
