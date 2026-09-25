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

import { ContactForm } from "@/components/site/ContactForm";

export default function Contact() {
  const { data: org } = useApi<Organization>("org/organization");

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
            <ContactForm className="border-t-2 border-foreground pt-12" />
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
