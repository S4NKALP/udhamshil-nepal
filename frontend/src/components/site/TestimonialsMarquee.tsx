import { useEffect, useRef } from "react";
import { animate, motion, type AnimationPlaybackControls, useMotionValue } from "framer-motion";
import { Star } from "lucide-react";

const CARD_WIDTH = 480;
const GAP = 24;

interface Testimonial {
  id: number;
  name: string;
  organization: string | null;
  testimonial: string;
  image: string | null;
}

export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const controls1 = useRef<AnimationPlaybackControls | null>(null);
  const controls2 = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const setWidth = testimonials.length * (CARD_WIDTH + GAP);

    // Row 1: moves left (0 to -setWidth)
    controls1.current = animate(x1, [0, -setWidth], {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });

    // Row 2: moves right (-setWidth to 0)
    controls2.current = animate(x2, [-setWidth, 0], {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });

    return () => {
      controls1.current?.stop();
      controls2.current?.stop();
    };
  }, [testimonials.length, x1, x2]);

  if (testimonials.length === 0) return null;

  const items = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="relative z-10 overflow-hidden bg-background py-32 border-t border-border text-foreground">
      <div className="mx-auto mb-24 max-w-7xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Client voices
        </p>
        <h2 className="text-4xl font-display font-black tracking-tighter uppercase md:text-6xl">
          Confidence earned on the ground.
        </h2>
      </div>

      <div
        className="mask-edges relative mx-auto flex flex-col w-full overflow-hidden gap-6"
        style={{ overflowAnchor: "none" }}
        onMouseEnter={() => {
          controls1.current?.pause();
          controls2.current?.pause();
        }}
        onMouseLeave={() => {
          controls1.current?.play();
          controls2.current?.play();
        }}
      >
        {/* ROW 1 */}
        <motion.div style={{ x: x1, gap: GAP }} className="flex items-stretch w-max ml-4">
          {items.map((t, i) => (
            <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
          ))}
        </motion.div>

        {/* ROW 2 */}
        <motion.div style={{ x: x2, gap: GAP }} className="flex items-stretch w-max ml-4">
          {items.map((t, i) => (
            <TestimonialCard key={`r2-${t.id}-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
                .mask-edges {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
            `,
        }}
      />
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex min-h-[260px] w-[400px] md:w-[480px] shrink-0 flex-col gap-6 border border-border bg-muted/10 p-8 transition-colors hover:bg-muted/30">
      <div className="flex flex-wrap items-center gap-4 border-b border-border/50 pb-6">
        {t.image ? (
          <img
            src={t.image}
            alt={t.name}
            className="h-12 w-12 rounded-full object-cover grayscale"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground font-display text-lg font-bold text-background">
            {t.name.charAt(0)}
          </div>
        )}
        <div className="flex min-w-[150px] flex-1 flex-col gap-1">
          <p className="text-base font-bold uppercase tracking-wide text-foreground">{t.name}</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t.organization || "Google review"}
          </p>
        </div>
        <div className="ml-auto flex gap-1">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 fill-foreground text-foreground"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <blockquote className="text-lg font-medium leading-relaxed text-muted-foreground">
        "{t.testimonial}"
      </blockquote>
    </article>
  );
}
