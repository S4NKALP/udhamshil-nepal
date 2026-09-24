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
              className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12"
            >
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-foreground">Send an enquiry</h3>
                <p className="mt-2 text-sm text-muted-foreground">We generally respond within 24 hours.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-brand focus:bg-background focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    required
                    name="phone_no"
                    type="tel"
                    placeholder="+977 98..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-brand focus:bg-background focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-brand focus:bg-background focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Subject
                  </label>
                  <input
                    required
                    name="subject"
                    placeholder="Machinery Quote"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-brand focus:bg-background focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What are you looking for?
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us about your requirements..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-brand focus:bg-background focus:ring-1 focus:ring-brand"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-2 h-14 w-full rounded-xl bg-brand text-base font-bold shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] hover:bg-brand/90"
              >
                Send Enquiry
              </Button>

              {sent && (
                <div className="mt-2 rounded-lg bg-green-50 p-4 text-center border border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Thanks — your enquiry has been sent successfully. We will get back to you shortly.
                  </p>
                </div>
              )}
              {error && (
                <div className="mt-2 rounded-lg bg-red-50 p-4 text-center border border-red-200 dark:bg-red-500/10 dark:border-red-500/20">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    There was an error sending your message. Please try again later.
                  </p>
                </div>
              )}
            </form>
          </Reveal>

          {/* Contact Info Sidebar */}
          {org && (
            <Reveal delay={90} className="order-1 lg:order-2 lg:col-span-5">
              <div className="flex h-full flex-col justify-center space-y-10 rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{org.name || "Udhamsil Nepal"}</h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                    Global Trade Company
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-brand">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Headquarters</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {org.address || "Kohalpur-11, Banke\nLumbini Province, Nepal"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-brand">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Email Us</h3>
                      <a href={`mailto:${org.primary_email || "info@udhamsilnepal.com"}`} className="mt-1 block text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {org.primary_email || "info@udhamsilnepal.com"}
                      </a>
                    </div>
                  </div>

                  {(org.phone_number || org.whatsapp_no) && (
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-brand">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Call Us</h3>
                        <div className="mt-1 space-y-1">
                          {org.phone_number && (
                            <a href={`tel:${org.phone_number}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                              {org.phone_number}
                            </a>
                          )}
                          {org.whatsapp_no && (
                            <a href={`https://wa.me/${org.whatsapp_no}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp: {org.whatsapp_no}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-brand">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Business Hours</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {org.working_hour || "Sunday – Friday, 9:00 – 18:00"}
                      </p>
                    </div>
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
              <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-border shadow-lg">
                <iframe
                  title="Google Maps"
                  src={org?.google_map_link && org.google_map_link.includes("embed") ? org.google_map_link : `https://www.google.com/maps?q=${encodeURIComponent(org?.address || "")}&output=embed`}
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
