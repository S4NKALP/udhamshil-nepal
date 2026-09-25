import { LightField } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";

export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-background">
      <LightField />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle and protect your data."
      />

      <section className="relative z-10 border-t border-border mt-16">
        <div className="mx-auto max-w-4xl px-6 py-32">
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="font-display font-black tracking-tight uppercase">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, including when you fill out a
              form, request a quote, or communicate with us. This may include your name, email
              address, phone number, and any other information you choose to provide.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services,
              communicate with you, respond to your inquiries, and fulfill your requests for
              machinery and equipment quotes.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              3. Information Sharing
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information
              to outside parties unless we provide users with advance notice. This does not include
              website hosting partners and other parties who assist us in operating our website or
              conducting our business.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              4. Data Security
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal
              information. However, no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              5. Contact Us
            </h2>
            <p>
              If there are any questions regarding this privacy policy, you may contact us using the
              information on our Contact page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
