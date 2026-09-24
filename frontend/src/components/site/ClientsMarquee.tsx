import { useEffect, useRef } from "react";
import { animate, motion, type AnimationPlaybackControls, useMotionValue } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  logo: string | null;
}

const LOGO_WIDTH = 220; // fixed width per logo block
const GAP = 24; // gap between logos

export function ClientsMarquee({
  partners,
}: {
  partners: Partner[];
}) {
  const x = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (partners.length === 0) return;
    
    // We duplicate the array to ensure smooth infinite scroll
    const setWidth = partners.length * (LOGO_WIDTH + GAP);
    
    controls.current = animate(x, [-setWidth, 0], {
      duration: 30, // adjust speed
      ease: "linear",
      repeat: Infinity,
    });

    return () => {
      controls.current?.stop();
    };
  }, [partners.length, x]);

  if (partners.length === 0) return null;

  // Duplicate items enough times to fill the screen seamlessly
  const items = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

  return (
    <div 
      className="relative flex w-full overflow-hidden mask-edges-clients"
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
    >
      <motion.div
        style={{ x, gap: GAP }}
        className="flex items-center w-max"
      >
        {items.map((client, i) => (
          <div 
            key={`${client.id}-${i}`} 
            className="group relative flex h-32 w-[220px] shrink-0 items-center justify-center transition-all"
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-16 w-32 object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
            ) : (
              <span className="text-xl font-bold tracking-widest text-muted-foreground transition-colors group-hover:text-brand">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .mask-edges-clients {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
            `,
        }}
      />
    </div>
  );
}
