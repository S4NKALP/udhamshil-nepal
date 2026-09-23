
import { useState } from "react";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";

export default Contact;

function Contact() {
  const [sent, setSent] = useState(false);

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
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
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
                  Phone or email
                  <input
                    required
                    name="contact"
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
                  Thanks — your enquiry is noted. Please also call or email us directly so we can
                  respond quickly.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5">
             <div className="h-full border border-border bg-background p-7">
              <h2 className="text-2xl font-bold">Udhamsil Nepal</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Global Trade Company
              </p>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold">Address</dt>
                  <dd className="text-muted-foreground">
                    Kohalpur-11, Banke
                    <br />
                    Lumbini Province, Nepal
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Email</dt>
                  <dd className="text-muted-foreground">info@udhamsilnepal.com</dd>
                </div>
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd className="text-muted-foreground">Sunday – Friday, 9:00 – 18:00</dd>
                </div>
              </dl>
              <p className="mt-6 text-xs text-muted-foreground">
                The email address and hours above are placeholders — send us the real details and
                we'll update them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
