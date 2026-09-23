import { useState } from "react";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";

export default Contact;

interface Organization {
  name: string;
  address: string;
  primary_email: string;
  working_hour: string;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const { data: orgList } = useApi<Organization[]>("org/organization");
  const org = orgList?.[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(false);
    setError(false);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
      const res = await fetch(`${baseUrl}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          phone_no: data.phone_no,
          email: data.email,
          subject: data.subject || "Website Enquiry",
          message: data.message
        })
      });
      if (res.ok) {
        setSent(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need"
        highlight="to build"
        description="Share your scale, target output and location — we'll come back with a recommendation and price."
      />

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border-t-2 border-brand bg-mist p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Name
                  <input
                    required
                    name="name"
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </label>
                <label className="text-sm font-medium">
                  Phone Number
                  <input
                    required
                    name="phone_no"
                    type="tel"
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 mt-5">
                <label className="text-sm font-medium">
                  Email
                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </label>
                <label className="text-sm font-medium">
                  Subject
                  <input
                    required
                    name="subject"
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium">
                What are you looking for?
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="mt-6 bg-brand px-7 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Send enquiry
              </button>
              {sent && (
                <p className="mt-4 text-sm font-medium text-brand">
                  Thanks — your enquiry has been sent successfully. We will get back to you shortly.
                </p>
              )}
              {error && (
                <p className="mt-4 text-sm font-medium text-red-500">
                  There was an error sending your message. Please try again later.
                </p>
              )}
            </form>
          </Reveal>

          {org && (
          <Reveal delay={90} className="lg:col-span-5">
             <div className="h-full border border-border bg-background p-7">
              <h2 className="text-2xl font-bold">{org.name || "Udhamsil Nepal"}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Global Trade Company
              </p>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold">Address</dt>
                  <dd className="text-muted-foreground whitespace-pre-line">
                    {org.address || "Kohalpur-11, Banke\nLumbini Province, Nepal"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Email</dt>
                  <dd className="text-muted-foreground">{org.primary_email || "info@udhamsilnepal.com"}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd className="text-muted-foreground">{org.working_hour || "Sunday – Friday, 9:00 – 18:00"}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
