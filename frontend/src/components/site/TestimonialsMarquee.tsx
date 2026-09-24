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

export function TestimonialsMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const controls1 = useRef<AnimationPlaybackControls | null>(null);
  const controls2 = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (testimonials.length === 0) return;
    // We duplicate the array enough times to ensure smooth infinite scroll
    // A single setWidth is just one set of testimonials
    const setWidth = testimonials.length * (CARD_WIDTH + GAP);
    
    controls1.current = animate(x1, [-setWidth, 0], {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });
    
    // Start x2 shifted by half a set width, moving the same direction (left to right)
    controls2.current = animate(x2, [-setWidth - (setWidth / 2), -setWidth / 2], {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });

    return () => {
      controls1.current?.stop();
      controls2.current?.stop();
    };
  }, [testimonials, x1, x2]);

  if (testimonials.length === 0) return null;

  // We need enough items to fill the screen twice over to ensure it doesn't run out during animation.
  const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative z-10 overflow-hidden bg-mist/30 py-24 text-foreground border-y border-border/50">
      <div className="mx-auto mb-16 max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Client voices</p>
            <h2 className="mt-3 text-4xl font-bold">Confidence earned on the ground.</h2>
          </div>
        </div>
      </div>

      <div
        className="mask-edges relative mx-auto flex flex-col w-full overflow-hidden"
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
        <motion.div
          style={{ x: x1 }}
          className="flex items-stretch w-max"
        >
          {items.map((t, i) => (
            <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
          ))}
        </motion.div>

        {/* ROW 2 */}
        <motion.div
          style={{ x: x2 }}
          className="flex items-stretch w-max"
        >
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
    <article
      className="flex min-h-[260px] w-[480px] shrink-0 flex-col justify-between border border-border/50 bg-card p-8 shadow-sm transition-colors hover:bg-muted/30 m-3 rounded-3xl ml-4"
    >
      <div>
        <div className="flex items-center gap-2 mb-6 text-accent">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-accent" aria-hidden="true" />)}
          </div>
        </div>
        <blockquote className="text-[17px] font-medium leading-[1.6] tracking-tight text-foreground">
          {t.testimonial}
        </blockquote>
      </div>
      <footer className="mt-8 flex items-center gap-4">
        {t.image ? (
          <img src={t.image} alt={t.name} className="h-11 w-11 rounded-lg object-cover ring-1 ring-border/50" />
        ) : (
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-muted ring-1 ring-border/50 text-lg font-bold text-muted-foreground">
            {t.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-[15px] font-semibold text-foreground">{t.name}</p>
          <p className="text-[13px] text-muted-foreground">{t.organization}</p>
        </div>
      </footer>
    </article>
  );
}
