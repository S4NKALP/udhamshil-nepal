import { LightField } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";

export default function Terms() {
  return (
    <div className="relative min-h-screen bg-background">
      <LightField />
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The rules that govern our relationship."
      />

      <section className="relative z-10 border-t border-border mt-16">
        <div className="mx-auto max-w-4xl px-6 py-32">
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="font-display font-black tracking-tight uppercase">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on our website
              for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              3. Disclaimer
            </h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim and negate all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or other violation of
              rights.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              4. Limitations
            </h2>
            <p>
              In no event shall we or our suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on our website.
            </p>

            <h2 className="font-display font-black tracking-tight uppercase mt-12">
              5. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws
              of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
