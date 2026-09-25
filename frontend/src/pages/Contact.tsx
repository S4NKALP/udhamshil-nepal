import { useState } from "react";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";
import { Building2, Clock, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Organization {
  name: string;
  address: string;
  primary_email: string;
  working_hour: string;
  phone_number: string;
  whatsapp_no: string;
  google_map_link: string;
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const { data: org } = useApi<Organization>("org/organization");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(false);
    setError(false);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
      const res = await fetch(`${baseUrl}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone_no: data.phone_no,
          email: data.email,
          subject: data.subject || "Website Enquiry",
          message: data.message,
        }),
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
    <div className="relative min-h-screen">
      <LightField />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need"
        highlight="to build"
        description="Share your scale, target output and location — we'll come back with a recommendation and price."
      />

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 border-t-2 border-foreground pt-12"
            >
              <div className="mb-4">
                <h3 className="text-4xl font-display font-black tracking-tighter uppercase text-foreground">
                  Send an enquiry
                </h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  We generally respond within 24 hours.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="John Doe"
                    className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Phone Number
                  </label>
                  <input
                    required
                    name="phone_no"
                    type="tel"
                    placeholder="+977 98..."
                    className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
                  />
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Email Address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Subject
                  </label>
                  <input
                    required
                    name="subject"
                    placeholder="Machinery Quote"
                    className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                  What are you looking for?
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex self-start items-center gap-2 text-sm font-bold uppercase tracking-widest text-background bg-foreground px-8 py-4 hover:bg-foreground/80 transition-colors"
              >
                Send Enquiry
              </button>

              {sent && (
                <div className="mt-4 border border-border p-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Thanks — your enquiry has been sent successfully. We will get back to you
                    shortly.
                  </p>
                </div>
              )}
              {error && (
                <div className="mt-4 border border-border p-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                    There was an error sending your message. Please try again later.
                  </p>
                </div>
              )}
            </form>
          </Reveal>

          {/* Contact Info Sidebar */}
          {org && (
            <Reveal delay={90} className="order-1 lg:order-2 lg:col-span-5">
              <div className="flex flex-col justify-start space-y-16 border-t-2 border-border pt-12">
                <div>
                  <h2 className="text-3xl font-display font-black tracking-tight uppercase text-foreground">
                    {org.name || "Udhamsil"}
                  </h2>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Global Trade Company
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
                      Headquarters
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-foreground whitespace-pre-line">
                      {org.address || "Kohalpur-11, Banke\nLumbini Province, Nepal"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
                      Email Us
                    </h3>
                    <a
                      href={`mailto:${org.primary_email || "info@udhamsilnepal.com"}`}
                      className="block text-sm font-medium text-foreground hover:text-brand transition-colors"
                    >
                      {org.primary_email || "info@udhamsilnepal.com"}
                    </a>
                  </div>

                  {(org.phone_number || org.whatsapp_no) && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
                        Call Us
                      </h3>
                      <div className="space-y-2">
                        {org.phone_number && (
                          <a
                            href={`tel:${org.phone_number}`}
                            className="block text-sm font-medium text-foreground hover:text-brand transition-colors"
                          >
                            {org.phone_number}
                          </a>
                        )}
                        {org.whatsapp_no && (
                          <a
                            href={`https://wa.me/${org.whatsapp_no}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm font-medium text-foreground hover:text-brand transition-colors"
                          >
                            WhatsApp: {org.whatsapp_no}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
                      Business Hours
                    </h3>
                    <p className="text-sm font-medium text-foreground">
                      {org.working_hour || "Sunday – Friday, 9:00 – 18:00"}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Map Section */}
        {(org?.google_map_link || org?.address) && (
          <Reveal delay={180}>
            <div className="mx-auto max-w-7xl px-6 pb-24">
              <div className="h-[500px] w-full overflow-hidden bg-muted grayscale">
                <iframe
                  title="Google Maps"
                  src={
                    org?.google_map_link && org.google_map_link.includes("embed")
                      ? org.google_map_link
                      : `https://www.google.com/maps?q=${encodeURIComponent(org?.address || "")}&output=embed`
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}
